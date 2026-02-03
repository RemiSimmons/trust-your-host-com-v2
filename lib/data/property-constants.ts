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
  'Coastal Towns'
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
 * Property Type Helpers
 */
export type PropertyType = keyof typeof PROPERTY_TYPES
export type ExperienceCategory = typeof EXPERIENCE_CATEGORIES[number]
export type Amenity = typeof AMENITIES[number]
