"use client"

import { Check } from "lucide-react"

interface AmenitiesListProps {
  amenities: string[]
}

// Group amenities by category
const categorizeAmenities = (amenities: string[]) => {
  const categories: Record<string, string[]> = {
    "Essential": [],
    "Comfort": [],
    "Outdoor": [],
    "Entertainment": [],
    "Other": []
  }

  amenities.forEach(amenity => {
    const lower = amenity.toLowerCase()
    if (["wifi", "kitchen", "parking", "washer/dryer", "air conditioning", "heating"].some(e => lower.includes(e))) {
      categories["Essential"].push(amenity)
    } else if (["hot tub", "pool", "fireplace", "sauna"].some(e => lower.includes(e))) {
      categories["Comfort"].push(amenity)
    } else if (["patio", "balcony", "garden", "bbq", "grill", "outdoor"].some(e => lower.includes(e))) {
      categories["Outdoor"].push(amenity)
    } else if (["tv", "games", "books", "music", "entertainment"].some(e => lower.includes(e))) {
      categories["Entertainment"].push(amenity)
    } else {
      categories["Other"].push(amenity)
    }
  })

  // Remove empty categories
  return Object.entries(categories).filter(([_, items]) => items.length > 0)
}

export function AmenitiesList({ amenities }: AmenitiesListProps) {
  const categorizedAmenities = amenities.length > 10 
    ? categorizeAmenities(amenities)
    : [["All Amenities", amenities]]

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities</h2>
      
      <div className="space-y-6">
        {categorizedAmenities.map(([category, items]) => (
          <div key={category}>
            {amenities.length > 10 && (
              <h3 className="text-lg font-semibold text-gray-800 mb-3">{category}</h3>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
