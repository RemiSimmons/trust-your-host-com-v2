"use client"

import { cn } from "@/lib/utils"

export function RadioGroup({ 
  title, 
  options, 
  selectedValue, 
  onChange,
  name,
  className 
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {title && (
        <h4 className="font-semibold text-foreground text-sm mb-3">{title}</h4>
      )}
      <div className="space-y-2" role="radiogroup" aria-label={title}>
        {options.map((option) => {
          const isSelected = selectedValue === option.id
          return (
            <label
              key={option.id}
              className="flex items-center gap-2 cursor-pointer group"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onChange(option.id)
                }
              }}
              tabIndex={0}
              role="radio"
              aria-checked={isSelected}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                  isSelected
                    ? "border-accent bg-accent"
                    : "border-gray-300 group-hover:border-accent group-focus:border-accent group-focus:ring-2 group-focus:ring-accent/50"
                )}
              >
                {isSelected && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={isSelected}
                onChange={() => onChange(option.id)}
                className="hidden"
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


