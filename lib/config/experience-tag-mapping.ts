/**
 * Maps homepage experience keys to actual database experience tags.
 *
 * Homepage uses keys like "mountainRetreats" but properties store human-readable
 * tags like "Mountain Lodges", "Hiking & Trails". This mapping enables filtering.
 *
 * AUDIT (from mock + DB): Unique tags in use:
 * - Adventure Sports, Coastal Getaways, Country Escapes, Culinary Experiences
 * - Cultural Immersion, Desert Solitude, Eco-Tourism, Glamping, Hiking & Trails
 * - Historic Stays, Island Getaways, Mountain Lodges, Remote Work Retreats
 * - Ski Chalets, Waterfront Escapes, Wellness Retreats, Wine Country
 */
export const EXPERIENCE_KEY_TO_TAGS: Record<string, string[]> = {
  mountainRetreats: ["Mountain Lodges", "Hiking & Trails", "Ski Chalets"],
  beachfrontParadise: ["Waterfront Escapes", "Island Getaways", "Coastal Getaways"],
  urbanAdventures: ["Cultural Immersion", "Remote Work Retreats"],
  forestGetaways: ["Hiking & Trails", "Eco-Tourism", "Mountain Lodges"],
  tropicalEscapes: ["Island Getaways", "Waterfront Escapes"],
  countryHomes: ["Country Escapes", "Wine Country", "Culinary Experiences"],
  privateSanctuaries: ["Wellness Retreats", "Country Escapes"],
  adventureOutdoor: ["Adventure Sports", "Glamping", "Hiking & Trails"],
  vineyardAgritourism: ["Wine Country", "Culinary Experiences"],
  familyFriendly: ["Wellness Retreats", "Country Escapes", "Waterfront Escapes"],
  festivalEvents: ["Cultural Immersion", "Waterfront Escapes"],
  uniqueThemed: ["Glamping", "Historic Stays", "Cultural Immersion"],
}

/** Convert experience key from URL to array of tags for filtering */
export function experienceKeyToTags(key: string): string[] {
  return EXPERIENCE_KEY_TO_TAGS[key] || []
}
