"use client"

import { EXPERIENCE_SPECIFIC_FEATURES, EXPERIENCE_ICONS } from "@/lib/config/filter-config"
import { CheckboxGroup } from "./checkbox-group"

interface FilterModalColumn1Props {
  selectedExperiences?: string[]
  onExperiencesChange?: (selected: string[]) => void
  experienceKey?: string
}

export function FilterModalColumn1({
  selectedExperiences = [],
  onExperiencesChange,
  experienceKey,
}: FilterModalColumn1Props) {
  // Get experience-specific features or fallback to empty array
  const experienceFilters = experienceKey && EXPERIENCE_SPECIFIC_FEATURES[experienceKey]
    ? EXPERIENCE_SPECIFIC_FEATURES[experienceKey]
    : []

  // Get experience icon/emoji or fallback to mountain
  const experienceIcon = experienceKey && EXPERIENCE_ICONS[experienceKey]
    ? EXPERIENCE_ICONS[experienceKey]
    : "🏔️"

  return (
    <div className="flex flex-col h-full min-w-0 justify-start w-full">
      {/* EXPERIENCE FEATURES Section */}
      <section aria-labelledby="experience-features-heading" className="flex-1 flex flex-col min-h-0">
        <h3 
          id="experience-features-heading"
          className="text-[11px] min-[900px]:text-sm font-bold uppercase text-[#2C5F7C] mb-3 min-[900px]:mb-5 flex items-center gap-1.5"
        >
          <span aria-hidden="true">{experienceIcon}</span>
          EXPERIENCE FEATURES
        </h3>
        {experienceFilters.length > 0 ? (
          <CheckboxGroup
            filters={experienceFilters}
            onChange={onExperiencesChange || (() => {})}
            defaultChecked={selectedExperiences}
            columns={1}
          />
        ) : null}
      </section>
    </div>
  )
}

