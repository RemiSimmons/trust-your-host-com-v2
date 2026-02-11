"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip, useMap } from "react-leaflet"
import { Icon, DivIcon, LatLngBounds } from "leaflet"
import MarkerClusterGroup from "react-leaflet-cluster"
import type { Property } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"
import { formatCurrency } from "@/lib/utils"
import { getPropertyMapCoordinates } from "@/lib/utils/zip-coordinates"
import "leaflet/dist/leaflet.css"

interface MapViewProps {
  properties: Property[]
  stadiumCoords?: { lat: number; lng: number }
  centerCoords?: { lat: number; lng: number }
  radiusMiles?: number
  distanceFrom?: "stadium" | "city-center"
  hoveredPropertyId?: string | null
  onPropertyHover?: (propertyId: string | null) => void
  onQuickView?: (propertyId: string) => void
}

/** Inner component that fits map bounds when properties change */
function FitBounds({ properties }: { properties: Property[] }) {
  const map = useMap()
  const prevLengthRef = useRef(properties.length)

  useEffect(() => {
    if (properties.length === 0) return
    // Only auto-fit when the set of properties changes
    if (properties.length === prevLengthRef.current) return
    prevLengthRef.current = properties.length

    const bounds = new LatLngBounds(
      properties.map((p) => {
        const coords = getPropertyMapCoordinates(p)
        return [coords.lat, coords.lng] as [number, number]
      })
    )
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 })
  }, [properties, map])

  return null
}

