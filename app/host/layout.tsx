"use client"

import type React from "react"
import { useState } from "react"
import { HostSidebar } from "@/components/host/host-sidebar"
import { HostHeader } from "@/components/host/host-header"

export default function HostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-muted/20">
      <HostSidebar 
        mobileOpen={mobileMenuOpen} 
        onMobileClose={() => setMobileMenuOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <HostHeader onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
