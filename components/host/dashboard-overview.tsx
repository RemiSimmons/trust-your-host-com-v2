"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Star, CalendarDays } from "lucide-react"
import type { DashboardStats } from "@/lib/db/analytics"

interface DashboardOverviewProps {
  stats?: DashboardStats
}

export function DashboardOverview({ stats }: DashboardOverviewProps) {
  // Default values or passed stats
  const data = stats || {
    revenue: 0,
    activeBookings: 0,
    reviewScore: 0,
    totalGuests: 0,
  }

  const cards = [
    {
      title: "Total Clicks",
      value: `${data.revenue.toLocaleString()}`,
      change: "Lifetime clicks to your site",
      icon: TrendingUp,
    },
    {
      title: "This Month",
      value: data.activeBookings.toString(),
      change: "Clicks this month",
      icon: CalendarDays,
    },
    {
      title: "Listing Status",
      value: data.reviewScore > 0 ? "Active" : "Pending",
      change: "Directory placement",
      icon: Star,
    },
    {
      title: "Profile Views",
      value: data.totalGuests.toString(),
      change: "Property page views",
      icon: Users,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
