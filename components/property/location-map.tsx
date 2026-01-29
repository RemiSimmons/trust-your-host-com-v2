"use client"

import { MapPin, Navigation } from "lucide-react"
import type { Property } from "@/lib/types"

interface LocationMapProps {
  property: Property
}

export function LocationMap({ property }: LocationMapProps) {
  // Create approximate map center (offset for privacy - 0.25 mile radius)
  const approxLat = property.location.coordinates.lat + (Math.random() - 0.5) * 0.01
  const approxLng = property.location.coordinates.lng + (Math.random() - 0.5) * 0.01

  // Google Maps static API URL (you may need to add API key in production)
  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${approxLat},${approxLng}&zoom=14&size=600x400&markers=color:red%7C${approxLat},${approxLng}&key=YOUR_API_KEY`
  
  // Fallback: OpenStreetMap
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${approxLng - 0.01},${approxLat - 0.01},${approxLng + 0.01},${approxLat + 0.01}&layer=mapnik&marker=${approxLat},${approxLng}`

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
      
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
              Exact address provided after booking
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
          <iframe
            src={osmUrl}
            className="w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            title="Property location map"
          />
        </div>

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
