import type { Property } from "@/lib/types"
import { PropertyCard } from "@/components/home/featured-properties"

interface SimilarPropertiesProps {
  currentProperty: Property
  properties: Property[]
}

export function SimilarProperties({ currentProperty, properties }: SimilarPropertiesProps) {
  // Simple logic to find similar properties: same region or property type, excluding current
  const similar = properties
    .filter(
      (p) =>
        p.id !== currentProperty.id &&
        (p.location.region === currentProperty.location.region || p.propertyType === currentProperty.propertyType),
    )
    .slice(0, 6)

  if (similar.length === 0) return null

  // Group by region or property type
  const grouped = similar.reduce((acc, property) => {
    const key = property.location.region || property.propertyType
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(property)
    return acc
  }, {} as Record<string, typeof similar>)

  return (
    <div className="space-y-12">
      {Object.entries(grouped).map(([sectionName, sectionProperties]) => (
        <div key={sectionName} className="space-y-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900 capitalize">
            {sectionName} Area
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Discover more properties in this beautiful area with stunning views and exceptional amenities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectionProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
