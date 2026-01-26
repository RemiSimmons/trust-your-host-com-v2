import { createServerClient } from "@/lib/supabase/server"

export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: string
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createServerClient()

  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (error) {
    return null
  }

  return data
}
