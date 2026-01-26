import type { Property } from "@/lib/types"

export interface FilterState {
  experiences: string[]
  priceRange: [number, number]
  propertyTypes: string[]
  bedrooms: number
  amenities: string[]
  instantBook: boolean
  verifiedOnly: boolean
  petFriendly: boolean
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
}

export function filterProperties(properties: Property[], filters: FilterState): Property[] {
  return properties.filter((property) => {
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

    // Instant Book
    // Note: Assuming instantBook is a property on the Property type, if not we skip
    // if (filters.instantBook && !property.instantBook) {
    //   return false;
    // }

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
      // Assuming createdAt exists, otherwise fallback to id or random
      // return sorted.sort((a, b) =>
      //   new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      // );
      return sorted
    default:
      return sorted // relevance
  }
}
