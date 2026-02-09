import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendTrialEndingNotification, sendPaymentFailedNotification } from '@/lib/email/resend'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Use admin client to bypass RLS - webhooks don't have user sessions
  const supabase = createAdminClient()

  try {
    switch (event.type) {
      // Handle checkout session completion (subscription created)
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        console.log('📥 [Secondary webhook] Checkout session completed:', {
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

          if (propertyId && hostId) {
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

            console.log(`🔄 [Secondary webhook] Updating property ${propertyId}:`, updateData)

            const { error: propertyError } = await supabase
              .from('properties')
              .update(updateData)
              .eq('id', propertyId)

            if (propertyError) {
              console.error(`❌ [Secondary webhook] Failed to update property ${propertyId}:`, propertyError)
            } else {
              console.log(`✅ [Secondary webhook] Property ${propertyId} updated successfully`)
            }

            // Update host profile
            await supabase
              .from('profiles')
              .update({
                stripe_customer_id: customerId,
                updated_at: new Date().toISOString(),
              })
              .eq('id', hostId)

            console.log(`✅ [Secondary webhook] Trial started for property ${propertyId}`)
          } else {
            console.error(`❌ [Secondary webhook] Missing metadata in session ${session.id}`)
          }
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        
        // Update property subscription status
        const { data: properties } = await supabase
          .from('properties')
          .select('id, host_id, name')
          .eq('stripe_subscription_id', subscription.id)
        
        if (properties && properties.length > 0) {
          const property = properties[0]
          
          let status = 'active'
          if (subscription.status === 'trialing') status = 'trial'
          else if (subscription.status === 'past_due' || subscription.status === 'unpaid') status = 'paused'
          else if (subscription.status === 'canceled') status = 'cancelled'
          
          await supabase
            .from('properties')
            .update({ subscription_status: status })
            .eq('stripe_subscription_id', subscription.id)
          
          // Send notifications for specific states
          if (subscription.status === 'past_due' || subscription.status === 'unpaid') {
            const { data: profile } = await supabase
              .from('profiles')
              .select('email, full_name')
              .eq('id', property.host_id)
              .single()
            
            if (profile) {
              await sendPaymentFailedNotification({
                email: profile.email,
                name: profile.full_name,
                propertyName: property.name
              })
            }
          }
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        
        // Mark property as cancelled
        await supabase
          .from('properties')
          .update({ subscription_status: 'cancelled' })
          .eq('stripe_subscription_id', subscription.id)
        break
      }

      case 'customer.subscription.trial_will_end': {
        const subscription = event.data.object
        
        // Get property and host info
        const { data: properties } = await supabase
          .from('properties')
          .select('id, host_id, name, trial_ends_at')
          .eq('stripe_subscription_id', subscription.id)
        
        if (properties && properties.length > 0) {
          const property = properties[0]
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('email, full_name')
            .eq('id', property.host_id)
            .single()
          
          if (profile && property.trial_ends_at) {
            const trialEndsAt = new Date(property.trial_ends_at)
            const daysRemaining = Math.ceil(
              (trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            )
            
            await sendTrialEndingNotification({
              email: profile.email,
              name: profile.full_name,
              propertyName: property.name,
              trialEndsAt,
              daysRemaining
            })
          }
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object
        
        // Access subscription field with proper typing
        const invoiceWithSub = invoice as Stripe.Invoice & { subscription?: string | Stripe.Subscription }
        const subscriptionId = typeof invoiceWithSub.subscription === 'string' 
          ? invoiceWithSub.subscription 
          : invoiceWithSub.subscription?.id
        
        // Update subscription to active if payment succeeded
        if (subscriptionId) {
          await supabase
            .from('properties')
            .update({ subscription_status: 'active' })
            .eq('stripe_subscription_id', subscriptionId)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        
        const invoiceWithSub = invoice as Stripe.Invoice & { subscription?: string | Stripe.Subscription }
        const subscriptionId = typeof invoiceWithSub.subscription === 'string' 
          ? invoiceWithSub.subscription 
          : invoiceWithSub.subscription?.id
        
        // Mark as paused on payment failure
        if (subscriptionId) {
          const { data: properties } = await supabase
            .from('properties')
            .select('id, host_id, name')
            .eq('stripe_subscription_id', subscriptionId)
          
          if (properties && properties.length > 0) {
            const property = properties[0]
            
            await supabase
              .from('properties')
              .update({ subscription_status: 'paused' })
              .eq('stripe_subscription_id', subscriptionId)
            
            const { data: profile } = await supabase
              .from('profiles')
              .select('email, full_name')
              .eq('id', property.host_id)
              .single()
            
            if (profile) {
              await sendPaymentFailedNotification({
                email: profile.email,
                name: profile.full_name,
                propertyName: property.name
              })
            }
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
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
