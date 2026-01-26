"use client"

import { useState, useEffect } from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface GuestSelectorProps {
  min?: number
  max?: number
  defaultValue?: number
  onChange?: (value: number) => void
  className?: string
}

export function GuestSelector({
  min = 1,
  max = 16,
  defaultValue = 2,
  onChange,
  className,
}: GuestSelectorProps) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleDecrease = () => {
    if (value > min) {
      const newValue = value - 1
      setValue(newValue)
      onChange?.(newValue)
    }
  }

  const handleIncrease = () => {
    if (value < max) {
      const newValue = value + 1
      setValue(newValue)
      onChange?.(newValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, action: "decrease" | "increase") => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      if (action === "decrease") {
        handleDecrease()
      } else {
        handleIncrease()
      }
    }
  }

  const isMinDisabled = value <= min
  const isMaxDisabled = value >= max

  return (
    <div 
      className={cn("flex items-center gap-2.5 min-[900px]:gap-3", className)}
      role="group"
      aria-label="Number of guests"
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={isMinDisabled}
        onKeyDown={(e) => handleKeyDown(e, "decrease")}
        aria-label={`Decrease guests to ${value - 1}`}
        aria-disabled={isMinDisabled}
        className={cn(
          "min-w-[36px] min-h-[36px] w-9 h-9 min-[900px]:w-9 min-[900px]:h-9 rounded border flex items-center justify-center",
          "transition-all duration-150 motion-reduce:transition-none",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/50",
          "touch-manipulation", // Better touch handling
          isMinDisabled
            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-50"
            : "border-gray-300 bg-white text-gray-700 hover:border-[#2C5F7C] hover:text-[#2C5F7C] hover:bg-[#2C5F7C]/5"
        )}
      >
        <Minus className="h-4 w-4 min-[900px]:h-4 min-[900px]:w-4" aria-hidden="true" />
      </button>

      <div className="min-w-[80px] min-[900px]:min-w-[80px] text-center">
        <span className="text-xs min-[900px]:text-sm text-gray-900 font-medium leading-[1.5]" aria-live="polite" aria-atomic="true">
          {value} {value === 1 ? "Guest" : "Guests"}
        </span>
      </div>

      <button
        type="button"
        onClick={handleIncrease}
        disabled={isMaxDisabled}
        onKeyDown={(e) => handleKeyDown(e, "increase")}
        aria-label={`Increase guests to ${value + 1}`}
        aria-disabled={isMaxDisabled}
        className={cn(
          "min-w-[36px] min-h-[36px] w-9 h-9 min-[900px]:w-9 min-[900px]:h-9 rounded border flex items-center justify-center",
          "transition-all duration-150 motion-reduce:transition-none",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/50",
          "touch-manipulation", // Better touch handling
          isMaxDisabled
            ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-50"
            : "border-gray-300 bg-white text-gray-700 hover:border-[#2C5F7C] hover:text-[#2C5F7C] hover:bg-[#2C5F7C]/5"
        )}
      >
        <Plus className="h-4 w-4 min-[900px]:h-4 min-[900px]:w-4" aria-hidden="true" />
      </button>
    </div>
  )
}

