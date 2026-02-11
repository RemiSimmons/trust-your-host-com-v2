"use client"

import { useState, useRef, useEffect } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectDropdownProps {
  label: string
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelectDropdown({
  label,
  options,
  selected,
  onChange,
  placeholder = "All",
  className,
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggle = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]
    onChange(updated)
  }

  const removeItem = (value: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(selected.filter((v) => v !== value))
  }

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
  }

  const displayText = selected.length === 0
    ? placeholder
    : `${selected.length} selected`

  return (
    <div ref={ref} className={cn("relative mb-6", className)}>
      <h4 className="font-semibold text-gray-900 mb-2">{label}</h4>

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "w-full flex items-center justify-between gap-2 h-8 px-3 py-1.5 border rounded-lg text-xs bg-white transition-colors text-left",
          isOpen
            ? "border-accent ring-2 ring-accent/30"
            : "border-gray-300 hover:border-gray-400",
          selected.length > 0 ? "text-gray-900" : "text-gray-500"
        )}
      >
        <span className="truncate">{displayText}</span>
        <div className="flex items-center gap-1 shrink-0">
          {selected.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="flex items-center justify-center w-3.5 h-3.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label="Clear selection"
            >
              <X className="h-2 w-2 text-gray-600" />
            </button>
          )}
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-gray-400 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
          {options.map((option) => {
            const isSelected = selected.includes(option.value)
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggle(option.value)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 text-sm text-left transition-colors",
                  isSelected
                    ? "bg-accent/5 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                    isSelected
                      ? "bg-accent border-accent text-white"
                      : "border-gray-300"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                </div>
                <span className="flex-1">{option.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Selected pills - compact, true pill shape */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map((value) => {
            const option = options.find((o) => o.value === value)
            return (
              <span
                key={value}
                className="inline-flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20 leading-none h-[26px]"
              >
                <span className="leading-none">{option?.label ?? value}</span>
                <button
                  type="button"
                  onClick={(e) => removeItem(value, e)}
                  className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-accent/20 transition-colors flex-shrink-0"
                  aria-label={`Remove ${option?.label ?? value}`}
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
