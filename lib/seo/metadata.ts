/**
 * Metadata generation utilities for SEO
 * Provides consistent metadata across all pages with Open Graph and Twitter Card support
 */

import { Metadata } from "next"
import { Property, Article } from "@/lib/types"

const SITE_NAME = "TrustYourHost"
const SITE_URL = "https://trustyourhost.com"
const SITE_DESCRIPTION =
  "Discover unique vacation rentals from verified hosts. Book directly and save on fees. Featured properties for FIFA 2026 World Cup and beyond."
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

export interface MetadataConfig {
  title: string
  description: string
  image?: string
  url?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  noIndex?: boolean
}

/**
 * Generate complete metadata object with Open Graph and Twitter Cards
 */
export function generateMetadata(config: MetadataConfig): Metadata {
  const {
    title,
    description,
    image = DEFAULT_IMAGE,
    url,
    type = "website",
    publishedTime,
    modifiedTime,
    authors,
    tags,
    noIndex = false,
  } = config

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL

  return {
    title: fullTitle,
    description,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors,
        tags,
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      // Add creator handle when available
      // creator: "@trustyourhost",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

/**
 * Generate metadata for property detail pages
 */
export function generatePropertyMetadata(property: Property): Metadata {
  const title = `${property.name} - ${property.location.city}, ${property.location.state}`
  const description =
    property.description.short ||
    `${property.propertyType} in ${property.location.city} with ${property.capacity.guests} guests, ${property.capacity.bedrooms} bedrooms. ${property.quickHighlights[0] || ""}`

  const image = property.images[0] || DEFAULT_IMAGE

  return generateMetadata({
    title,
    description,
    image,
    url: `/properties/${property.slug}`,
  })
}

/**
 * Generate metadata for article pages
 */
export function generateArticleMetadata(article: Article): Metadata {
  return generateMetadata({
    title: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    url: `/${article.category}/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author.name],
    tags: article.tags,
  })
}

/**
 * Generate metadata for FIFA city pages
 */
export function generateFifaCityMetadata(cityName: string, description: string): Metadata {
  return generateMetadata({
    title: `FIFA 2026 ${cityName} Accommodations`,
    description:
      description ||
      `Find verified vacation rentals near ${cityName} for FIFA World Cup 2026. Book directly with local hosts and save on fees.`,
    url: `/fifa-2026/${cityName.toLowerCase().replace(/\s+/g, "-")}`,
  })
}

/**
 * Generate metadata for search/listing pages
 */
export function generateSearchMetadata(
  searchQuery?: string,
  location?: string,
  count?: number
): Metadata {
  let title = "Search Vacation Rentals"
  let description = "Browse verified vacation rentals from trusted hosts."

  if (searchQuery && location) {
    title = `${searchQuery} in ${location}`
    description = `Find ${searchQuery.toLowerCase()} in ${location}. ${count ? `${count} properties available.` : ""} Book directly and save on fees.`
  } else if (location) {
    title = `Vacation Rentals in ${location}`
    description = `Discover unique vacation rentals in ${location}. ${count ? `${count} properties available.` : ""} Book directly with verified hosts.`
  } else if (searchQuery) {
    title = `Search Results for "${searchQuery}"`
    description = `Find vacation rentals matching "${searchQuery}". Book directly with trusted hosts.`
  }

  return generateMetadata({
    title,
    description,
    url: "/search",
  })
}

/**
 * Generate metadata for category/hub pages
 */
export function generateCategoryMetadata(
  category: string,
  description?: string,
  count?: number
): Metadata {
  const categoryTitles: Record<string, string> = {
    insights: "Host Insights & Industry Trends",
    guides: "Travel Guides & Destination Tips",
    journal: "Guest Stories & Travel Experiences",
    resources: "Host Resources & Best Practices",
  }

  const categoryDescriptions: Record<string, string> = {
    insights:
      "Expert insights on vacation rental hosting, industry trends, and strategies for success.",
    guides: "Comprehensive travel guides for FIFA 2026 cities and popular destinations.",
    journal: "Real stories from travelers who chose direct booking for memorable experiences.",
    resources: "Practical resources and actionable advice for vacation rental hosts.",
  }

  const title = categoryTitles[category] || `${category.charAt(0).toUpperCase() + category.slice(1)}`
  const desc =
    description || categoryDescriptions[category] || `Browse all ${category} on TrustYourHost.`

  return generateMetadata({
    title,
    description: count ? `${desc} ${count} articles available.` : desc,
    url: `/${category}`,
  })
}

/**
 * Homepage metadata
 */
export function generateHomeMetadata(): Metadata {
  return generateMetadata({
    title: "Direct Vacation Rentals from Verified Hosts | No Booking Fees | TrustYourHost",
    description:
      "Book vacation rentals directly from verified hosts. No platform commissions. Save 10-15% vs Airbnb/Vrbo. FIFA World Cup 2026 properties available.",
    url: "/",
  })
}

/**
 * For Hosts page metadata
 */
export function generateForHostsMetadata(): Metadata {
  return generateMetadata({
    title: "List Your Property - Join TrustYourHost",
    description:
      "Join our directory of verified hosts. Get discovered by travelers looking for direct bookings. No guest fees, just qualified leads to your website.",
    url: "/for-hosts",
  })
}

/**
 * Help center metadata
 */
export function generateHelpMetadata(section?: string): Metadata {
  if (section === "for-hosts") {
    return generateMetadata({
      title: "Help for Hosts - Getting Started",
      description:
        "Learn how TrustYourHost works for vacation rental hosts. Setup guides, best practices, and answers to common questions.",
      url: "/help/for-hosts",
    })
  }

  if (section === "for-guests") {
    return generateMetadata({
      title: "Help for Guests - Booking Direct",
      description:
        "Everything you need to know about booking vacation rentals directly with hosts. Safety tips, how it works, and FAQs.",
      url: "/help/for-guests",
    })
  }

  return generateMetadata({
    title: "Help Center",
    description:
      "Get help with TrustYourHost. Guides for hosts and guests, FAQs, and support resources.",
    url: "/help",
  })
}
