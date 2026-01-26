import { stripe } from '@/lib/stripe'
import { createServerClient } from '@/lib/supabase/server'
import { sendTrialEndingNotification, sendPaymentFailedNotification } from '@/lib/email/resend'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

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

  const supabase = await createServerClient()

  try {
    switch (event.type) {
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
        
        // Update subscription to active if payment succeeded
        if (invoice.subscription) {
          await supabase
            .from('properties')
            .update({ subscription_status: 'active' })
            .eq('stripe_subscription_id', invoice.subscription)
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        
        // Mark as paused on payment failure
        if (invoice.subscription) {
          const { data: properties } = await supabase
            .from('properties')
            .select('id, host_id, name')
            .eq('stripe_subscription_id', invoice.subscription)
          
          if (properties && properties.length > 0) {
            const property = properties[0]
            
            await supabase
              .from('properties')
              .update({ subscription_status: 'paused' })
              .eq('stripe_subscription_id', invoice.subscription)
            
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