export function MapView({ 
  properties, 
  stadiumCoords, 
  centerCoords,
  radiusMiles = 25,
  distanceFrom = "stadium",
  hoveredPropertyId,
  onPropertyHover,
  onQuickView,
}: MapViewProps) {
  // Default center - use stadium, center, or first property
  const mapCenter = distanceFrom === "stadium" && stadiumCoords 
    ? [stadiumCoords.lat, stadiumCoords.lng] as [number, number]
    : centerCoords 
    ? [centerCoords.lat, centerCoords.lng] as [number, number]
    : properties.length > 0
    ? [properties[0].location.coordinates.lat, properties[0].location.coordinates.lng] as [number, number]
    : [39.8283, -98.5795] as [number, number] // Center of USA

  // Normal marker
  const createPropertyIcon = (price: number, isHighlighted: boolean) => new DivIcon({
    html: `
      <div class="relative">
        <div class="absolute -top-8 left-1/2 -translate-x-1/2 ${isHighlighted ? 'bg-accent text-white border-accent scale-110' : 'bg-white text-primary border-accent'} border-2 shadow-lg rounded-lg px-3 py-1 whitespace-nowrap font-semibold text-sm transition-all duration-200" style="${isHighlighted ? 'z-index:9999;' : ''}">
          ${formatCurrency(price)}
        </div>
        <svg width="28" height="38" viewBox="0 0 28 38" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.27 0 0 6.27 0 14C0 24.5 14 38 14 38C14 38 28 24.5 28 14C28 6.27 21.73 0 14 0Z" fill="${isHighlighted ? '#c0392b' : '#E67E22'}" stroke="#fff" stroke-width="2"/>
          <circle cx="14" cy="14" r="6" fill="#fff"/>
        </svg>
      </div>
    `,
    className: `custom-marker-icon ${isHighlighted ? 'highlighted-marker' : ''}`,
    iconSize: [28, 38],
    iconAnchor: [14, 38],
    popupAnchor: [0, -38],
  })

  const stadiumIcon = new Icon({
    iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='%23dc2626' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23fee2e2'/%3E%3Cpath d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z' fill='%23dc2626'/%3E%3C/svg%3E",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  })

  const radiusMeters = radiusMiles * 1609.34

  return (
    <div className="relative h-[400px] sm:h-[calc(100vh-240px)] w-full">
      {/* Property Count Indicator */}
      <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-md shadow-lg rounded-lg px-4 py-2 border border-gray-200">
        <p className="text-sm font-semibold text-primary">
          {properties.length} {properties.length === 1 ? 'Property' : 'Properties'} in view
        </p>
      </div>

      <div className="h-full w-full rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-2 border-gray-200/60 relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={11}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
          zoomControl={true}
        >
          <FitBounds properties={properties} />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
            maxZoom={20}
          />

          {/* Stadium/Center Marker */}
          {distanceFrom === "stadium" && stadiumCoords && (
            <>
              <Marker position={[stadiumCoords.lat, stadiumCoords.lng]} icon={stadiumIcon}>
                <Popup>
                  <div className="text-center p-2">
                    <p className="font-bold text-red-600 mb-1">Stadium</p>
                    <p className="text-xs text-gray-600">Search radius: {radiusMiles} miles</p>
                  </div>
                </Popup>
              </Marker>
              <Circle
                center={[stadiumCoords.lat, stadiumCoords.lng]}
                radius={radiusMeters}
                pathOptions={{ 
                  color: "#3b82f6", 
                  fillColor: "#3b82f6", 
                  fillOpacity: 0.08,
                  weight: 2,
                  dashArray: "5, 5"
                }}
              />
            </>
          )}

          {distanceFrom === "city-center" && centerCoords && (
            <>
              <Marker position={[centerCoords.lat, centerCoords.lng]} icon={stadiumIcon}>
                <Popup>
                  <div className="text-center p-2">
                    <p className="font-bold text-red-600 mb-1">City Center</p>
                    <p className="text-xs text-gray-600">Search radius: {radiusMiles} miles</p>
                  </div>
                </Popup>
              </Marker>
              <Circle
                center={[centerCoords.lat, centerCoords.lng]}
                radius={radiusMeters}
                pathOptions={{ 
                  color: "#10b981", 
                  fillColor: "#10b981", 
                  fillOpacity: 0.08,
                  weight: 2,
                  dashArray: "5, 5"
                }}
              />
            </>
          )}

          {/* Property Markers with Clustering */}
          <MarkerClusterGroup
            chunkedLoading
            showCoverageOnHover={false}
            spiderfyOnMaxZoom={true}
            maxClusterRadius={60}
            iconCreateFunction={(cluster: any) => {
              const count = cluster.getChildCount()
              const size = count < 10 ? 'small' : count < 50 ? 'medium' : 'large'
              const dimensions = size === 'small' ? 40 : size === 'medium' ? 50 : 60
              
              return new DivIcon({
                html: `
                  <div class="flex items-center justify-center w-full h-full bg-gradient-to-br from-accent to-orange-600 text-white rounded-full shadow-lg border-3 border-white font-bold transition-transform hover:scale-110">
                    <span class="text-sm">${count}</span>
                  </div>
                `,
                className: 'custom-cluster-icon',
                iconSize: [dimensions, dimensions],
              })
            }}
          >
            {properties.map((property) => {
              const displayCoords = getPropertyMapCoordinates(property)
              const isHighlighted = hoveredPropertyId === property.id
              
              return (
              <Marker
                key={property.id}
                position={[displayCoords.lat, displayCoords.lng]}
                icon={createPropertyIcon(property.pricing.baseNightlyRate, isHighlighted)}
                zIndexOffset={isHighlighted ? 1000 : 0}
                eventHandlers={{
                  mouseover: () => onPropertyHover?.(property.id),
                  mouseout: () => onPropertyHover?.(null),
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -45]}
                  opacity={0.95}
                  permanent={false}
                  className="custom-tooltip"
                >
                  <div className="text-center">
                    <p className="font-semibold text-sm">{property.name}</p>
                    <p className="text-xs text-accent font-bold">{formatCurrency(property.pricing.baseNightlyRate)}/night</p>
                  </div>
                </Tooltip>

                <Popup maxWidth={280} className="custom-popup">
                  <div className="p-1">
                    {property.images[0] && (
                      <div className="relative w-full h-32 mb-3">
                        <Image
                          src={property.images[0]}
                          alt={property.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <h3 className="font-bold text-base mb-1 text-primary">{property.name}</h3>
                    <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                      <span>📍</span>
                      {property.location.city}, {property.location.state}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-accent font-bold text-lg">
                        {formatCurrency(property.pricing.baseNightlyRate)}
                        <span className="text-xs text-gray-500 font-normal">/night</span>
                      </p>
                      {property.rating.average > 0 && (
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <span>⭐</span>
                          {property.rating.average.toFixed(1)} ({property.rating.count})
                        </p>
                      )}
                    </div>
                    {property.distance_to_stadium && (
                      <p className="text-xs text-blue-600 mb-2 font-medium">
                        🏟️ {property.distance_to_stadium} mi to stadium
                      </p>
                    )}
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onQuickView?.(property.id)
                      }}
                      className="block w-full text-center bg-accent hover:bg-accent/90 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors cursor-pointer border-none"
                    >
                      Quick View
                    </button>
                    <Link
                      href={`/properties/${property.slug}`}
                      className="block w-full text-center text-accent hover:text-accent/80 text-xs font-medium underline"
                    >
                      View Full Details
                    </Link>
                  </div>
                  </div>
                </Popup>
              </Marker>
              )
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .custom-marker-icon {
          background: transparent !important;
          border: none !important;
        }
        
        .highlighted-marker {
          z-index: 9999 !important;
        }
        
        .custom-cluster-icon {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
        }
        
        .leaflet-popup-tip {
          box-shadow: 0 3px 14px rgba(0, 0, 0, 0.15) !important;
        }
        
        .custom-tooltip .leaflet-tooltip {
          background: white !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 8px !important;
          padding: 6px 10px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
        
        .leaflet-container {
          font-family: inherit !important;
        }
      `}</style>
    </div>
  )
}
