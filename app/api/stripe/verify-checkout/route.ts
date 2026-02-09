import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
})

/**
 * Verify a Stripe Checkout Session and update the database directly.
 * This is the PRIMARY mechanism for updating subscription status after payment.
 * It does NOT depend on webhooks, solving the reliability issue.
 * 
 * Called from the client after successful Stripe checkout redirect.
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

    const { sessionId } = await req.json()
    
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session ID' },
        { status: 400 }
      )
    }

    console.log(`🔍 Verifying checkout session: ${sessionId} for user: ${user.id}`)

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    })

    // Verify the session belongs to this user
    const sessionHostId = session.metadata?.host_id
    if (sessionHostId !== user.id) {
      console.error(`❌ Session host_id mismatch: ${sessionHostId} !== ${user.id}`)
      return NextResponse.json(
        { error: 'Session does not belong to this user' },
        { status: 403 }
      )
    }

    // Check if the checkout session was completed
    if (session.status !== 'complete' && session.payment_status !== 'paid' && session.payment_status !== 'no_payment_required') {
      console.log(`⚠️ Session ${sessionId} not complete: status=${session.status}, payment_status=${session.payment_status}`)
      return NextResponse.json({
        verified: false,
        message: 'Checkout session not yet completed',
        status: session.status,
        payment_status: session.payment_status,
      })
    }

    const propertyId = session.metadata?.property_id
    const customerId = session.customer as string

    if (!propertyId) {
      console.error(`❌ No property_id in session metadata: ${sessionId}`)
      return NextResponse.json(
        { error: 'No property ID in session metadata' },
        { status: 400 }
      )
    }

    // Get subscription details
    let subscriptionId: string | null = null
    let subscriptionStatus = 'active'
    let trialEndsAt: string | null = null

    if (session.subscription) {
      const subscription = typeof session.subscription === 'string' 
        ? await stripe.subscriptions.retrieve(session.subscription)
        : session.subscription as Stripe.Subscription

      subscriptionId = subscription.id

      // Map Stripe status to our status
      if (subscription.status === 'trialing') {
        subscriptionStatus = 'trial'
      } else if (subscription.status === 'active') {
        subscriptionStatus = 'active'
      } else if (['past_due', 'unpaid', 'incomplete'].includes(subscription.status)) {
        subscriptionStatus = 'paused'
      } else if (['canceled', 'ended'].includes(subscription.status)) {
        subscriptionStatus = 'canceled'
      }

      if (subscription.trial_end) {
        trialEndsAt = new Date(subscription.trial_end * 1000).toISOString()
      }

      console.log(`📋 Subscription: ${subscription.id}, status: ${subscription.status}, trial_end: ${subscription.trial_end}`)
    }

    // Use admin client to bypass RLS for the update
    const adminSupabase = createAdminClient()

    const updateData = {
      stripe_subscription_id: subscriptionId,
      stripe_customer_id: customerId,
      subscription_status: subscriptionStatus,
      trial_ends_at: trialEndsAt,
      is_active: true,
      updated_at: new Date().toISOString(),
    }

    console.log(`🔄 Updating property ${propertyId}:`, updateData)

    // Update property with subscription info
    const { error: propertyError, data: updatedProperty } = await adminSupabase
      .from('properties')
      .update(updateData)
      .eq('id', propertyId)
      .eq('host_id', user.id) // Security: ensure user owns this property
      .select('id, name, subscription_status, is_active')
      .single()

    if (propertyError) {
      console.error(`❌ Failed to update property ${propertyId}:`, propertyError)
      
      // Retry once
      console.log('🔁 Retrying property update...')
      const { error: retryError } = await adminSupabase
        .from('properties')
        .update(updateData)
        .eq('id', propertyId)
        .eq('host_id', user.id)

      if (retryError) {
        console.error(`❌ Retry also failed for property ${propertyId}:`, retryError)
        return NextResponse.json(
          { error: 'Failed to update property status', verified: false },
          { status: 500 }
        )
      }
      console.log(`✅ Property ${propertyId} updated on retry`)
    } else {
      console.log(`✅ Property ${propertyId} updated:`, updatedProperty)
    }

    // Also update host profile with stripe_customer_id
    const { error: profileError } = await adminSupabase
      .from('profiles')
      .update({
        stripe_customer_id: customerId,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (profileError) {
      console.error(`❌ Failed to update profile ${user.id}:`, profileError)
    } else {
      console.log(`✅ Profile ${user.id} updated with stripe_customer_id`)
    }

    return NextResponse.json({
      verified: true,
      property_id: propertyId,
      subscription_status: subscriptionStatus,
      message: `Property successfully activated with status: ${subscriptionStatus}`,
    })
  } catch (error: any) {
    console.error('Verify checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to verify checkout session', verified: false },
      { status: 500 }
    )
  }
}
