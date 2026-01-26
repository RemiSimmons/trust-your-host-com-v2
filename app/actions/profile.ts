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
  const avatarUrl = formData.get("avatarUrl") as string

  // Update the 'profiles' table
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      avatar_url: avatarUrl,
    })
    .eq("id", user.id)

  if (error) {
    throw new Error("Failed to update profile")
  }

  // Also update Auth metadata if you want it to sync
  await supabase.auth.updateUser({
    data: { full_name: fullName, avatar_url: avatarUrl },
  })

  revalidatePath("/dashboard")
  revalidatePath("/host")
  revalidatePath("/settings")
}



