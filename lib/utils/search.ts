import type { Property } from "@/lib/types"
import { calculateDistance } from "@/lib/utils/geo"
import { matchesCity } from "@/lib/utils/city-matching"

export interface FilterState {
  experiences: string[]
  priceRange: [number, number]
  propertyTypes: string[]
  bedrooms: number
  amenities: string[]
  instantBook: boolean
  verifiedOnly: boolean
  petFriendly: boolean
  // New FIFA/event filters
  event: string | null
  cities: string[]
  distanceFrom: "stadium" | "city-center"
  radiusMiles: number
}

export const INITIAL_FILTERS: FilterState = {
  experiences: [],
  priceRange: [0, 2000],
  propertyTypes: [],
  bedrooms: 0,
  amenities: [],
  instantBook: false,
  verifiedOnly: false,
  petFriendly: false,
  // New defaults
  event: null,
  cities: [],
  distanceFrom: "stadium",
  radiusMiles: 25,
}

export function filterProperties(properties: Property[], filters: FilterState): Property[] {
  return properties.filter((property) => {
    // Event filter
    if (filters.event) {
      if (filters.event === "fifa-2026" && !property.is_fifa_2026) {
        return false
      }
    }

    // Cities filter (for multi-city selection)
    if (filters.cities.length > 0) {
      const propertyMatchesCity = filters.cities.some(cityId => 
        matchesCity(property, cityId)
      )
      if (!propertyMatchesCity) return false
    }

    // Experience filter (OR logic - match ANY selected)
    if (filters.experiences.length > 0) {
      const hasExperience = property.experiences.some((exp) => filters.experiences.includes(exp))
      if (!hasExperience) return false
    }

    // Price range
    if (
      property.pricing.baseNightlyRate < filters.priceRange[0] ||
      property.pricing.baseNightlyRate > filters.priceRange[1]
    ) {
      return false
    }

    // Property types
    if (filters.propertyTypes.length > 0) {
      if (!filters.propertyTypes.includes(property.propertyType)) {
        return false
      }
    }

    // Bedrooms
    if (filters.bedrooms > 0) {
      if (property.capacity.bedrooms < filters.bedrooms) {
        return false
      }
    }

    // Amenities (AND logic - must have ALL selected)
    if (filters.amenities.length > 0) {
      const hasAllAmenities = filters.amenities.every((amenity) => property.amenities.includes(amenity))
      if (!hasAllAmenities) return false
    }

    // Verified only
    if (filters.verifiedOnly && !property.verified) {
      return false
    }

    // Pet friendly
    if (filters.petFriendly && !property.capacity.allowsPets) {
      return false
    }

    return true
  })
}

// Filter by radius from a point
export function filterByRadius(properties: Property[], lat: number, lng: number, radiusMiles: number): Property[] {
  return properties.filter(p => {
    const distance = calculateDistance(lat, lng, p.location.coordinates.lat, p.location.coordinates.lng)
    return distance <= radiusMiles
  })
}

export function sortProperties(properties: Property[], sortBy: string): Property[] {
  const sorted = [...properties]

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.pricing.baseNightlyRate - b.pricing.baseNightlyRate)
    case "price-desc":
      return sorted.sort((a, b) => b.pricing.baseNightlyRate - a.pricing.baseNightlyRate)
    case "rating":
      return sorted.sort((a, b) => b.rating.average - a.rating.average)
    case "newest":
      return sorted
    default:
      return sorted // relevance
  }
}
