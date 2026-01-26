'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CreditCard, TrendingUp, Calendar, ExternalLink, Edit } from 'lucide-react'
import type { Property } from '@/lib/types'
import type { PropertyClickAnalytics } from '@/lib/db/analytics'
import Link from 'next/link'

interface AnalyticsData {
  property: Property
  clicks: PropertyClickAnalytics
}

interface HostAnalyticsDashboardProps {
  properties: AnalyticsData[]
  stripeCustomerId?: string
}

export function HostAnalyticsDashboard({ properties, stripeCustomerId }: HostAnalyticsDashboardProps) {
  const [isLoadingBilling, setIsLoadingBilling] = useState(false)

  async function handleManageBilling() {
    setIsLoadingBilling(true)
    try {
      const response = await fetch('/api/stripe/create-portal-session', {
        method: 'POST'
      })
      const { url } = await response.json()
      window.location.href = url
    } catch (error) {
      alert('Failed to open billing portal')
      setIsLoadingBilling(false)
    }
  }

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <h3 className="text-lg font-semibold mb-2">No Properties Yet</h3>
          <p className="text-muted-foreground mb-4">
            Your properties will appear here once they're approved
          </p>
          <Button asChild>
            <Link href="/submit-property">
              Submit a Property
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {properties.map(({ property, clicks }) => {
        const trialEndsAt = property.trial_ends_at ? new Date(property.trial_ends_at) : null
        const daysRemaining = trialEndsAt 
          ? Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
          : null
        const isInTrial = property.subscription_status === 'trial' && daysRemaining && daysRemaining > 0

        // Prepare chart data
        const chartData = Object.entries(clicks.dailyBreakdown).map(([date, count]) => ({
          date,
          clicks: count
        }))

        return (
          <Card key={property.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{property.name}</CardTitle>
                  <CardDescription>{property.location.city}, {property.location.state}</CardDescription>
                </div>
                <div className="flex gap-2">
                  {isInTrial && (
                    <Badge variant="secondary">
                      <Calendar className="h-3 w-3 mr-1" />
                      Trial: {daysRemaining} days left
                    </Badge>
                  )}
                  {property.subscription_status === 'active' && (
                    <Badge variant="default">Active</Badge>
                  )}
                  {property.subscription_status === 'paused' && (
                    <Badge variant="destructive">Paused</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Trial Warning */}
              {isInTrial && daysRemaining <= 7 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Trial ending soon!</strong> Your trial ends in {daysRemaining} days. 
                    Update your payment method to continue receiving referral traffic.
                  </p>
                  {stripeCustomerId && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="mt-2"
                      onClick={handleManageBilling}
                      disabled={isLoadingBilling}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Manage Billing
                    </Button>
                  )}
                </div>
              )}

              {/* Click Stats */}
              <Tabs defaultValue="week" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                  <TabsTrigger value="month">This Month</TabsTrigger>
                  <TabsTrigger value="all">All Time</TabsTrigger>
                </TabsList>
                <TabsContent value="today">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{clicks.today}</div>
                        <p className="text-sm text-muted-foreground">clicks today</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="week">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{clicks.week}</div>
                        <p className="text-sm text-muted-foreground">clicks this week</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="month">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{clicks.month}</div>
                        <p className="text-sm text-muted-foreground">clicks this month</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="all">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold">{clicks.allTime}</div>
                        <p className="text-sm text-muted-foreground">total clicks</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Chart */}
              {chartData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Click Trends (Last 30 Days)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="date" 
                          className="text-xs"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis className="text-xs" tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="clicks" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6', r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="outline" asChild className="flex-1">
                  <a 
                    href={`/properties/${property.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Listing
                  </a>
                </Button>
                {property.external_booking_url && (
                  <Button variant="outline" asChild className="flex-1">
                    <a 
                      href={property.external_booking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Your Website
                    </a>
                  </Button>
                )}
                {stripeCustomerId && (
                  <Button 
                    variant="outline"
                    onClick={handleManageBilling}
                    disabled={isLoadingBilling}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
