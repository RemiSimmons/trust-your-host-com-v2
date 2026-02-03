"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addFavorite(propertyId: string) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to save favorites" }
  }

  try {
    const { error } = await supabase
      .from("favorites")
      .insert({
        user_id: user.id,
        property_id: propertyId,
      })

    if (error) {
      // Handle duplicate entry gracefully
      if (error.code === "23505") {
        return { success: true, message: "Already in favorites" }
      }
      console.error("Error adding favorite:", error)
      return { error: "Failed to add to favorites" }
    }

    revalidatePath("/dashboard/favorites")
    return { success: true }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function removeFavorite(propertyId: string) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to manage favorites" }
  }

  try {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("property_id", propertyId)

    if (error) {
      console.error("Error removing favorite:", error)
      return { error: "Failed to remove from favorites" }
    }

    revalidatePath("/dashboard/favorites")
    return { success: true }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { error: "An unexpected error occurred" }
  }
}

export async function toggleFavorite(propertyId: string) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to save favorites", isFavorite: false }
  }

  try {
    // Check if already favorited
    const { data: existing } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("property_id", propertyId)
      .single()

    if (existing) {
      // Remove favorite
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", propertyId)

      if (error) {
        console.error("Error removing favorite:", error)
        return { error: "Failed to remove from favorites", isFavorite: true }
      }

      revalidatePath("/dashboard/favorites")
      return { success: true, isFavorite: false }
    } else {
      // Add favorite
      const { error } = await supabase
        .from("favorites")
        .insert({
          user_id: user.id,
          property_id: propertyId,
        })

      if (error) {
        console.error("Error adding favorite:", error)
        return { error: "Failed to add to favorites", isFavorite: false }
      }

      revalidatePath("/dashboard/favorites")
      return { success: true, isFavorite: true }
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { error: "An unexpected error occurred", isFavorite: false }
  }
}

export async function getFavorites() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { data: [], error: null }
  }

  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("property_id, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching favorites:", error)
      return { data: [], error: "Failed to fetch favorites" }
    }

    return { data: data || [], error: null }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { data: [], error: "An unexpected error occurred" }
  }
}

export async function isFavorite(propertyId: string) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return false
  }

  try {
    const { data } = await supabase
      .from("favorites")
      .select("id")
      .eq("user_id", user.id)
      .eq("property_id", propertyId)
      .single()

    return !!data
  } catch {
    return false
  }
}
