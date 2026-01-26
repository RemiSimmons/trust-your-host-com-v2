"use client"

import { Users, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export function GuestSelector({ 
  value = 1, 
  onChange, 
  min = 1, 
  max = 20,
  className 
}) {
  const [guestCount, setGuestCount] = useState(value)

  useEffect(() => {
    setGuestCount(value)
  }, [value])

  const handleIncrement = () => {
    if (guestCount < max) {
      const newValue = guestCount + 1
      setGuestCount(newValue)
      onChange?.(newValue)
    }
  }

  const handleDecrement = () => {
    if (guestCount > min) {
      const newValue = guestCount - 1
      setGuestCount(newValue)
      onChange?.(newValue)
    }
  }

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value) || min
    const clampedValue = Math.max(min, Math.min(max, newValue))
    setGuestCount(clampedValue)
    onChange?.(clampedValue)
  }

  return (
    <div className={cn("space-y-3", className)}>
      <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
        <Users className="h-4 w-4" />
        Guests
      </h4>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={guestCount <= min}
          className={cn(
            "w-8 h-8 rounded-lg border flex items-center justify-center transition-colors",
            guestCount <= min
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:border-accent hover:text-accent hover:bg-accent/5"
          )}
          aria-label="Decrease guest count"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <input
          type="number"
          min={min}
          max={max}
          value={guestCount}
          onChange={handleInputChange}
          className="w-16 text-center border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
          aria-label="Number of guests"
        />
        
        <button
          type="button"
          onClick={handleIncrement}
          disabled={guestCount >= max}
          className={cn(
            "w-8 h-8 rounded-lg border flex items-center justify-center transition-colors",
            guestCount >= max
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-700 hover:border-accent hover:text-accent hover:bg-accent/5"
          )}
          aria-label="Increase guest count"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

