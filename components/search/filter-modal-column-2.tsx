"use client"

import { PROPERTY_TYPES, LOCATION_RADIUS_OPTIONS } from "@/lib/config/filter-config"
import { CheckboxGroup } from "./checkbox-group"
import { RadioGroup } from "./radio-group"

interface FilterModalColumn2Props {
  selectedPropertyTypes?: string[]
  onPropertyTypesChange?: (selected: string[]) => void
  selectedLocationRadius?: string
  onLocationRadiusChange?: (value: string) => void
}

export function FilterModalColumn2({
  selectedPropertyTypes = [],
  onPropertyTypesChange,
  selectedLocationRadius = "50",
  onLocationRadiusChange,
}: FilterModalColumn2Props) {
  const propertyTypeFilters = PROPERTY_TYPES.map((type) => ({
    id: type.value,
    label: type.label,
  }))

  const locationOptions = LOCATION_RADIUS_OPTIONS.map((option) => ({
    value: option.value,
    label: option.label,
  }))

  return (
    <div className="flex flex-col h-full gap-5 min-w-0 justify-start w-full">
      {/* LOCATION Section */}
      <section aria-labelledby="location-heading" className="flex-shrink-0">
        <h3 
          id="location-heading"
          className="text-[11px] min-[900px]:text-sm font-bold uppercase text-[#2C5F7C] mb-3 min-[900px]:mb-5 flex items-center gap-1.5"
        >
          <span aria-hidden="true">📍</span>
          LOCATION
        </h3>
        <RadioGroup
          name="location-radius"
          options={locationOptions}
          onChange={onLocationRadiusChange || (() => {})}
          defaultValue={selectedLocationRadius}
        />
      </section>

      {/* PROPERTY TYPE Section */}
      <section aria-labelledby="property-type-heading" className="flex-1 flex flex-col min-h-0">
        <h3 
          id="property-type-heading"
          className="text-[11px] min-[900px]:text-sm font-bold uppercase text-[#2C5F7C] mb-3 min-[900px]:mb-5 flex items-center gap-1.5"
        >
          <span aria-hidden="true">🏠</span>
          PROPERTY TYPE
        </h3>
        <CheckboxGroup
          filters={propertyTypeFilters}
          onChange={onPropertyTypesChange || (() => {})}
          defaultChecked={selectedPropertyTypes}
          columns={1}
        />
      </section>
    </div>
  )
}

