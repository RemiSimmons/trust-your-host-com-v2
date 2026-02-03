// Stripe configuration with validation
export const getStripePublishableKey = () => {
  const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  
  if (!key) {
    console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined')
    console.log('Available env vars:', Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC')))
  }
  
  return key
}

// Log at module load time to help debug
if (typeof window !== 'undefined') {
  console.log('Stripe key available:', !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
}
