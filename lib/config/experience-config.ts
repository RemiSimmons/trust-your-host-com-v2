import {
  Mountain,
  Waves,
  Building2,
  TreePine,
  Palmtree,
  Home,
  Shield,
  Tent,
  Grape,
  Baby,
  Music,
  Castle,
  LucideIcon,
} from "lucide-react"
import { FilterState } from "@/lib/types"

export interface ExperienceConfig {
  key: string
  title: string
  icon: LucideIcon
  description: string
  image: string
  // Filter presets for this experience
  filterPreset: Partial<FilterState>
  // Experience features that should be pre-selected
  defaultFeatures: string[]
}

// Map homepage experience titles to experience keys
export const EXPERIENCE_KEY_MAP: Record<string, string> = {
  "Mountain Retreats": "mountainRetreats",
  "Beachfront Paradise": "beachfrontParadise",
  "Urban Adventures": "urbanAdventures",
  "Forest Getaways": "forestGetaways",
  "Tropical Escapes": "tropicalEscapes",
  "Country Homes": "countryHomes",
  "Private Sanctuaries": "privateSanctuaries",
  "Adventure & Outdoor Recreation": "adventureOutdoor",
  "Vineyard and Agritourism": "vineyardAgritourism",
  "Family-Friendly Homes": "familyFriendly",
  "Festival and Event Destinations": "festivalEvents",
  "Unique and Themed Stays": "uniqueThemed",
}

