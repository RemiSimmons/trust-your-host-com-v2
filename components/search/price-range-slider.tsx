"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface PriceRangeSliderProps {
  min?: number
  max?: number
  defaultRange?: [number, number]
  onChange?: (range: [number, number]) => void
  className?: string
}

// Debounce utility
function useDebounce<T>(value: T, delay: number, callback: (value: T) => void) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(value)
    }, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [value, delay, callback])
}

export function PriceRangeSlider({
  min = 50,
  max = 10000,
  defaultRange = [50, 500],
  onChange,
  className,
}: PriceRangeSliderProps) {
  const [range, setRange] = useState<[number, number]>(defaultRange)
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    setRange(defaultRange)
  }, [defaultRange])

  // Debounced callback for onChange
  const debouncedOnChange = useCallback(
    (newRange: [number, number]) => {
      onChange?.(newRange)
    },
    [onChange]
  )

  // Debounce onChange calls (300ms delay)
  useDebounce(range, 300, debouncedOnChange)

  const handleValueChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]]
    setRange(newRange)
    // Call onChange immediately if not dragging (for better UX)
    if (!isDragging) {
      onChange?.(newRange)
    }
  }

  const handleValueCommit = () => {
    setIsDragging(false)
    // Ensure final value is passed
    onChange?.(range)
  }

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`
  }

  return (
    <div 
      className={cn("space-y-3 min-[900px]:space-y-3", className)}
      role="group"
      aria-label="Price range filter"
    >
      {/* Display selected range */}
      <div 
        className="text-sm min-[900px]:text-base text-gray-900 font-medium text-center leading-[1.5]"
        aria-live="polite"
        aria-atomic="true"
        id="price-range-display"
      >
        {formatCurrency(range[0])} - {formatCurrency(range[1])}
      </div>

      {/* Slider */}
      <Slider
        value={range}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
        onPointerDown={() => setIsDragging(true)}
        min={min}
        max={max}
        step={10}
        className="w-full transition-opacity duration-200"
        aria-label="Price range"
        aria-labelledby="price-range-display"
      />
    </div>
  )
}

