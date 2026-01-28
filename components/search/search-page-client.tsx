"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SlidersHorizontal, X } from "lucide-react"
import type { Property } from "@/lib/types"
import { PropertyCard } from "@/components/home/featured-properties"
import { FilterSidebar } from "@/components/search/filter-sidebar"
import { CityResultsGroup } from "@/components/search/city-results-group"
import { MapListToggle } from "@/components/search/map-list-toggle"
import { filterProperties, sortProperties, INITIAL_FILTERS, type FilterState } from "@/lib/utils/search"
import { Button } from "@/components/ui/button"
import { fifaCities } from "@/lib/data/fifa-cities"

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("@/components/search/map-view").then(mod => ({ default: mod.MapView })), {
  ssr: false,
  loading: () => <div className="h-[calc(100vh-240px)] w-full rounded-xl bg-gray-100 animate-pulse" />
})

interface SearchPageClientProps {
  initialProperties: Property[]
}

export function SearchPageClient({ initialProperties }: SearchPageClientProps) {
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [sortBy, setSortBy] = useState("relevance")
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [view, setView] = useState<"list" | "map">("list")

  // Apply URL parameters on mount
  useEffect(() => {
    const event = searchParams.get("event") || (searchParams.get("fifa2026") === "true" ? "fifa-2026" : null)
    const cityParam = searchParams.get("city")
    const locationParam = searchParams.get("location")
    const experienceParam = searchParams.get("experience")
    const radius = searchParams.get("radius")
    
    // Handle cities from either 'city' or 'location' param
    let cities: string[] = []
    if (cityParam) {
      cities = cityParam.split(",")
    } else if (locationParam && locationParam !== "all") {
      // Map location slug to city ID
      cities = [locationParam]
    }
    
    // Map experience slug to experience label
    const experienceMap: Record<string, string> = {
      "island-getaways": "Island Getaways",
      "waterfront-escapes": "Waterfront Escapes",
      "cultural-immersion": "Cultural Immersion",
      "mountain-lodges": "Mountain Lodges",
      "hiking-trails": "Hiking & Trails",
      "wellness-retreats": "Wellness Retreats",
      "pet-friendly": "Pet Friendly", // Special case - maps to petFriendly filter
      "family-friendly": "Family-Friendly", // Special case
      "luxury": "Luxury Properties", // Special case
    }
    
    const experiences: string[] = []
    let petFriendly = false
    
    if (experienceParam && experienceParam !== "all") {
      if (experienceParam === "pet-friendly") {
        petFriendly = true
      } else if (experienceMap[experienceParam]) {
        experiences.push(experienceMap[experienceParam])
      }
    }
    
    // Only update if we have any params
    if (event || cities.length > 0 || experiences.length > 0 || petFriendly) {
      setFilters(prev => ({
        ...prev,
        event,
        cities,
        experiences: experiences.length > 0 ? experiences : prev.experiences,
        petFriendly: petFriendly || prev.petFriendly,
        radiusMiles: radius ? Number(radius) : prev.radiusMiles
      }))
    }
  }, [searchParams])

  const filteredProperties = useMemo(() => {
    const filtered = filterProperties(initialProperties, filters)
    return sortProperties(filtered, sortBy)
  }, [initialProperties, filters, sortBy])

  // Group properties by city when multiple cities selected
  const propertiesByCity = useMemo(() => {
    if (filters.cities.length === 0) return null
    
    const grouped: Record<string, Property[]> = {}
    filters.cities.forEach(cityId => {
      grouped[cityId] = filteredProperties.filter(p => {
        const cityMatches: Record<string, boolean> = {
          "new-york-new-jersey": p.location.city.toLowerCase().includes("new") || p.location.state === "New Jersey" || p.location.city === "Brooklyn" || p.location.city === "Hoboken",
          "miami-gardens": p.location.city.toLowerCase().includes("miami") || p.location.city === "Coral Gables" || p.location.city === "Aventura" || p.location.city === "Key Biscayne" || p.location.city === "Coconut Grove",
          "los-angeles": p.location.city.toLowerCase().includes("angeles") || p.location.city === "Inglewood" || p.location.city === "Santa Monica",
          "atlanta": p.location.city === "Atlanta",
          "boston": p.location.city === "Boston" || p.location.city === "Foxborough",
          "philadelphia": p.location.city === "Philadelphia",
          "kansas-city": p.location.city === "Kansas City",
          "dallas": p.location.city === "Dallas" || p.location.city === "Arlington",
          "houston": p.location.city === "Houston",
          "seattle": p.location.city === "Seattle",
          "san-francisco": p.location.city.toLowerCase().includes("san") || p.location.city === "Santa Clara"
        }
        return cityMatches[cityId] || false
      })
    })
    return grouped
  }, [filteredProperties, filters.cities])

  const activeFilterCount =
    filters.experiences.length +
    filters.propertyTypes.length +
    filters.amenities.length +
    filters.cities.length +
    (filters.bedrooms > 0 ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.petFriendly ? 1 : 0) +
    (filters.event ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Top Bar */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 mb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Results count + active filters */}
            <div className="flex items-center gap-4">
              <p className="text-gray-700 font-medium">
                Showing {filteredProperties.length} of {initialProperties.length} properties
              </p>

              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden ml-auto bg-transparent"
                onClick={() => setIsMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </div>

            {/* Right: Sort dropdown and Map/List toggle */}
            <div className="flex items-center gap-3">
              <MapListToggle view={view} onViewChange={setView} />
              <span className="text-sm text-gray-500 hidden md:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="relative">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-80 shrink-0 sticky top-[140px] h-[calc(100vh-160px)]">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Map View */}
              {view === "map" ? (
                <MapView
                  properties={filteredProperties}
                  stadiumCoords={filters.cities.length === 1 ? fifaCities.find(c => c.id === filters.cities[0])?.stadium.coordinates ? {
                    lat: fifaCities.find(c => c.id === filters.cities[0])!.stadium.coordinates![0],
                    lng: fifaCities.find(c => c.id === filters.cities[0])!.stadium.coordinates![1]
                  } : undefined : undefined}
                  radiusMiles={filters.radiusMiles}
                  distanceFrom={filters.distanceFrom}
                />
              ) : (
                /* List View */
                <>
                  {/* Multi-City Grouped Results */}
                  {propertiesByCity ? (
                    <div>
                      {filters.cities.map(cityId => (
                        <CityResultsGroup
                          key={cityId}
                          cityId={cityId}
                          properties={propertiesByCity[cityId] || []}
                        />
                      ))}
                    </div>
                  ) : (
                    /* Single List View */
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      <AnimatePresence mode="popLayout">
                        {filteredProperties.map((property) => (
                          <motion.div
                            key={property.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                          >
                            <PropertyCard property={property} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </>
              )}

              {/* Empty State */}
              {filteredProperties.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-serif text-2xl text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
                  <Button onClick={() => setFilters(INITIAL_FILTERS)} variant="outline">
                    Clear all filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 h-[85vh] bg-white z-50 rounded-t-2xl flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-serif text-xl font-bold">Filters</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  className="border-none shadow-none p-0 h-auto"
                />
              </div>

              <div className="p-4 border-t border-gray-200 bg-white pb-8">
                <Button className="w-full" size="lg" onClick={() => setIsMobileFiltersOpen(false)}>
                  Show {filteredProperties.length} Properties
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
