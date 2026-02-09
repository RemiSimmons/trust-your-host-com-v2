# SEO Implementation Guide for TrustYourHost

This guide provides comprehensive documentation for the SEO, schema markup, internal linking, and analytics systems implemented for TrustYourHost.

## Table of Contents
1. [Overview](#overview)
2. [Schema Markup](#schema-markup)
3. [Metadata & Open Graph](#metadata--open-graph)
4. [Internal Linking & Related Content](#internal-linking--related-content)
5. [Breadcrumbs](#breadcrumbs)
6. [Sitemap & Robots](#sitemap--robots)
7. [Analytics](#analytics)
8. [Image Optimization](#image-optimization)
9. [Implementation Checklist](#implementation-checklist)
10. [Google Search Console Setup](#google-search-console-setup)

---

## Overview

The TrustYourHost platform now includes a comprehensive SEO system designed to:
- Maximize search visibility for properties, articles, and FIFA 2026 content
- Generate rich results through structured data (schema.org)
- Improve internal linking and content discoverability
- Track user behavior and conversions
- Prepare for Google Search Console submission

### Key Features Implemented
✅ JSON-LD schema markup for all content types  
✅ Dynamic metadata with Open Graph and Twitter Cards  
✅ Related content system for contextual internal linking  
✅ Breadcrumb navigation with schema support  
✅ Dynamic XML sitemap generation  
✅ Robots.txt configuration  
✅ Analytics event tracking foundation  
✅ SEO-optimized URL structure

---

## Schema Markup

### Location
`lib/seo/schema.ts`

### Available Schema Types

#### 1. Organization Schema (Site-wide)
```typescript
import { generateOrganizationSchema } from "@/lib/seo/schema"

const schema = generateOrganizationSchema()
```

Use on: Homepage and all major pages

#### 2. WebSite Schema with Search
```typescript
import { generateWebSiteSchema } from "@/lib/seo/schema"

const schema = generateWebSiteSchema()
```

Use on: Homepage

#### 3. Article Schema
```typescript
import { generateArticleSchema } from "@/lib/seo/schema"

const schema = generateArticleSchema(article, canonicalUrl)
```

Use on: All article pages (insights, guides, journal, resources)

#### 4. LodgingBusiness Schema
```typescript
import { generateLodgingBusinessSchema } from "@/lib/seo/schema"

const schema = generateLodgingBusinessSchema(property, canonicalUrl)
```

Use on: Property detail pages

#### 5. FAQPage Schema
```typescript
import { generateFAQPageSchema } from "@/lib/seo/schema"

const schema = generateFAQPageSchema([
  { question: "...", answer: "..." }
])
```

Use on: Help pages, FAQ sections

#### 6. BreadcrumbList Schema
```typescript
import { generateBreadcrumbSchema } from "@/lib/seo/schema"

const schema = generateBreadcrumbSchema([
  { name: "Home", url: "https://trustyourhost.com" },
  { name: "Properties", url: "https://trustyourhost.com/search" },
  { name: "Property Name" }
])
```

Use on: All pages with breadcrumbs

### How to Add Schema to a Page

```tsx
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { generateArticleSchema } from "@/lib/seo/schema"

export default function ArticlePage({ article }) {
  const schema = generateArticleSchema(article, canonicalUrl)
  
  return (
    <>
      <SchemaMarkup schema={schema} />
      {/* Your page content */}
    </>
  )
}
```

### Multiple Schemas on One Page

```tsx
<SchemaMarkup schema={[organizationSchema, websiteSchema, breadcrumbSchema]} />
```

---

## Metadata & Open Graph

### Location
`lib/seo/metadata.ts`

### Available Metadata Generators

#### 1. General Purpose
```typescript
import { generateMetadata } from "@/lib/seo/metadata"

export const metadata = generateMetadata({
  title: "Page Title",
  description: "Page description",
  image: "/og-image.png",
  url: "/page-path",
  type: "website" // or "article"
})
```

#### 2. Property Pages
```typescript
import { generatePropertyMetadata } from "@/lib/seo/metadata"

export async function generateMetadata({ params }) {
  const property = await getPropertyBySlug(params.slug)
  return generatePropertyMetadata(property)
}
```

#### 3. Article Pages
```typescript
import { generateArticleMetadata } from "@/lib/seo/metadata"

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)
  return generateArticleMetadata(article)
}
```

#### 4. FIFA City Pages
```typescript
import { generateFifaCityMetadata } from "@/lib/seo/metadata"

export const metadata = generateFifaCityMetadata("Miami", "Description...")
```

#### 5. Search/Listing Pages
```typescript
import { generateSearchMetadata } from "@/lib/seo/metadata"

export const metadata = generateSearchMetadata(searchQuery, location, count)
```

#### 6. Category Hub Pages
```typescript
import { generateCategoryMetadata } from "@/lib/seo/metadata"

export const metadata = generateCategoryMetadata("insights", description, count)
```

### What's Included in Generated Metadata
- SEO title with site name
- Meta description
- Canonical URL
- Open Graph tags (title, description, image, URL, type)
- Twitter Card tags
- Article-specific metadata (published time, modified time, authors, tags)

---

## Internal Linking & Related Content

### Location
`lib/seo/related-content.ts`  
`components/seo/related-content.tsx`

### Finding Related Articles

#### 1. For Article Pages
```typescript
import { findRelatedArticles, getAllArticles } from "@/lib/seo/related-content"

const allArticles = getAllArticles()
const related = findRelatedArticles(currentArticle, allArticles, 3)
```

Algorithm considers:
- Same category (high weight)
- Shared tags (medium weight)
- Featured status
- Recency
- FIFA content match
- City/region match

#### 2. For Property Pages
```typescript
import { findArticlesForProperty } from "@/lib/seo/related-content"

const articles = findArticlesForProperty(property, 3)
```

#### 3. For FIFA City Pages
```typescript
import { findArticlesForFifaCity } from "@/lib/seo/related-content"

const articles = findArticlesForFifaCity("Miami", 4)
```

#### 4. By Category
```typescript
import { findArticlesByCategory } from "@/lib/seo/related-content"

const insights = findArticlesByCategory("insights", true, 6) // featured only
```

#### 5. By Tag
```typescript
import { findArticlesByTag } from "@/lib/seo/related-content"

const fifaArticles = findArticlesByTag("FIFA 2026", 5)
```

### Displaying Related Content

#### Full Card Layout
```tsx
import { RelatedContent } from "@/components/seo/related-content"

<RelatedContent
  articles={relatedArticles}
  title="Related Articles"
  description="Learn more about this topic"
/>
```

#### Compact Sidebar Layout
```tsx
import { RelatedContentCompact } from "@/components/seo/related-content"

<RelatedContentCompact
  articles={relatedArticles}
  title="You May Also Like"
/>
```

---

## Breadcrumbs

### Location
`components/seo/breadcrumbs.tsx`

### Using Breadcrumbs

#### Basic Usage
```tsx
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

<Breadcrumbs
  items={[
    { label: "Search", href: "/search" },
    { label: "Los Angeles", href: "/search?location=Los Angeles" },
    { label: "Property Name" }
  ]}
/>
```

#### With Helper Functions

**Property Pages:**
```tsx
import { generatePropertyBreadcrumbs } from "@/components/seo/breadcrumbs"

const items = generatePropertyBreadcrumbs(property.name, city, state)
```

**Article Pages:**
```tsx
import { generateArticleBreadcrumbs } from "@/components/seo/breadcrumbs"

const items = generateArticleBreadcrumbs("insights", article.title)
```

**FIFA Pages:**
```tsx
import { generateFifaBreadcrumbs } from "@/components/seo/breadcrumbs"

const items = generateFifaBreadcrumbs("Miami")
```

**Help Pages:**
```tsx
import { generateHelpBreadcrumbs } from "@/components/seo/breadcrumbs"

const items = generateHelpBreadcrumbs("for-hosts", "Getting Started")
```

**Auto-generate from Path:**
```tsx
import { generateBreadcrumbsFromPath } from "@/components/seo/breadcrumbs"

const items = generateBreadcrumbsFromPath(pathname)
```

### Always Include Schema
```tsx
import { generateBreadcrumbSchema } from "@/lib/seo/schema"

const breadcrumbSchema = generateBreadcrumbSchema(items.map(item => ({
  name: item.label,
  url: item.href ? `https://trustyourhost.com${item.href}` : undefined
})))

<SchemaMarkup schema={breadcrumbSchema} />
```

---

## Sitemap & Robots

### Sitemap (`app/sitemap.ts`)

The dynamic sitemap automatically includes:
- Static pages (homepage, for-hosts, help center, etc.)
- All 11 FIFA 2026 host city pages
- All property listings
- All articles (insights, guides, journal, resources)

**Priority levels:**
- Homepage: 1.0
- FIFA pages: 0.95
- Search: 0.9
- For Hosts: 0.9
- Properties: 0.8
- Featured articles: 0.75
- Regular articles: 0.65

**Change frequency:**
- Daily: Homepage, search, FIFA pages, article hubs
- Weekly: Properties, help pages
- Monthly: Articles, legal pages

The sitemap is automatically available at:
`https://trustyourhost.com/sitemap.xml`

### Robots.txt (`app/robots.ts`)

**Allowed:**
- All public pages
- Property listings
- FIFA 2026 content
- Articles and guides
- Help center

**Disallowed:**
- Admin dashboard (`/admin/`)
- User dashboard (`/dashboard/`)
- Host portal (`/host/`)
- Inbox (`/inbox/`)
- API routes (`/api/`)
- Authentication pages
- URLs with query parameters (to avoid duplicate content)

The robots.txt is automatically available at:
`https://trustyourhost.com/robots.txt`

---

## Analytics

### Location
`lib/analytics/events.ts`  
`components/analytics/analytics-provider.tsx`

### Tracking Events

#### Property Events
```tsx
import { trackPropertyView, trackWebsiteClick } from "@/lib/analytics/events"

// Track property view
trackPropertyView(property.id, property.name)

// Track external website click
trackWebsiteClick(property.id, property.name, property.external_booking_url)
```

#### Search Events
```tsx
import { trackSearch } from "@/lib/analytics/events"

trackSearch(query, location, filters)
```

#### Article Events
```tsx
import { trackArticleView } from "@/lib/analytics/events"

trackArticleView(article.id, article.title, article.category)
```

#### FIFA Events
```tsx
import { trackFifaCityView } from "@/lib/analytics/events"

trackFifaCityView(cityName)
```

#### Internal Linking Events
```tsx
import { trackRelatedContentClick, trackBreadcrumbClick } from "@/lib/analytics/events"

trackRelatedContentClick("property", propertyId, "article", articleId)
trackBreadcrumbClick(label, href)
```

#### User Events
```tsx
import { trackSignup, trackFormSubmit } from "@/lib/analytics/events"

trackSignup("host", "start")
trackSignup("host", "complete")
trackFormSubmit("contact")
```

### Setting Up Analytics

#### 1. Add Environment Variables
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=trustyourhost.com
```

#### 2. Add to Root Layout
```tsx
import { AnalyticsProvider, GoogleAnalyticsScript } from "@/components/analytics/analytics-provider"

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <GoogleAnalyticsScript />
        {/* or <PlausibleScript /> */}
      </head>
      <body>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
```

### Supported Platforms
- Google Analytics 4 (gtag.js)
- Plausible Analytics
- Custom analytics endpoint (add your own)

---

## Image Optimization

### Best Practices

#### 1. Always Use Next.js Image Component
```tsx
import Image from "next/image"

<Image
  src="/property.jpg"
  alt="Descriptive alt text for SEO"
  width={1200}
  height={630}
  priority={isAboveFold}
/>
```

#### 2. Alt Text Guidelines
- **Be specific:** "Modern beachfront villa with infinity pool in Miami" not "House"
- **Include location:** Helps with local SEO
- **Describe key features:** Pool, views, unique architecture
- **Don't keyword stuff:** Write naturally for humans
- **Leave blank for decorative images:** Use `alt=""`

#### 3. Image Naming
- Use descriptive filenames: `miami-beachfront-villa.jpg`
- Include keywords: `fifa-2026-los-angeles-accommodation.jpg`
- Use hyphens, not underscaces: `blue-ridge-cabin.jpg`

#### 4. Image Sizes
- **Hero images:** 1920x1080 or 2560x1440
- **Open Graph images:** 1200x630 (required)
- **Property thumbnails:** 800x600
- **Article featured images:** 1200x600
- **Profile photos:** 400x400

#### 5. Format & Compression
- Use WebP for better compression
- Next.js Image automatically optimizes
- Keep file sizes under 200KB when possible
- Use appropriate quality settings (75-85)

#### 6. Lazy Loading
```tsx
// Above the fold - load immediately
<Image src="..." priority />

// Below the fold - lazy load (default)
<Image src="..." loading="lazy" />
```

---

## Implementation Checklist

### Core SEO Components
- [x] Schema markup utilities created
- [x] Metadata generation system built
- [x] Related content system implemented
- [x] Breadcrumbs component created
- [x] Dynamic sitemap generation
- [x] Robots.txt configuration
- [x] Analytics foundation set up

### Pages Updated with Full SEO
- [x] Homepage - Organization & Website schema
- [x] Property detail pages - LodgingBusiness schema, breadcrumbs, related articles
- [x] Article pages (insights) - Article schema, breadcrumbs, related content
- [x] FIFA city pages - Breadcrumbs, related articles

### Pages Needing SEO Updates
- [ ] Search results page - Metadata, breadcrumbs
- [ ] Category hub pages (guides, journal, resources) - Schema, breadcrumbs
- [ ] For Hosts page - Enhanced metadata
- [ ] Help center pages - FAQ schema
- [ ] Experiences page - Metadata
- [ ] About/Legal pages - Basic metadata

### Content Optimization
- [ ] Review all article excerpts for SEO
- [ ] Add alt text to all images
- [ ] Optimize page titles for target keywords
- [ ] Create content calendar for regular updates
- [ ] Add more internal links in article content

### Technical SEO
- [ ] Test sitemap.xml in browser
- [ ] Test robots.txt in browser
- [ ] Verify canonical URLs on all pages
- [ ] Check for duplicate content issues
- [ ] Implement 404 pages with helpful links
- [ ] Add redirects for any changed URLs

---

## Google Search Console Setup

### 1. Verify Site Ownership

**Option A: HTML File Upload**
1. Download verification file from Google Search Console
2. Add to `public/` folder
3. Deploy site
4. Click "Verify" in Search Console

**Option B: DNS TXT Record**
1. Get TXT record from Search Console
2. Add to domain DNS settings
3. Wait for propagation (up to 48 hours)
4. Click "Verify" in Search Console

**Option C: Google Analytics (if already set up)**
1. Use existing GA4 property for verification

### 2. Submit Sitemap
1. Go to Search Console → Sitemaps
2. Submit: `https://trustyourhost.com/sitemap.xml`
3. Wait for processing (can take a few days)

### 3. Request Indexing for Key Pages
1. Use URL Inspection tool
2. Request indexing for:
   - Homepage
   - Top 10 properties
   - Featured articles
   - All FIFA 2026 city pages
   - For Hosts page

### 4. Monitor Performance
Track these metrics weekly:
- **Impressions:** How often site appears in search
- **Clicks:** How many people click through
- **CTR:** Click-through rate (aim for 3-5%)
- **Average position:** Target top 10 (position 1-10)

### 5. Check for Issues
- **Coverage errors:** Fix any indexing problems
- **Mobile usability:** Ensure mobile-friendly
- **Page experience:** Check Core Web Vitals
- **Security issues:** Monitor for hacking/malware

### 6. Set Up Google Analytics 4
1. Create GA4 property
2. Add measurement ID to `.env.local`
3. Deploy analytics code
4. Link to Search Console for unified reporting

---

## Environment Variables Needed

Add these to `.env.local`:

```env
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=trustyourhost.com

# Site Configuration (for canonical URLs)
NEXT_PUBLIC_SITE_URL=https://trustyourhost.com
```

---

## Quick Reference: Adding SEO to a New Page

1. **Add Metadata:**
```tsx
import { generateMetadata } from "@/lib/seo/metadata"

export const metadata = generateMetadata({
  title: "Page Title",
  description: "Description",
  url: "/page-path"
})
```

2. **Add Schema:**
```tsx
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { generateOrganizationSchema } from "@/lib/seo/schema"

const schema = generateOrganizationSchema()

<SchemaMarkup schema={schema} />
```

3. **Add Breadcrumbs:**
```tsx
import { Breadcrumbs } from "@/components/seo/breadcrumbs"

<Breadcrumbs items={[...]} />
```

4. **Add Related Content:**
```tsx
import { RelatedContent } from "@/components/seo/related-content"

<RelatedContent articles={relatedArticles} />
```

5. **Track Analytics:**
```tsx
import { trackEvent } from "@/lib/analytics/events"

trackEvent("page_specific_event", { property: "value" })
```

---

## Support & Questions

For questions or issues with SEO implementation:
1. Review this guide
2. Check Next.js SEO documentation
3. Verify schema using Google's Rich Results Test
4. Test Open Graph tags using Facebook's Sharing Debugger

---

**Document Version:** 1.0  
**Last Updated:** January 28, 2026  
**Maintained By:** Development Team
