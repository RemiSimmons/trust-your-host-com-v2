"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Building, BarChart3, CreditCard, Settings, LogOut, Heart, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

type SubscriptionStatus = 'pending_payment' | 'trial' | 'active' | 'canceled' | 'paused' | null

const baseSidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/host" },
  { icon: Building, label: "My Properties", href: "/host/properties" },
  { icon: BarChart3, label: "Analytics", href: "/host/analytics" },
  { icon: Settings, label: "Account", href: "/host/settings" },
]

export function HostSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createBrowserClient()
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkSubscriptionStatus() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setIsLoading(false)
        return
      }

      // Check for any property with subscription status
      const { data: properties } = await supabase
        .from('properties')
        .select('subscription_status')
        .eq('host_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)

      if (properties && properties.length > 0) {
        setSubscriptionStatus(properties[0].subscription_status as SubscriptionStatus)
      }
      setIsLoading(false)
    }

    checkSubscriptionStatus()
  }, [supabase])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  // Determine which billing/subscription link to show
  const getBillingItem = () => {
    if (isLoading) return null
    
    // For pending_payment, show "Billing" (setup view)
    if (subscriptionStatus === 'pending_payment') {
      return { icon: CreditCard, label: "Billing", href: "/host/billing" }
    }
    
    // For trial, active, or canceled, show "Subscription" (management view)
    if (subscriptionStatus === 'trial' || subscriptionStatus === 'active' || subscriptionStatus === 'canceled') {
      return { icon: Receipt, label: "Subscription", href: "/host/billing" }
    }
    
    // For paused status, show "Billing" to encourage reactivation
    if (subscriptionStatus === 'paused') {
      return { icon: CreditCard, label: "Billing", href: "/host/billing" }
    }
    
    // No subscription yet - don't show billing link
    return null
  }

  const billingItem = getBillingItem()
  
  // Build sidebar items dynamically
  const sidebarItems = [
    ...baseSidebarItems.slice(0, 3), // Dashboard, Properties, Analytics
    ...(billingItem ? [billingItem] : []),
    ...baseSidebarItems.slice(3), // Account
  ]

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
