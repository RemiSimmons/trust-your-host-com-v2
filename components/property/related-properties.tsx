"use client"

import type { Property } from "@/lib/types"
import { PropertyCard } from "@/components/home/featured-properties"

interface RelatedPropertiesProps {
  properties: Property[]
}

export function RelatedProperties({ properties }: RelatedPropertiesProps) {
  if (properties.length === 0) return null

  return (
    <div>
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
        Similar Properties You Might Like
      </h2>
      <p className="text-gray-600 mb-8">
        Explore more options in the same area
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}
