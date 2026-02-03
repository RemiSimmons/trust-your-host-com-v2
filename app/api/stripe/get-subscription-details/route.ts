import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { subscriptionId } = await req.json()
    
    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 })
    }

    // Verify this subscription belongs to the user
    const { data: property } = await supabase
      .from('properties')
      .select('id, host_id, stripe_subscription_id')
      .eq('stripe_subscription_id', subscriptionId)
      .eq('host_id', user.id)
      .single()

    if (!property) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    // Fetch subscription from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['default_payment_method']
    })

    // Get last 4 digits of card if available
    let lastFourDigits = null
    if (subscription.default_payment_method && typeof subscription.default_payment_method === 'object') {
      const paymentMethod = subscription.default_payment_method as any
      if (paymentMethod.card) {
        lastFourDigits = paymentMethod.card.last4
      }
    }

    return NextResponse.json({
      status: subscription.status,
      currentPeriodEnd: subscription.current_period_end,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      lastFourDigits,
      trialEnd: subscription.trial_end
    })
  } catch (error: any) {
    console.error('Error fetching subscription details:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch subscription details' },
      { status: 500 }
    )
  }
}
