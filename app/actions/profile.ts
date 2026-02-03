"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getGoogleMapsApiKey() {
  return process.env["NEXT_PUBLIC_GOOGLE_MAPS_API_KEY"] || ""
}

export async function updateProfile(formData: FormData) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error("Unauthorized")

  const fullName = formData.get("fullName") as string
  const avatarUrl = formData.get("avatarUrl") as string | null

  // Build update object - only include avatar_url if it's explicitly provided
  const updateData: { full_name: string; avatar_url?: string | null } = {
    full_name: fullName,
  }

  // Only update avatar_url if it was explicitly set in the form
  if (formData.has("avatarUrl")) {
    updateData.avatar_url = avatarUrl || null
  }

  // Update the 'profiles' table
  const { error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", user.id)

  if (error) {
    throw new Error("Failed to update profile")
  }

  // Also update Auth metadata if you want it to sync
  const authUpdateData: { full_name: string; avatar_url?: string | null } = {
    full_name: fullName,
  }
  if (formData.has("avatarUrl")) {
    authUpdateData.avatar_url = avatarUrl || null
  }

  await supabase.auth.updateUser({
    data: authUpdateData,
  })

  revalidatePath("/dashboard")
  revalidatePath("/host")
  revalidatePath("/host/settings")
  revalidatePath("/settings")
}



