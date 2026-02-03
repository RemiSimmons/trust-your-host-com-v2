'use client'

import { useState, useEffect, Suspense } from 'react'
import { createBrowserClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, CheckCircle, CreditCard, AlertCircle, Calendar, CreditCard as CardIcon } from 'lucide-react'
import { NavBar } from '@/components/navigation/nav-bar'
import { Footer } from '@/components/navigation/footer'
import { useRouter, useSearchParams } from 'next/navigation'

type ViewMode = 'setup' | 'management' | 'loading'

interface SubscriptionInfo {
  status: string
  currentPeriodEnd: Date | null
  cancelAtPeriodEnd: boolean
  lastFourDigits: string | null
  trialEndsAt: Date | null
}

function BillingSetupContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [isCanceling, setIsCanceling] = useState(false)
  const [isCheckingProperty, setIsCheckingProperty] = useState(true)
  const [viewMode, setViewMode] = useState<ViewMode>('loading')
  const [user, setUser] = useState<any>(null)
  const [property, setProperty] = useState<any>(null)
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const canceled = searchParams.get('canceled')
  const canceledSubscription = searchParams.get('subscription_canceled')

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
      
      console.log('Looking for property for user:', user.id, user.email)

      // First, check for any property with trial or active subscription
      const { data: activeProperty, error: activeError } = await supabase
        .from('properties')
        .select('*')
        .eq('host_id', user.id)
        .in('subscription_status', ['trial', 'active', 'canceled'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (activeProperty && !activeError) {
        // User has an active/trial subscription - show management view
        setProperty(activeProperty)
        setViewMode('management')
        
        // Fetch subscription details from Stripe
        if (activeProperty.stripe_subscription_id) {
          try {
            const res = await fetch('/api/stripe/get-subscription-details', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ subscriptionId: activeProperty.stripe_subscription_id })
            })
            if (res.ok) {
              const data = await res.json()
              setSubscriptionInfo({
                status: activeProperty.subscription_status,
                currentPeriodEnd: data.currentPeriodEnd ? new Date(data.currentPeriodEnd * 1000) : null,
                cancelAtPeriodEnd: data.cancelAtPeriodEnd || false,
                lastFourDigits: data.lastFourDigits,
                trialEndsAt: activeProperty.trial_ends_at ? new Date(activeProperty.trial_ends_at) : null
              })
            }
          } catch (error) {
            console.error('Error fetching subscription details:', error)
          }
        }
        
        setIsCheckingProperty(false)
        return
      }

      // Check for property that needs billing setup
      const { data: pendingProperty, error: propertyError } = await supabase
        .from('properties')
        .select('*')
        .eq('host_id', user.id)
        .eq('subscription_status', 'pending_payment')
        .single()
      
      if (propertyError) {
        console.error('Error fetching property:', propertyError)
        // If error is "not found", redirect. Otherwise stay on page and show error
        if (propertyError.code === 'PGRST116') {
          console.log('No property with pending_payment found, redirecting...')
          router.push('/host')
          return
        }
      }
      
      setProperty(pendingProperty)
      setViewMode('setup')

      // If no property pending payment, redirect to dashboard
      if (!pendingProperty) {
        console.log('Property is null, redirecting...')
        router.push('/host')
      } else {
        console.log('Property found:', pendingProperty.name, pendingProperty.subscription_status)
      }
      
      setIsCheckingProperty(false)
    }

    loadData()
  }, [router])
  
  // Show loading state while checking for property
  if (isCheckingProperty || viewMode === 'loading') {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        </main>
        <Footer />
      </div>
    )
  }

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

      const { url } = data
      
      if (!url) {
        alert('No checkout URL returned from server')
        setIsLoading(false)
        return
      }
      
      // Redirect directly to Stripe Checkout URL
      window.location.href = url
    } catch (error: any) {
      console.error('Error creating checkout session:', error)
      alert(`Error: ${error.message || 'Failed to create checkout session. Please try again.'}`)
      setIsLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? Your listing will remain active until the end of your current billing period.')) {
      return
    }
    
    setIsCanceling(true)
    
    try {
      const res = await fetch('/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId: property?.id })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        alert(`Error: ${data.error || 'Failed to cancel subscription'}`)
        setIsCanceling(false)
        return
      }
      
      // Update local state
      setSubscriptionInfo(prev => prev ? { ...prev, cancelAtPeriodEnd: true } : null)
      
      // Refresh the page to show updated status
      router.push('/host/billing?subscription_canceled=true')
      router.refresh()
    } catch (error: any) {
      console.error('Error canceling subscription:', error)
      alert(`Error: ${error.message || 'Failed to cancel subscription. Please try again.'}`)
      setIsCanceling(false)
    }
  }

  const handleManageBilling = async () => {
    setIsLoading(true)
    
    try {
      const res = await fetch('/api/stripe/create-portal-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        alert(`Error: ${data.error || 'Failed to open billing portal'}`)
        setIsLoading(false)
        return
      }
      
      window.location.href = data.url
    } catch (error: any) {
      console.error('Error opening billing portal:', error)
      alert(`Error: ${error.message || 'Failed to open billing portal. Please try again.'}`)
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

  // Format dates for management view
  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A'
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  // If user has trial/active subscription, show management view
  if (viewMode === 'management') {
    const statusLabel = subscriptionInfo?.status === 'trial' 
      ? 'Free Trial' 
      : subscriptionInfo?.status === 'active' 
        ? 'Active' 
        : subscriptionInfo?.status === 'canceled'
          ? 'Canceled'
          : 'Unknown'
    
    const statusColor = subscriptionInfo?.status === 'trial'
      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      : subscriptionInfo?.status === 'active'
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'

    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Subscription</h1>
            <p className="text-muted-foreground mb-8">
              Manage your listing subscription and billing details.
            </p>

            {/* Cancellation Success Notice */}
            {canceledSubscription && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6 rounded">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100">
                      Subscription Canceled
                    </p>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                      Your listing will remain active until {formatDate(subscriptionInfo?.currentPeriodEnd || subscriptionInfo?.trialEndsAt)}. After that, it will be hidden from search.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Scheduled Cancellation Notice */}
            {subscriptionInfo?.cancelAtPeriodEnd && !canceledSubscription && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6 rounded">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100">
                      Cancellation Scheduled
                    </p>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-1">
                      Your listing will remain active until {formatDate(subscriptionInfo?.currentPeriodEnd || subscriptionInfo?.trialEndsAt)}. After that, it will be hidden from search.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Current Plan Card */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Current Plan</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                    {statusLabel}
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-semibold">Monthly Listing</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Price</span>
                    <span className="font-semibold">$49/month</span>
                  </div>

                  {subscriptionInfo?.status === 'trial' && subscriptionInfo.trialEndsAt && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Trial Ends</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">
                        {formatDate(subscriptionInfo.trialEndsAt)}
                      </span>
                    </div>
                  )}

                  {subscriptionInfo?.currentPeriodEnd && subscriptionInfo.status !== 'trial' && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Next Billing Date</span>
                      <span className="font-semibold">
                        {subscriptionInfo.cancelAtPeriodEnd ? 'N/A (Canceled)' : formatDate(subscriptionInfo.currentPeriodEnd)}
                      </span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-muted-foreground">Property</span>
                    <span className="font-semibold">{property?.name || 'N/A'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            {subscriptionInfo?.lastFourDigits && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                      <CardIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <p className="font-semibold">•••• •••• •••• {subscriptionInfo.lastFourDigits}</p>
                      <p className="text-sm text-muted-foreground">Credit/Debit Card</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleManageBilling}
                disabled={isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-6 text-lg"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Manage Billing
                  </>
                )}
              </Button>

              {!subscriptionInfo?.cancelAtPeriodEnd && subscriptionInfo?.status !== 'canceled' && (
                <Button
                  onClick={handleCancelSubscription}
                  disabled={isCanceling}
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  {isCanceling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Canceling...
                    </>
                  ) : (
                    'Cancel Subscription'
                  )}
                </Button>
              )}
            </div>

            <p className="text-xs text-center text-muted-foreground mt-4">
              Manage your payment method, view invoices, and update billing information through the Stripe billing portal.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

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
