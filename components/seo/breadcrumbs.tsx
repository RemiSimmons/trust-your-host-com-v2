"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Breadcrumbs component for navigation hierarchy
 * Improves UX and SEO by showing page context
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-sm text-muted-foreground", className)}
    >
      {/* Home link */}
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>

      {/* Breadcrumb items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(isLast && "text-foreground font-medium")}>
                {item.label}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}

/**
 * Helper to generate breadcrumb items from pathname
 */
export function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean)
  const items: BreadcrumbItem[] = []

  let currentPath = ""

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    currentPath += `/${segment}`

    // Format the label (capitalize, replace hyphens)
    const label = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    // Don't link the last item (current page)
    const isLast = i === segments.length - 1

    items.push({
      label,
      href: isLast ? undefined : currentPath,
    })
  }

  return items
}

/**
 * Specialized breadcrumbs for property pages
 */
export function generatePropertyBreadcrumbs(
  propertyName: string,
  city: string,
  state: string
): BreadcrumbItem[] {
  return [
    { label: "Search", href: "/search" },
    { label: `${city}, ${state}`, href: `/search?location=${city}, ${state}` },
    { label: propertyName },
  ]
}

/**
 * Specialized breadcrumbs for article pages
 */
export function generateArticleBreadcrumbs(
  category: string,
  articleTitle: string
): BreadcrumbItem[] {
  const categoryLabels: Record<string, string> = {
    insights: "Insights",
    guides: "Guides",
    journal: "Journal",
    resources: "Resources",
  }

  return [
    { label: categoryLabels[category] || category, href: `/${category}` },
    { label: articleTitle },
  ]
}

/**
 * Specialized breadcrumbs for FIFA pages
 */
export function generateFifaBreadcrumbs(cityName?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: "FIFA 2026", href: "/fifa-2026" }]

  if (cityName) {
    items.push({ label: cityName })
  }

  return items
}

/**
 * Specialized breadcrumbs for help pages
 */
export function generateHelpBreadcrumbs(
  section?: string,
  article?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [{ label: "Help Center", href: "/help" }]

  if (section) {
    const sectionLabels: Record<string, string> = {
      "for-hosts": "For Hosts",
      "for-guests": "For Guests",
    }

    items.push({
      label: sectionLabels[section] || section,
      href: `/help/${section}`,
    })

    if (article) {
      items.push({ label: article })
    }
  }

  return items
}
