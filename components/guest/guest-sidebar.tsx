"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Map, Heart, Settings, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const sidebarItems = [
  { icon: Map, label: "Saved Properties", href: "/dashboard" },
  { icon: Heart, label: "Favorites", href: "/dashboard/favorites" },
  { icon: User, label: "Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function GuestSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createBrowserClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card">
      <div className="p-6 flex items-center gap-2">
        <Heart className="h-6 w-6 text-accent fill-accent" />
        <span className="font-serif text-xl font-bold">TrustYourHost</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 py-4">
        {sidebarItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-muted-foreground hover:text-foreground",
                pathname === item.href && "bg-accent/10 text-accent hover:bg-accent/15 hover:text-accent",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </aside>
  )
}
