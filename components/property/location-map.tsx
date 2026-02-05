"use client"

import { useMemo } from "react"
import dynamic from "next/dynamic"
import { MapPin, Navigation, Maximize2 } from "lucide-react"
import type { Property } from "@/lib/types"
import { getPropertyMapCoordinates } from "@/lib/utils/zip-coordinates"

interface LocationMapProps {
  property: Property
}

// Dynamically import map to avoid SSR issues
const DynamicMap = dynamic(() => import("./property-map-view"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
      <div className="text-gray-500">Loading map...</div>
    </div>
  ),
})

export function LocationMap({ property }: LocationMapProps) {
  // Use zip code center coordinates for privacy protection
  const displayCoords = getPropertyMapCoordinates(property)
  
  // Build search query for Google Maps (city, state, zip)
  const mapSearchQuery = property.postal_code 
    ? `${property.location.city}, ${property.location.state} ${property.postal_code}`
    : `${property.location.city}, ${property.location.state}`

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Location</h2>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapSearchQuery)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-accent hover:underline"
        >
          <Maximize2 className="h-4 w-4" />
          Open in Maps
        </a>
      </div>
      
      <div className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
          <MapPin className="h-5 w-5 text-accent mt-0.5" />
          <div>
            <div className="font-semibold text-gray-900">
              {property.location.city}, {property.location.state}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {property.location.region}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Showing zip code area • Exact address provided after booking
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <DynamicMap
          lat={displayCoords.lat}
          lng={displayCoords.lng}
          city={property.location.city}
        />

        {/* Distance Info */}
        {property.distance_to_stadium && (
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <Navigation className="h-5 w-5 text-blue-600" />
            <div>
              <div className="font-medium text-gray-900">
                {property.distance_to_stadium} miles to stadium
              </div>
              <div className="text-sm text-gray-600">
                Approximately {Math.round(property.distance_to_stadium * 3)} minutes by car
              </div>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="text-sm text-gray-600 p-4 bg-gray-50 rounded-lg">
          <p className="mb-2">
            <strong>About the location:</strong>
          </p>
          <p>
            This property is located in {property.location.city}, {property.location.state}, 
            offering convenient access to local attractions and amenities. The exact address 
            will be provided by the host after your booking is confirmed.
          </p>
        </div>
      </div>
    </div>
  )
}
