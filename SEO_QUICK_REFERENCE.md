# SEO Quick Reference Cheat Sheet

Quick copy-paste snippets for common SEO tasks.

---

## 📄 Adding SEO to a New Page

### 1. Basic Page with Metadata
```tsx
import { generateMetadata } from "@/lib/seo/metadata"

export const metadata = generateMetadata({
  title: "Page Title",
  description: "Compelling description under 160 characters",
  url: "/page-path",
})

export default function Page() {
  return <div>Your content</div>
}
```

### 2. Page with Schema Markup
```tsx
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { generateOrganizationSchema } from "@/lib/seo/schema"

export default function Page() {
  const schema = generateOrganizationSchema()
  
  return (
    <>
      <SchemaMarkup schema={schema} />
      <div>Your content</div>
    </>
  )
}
```

### 3. Page with Breadcrumbs
```tsx
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { generateBreadcrumbSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"

export default function Page() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Category", href: "/category" },
    { label: "Current Page" }
  ]
  
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs.map(item => ({
    name: item.label,
    url: item.href ? `https://trustyourhost.com${item.href}` : undefined
  })))
  
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <Breadcrumbs items={breadcrumbs} />
      <div>Your content</div>
    </>
  )
}
```

### 4. Page with Related Content
```tsx
import { RelatedContent } from "@/components/seo/related-content"
import { findArticlesByTag } from "@/lib/seo/related-content"

export default function Page() {
  const relatedArticles = findArticlesByTag("your-tag", 3)
  
  return (
    <div>
      {/* Your main content */}
      
      {relatedArticles.length > 0 && (
        <RelatedContent
          articles={relatedArticles}
          title="Related Articles"
        />
      )}
    </div>
  )
}
```

---

## 🏠 Property Pages

```tsx
import { generatePropertyMetadata } from "@/lib/seo/metadata"
import { generateLodgingBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { Breadcrumbs, generatePropertyBreadcrumbs } from "@/components/seo/breadcrumbs"
import { findArticlesForProperty } from "@/lib/seo/related-content"

export async function generateMetadata({ params }) {
  const property = await getPropertyBySlug(params.slug)
  return generatePropertyMetadata(property)
}

export default async function PropertyPage({ params }) {
  const property = await getPropertyBySlug(params.slug)
  
  // Schema
  const lodgingSchema = generateLodgingBusinessSchema(
    property, 
    `https://trustyourhost.com/properties/${property.slug}`
  )
  
  // Breadcrumbs
  const breadcrumbItems = generatePropertyBreadcrumbs(
    property.name, 
    property.location.city, 
    property.location.state
  )
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems.map(item => ({
    name: item.label,
    url: item.href ? `https://trustyourhost.com${item.href}` : undefined
  })))
  
  // Related articles
  const relatedArticles = findArticlesForProperty(property, 3)
  
  return (
    <>
      <SchemaMarkup schema={[lodgingSchema, breadcrumbSchema]} />
      <Breadcrumbs items={breadcrumbItems} />
      {/* Property content */}
      <RelatedContent articles={relatedArticles} />
    </>
  )
}
```

---

## 📝 Article Pages

```tsx
import { generateArticleMetadata } from "@/lib/seo/metadata"
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { Breadcrumbs, generateArticleBreadcrumbs } from "@/components/seo/breadcrumbs"
import { findRelatedArticles, getAllArticles } from "@/lib/seo/related-content"

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)
  return generateArticleMetadata(article)
}

export default async function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug)
  const allArticles = getAllArticles()
  const relatedArticles = findRelatedArticles(article, allArticles, 3)
  
  // Schema
  const articleSchema = generateArticleSchema(
    article, 
    `https://trustyourhost.com/${article.category}/${article.slug}`
  )
  
  // Breadcrumbs
  const breadcrumbItems = generateArticleBreadcrumbs(article.category, article.title)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems.map(item => ({
    name: item.label,
    url: item.href ? `https://trustyourhost.com${item.href}` : undefined
  })))
  
  return (
    <>
      <SchemaMarkup schema={[articleSchema, breadcrumbSchema]} />
      <Breadcrumbs items={breadcrumbItems} />
      {/* Article content */}
      <RelatedContent articles={relatedArticles} />
    </>
  )
}
```

---

## 🏆 FIFA City Pages

```tsx
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { generateBreadcrumbSchema } from "@/lib/seo/schema"
import { Breadcrumbs, generateFifaBreadcrumbs } from "@/components/seo/breadcrumbs"
import { findArticlesForFifaCity } from "@/lib/seo/related-content"
import { RelatedContent } from "@/components/seo/related-content"

