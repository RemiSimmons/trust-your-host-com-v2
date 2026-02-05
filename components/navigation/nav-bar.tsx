"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, Heart, User, LogOut, LayoutDashboard, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createBrowserClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BackButton } from "@/components/navigation/back-button"

export function NavBar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  
  // Check if we're on the homepage (which has a background image)
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const supabase = createBrowserClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
    router.refresh()
  }

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        // Solid white background on interior pages, glass only on homepage when scrolled
        !isHomePage
          ? "bg-white py-4 shadow-md border-b border-gray-100"
          : scrolled
            ? "glass py-4 shadow-lg"
            : "bg-transparent py-6",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <BackButton
              className={cn("mr-2", (scrolled || !isHomePage) ? "text-foreground" : "text-white hover:text-white/80 hover:bg-white/10")}
            />

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-accent fill-accent" />
              <span
                className={cn(
                  "font-serif text-2xl font-bold transition-colors",
                  (scrolled || !isHomePage) ? "text-foreground" : "text-white",
                )}
              >
                TrustYourHost
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/search"
              className={cn(
                "text-sm font-medium transition-colors",
                (scrolled || !isHomePage) ? "text-muted-foreground hover:text-foreground" : "text-white/90 hover:text-white",
              )}
            >
              Search Properties
            </Link>
            <Link
              href="/#experiences"
              className={cn(
                "text-sm font-medium transition-colors",
                (scrolled || !isHomePage) ? "text-muted-foreground hover:text-foreground" : "text-white/90 hover:text-white",
              )}
              onClick={(e) => {
                // If already on homepage, smooth scroll instead of reload
                if (pathname === '/') {
                  e.preventDefault()
                  document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              Experiences
            </Link>
            <Link
              href="/how-it-works"
              className={cn(
                "text-sm font-medium transition-colors",
                (scrolled || !isHomePage) ? "text-muted-foreground hover:text-foreground" : "text-white/90 hover:text-white",
              )}
            >
              How It Works
            </Link>
            <Link
              href="/fifa-2026"
              className={cn(
                "text-sm font-bold transition-colors flex items-center gap-1",
                (scrolled || !isHomePage) ? "text-blue-600 hover:text-blue-700" : "text-yellow-400 hover:text-yellow-300",
              )}
            >
              <span>🏆</span>
              <span>FIFA 2026</span>
            </Link>
            <Link
              href="/for-hosts"
              className={cn(
                "text-sm font-medium transition-colors hover:text-orange-600",
                (scrolled || !isHomePage) ? "text-muted-foreground" : "text-white/90 hover:text-orange-400",
              )}
            >
              For Hosts
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={(scrolled || !isHomePage) ? "ghost" : "ghost"}
                    size="sm"
                    className={(scrolled || !isHomePage) ? "" : "text-white hover:text-white hover:bg-white/10"}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Host Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/host">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/host/properties">
                      <Building className="mr-2 h-4 w-4" />
                      My Properties
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/host/login">
                <Button
                  variant={(scrolled || !isHomePage) ? "ghost" : "ghost"}
                  size="sm"
                  className={(scrolled || !isHomePage) ? "" : "text-white hover:text-white hover:bg-white/10"}
                >
                  Host Login
                </Button>
              </Link>
            )}
            <Link href="/submit-property">
              <Button
                size="sm"
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                List Your Property
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-accent/10 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className={cn("h-6 w-6", (scrolled || !isHomePage) ? "text-foreground" : "text-white")} />
            ) : (
              <Menu className={cn("h-6 w-6", (scrolled || !isHomePage) ? "text-foreground" : "text-white")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/search"
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Search Properties
            </Link>
            <Link
              href="/#experiences"
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
              onClick={(e) => {
                setIsMenuOpen(false)
                // If already on homepage, smooth scroll instead of reload
                if (pathname === '/') {
                  e.preventDefault()
                  setTimeout(() => {
                    document.getElementById('experiences')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 100)
                }
              }}
            >
              Experiences
            </Link>
            <Link
              href="/how-it-works"
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/fifa-2026"
              className="block py-3 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors min-h-[44px] flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>🏆</span>
              <span>FIFA World Cup 2026</span>
            </Link>
            <Link
              href="/for-hosts"
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-orange-600 transition-colors min-h-[44px] flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              For Hosts
            </Link>

            {/* Primary CTA - Prominent in mobile */}
            <div className="pt-3 pb-3 border-t border-border">
              <Link href="/submit-property" onClick={() => setIsMenuOpen(false)}>
                <Button
                  size="sm"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold shadow-sm hover:shadow-md"
                >
                  List Your Property
                </Button>
              </Link>
            </div>

            <div className="space-y-2 border-t border-border pt-3">
              {user ? (
                <>
                  <Link href="/host" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start min-h-[44px]">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link href="/host/properties" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full justify-start min-h-[44px]">
                      <Building className="h-4 w-4 mr-2" />
                      My Properties
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-destructive min-h-[44px]"
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/host/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" size="sm" className="w-full min-h-[44px]">
                      Host Login
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  )
}
