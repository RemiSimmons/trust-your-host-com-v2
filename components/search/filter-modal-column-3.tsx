"use client"

import { GuestSelector } from "./guest-selector"
import { PriceRangeSlider } from "./price-range-slider"

interface FilterModalColumn3Props {
  guestCount?: number
  onGuestCountChange?: (value: number) => void
  priceRange?: [number, number]
  onPriceRangeChange?: (range: [number, number]) => void
}

export function FilterModalColumn3({
  guestCount = 2,
  onGuestCountChange,
  priceRange = [50, 500],
  onPriceRangeChange,
}: FilterModalColumn3Props) {
  return (
    <div className="flex flex-col h-full gap-5 min-w-0 justify-start w-full">
      {/* GUESTS Section */}
      <section aria-labelledby="guests-heading" className="flex-shrink-0">
        <h3 
          id="guests-heading"
          className="text-[11px] min-[900px]:text-sm font-bold uppercase text-[#2C5F7C] mb-3 min-[900px]:mb-5 flex items-center gap-1.5"
        >
          <span aria-hidden="true">👥</span>
          GUESTS
        </h3>
        <GuestSelector
          min={1}
          max={16}
          defaultValue={guestCount}
          onChange={onGuestCountChange}
        />
      </section>

      {/* PRICE RANGE Section */}
      <section aria-labelledby="price-range-heading" className="flex-shrink-0">
        <h3 
          id="price-range-heading"
          className="text-[11px] min-[900px]:text-sm font-bold uppercase text-[#2C5F7C] mb-3 min-[900px]:mb-5 flex items-center gap-1.5"
        >
          <span aria-hidden="true">💰</span>
          TYPICAL NIGHTLY RATE
        </h3>
        <PriceRangeSlider
          min={50}
          max={10000}
          defaultRange={priceRange}
          onChange={onPriceRangeChange}
        />
      </section>
    </div>
  )
}

