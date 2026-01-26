import { Users, Bed, Bath, Home } from "lucide-react"
import type { Property } from "@/lib/types"

interface PropertyKeyDetailsProps {
  property: Property
}

export function PropertyKeyDetails({ property }: PropertyKeyDetailsProps) {
  return (
    <div className="flex flex-wrap items-center gap-6 md:gap-8 py-6 border-y border-gray-200">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Users className="h-5 w-5 text-gray-700" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{property.capacity.guests} guests</p>
          <p className="text-xs text-gray-500">Capacity</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Bed className="h-5 w-5 text-gray-700" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{property.capacity.bedrooms} bedrooms</p>
          <p className="text-xs text-gray-500">{property.capacity.beds} beds</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Bath className="h-5 w-5 text-gray-700" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{property.capacity.bathrooms} baths</p>
          <p className="text-xs text-gray-500">Full bathrooms</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Home className="h-5 w-5 text-gray-700" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900 capitalize">{property.propertyType}</p>
          <p className="text-xs text-gray-500">Property type</p>
        </div>
      </div>
    </div>
  )
}
