"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { createPortal } from "react-dom"
import { useRouter } from "next/navigation"
import { X, Loader2 } from "lucide-react"
import { FilterModalColumn1 } from "./filter-modal-column-1"
import { FilterModalColumn2 } from "./filter-modal-column-2"
import { FilterModalColumn3 } from "./filter-modal-column-3"
import { FilterModalColumn4 } from "./filter-modal-column-4"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getExperienceConfig } from "@/lib/config/experience-config"
import type { FilterState } from "@/lib/types"

export type { FilterState }

const DEFAULT_FILTER_STATE: FilterState = {
  experience: '',
  guests: 2,
  priceRange: [50, 500],
  propertyTypes: [],
  bookingPlatform: [],
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
  const [isNavigating, setIsNavigating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Mount check for SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle open/close animations
  useEffect(() => {
    if (open) {
      setIsAnimating(true)
      previousActiveElementRef.current = document.activeElement as HTMLElement
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
    } else if (isVisible) {
      setIsVisible(false)
      const timer = setTimeout(() => {
        setIsAnimating(false)
        setIsNavigating(false)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [open, isVisible])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = `${scrollbarWidth}px`
      return () => {
        document.body.style.overflow = originalOverflow
        document.body.style.paddingRight = ""
      }
    }
  }, [open])

  // Focus first focusable element when modal opens
  useEffect(() => {
    if (open && isVisible && modalRef.current) {
      const timer = setTimeout(() => {
        const closeButton = modalRef.current?.querySelector<HTMLElement>('[aria-label="Close filter modal"]')
        closeButton?.focus()
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [open, isVisible])

  // Return focus when modal closes
  useEffect(() => {
    if (!open && !isAnimating) {
      const elementToFocus = triggerElementRef?.current || previousActiveElementRef.current
      elementToFocus?.focus()
    }
  }, [open, isAnimating, triggerElementRef])

  // ESC key handler
  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onOpenChange(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, onOpenChange])

  // Focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !modalRef.current) return

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const focusableArray = Array.from(focusableElements).filter(el => !el.hasAttribute('disabled'))
    if (focusableArray.length === 0) return

    const firstElement = focusableArray[0]
    const lastElement = focusableArray[focusableArray.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }, [])

  // Get experience config
  const experienceConfig = useMemo(() => {
    if (!experience) return null
    return getExperienceConfig(experience)
  }, [experience])

  const dialogTitle = useMemo(() => {
    return experienceConfig?.title 
      ? `Filter ${experienceConfig.title}` 
      : 'Filter Properties'
  }, [experienceConfig?.title])

  // Initialize state
  const [filters, setFilters] = useState<FilterState>(() => {
    const baseState = { ...DEFAULT_FILTER_STATE, experience }
    if (initialFilters) {
      let propertyTypes = initialFilters.propertyTypes || []
      if (!propertyTypes.length && (initialFilters as any).propertyType) {
        propertyTypes = [(initialFilters as any).propertyType]
      }
      return {
        ...baseState,
        ...initialFilters,
        propertyTypes,
        specificFilters: initialFilters.specificFilters || [],
        amenities: initialFilters.amenities || [],
        bookingPlatform: initialFilters.bookingPlatform || DEFAULT_FILTER_STATE.bookingPlatform,
        priceRange: initialFilters.priceRange || DEFAULT_FILTER_STATE.priceRange,
      } as FilterState
    }
    return baseState
  })

  // Update filters when experience changes
  useEffect(() => {
    if (open && experience) {
      const config = getExperienceConfig(experience)
      if (config) {
        let propertyTypes = initialFilters?.propertyTypes || []
        if (!propertyTypes.length && (initialFilters as any)?.propertyType) {
          propertyTypes = [(initialFilters as any).propertyType]
        } else if (!propertyTypes.length && config.filterPreset.propertyType) {
          propertyTypes = [config.filterPreset.propertyType as string]
        }
        setFilters((prev) => ({
          ...prev,
          experience,
          ...initialFilters,
          propertyTypes,
          specificFilters: initialFilters?.specificFilters || config.defaultFeatures || [],
        } as FilterState))
      }
    }
  }, [experience, open, initialFilters])

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.experience) count++
    if (filters.guests !== DEFAULT_FILTER_STATE.guests) count++
    if (filters.priceRange[0] !== DEFAULT_FILTER_STATE.priceRange[0] || 
        filters.priceRange[1] !== DEFAULT_FILTER_STATE.priceRange[1]) count++
    if (filters.propertyTypes.length > 0) count++
    if (filters.locationRadius !== DEFAULT_FILTER_STATE.locationRadius) count++
    if (filters.specificFilters.length > 0) count++
    if (filters.amenities.length > 0) count++
    return count
  }, [filters])

  // Handle filter changes
  const handleFilterChange = useCallback((key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  // Clear all filters
  const handleClearAll = useCallback(() => {
    setFilters({
      ...DEFAULT_FILTER_STATE,
      experience: filters.experience,
      propertyTypes: [],
      bookingPlatform: [],
    })
  }, [filters.experience])

  // Build URL query params
  const buildQueryParams = useCallback(() => {
    const params = new URLSearchParams()

    if (filters.experience) {
      params.set('experience', encodeURIComponent(filters.experience))
    }
    if (filters.guests !== DEFAULT_FILTER_STATE.guests) {
      params.set('guests', filters.guests.toString())
    }
    if (filters.priceRange[0] !== DEFAULT_FILTER_STATE.priceRange[0] ||
        filters.priceRange[1] !== DEFAULT_FILTER_STATE.priceRange[1]) {
      params.set('minPrice', filters.priceRange[0].toString())
      params.set('maxPrice', filters.priceRange[1].toString())
    }
    if (filters.propertyTypes.length > 0) {
      params.set('propertyTypes', filters.propertyTypes.map(t => encodeURIComponent(t)).join(','))
    }
    if (filters.locationRadius !== DEFAULT_FILTER_STATE.locationRadius) {
      params.set('radius', encodeURIComponent(filters.locationRadius))
    }
    if (filters.specificFilters.length > 0) {
      params.set('features', filters.specificFilters.map(f => encodeURIComponent(f)).join(','))
    }
    if (filters.amenities.length > 0) {
      params.set('amenities', filters.amenities.map(a => encodeURIComponent(a)).join(','))
    }

    return params.toString()
  }, [filters])

  // Handle browse stays
  const handleBrowseStays = useCallback(() => {
    setIsNavigating(true)
    const queryString = buildQueryParams()
    const url = queryString ? `/results?${queryString}` : '/results'
    router.push(url)
    onOpenChange(false)
  }, [buildQueryParams, router, onOpenChange])

  // Map property types
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

  // Map location radius
  const locationRadiusValue = useMemo(() => {
    if (filters.locationRadius === 'Anywhere') return 'anywhere'
    const match = filters.locationRadius.match(/\d+/)
    return match ? match[0] : '50'
  }, [filters.locationRadius])

  // Handle backdrop click
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onOpenChange(false)
    }
  }, [onOpenChange])

  // Don't render on server or if not animating/open
  if (!mounted || (!open && !isAnimating)) return null

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onKeyDown={handleKeyDown}
    >
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        className={cn(
          "absolute inset-0 bg-black/70 backdrop-blur-sm",
          "transition-opacity duration-200 ease-out",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        aria-hidden="true"
      />

      {/* Modal - Square proportions, compact, 4-column grid */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-modal-title"
        className={cn(
          "relative flex flex-col",
          "bg-white dark:bg-zinc-900",
          "shadow-2xl overflow-hidden rounded-xl",
          "transition-all duration-300 ease-out",
          isVisible 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 translate-y-8 scale-95"
        )}
        style={{
          width: 'min(960px, 95vw)',
          height: 'min(600px, 90vh)',
        }}
      >
        {/* Header - Compact */}
        <header className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-2">
            {experienceConfig?.icon && (
              <experienceConfig.icon 
                className="h-5 w-5 text-[#2C5F7C] flex-shrink-0"
                aria-hidden="true"
              />
            )}
            <h2 
              id="filter-modal-title"
              className="font-serif text-lg font-bold text-foreground"
            >
              {dialogTitle}
            </h2>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              "text-gray-500 hover:text-gray-900 dark:hover:text-gray-100",
              "hover:bg-gray-100 dark:hover:bg-zinc-800",
              "transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2C5F7C]"
            )}
            aria-label="Close filter modal"
            type="button"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </header>

        {/* Body - TRUE 4-column grid, compact spacing */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5">
          <div 
            className="grid gap-4 items-start auto-rows-min"
            style={{
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            }}
          >
            {/* Column 1: Experience Features */}
            <div className="min-w-0">
              <FilterModalColumn1
                selectedExperiences={filters.specificFilters}
                onExperiencesChange={(selected) => handleFilterChange('specificFilters', selected)}
                experienceKey={filters.experience}
              />
            </div>
            
            {/* Column 2: Property Type, Location */}
            <div className="min-w-0">
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
                  handleFilterChange('propertyTypes', selected.map((v) => typeMap[v] || v))
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
            
            {/* Column 3: Guests, Price Range */}
            <div className="min-w-0">
              <FilterModalColumn3
                guestCount={filters.guests}
                onGuestCountChange={(value) => handleFilterChange('guests', value)}
                priceRange={filters.priceRange}
                onPriceRangeChange={(range) => handleFilterChange('priceRange', range)}
              />
            </div>
            
            {/* Column 4: Amenities */}
            <div className="min-w-0">
              <FilterModalColumn4
                selectedAmenities={filters.amenities}
                onAmenitiesChange={(selected) => handleFilterChange('amenities', selected)}
              />
            </div>
          </div>
        </div>

        {/* Footer - Compact */}
        <footer className={cn(
          "flex-shrink-0 flex items-center justify-between",
          "px-5 py-3 border-t border-gray-200 dark:border-zinc-700",
          "bg-gray-50/80 dark:bg-zinc-800/50",
          "max-md:flex-col max-md:gap-3"
        )}>
          <div className="flex items-center gap-3 max-md:w-full max-md:justify-between">
            {activeFilterCount > 0 && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} applied
              </span>
            )}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClearAll}
              disabled={activeFilterCount === 0}
              className={cn(
                "text-sm",
                activeFilterCount === 0 && "opacity-50 cursor-not-allowed"
              )}
            >
              Clear All
            </Button>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleBrowseStays}
            disabled={isNavigating}
            className={cn(
              "px-5 text-sm font-medium text-white",
              "bg-[#2C5F7C] hover:bg-[#2C5F7C]/90",
              "shadow-sm hover:shadow-md",
              "max-md:w-full",
              "disabled:opacity-70 disabled:cursor-wait"
            )}
          >
            {isNavigating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                Loading...
              </>
            ) : (
              activeFilterCount > 0 ? `Browse Stays (${activeFilterCount})` : 'Browse Stays'
            )}
          </Button>
        </footer>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
