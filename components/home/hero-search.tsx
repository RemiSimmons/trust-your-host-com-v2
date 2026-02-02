"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Experience options with slug mapping
const EXPERIENCE_OPTIONS = [
  { label: "All Experiences", value: "all" },
  { label: "Island Getaways", value: "island-getaways" },
  { label: "Waterfront Escapes", value: "waterfront-escapes" },
  { label: "Urban Exploration", value: "urban-exploration" },
  { label: "Cultural Immersion", value: "cultural-immersion" },
  { label: "Mountain Lodges", value: "mountain-lodges" },
  { label: "Hiking & Trails", value: "hiking-trails" },
  { label: "Wellness Retreats", value: "wellness-retreats" },
  { label: "Pet-Friendly Stays", value: "pet-friendly" },
  { label: "Family-Friendly", value: "family-friendly" },
  { label: "Luxury Properties", value: "luxury" },
] as const

// Event options
const EVENT_OPTIONS = [
  { label: "All Events", value: "all" },
  { label: "FIFA World Cup 2026", value: "fifa-2026" },
] as const

// FIFA 2026 host cities using actual IDs from fifaCities data
const FIFA_CITY_OPTIONS = [
  { label: "Atlanta", value: "atlanta" },
  { label: "Boston", value: "boston" },
  { label: "Dallas", value: "dallas" },
  { label: "Houston", value: "houston" },
  { label: "Kansas City", value: "kansas-city" },
  { label: "Los Angeles", value: "los-angeles" },
  { label: "Miami", value: "miami-gardens" },
  { label: "New York / New Jersey", value: "new-york-new-jersey" },
  { label: "Philadelphia", value: "philadelphia" },
  { label: "San Francisco", value: "san-francisco" },
  { label: "Seattle", value: "seattle" },
]

// Other cities (could be loaded from database)
const OTHER_CITY_OPTIONS = [
  { label: "Austin", value: "austin" },
  { label: "Chicago", value: "chicago" },
  { label: "Denver", value: "denver" },
  { label: "Las Vegas", value: "las-vegas" },
  { label: "Nashville", value: "nashville" },
  { label: "New Orleans", value: "new-orleans" },
  { label: "Orlando", value: "orlando" },
  { label: "Portland", value: "portland" },
  { label: "San Diego", value: "san-diego" },
  { label: "Scottsdale", value: "scottsdale" },
]

interface SelectDropdownProps {
  label?: string
  value: string
  options: readonly { label: string; value: string }[]
  onChange: (value: string) => void
  groups?: { label: string; options: readonly { label: string; value: string }[] }[]
}

function SelectDropdown({ value, options, onChange, groups }: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const selectedLabel = groups 
    ? [...(groups.flatMap(g => g.options) || []), ...options].find(o => o.value === value)?.label || options[0]?.label
    : options.find(o => o.value === value)?.label || options[0]?.label

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-5 py-4 rounded-xl",
          "bg-white/10 backdrop-blur-sm border border-white/20",
          "text-white text-left",
          "hover:bg-white/15 hover:border-white/30 transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-white/30",
          isOpen && "ring-2 ring-white/30"
        )}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown className={cn(
          "h-4 w-4 opacity-70 transition-transform duration-200 shrink-0",
          isOpen && "rotate-180"
        )} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="max-h-64 overflow-y-auto p-1.5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
          {groups ? (
            <>
              {/* Standalone options first */}
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={cn(
                    "w-full px-4 py-2.5 text-left text-sm rounded-lg hover:bg-gray-100 transition-colors",
                    value === option.value ? "bg-gray-50 text-accent font-medium" : "text-gray-700"
                  )}
                >
                  {option.label}
                </button>
              ))}
              
              {/* Grouped options */}
              {groups.map((group, idx) => (
                <div key={group.label}>
                  <div className="px-4 py-2 mt-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {group.label}
                  </div>
                  {group.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        onChange(option.value)
                        setIsOpen(false)
                      }}
                      className={cn(
                        "w-full px-4 py-2.5 text-left text-sm rounded-lg hover:bg-gray-100 transition-colors",
                        value === option.value ? "bg-gray-50 text-accent font-medium" : "text-gray-700"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              ))}
            </>
          ) : (
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-sm rounded-lg hover:bg-gray-100 transition-colors",
                  value === option.value ? "bg-gray-50 text-accent font-medium" : "text-gray-700"
                )}
              >
                {option.label}
              </button>
            ))
          )}
          </div>
        </div>
      )}
    </div>
  )
}

export function HeroSearch() {
  const router = useRouter()
  const [event, setEvent] = useState("all")
  const [location, setLocation] = useState("all")
  const [experience, setExperience] = useState("all")

  // Build location options with groups
  const locationOptions = [{ label: "All Locations", value: "all" }] as const

  const locationGroups = [
    { label: "FIFA 2026 Cities", options: FIFA_CITY_OPTIONS },
    { label: "Other Cities", options: OTHER_CITY_OPTIONS },
  ]

  const handleSearch = useCallback((e?: React.FormEvent) => {
    e?.preventDefault()
    
    const params = new URLSearchParams()
    
    if (event !== "all") {
      params.set("event", event)
    }
    
    if (location !== "all") {
      params.set("location", location)
    }
    
    if (experience !== "all") {
      params.set("experience", experience)
    }
    
    const queryString = params.toString()
    router.push(queryString ? `/search?${queryString}` : "/search")
  }, [event, location, experience, router])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }, [handleSearch])

  return (
    <form 
      onSubmit={handleSearch}
      onKeyDown={handleKeyDown}
      className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Event Dropdown */}
        <SelectDropdown
          value={event}
          options={EVENT_OPTIONS}
          onChange={setEvent}
        />

        {/* Location Dropdown */}
        <SelectDropdown
          value={location}
          options={locationOptions}
          groups={locationGroups}
          onChange={setLocation}
        />

        {/* Experience Dropdown */}
        <SelectDropdown
          value={experience}
          options={EXPERIENCE_OPTIONS}
          onChange={setExperience}
        />

        {/* Search Button */}
        <div className="flex items-stretch">
          <button
            type="submit"
            className={cn(
              "w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl",
              "bg-accent hover:bg-accent/90 text-white font-medium",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-transparent",
              "shadow-lg hover:shadow-xl"
            )}
          >
            <span>Search Properties</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}
