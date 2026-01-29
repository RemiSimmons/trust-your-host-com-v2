import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getPropertyBySlug, getProperties } from "@/lib/db/properties"
import { PropertyDetailClient } from "@/components/property/property-detail-client"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { generatePropertyMetadata } from "@/lib/seo/metadata"
import { generateLodgingBusinessSchema, generateBreadcrumbSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { generatePropertyBreadcrumbs } from "@/lib/seo/breadcrumb-helpers"
import { findArticlesForProperty } from "@/lib/seo/related-content"
import { RelatedContent } from "@/components/seo/related-content"

interface PropertyPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  const property = await getPropertyBySlug(params.slug)

  if (!property) {
    return {
      title: "Property Not Found",
    }
  }

  return generatePropertyMetadata(property)
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await getPropertyBySlug(params.slug)

  if (!property) {
    notFound()
  }

  // Fetch related properties
  const allProperties = await getProperties()
  const relatedProperties = allProperties
    .filter(p => {
      if (p.id === property.id) return false
      
      // Match same city or FIFA city
      const sameCity = p.location.city === property.location.city
      const sameFifaCity = p.is_fifa_2026 && property.is_fifa_2026
      
      if (!sameCity && !sameFifaCity) return false
      
      // Match similar price range (±30%)
      const priceMatch = 
        p.pricing.baseNightlyRate >= property.pricing.baseNightlyRate * 0.7 &&
        p.pricing.baseNightlyRate <= property.pricing.baseNightlyRate * 1.3
      
      return priceMatch
    })
    .sort((a, b) => {
      // Prioritize verified
      if (a.verified !== b.verified) return a.verified ? -1 : 1
      // Then by distance to stadium if FIFA
      if (a.distance_to_stadium && b.distance_to_stadium) {
        return a.distance_to_stadium - b.distance_to_stadium
      }
      return 0
    })
    .slice(0, 4)

  // Generate schema markup
  const canonicalUrl = `https://trustyourhost.com/properties/${property.slug}`
  const lodgingSchema = generateLodgingBusinessSchema(property, canonicalUrl)
  const breadcrumbItems = generatePropertyBreadcrumbs(
    property.name,
    property.location.city,
    property.location.state
  )
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems.map((item) => ({
    name: item.label,
    url: item.href ? `https://trustyourhost.com${item.href}` : undefined,
  })))

  // Get related articles
  const relatedArticles = findArticlesForProperty(property, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup schema={[lodgingSchema, breadcrumbSchema]} />
      <NavBar />
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        <PropertyDetailClient property={property} relatedProperties={relatedProperties} />

        {/* Related articles for internal linking */}
        {relatedArticles.length > 0 && (
          <div className="container mx-auto px-4 py-12">
            <RelatedContent
              articles={relatedArticles}
              title="Local Guides & Tips"
              description={`Discover more about ${property.location.city} and surrounding areas`}
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
