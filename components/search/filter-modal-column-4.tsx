"use client"

import {
  BOOKING_PLATFORMS,
  AMENITIES,
} from "@/lib/config/filter-config"
import { CheckboxGroup } from "./checkbox-group"

interface FilterModalColumn4Props {
  selectedBookingPlatforms?: string[]
  onBookingPlatformsChange?: (selected: string[]) => void
  selectedAmenities?: string[]
  onAmenitiesChange?: (selected: string[]) => void
}

export function FilterModalColumn4({
  selectedBookingPlatforms = ["direct-booking"],
  onBookingPlatformsChange,
  selectedAmenities = [],
  onAmenitiesChange,
}: FilterModalColumn4Props) {
  const bookingPlatformFilters = BOOKING_PLATFORMS.map((platform) => ({
    id: platform.id,
    label: platform.label,
  }))

  const amenityFilters = AMENITIES.map((amenity) => ({
    id: amenity.id,
    label: amenity.label,
  }))

  return (
    <div className="flex flex-col h-full gap-5 min-w-0 justify-start w-full">
      {/* BOOKING PLATFORM Section */}
      <section aria-labelledby="booking-platform-heading" className="flex-shrink-0">
        <h3 
          id="booking-platform-heading"
          className="text-[11px] min-[900px]:text-sm font-bold uppercase text-[#2C5F7C] mb-3 min-[900px]:mb-5 flex items-center gap-1.5"
        >
          <span aria-hidden="true">🔗</span>
          BOOKING PLATFORM
        </h3>
        {/* Yellow highlighted note box */}
        <div
          className="mb-3 min-[900px]:mb-4 p-2.5 min-[900px]:px-3.5 min-[900px]:py-2.5 rounded border-l-4"
          role="note"
          aria-label="Note about direct booking sites"
          style={{
            backgroundColor: "#FEF3C7",
            borderLeftColor: "#D4A574",
          }}
        >
          <p className="text-xs min-[900px]:text-[13px] text-gray-800 leading-relaxed">
            <span aria-hidden="true" className="text-sm min-[900px]:text-base">⭐</span> TrustYourHost specializes in hosts with direct booking sites
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
      <section aria-labelledby="amenities-heading" className="flex-1 flex flex-col min-h-0">
        <h3 
          id="amenities-heading"
          className="text-[11px] min-[900px]:text-sm font-bold uppercase text-[#2C5F7C] mb-3 min-[900px]:mb-5 flex items-center gap-1.5"
        >
          <span aria-hidden="true">⚙️</span>
          AMENITIES
        </h3>
        <CheckboxGroup
          filters={amenityFilters}
          onChange={onAmenitiesChange || (() => {})}
          defaultChecked={selectedAmenities}
          columns={1}
        />
      </section>
    </div>
  )
}

