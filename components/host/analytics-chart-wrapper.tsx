"use client"

import dynamic from 'next/dynamic'

// Dynamically import recharts components with no SSR
export const RevenueChart = dynamic(
  () => import('./analytics-chart').then((mod) => mod.RevenueChart),
  { 
    ssr: false,
    loading: () => (
      <div className="col-span-4 bg-card rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
        <div className="h-[300px] bg-muted rounded"></div>
      </div>
    )
  }
)

export const OccupancyChart = dynamic(
  () => import('./analytics-chart').then((mod) => mod.OccupancyChart),
  { 
    ssr: false,
    loading: () => (
      <div className="col-span-4 lg:col-span-3 bg-card rounded-lg p-6 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
        <div className="h-[300px] bg-muted rounded"></div>
      </div>
    )
  }
)
