import { createServerClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types"
import { mockProperties } from "@/lib/data/properties"

export async function getProperties(): Promise<Property[]> {
  console.log("[v0] getProperties called")
  const supabase = await createServerClient()

  try {
    // Only fetch active properties (trial or active subscription status)
    const { data, error } = await supabase
      .from("properties")
      .select("*, host:profiles(*)")
      .eq("is_active", true)

    if (error) {
      console.log("[v0] Database error, using mock data:", error.code)
      return mockProperties
    }

    console.log("[v0] Fetched properties from database:", data?.length)

    // Hybrid approach: Show mock data until we have 50+ real properties
    if (!data || data.length < 50) {
      const realCount = data?.length || 0
      console.log(`[v0] Only ${realCount} real properties. Showing mock data + real properties.`)
      
      if (!data || data.length === 0) {
        // No real properties yet, return all mock data
        return mockProperties
      }
      
      // Mix real properties with mock data (real properties appear first)
      const realProperties = data.map(mapDatabasePropertyToProperty)
      return [...realProperties, ...mockProperties]
    }

    // 50+ real properties, only show real ones
    console.log("[v0] 50+ real properties! Using only real data.")
    return data.map(mapDatabasePropertyToProperty)
  } catch (err) {
    console.log("[v0] Exception caught, returning mock data:", err)
    return mockProperties
  }
}

export async function getPropertiesCount(): Promise<number> {
  const supabase = await createServerClient()

  try {
    // Only count active properties
    const { count, error } = await supabase
      .from("properties")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true)

    if (error) {
      console.log("[v0] Database error, using mock data count:", error.code)
      return mockProperties.length
    }

    const realCount = count || 0
    
    // Show combined count (real + mock) until we have 50+ real properties
    if (realCount < 50) {
      console.log(`[v0] Count: ${realCount} real + ${mockProperties.length} mock`)
      return realCount + mockProperties.length
    }

    // 50+ real properties: return only real count
    console.log(`[v0] Count: ${realCount} real properties (50+ threshold reached)`)
    return realCount
  } catch (err) {
    console.log("[v0] Exception caught, returning mock data count:", err)
    return mockProperties.length
  }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  console.log("[v0] getFeaturedProperties called")
  const supabase = await createServerClient()

  try {
    // Only fetch active, featured properties
    const { data, error } = await supabase
      .from("properties")
      .select("*, host:profiles(*)")
      .eq("featured", true)
      .eq("is_active", true)
      .limit(6)

    if (error) {
      console.log("[v0] Database error, using mock featured:", error.code)
      return mockProperties.filter((p) => p.featured).slice(0, 6)
    }

    console.log("[v0] Fetched featured properties from database:", data?.length)

    // Until we have enough real featured properties, mix with mock data
    if (!data || data.length < 6) {
      const realFeatured = data ? data.map(mapDatabasePropertyToProperty) : []
      const mockFeatured = mockProperties.filter((p) => p.featured).slice(0, 6 - realFeatured.length)
      console.log(`[v0] Mixing ${realFeatured.length} real + ${mockFeatured.length} mock featured`)
      return [...realFeatured, ...mockFeatured].slice(0, 6)
    }

    // 6+ real featured properties, use only real ones
    return data.map(mapDatabasePropertyToProperty)
  } catch (err) {
    console.log("[v0] Exception caught, returning mock featured:", err)
    return mockProperties.filter((p) => p.featured).slice(0, 6)
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const supabase = await createServerClient()

  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*, host:profiles(*)")
      .eq("slug", slug)
      .single()

    if (error) {
      if (error.code === "PGRST205" || error.message.includes("Could not find the table")) {
        return mockProperties.find((p) => p.slug === slug) || null
      }
      return null
    }

    if (!data) {
      return mockProperties.find((p) => p.slug === slug) || null
    }

    return mapDatabasePropertyToProperty(data)
  } catch (err) {
    console.log("[v0] Exception in getPropertyBySlug, using mock data:", err)
    return mockProperties.find((p) => p.slug === slug) || null
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = await createServerClient()

  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*, host:profiles(*)")
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST205" || error.message.includes("Could not find the table")) {
        return mockProperties.find((p) => p.id === id) || null
      }
      return null
    }

    if (!data) {
      return mockProperties.find((p) => p.id === id) || null
    }

    return mapDatabasePropertyToProperty(data)
  } catch (err) {
    console.log("[v0] Exception in getPropertyById, using mock data:", err)
    return mockProperties.find((p) => p.id === id) || null
  }
}

export async function getHostProperties(hostId: string): Promise<Property[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from("properties").select("*, host:profiles(*)").eq("host_id", hostId)

  if (error) {
    console.log("[v0] Error fetching host properties:", error.code)
    return []
  }

  return data.map(mapDatabasePropertyToProperty)
}

// Added function to fetch favorite properties for a user
export async function getFavoriteProperties(userId: string): Promise<Property[]> {
  // In a real app, we would join a 'favorites' table.
  // For now, we'll mock this or return a random subset if using mock data.
  const supabase = await createServerClient()

  // Example: const { data } = await supabase.from('favorites').select('property_id').eq('user_id', userId)
  // Then fetch properties.
  // Since we don't have a favorites table defined in previous steps, we'll assume we return a subset of properties for demo.

  const { data, error } = await supabase.from("properties").select("*, host:profiles(*)").limit(3)

  if (error) {
    if (
      error.code === "PGRST205" ||
      error.code === "SUPABASE_NOT_CONFIGURED" ||
      error.message.includes("Could not find the table")
    ) {
      // Fallback to mock data: return first 3 as favorites
      return mockProperties.slice(0, 3)
    }
    return []
  }

  return data.map(mapDatabasePropertyToProperty)
}

function mapDatabasePropertyToProperty(dbProp: any): Property {
  return {
    id: dbProp.id,
    name: dbProp.name,
    slug: dbProp.slug,
    location: dbProp.location,
    images: dbProp.images || [],
    experiences: dbProp.experiences || [],
    propertyType: dbProp.property_type,
    pricing: {
      ...dbProp.pricing,
      baseNightlyRate: Number(dbProp.pricing.baseNightlyRate),
    },
    capacity: dbProp.capacity,
    amenities: dbProp.amenities || [],
    quickHighlights: dbProp.quick_highlights || [],
    description: dbProp.description,
    rating: {
      average: Number(dbProp.rating_average) || 0,
      count: dbProp.rating_count || 0,
    },
    host: {
      id: dbProp.host?.id || dbProp.host_id,
      name: dbProp.host?.full_name || "Host",
      photo: dbProp.host?.avatar_url || "https://i.pravatar.cc/150",
      verified: true, // Assuming trusted hosts for now
      rating: 4.9, // Placeholder until we have host ratings
      responseTime: "within an hour", // Placeholder
    },
    verified: dbProp.verified,
    featured: dbProp.featured,
  }
}
