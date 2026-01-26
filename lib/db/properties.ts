import { createServerClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types"
import { properties as mockProperties } from "@/lib/data/properties"

export async function getProperties(): Promise<Property[]> {
  console.log("[v0] getProperties called")
  const supabase = await createServerClient()

  try {
    const { data, error } = await supabase.from("properties").select("*, host:profiles(*)")

    if (error) {
      console.log("[v0] Database error, using mock data:", error.code)
      if (
        error.code === "PGRST205" ||
        error.code === "SUPABASE_NOT_CONFIGURED" ||
        error.message.includes("Could not find the table")
      ) {
        console.warn("Database not available. Falling back to mock data.")
        return mockProperties
      }
      console.error("Error fetching properties:", error)
      return mockProperties
    }

    console.log("[v0] Fetched properties from database:", data?.length)

    if (!data || data.length === 0) {
      console.log("[v0] Database empty, using mock data")
      return mockProperties
    }

    return data.map(mapDatabasePropertyToProperty)
  } catch (err) {
    console.log("[v0] Exception caught, returning mock data:", err)
    return mockProperties
  }
}

export async function getPropertiesCount(): Promise<number> {
  const supabase = await createServerClient()

  try {
    const { count, error } = await supabase.from("properties").select("*", { count: "exact", head: true })

    if (error) {
      console.log("[v0] Database error, using mock data count:", error.code)
      return mockProperties.length
    }

    return count || mockProperties.length
  } catch (err) {
    console.log("[v0] Exception caught, returning mock data count:", err)
    return mockProperties.length
  }
}

export async function getFeaturedProperties(): Promise<Property[]> {
  console.log("[v0] getFeaturedProperties called")
  const supabase = await createServerClient()

  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*, host:profiles(*)")
      .eq("featured", true)
      .limit(6)

    if (error) {
      console.log("[v0] Database error, using mock data:", error.code)
      if (
        error.code === "PGRST205" ||
        error.code === "SUPABASE_NOT_CONFIGURED" ||
        error.message.includes("Could not find the table")
      ) {
        console.warn("Database not available. Falling back to mock data.")
        return mockProperties.filter((p) => p.featured).slice(0, 6)
      }
      console.error("Error fetching featured properties:", error)
      return mockProperties.filter((p) => p.featured).slice(0, 6)
    }

    console.log("[v0] Fetched featured properties from database:", data?.length)

    if (!data || data.length === 0) {
      console.log("[v0] Database empty, using mock featured properties")
      return mockProperties.filter((p) => p.featured).slice(0, 6)
    }

    return data.map(mapDatabasePropertyToProperty)
  } catch (err) {
    console.log("[v0] Exception caught, returning mock data:", err)
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
    if (error.code === "PGRST205" || error.message.includes("Could not find the table")) {
      console.warn("Database tables not found. Falling back to mock data.")
      // In mock data, we don't have real host IDs, so we'll return all properties for the demo
      // or filter if we had assigned host IDs in mock data.
      return mockProperties
    }
    console.error("Error fetching host properties:", error)
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
