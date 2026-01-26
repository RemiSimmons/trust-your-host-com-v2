"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Workflow,
  BarChart3,
  Settings,
  Shield,
  MessageSquare,
  Flag,
  Bot,
  Building,
  FileEdit,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Property Submissions", href: "/admin/submissions", icon: Building },
  { name: "Change Requests", href: "/admin/change-requests", icon: FileEdit },
  { name: "User Management", href: "/admin/users", icon: Users },
  { name: "Agent Workflows", href: "/admin/workflows", icon: Bot },
  { name: "Task Queue", href: "/admin/tasks", icon: Workflow },
  { name: "Content Moderation", href: "/admin/moderation", icon: Flag },
  { name: "Analytics & Reports", href: "/admin/analytics", icon: BarChart3 },
  { name: "Properties", href: "/admin/properties", icon: Building },
  { name: "Messages & Support", href: "/admin/messages", icon: MessageSquare },
  { name: "Roles & Permissions", href: "/admin/roles", icon: Shield },
  { name: "System Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Shield className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold">Admin Panel</span>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
