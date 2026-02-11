import type { Property } from "@/lib/types"
import { calculateDistance } from "@/lib/utils/geo"
import { matchesCity } from "@/lib/utils/city-matching"
import { PROPERTY_TYPES, EXPERIENCE_CARD_MAPPING } from "@/lib/data/property-constants"

/**
 * Maps filter property type labels (from experience presets) to property type keys.
 * Experience config uses labels like "Chalet", "Cabin" while properties use keys like "cabin".
 */
const FILTER_PROPERTY_TYPE_TO_KEY: Record<string, string> = {
  ...Object.fromEntries(
    Object.entries(PROPERTY_TYPES).map(([key, label]) => [label, key])
  ),
  // Experience preset labels not in PROPERTY_TYPES
  Chalet: "cabin",
  "A-Frame": "cabin",
  "Ski Condo": "apartment",
  "Mountain Home": "cabin",
  "Tiny Home": "other",
  "Beach House": "house",
  Bungalow: "house",
  Condo: "apartment",
  "Beach Cabin": "cabin",
  Loft: "apartment",
  Penthouse: "apartment",
  Studio: "apartment",
  "Converted Space": "other",
  "Boutique Stay": "other",
  Treehouse: "treehouse",
  Yurt: "glamping",
  "Log Home": "cabin",
  "Earth Home": "other",
  Villa: "villa",
  Cottage: "house",
  "Island Home": "house",
  "Resort Suite": "apartment",
  "Tiki Hut": "other",
  Palapa: "other",
  Farmhouse: "house",
  "Ranch House": "house",
  "Barn Conversion": "other",
  "Country Estate": "house",
  Homestead: "house",
  "Rural Retreat": "cabin",
  Estate: "house",
  Manor: "house",
  "Private Residence": "house",
  "Luxury Home": "house",
  Compound: "house",
  "Gated Property": "house",
  "Base Camp Cabin": "cabin",
  "Glamping Tent": "glamping",
  "Adventure Cabin": "cabin",
  "Outdoor Retreat": "cabin",
  "Wilderness Home": "cabin",
  "Vineyard Estate": "villa",
  "Farm Cottage": "house",
  "Wine Country Villa": "villa",
  Chateau: "villa",
  Casita: "house",
  "Family Home": "house",
  "Vacation House": "house",
  Lakehouse: "house",
  "Large Cabin": "cabin",
  "Resort Home": "house",
  "Group House": "house",
  "Event Rental": "house",
  "Festival Lodging": "house",
  "Shared Home": "house",
  "Party House": "house",
  "Venue Nearby": "house",
  Castle: "historic",
  Lighthouse: "unique-stay",
  "Container Home": "unique-stay",
  "Dome Home": "unique-stay",
  "Historic Building": "historic",
  "Artist Loft": "apartment",
}

export interface FilterState {
  experiences: string[]
  locations: string[]
  priceRange: [number, number]
  propertyTypes: string[]
  bedrooms: number
  amenities: string[]
  instantBook: boolean
  verifiedOnly: boolean
  petFriendly: boolean
  // FIFA/event filters
  event: string | null
  cities: string[]
  distanceFrom: "stadium" | "city-center"
  radiusMiles: number
}

export const INITIAL_FILTERS: FilterState = {
  experiences: [],
  locations: [],
  priceRange: [0, 2000],
  propertyTypes: [],
  bedrooms: 0,
  amenities: [],
  instantBook: false,
  verifiedOnly: false,
  petFriendly: false,
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

    // Location (state) filter
    if (filters.locations.length > 0) {
      if (!filters.locations.includes(property.location.state)) {
        return false
      }
    }

    // Experience filter (OR logic - match ANY selected card title)
    // Uses EXPERIENCE_CARD_MAPPING to expand card titles to underlying tags
    if (filters.experiences.length > 0) {
      const expandedTags = filters.experiences.flatMap(
        (cardTitle) => EXPERIENCE_CARD_MAPPING[cardTitle] || [cardTitle]
      )
      const hasExperience = property.experiences.some((exp) => expandedTags.includes(exp))
      if (!hasExperience) return false
    }

    // Price range
    if (
      property.pricing.baseNightlyRate < filters.priceRange[0] ||
      property.pricing.baseNightlyRate > filters.priceRange[1]
    ) {
      return false
    }

    // Property types (filter uses labels like "Cabin", "Chalet"; property uses keys like "cabin")
    if (filters.propertyTypes.length > 0) {
      const propertyLabel = PROPERTY_TYPES[property.propertyType as keyof typeof PROPERTY_TYPES] || property.propertyType
      const filterKeys = filters.propertyTypes.map(
        (ft) => FILTER_PROPERTY_TYPE_TO_KEY[ft] ?? ft.toLowerCase()
      )
      const propertyKey = property.propertyType
      const matches =
        filters.propertyTypes.includes(propertyLabel) ||
        filterKeys.includes(propertyKey)
      if (!matches) return false
    }

    // Bedrooms
    if (filters.bedrooms > 0) {
      if (property.capacity.bedrooms < filters.bedrooms) {
        return false
      }
    }

    // Amenities (AND logic - must have ALL selected)
    // Filter sends label values from AMENITIES constant (e.g., "WiFi", "Hot Tub")
    // Also supports legacy ID values (e.g., "wifi", "hot-tub") for backwards compat
    if (filters.amenities.length > 0) {
      const AMENITY_ID_TO_LABELS: Record<string, string[]> = {
        "hot-tub": ["Hot Tub", "Jacuzzi"],
        pool: ["Pool"],
        wifi: ["WiFi", "Wifi"],
        kitchen: ["Full Kitchen", "Kitchen"],
        fireplace: ["Fireplace"],
        "mountain-views": ["Mountain Views"],
        "pet-friendly": ["Pet Friendly"],
        "washer-dryer": ["Washer/Dryer"],
        "air-conditioning": ["Air Conditioning"],
        "beach-access": ["Beach Access"],
      }
      const hasAllAmenities = filters.amenities.every((amenityFilter) => {
        // First check if the filter value is a legacy ID
        const labels = AMENITY_ID_TO_LABELS[amenityFilter] || [amenityFilter]
        return property.amenities.some((pa) =>
          labels.some((l) => pa.toLowerCase().includes(l.toLowerCase()))
        )
      })
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
