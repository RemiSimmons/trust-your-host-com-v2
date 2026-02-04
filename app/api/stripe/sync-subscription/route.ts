import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

/**
 * Fallback endpoint to sync subscription status from Stripe
 * Called when user visits dashboard and subscription appears out of sync
 */
export async function POST(req: Request) {
  try {
    const supabase = await createServerClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's profile with Stripe customer ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single()

    if (!profile?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No Stripe customer found', synced: false },
        { status: 404 }
      )
    }

    console.log(`🔄 Syncing subscriptions for customer: ${profile.stripe_customer_id}`)

    // Get all subscriptions from Stripe for this customer
    const subscriptions = await stripe.subscriptions.list({
      customer: profile.stripe_customer_id,
      status: 'all',
      limit: 10,
    })

    if (subscriptions.data.length === 0) {
      console.log('⚠️ No subscriptions found in Stripe')
      return NextResponse.json({
        synced: false,
        message: 'No subscriptions found in Stripe',
      })
    }

    // Use admin client to bypass RLS
    const adminSupabase = createAdminClient()
    let syncedCount = 0

    // Sync each subscription to database
    for (const subscription of subscriptions.data) {
      const metadata = subscription.metadata || {}
      const propertyId = metadata.property_id

      if (!propertyId) {
        console.log(`⚠️ Subscription ${subscription.id} has no property_id in metadata`)
        continue
      }

      // Determine subscription status
      let status = 'active'
      let isActive = true

      if (subscription.cancel_at_period_end) {
        status = 'canceled'
        isActive = true // Keep active until period ends
      } else if (subscription.status === 'trialing') {
        status = 'trial'
        isActive = true
      } else if (subscription.status === 'active') {
        status = 'active'
        isActive = true
      } else if (['past_due', 'unpaid', 'incomplete', 'incomplete_expired'].includes(subscription.status)) {
        status = 'paused'
        isActive = false
      } else if (['canceled', 'ended'].includes(subscription.status)) {
        status = 'canceled'
        isActive = false
      }

      const trialEndsAt = subscription.trial_end 
        ? new Date(subscription.trial_end * 1000).toISOString()
        : null

      // Update property in database
      const { error: updateError } = await adminSupabase
        .from('properties')
        .update({
          stripe_subscription_id: subscription.id,
          stripe_customer_id: subscription.customer as string,
          subscription_status: status,
          trial_ends_at: trialEndsAt,
          is_active: isActive,
          updated_at: new Date().toISOString(),
        })
        .eq('id', propertyId)
        .eq('host_id', user.id) // Security: ensure user owns this property

      if (updateError) {
        console.error(`❌ Failed to sync property ${propertyId}:`, updateError)
      } else {
        console.log(`✅ Synced property ${propertyId} -> ${status}`)
        syncedCount++
      }
    }

    return NextResponse.json({
      synced: true,
      count: syncedCount,
      message: `Successfully synced ${syncedCount} subscription(s)`,
    })
  } catch (error: any) {
    console.error('Subscription sync error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to sync subscriptions', synced: false },
      { status: 500 }
    )
  }
}
