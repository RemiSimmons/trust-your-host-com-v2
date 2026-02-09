import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendTrialEndingReminder, sendSubscriptionFailedNotification } from '@/lib/email/resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  let supabase
  try {
    supabase = createAdminClient()
  } catch (adminError) {
    console.error('❌ Failed to create Supabase admin client:', adminError)
    return NextResponse.json({ error: 'Database client error' }, { status: 500 })
  }

  try {
    switch (event.type) {
      // When checkout session completes (trial starts)
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        console.log('📥 Checkout session completed:', {
          sessionId: session.id,
          mode: session.mode,
          customer: session.customer,
          metadata: session.metadata,
        })
        
        if (session.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
          const customerId = session.customer as string
          const propertyId = session.metadata?.property_id
          const hostId = session.metadata?.host_id

          console.log('📋 Subscription details:', {
            subscriptionId: subscription.id,
            status: subscription.status,
            trialEnd: subscription.trial_end,
            propertyId,
            hostId,
          })

          if (propertyId && hostId) {
            // Use Stripe's trial end timestamp (more accurate, handles timezone correctly)
            const trialEndsAt = subscription.trial_end 
              ? new Date(subscription.trial_end * 1000).toISOString()
              : null

            const updateData = {
              stripe_subscription_id: subscription.id,
              stripe_customer_id: customerId,
              subscription_status: subscription.trial_end ? 'trial' : 'active',
              trial_ends_at: trialEndsAt,
              is_active: true,
              updated_at: new Date().toISOString(),
            }

            console.log(`🔄 Updating property ${propertyId} with:`, updateData)

            // Update property with subscription info
            const { error: propertyError, data: updatedProperty } = await supabase
              .from('properties')
              .update(updateData)
              .eq('id', propertyId)
              .select('id, name, subscription_status')
              .single()

            if (propertyError) {
              console.error(`❌ CRITICAL: Failed to update property ${propertyId}:`, {
                error: propertyError,
                code: propertyError.code,
                message: propertyError.message,
                details: propertyError.details,
                hint: propertyError.hint,
              })
              
              // Retry once after 2 seconds
              console.log('🔁 Retrying property update...')
              await new Promise(resolve => setTimeout(resolve, 2000))
              
              const { error: retryError } = await supabase
                .from('properties')
                .update(updateData)
                .eq('id', propertyId)
              
              if (retryError) {
                console.error(`❌ CRITICAL: Retry failed for property ${propertyId}:`, retryError)
              } else {
                console.log(`✅ Property ${propertyId} updated successfully on retry`)
              }
            } else {
              console.log(`✅ Property ${propertyId} updated successfully:`, updatedProperty)
            }

            // Update host profile
            const { error: profileError } = await supabase
              .from('profiles')
              .update({
                stripe_customer_id: customerId,
                updated_at: new Date().toISOString(),
              })
              .eq('id', hostId)

            if (profileError) {
              console.error(`❌ Failed to update profile ${hostId}:`, profileError)
            } else {
              console.log(`✅ Profile ${hostId} updated successfully`)
            }

            console.log(`✅ Trial started for property ${propertyId}`)
          } else {
            console.error(`❌ CRITICAL: Missing metadata in session ${session.id}:`, {
              propertyId,
              hostId,
              allMetadata: session.metadata,
            })
          }
        }
        break
      }

      // When subscription status changes (active, paused, canceled)
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        const { data: property } = await supabase
          .from('properties')
          .select('id, name, host_id, subscription_status, host:profiles(email, full_name)')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (property) {
          let newStatus = 'active'
          let isActive = true
          
          // Check if subscription is set to cancel at period end
          if (subscription.cancel_at_period_end) {
            // Subscription is scheduled to cancel but still active until period ends
            newStatus = 'canceled'
            isActive = true // Keep listing visible until subscription actually ends
            console.log(`⚠️ Subscription ${subscription.id} scheduled to cancel at period end`)
          } else {
            // Map Stripe subscription status to our status
            if (subscription.status === 'trialing') {
              newStatus = 'trial'
              isActive = true
            } else if (subscription.status === 'active') {
              newStatus = 'active'
              isActive = true
            } else if (['past_due', 'unpaid', 'incomplete', 'incomplete_expired'].includes(subscription.status)) {
              newStatus = 'paused'
              isActive = false
            } else if (['canceled', 'ended'].includes(subscription.status)) {
              newStatus = 'canceled'
              isActive = false
            }
          }

          await supabase
            .from('properties')
            .update({
              subscription_status: newStatus,
              is_active: isActive,
              updated_at: new Date().toISOString(),
            })
            .eq('id', property.id)

          console.log(`✅ Subscription ${subscription.id} updated to ${newStatus}, is_active: ${isActive}`)
        }
        break
      }

      // When subscription is deleted/canceled
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        const { data: property } = await supabase
          .from('properties')
          .select('id, name, host_id, host:profiles(email, full_name)')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (property) {
          await supabase
            .from('properties')
            .update({
              subscription_status: 'canceled',
              is_active: false,
              updated_at: new Date().toISOString(),
            })
            .eq('id', property.id)

          console.log(`✅ Subscription canceled for property ${property.id}`)
        }
        break
      }

      // When payment succeeds (trial → active transition or renewal)
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        
        // Access subscription field which may not be in types but exists at runtime
        const invoiceWithSub = invoice as Stripe.Invoice & { subscription?: string | Stripe.Subscription }
        const subscriptionId = typeof invoiceWithSub.subscription === 'string' 
          ? invoiceWithSub.subscription 
          : invoiceWithSub.subscription?.id
        
        if (subscriptionId) {
          const { data: property } = await supabase
            .from('properties')
            .select('id, subscription_status')
            .eq('stripe_subscription_id', subscriptionId)
            .single()

          if (property) {
            // If was in trial, now move to active
            if (property.subscription_status === 'trial') {
              await supabase
                .from('properties')
                .update({
                  subscription_status: 'active',
                  is_active: true,
                  updated_at: new Date().toISOString(),
                })
                .eq('id', property.id)

              console.log(`✅ Trial → Active for property ${property.id}`)
            }
          }
        }
        break
      }

      // When payment fails (auto-pause property)
      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        
        const invoiceWithSub = invoice as Stripe.Invoice & { subscription?: string | Stripe.Subscription }
        const subscriptionId = typeof invoiceWithSub.subscription === 'string' 
          ? invoiceWithSub.subscription 
          : invoiceWithSub.subscription?.id
        
        if (subscriptionId) {
          const { data: property } = await supabase
            .from('properties')
            .select('id, name, host_id, host:profiles(email, full_name)')
            .eq('stripe_subscription_id', subscriptionId)
            .single()

          if (property) {
            // Auto-pause property
            await supabase
              .from('properties')
              .update({
                subscription_status: 'paused',
                is_active: false, // Property no longer visible in directory
                updated_at: new Date().toISOString(),
              })
              .eq('id', property.id)

            // Send notification email
            const host = property.host as any
            if (host?.email) {
              await sendSubscriptionFailedNotification({
                email: host.email,
                name: host.full_name || 'Host',
                propertyName: property.name,
                billingUrl: `${process.env.NEXT_PUBLIC_APP_URL}/host/billing`,
              })
            }

            console.log(`⚠️ Payment failed - Property ${property.id} paused`)
          }
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
