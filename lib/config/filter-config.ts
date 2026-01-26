import {
  Mountain,
  Waves,
  Tent,
  Grape,
  Heart,
  UtensilsCrossed,
  Laptop,
  Activity,
  Landmark,
  Leaf,
  Snowflake,
  TreePine,
  Palmtree,
  Building2,
  Sparkles,
} from "lucide-react"
import { LucideIcon } from "lucide-react"

export interface ExperienceFeature {
  id: string
  label: string
  icon: LucideIcon
}

export const EXPERIENCE_FEATURES: ExperienceFeature[] = [
  { id: "hiking-trails", label: "Hiking & Trails", icon: Mountain },
  { id: "wellness-retreats", label: "Wellness Retreats", icon: Heart },
  { id: "mountain-lodges", label: "Mountain Lodges", icon: Mountain },
  { id: "island-getaways", label: "Island Getaways", icon: Palmtree },
  { id: "waterfront-escapes", label: "Waterfront Escapes", icon: Waves },
  { id: "glamping", label: "Glamping", icon: Tent },
  { id: "desert-solitude", label: "Desert Solitude", icon: TreePine },
  { id: "adventure-sports", label: "Adventure Sports", icon: Activity },
  { id: "culinary-experiences", label: "Culinary Experiences", icon: UtensilsCrossed },
  { id: "eco-tourism", label: "Eco-Tourism", icon: Leaf },
  { id: "wine-country", label: "Wine Country", icon: Grape },
  { id: "remote-work", label: "Remote Work Retreats", icon: Laptop },
  { id: "cultural-immersion", label: "Cultural Immersion", icon: Landmark },
  { id: "historic-stays", label: "Historic Stays", icon: Building2 },
  { id: "ski-chalets", label: "Ski Chalets", icon: Snowflake },
  { id: "unique-stays", label: "Unique & Themed Stays", icon: Sparkles },
]

export const LOCATION_RADIUS_OPTIONS = [
  { value: "10", label: "Within 10 miles" },
  { value: "25", label: "Within 25 miles" },
  { value: "50", label: "Within 50 miles" },
  { value: "100", label: "Within 100 miles" },
  { value: "250", label: "Within 250 miles" },
  { value: "anywhere", label: "Anywhere" },
] as const

export const EXPERIENCE_FEATURES_ICON = Sparkles

// Experience-specific features mapping
export interface ExperienceSpecificFeature {
  id: string
  label: string
}

