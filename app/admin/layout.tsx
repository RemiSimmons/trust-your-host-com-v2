import type React from "react"
import { createServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: Re-enable auth check after testing
  // Temporarily disabled for testing
  
  // const isDemoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // if (isDemoMode) {
  //   // In demo mode, allow access without authentication
  // } else {
  //   // In production mode, verify authentication
  //   const supabase = await createServerClient()
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser()

  //   if (!user) {
  //     redirect("/host/login?redirect=/admin")
  //   }

  //   // In production, query the admin_users table or check user metadata
  //   const isAdmin = true // Mock: Replace with actual role check

  //   if (!isAdmin) {
  //     redirect("/")
  //   }
  // }
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
