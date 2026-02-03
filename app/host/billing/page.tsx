'use client'

import { useState, useEffect, Suspense } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, CheckCircle, CreditCard } from 'lucide-react'
import { NavBar } from '@/components/navigation/nav-bar'
import { Footer } from '@/components/navigation/footer'
import { useRouter, useSearchParams } from 'next/navigation'

function BillingSetupContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [property, setProperty] = useState<any>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const canceled = searchParams.get('canceled')

  useEffect(() => {
    const supabase = createBrowserClient()
    
    // Get user and their property
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/host/login')
        return
      }
      setUser(user)

      // Get user's property that needs billing setup
      const { data: property } = await supabase
        .from('properties')
        .select('*')
        .eq('host_id', user.id)
        .eq('subscription_status', 'pending_payment')
        .single()
      
      setProperty(property)

      // If no property pending payment, redirect to dashboard
      if (!property) {
        router.push('/host')
      }
    }

    loadData()
  }, [router])

  const handleSubscribe = async () => {
    setIsLoading(true)
    
    try {
      // Call API to create Stripe Checkout session
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        const errorMsg = data.error || 'Failed to create checkout session'
        console.error('API Error:', errorMsg)
        alert(`Error: ${errorMsg}`)
        setIsLoading(false)
        return
      }

      const { sessionId } = data
      
      if (!sessionId) {
        alert('No session ID returned from server')
        setIsLoading(false)
        return
      }
      
      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      if (!stripe) {
        alert('Failed to load Stripe. Please check your connection.')
        setIsLoading(false)
        return
      }

      const { error } = await stripe.redirectToCheckout({ sessionId })
      
      if (error) {
        console.error('Stripe checkout error:', error)
        alert(`Stripe Error: ${error.message}`)
        setIsLoading(false)
      }
    } catch (error: any) {
      console.error('Error creating checkout session:', error)
      alert(`Error: ${error.message || 'Failed to create checkout session. Please try again.'}`)
      setIsLoading(false)
    }
  }

  // Calculate trial end date (60 days from now)
  const trialEndDate = new Date()
  trialEndDate.setDate(trialEndDate.getDate() + 60)
  const formattedTrialEnd = trialEndDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-4">
          {/* Success Message */}
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 mb-6 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900 dark:text-green-100">
                  Your property is approved! 🎉
                </p>
                <p className="text-sm text-green-800 dark:text-green-200 mt-1">
                  Set up billing to activate your listing and start receiving traffic.
                </p>
              </div>
            </div>
          </div>

          {/* Cancellation Notice */}
          {canceled && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6 rounded">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Payment setup was canceled. Your property won't be live until you complete billing setup.
              </p>
            </div>
          )}

          <h1 className="text-3xl font-bold mb-2">Set Up Your Subscription</h1>
          <p className="text-muted-foreground mb-8">
            Complete your billing setup to activate your property listing.
          </p>

          {/* Subscription Details Card */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-6">Subscription Details</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly listing fee</span>
                  <span className="font-bold text-lg">$49/month</span>
                </div>
                
                <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                  <span className="font-semibold">First 60 days</span>
                  <span className="font-bold text-lg">FREE</span>
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="font-semibold">Due today</span>
                  <span className="font-bold text-2xl">$0.00</span>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  What happens next:
                </p>
                <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>Your property goes live <strong>immediately</strong></span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>Enjoy 60 days completely free</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>First charge on <strong>{formattedTrialEnd}</strong></span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>Cancel anytime, no questions asked</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    <span>Keep 100% of your booking revenue</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 text-lg"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Setting up...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                Activate My Listing
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            Powered by Stripe. Secure payment processing. Your card won't be charged for 60 days.
          </p>

          {/* FAQ */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold mb-1">When will I be charged?</p>
                <p className="text-muted-foreground">
                  Your first charge will be on {formattedTrialEnd}, exactly 60 days from today. You'll receive a reminder email 7 days before.
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">Can I cancel anytime?</p>
                <p className="text-muted-foreground">
                  Yes! Cancel anytime from your dashboard. If you cancel during the trial, you won't be charged at all.
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">Do you take a commission on bookings?</p>
                <p className="text-muted-foreground">
                  No! Unlike Airbnb or VRBO, we don't take any commission. You keep 100% of your booking revenue. We only charge the $49/month listing fee.
                </p>
              </div>
              <div>
                <p className="font-semibold mb-1">Is my payment information secure?</p>
                <p className="text-muted-foreground">
                  Yes. We use Stripe, the same payment processor used by Amazon, Google, and millions of businesses. Your card details are encrypted and never stored on our servers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function BillingSetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    }>
      <BillingSetupContent />
    </Suspense>
  )
}
