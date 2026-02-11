import { createServerClient } from "@/lib/supabase/server"
import { properties } from "@/lib/data/properties"
import { NextResponse } from "next/server"

export async function GET() {
  // SECURITY: Disable seed endpoint entirely in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const supabase = await createServerClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized. Please log in to seed data." }, { status: 401 })
  }

  // Verify the user has admin role before allowing database seeding
  const { data: adminCheck } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (adminCheck?.role !== "admin") {
    return NextResponse.json({ error: "Forbidden. Admin access required to seed data." }, { status: 403 })
  }

  try {
    const { data: profile } = await supabase.from("profiles").select("id").eq("id", user.id).single()

    if (!profile) {
      await supabase.from("profiles").insert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata.full_name || user.email?.split("@")[0] || "Host",
        avatar_url: user.user_metadata.avatar_url,
        role: "host",
      })
    }

    const results = []

    for (const property of properties) {
      // Prepare the property data matching the database schema
      // We omit the 'id' to let Postgres generate a UUID, or we could preserve it if it was a valid UUID
      // The mock IDs are "1", "2", etc., which are not valid UUIDs. So we let Postgres generate new ones.

      const propertyData = {
        host_id: user.id,
        name: property.name,
        slug: property.slug,
        location: property.location,
        images: property.images,
        experiences: property.experiences,
        property_type: property.propertyType,
        pricing: property.pricing,
        capacity: property.capacity,
        amenities: property.amenities,
        quick_highlights: property.quickHighlights,
        description: property.description,
        rating_average: property.rating.average,
        rating_count: property.rating.count,
        verified: property.verified,
        featured: property.featured,
      }

      // Check if property with this slug already exists to avoid duplicates
      const { data: existing } = await supabase.from("properties").select("id").eq("slug", property.slug).single()

      let result
      if (existing) {
        // Update existing
        const { data, error } = await supabase.from("properties").update(propertyData).eq("id", existing.id).select()

        if (error) throw error
        result = { status: "updated", name: property.name }
      } else {
        // Insert new
        const { data, error } = await supabase.from("properties").insert(propertyData).select()

        if (error) throw error
        result = { status: "inserted", name: property.name }
      }

      results.push(result)
    }

    return NextResponse.json({ success: true, results })
  } catch (error: any) {
    console.error('Seeding error:', error.message)
    return NextResponse.json({ error: "An error occurred during seeding" }, { status: 500 })
  }
}
