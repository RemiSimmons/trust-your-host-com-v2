/**
 * Shared Property Constants
 * 
 * This file contains all master lists for property-related data to ensure
 * consistency between submission forms, search filters, and data processing.
 * 
 * IMPORTANT: When adding/removing items, update all dependent components.
 */

/**
 * Experience Categories
 * Used in: submission form, search filters
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
