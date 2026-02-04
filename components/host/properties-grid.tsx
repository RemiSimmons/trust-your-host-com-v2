'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Plus, Edit, BarChart3, Eye, Calendar, Info, AlertCircle, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import type { Property } from '@/lib/types'
import type { PropertyClickAnalytics } from '@/lib/db/analytics'

interface AnalyticsData {
  property: Property
  clicks: PropertyClickAnalytics
}

interface PropertiesGridProps {
  properties: AnalyticsData[]
  totalMonthlyCost: number
}

export function PropertiesGrid({ properties, totalMonthlyCost }: PropertiesGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncError, setSyncError] = useState<string | null>(null)
  
  const propertyCount = properties.length
  const activeCount = properties.filter(p => p.property.verified).length
  const totalClicks = properties.reduce((sum, p) => sum + (p.clicks.allTime || 0), 0)
  const totalViews = properties.reduce((sum, p) => sum + (p.clicks.allTime * 5 || 0), 0) // Mock: 5:1 view to click ratio
  
  // Check if any property has pending payment
  const hasPendingPayment = properties.some(p => 
    p.property.subscription_status === 'pending_payment'
  )

  // Auto-sync subscription status after Stripe checkout
  useEffect(() => {
    const setupSuccess = searchParams.get('setup')
    
    // If user just completed Stripe setup AND still shows pending payment, sync from Stripe
    if (setupSuccess === 'success' && hasPendingPayment && !isSyncing) {
      syncSubscriptionStatus()
    }
  }, [searchParams, hasPendingPayment])

  const syncSubscriptionStatus = async () => {
    setIsSyncing(true)
    setSyncError(null)
    
    try {
      const response = await fetch('/api/stripe/sync-subscription', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (data.synced) {
        console.log('✅ Subscription synced:', data.message)
        // Refresh the page to show updated data
        router.refresh()
      } else {
        console.warn('⚠️ Sync completed but no changes:', data.message)
        setSyncError(data.message || 'Failed to sync subscription')
      }
    } catch (error) {
      console.error('❌ Sync failed:', error)
      setSyncError('Failed to sync subscription status')
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">My Properties</h1>
          <p className="text-muted-foreground">
            {propertyCount} {propertyCount === 1 ? 'property' : 'properties'} • {activeCount} active
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/host/properties/new">
            <Plus className="h-5 w-5 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      {/* Pending Payment Banner */}
      {hasPendingPayment && (
        <Alert className="bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-orange-900 dark:text-orange-100">
                  Complete Your Billing Setup
                </p>
                <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                  {isSyncing 
                    ? 'Syncing subscription status...' 
                    : 'Your property is approved! Set up billing to go live and start receiving traffic.'}
                </p>
                {syncError && (
                  <p className="text-xs text-orange-600 mt-1">
                    ⚠️ {syncError} - Try refreshing the page or{' '}
                    <button 
                      onClick={syncSubscriptionStatus}
                      className="underline hover:no-underline"
                    >
                      click here to sync
                    </button>
                  </p>
                )}
              </div>
              <div className="flex gap-2 ml-4 shrink-0">
                {searchParams.get('setup') === 'success' && (
                  <Button 
                    onClick={syncSubscriptionStatus}
                    disabled={isSyncing}
                    variant="outline"
                    className="border-orange-600 text-orange-600 hover:bg-orange-100"
                  >
                    {isSyncing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Syncing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Sync Status
                      </>
                    )}
                  </Button>
                )}
                <Button asChild className="bg-orange-600 hover:bg-orange-700">
                  <Link href="/host/billing">
                    Complete Setup
                  </Link>
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Multi-Property Pricing Info - Only show when user has multiple properties */}
      {propertyCount > 1 && (
        <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-100">
                  Multi-Property Pricing
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  First property: <strong>$49/month</strong> • Additional properties: <strong>$39/month</strong> each
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  ${totalMonthlyCost}
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">per month</p>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Aggregate Stats */}
      {propertyCount > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold">{totalClicks.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. CTR</p>
                  <p className="text-2xl font-bold">
                    {totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-muted-foreground opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Properties Grid */}
      {propertyCount === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <h3 className="text-lg font-semibold mb-2">No Properties Yet</h3>
            <p className="text-muted-foreground mb-4">
              Submit your first property to start receiving qualified traffic
            </p>
            <Button asChild>
              <Link href="/submit-property">
                <Plus className="h-4 w-4 mr-2" />
                Submit Your First Property
              </Link>
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Already have a property listed? <Link href="/host/properties/new" className="text-primary hover:underline">Add another property</Link>
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map(({ property, clicks }, index) => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              clicks={clicks}
              isPrimary={index === 0}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface PropertyCardProps {
  property: Property
  clicks: PropertyClickAnalytics
  isPrimary: boolean
}

function PropertyCard({ property, clicks, isPrimary }: PropertyCardProps) {
  const trialEndsAt = property.trial_ends_at ? new Date(property.trial_ends_at) : null
  const daysRemaining = trialEndsAt 
    ? Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null
  const isInTrial = property.subscription_status === 'trial' && daysRemaining && daysRemaining > 0

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Property Image */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={property.images[0] || '/placeholder.jpg'}
          alt={property.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Property Info */}
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-bold text-lg mb-1 truncate">{property.name}</h3>
          <p className="text-sm text-muted-foreground">
            {property.location.city}, {property.location.state}
          </p>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          {property.verified ? (
            <Badge variant="default" className="bg-green-600">Active</Badge>
          ) : (
            <Badge variant="secondary">Pending</Badge>
          )}
          
          {isInTrial && (
            <Badge variant="outline" className="border-blue-500 text-blue-700">
              <Calendar className="h-3 w-3 mr-1" />
              Trial: {daysRemaining}d left
            </Badge>
          )}
          
          {property.featured && (
            <Badge variant="outline" className="border-yellow-500 text-yellow-700">
              Featured
            </Badge>
          )}
        </div>

        {/* Click Stats */}
        <div className="grid grid-cols-2 gap-4 py-3 border-t border-b">
          <div>
            <p className="text-xs text-muted-foreground">This Week</p>
            <p className="text-lg font-bold">{clicks.week || 0}</p>
            <p className="text-xs text-muted-foreground">clicks</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">All Time</p>
            <p className="text-lg font-bold">{clicks.allTime || 0}</p>
            <p className="text-xs text-muted-foreground">clicks</p>
          </div>
        </div>

        {/* Property Details */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>{property.capacity.bedrooms} bed</span>
            <span>{property.capacity.bathrooms} bath</span>
            <span>{property.capacity.guests} guests</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/host/properties/${property.id}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href={`/host/analytics?property=${property.id}`}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Link>
          </Button>
        </div>

        {/* View Public Listing */}
        {property.slug ? (
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <a href={`/properties/${property.slug}`} target="_blank" rel="noopener noreferrer">
              <Eye className="h-4 w-4 mr-2" />
              View Public Listing
            </a>
          </Button>
        ) : (
          <Button variant="ghost" size="sm" className="w-full" disabled>
            <Eye className="h-4 w-4 mr-2" />
            Listing Not Published
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
