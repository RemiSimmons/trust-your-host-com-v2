import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function GuestDashboardPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Guests don't need accounts on a directory platform
  // If logged in, redirect to host dashboard
  if (user) {
    redirect("/host")
  }

  // If not logged in, redirect to host login
  redirect("/host/login")
}