export default async function FifaCityPage({ params }) {
  const city = getCityById(params.city)
  
  // Related articles
  const relatedArticles = findArticlesForFifaCity(city.name, 3)
  
  // Breadcrumbs
  const breadcrumbItems = generateFifaBreadcrumbs(city.name)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems.map(item => ({
    name: item.label,
    url: item.href ? `https://trustyourhost.com${item.href}` : undefined
  })))
  
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />
      <Breadcrumbs items={breadcrumbItems} />
      {/* City content */}
      <RelatedContent 
        articles={relatedArticles}
        title={`${city.name} Travel Guides`}
      />
    </>
  )
}
```

---

## ❓ FAQ Pages

```tsx
import { generateFAQPageSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"

export default function FAQPage() {
  const faqs = [
    {
      question: "How do I book a property?",
      answer: "Click the 'Visit Website' button on any property to book directly with the host."
    },
    {
      question: "Are there any fees?",
      answer: "No guest fees! We connect you directly with hosts, so you pay only what they charge."
    }
  ]
  
  const faqSchema = generateFAQPageSchema(faqs)
  
  return (
    <>
      <SchemaMarkup schema={faqSchema} />
      <div>
        {faqs.map((faq, i) => (
          <div key={i}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </>
  )
}
```

---

## 🔍 Search/Listing Pages

```tsx
import { generateSearchMetadata } from "@/lib/seo/metadata"

export const metadata = generateSearchMetadata(
  "vacation rentals", // query
  "Los Angeles",      // location
  25                  // count
)

export default function SearchPage() {
  return <div>Search results</div>
}
```

---

## 📊 Analytics Tracking

### Track Property View
```tsx
"use client"
import { trackPropertyView } from "@/lib/analytics/events"

useEffect(() => {
  trackPropertyView(property.id, property.name)
}, [property])
```

### Track Website Click
```tsx
"use client"
import { trackWebsiteClick } from "@/lib/analytics/events"

<button onClick={() => {
  trackWebsiteClick(property.id, property.name, property.external_booking_url)
  window.open(property.external_booking_url, '_blank')
}}>
  Visit Website
</button>
```

### Track Search
```tsx
"use client"
import { trackSearch } from "@/lib/analytics/events"

function handleSearch(query, location, filters) {
  trackSearch(query, location, filters)
  // Perform search
}
```

### Track Article View
```tsx
"use client"
import { trackArticleView } from "@/lib/analytics/events"

useEffect(() => {
  trackArticleView(article.id, article.title, article.category)
}, [article])
```

---

## 🖼️ Image Optimization

### Standard Image
```tsx
import Image from "next/image"

<Image
  src="/property.jpg"
  alt="Modern 3-bedroom villa with ocean views in Miami Beach"
  width={800}
  height={600}
  className="rounded-lg"
/>
```

### Hero Image (Above Fold)
```tsx
<Image
  src="/hero.jpg"
  alt="Luxury beachfront accommodations for FIFA 2026"
  width={1920}
  height={1080}
  priority // Load immediately, no lazy loading
  className="w-full h-auto"
/>
```

### Thumbnail (Below Fold)
```tsx
<Image
  src="/thumbnail.jpg"
  alt="Cozy cabin in Blue Ridge Mountains"
  width={400}
  height={300}
  loading="lazy" // Default behavior
  className="object-cover"
/>
```

---

## 🏢 Root Layout Setup

```tsx
// app/layout.tsx
import { GoogleAnalyticsScript, AnalyticsProvider } from "@/components/analytics/analytics-provider"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalyticsScript />
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

---

## 🌐 Environment Variables

```env
# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=trustyourhost.com
NEXT_PUBLIC_SITE_URL=https://trustyourhost.com
```

---

## ✅ Testing Checklist

After adding SEO to a page:

- [ ] Visit page in browser - check title in tab
- [ ] View page source - verify meta tags present
- [ ] Test Rich Results: https://search.google.com/test/rich-results
- [ ] Test Open Graph: https://developers.facebook.com/tools/debug/
- [ ] Test on mobile - verify responsive design
- [ ] Check Network tab - verify no console errors
- [ ] Verify breadcrumbs appear and work
- [ ] Check related content displays correctly
- [ ] Test internal links navigate properly

---

## 🚨 Common Mistakes to Avoid

1. **Missing canonical URL** - Always include in metadata
2. **Empty alt text when it shouldn't be** - Write descriptive alt text
3. **Duplicate meta descriptions** - Make each page unique
4. **Missing breadcrumb schema** - Add whenever using Breadcrumbs component
5. **Wrong schema type** - Use LodgingBusiness for properties, not Article
6. **Incorrect URL in schema** - Use full URL with https://
7. **Not testing schema** - Always validate with Rich Results Test
8. **Forgetting to track events** - Add analytics where appropriate
9. **Image priority on below-fold images** - Only use priority for above-fold
10. **Missing title in metadata** - Every page needs a unique title

---

## 📞 Quick Support

- **Schema not validating?** Check Rich Results Test for specific errors
- **Metadata not showing?** Clear browser cache and view source
- **Breadcrumbs not working?** Verify items array has required properties
- **Analytics not tracking?** Check browser console for GA errors
- **Images not optimizing?** Ensure using Next.js Image component

---

**Last Updated:** January 28, 2026
