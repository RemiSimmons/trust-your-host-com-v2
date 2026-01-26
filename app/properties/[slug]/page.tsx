import { notFound } from "next/navigation"
import { getPropertyBySlug, getProperties, getPropertiesCount } from "@/lib/db/properties"
import { PropertyTopHeader } from "@/components/property/property-top-header"
import { PropertyGalleryRedesign } from "@/components/property/property-gallery-redesign"
import { PropertyDetailsGrid } from "@/components/property/property-details-grid"
import { VisitWebsiteSection } from "@/components/property/visit-website-section"
import { SimilarProperties } from "@/components/property/similar-properties"

interface PropertyPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)
  const allProperties = await getProperties()
  const totalProperties = await getPropertiesCount()

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Header */}
      <PropertyTopHeader property={property} totalProperties={totalProperties} />

      {/* Image Gallery */}
      <PropertyGalleryRedesign images={property.images} />

      {/* Property Details Grid */}
      <PropertyDetailsGrid property={property} />

      {/* Visit Website Section */}
      <div className="border-t border-gray-200">
        <VisitWebsiteSection property={property} />
      </div>

      {/* Similar Properties */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <SimilarProperties currentProperty={property} properties={allProperties} />
        </div>
      </div>
    </div>
  )
}
