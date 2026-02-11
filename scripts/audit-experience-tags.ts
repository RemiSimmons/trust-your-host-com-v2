/**
 * Audit script: List all unique experience tags in the database
 *
 * Run with: npx tsx scripts/audit-experience-tags.ts
 *
 * Output: Unique experience tags currently in use across all properties
 */

import { config } from "dotenv"
import { createClient } from "@supabase/supabase-js"

// Load .env.local (Next.js convention) so env vars are available
config({ path: ".env.local" })

async function auditExperienceTags() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or Supabase key. Set in .env.local")
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data, error } = await supabase
    .from("properties")
    .select("experiences")
    .eq("is_active", true)

  if (error) {
    console.error("Database error:", error)
    process.exit(1)
  }

  const allTags = new Set<string>()
  for (const row of data || []) {
    const experiences = row.experiences || []
    if (Array.isArray(experiences)) {
      experiences.forEach((tag: string) => allTags.add(tag))
    }
  }

  const sortedTags = Array.from(allTags).sort()
  console.log("\n=== UNIQUE EXPERIENCE TAGS IN DATABASE ===\n")
  console.log(`Total properties: ${data?.length || 0}`)
  console.log(`Unique tags: ${sortedTags.length}\n`)
  sortedTags.forEach((tag) => console.log(`  - ${tag}`))
  console.log("\n==========================================\n")

  // Cross-reference with homepage filter options
  const HOMEPAGE_EXPERIENCE_KEYS = [
    "mountainRetreats",
    "beachfrontParadise",
    "urbanAdventures",
    "forestGetaways",
    "tropicalEscapes",
    "countryHomes",
    "privateSanctuaries",
    "adventureOutdoor",
    "vineyardAgritourism",
    "familyFriendly",
    "festivalEvents",
    "uniqueThemed",
  ]

  const EXPERIENCE_KEY_TO_TAGS: Record<string, string[]> = {
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

  const filterTags = new Set(
    Object.values(EXPERIENCE_KEY_TO_TAGS).flat()
  )
  const dbTags = new Set(sortedTags)

  const inDbNotInFilter = sortedTags.filter((t) => !filterTags.has(t))
  const inFilterNotInDb = Array.from(filterTags).filter((t) => !dbTags.has(t))

  console.log("=== MISMATCH ANALYSIS ===\n")
  console.log("Tags in DB but NOT in filter mapping (consider adding to mapping):")
  inDbNotInFilter.forEach((t) => console.log(`  - ${t}`))
  console.log("\nTags in filter mapping but NOT in DB (no properties use these):")
  inFilterNotInDb.forEach((t) => console.log(`  - ${t}`))
  console.log()
}

auditExperienceTags()
