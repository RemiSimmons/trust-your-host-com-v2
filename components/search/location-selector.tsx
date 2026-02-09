"use client"
import { useState, useRef, useEffect } from "react"
import { MapPin, Loader2 } from "lucide-react"
import { Loader } from "@googlemaps/js-api-loader"
import { getGoogleMapsApiKey } from "@/app/actions/profile"

// Google Maps types
interface PlacePrediction {
  description: string
  place_id: string
  structured_formatting?: {
    main_text: string
    secondary_text: string
  }
}

interface SelectedLocation {
  description: string
  placeId: string
}

export function LocationSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [predictions, setPredictions] = useState<PlacePrediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const autocompleteServiceRef = useRef<google.maps.places.AutocompleteService | null>(null)
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null)

  // Fetch API key on mount
  useEffect(() => {
    getGoogleMapsApiKey().then(setApiKey)
  }, [])

  // Initialize Google Places API
  useEffect(() => {
    if (!apiKey) return

    const init = async () => {
      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
        })

        const places = await loader.importLibrary("places")

        autocompleteServiceRef.current = new places.AutocompleteService()

        // Create a dummy div for PlacesService
        const dummyMap = document.createElement("div")
        placesServiceRef.current = new places.PlacesService(dummyMap)
      } catch (e) {
        // Silently fail - Google Maps API not available
      }
    }

    init()
  }, [apiKey])

  // Fetch predictions as user types
  useEffect(() => {
    if (!searchTerm || searchTerm.length < 3) {
      setPredictions([])
      return
    }

    if (!autocompleteServiceRef.current) return

    setIsLoading(true)

    const request = {
      input: searchTerm,
      types: ["(cities)"], // Restrict to cities
      componentRestrictions: { country: "us" }, // US only (adjust as needed)
    }

    autocompleteServiceRef.current.getPlacePredictions(request, (results, status) => {
      setIsLoading(false)

      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        setPredictions(results as PlacePrediction[])
      } else {
        setPredictions([])
      }
    })
  }, [searchTerm])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectPrediction = (prediction: PlacePrediction) => {
    setSelectedLocation({
      description: prediction.description,
      placeId: prediction.place_id,
    })
    setSearchTerm(prediction.description)
    setIsOpen(false)

    // Optional: Get detailed place info
    if (placesServiceRef.current) {
      placesServiceRef.current.getDetails({ placeId: prediction.place_id }, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          // Here you would typically update a global search context or URL params
        }
      })
    }
  }

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-white drop-shadow-md">Location</label>

      {/* Input field */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Where to?"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/70 focus:bg-white/25 focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm transition-all"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 animate-spin" />
        )}
      </div>

      {/* Dropdown with predictions */}
      {isOpen && (searchTerm.length >= 3 || predictions.length > 0) && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
          {predictions.length > 0 ? (
            <div className="py-2">
              {predictions.map((prediction) => (
                <button
                  key={prediction.place_id}
                  onClick={() => handleSelectPrediction(prediction)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
                    <div>
                      <div className="text-gray-900 text-sm font-medium">
                        {prediction.structured_formatting.main_text}
                      </div>
                      <div className="text-gray-500 text-xs">{prediction.structured_formatting.secondary_text}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : searchTerm.length >= 3 && !isLoading ? (
            <div className="px-4 py-6 text-center text-gray-500 text-sm">No locations found</div>
          ) : null}

          {/* Powered by Google */}
          <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-end">
            <img
              src="https://developers.google.com/static/maps/documentation/images/powered_by_google_on_white.png"
              alt="Powered by Google"
              className="h-4"
            />
          </div>
        </div>
      )}
    </div>
  )
}
