"use client"

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import { Icon } from "leaflet"
import type { Property } from "@/lib/types"
import Link from "next/link"
import "leaflet/dist/leaflet.css"

interface MapViewProps {
  properties: Property[]
  stadiumCoords?: { lat: number; lng: number }
  centerCoords?: { lat: number; lng: number }
  radiusMiles?: number
  distanceFrom?: "stadium" | "city-center"
}

export function MapView({ 
  properties, 
  stadiumCoords, 
  centerCoords,
  radiusMiles = 25,
  distanceFrom = "stadium"
}: MapViewProps) {
  // Default center - use stadium, center, or first property
  const mapCenter = distanceFrom === "stadium" && stadiumCoords 
    ? [stadiumCoords.lat, stadiumCoords.lng] as [number, number]
    : centerCoords 
    ? [centerCoords.lat, centerCoords.lng] as [number, number]
    : properties.length > 0
    ? [properties[0].location.coordinates.lat, properties[0].location.coordinates.lng] as [number, number]
    : [39.8283, -98.5795] as [number, number] // Center of USA

  const propertyIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  })

  const stadiumIcon = new Icon({
    iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%23dc2626'%3E%3Cpath d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z'/%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  })

  const radiusMeters = radiusMiles * 1609.34 // Convert miles to meters

  return (
    <div className="h-[calc(100vh-240px)] w-full rounded-xl overflow-hidden border border-gray-200">
      <MapContainer
        center={mapCenter}
        zoom={11}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Stadium Marker */}
        {distanceFrom === "stadium" && stadiumCoords && (
          <>
            <Marker position={[stadiumCoords.lat, stadiumCoords.lng]} icon={stadiumIcon}>
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">Stadium</p>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={[stadiumCoords.lat, stadiumCoords.lng]}
              radius={radiusMeters}
              pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.1 }}
            />
          </>
        )}

        {/* City Center Marker */}
        {distanceFrom === "city-center" && centerCoords && (
          <>
            <Marker position={[centerCoords.lat, centerCoords.lng]} icon={stadiumIcon}>
              <Popup>
                <div className="text-center">
                  <p className="font-semibold">City Center</p>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={[centerCoords.lat, centerCoords.lng]}
              radius={radiusMeters}
              pathOptions={{ color: "green", fillColor: "green", fillOpacity: 0.1 }}
            />
          </>
        )}

        {/* Property Markers */}
        {properties.map((property) => (
          <Marker
            key={property.id}
            position={[property.location.coordinates.lat, property.location.coordinates.lng]}
            icon={propertyIcon}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-semibold text-sm mb-1">{property.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{property.location.city}, {property.location.state}</p>
                <p className="text-accent font-bold mb-2">${property.pricing.baseNightlyRate}/night</p>
                {property.distance_to_stadium && (
                  <p className="text-xs text-gray-500 mb-2">{property.distance_to_stadium} mi from stadium</p>
                )}
                <Link
                  href={`/properties/${property.slug}`}
                  className="text-xs text-blue-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
