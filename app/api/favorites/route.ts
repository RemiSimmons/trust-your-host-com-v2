import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { z } from "zod"

// Validation schema for POST/DELETE propertyId (must be UUID)
const PropertyIdSchema = z.object({
  propertyId: z.string().uuid("Property ID must be a valid UUID"),
})

// GET: Return user's favorites
export async function GET() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized", favorites: [] },
        { status: 401 }
      )
    }

    const { data, error } = await supabase
      .from("favorites")
      .select("property_id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: "Failed to fetch favorites", favorites: [] },
        { status: 500 }
      )
    }

    return NextResponse.json({
      favorites: data || [],
      count: data?.length || 0,
    })
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred", favorites: [] },
      { status: 500 }
    )
  }
}

// POST: Add property to favorites
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate request body
    const validationResult = PropertyIdSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid property ID format", details: validationResult.error.issues },
        { status: 400 }
      )
    }

    const { propertyId } = validationResult.data

    const { error } = await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        property_id: propertyId,
      })

    if (error) {
      // Handle duplicate entry
      if (error.code === "23505") {
        return NextResponse.json({
          success: true,
          message: "Already in favorites",
        })
      }
      return NextResponse.json(
        { error: "Failed to add to favorites" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Added to favorites",
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}

// DELETE: Remove property from favorites
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get("propertyId")

    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("property_id", propertyId)

    if (error) {
      return NextResponse.json(
        { error: "Failed to remove from favorites" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Removed from favorites",
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
