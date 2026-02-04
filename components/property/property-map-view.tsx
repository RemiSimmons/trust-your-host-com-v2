"use client"

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Circle, Popup, useMap } from 'react-leaflet'
import { divIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface PropertyMapViewProps {
  lat: number
  lng: number
  city: string
}

// Component to handle map initialization and ensure tiles load
function MapInitializer() {
  const map = useMap()
  
  useEffect(() => {
    // Force map to invalidate size multiple times to ensure tiles load
    const timer1 = setTimeout(() => map.invalidateSize(), 100)
    const timer2 = setTimeout(() => map.invalidateSize(), 300)
    const timer3 = setTimeout(() => map.invalidateSize(), 500)
    
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [map])
  
  return null
}

export default function PropertyMapView({ lat, lng, city }: PropertyMapViewProps) {
  // Debug logging
  console.log('[PropertyMapView] Received coordinates:', { lat, lng, city })
  
  // Validate coordinates - check for null, undefined, 0, or out of range
  const isValidLat = lat != null && !isNaN(lat) && lat !== 0 && lat >= -90 && lat <= 90
  const isValidLng = lng != null && !isNaN(lng) && lng !== 0 && lng >= -180 && lng <= 180
  
  const validLat = isValidLat ? lat : 33.7490 // Default: Atlanta
  const validLng = isValidLng ? lng : -84.3880 // Default: Atlanta
  
  if (!isValidLat || !isValidLng) {
    console.warn('[PropertyMapView] Using fallback coordinates for:', city, 'Original:', { lat, lng })
  }
  
  console.log('[PropertyMapView] Using coordinates:', { validLat, validLng })
  
  // Custom marker icon
  const customIcon = divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background: #ff6b35;
        width: 36px;
        height: 36px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 18px;
          font-weight: bold;
        ">📍</div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
  })

  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50" style={{ height: '400px', minHeight: '400px' }}>
      <MapContainer
        center={[validLat, validLng]}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={true}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <MapInitializer />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          minZoom={1}
          crossOrigin={true}
        />
        
        {/* Approximate area circle (0.5 mile radius) */}
        <Circle
          center={[validLat, validLng]}
          radius={800}
          pathOptions={{
            color: '#ff6b35',
            fillColor: '#ff6b35',
            fillOpacity: 0.1,
            weight: 2,
          }}
        />

        {/* Marker */}
        <Marker position={[validLat, validLng]} icon={customIcon}>
          <Popup>
            <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
              <strong>{city}</strong><br />
              <small>Approximate location</small>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
