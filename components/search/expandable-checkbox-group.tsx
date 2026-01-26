"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExpandableCheckboxGroupProps {
  filters: Array<{ id: string; label: string }>
  onChange: (selected: string[]) => void
  defaultChecked?: string[]
  initialVisible?: number
  className?: string
}

export function ExpandableCheckboxGroup({
  filters,
  onChange,
  defaultChecked = [],
  initialVisible = 4,
  className,
}: ExpandableCheckboxGroupProps) {
  const [selected, setSelected] = useState<string[]>(defaultChecked)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setSelected(defaultChecked)
  }, [defaultChecked])

  const handleToggle = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter((item) => item !== id)
      : [...selected, id]
    setSelected(newSelected)
    onChange(newSelected)
  }

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleToggle(id)
    }
  }

  const visibleFilters = isExpanded ? filters : filters.slice(0, initialVisible)
  const hasMore = filters.length > initialVisible

  return (
    <div className={cn("flex flex-col", className)} role="group" aria-label="Filter options">
      <div className="flex flex-col space-y-2.5 min-[900px]:space-y-2.5">
        {visibleFilters.map((filter) => {
          const isChecked = selected.includes(filter.id)
          return (
            <label
              key={filter.id}
              className={cn(
                "flex items-center gap-2.5 min-[900px]:gap-2.5 cursor-pointer group",
                "transition-colors duration-150 motion-reduce:transition-none",
                "hover:text-gray-900",
                "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent/50 focus-within:rounded",
                "min-h-[32px] min-[900px]:min-h-[32px]" // Optimized height for readability
              )}
              onKeyDown={(e) => handleKeyDown(e, filter.id)}
              tabIndex={0}
              role="checkbox"
              aria-checked={isChecked}
              aria-label={filter.label}
            >
              <div
                className={cn(
                  "w-[18px] h-[18px] min-[900px]:w-[18px] min-[900px]:h-[18px] rounded border flex items-center justify-center transition-all duration-150 flex-shrink-0",
                  isChecked
                    ? "bg-[#2C5F7C] border-[#2C5F7C] text-white"
                    : "border-gray-300 group-hover:border-[#2C5F7C] group-hover:bg-gray-50 bg-white"
                )}
              >
                {isChecked && <Check className="h-3.5 w-3.5 min-[900px]:h-3.5 min-[900px]:w-3.5" />}
              </div>
              <span
                className={cn(
                  "text-xs min-[900px]:text-[15px] transition-colors duration-150 leading-[1.5]",
                  isChecked ? "text-gray-900 font-medium" : "text-gray-700"
                )}
              >
                {filter.label}
              </span>
            </label>
          )
        })}
      </div>
      
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "mt-2 min-[900px]:mt-2.5 text-xs min-[900px]:text-sm text-[#2C5F7C] hover:text-[#2C5F7C]/80 font-medium",
            "flex items-center gap-1 transition-colors duration-150",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/50 focus:rounded"
          )}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? "Show less" : "Show more"}
        >
          {isExpanded ? "Show less" : `Show more (${filters.length - initialVisible})`}
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform duration-150",
              isExpanded && "rotate-180"
            )}
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  )
}

