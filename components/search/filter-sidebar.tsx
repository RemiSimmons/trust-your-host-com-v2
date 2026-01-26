"use client"
import { Check } from "lucide-react"
import type { FilterState } from "@/lib/utils/search"
import { cn } from "@/lib/utils"

interface FilterSidebarProps {
  filters: FilterState
  setFilters: (filters: FilterState) => void
  className?: string
  propertyCounts?: Record<string, number>
}

const EXPERIENCE_CATEGORIES = [
  "Hiking & Trails",
  "Wellness Retreats",
  "Mountain Lodges",
  "Island Getaways",
  "Waterfront Escapes",
  "Glamping",
  "Desert Solitude",
  "Adventure Sports",
  "Culinary Experiences",
  "Eco-Tourism",
]

const PROPERTY_TYPES = ["cabin", "villa", "apartment", "lodge", "glamping", "treehouse", "historic", "unique-stay"]

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  "cabin": "Cabin",
  "villa": "Villa",
  "apartment": "Apartment/Condo",
  "lodge": "Lodge",
  "glamping": "Glamping",
  "treehouse": "Treehouse",
  "historic": "Historic",
  "unique-stay": "Unique Stay",
}

const AMENITIES = [
  "Hot Tub",
  "Pool",
  "Wifi",
  "Kitchen",
  "Fireplace",
  "Mountain Views",
  "Pet Friendly",
  "Washer/Dryer",
  "Air Conditioning",
  "Beach Access",
]

export function FilterSidebar({ filters, setFilters, className }: FilterSidebarProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: "experiences" | "propertyTypes" | "amenities", item: string) => {
    const current = filters[key]
    const updated = current.includes(item) ? current.filter((i) => i !== item) : [...current, item]
    updateFilter(key, updated)
  }

  return (
    <div className={cn("bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full overflow-y-auto", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl font-bold text-primary">Filters</h3>
        <button
          onClick={() =>
            setFilters({
              experiences: [],
              priceRange: [0, 2000],
              propertyTypes: [],
              bedrooms: 0,
              amenities: [],
              instantBook: false,
              verifiedOnly: false,
              petFriendly: false,
            })
          }
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Reset all
        </button>
      </div>

      {/* Experience Categories */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-3">Experiences</h4>
        <div className="space-y-2">
          {EXPERIENCE_CATEGORIES.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer group">
              <div
                className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  filters.experiences.includes(category)
                    ? "bg-accent border-accent text-white"
                    : "border-gray-300 group-hover:border-accent",
                )}
              >
                {filters.experiences.includes(category) && <Check className="h-3 w-3" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={filters.experiences.includes(category)}
                onChange={() => toggleArrayFilter("experiences", category)}
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Min Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => updateFilter("priceRange", [Number(e.target.value), filters.priceRange[1]])}
                  className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-600 mb-1 block">Max Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilter("priceRange", [filters.priceRange[0], Number(e.target.value)])}
                  className="w-full pl-6 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-3">Property Type</h4>
        <div className="space-y-2">
          {PROPERTY_TYPES.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer group">
              <div
                className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  filters.propertyTypes.includes(type)
                    ? "bg-accent border-accent text-white"
                    : "border-gray-300 group-hover:border-accent",
                )}
              >
                {filters.propertyTypes.includes(type) && <Check className="h-3 w-3" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={filters.propertyTypes.includes(type)}
                onChange={() => toggleArrayFilter("propertyTypes", type)}
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{PROPERTY_TYPE_LABELS[type] || type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-3">Bedrooms</h4>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => updateFilter("bedrooms", num)}
              className={cn(
                "px-3 py-1.5 border rounded-lg text-sm transition-colors",
                filters.bedrooms === num
                  ? "bg-accent text-white border-accent"
                  : "border-gray-300 text-gray-700 hover:border-accent hover:bg-accent/5",
              )}
            >
              {num === 0 ? "Any" : `${num}+`}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
        <div className="space-y-2">
          {AMENITIES.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer group">
              <div
                className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  filters.amenities.includes(amenity)
                    ? "bg-accent border-accent text-white"
                    : "border-gray-300 group-hover:border-accent",
                )}
              >
                {filters.amenities.includes(amenity) && <Check className="h-3 w-3" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={filters.amenities.includes(amenity)}
                onChange={() => toggleArrayFilter("amenities", amenity)}
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Other Filters */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            className={cn(
              "w-4 h-4 rounded border flex items-center justify-center transition-colors",
              filters.verifiedOnly ? "bg-accent border-accent text-white" : "border-gray-300 group-hover:border-accent",
            )}
          >
            {filters.verifiedOnly && <Check className="h-3 w-3" />}
          </div>
          <input
            type="checkbox"
            className="hidden"
            checked={filters.verifiedOnly}
            onChange={(e) => updateFilter("verifiedOnly", e.target.checked)}
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">Verified Properties Only</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            className={cn(
              "w-4 h-4 rounded border flex items-center justify-center transition-colors",
              filters.petFriendly ? "bg-accent border-accent text-white" : "border-gray-300 group-hover:border-accent",
            )}
          >
            {filters.petFriendly && <Check className="h-3 w-3" />}
          </div>
          <input
            type="checkbox"
            className="hidden"
            checked={filters.petFriendly}
            onChange={(e) => updateFilter("petFriendly", e.target.checked)}
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">Pet Friendly</span>
        </label>
      </div>
    </div>
  )
}
