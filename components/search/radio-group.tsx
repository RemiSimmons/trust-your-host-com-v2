"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  name: string
  options: RadioOption[]
  onChange: (value: string) => void
  defaultValue?: string
  className?: string
}

export function RadioGroup({
  name,
  options,
  onChange,
  defaultValue,
  className,
}: RadioGroupProps) {
  const [selected, setSelected] = useState<string>(defaultValue || options[0]?.value || "")

  useEffect(() => {
    if (defaultValue !== undefined) {
      setSelected(defaultValue)
    }
  }, [defaultValue])

  const handleChange = (value: string) => {
    setSelected(value)
    onChange(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent, value: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleChange(value)
      return
    }

    // Arrow key navigation for radio groups
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault()
      const currentIndex = options.findIndex((opt) => opt.value === value)
      const nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0
      handleChange(options[nextIndex].value)
      // Focus the next option
      const nextElement = e.currentTarget.parentElement?.querySelectorAll('label')[nextIndex]
      if (nextElement) {
        (nextElement as HTMLElement).focus()
      }
      return
    }

    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault()
      const currentIndex = options.findIndex((opt) => opt.value === value)
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1
      handleChange(options[prevIndex].value)
      // Focus the previous option
      const prevElement = e.currentTarget.parentElement?.querySelectorAll('label')[prevIndex]
      if (prevElement) {
        (prevElement as HTMLElement).focus()
      }
      return
    }
  }

  return (
    <div
      className={cn("space-y-2 min-[900px]:space-y-2", className)}
      role="radiogroup"
      aria-label={`${name} options`}
    >
      {options.map((option) => {
        const isSelected = selected === option.value
        return (
          <label
            key={option.value}
            className={cn(
              "flex items-center gap-2.5 min-[900px]:gap-2.5 cursor-pointer group",
              "transition-colors duration-150 motion-reduce:transition-none",
              "hover:text-gray-900",
              "focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-accent/50 focus-within:rounded",
              "min-h-[32px] min-[900px]:min-h-[32px]" // Optimized height for readability
            )}
            onKeyDown={(e) => handleKeyDown(e, option.value)}
            tabIndex={0}
            role="radio"
            aria-checked={isSelected}
            aria-label={option.label}
          >
            <div
              className={cn(
                "w-[18px] h-[18px] min-[900px]:w-[18px] min-[900px]:h-[18px] rounded-full border-2 flex items-center justify-center transition-all duration-150 flex-shrink-0",
                isSelected
                  ? "border-[#2C5F7C] bg-white"
                  : "border-gray-300 group-hover:border-[#2C5F7C] group-hover:bg-gray-50 bg-white"
              )}
            >
              {isSelected && (
                <div className="w-2.5 h-2.5 min-[900px]:w-2.5 min-[900px]:h-2.5 rounded-full bg-[#2C5F7C] transition-all duration-150" />
              )}
            </div>
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isSelected}
              onChange={() => handleChange(option.value)}
              className="sr-only"
              aria-label={option.label}
              tabIndex={-1}
            />
            <span
              className={cn(
                "text-xs min-[900px]:text-sm transition-colors duration-150 leading-[1.5]",
                isSelected ? "text-gray-900 font-medium" : "text-gray-700"
              )}
            >
              {option.label}
            </span>
          </label>
        )
      })}
    </div>
  )
}

