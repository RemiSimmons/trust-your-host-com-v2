'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts'
import { TrendingUp, Users, Globe, Clock, MousePointerClick, Eye } from 'lucide-react'
import type { Property } from '@/lib/types'

interface DetailedAnalyticsProps {
  properties: Property[]
}

// Mock data - in production, this would come from your analytics service
const trafficSources = [
  { name: 'Google Search', value: 450, color: '#4285F4' },
  { name: 'Direct', value: 280, color: '#34A853' },
  { name: 'Social Media', value: 150, color: '#FBBC04' },
  { name: 'Referral', value: 120, color: '#EA4335' },
]

const geographicData = [
  { city: 'Los Angeles', clicks: 145, views: 890 },
  { city: 'New York', clicks: 132, views: 756 },
  { city: 'Miami', clicks: 98, views: 543 },
  { city: 'Atlanta', clicks: 87, views: 478 },
  { city: 'Chicago', clicks: 76, views: 412 },
  { city: 'Dallas', clicks: 64, views: 387 },
]

const hourlyData = [
  { hour: '12am', views: 12, clicks: 2 },
  { hour: '3am', views: 8, clicks: 1 },
  { hour: '6am', views: 15, clicks: 3 },
  { hour: '9am', views: 45, clicks: 8 },
  { hour: '12pm', views: 78, clicks: 15 },
  { hour: '3pm', views: 92, clicks: 18 },
  { hour: '6pm', views: 105, clicks: 22 },
  { hour: '9pm', views: 86, clicks: 17 },
]

const weeklyTrends = [
  { day: 'Mon', views: 234, clicks: 45, ctr: 19.2 },
  { day: 'Tue', views: 267, clicks: 52, ctr: 19.5 },
  { day: 'Wed', views: 298, clicks: 61, ctr: 20.5 },
  { day: 'Thu', views: 312, clicks: 67, ctr: 21.5 },
  { day: 'Fri', views: 356, clicks: 78, ctr: 21.9 },
  { day: 'Sat', views: 423, clicks: 95, ctr: 22.5 },
  { day: 'Sun', views: 389, clicks: 84, ctr: 21.6 },
]

export function DetailedAnalytics({ properties }: DetailedAnalyticsProps) {
  const [selectedProperty, setSelectedProperty] = useState(properties[0]?.id || '')

  // Calculate aggregate metrics
  const totalViews = 2279
  const totalClicks = 482
  const clickThroughRate = ((totalClicks / totalViews) * 100).toFixed(1)
  const avgTimeOnPage = '2:34'

  return (
    <div className="space-y-6">
      {/* Property Selector */}
      {properties.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select Property</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
      )}

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Property page views (last 30 days)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicks to Website</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Visitors to your booking site
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clickThroughRate}%</div>
            <p className="text-xs text-muted-foreground">
              Views → Clicks conversion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Time on Page</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgTimeOnPage}</div>
            <p className="text-xs text-muted-foreground">
              Average engagement time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Performance</CardTitle>
          <CardDescription>Views, clicks, and CTR by day of week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyTrends}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="day" className="text-xs" />
              <YAxis yAxisId="left" className="text-xs" />
              <YAxis yAxisId="right" orientation="right" className="text-xs" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="views"
                stroke="#8884d8"
                strokeWidth={2}
                name="Views"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="clicks"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Clicks"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="ctr"
                stroke="#ffc658"
                strokeWidth={2}
                name="CTR %"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {trafficSources.map((source) => (
                <div key={source.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: source.color }}
                    />
                    <span>{source.name}</span>
                  </div>
                  <span className="font-semibold">{source.value} clicks</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Data */}
        <Card>
          <CardHeader>
            <CardTitle>Top Cities</CardTitle>
            <CardDescription>Where your traffic comes from</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={geographicData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="city" className="text-xs" angle={-45} textAnchor="end" height={80} />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#8884d8" name="Views" />
                <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Peak Viewing Times</CardTitle>
          <CardDescription>When travelers are most active</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="hour" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#8884d8" name="Views" />
              <Bar dataKey="clicks" fill="#82ca9d" name="Clicks" />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Most activity between 3pm - 9pm. Consider updating your listing during off-peak hours.
          </p>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Strong weekend performance</p>
              <p className="text-sm text-muted-foreground">
                Your property gets 35% more traffic on weekends. Consider highlighting weekend availability.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Globe className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">High interest from Los Angeles</p>
              <p className="text-sm text-muted-foreground">
                LA accounts for 20% of your traffic. Consider targeting FIFA World Cup fans from California.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Clock className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Evening peak traffic</p>
              <p className="text-sm text-muted-foreground">
                Most visitors browse between 6-9pm. Your response during these hours may boost bookings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
