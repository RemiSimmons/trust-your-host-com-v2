/**
 * Shared Property Constants
 * 
 * This file contains all master lists for property-related data to ensure
 * consistency between submission forms, search filters, and data processing.
 * 
 * IMPORTANT: When adding/removing items, update all dependent components.
 */

/**
 * Experience Categories (raw/underlying tags on properties)
 * Used in: submission form, property data
 */
export const EXPERIENCE_CATEGORIES = [
  'Mountain Retreats',
  'Beachfront Escapes',
  'Lakefront Leisure',
  'Desert Oasis',
  'Wine Country',
  'Historic Charm',
  'Urban Exploration',
  'Island Paradise',
  'Forest Hideaways',
  'Ski & Snow',
  'Wellness Retreats',
  'Adventure Sports',
  'Countryside Calm',
  'Coastal Towns',
  // Additional experiences found in properties.ts (no duplicates)
  'Hiking & Trails',
  'Mountain Lodges',
  'Remote Work Retreats',
  'Island Getaways',
  'Waterfront Escapes',
  'Culinary Experiences',
  'Glamping',
  'Desert Solitude',
  'Eco-Tourism',
  'Ski Chalets',
  'Cultural Immersion',
  'Historic Stays',
  'Coastal Getaways',
  'Country Escapes'
] as const

/**
 * Experience Card Categories - matches homepage experience cards exactly.
 * Each card maps to one or more underlying EXPERIENCE_CATEGORIES.
 * Used in: search filter sidebar dropdown
 */
export const EXPERIENCE_CARD_TITLES = [
  'Mountain Retreats',
  'Beachfront Paradise',
  'Urban Adventures',
  'Forest Getaways',
  'Tropical Escapes',
  'Country Homes',
  'Private Sanctuaries',
  'Adventure & Outdoor Recreation',
  'Vineyard and Agritourism',
  'Family-Friendly Homes',
  'Festival and Event Destinations',
  'Unique and Themed Stays',
] as const

/**
 * Maps each homepage experience card title to the underlying property experience tags.
 * When a user selects "Beachfront Paradise", we match properties tagged with any of the mapped values.
 */
export const EXPERIENCE_CARD_MAPPING: Record<string, string[]> = {
  'Mountain Retreats': ['Mountain Retreats', 'Mountain Lodges', 'Ski & Snow', 'Ski Chalets'],
  'Beachfront Paradise': ['Beachfront Escapes', 'Coastal Towns', 'Coastal Getaways', 'Waterfront Escapes'],
  'Urban Adventures': ['Urban Exploration', 'Cultural Immersion'],
  'Forest Getaways': ['Forest Hideaways', 'Hiking & Trails', 'Eco-Tourism'],
  'Tropical Escapes': ['Island Paradise', 'Island Getaways'],
  'Country Homes': ['Countryside Calm', 'Country Escapes'],
  'Private Sanctuaries': ['Wellness Retreats', 'Remote Work Retreats', 'Lakefront Leisure'],
  'Adventure & Outdoor Recreation': ['Adventure Sports', 'Glamping', 'Hiking & Trails'],
  'Vineyard and Agritourism': ['Wine Country', 'Culinary Experiences'],
  'Family-Friendly Homes': ['Lakefront Leisure', 'Countryside Calm', 'Beachfront Escapes'],
  'Festival and Event Destinations': ['Urban Exploration', 'Cultural Immersion'],
  'Unique and Themed Stays': ['Glamping', 'Historic Charm', 'Historic Stays', 'Desert Oasis', 'Desert Solitude'],
}

/**
 * Location options derived from property states.
 * Used in: search filter sidebar location dropdown
 */
export const LOCATION_OPTIONS = [
  'Arizona',
  'California',
  'Colorado',
  'Georgia',
  'Maine',
  'Montana',
  'New York',
  'North Carolina',
  'Oregon',
  'South Carolina',
  'Texas',
  'Vermont',
] as const

/**
 * Property Types with Values and Labels
 * Used in: submission form, search filters
 */
export const PROPERTY_TYPES = {
  cabin: 'Cabin',
  villa: 'Villa',
  apartment: 'Apartment/Condo',
  house: 'House',
  townhouse: 'Townhouse',
  lodge: 'Lodge',
  glamping: 'Glamping',
  treehouse: 'Treehouse',
  historic: 'Historic Home',
  'unique-stay': 'Unique Stay',
  other: 'Other'
} as const

/**
 * Property Type Values (for filter arrays)
 */
export const PROPERTY_TYPE_VALUES = Object.keys(PROPERTY_TYPES) as (keyof typeof PROPERTY_TYPES)[]

/**
 * Amenities List
 * Used in: submission form, search filters
 * 
 * IMPORTANT: Strings must match exactly (case-sensitive) for filtering to work
 */
export const AMENITIES = [
  'WiFi',
  'Full Kitchen',
  'Pool',
  'Hot Tub',
  'Air Conditioning',
  'Fireplace',
  'Washer/Dryer',
  'Free Parking',
  'Pet Friendly',
  'EV Charging',
  'BBQ Grill',
  'Gym/Fitness',
  'Mountain Views',
  'Beach Access',
  'Workspace'
] as const

/**
 * Standard House Rules
 * Used in: submission form, property edit form
 */
export const STANDARD_HOUSE_RULES = [
  'No smoking',
  'No pets',
  'No parties or events',
  'Quiet hours (10 PM - 8 AM)',
  'No unregistered guests',
  'Respect neighbors',
  'Clean up after yourself',
  'No shoes inside',
  'Maximum occupancy strictly enforced'
] as const

/**
 * Property Type Helpers
 */
export type PropertyType = keyof typeof PROPERTY_TYPES
export type ExperienceCategory = typeof EXPERIENCE_CATEGORIES[number]
export type Amenity = typeof AMENITIES[number]
export type StandardHouseRule = typeof STANDARD_HOUSE_RULES[number]
