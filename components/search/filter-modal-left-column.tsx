"use client"

import { EXPERIENCE_FEATURES, LOCATION_RADIUS_OPTIONS, EXPERIENCE_FEATURES_ICON } from "@/lib/config/filter-config"
import { CheckboxGroup } from "./checkbox-group"
import { RadioGroup } from "./radio-group"

interface FilterModalLeftColumnProps {
  selectedExperiences?: string[]
  onExperiencesChange?: (selected: string[]) => void
  selectedLocationRadius?: string
  onLocationRadiusChange?: (value: string) => void
}

export function FilterModalLeftColumn({
  selectedExperiences = [],
  onExperiencesChange,
  selectedLocationRadius = "50",
  onLocationRadiusChange,
}: FilterModalLeftColumnProps) {
  const ExperienceIcon = EXPERIENCE_FEATURES_ICON

  const experienceFilters = EXPERIENCE_FEATURES.map((feature) => ({
    id: feature.id,
    label: feature.label,
  }))

  const locationOptions = LOCATION_RADIUS_OPTIONS.map((option) => ({
    value: option.value,
    label: option.label,
  }))

  return (
    <div className="flex flex-col h-full">
      {/* EXPERIENCE FEATURES Section */}
      <section aria-labelledby="experience-features-heading">
        <h3 
          id="experience-features-heading"
          className="text-[13px] font-bold uppercase text-[#2C5F7C] mb-3 flex items-center gap-2"
        >
          <ExperienceIcon className="h-4 w-4" aria-hidden="true" />
          EXPERIENCE FEATURES
        </h3>
        <CheckboxGroup
          filters={experienceFilters}
          onChange={onExperiencesChange || (() => {})}
          defaultChecked={selectedExperiences}
          columns={1}
        />
      </section>

      {/* LOCATION Section */}
      <section className="mt-6" aria-labelledby="location-heading">
        <h3 
          id="location-heading"
          className="text-[13px] font-bold uppercase text-[#2C5F7C] mb-3 flex items-center gap-2"
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
    </div>
  )
}

