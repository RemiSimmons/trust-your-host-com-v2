"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SlidersHorizontal, X } from "lucide-react"
import type { Property } from "@/lib/types"
import { PropertyCard } from "@/components/home/featured-properties"
import { FilterSidebar } from "@/components/search/filter-sidebar"
import { filterProperties, sortProperties, INITIAL_FILTERS, type FilterState } from "@/lib/utils/search"
import { Button } from "@/components/ui/button"

interface SearchPageClientProps {
  initialProperties: Property[]
}

export function SearchPageClient({ initialProperties }: SearchPageClientProps) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [sortBy, setSortBy] = useState("relevance")
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const filteredProperties = useMemo(() => {
    const filtered = filterProperties(initialProperties, filters)
    return sortProperties(filtered, sortBy)
  }, [initialProperties, filters, sortBy])

  const activeFilterCount =
    filters.experiences.length +
    filters.propertyTypes.length +
    filters.amenities.length +
    (filters.bedrooms > 0 ? 1 : 0) +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.petFriendly ? 1 : 0)

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      {/* Top Bar */}
      <div className="sticky top-[72px] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 py-4 mb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left: Results count + active filters */}
            <div className="flex items-center gap-4">
              <p className="text-gray-700 font-medium">
                Showing {filteredProperties.length} of {initialProperties.length} properties
              </p>

              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                size="sm"
                className="md:hidden ml-auto bg-transparent"
                onClick={() => setIsMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </div>

            {/* Right: Sort dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 hidden md:inline">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 bg-white text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content area with fade effect at top */}
      <div className="relative">
        {/* Fade overlay that sits below the sticky nav */}
        <div 
          className="pointer-events-none absolute inset-x-0 top-0 h-16 z-20"
          style={{
            background: "linear-gradient(to bottom, rgb(249 250 251) 0%, rgb(249 250 251 / 0.8) 40%, transparent 100%)"
          }}
        />
        
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-80 shrink-0 sticky top-[140px] h-[calc(100vh-160px)]">
              <FilterSidebar filters={filters} setFilters={setFilters} />
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Property Grid */}
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredProperties.map((property) => (
                    <motion.div
                      key={property.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Empty State */}
              {filteredProperties.length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="font-serif text-2xl text-gray-900 mb-2">No properties found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
                  <Button onClick={() => setFilters(INITIAL_FILTERS)} variant="outline">
                    Clear all filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 h-[85vh] bg-white z-50 rounded-t-2xl flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="font-serif text-xl font-bold">Filters</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileFiltersOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  className="border-none shadow-none p-0 h-auto"
                />
              </div>

              <div className="p-4 border-t border-gray-200 bg-white pb-8">
                <Button className="w-full" size="lg" onClick={() => setIsMobileFiltersOpen(false)}>
                  Show {filteredProperties.length} Properties
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
