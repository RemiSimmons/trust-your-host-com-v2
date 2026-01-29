/**
 * Breadcrumb helper functions (Server-side)
 * These are pure functions that generate breadcrumb data
 */

export interface BreadcrumbItem {
  label: string
  href?: string
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
