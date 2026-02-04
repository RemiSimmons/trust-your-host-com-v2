import { createServerClient } from "@/lib/supabase/server"
import type { Property } from "@/lib/types"
import { mockProperties } from "@/lib/data/properties"
import { getHostAvatar } from "@/lib/utils/avatar"

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
  console.log("[getPropertyBySlug] Looking for slug:", slug)
  const supabase = await createServerClient()

  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*, host:profiles(*)")
      .eq("slug", slug)
      .single()

    console.log("[getPropertyBySlug] Query result - data:", data ? "found" : "null", "error:", error?.code, error?.message)

    if (error) {
      console.log("[getPropertyBySlug] Error occurred:", error)
      if (error.code === "PGRST205" || error.message.includes("Could not find the table")) {
        const mockResult = mockProperties.find((p) => p.slug === slug)
        console.log("[getPropertyBySlug] Falling back to mock, found:", !!mockResult)
        return mockResult || null
      }
      // Try without the join to see if that's the issue
      console.log("[getPropertyBySlug] Trying query without join...")
      const { data: simpleData, error: simpleError } = await supabase
        .from("properties")
        .select("*")
        .eq("slug", slug)
        .single()
      console.log("[getPropertyBySlug] Simple query result:", simpleData ? "found" : "null", simpleError?.message)
      return null
    }

    if (!data) {
      const mockResult = mockProperties.find((p) => p.slug === slug)
      console.log("[getPropertyBySlug] No data, falling back to mock, found:", !!mockResult)
      return mockResult || null
    }

    console.log("[getPropertyBySlug] Mapping property:", data.name)
    return mapDatabasePropertyToProperty(data)
  } catch (err) {
    console.log("[v0] Exception in getPropertyBySlug:", err)
    return mockProperties.find((p) => p.slug === slug) || null
  }
}

export async function getPropertyById(id: string): Promise<Property | null> {
  console.log("[getPropertyById] Looking for id:", id)
  const supabase = await createServerClient()

  try {
    const { data, error } = await supabase
      .from("properties")
      .select("*, host:profiles(*)")
      .eq("id", id)
      .single()

    console.log("[getPropertyById] Query result - data:", data ? "found" : "null", "error:", error?.code, error?.message)

    if (error) {
      console.log("[getPropertyById] Error:", error)
      if (error.code === "PGRST205" || error.message.includes("Could not find the table")) {
        return mockProperties.find((p) => p.id === id) || null
      }
      return null
    }

    if (!data) {
      return mockProperties.find((p) => p.id === id) || null
    }

    console.log("[getPropertyById] Mapping property:", data.name, "host_id:", data.host_id)
    return mapDatabasePropertyToProperty(data)
  } catch (err) {
    console.log("[v0] Exception in getPropertyById:", err)
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

// Fetch favorite properties for a user
export async function getFavoriteProperties(userId: string): Promise<Property[]> {
  const supabase = await createServerClient()

  try {
    // First, get the favorite property IDs for this user
    const { data: favorites, error: favoritesError } = await supabase
      .from("favorites")
      .select("property_id")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (favoritesError) {
      // If favorites table doesn't exist yet, return empty array
      if (
        favoritesError.code === "PGRST205" ||
        favoritesError.code === "42P01" ||
        favoritesError.message.includes("Could not find the table")
      ) {
        console.log("[v0] Favorites table not found, returning empty array")
        return []
      }
      console.error("[v0] Error fetching favorites:", favoritesError)
      return []
    }

    if (!favorites || favorites.length === 0) {
      return []
    }

    const propertyIds = favorites.map((f) => f.property_id)

    // Fetch the actual properties
    const { data: properties, error: propertiesError } = await supabase
      .from("properties")
      .select("*, host:profiles(*)")
      .in("id", propertyIds)

    if (propertiesError) {
      // Fall back to mock data if properties table doesn't exist
      if (
        propertiesError.code === "PGRST205" ||
        propertiesError.message.includes("Could not find the table")
      ) {
        // Return mock properties that match the favorite IDs
        return mockProperties.filter((p) => propertyIds.includes(p.id))
      }
      console.error("[v0] Error fetching favorite properties:", propertiesError)
      return []
    }

    // Map and maintain the order from favorites (most recent first)
    const propertyMap = new Map(properties.map((p) => [p.id, p]))
    const orderedProperties: Property[] = []
    
    for (const id of propertyIds) {
      const dbProp = propertyMap.get(id)
      if (dbProp) {
        orderedProperties.push(mapDatabasePropertyToProperty(dbProp))
      } else {
        // Check if it's a mock property
        const mockProp = mockProperties.find((p) => p.id === id)
        if (mockProp) {
          orderedProperties.push(mockProp)
        }
      }
    }

    return orderedProperties
  } catch (err) {
    console.error("[v0] Exception in getFavoriteProperties:", err)
    return []
  }
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
      baseNightlyRate: Number(dbProp.pricing?.baseNightlyRate || 0),
    },
    capacity: dbProp.capacity || { guests: 0, bedrooms: 0, beds: 0, bathrooms: 0, allowsPets: false },
    amenities: dbProp.amenities || [],
    quickHighlights: dbProp.quick_highlights || [],
    description: dbProp.description,
    house_rules: dbProp.house_rules,
    rating: {
      average: Number(dbProp.rating_average) || 0,
      count: dbProp.rating_count || 0,
    },
    host: {
      id: dbProp.host?.id || dbProp.host_id,
      name: dbProp.host?.full_name || "Host",
      photo: getHostAvatar(
        dbProp.host?.id || dbProp.host_id, 
        dbProp.host?.avatar_url,
        dbProp.host?.full_name
      ),
      verified: true, // Assuming trusted hosts for now
      rating: 4.9, // Placeholder until we have host ratings
      responseTime: "within an hour", // Placeholder
    },
    verified: dbProp.verified,
    featured: dbProp.featured,
    // Additional fields for host dashboard
    external_booking_url: dbProp.external_booking_url,
    typical_response_hours: dbProp.typical_response_hours,
    contact_email: dbProp.contact_email,
    contact_phone: dbProp.contact_phone,
    minimum_stay: dbProp.minimum_stay,
    subscription_status: dbProp.subscription_status,
    stripe_subscription_id: dbProp.stripe_subscription_id,
    trial_ends_at: dbProp.trial_ends_at,
    is_active: dbProp.is_active,
    approval_status: dbProp.approval_status,
    pending_changes: dbProp.pending_changes,
    postal_code: dbProp.postal_code,
  }
}
