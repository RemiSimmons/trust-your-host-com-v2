# JSON-LD Schema Fix - Noindex Pages

## Problem Identified

Mock property pages had `noindex` meta tags correctly applied, but **JSON-LD schema markup was still being rendered** from the root layout, causing:
- Organization schema appearing on every page (including noindex pages)
- WebSite schema appearing on every page (including noindex pages)
- Search engines could still parse structured data even though pages were marked noindex

## Root Cause

In `app/layout.tsx`, the following code was adding schema to ALL pages:

```tsx
{/* Site-wide Organization + WebSite schema for answer engines */}
<SchemaMarkup schema={[generateOrganizationSchema(), generateWebSiteSchema()]} />
```

This meant even mock property pages with `noindex` tags had JSON-LD schema markup.

## Solution Implemented

### 1. Removed Schema from Root Layout
**File: `app/layout.tsx`**
- Removed the site-wide `SchemaMarkup` component
- Added comment explaining schema is now added per-page basis

### 2. Added Schema to Homepage
**File: `app/page.tsx`**
- Added Organization, WebSite, and FAQ schemas to homepage
- Consolidated all schema generation in one place

```tsx
<SchemaMarkup schema={[
  generateOrganizationSchema(), 
  generateWebSiteSchema(), 
  faqSchema
]} />
```

### 3. Enhanced Property Page Schema Logic
**File: `app/properties/[slug]/page.tsx`**
- Imported Organization and WebSite schema generators
- Added all schemas inside the conditional block that checks `!isMockProperty(property)`
- Mock properties now have: ✅ noindex tag + ❌ NO schema markup
- Real properties now have: ❌ no noindex tag + ✅ ALL schema markup

```tsx
{!isMockProperty(property) && (
  <SchemaMarkup 
    schema={[
      generateOrganizationSchema(),
      generateWebSiteSchema(),
      generateLodgingBusinessSchema(property, canonicalUrl), 
      breadcrumbSchema
    ]} 
  />
)}
```

## Results

### Mock Property Pages (e.g., Serenity Ridge Cabin)
- ✅ `<meta name="robots" content="noindex, nofollow">`
- ✅ NO JSON-LD schema markup in HTML
- ✅ Sample listing banner displayed
- ✅ Not included in sitemap.xml

### Real Property Pages
- ✅ NO noindex tag (indexable)
- ✅ Organization schema
- ✅ WebSite schema  
- ✅ LodgingBusiness schema
- ✅ Breadcrumb schema
- ✅ Included in sitemap.xml

### Search Page
- ✅ Organization schema
- ✅ WebSite schema

### Homepage
- ✅ Organization schema
- ✅ WebSite schema
- ✅ FAQPage schema

## Testing Checklist

- [ ] Visit mock property page → View source → Verify NO `<script type="application/ld+json">` with Organization/WebSite/LodgingBusiness
- [ ] Visit mock property page → View source → Verify `<meta name="robots" content="noindex, nofollow">`
- [ ] Visit real property page → View source → Verify ALL schemas present (Organization, WebSite, LodgingBusiness, Breadcrumb)
- [ ] Visit real property page → View source → Verify NO noindex tag
- [ ] Visit homepage → View source → Verify Organization, WebSite, and FAQ schemas
- [ ] Check `/sitemap.xml` → Verify mock properties excluded

## Files Modified

1. `app/layout.tsx` - Removed site-wide schema
2. `app/page.tsx` - Added site-wide schemas to homepage
3. `app/properties/[slug]/page.tsx` - Added conditional schema rendering with site-wide schemas
4. `app/search/page.tsx` - Added site-wide schemas to search page

## Next Steps

If you want site-wide schemas on other important pages (like `/search`, `/how-it-works`, etc.), add them individually:

```tsx
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"

// In the page component:
<SchemaMarkup schema={[generateOrganizationSchema(), generateWebSiteSchema()]} />
```

## Impact

This fix ensures:
- Mock properties are properly hidden from search engines (no schema + noindex)
- Real properties get full SEO benefits (all schemas + indexable)
- No wasted crawl budget on mock data
- Cleaner, more targeted structured data implementation
