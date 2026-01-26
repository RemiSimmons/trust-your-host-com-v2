import type React from "react"
import { HostSidebar } from "@/components/host/host-sidebar"
import { HostHeader } from "@/components/host/host-header"

export default function HostLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <HostSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <HostHeader />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
