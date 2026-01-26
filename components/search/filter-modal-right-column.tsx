"use client"

import {
  PROPERTY_TYPES,
  BOOKING_PLATFORMS,
  AMENITIES,
} from "@/lib/config/filter-config"
import { RadioGroup } from "./radio-group"
import { CheckboxGroup } from "./checkbox-group"
import { GuestSelector } from "./guest-selector"
import { PriceRangeSlider } from "./price-range-slider"

interface FilterModalRightColumnProps {
  selectedPropertyType?: string
  onPropertyTypeChange?: (value: string) => void
  guestCount?: number
  onGuestCountChange?: (value: number) => void
  priceRange?: [number, number]
  onPriceRangeChange?: (range: [number, number]) => void
  selectedBookingPlatforms?: string[]
  onBookingPlatformsChange?: (selected: string[]) => void
  selectedAmenities?: string[]
  onAmenitiesChange?: (selected: string[]) => void
}

export function FilterModalRightColumn({
  selectedPropertyType = "entire-home",
  onPropertyTypeChange,
  guestCount = 2,
  onGuestCountChange,
  priceRange = [50, 500],
  onPriceRangeChange,
  selectedBookingPlatforms = ["direct-booking"],
  onBookingPlatformsChange,
  selectedAmenities = [],
  onAmenitiesChange,
}: FilterModalRightColumnProps) {
  const propertyTypeOptions = PROPERTY_TYPES.map((type) => ({
    value: type.value,
    label: type.label,
  }))

  const bookingPlatformFilters = BOOKING_PLATFORMS.map((platform) => ({
    id: platform.id,
    label: platform.label,
  }))

  const amenityFilters = AMENITIES.map((amenity) => ({
    id: amenity.id,
    label: amenity.label,
  }))

  return (
    <div className="flex flex-col h-full">
      {/* PROPERTY TYPE Section */}
      <section aria-labelledby="property-type-heading">
        <h3 
          id="property-type-heading"
          className="text-[13px] font-bold uppercase text-[#2C5F7C] mb-3 flex items-center gap-2"
        >
          <span aria-hidden="true">🏠</span>
          PROPERTY TYPE
        </h3>
        <RadioGroup
          name="property-type"
          options={propertyTypeOptions}
          onChange={onPropertyTypeChange || (() => {})}
          defaultValue={selectedPropertyType}
        />
      </section>

      {/* GUESTS Section */}
      <section className="mt-6" aria-labelledby="guests-heading">
        <h3 
          id="guests-heading"
          className="text-[13px] font-bold uppercase text-[#2C5F7C] mb-3 flex items-center gap-2"
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
      <section className="mt-6" aria-labelledby="price-range-heading">
        <h3 
          id="price-range-heading"
          className="text-[13px] font-bold uppercase text-[#2C5F7C] mb-3 flex items-center gap-2"
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

      {/* BOOKING PLATFORM Section */}
      <section className="mt-6" aria-labelledby="booking-platform-heading">
        <h3 
          id="booking-platform-heading"
          className="text-[13px] font-bold uppercase text-[#2C5F7C] mb-3 flex items-center gap-2"
        >
          <span aria-hidden="true">🔗</span>
          BOOKING PLATFORM
        </h3>
        {/* Yellow highlighted note box */}
        <div
          className="mb-4 p-3 rounded border-l-4"
          role="note"
          aria-label="Note about direct booking sites"
          style={{
            backgroundColor: "#FEF3C7",
            borderLeftColor: "#D4A574",
          }}
        >
          <p className="text-sm text-gray-800">
            <span aria-hidden="true">⭐</span> TrustYourHost specializes in hosts with direct booking sites
          </p>
        </div>
        <CheckboxGroup
          filters={bookingPlatformFilters}
          onChange={onBookingPlatformsChange || (() => {})}
          defaultChecked={selectedBookingPlatforms}
          columns={1}
        />
      </section>

      {/* AMENITIES Section */}
      <section className="mt-6" aria-labelledby="amenities-heading">
        <h3 
          id="amenities-heading"
          className="text-[13px] font-bold uppercase text-[#2C5F7C] mb-3 flex items-center gap-2"
        >
          <span aria-hidden="true">⚙️</span>
          AMENITIES
        </h3>
        <CheckboxGroup
          filters={amenityFilters}
          onChange={onAmenitiesChange || (() => {})}
          defaultChecked={selectedAmenities}
          columns={2}
        />
      </section>
    </div>
  )
}

