/**
 * Schema.org JSON-LD structured data generators
 * Provides type-safe schema generation for SEO and rich results
 */

import { Property, Article } from "@/lib/types"

export interface SchemaOrganization {
  "@context": "https://schema.org"
  "@type": "Organization"
  name: string
  url: string
  logo: string
  description?: string
  telephone?: string
  sameAs?: string[]
  address?: {
    "@type": "PostalAddress"
    addressLocality: string
    addressRegion: string
    addressCountry: string
  }
  contactPoint?: {
    "@type": "ContactPoint"
    contactType: string
    email?: string
    telephone?: string
  }
}

export interface SchemaWebSite {
  "@context": "https://schema.org"
  "@type": "WebSite"
  name: string
  url: string
  description?: string
  potentialAction?: {
    "@type": "SearchAction"
    target: {
      "@type": "EntryPoint"
      urlTemplate: string
    }
    "query-input": string
  }
}

export interface SchemaArticle {
  "@context": "https://schema.org"
  "@type": "Article"
  headline: string
  description: string
  image: string | string[]
  author: {
    "@type": "Person"
    name: string
    image?: string
  }
  publisher: {
    "@type": "Organization"
    name: string
    logo: {
      "@type": "ImageObject"
      url: string
    }
  }
  datePublished: string
  dateModified?: string
  mainEntityOfPage?: {
    "@type": "WebPage"
    "@id": string
  }
}

export interface SchemaFAQPage {
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity: Array<{
    "@type": "Question"
    name: string
    acceptedAnswer: {
      "@type": "Answer"
      text: string
    }
  }>
}

export interface SchemaLodgingBusiness {
  "@context": "https://schema.org"
  "@type": "LodgingBusiness"
  name: string
  description: string
  image: string | string[]
  address?: {
    "@type": "PostalAddress"
    streetAddress?: string
    addressLocality: string
    addressRegion: string
    postalCode?: string
    addressCountry: string
  }
  geo?: {
    "@type": "GeoCoordinates"
    latitude: number
    longitude: number
  }
  url?: string
  priceRange?: string
  aggregateRating?: {
    "@type": "AggregateRating"
    ratingValue: number
    reviewCount: number
    bestRating?: number
    worstRating?: number
  }
  amenityFeature?: Array<{
    "@type": "LocationFeatureSpecification"
    name: string
    value: boolean
  }>
}

export interface SchemaBreadcrumbList {
  "@context": "https://schema.org"
  "@type": "BreadcrumbList"
  itemListElement: Array<{
    "@type": "ListItem"
    position: number
    name: string
    item?: string
  }>
}

/**
 * Generate Organization schema (site-wide)
 */
export function generateOrganizationSchema(): SchemaOrganization {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrustYourHost",
    url: "https://trustyourhost.com",
    logo: "https://trustyourhost.com/logo.png",
    description: "A trusted directory for vacation rental hosts offering direct bookings. Find unique stays from verified hosts for FIFA 2026 and beyond.",
    telephone: "+1-404-301-0535",
    sameAs: [
      "https://www.facebook.com/trustyourhost",
      // Add more social media URLs when available
      // "https://twitter.com/trustyourhost",
      // "https://instagram.com/trustyourhost",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Atlanta",
      addressRegion: "GA",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "hello@trustyourhost.com",
      telephone: "+1-404-301-0535",
    },
  }
}

/**
 * Generate WebSite schema with search functionality
 */
export function generateWebSiteSchema(): SchemaWebSite {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TrustYourHost",
    url: "https://trustyourhost.com",
    description: "Directory of verified vacation rental hosts offering direct bookings",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://trustyourhost.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }
}

/**
 * Generate Article schema for blog posts and guides
 */
export function generateArticleSchema(article: Article, canonicalUrl: string): SchemaArticle {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    author: {
      "@type": "Person",
      name: article.author.name,
      image: article.author.avatar,
    },
    publisher: {
      "@type": "Organization",
      name: "TrustYourHost",
      logo: {
        "@type": "ImageObject",
        url: "https://trustyourhost.com/logo.png",
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  }
}

/**
 * Generate FAQPage schema
 */
export function generateFAQPageSchema(faqs: Array<{ question: string; answer: string }>): SchemaFAQPage {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate LodgingBusiness schema for property listings
 */
export function generateLodgingBusinessSchema(property: Property, canonicalUrl?: string): SchemaLodgingBusiness {
  const priceRange = `$${property.pricing.baseNightlyRate}`

  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description: property.description.full,
    image: property.images,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.street_address,
      addressLocality: property.location.city,
      addressRegion: property.location.state,
      postalCode: property.postal_code,
      addressCountry: property.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.location.coordinates.lat,
      longitude: property.location.coordinates.lng,
    },
    url: canonicalUrl,
    priceRange,
    aggregateRating: property.rating.count > 0 ? {
      "@type": "AggregateRating",
      ratingValue: property.rating.average,
      reviewCount: property.rating.count,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    amenityFeature: property.amenities.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
      value: true,
    })),
  }
}

/**
 * Generate BreadcrumbList schema for navigation hierarchy
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; url?: string }>
): SchemaBreadcrumbList {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

/**
 * Helper to safely serialize JSON-LD for script tag
 */
export function serializeSchema<T extends Record<string, any>>(schema: T): string {
  return JSON.stringify(schema, null, 2)
}
