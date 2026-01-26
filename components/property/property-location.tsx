import { PropertyLocationMap } from "@/components/property/property-location-map"
import type { Property } from "@/lib/types"

interface PropertyLocationProps {
  location: Property["location"]
  propertyName?: string
}

export function PropertyLocation({ location, propertyName = "Property Location" }: PropertyLocationProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-primary">Where you'll be</h2>

      <PropertyLocationMap location={location} propertyName={propertyName} />

      <div className="space-y-2">
        <h3 className="font-semibold text-gray-900">
          {location.city}, {location.state}, {location.country}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Located in the beautiful {location.region} region. This area is known for its stunning natural landscapes,
          local culture, and peaceful atmosphere. You'll be close to local attractions while enjoying plenty of privacy.
        </p>
      </div>
    </div>
  )
}
