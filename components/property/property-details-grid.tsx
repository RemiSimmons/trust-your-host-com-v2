import type { Property } from "@/lib/types"

interface PropertyDetailsGridProps {
  property: Property
}

export function PropertyDetailsGrid({ property }: PropertyDetailsGridProps) {
  // Format property type for display
  const formatPropertyType = (type: string) => {
    return type
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Get year built (mock data - in real app this would come from property data)
  const yearBuilt = 1977

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Column 1: General */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">General</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">TOTAL BEDROOMS:</span>
              <span className="text-gray-900 font-medium">{property.capacity.bedrooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">TOTAL BATHROOMS:</span>
              <span className="text-gray-900 font-medium">{property.capacity.bathrooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">FULL BATHROOMS:</span>
              <span className="text-gray-900 font-medium">{property.capacity.bathrooms}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">LAUNDRY ROOM:</span>
              <span className="text-gray-900 font-medium">
                {property.amenities.some((a) => a.toLowerCase().includes("washer")) ? "Room" : "None"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">FLOORING:</span>
              <span className="text-gray-900 font-medium">Hardwood</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">FIREPLACE:</span>
              <span className="text-gray-900 font-medium">
                {property.amenities.some((a) => a.toLowerCase().includes("fireplace")) ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">APPLIANCES:</span>
              <span className="text-gray-900 font-medium text-right max-w-[60%]">
                {property.amenities
                  .filter((a) =>
                    ["Refrigerator", "Dishwasher", "Washer", "Dryer", "Ceiling Fan"].some((app) =>
                      a.toLowerCase().includes(app.toLowerCase()),
                    ),
                  )
                  .join(", ") || "Standard"}
              </span>
            </div>
          </div>
        </div>

        {/* Column 2: Listing Details */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Listing Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">STATUS:</span>
              <span className="text-gray-900 font-medium">For Sale</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">LOT AREA:</span>
              <span className="text-gray-900 font-medium">8,700</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">MLS #:</span>
              <span className="text-gray-900 font-medium">20,000M</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">TYPE:</span>
              <span className="text-gray-900 font-medium">Residential</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">YEAR BUILT:</span>
              <span className="text-gray-900 font-medium">{yearBuilt}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">NEIGHBORHOODS:</span>
              <span className="text-gray-900 font-medium">{property.location.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">WATER FRONTAGE:</span>
              <span className="text-gray-900 font-medium">None</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">VIEW DESCRIPTION:</span>
              <span className="text-gray-900 font-medium text-right max-w-[60%]">City, Trees/Woods</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Features */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">Additional Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">STORIES:</span>
              <span className="text-gray-900 font-medium">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">POOL:</span>
              <span className="text-gray-900 font-medium">
                {property.amenities.some((a) => a.toLowerCase().includes("pool")) ? "In Ground" : "None"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">LOT FEATURES:</span>
              <span className="text-gray-900 font-medium">Lawn, Yard</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">PARKING:</span>
              <span className="text-gray-900 font-medium">
                {property.amenities.some((a) => a.toLowerCase().includes("parking")) ? "Carport, Attached" : "None"}
              </span>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">HEAT TYPE:</span>
              <span className="text-gray-900 font-medium">Central</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">AIR CONDITIONING:</span>
              <span className="text-gray-900 font-medium">
                {property.amenities.some((a) => a.toLowerCase().includes("air") || a.toLowerCase().includes("ac"))
                  ? "Central"
                  : "None"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">SECURITY FEATURES:</span>
              <span className="text-gray-900 font-medium text-right max-w-[60%]">
                Automatic Gate, Pre-wired for alarm system
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">ZONING:</span>
              <span className="text-gray-900 font-medium">RMP</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


