"use client"
import { Check, Trophy, MapPin, Target } from "lucide-react"
import type { FilterState } from "@/lib/utils/search"
import { cn } from "@/lib/utils"
import { fifaCities } from "@/lib/data/fifa-cities"
import { EXPERIENCE_CATEGORIES, AMENITIES, PROPERTY_TYPES, PROPERTY_TYPE_VALUES } from "@/lib/data/property-constants"

interface FilterSidebarProps {
  filters: FilterState
  setFilters: (filters: FilterState) => void
  className?: string
  propertyCounts?: Record<string, number>
}

const SPECIAL_EVENTS = [
  { id: "fifa-2026", name: "FIFA World Cup 2026", icon: Trophy }
]

export function FilterSidebar({ filters, setFilters, className }: FilterSidebarProps) {
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: "experiences" | "propertyTypes" | "amenities" | "cities", item: string) => {
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
              event: null,
              cities: [],
              distanceFrom: "stadium",
              radiusMiles: 25,
            })
          }
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Reset all
        </button>
      </div>

      {/* Special Events */}
      <div className="mb-8 pb-8 border-b border-gray-100">
        <h4 className="font-semibold text-gray-900 mb-3">Special Events</h4>
        <select
          value={filters.event || ""}
          onChange={(e) => updateFilter("event", e.target.value || null)}
          className="w-full h-11 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm bg-white"
        >
          <option value="">No event filter</option>
          {SPECIAL_EVENTS.map(event => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
        </select>

        {/* FIFA Cities Multi-Select */}
        {filters.event === "fifa-2026" && (
          <div className="mt-4 space-y-2">
            <label className="text-xs text-gray-600 font-medium block">Host Cities</label>
            <div className="max-h-64 overflow-y-auto space-y-1 border border-gray-200 rounded-lg p-3">
              {fifaCities.map((city) => (
                <label key={city.id} className="flex items-center gap-3 cursor-pointer group min-h-[44px] py-1">
                  <div
                    className={cn(
                      "w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0",
                      filters.cities.includes(city.id)
                        ? "bg-accent border-accent text-white"
                        : "border-gray-300 group-hover:border-accent",
                    )}
                  >
                    {filters.cities.includes(city.id) && <Check className="h-3.5 w-3.5" />}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={filters.cities.includes(city.id)}
                    onChange={() => toggleArrayFilter("cities", city.id)}
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 flex items-center gap-1.5 flex-1">
                    <span>{city.emoji}</span>
                    <span>{city.displayName}</span>
                    <span className="ml-auto text-xs text-gray-500">{city.stadium.matchesHosted} matches</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Distance/Radius Filter - only show when cities selected */}
      {filters.cities.length > 0 && (
        <div className="mb-8 pb-8 border-b border-gray-100">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            Distance From
          </h4>
          
          <select
            value={filters.distanceFrom}
            onChange={(e) => updateFilter("distanceFrom", e.target.value as "stadium" | "city-center")}
            className="w-full h-11 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm bg-white mb-3"
          >
            <option value="stadium">Stadium</option>
            <option value="city-center">City Center</option>
          </select>

          <label className="text-xs text-gray-600 font-medium block mb-2">
            Within {filters.radiusMiles} miles
          </label>
          <input
            type="range"
            min="1"
            max="25"
            value={filters.radiusMiles}
            onChange={(e) => updateFilter("radiusMiles", Number(e.target.value))}
            className="w-full accent-accent"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1 mi</span>
            <span>25 mi</span>
          </div>
        </div>
      )}

      {/* Experience Categories */}
      <div className="mb-8">
        <h4 className="font-semibold text-gray-900 mb-3">Experiences</h4>
        <div className="space-y-1">
          {EXPERIENCE_CATEGORIES.map((category, index) => (
            <label key={`${category}-${index}`} className="flex items-center gap-3 cursor-pointer group min-h-[44px] py-1">
              <div
                className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0",
                  filters.experiences.includes(category)
                    ? "bg-accent border-accent text-white"
                    : "border-gray-300 group-hover:border-accent",
                )}
              >
                {filters.experiences.includes(category) && <Check className="h-3.5 w-3.5" />}
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
        <div className="space-y-1">
          {PROPERTY_TYPE_VALUES.map((type) => (
            <label key={type} className="flex items-center gap-3 cursor-pointer group min-h-[44px] py-1">
              <div
                className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0",
                  filters.propertyTypes.includes(type)
                    ? "bg-accent border-accent text-white"
                    : "border-gray-300 group-hover:border-accent",
                )}
              >
                {filters.propertyTypes.includes(type) && <Check className="h-3.5 w-3.5" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={filters.propertyTypes.includes(type)}
                onChange={() => toggleArrayFilter("propertyTypes", type)}
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">{PROPERTY_TYPES[type]}</span>
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
                "px-4 py-2.5 border rounded-lg text-sm transition-colors min-h-[44px] min-w-[44px]",
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
        <div className="space-y-1">
          {AMENITIES.map((amenity) => (
            <label key={amenity} className="flex items-center gap-3 cursor-pointer group min-h-[44px] py-1">
              <div
                className={cn(
                  "w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0",
                  filters.amenities.includes(amenity)
                    ? "bg-accent border-accent text-white"
                    : "border-gray-300 group-hover:border-accent",
                )}
              >
                {filters.amenities.includes(amenity) && <Check className="h-3.5 w-3.5" />}
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
      <div className="space-y-1 pt-4 border-t border-gray-100">
        <label className="flex items-center gap-3 cursor-pointer group min-h-[44px] py-1">
          <div
            className={cn(
              "w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0",
              filters.verifiedOnly ? "bg-accent border-accent text-white" : "border-gray-300 group-hover:border-accent",
            )}
          >
            {filters.verifiedOnly && <Check className="h-3.5 w-3.5" />}
          </div>
          <input
            type="checkbox"
            className="hidden"
            checked={filters.verifiedOnly}
            onChange={(e) => updateFilter("verifiedOnly", e.target.checked)}
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900">Verified Properties Only</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group min-h-[44px] py-1">
          <div
            className={cn(
              "w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0",
              filters.petFriendly ? "bg-accent border-accent text-white" : "border-gray-300 group-hover:border-accent",
            )}
          >
            {filters.petFriendly && <Check className="h-3.5 w-3.5" />}
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
