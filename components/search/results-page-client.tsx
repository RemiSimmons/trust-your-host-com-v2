"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { X, Filter, ArrowLeft } from "lucide-react"
import { Property } from "@/lib/types"
import { getExperienceConfig } from "@/lib/config/experience-config"
import { getCityById } from "@/lib/data/fifa-cities"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FilterModal } from "./filter-modal"
import { filterProperties, type FilterState } from "@/lib/utils/search"
import { experienceKeyToTags } from "@/lib/config/experience-tag-mapping"
import { PropertyCard } from "@/components/home/featured-properties"

interface ResultsPageClientProps {
  initialProperties: Property[]
}

export function ResultsPageClient({ initialProperties }: ResultsPageClientProps) {
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

  // Build back-to-search URL from current params (city, experience, event)
  const searchBackUrl = useMemo(() => {
    const city = searchParams.get("city")
    const experience = searchParams.get("experience")
    const event = searchParams.get("event") || (searchParams.get("fifa2026") === "true" ? "fifa-2026" : null)
    const params = new URLSearchParams()
    if (city) params.set("city", city)
    if (experience) params.set("experience", experience)
    if (event) params.set("event", event)
    return params.toString() ? `/search?${params.toString()}` : "/search"
  }, [searchParams])

  // Parse query params with validation
  const filtersFromUrl = useMemo(() => {
    try {
      const experience = searchParams.get("experience") || ""
      const guestsParam = searchParams.get("guests")
      const guests = guestsParam ? Math.max(1, Math.min(16, parseInt(guestsParam, 10))) : 2
      
      const minPriceParam = searchParams.get("minPrice")
      const maxPriceParam = searchParams.get("maxPrice")
      const minPrice = minPriceParam ? Math.max(0, parseInt(minPriceParam, 10)) : 50
      const maxPrice = maxPriceParam ? Math.max(minPrice, parseInt(maxPriceParam, 10)) : 500
      
      const propertyTypeParam = searchParams.get("propertyType") // Legacy support
      const propertyTypesParam = searchParams.get("propertyTypes")
      const propertyTypes = propertyTypesParam 
        ? propertyTypesParam.split(",").filter(Boolean)
        : propertyTypeParam
        ? [propertyTypeParam]
        : []
      const platformsParam = searchParams.get("platforms")
      const platforms = platformsParam ? platformsParam.split(",").filter(Boolean) : []
      
      const radius = searchParams.get("radius") || ""
      const featuresParam = searchParams.get("features")
      const features = featuresParam ? featuresParam.split(",").filter(Boolean) : []
      
      const amenitiesParam = searchParams.get("amenities")
      const amenities = amenitiesParam ? amenitiesParam.split(",").filter(Boolean) : []

      return {
        experience,
        guests,
        priceRange: [minPrice, maxPrice] as [number, number],
        propertyTypes: propertyTypes,
        bookingPlatform: platforms,
        locationRadius: radius,
        specificFilters: features,
        amenities,
      }
    } catch (error) {
      console.error("Error parsing query params:", error)
      // Return safe defaults
      return {
        experience: "",
        guests: 2,
        priceRange: [50, 500] as [number, number],
        propertyTypes: [],
        bookingPlatform: [],
        locationRadius: "",
        specificFilters: [],
        amenities: [],
      }
    }
  }, [searchParams])

  // Get experience config for header
  const experienceConfig = useMemo(() => {
    if (!filtersFromUrl.experience) return null
    return getExperienceConfig(filtersFromUrl.experience)
  }, [filtersFromUrl.experience])

  // Build dynamic H1 based on active filters
  const resultsH1 = useMemo(() => {
    const cityParam = searchParams.get("city")
    const city = cityParam ? getCityById(cityParam) : null
    const cityLabel = city?.name || (cityParam ? String(cityParam).replace(/-/g, " ") : "")
    const experienceLabel = experienceConfig?.title || ""

    const parts: string[] = []
    if (cityLabel) parts.push(cityLabel)
    if (experienceLabel) parts.push(experienceLabel)
    parts.push("Vacation Rentals")

    return parts.filter(Boolean).join(" ") || "Search Results"
  }, [filtersFromUrl.experience, searchParams, experienceConfig])

  // Build active filter tags for display
  const activeFilterTags = useMemo(() => {
    const tags: Array<{ key: string; label: string; value: string }> = []

    if (experienceConfig) {
      tags.push({
        key: "experience",
        label: "Experience",
        value: experienceConfig.title,
      })
    }

    if (filtersFromUrl.guests !== 2) {
      tags.push({
        key: "guests",
        label: "Guests",
        value: `${filtersFromUrl.guests}`,
      })
    }

    if (
      filtersFromUrl.priceRange[0] !== 50 ||
      filtersFromUrl.priceRange[1] !== 500
    ) {
      tags.push({
        key: "price",
        label: "Price",
        value: `$${filtersFromUrl.priceRange[0]}-$${filtersFromUrl.priceRange[1]}`,
      })
    }

    if (filtersFromUrl.propertyTypes && filtersFromUrl.propertyTypes.length > 0) {
      tags.push({
        key: "propertyTypes",
        label: "Type",
        value: filtersFromUrl.propertyTypes.length === 1 
          ? filtersFromUrl.propertyTypes[0]
          : `${filtersFromUrl.propertyTypes.length} types`,
      })
    }

    if (filtersFromUrl.specificFilters.length > 0) {
      tags.push({
        key: "features",
        label: "Features",
        value: `${filtersFromUrl.specificFilters.length} selected`,
      })
    }

    if (filtersFromUrl.amenities.length > 0) {
      tags.push({
        key: "amenities",
        label: "Amenities",
        value: `${filtersFromUrl.amenities.length} selected`,
      })
    }

    return tags
  }, [filtersFromUrl, experienceConfig])

  // Remove a filter tag
  const removeFilter = (key: string) => {
    try {
      const params = new URLSearchParams(searchParams.toString())
      
      switch (key) {
        case "experience":
          params.delete("experience")
          break
        case "guests":
          params.delete("guests")
          break
        case "price":
          params.delete("minPrice")
          params.delete("maxPrice")
          break
        case "propertyTypes":
          params.delete("propertyTypes")
          params.delete("propertyType") // Also remove legacy param
          break
        case "features":
          params.delete("features")
          break
        case "amenities":
          params.delete("amenities")
          break
        default:
          console.warn(`Unknown filter key: ${key}`)
      }

      const newUrl = params.toString() ? `/results?${params.toString()}` : "/results"
      window.history.pushState({}, "", newUrl)
      window.location.reload() // Simple reload for now
    } catch (error) {
      console.error("Error removing filter:", error)
    }
  }

  // Convert filtersFromUrl to FilterState format for the filterProperties function
  const filterState = useMemo((): FilterState => {
    // Map experience key (e.g. "mountainRetreats") to actual DB tags (e.g. ["Mountain Lodges", "Hiking & Trails"])
    const experiences = filtersFromUrl.experience
      ? experienceKeyToTags(filtersFromUrl.experience)
      : []
    
    // Estimate bedrooms from guests (rough estimate: guests / 2)
    const bedrooms = filtersFromUrl.guests > 2 ? Math.ceil(filtersFromUrl.guests / 2) : 0
    
    return {
      experiences,
      locations: [],
      priceRange: filtersFromUrl.priceRange,
      propertyTypes: filtersFromUrl.propertyTypes,
      bedrooms,
      amenities: filtersFromUrl.amenities,
      instantBook: false,
      verifiedOnly: false,
      petFriendly: false,
      event: null,
      cities: [],
      distanceFrom: "stadium",
      radiusMiles: 25,
    }
  }, [filtersFromUrl])

  // Filter properties using the actual filtering logic
  const filteredProperties = useMemo(() => {
    return filterProperties(initialProperties, filterState)
  }, [initialProperties, filterState])

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={searchBackUrl}
              className="flex-shrink-0 inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
              aria-label="Back to search"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-2">
                {resultsH1}
              </h1>
              <p className="text-gray-600">
                {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
              </p>
              </div>
              <Button
                onClick={() => setShowFilters(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Active Filter Tags */}
          {activeFilterTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilterTags.map((tag) => (
                <button
                  key={tag.key}
                  onClick={() => removeFilter(tag.key)}
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
                    "bg-[#2C5F7C]/10 text-[#2C5F7C] text-sm font-medium",
                    "hover:bg-[#2C5F7C]/20 transition-colors duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-[#2C5F7C]/50 focus:ring-offset-2"
                  )}
                  aria-label={`Remove ${tag.label} filter: ${tag.value}`}
                >
                  <span>
                    {tag.label}: {tag.value}
                  </span>
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : filtersFromUrl.experience ? (
          /* Experience search with no results - show Coming Soon overlay */
          <div className="relative min-h-[60vh] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
              <div className="text-center max-w-2xl">
                <p className="text-6xl sm:text-7xl md:text-8xl font-bold text-[#2C5F7C]/20 dark:text-[#2C5F7C]/30 tracking-tight select-none mb-4">
                  Coming Soon
                </p>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                  We&apos;re adding {experienceConfig?.title || "this experience"} properties to our directory
                </p>
                <p className="text-base text-gray-500 dark:text-gray-500 mb-8">
                  Check back soon or browse other experiences
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/#experiences">
                    <Button className="bg-[#2C5F7C] hover:bg-[#2C5F7C]/90">
                      Explore Other Experiences
                    </Button>
                  </Link>
                  <Button onClick={() => setShowFilters(true)} variant="outline">
                    Adjust Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 mb-4">No properties found</p>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters to see more results
            </p>
            <Button onClick={() => setShowFilters(true)} variant="outline">
              Adjust Filters
            </Button>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <FilterModal
        open={showFilters}
        onOpenChange={setShowFilters}
        experience={filtersFromUrl.experience}
        initialFilters={filtersFromUrl}
      />
    </>
  )
}

