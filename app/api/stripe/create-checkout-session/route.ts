import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
})

export async function POST(req: Request) {
  try {
    // Validate required environment variables
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Missing STRIPE_SECRET_KEY')
      return NextResponse.json(
        { error: 'Payment system not configured' },
        { status: 500 }
      )
    }
    if (!process.env.STRIPE_PRICE_ID || !process.env.STRIPE_ADDITIONAL_PRICE_ID) {
      console.error('Missing STRIPE_PRICE_ID or STRIPE_ADDITIONAL_PRICE_ID')
      return NextResponse.json(
        { error: 'Payment pricing not configured' },
        { status: 500 }
      )
    }

    const supabase = await createServerClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's profile for email and name
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, full_name')
      .eq('id', user.id)
      .single()

    // Get the property that needs billing setup (with pricing info)
    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .select('id, name, is_primary_property, monthly_amount')
      .eq('host_id', user.id)
      .eq('subscription_status', 'pending_payment')
      .single()

    if (propertyError) {
      console.error('Property query error:', propertyError)
      return NextResponse.json(
        { error: `Database error: ${propertyError.message}` },
        { status: 500 }
      )
    }

    if (!property) {
      return NextResponse.json(
        { error: 'No approved property pending billing setup' },
        { status: 404 }
      )
    }

    // Determine which Stripe Price ID to use (primary or additional)
    const priceId = property.is_primary_property 
      ? process.env.STRIPE_PRICE_ID
      : process.env.STRIPE_ADDITIONAL_PRICE_ID
    
    // Only first property gets trial
    const trialDays = property.is_primary_property ? 60 : 0

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: profile?.email || user.email,
      line_items: [
        {
          price: priceId!, // $49/month or $39/month based on property
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: trialDays,
        metadata: {
          host_id: user.id,
          property_id: property.id,
          property_name: property.name,
          is_primary_property: property.is_primary_property.toString(),
          monthly_amount: property.monthly_amount.toString(),
        },
      },
      metadata: {
        host_id: user.id,
        property_id: property.id,
        property_name: property.name,
        is_primary_property: property.is_primary_property.toString(),
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/host?setup=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/host/billing?canceled=true`,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Error creating checkout session:', error)
    const errorMessage = error?.message || 'Unknown error'
    return NextResponse.json(
      { error: `Failed to create checkout session: ${errorMessage}` },
      { status: 500 }
    )
  }
}
