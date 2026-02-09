"use client"

import dynamic from 'next/dynamic'

// Dynamically import map component with no SSR (leaflet requires window)
const MapView = dynamic(
  () => import('./map-view').then((mod) => ({ default: mod.MapView })),
  { 
    ssr: false,
    loading: () => (
      <div className="relative h-[calc(100vh-240px)] w-full">
        <div className="h-full w-full rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-2 border-gray-200/60 bg-gray-50 animate-pulse">
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-lg font-semibold text-muted-foreground">Loading map...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default MapView
