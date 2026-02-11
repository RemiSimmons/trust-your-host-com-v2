// Stripe configuration with validation
export const getStripePublishableKey = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  
  if (!key && process.env.NODE_ENV === 'development') {
    console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined')
  }
  
  return key
}
