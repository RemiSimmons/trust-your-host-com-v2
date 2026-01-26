"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function CheckboxGroup({ 
  title, 
  options, 
  selectedValues = [], 
  onChange,
  note,
  className 
}) {
  const toggleOption = (optionId) => {
    const isSelected = selectedValues.includes(optionId)
    const newValues = isSelected
      ? selectedValues.filter((id) => id !== optionId)
      : [...selectedValues, optionId]
    onChange(newValues)
  }

  return (
    <div className={cn("space-y-3", className)}>
      {title && (
        <h4 className="font-semibold text-foreground text-sm mb-3">{title}</h4>
      )}
      {note && (
        <p className="text-xs text-gray-500 -mt-2 mb-3">{note}</p>
      )}
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.id)
          return (
            <label
              key={option.id}
              className="flex items-center gap-2 cursor-pointer group"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  toggleOption(option.id)
                }
              }}
              tabIndex={0}
              role="checkbox"
              aria-checked={isSelected}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  isSelected
                    ? "bg-accent border-accent text-white"
                    : "border-gray-300 group-hover:border-accent group-focus:border-accent group-focus:ring-2 group-focus:ring-accent/50"
                )}
              >
                {isSelected && <Check className="h-3 w-3" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={isSelected}
                onChange={() => toggleOption(option.id)}
                aria-label={option.label}
              />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">
                {option.label}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

