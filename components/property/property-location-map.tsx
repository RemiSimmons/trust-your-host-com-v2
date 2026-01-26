"use client"
import { useEffect, useRef, useState } from "react"
import { MapPin, Navigation, Coffee, Mountain, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"
import { getGoogleMapsApiKey } from "@/app/actions/profile"

interface PropertyLocationMapProps {
  location: {
    coordinates: { lat: number; lng: number }
    city: string
    state: string
  }
  propertyName: string
}

export function PropertyLocationMap({ location, propertyName }: PropertyLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any | null>(null)
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [apiKey, setApiKey] = useState<string>("")

  useEffect(() => {
    getGoogleMapsApiKey().then(setApiKey)
  }, [])

  useEffect(() => {
    if (!apiKey) return

    const init = async () => {
      try {
        const { Loader } = await import("@googlemaps/js-api-loader")
        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
        })

        const [placesLib, mapsLib, markerLib] = (await Promise.all([
          loader.importLibrary("places"),
          loader.importLibrary("maps"),
          loader.importLibrary("marker"),
        ])) as any[]

        if (!mapRef.current) return

        const mapInstance = new mapsLib.Map(mapRef.current, {
          center: location.coordinates,
          zoom: 13,
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#c9e7f5" }],
            },
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
          mapTypeControl: false,
          streetViewControl: true,
          fullscreenControl: true,
        })

        const marker = new markerLib.Marker({
          position: location.coordinates,
          map: mapInstance,
          title: propertyName,
          icon: {
            url:
              "data:image/svg+xml;base64," +
              btoa(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#d4a574" stroke="white" strokeWidth="3"/>
              <path d="M20 10 L20 30 M10 20 L30 20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            </svg>
          `),
            scaledSize: new mapsLib.Size(40, 40),
          },
        })

        const infoWindow = new mapsLib.InfoWindow({
          content: `
          <div style="padding: 12px;">
            <h3 style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">${propertyName}</h3>
            <p style="color: #666; font-size: 14px;">${location.city}, ${location.state}</p>
          </div>
        `,
        })

        marker.addListener("click", () => {
          infoWindow.open(mapInstance, marker)
        })

        setMap(mapInstance)

        fetchNearbyPlaces(mapInstance, placesLib)
      } catch (e) {
        console.error("Failed to load Google Maps API", e)
      }
    }

    init()
  }, [location, propertyName, apiKey])

  const fetchNearbyPlaces = (mapInstance: any, placesLib: any) => {
    const service = new placesLib.PlacesService(mapInstance)

    const request = {
      location: location.coordinates,
      radius: 5000,
      type: "point_of_interest",
    }

    service.nearbySearch(request, (results: any, status: any) => {
      if (status === placesLib.PlacesServiceStatus.OK && results) {
        const filtered = results.filter((place: any) => {
          const types = place.types || []
          return (
            types.includes("restaurant") ||
            types.includes("cafe") ||
            types.includes("tourist_attraction") ||
            types.includes("park") ||
            types.includes("hiking_area")
          )
        })

        setNearbyPlaces(filtered.slice(0, 20))

        filtered.slice(0, 20).forEach((place: any) => {
          if (!place.geometry?.location) return

          const placeMarker = new window.google.maps.Marker({
            position: place.geometry.location,
            map: mapInstance,
            title: place.name,
            icon: {
              url: place.icon || "",
              scaledSize: new window.google.maps.Size(24, 24),
            },
          })

          const placeInfoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 12px; max-width: 200px;">
                <h4 style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">${place.name}</h4>
                ${place.rating ? `<div style="color: #d4a574; font-size: 13px;">★ ${place.rating}</div>` : ""}
                ${place.vicinity ? `<p style="color: #666; font-size: 12px; margin-top: 4px;">${place.vicinity}</p>` : ""}
              </div>
            `,
          })

          placeMarker.addListener("click", () => {
            placeInfoWindow.open(mapInstance, placeMarker)
          })
        })
      }
    })
  }

  const categories = [
    { id: "all", label: "All", icon: MapPin },
    { id: "restaurant", label: "Dining", icon: UtensilsCrossed },
    { id: "cafe", label: "Cafes", icon: Coffee },
    { id: "park", label: "Nature", icon: Mountain },
  ]

  const filteredPlaces =
    activeCategory === "all" ? nearbyPlaces : nearbyPlaces.filter((place: any) => place.types?.includes(activeCategory))

  return (
    <div className="space-y-6">
      <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-lg">
        <div ref={mapRef} className="w-full h-[500px]" />

        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 flex gap-2 z-10">
          {categories.map((category: any) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all",
                  activeCategory === category.id
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4">Nearby Attractions ({filteredPlaces.length})</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPlaces.slice(0, 8).map((place: any, index: number) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all"
            >
              {place.icon && <img src={place.icon || "/placeholder.svg"} alt="" className="w-6 h-6 shrink-0" />}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{place.name}</h4>
                {place.rating && (
                  <div className="flex items-center gap-1 text-sm text-accent mt-1">
                    <span>★ {place.rating}</span>
                    {place.user_ratings_total && <span className="text-gray-500">({place.user_ratings_total})</span>}
                  </div>
                )}
                {place.vicinity && <p className="text-xs text-gray-500 mt-1 truncate">{place.vicinity}</p>}
              </div>
              <button
                onClick={() => {
                  if (place.geometry?.location && map) {
                    map.panTo(place.geometry.location)
                    map.setZoom(15)
                  }
                }}
                className="text-accent hover:text-accent/80 shrink-0"
              >
                <Navigation className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all"
        >
          <Navigation className="h-5 w-5" />
          Get Directions
        </a>
      </div>
    </div>
  )
}
