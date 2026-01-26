"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import { X, Filter, ArrowLeft } from "lucide-react"
import { Property } from "@/lib/types"
import { getExperienceConfig } from "@/lib/config/experience-config"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FilterModal } from "./filter-modal"

interface ResultsPageClientProps {
  initialProperties: Property[]
}

export function ResultsPageClient({ initialProperties }: ResultsPageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)

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

  // Filter properties (simplified - you can enhance this with actual filtering logic)
  const filteredProperties = useMemo(() => {
    // TODO: Implement actual filtering logic based on filtersFromUrl
    // For now, just return all properties
    return initialProperties
  }, [initialProperties, filtersFromUrl])

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              size="icon"
              className="flex-shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-2">
                {experienceConfig ? (
                  <>
                    Filtering by: <span className="text-[#2C5F7C]">{experienceConfig.title}</span>
                  </>
                ) : (
                  "Search Results"
                )}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TODO: Add PropertyCard component here */}
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="font-semibold text-lg mb-2">{property.name}</h3>
                <p className="text-gray-600 text-sm">{property.description.short}</p>
                <p className="text-[#2C5F7C] font-semibold mt-2">
                  ${property.pricing.baseNightlyRate}/night
                </p>
              </div>
            ))}
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