export const EXPERIENCE_SPECIFIC_FEATURES: Record<string, ExperienceSpecificFeature[]> = {
  mountainRetreats: [
    { id: "ski-in-ski-out", label: "Ski-in/Ski-out Access" },
    { id: "hiking-trails-property", label: "Hiking Trails on Property" },
    { id: "mountain-valley-views", label: "Mountain/Valley Views" },
    { id: "hot-tub-jacuzzi", label: "Hot Tub/Jacuzzi" },
    { id: "fireplace", label: "Fireplace" },
    { id: "secluded-private", label: "Secluded/Private Location" },
    { id: "high-elevation", label: "High Elevation (5000ft+)" },
    { id: "snow-activities", label: "Snow Activities Nearby" },
  ],
  beachfrontParadise: [
    { id: "direct-beach-access", label: "Direct Beach Access" },
    { id: "oceanfront-ocean-view", label: "Oceanfront/Ocean View" },
    { id: "beach-walking-distance", label: "Beach Within Walking Distance" },
    { id: "water-sports-equipment", label: "Water Sports Equipment" },
    { id: "outdoor-shower", label: "Outdoor Shower" },
    { id: "beach-chairs-umbrellas", label: "Beach Chairs/Umbrellas Included" },
    { id: "kayak-paddleboard", label: "Kayak/Paddleboard Available" },
    { id: "beachside-deck-patio", label: "Beachside Deck/Patio" },
  ],
  urbanAdventures: [
    { id: "downtown-city-center", label: "Downtown/City Center" },
    { id: "public-transit-access", label: "Public Transit Access" },
    { id: "walking-distance-attractions", label: "Walking Distance to Attractions" },
    { id: "restaurants-cafes-nearby", label: "Restaurants/Cafes Nearby" },
    { id: "nightlife-district", label: "Nightlife District" },
    { id: "gym-fitness-center", label: "Gym/Fitness Center" },
    { id: "rooftop-access", label: "Rooftop Access" },
    { id: "city-skyline-views", label: "City/Skyline Views" },
  ],
  forestGetaways: [
    { id: "surrounded-by-forest", label: "Surrounded by Forest" },
    { id: "wildlife-viewing", label: "Wildlife Viewing" },
    { id: "hiking-trails", label: "Hiking Trails" },
    { id: "fire-pit", label: "Fire Pit" },
    { id: "off-grid", label: "Off-Grid" },
    { id: "creek-stream", label: "Creek/Stream" },
    { id: "treehouse-cabin", label: "Treehouse/Cabin" },
    { id: "nature-spots", label: "Nature Spots" },
  ],
  tropicalEscapes: [
    { id: "private-pool", label: "Private Pool" },
    { id: "tropical-garden", label: "Tropical Garden" },
    { id: "ocean-breeze", label: "Ocean Breeze" },
    { id: "outdoor-living", label: "Outdoor Living" },
    { id: "hammock", label: "Hammock" },
    { id: "snorkeling-nearby", label: "Snorkeling Nearby" },
    { id: "island-location", label: "Island Location" },
    { id: "tiki-bar", label: "Tiki Bar" },
  ],
  countryHomes: [
    { id: "farm-ranch", label: "Farm/Ranch" },
    { id: "large-outdoor-space", label: "Large Outdoor Space" },
    { id: "garden-orchard", label: "Garden/Orchard" },
    { id: "farm-animals", label: "Farm Animals" },
    { id: "barn", label: "Barn" },
    { id: "stargazing", label: "Stargazing" },
    { id: "peaceful", label: "Peaceful" },
    { id: "fishing-pond", label: "Fishing Pond" },
  ],
  privateSanctuaries: [
    { id: "completely-private", label: "Completely Private" },
    { id: "gated", label: "Gated" },
    { id: "no-shared-spaces", label: "No Shared Spaces" },
    { id: "spa-wellness", label: "Spa/Wellness" },
    { id: "meditation-space", label: "Meditation Space" },
    { id: "luxury", label: "Luxury" },
    { id: "private-chef", label: "Private Chef" },
    { id: "concierge", label: "Concierge" },
  ],
  adventureOutdoor: [
    { id: "near-national-park", label: "Near National Park" },
    { id: "rock-climbing", label: "Rock Climbing" },
    { id: "mountain-biking", label: "Mountain Biking" },
    { id: "water-sports", label: "Water Sports" },
    { id: "zip-lining", label: "Zip-lining" },
    { id: "gear-storage", label: "Gear Storage" },
    { id: "guide-services", label: "Guide Services" },
    { id: "atv-trails", label: "ATV Trails" },
  ],
  vineyardAgritourism: [
    { id: "on-site-vineyard-winery", label: "On-site Vineyard/Winery" },
    { id: "wine-tasting-available", label: "Wine Tasting Available" },
    { id: "farm-to-table", label: "Farm-to-Table Experience" },
    { id: "cooking-classes", label: "Cooking Classes Offered" },
    { id: "harvest-seasonal-activities", label: "Harvest/Seasonal Activities" },
    { id: "winery-tours", label: "Winery Tours" },
    { id: "olive-grove-fruit-orchards", label: "Olive Grove/Fruit Orchards" },
    { id: "agricultural-education", label: "Agricultural Education" },
  ],
  familyFriendly: [
    { id: "cribs-high-chairs", label: "Cribs/High Chairs" },
    { id: "toys-games", label: "Toys/Games" },
    { id: "fenced-yard", label: "Fenced Yard" },
    { id: "kid-safe-pool", label: "Kid-Safe Pool" },
    { id: "near-playgrounds", label: "Near Playgrounds" },
    { id: "board-games", label: "Board Games" },
    { id: "baby-proofed", label: "Baby-Proofed" },
    { id: "bunk-beds", label: "Bunk Beds" },
  ],
  festivalEvents: [
    { id: "near-venues", label: "Near Venues" },
    { id: "large-group-capacity", label: "Large Group Capacity" },
    { id: "ample-parking", label: "Ample Parking" },
    { id: "walking-distance-venue", label: "Walking Distance to Venue" },
    { id: "shuttle-service", label: "Shuttle Service" },
    { id: "early-check-in", label: "Early Check-in" },
    { id: "flexible-policies", label: "Flexible Policies" },
    { id: "event-calendar", label: "Event Calendar" },
  ],
  uniqueThemed: [
    { id: "historic-property", label: "Historic Property" },
    { id: "architectural-gem", label: "Architectural Gem" },
    { id: "themed-decor", label: "Themed Decor" },
    { id: "artist-studio", label: "Artist Studio" },
    { id: "converted-space", label: "Converted Space" },
    { id: "instagram-worthy", label: "Instagram-Worthy" },
    { id: "one-of-a-kind", label: "One-of-a-Kind" },
    { id: "cultural-character", label: "Cultural Character" },
  ],
}

// Experience emoji/icons mapping
export const EXPERIENCE_ICONS: Record<string, string> = {
  mountainRetreats: "🏔️",
  beachfrontParadise: "🏖️",
  urbanAdventures: "🏙️",
  forestGetaways: "🌲",
  tropicalEscapes: "🌴",
  countryHomes: "🌾",
  privateSanctuaries: "🏡",
  adventureOutdoor: "⛰️",
  vineyardAgritourism: "🍇",
  familyFriendly: "👨‍👩‍👧‍👦",
  festivalEvents: "🎪",
  uniqueThemed: "🎨",
}

export const PROPERTY_TYPES = [
  { value: "entire-home", label: "Entire Home" },
  { value: "cabin", label: "Cabin" },
  { value: "villa", label: "Villa" },
  { value: "apartment", label: "Apartment/Condo" },
  { value: "lodge", label: "Lodge" },
  { value: "glamping", label: "Glamping" },
  { value: "treehouse", label: "Treehouse" },
  { value: "historic", label: "Historic" },
  { value: "unique-stay", label: "Unique Stay" },
] as const

export const BOOKING_PLATFORMS = [
  { id: "direct-booking", label: "Direct Booking Site" },
  { id: "airbnb", label: "Airbnb" },
  { id: "vrbo", label: "VRBO" },
  { id: "booking-com", label: "Booking.com" },
  { id: "expedia", label: "Expedia" },
] as const

export const AMENITIES = [
  { id: "hot-tub", label: "Hot Tub" },
  { id: "pool", label: "Pool" },
  { id: "wifi", label: "Wifi" },
  { id: "kitchen", label: "Kitchen" },
  { id: "fireplace", label: "Fireplace" },
  { id: "mountain-views", label: "Mountain Views" },
  { id: "pet-friendly", label: "Pet Friendly" },
  { id: "washer-dryer", label: "Washer/Dryer" },
  { id: "air-conditioning", label: "Air Conditioning" },
  { id: "beach-access", label: "Beach Access" },
] as const

