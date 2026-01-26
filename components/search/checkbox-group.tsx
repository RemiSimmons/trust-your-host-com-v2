"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface CheckboxGroupProps {
  filters: Array<{ id: string; label: string }>
  onChange: (selected: string[]) => void
  defaultChecked?: string[]
  columns?: number
  className?: string
}

export function CheckboxGroup({
  filters,
  onChange,
  defaultChecked = [],
  columns = 1,
  className,
}: CheckboxGroupProps) {
  const [selected, setSelected] = useState<string[]>(defaultChecked)

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

  return (
    <div
      className={cn(
        columns === 1 && "flex flex-col space-y-2 min-[900px]:space-y-2",
        columns === 2 && "grid grid-cols-2 gap-2",
        columns === 3 && "grid grid-cols-3 gap-2",
        className
      )}
      role="group"
      aria-label="Filter options"
    >
      {filters.map((filter) => {
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
            <input
              type="checkbox"
              className="sr-only"
              checked={isChecked}
              onChange={() => handleToggle(filter.id)}
              aria-label={filter.label}
              tabIndex={-1}
            />
            <span
              className={cn(
                "text-xs min-[900px]:text-sm transition-colors duration-150 leading-[1.5]",
                isChecked ? "text-gray-900 font-medium" : "text-gray-700"
              )}
            >
              {filter.label}
            </span>
          </label>
        )
      })}
    </div>
  )
}

