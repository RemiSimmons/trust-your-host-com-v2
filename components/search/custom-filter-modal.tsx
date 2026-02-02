"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { X, Loader2 } from "lucide-react"
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { FilterModalColumn1 } from "./filter-modal-column-1"
import { FilterModalColumn2 } from "./filter-modal-column-2"
import { FilterModalColumn3 } from "./filter-modal-column-3"
import { FilterModalColumn4 } from "./filter-modal-column-4"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { EXPERIENCE_FEATURES } from "@/lib/config/filter-config"
import { getExperienceConfig } from "@/lib/config/experience-config"
import type { FilterState } from "@/lib/types"

export type { FilterState }

const DEFAULT_FILTER_STATE: FilterState = {
  experience: '',
  guests: 2,
  priceRange: [50, 500],
  propertyTypes: [],
  bookingPlatform: ['Direct Booking Site'],
  locationRadius: 'Within 50 miles',
  specificFilters: [],
  amenities: [],
}

interface FilterModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  experience?: string
  initialFilters?: Partial<FilterState>
  triggerElementRef?: React.RefObject<HTMLElement>
}

export function FilterModal({
  open,
  onOpenChange,
  experience = '',
  initialFilters = {},
  triggerElementRef,
}: FilterModalProps) {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElementRef = useRef<HTMLElement | null>(null)
  const filterCountAnnouncementRef = useRef<HTMLDivElement>(null)
  const [isNavigating, setIsNavigating] = useState(false)

  // Get experience config for title and icon
  const experienceConfig = useMemo(() => {
    if (!experience) return null
    const config = getExperienceConfig(experience)
    if (!config) {
      console.warn(`No experience config found for key: ${experience}`)
    }
    return config
  }, [experience])

  const dialogTitle = useMemo(() => {
    return experienceConfig?.title 
      ? `Filter Properties: ${experienceConfig.title}` 
      : 'Filter Properties'
  }, [experienceConfig?.title])

  // Initialize state with defaults and any initial filters
  const [filters, setFilters] = useState<FilterState>(() => {
    const baseState = {
      ...DEFAULT_FILTER_STATE,
      experience,
    }
    
    if (initialFilters) {
      let propertyTypes = initialFilters.propertyTypes || []
      if (!propertyTypes.length && (initialFilters as any).propertyType) {
        propertyTypes = [(initialFilters as any).propertyType]
      }
      
      return {
        ...baseState,
        ...initialFilters,
        propertyTypes: propertyTypes,
        specificFilters: initialFilters.specificFilters || [],
        amenities: initialFilters.amenities || [],
        bookingPlatform: initialFilters.bookingPlatform || DEFAULT_FILTER_STATE.bookingPlatform,
        priceRange: initialFilters.priceRange || DEFAULT_FILTER_STATE.priceRange,
      } as FilterState
    }
    
    return baseState
  })

  // Update filters when experience or initialFilters change
  useEffect(() => {
    if (open) {
      if (experience) {
        const config = getExperienceConfig(experience)
        if (config && initialFilters) {
          let propertyTypes = initialFilters.propertyTypes || []
          if (!propertyTypes.length && (initialFilters as any).propertyType) {
            propertyTypes = [(initialFilters as any).propertyType]
          } else if (!propertyTypes.length && config.filterPreset.propertyType) {
            propertyTypes = [config.filterPreset.propertyType as string]
          }
          
          setFilters((prev) => ({
            ...prev,
            experience,
            ...initialFilters,
            propertyTypes: propertyTypes,
            specificFilters: initialFilters.specificFilters || config.defaultFeatures || [],
          } as FilterState))
        } else if (experience) {
          setFilters((prev) => ({ ...prev, experience }))
        }
      } else if (initialFilters && Object.keys(initialFilters).length > 0) {
        let propertyTypes = initialFilters.propertyTypes || []
        if (!propertyTypes.length && (initialFilters as any).propertyType) {
          propertyTypes = [(initialFilters as any).propertyType]
        }
        
        setFilters((prev) => ({
          ...prev,
          ...initialFilters,
          propertyTypes: propertyTypes,
        }))
      }
    }
  }, [experience, open, initialFilters])

  // Store previous active element when modal opens
  useEffect(() => {
    if (open) {
      previousActiveElementRef.current = document.activeElement as HTMLElement
    }
  }, [open])

  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onOpenChange(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [open, onOpenChange])

  // Restore focus when modal closes
  useEffect(() => {
    if (!open) {
      setIsNavigating(false)
      const elementToFocus = triggerElementRef?.current || previousActiveElementRef.current
      if (elementToFocus) {
        setTimeout(() => {
          elementToFocus.focus()
        }, 100)
      }
    }
  }, [open, triggerElementRef])

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.experience && filters.experience !== '') count++
    if (filters.guests !== DEFAULT_FILTER_STATE.guests) count++
    if (
      filters.priceRange[0] !== DEFAULT_FILTER_STATE.priceRange[0] ||
      filters.priceRange[1] !== DEFAULT_FILTER_STATE.priceRange[1]
    ) count++
    if (filters.propertyTypes.length > 0) count++
    const defaultPlatforms = DEFAULT_FILTER_STATE.bookingPlatform
    const hasOnlyDirectBooking =
      filters.bookingPlatform.length === 1 &&
      filters.bookingPlatform[0] === defaultPlatforms[0]
    if (!hasOnlyDirectBooking) count++
    if (filters.locationRadius !== DEFAULT_FILTER_STATE.locationRadius) count++
    if (filters.specificFilters.length > 0) count++
    if (filters.amenities.length > 0) count++
    return count
  }, [filters])

  const handleFilterChange = useCallback((key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleClearAll = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTER_STATE,
      experience: filters.experience,
      propertyTypes: [],
      bookingPlatform: ['Direct Booking Site'],
    })
    if (filterCountAnnouncementRef.current) {
      filterCountAnnouncementRef.current.textContent = 'All filters cleared'
      setTimeout(() => {
        if (filterCountAnnouncementRef.current) {
          filterCountAnnouncementRef.current.textContent = ''
        }
      }, 1000)
    }
  }, [filters.experience])

  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams()
    if (filters.experience) {
      params.set('experience', encodeURIComponent(filters.experience))
    }
    if (filters.guests !== DEFAULT_FILTER_STATE.guests && filters.guests >= 1 && filters.guests <= 16) {
      params.set('guests', filters.guests.toString())
    }
    if (
      filters.priceRange[0] !== DEFAULT_FILTER_STATE.priceRange[0] ||
      filters.priceRange[1] !== DEFAULT_FILTER_STATE.priceRange[1]
    ) {
      const minPrice = Math.max(0, Math.min(filters.priceRange[0], filters.priceRange[1]))
      const maxPrice = Math.max(minPrice, Math.min(filters.priceRange[1], 100000))
      params.set('minPrice', minPrice.toString())
      params.set('maxPrice', maxPrice.toString())
    }
    if (filters.propertyTypes.length > 0) {
      const encodedTypes = filters.propertyTypes
        .filter(Boolean)
        .map(t => encodeURIComponent(t))
      if (encodedTypes.length > 0) {
        params.set('propertyTypes', encodedTypes.join(','))
      }
    }
    if (filters.bookingPlatform.length > 0) {
      const platformMap: Record<string, string> = {
        'Direct Booking Site': 'direct-booking',
        'Airbnb': 'airbnb',
        'VRBO': 'vrbo',
        'Booking.com': 'booking-com',
        'Expedia': 'expedia',
      }
      const platformIds = filters.bookingPlatform
        .map((label) => platformMap[label] || label)
        .filter(Boolean)
        .map(id => encodeURIComponent(id))
      if (platformIds.length > 0) {
        params.set('platforms', platformIds.join(','))
      }
    }
    if (filters.locationRadius && filters.locationRadius !== DEFAULT_FILTER_STATE.locationRadius) {
      params.set('radius', encodeURIComponent(filters.locationRadius))
    }
    if (filters.specificFilters.length > 0) {
      const encodedFeatures = filters.specificFilters
        .filter(Boolean)
        .map(f => encodeURIComponent(f))
      if (encodedFeatures.length > 0) {
        params.set('features', encodedFeatures.join(','))
      }
    }
    if (filters.amenities.length > 0) {
      const encodedAmenities = filters.amenities
        .filter(Boolean)
        .map(a => encodeURIComponent(a))
      if (encodedAmenities.length > 0) {
        params.set('amenities', encodedAmenities.join(','))
      }
    }
    return params.toString()
  }, [filters])

  const handleBrowseStays = useCallback(() => {
    setIsNavigating(true)
    try {
      const queryString = buildQueryParams()
      const url = queryString ? `/results?${queryString}` : '/results'
      router.push(url)
      onOpenChange(false)
    } catch (error) {
      console.error('Error navigating to results:', error)
      setIsNavigating(false)
    }
  }, [buildQueryParams, router, onOpenChange])

  const propertyTypeValues = useMemo(() => {
    const mapping: Record<string, string> = {
      'Entire Home': 'entire-home',
      'Cabin': 'cabin',
      'Villa': 'villa',
      'Apartment/Condo': 'apartment',
      'Lodge': 'lodge',
      'Glamping': 'glamping',
      'Treehouse': 'treehouse',
      'Historic': 'historic',
      'Unique Stay': 'unique-stay',
    }
    return filters.propertyTypes.map(type => mapping[type] || type).filter(Boolean)
  }, [filters.propertyTypes])

  const locationRadiusValue = useMemo(() => {
    if (filters.locationRadius === 'Anywhere') {
      return 'anywhere'
    }
    const match = filters.locationRadius.match(/\d+/)
    return match ? match[0] : '50'
  }, [filters.locationRadius])

  const bookingPlatformIds = useMemo(() => {
    const platformMap: Record<string, string> = {
      'Direct Booking Site': 'direct-booking',
      'Airbnb': 'airbnb',
      'VRBO': 'vrbo',
      'Booking.com': 'booking-com',
      'Expedia': 'expedia',
    }
    return filters.bookingPlatform
      .map((label) => platformMap[label] || label)
      .filter(Boolean)
  }, [filters.bookingPlatform])

  useEffect(() => {
    if (open && filterCountAnnouncementRef.current) {
      const count = activeFilterCount
      if (count > 0) {
        filterCountAnnouncementRef.current.textContent = `${count} ${count === 1 ? 'filter' : 'filters'} applied`
      } else {
        filterCountAnnouncementRef.current.textContent = ''
      }
    }
  }, [activeFilterCount, open])

  if (!open) return null

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        
        {/* Modal Content - CUSTOM STYLING, NO RADIX CONSTRAINTS */}
        <DialogPrimitive.Content
          ref={modalRef}
          className={cn(
            "fixed top-1/2 left-1/2 z-50",
            "transform -translate-x-1/2 -translate-y-1/2",
            "bg-white rounded-xl border shadow-lg",
            "flex flex-col",
            // Mobile
            "w-screen h-screen p-5",
            // Tablet
            "md:w-[95vw] md:h-[80vh] md:p-4",
            // Desktop - EXPLICIT 4-COLUMN LAYOUT
            "min-[900px]:w-[1100px] min-[900px]:h-[650px] min-[900px]:p-0",
            "focus:outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
            "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
            "duration-300 ease-out"
          )}
          onEscapeKeyDown={(e) => {
            e.preventDefault()
            onOpenChange(false)
          }}
          onInteractOutside={(e) => {
            // Allow backdrop click
          }}
        >
          {/* Screen reader announcements */}
          <div
            ref={filterCountAnnouncementRef}
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          />
          
          {/* DialogTitle for accessibility */}
          <DialogPrimitive.Title className="sr-only">
            {dialogTitle}
          </DialogPrimitive.Title>
          
          {/* Header */}
          <div className="flex items-center justify-between px-7 py-3 md:px-4 md:py-2.5 max-md:p-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center gap-3">
              {experienceConfig?.icon && (
                <experienceConfig.icon 
                  className="h-5 w-5 text-[#2C5F7C] flex-shrink-0"
                  aria-hidden="true"
                />
              )}
              <h2 className="font-serif text-xl font-bold text-foreground m-0">
                {experienceConfig?.title ? `Filter ${experienceConfig.title}` : 'Filter Properties'}
              </h2>
            </div>
            <DialogPrimitive.Close asChild>
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/50 opacity-70 hover:opacity-100"
                aria-label="Close filter modal"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </DialogPrimitive.Close>
          </div>

          {/* Body - 4-COLUMN GRID */}
          <div className={cn(
            "flex-1 overflow-visible",
            "p-5 md:p-4",
            "min-[900px]:px-6 min-[900px]:py-6 min-[900px]:h-[calc(100%-120px)]"
          )}>
            <div 
              className={cn(
                "flex flex-col gap-6 w-full",
                "md:grid md:grid-cols-2 md:gap-6",
                // DESKTOP: FORCE 4 COLUMNS
                "min-[900px]:grid min-[900px]:grid-cols-4 min-[900px]:gap-5 min-[900px]:h-full"
              )}
              style={{
                ...(typeof window !== 'undefined' && window.innerWidth >= 900 
                  ? { gridTemplateColumns: 'repeat(4, 1fr)' } 
                  : {}),
              } as React.CSSProperties}
            >
              {/* Column 1 */}
              <div className="min-[900px]:col-span-1">
                <FilterModalColumn1
                  selectedExperiences={filters.specificFilters}
                  onExperiencesChange={(selected) =>
                    handleFilterChange('specificFilters', selected)
                  }
                />
              </div>
              
              {/* Column 2 */}
              <div className="min-[900px]:col-span-1">
                <FilterModalColumn2
                  selectedPropertyTypes={propertyTypeValues}
                  onPropertyTypesChange={(selected) => {
                    const typeMap: Record<string, string> = {
                      'entire-home': 'Entire Home',
                      'cabin': 'Cabin',
                      'villa': 'Villa',
                      'apartment': 'Apartment/Condo',
                      'lodge': 'Lodge',
                      'glamping': 'Glamping',
                      'treehouse': 'Treehouse',
                      'historic': 'Historic',
                      'unique-stay': 'Unique Stay',
                    }
                    const labels = selected.map((value) => typeMap[value] || value)
                    handleFilterChange('propertyTypes', labels)
                  }}
                  selectedLocationRadius={locationRadiusValue}
                  onLocationRadiusChange={(value) => {
                    const radiusMap: Record<string, string> = {
                      '10': 'Within 10 miles',
                      '25': 'Within 25 miles',
                      '50': 'Within 50 miles',
                      '100': 'Within 100 miles',
                      '250': 'Within 250 miles',
                      'anywhere': 'Anywhere',
                    }
                    handleFilterChange('locationRadius', radiusMap[value] || 'Within 50 miles')
                  }}
                />
              </div>
              
              {/* Column 3 */}
              <div className="min-[900px]:col-span-1">
                <FilterModalColumn3
                  guestCount={filters.guests}
                  onGuestCountChange={(value) => handleFilterChange('guests', value)}
                  priceRange={filters.priceRange}
                  onPriceRangeChange={(range) => handleFilterChange('priceRange', range)}
                />
              </div>
              
              {/* Column 4 */}
              <div className="min-[900px]:col-span-1">
                <FilterModalColumn4
                  selectedBookingPlatforms={bookingPlatformIds}
                  onBookingPlatformsChange={(selected) => {
                    const labelMap: Record<string, string> = {
                      'direct-booking': 'Direct Booking Site',
                      'airbnb': 'Airbnb',
                      'vrbo': 'VRBO',
                      'booking-com': 'Booking.com',
                      'expedia': 'Expedia',
                    }
                    const labels = selected.map((id) => labelMap[id] || id)
                    handleFilterChange('bookingPlatform', labels)
                  }}
                  selectedAmenities={filters.amenities}
                  onAmenitiesChange={(selected) => handleFilterChange('amenities', selected)}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-7 py-3 md:px-4 md:py-2.5 max-md:p-5 border-t border-gray-200 bg-gray-50/50 flex-shrink-0 max-md:flex-col max-md:gap-4 max-md:items-stretch">
            <div className="flex items-center gap-4 max-md:flex-col max-md:items-stretch max-md:gap-3">
              {activeFilterCount > 0 && (
                <span className="text-sm text-gray-600 max-md:text-center" aria-live="polite" aria-atomic="true">
                  {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} applied
                </span>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={handleClearAll}
                disabled={activeFilterCount === 0}
                className="px-4 py-2 text-sm font-medium min-h-[44px] max-md:w-full"
              >
                Clear All
              </Button>
            </div>
            <Button
              type="button"
              onClick={handleBrowseStays}
              disabled={isNavigating}
              className="px-6 py-2 text-sm font-medium text-white rounded-lg min-h-[44px] bg-[#2C5F7C] hover:bg-[#2C5F7C]/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/50 shadow-sm hover:shadow-md max-md:w-full max-md:justify-center disabled:opacity-70 disabled:cursor-wait"
            >
              {isNavigating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                  Loading...
                </>
              ) : (
                activeFilterCount > 0
                  ? `Browse Stays (${activeFilterCount})`
                  : 'Browse Stays'
              )}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}

