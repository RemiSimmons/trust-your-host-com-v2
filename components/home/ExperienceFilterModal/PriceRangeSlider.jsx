"use client"

import { DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export function PriceRangeSlider({ 
  min = 0, 
  max = 2000, 
  value = [min, max], 
  onChange,
  step = 10,
  className 
}) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value)
    const newValue = [Math.min(newMin, localValue[1]), localValue[1]]
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value)
    const newValue = [localValue[0], Math.max(newMax, localValue[0])]
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  const minPercent = ((localValue[0] - min) / (max - min)) * 100
  const maxPercent = ((localValue[1] - min) / (max - min)) * 100

  return (
    <div className={cn("space-y-4", className)}>
      <h4 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
        <DollarSign className="h-4 w-4" />
        Price Range
      </h4>
      
      <div className="space-y-4">
        {/* Display current values */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>${localValue[0].toLocaleString()}</span>
          <span>${localValue[1].toLocaleString()}</span>
        </div>

        {/* Slider track */}
        <div className="relative h-2">
          <div className="absolute w-full h-2 bg-gray-200 rounded-full" />
          <div
            className="absolute h-2 bg-accent rounded-full"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
        </div>

        {/* Input sliders */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Min Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                $
              </span>
              <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={localValue[0]}
                onChange={handleMinChange}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                aria-label="Minimum price"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Max Price</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                $
              </span>
              <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={localValue[1]}
                onChange={handleMaxChange}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                aria-label="Maximum price"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


