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

    const { propertyId } = await req.json()
    
    if (!propertyId) {
      return NextResponse.json({ error: 'Property ID is required' }, { status: 400 })
    }

    // Get the property and verify ownership
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('id, host_id, stripe_subscription_id, subscription_status, name')
      .eq('id', propertyId)
      .eq('host_id', user.id)
      .single()

    if (propertyError || !property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 })
    }

    if (!property.stripe_subscription_id) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 400 })
    }

    // Cancel subscription at period end (not immediately)
    // This keeps the listing active until the billing cycle ends
    const subscription = await stripe.subscriptions.update(property.stripe_subscription_id, {
      cancel_at_period_end: true
    }) as unknown as Stripe.Subscription // Cast to avoid Response<> wrapper type

    // Update property status to indicate pending cancellation
    // Keep is_active = true until the subscription actually ends
    await supabase
      .from('properties')
      .update({
        subscription_status: 'canceled',
        updated_at: new Date().toISOString()
      })
      .eq('id', propertyId)

    console.log(`✅ Subscription ${subscription.id} set to cancel at period end for property ${property.name}`)

    // Format the response properly - timestamps are Unix seconds
    return NextResponse.json({
      success: true,
      message: 'Subscription will be canceled at the end of the billing period',
      cancelAt: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
      currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000).toISOString() : null
    })
  } catch (error: any) {
    console.error('Error canceling subscription:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}
