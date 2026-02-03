import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendTrialEndingReminder, sendSubscriptionFailedNotification } from '@/lib/email/resend'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
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
        
        if (session.mode === 'subscription') {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
          const customerId = session.customer as string
          const propertyId = session.metadata?.property_id
          const hostId = session.metadata?.host_id

          if (propertyId && hostId) {
            // Use Stripe's trial end timestamp (more accurate, handles timezone correctly)
            const trialEndsAt = subscription.trial_end 
              ? new Date(subscription.trial_end * 1000).toISOString()
              : null

            console.log(`🔄 Updating property ${propertyId} with subscription ${subscription.id}`)

            // Update property with subscription info
            const { error: propertyError } = await supabase
              .from('properties')
              .update({
                stripe_subscription_id: subscription.id,
                stripe_customer_id: customerId,
                subscription_status: subscription.trial_end ? 'trial' : 'active',
                trial_ends_at: trialEndsAt,
                is_active: true,
                updated_at: new Date().toISOString(),
              })
              .eq('id', propertyId)

            if (propertyError) {
              console.error(`❌ Failed to update property ${propertyId}:`, propertyError)
            } else {
              console.log(`✅ Property ${propertyId} updated successfully`)
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
            console.error(`❌ Missing metadata - propertyId: ${propertyId}, hostId: ${hostId}`)
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
        
        if (invoice.subscription) {
          const { data: property } = await supabase
            .from('properties')
            .select('id, subscription_status')
            .eq('stripe_subscription_id', invoice.subscription as string)
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
        
        if (invoice.subscription) {
          const { data: property } = await supabase
            .from('properties')
            .select('id, name, host_id, host:profiles(email, full_name)')
            .eq('stripe_subscription_id', invoice.subscription as string)
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
