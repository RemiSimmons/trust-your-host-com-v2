"use client"

import dynamic from 'next/dynamic'

// Dynamically import map component with no SSR (leaflet requires window)
const PropertyMapView = dynamic(
  () => import('./property-map-view'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 animate-pulse" style={{ height: '400px', minHeight: '400px' }}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-2 text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      </div>
    )
  }
)

export default PropertyMapView
