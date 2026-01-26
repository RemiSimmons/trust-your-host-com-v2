import type React from "react"
import { GuestSidebar } from "@/components/guest/guest-sidebar"
import { HostHeader } from "@/components/host/host-header" // Reusing header for consistency

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <GuestSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <HostHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
