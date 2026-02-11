"use client"

import { useState, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BackButtonProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function BackButton({ className, variant = "ghost" }: BackButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't show back button on the home page
  // Only check after mounting to avoid hydration mismatch
  if (!mounted || pathname === "/") {
    return null
  }

  const handleBack = () => {
    // If no prior history (e.g. arrived via direct link), go to home
    if (typeof window !== "undefined" && window.history.length <= 1) {
      router.push("/")
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant={variant}
      size="sm"
      className={cn("gap-1 pl-2 pr-3 md:pr-4 min-h-[44px] min-w-[44px]", className)}
      onClick={handleBack}
      aria-label="Go back"
    >
      <ChevronLeft className="h-5 w-5" />
      <span className="hidden md:inline">Back</span>
    </Button>
  )
}
