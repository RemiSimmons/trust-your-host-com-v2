"use client"

import { AMENITIES } from "@/lib/config/filter-config"
import { CheckboxGroup } from "./checkbox-group"

interface FilterModalColumn4Props {
  selectedAmenities?: string[]
  onAmenitiesChange?: (selected: string[]) => void
}

export function FilterModalColumn4({
  selectedAmenities = [],
  onAmenitiesChange,
}: FilterModalColumn4Props) {
  const amenityFilters = AMENITIES.map((amenity) => ({
    id: amenity.id,
    label: amenity.label,
  }))

  return (
    <div className="flex flex-col h-full gap-5 min-w-0 justify-start w-full">
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

