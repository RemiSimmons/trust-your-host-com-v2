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
      ...(article.author.avatar && { image: article.author.avatar }),
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
 * Event schema for FIFA World Cup 2026 and other events
 */
export interface SchemaEvent {
  "@context": "https://schema.org"
  "@type": "Event"
  name: string
  description?: string
  startDate: string
  endDate: string
  location: {
    "@type": "Place"
    name: string
    address?: {
      "@type": "PostalAddress"
      addressLocality: string
      addressRegion?: string
      addressCountry: string
    }
    geo?: {
      "@type": "GeoCoordinates"
      latitude: number
      longitude: number
    }
  }
  url?: string
  organizer?: {
    "@type": "Organization"
    name: string
    url: string
  }
}

/**
 * Place schema for city/location pages
 */
export interface SchemaPlace {
  "@context": "https://schema.org"
  "@type": "Place"
  name: string
  description?: string
  geo?: {
    "@type": "GeoCoordinates"
    latitude: number
    longitude: number
  }
  url?: string
  address?: {
    "@type": "PostalAddress"
    addressLocality: string
    addressRegion?: string
    addressCountry: string
  }
}

/** Approximate city center coordinates for FIFA host cities (lat, lng) */
const FIFA_CITY_COORDINATES: Record<string, [number, number]> = {
  "new-york-new-jersey": [40.7128, -74.006],
  "los-angeles": [34.0522, -118.2437],
  "miami-gardens": [25.9429, -80.2456],
  "dallas": [32.7767, -96.797],
  "san-francisco": [37.7749, -122.4194],
  "atlanta": [33.749, -84.388],
  "houston": [29.7604, -95.3698],
  "seattle": [47.6062, -122.3321],
  "philadelphia": [39.9526, -75.1652],
  "boston": [42.3601, -71.0589],
  "kansas-city": [39.0997, -94.5786],
}

/**
 * Generate Event schema for FIFA World Cup 2026
 * Tournament dates: June 11 - July 19, 2026
 */
export function generateFifaEventSchema(options: {
  cityName?: string
  stadiumName?: string
  stadiumAddress?: string
  accommodationUrl?: string
  geo?: { lat: number; lng: number }
}): SchemaEvent {
  const baseUrl = "https://trustyourhost.com"
  const location: SchemaEvent["location"] = {
    "@type": "Place",
    name: options.stadiumName || options.cityName || "FIFA World Cup 2026",
    address: options.stadiumAddress ? {
      "@type": "PostalAddress",
      addressLocality: options.cityName || "",
      addressCountry: "US",
    } : undefined,
    geo: options.geo ? {
      "@type": "GeoCoordinates",
      latitude: options.geo.lat,
      longitude: options.geo.lng,
    } : undefined,
  }

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "FIFA World Cup 2026",
    description: "The FIFA World Cup 2026. Find verified vacation rentals near host city stadiums. Book direct, no platform fees.",
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    location,
    url: options.accommodationUrl || `${baseUrl}/fifa-2026`,
    organizer: {
      "@type": "Organization",
      name: "FIFA",
      url: "https://www.fifa.com",
    },
  }
}

/**
 * Generate Place schema for FIFA city pages
 */
export function generatePlaceSchema(options: {
  name: string
  description?: string
  cityId?: string
  url?: string
  address?: { city: string; region?: string; country: string }
}): SchemaPlace {
  const coords = options.cityId ? FIFA_CITY_COORDINATES[options.cityId] : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: options.name,
    description: options.description,
    geo: coords
      ? {
          "@type": "GeoCoordinates",
          latitude: coords[0],
          longitude: coords[1],
        }
      : undefined,
    url: options.url,
    address: options.address
      ? {
          "@type": "PostalAddress",
          addressLocality: options.address.city,
          addressRegion: options.address.region,
          addressCountry: options.address.country || "US",
        }
      : undefined,
  }
}

/**
 * Helper to safely serialize JSON-LD for script tag
 */
export function serializeSchema<T extends Record<string, any>>(schema: T): string {
  return JSON.stringify(schema, null, 2)
}
