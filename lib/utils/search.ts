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

// Helper to calculate distance between two coordinates (Haversine formula)
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
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
      const propertyMatchesCity = filters.cities.some(cityId => {
        // Safety check: ensure location and city exist
        if (!property.location?.city) return false
        
        const city = property.location.city
        const state = property.location.state || ''
        const cityLower = city.toLowerCase()
        
        // Match city based on location - FIFA cities
        const fifaCityMatches: Record<string, boolean> = {
          "new-york-new-jersey": cityLower.includes("new") || state === "New Jersey" || city === "Brooklyn" || city === "Hoboken",
          "miami-gardens": cityLower.includes("miami") || city === "Coral Gables" || city === "Aventura" || city === "Key Biscayne" || city === "Coconut Grove",
          "los-angeles": cityLower.includes("angeles") || city === "Inglewood" || city === "Santa Monica",
          "atlanta": city === "Atlanta",
          "boston": city === "Boston" || city === "Foxborough",
          "philadelphia": city === "Philadelphia",
          "kansas-city": city === "Kansas City",
          "dallas": city === "Dallas" || city === "Arlington",
          "houston": city === "Houston",
          "seattle": city === "Seattle",
          "san-francisco": cityLower.includes("san") || city === "Santa Clara"
        }
        
        // Match city based on location - Other cities
        const otherCityMatches: Record<string, boolean> = {
          "austin": city === "Austin",
          "chicago": city === "Chicago",
          "denver": city === "Denver",
          "las-vegas": city === "Las Vegas" || cityLower.includes("vegas"),
          "nashville": city === "Nashville",
          "new-orleans": city === "New Orleans",
          "orlando": city === "Orlando",
          "portland": city === "Portland",
          "san-diego": city === "San Diego",
          "scottsdale": city === "Scottsdale" || city === "Phoenix",
        }
        
        return fifaCityMatches[cityId] || otherCityMatches[cityId] || false
      })
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
      // Assuming createdAt exists, otherwise fallback to id or random
      // return sorted.sort((a, b) =>
      //   new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      // );
      return sorted
    default:
      return sorted // relevance
  }
}