// Experience configurations with filter presets
export const EXPERIENCE_CONFIGS: Record<string, ExperienceConfig> = {
  mountainRetreats: {
    key: "mountainRetreats",
    title: "Mountain Retreats",
    icon: Mountain,
    description: "Escape to elevated retreats with panoramic vistas",
    image: "/mountain-cabin-retreat-scenic-view.jpg",
    filterPreset: {
      experience: "mountainRetreats",
      propertyTypes: ["Chalet", "Cabin", "Lodge", "A-Frame", "Ski Condo", "Mountain Home", "Tiny Home"],
      priceRange: [100, 800],
    },
    defaultFeatures: ["hiking-trails", "mountain-lodges"],
  },
  beachfrontParadise: {
    key: "beachfrontParadise",
    title: "Beachfront Paradise",
    icon: Waves,
    description: "Discover paradise with sand, surf, and solitude",
    image: "/luxury-beachfront-villa-ocean-view.jpg",
    filterPreset: {
      experience: "beachfrontParadise",
      propertyTypes: ["Beach House", "Villa", "Cottage", "Bungalow", "Condo", "Beach Cabin", "Unique Stay"],
      priceRange: [150, 1000],
    },
    defaultFeatures: ["waterfront-escapes", "island-getaways"],
  },
  urbanAdventures: {
    key: "urbanAdventures",
    title: "Urban Adventures",
    icon: Building2,
    description: "Experience vibrant city life in modern spaces",
    image: "/modern-urban-loft-city-skyline.jpg",
    filterPreset: {
      experience: "urbanAdventures",
      propertyTypes: ["Apartment", "Loft", "Penthouse", "Studio", "Townhouse", "Converted Space", "Boutique Stay"],
      priceRange: [80, 600],
    },
    defaultFeatures: ["remote-work", "cultural-immersion"],
  },
  forestGetaways: {
    key: "forestGetaways",
    title: "Forest Getaways",
    icon: TreePine,
    description: "Immerse yourself in nature with trails at your doorstep",
    image: "/forest-cabin-surrounded-trees.jpg",
    filterPreset: {
      experience: "forestGetaways",
      propertyTypes: ["Cabin", "Treehouse", "A-Frame", "Yurt", "Log Home", "Earth Home", "Tiny Home"],
      priceRange: [90, 700],
    },
    defaultFeatures: ["hiking-trails", "eco-tourism"],
  },
  tropicalEscapes: {
    key: "tropicalEscapes",
    title: "Tropical Escapes",
    icon: Palmtree,
    description: "Savor island living with palm-lined beaches",
    image: "/tropical-villa-palm-trees-pool.jpg",
    filterPreset: {
      experience: "tropicalEscapes",
      propertyTypes: ["Villa", "Bungalow", "Beach House", "Palapa", "Island Home", "Resort Suite", "Tiki Hut"],
      priceRange: [120, 900],
    },
    defaultFeatures: ["island-getaways", "waterfront-escapes"],
  },
  countryHomes: {
    key: "countryHomes",
    title: "Country Homes",
    icon: Home,
    description: "Find peace in rustic farmhouses and rolling hills",
    image: "/country-farmhouse-rolling-hills.jpg",
    filterPreset: {
      experience: "countryHomes",
      propertyTypes: ["Farmhouse", "Cottage", "Ranch House", "Barn Conversion", "Country Estate", "Homestead", "Rural Retreat"],
      priceRange: [100, 750],
    },
    defaultFeatures: ["wine-country", "eco-tourism"],
  },
  privateSanctuaries: {
    key: "privateSanctuaries",
    title: "Private Sanctuaries",
    icon: Shield,
    description: "Experience ultimate seclusion in gated luxury estates",
    image: "/luxury-private-estate-with-gates-and-garden.jpg",
    filterPreset: {
      experience: "privateSanctuaries",
      propertyTypes: ["Estate", "Villa", "Manor", "Private Residence", "Luxury Home", "Compound", "Gated Property"],
      priceRange: [200, 1500],
    },
    defaultFeatures: ["wellness-retreats"],
  },
  adventureOutdoor: {
    key: "adventureOutdoor",
    title: "Adventure & Outdoor Recreation",
    icon: Tent,
    description: "Thrilling outdoor activities at your doorstep",
    image: "/adventure-cabin-with-hiking-and-outdoor-recreation.jpg",
    filterPreset: {
      experience: "adventureOutdoor",
      propertyTypes: ["Base Camp Cabin", "Lodge", "Glamping Tent", "Yurt", "Adventure Cabin", "Outdoor Retreat", "Wilderness Home"],
      priceRange: [80, 650],
    },
    defaultFeatures: ["adventure-sports", "glamping", "hiking-trails"],
  },
  vineyardAgritourism: {
    key: "vineyardAgritourism",
    title: "Vineyard and Agritourism",
    icon: Grape,
    description: "Farm-to-table experiences and wine country charm",
    image: "/vineyard-villa-with-wine-cellar-and-grape-fields.jpg",
    filterPreset: {
      experience: "vineyardAgritourism",
      propertyTypes: ["Vineyard Estate", "Farm Cottage", "Wine Country Villa", "Farmhouse", "Converted Barn", "Chateau", "Casita"],
      priceRange: [150, 850],
    },
    defaultFeatures: ["wine-country", "culinary-experiences"],
  },
  familyFriendly: {
    key: "familyFriendly",
    title: "Family-Friendly Homes",
    icon: Baby,
    description: "Spacious properties designed for multi-generational travel",
    image: "/large-family-vacation-home-with-playground-and-poo.jpg",
    filterPreset: {
      experience: "familyFriendly",
      propertyTypes: ["Family Home", "Vacation House", "Cottage", "Lakehouse", "Villa", "Large Cabin", "Resort Home"],
      priceRange: [120, 900],
      guests: 4,
    },
    defaultFeatures: [],
  },
  festivalEvents: {
    key: "festivalEvents",
    title: "Festival and Event Destinations",
    icon: Music,
    description: "Stay close to concerts, fairs, and cultural celebrations",
    image: "/modern-home-near-festival-grounds-and-event-venues.jpg",
    filterPreset: {
      experience: "festivalEvents",
      propertyTypes: ["Group House", "Event Rental", "Large Villa", "Festival Lodging", "Shared Home", "Party House", "Venue Nearby"],
      priceRange: [100, 800],
    },
    defaultFeatures: ["cultural-immersion"],
  },
  uniqueThemed: {
    key: "uniqueThemed",
    title: "Unique and Themed Stays",
    icon: Castle,
    description: "Unforgettable experiences in treehouses, castles, and more",
    image: "/unique-treehouse-or-castle-themed-vacation-rental.jpg",
    filterPreset: {
      experience: "uniqueThemed",
      propertyTypes: ["Treehouse", "Castle", "Lighthouse", "Tiny Home", "Container Home", "Dome Home", "Historic Building", "Artist Loft"],
      priceRange: [150, 1000],
    },
    defaultFeatures: ["unique-stays", "glamping"],
  },
}

// Get experience config by key
export function getExperienceConfig(key: string): ExperienceConfig | null {
  return EXPERIENCE_CONFIGS[key] || null
}

// Get experience config by homepage title
export function getExperienceConfigByTitle(title: string): ExperienceConfig | null {
  const key = EXPERIENCE_KEY_MAP[title]
  if (!key) {
    console.warn(`No experience config found for title: ${title}`)
    return null
  }
  return getExperienceConfig(key)
}

