"use client"
import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, X } from "lucide-react"

export function ExperienceSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  const experiences = [
    "Hiking & Trails",
    "Mountain Lodges",
    "Island Getaways",
    "Glamping",
    "Wine Country",
    "Wellness Retreats",
    "Culinary Experiences",
    "Remote Work Retreats",
    "Adventure Sports",
    "Cultural Immersion",
    "Waterfront Escapes",
    "Desert Solitude",
    "Historic Stays",
    "Eco-Tourism",
    "Ski Chalets",
  ]

  // Filter experiences based on search
  const filteredExperiences = searchTerm
    ? experiences.filter((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase()))
    : experiences

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleExperience = (exp: string) => {
    setSelectedExperiences((prev) => (prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]))
  }

  const removeExperience = (exp: string) => {
    setSelectedExperiences((prev) => prev.filter((e) => e !== exp))
  }

  return (
    <div className="space-y-2 relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-white drop-shadow-md">Experience</label>

      {/* Input field */}
      <div className="relative">
        <input
          type="text"
          placeholder={selectedExperiences.length ? `${selectedExperiences.length} selected` : "What are you seeking?"}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-3 pr-10 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/70 focus:bg-white/25 focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm transition-all"
        />
        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Selected chips (show below input) */}
      {selectedExperiences.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedExperiences.map((exp) => (
            <button
              key={exp}
              onClick={() => removeExperience(exp)}
              className="px-3 py-1 bg-accent/90 text-white rounded-full text-xs flex items-center gap-1 hover:bg-accent transition-colors"
            >
              {exp}
              <X className="h-3 w-3" />
            </button>
          ))}
        </div>
      )}

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto">
          {filteredExperiences.length > 0 ? (
            <div className="py-2">
              {filteredExperiences.map((exp) => {
                const isSelected = selectedExperiences.includes(exp)
                return (
                  <button
                    key={exp}
                    onClick={() => toggleExperience(exp)}
                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <span className="text-gray-900 text-sm">{exp}</span>
                    {isSelected && <Check className="h-4 w-4 text-accent" />}
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500 text-sm">No experiences found</div>
          )}
        </div>
      )}
    </div>
  )
}
