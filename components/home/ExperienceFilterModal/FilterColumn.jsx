"use client"

import { CheckboxGroup } from "./CheckboxGroup"
import { RadioGroup } from "./RadioGroup"
import { GuestSelector } from "./GuestSelector"
import { PriceRangeSlider } from "./PriceRangeSlider"
import { cn } from "@/lib/utils"

export function FilterColumn({ 
  filters, 
  onFilterChange, 
  filterConfig,
  experienceTitle,
  column = "left",
  className 
}) {
  // Get experience-specific filters and property types
  const experienceSpecificFilters = experienceTitle 
    ? filterConfig.getExperienceFilters(experienceTitle)
    : [];
  
  const experiencePropertyTypes = experienceTitle 
    ? filterConfig.getExperiencePropertyTypes(experienceTitle)
    : [];

  // Left column: Experience-specific Property Types, Experience-specific Filters
  // Right column: Price Range, Guests, Amenities, Booking Types
  if (column === "left") {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Experience-Specific Property Types */}
        {experiencePropertyTypes.length > 0 && (
          <CheckboxGroup
            title="Property Type"
            options={experiencePropertyTypes}
            selectedValues={filters.propertyTypes || []}
            onChange={(values) => onFilterChange("propertyTypes", values)}
          />
        )}

        {/* Experience-Specific Filters */}
        {experienceSpecificFilters.length > 0 && (
          <CheckboxGroup
            title="Experience Features"
            options={experienceSpecificFilters}
            selectedValues={filters.specificFilters || []}
            onChange={(values) => onFilterChange("specificFilters", values)}
          />
        )}
      </div>
    )
  }

  // Right column
  return (
    <div className={cn("space-y-6", className)}>
      {/* Price Range */}
      <PriceRangeSlider
        min={filterConfig.priceRange.min}
        max={filterConfig.priceRange.max}
        value={filters.priceRange || filterConfig.priceRange.default}
        onChange={(value) => onFilterChange("priceRange", value)}
      />

      {/* Guests */}
      <GuestSelector
        value={filters.guests || filterConfig.guests.default}
        onChange={(value) => onFilterChange("guests", value)}
        min={filterConfig.guests.min}
        max={filterConfig.guests.max}
      />

      {/* Amenities */}
      <CheckboxGroup
        title="Amenities"
        options={filterConfig.amenities}
        selectedValues={filters.amenities || []}
        onChange={(values) => onFilterChange("amenities", values)}
      />

      {/* Booking Platforms */}
      <CheckboxGroup
        title="Booking Platforms"
        options={filterConfig.bookingPlatforms}
        selectedValues={filters.bookingPlatforms || filterConfig.bookingPlatforms
          .filter(platform => platform.defaultSelected)
          .map(platform => platform.id)}
        onChange={(values) => onFilterChange("bookingPlatforms", values)}
        note={filterConfig.bookingPlatformNote}
      />
    </div>
  )
}

