"use client"

import { useState, useRef, lazy, Suspense, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import {
  Mountain,
  Home,
  Palmtree,
  Building2,
  Waves,
  TreePine,
  Shield,
  Tent,
  Grape,
  Baby,
  Music,
  Castle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { getExperienceConfigByTitle } from "@/lib/config/experience-config"

// Lazy load the modal for better performance
const FilterModal = lazy(() =>
  import("@/components/search/filter-modal").then((mod) => ({
    default: mod.FilterModal,
  }))
)

const categories = [
  {
    icon: Mountain,
    title: "Mountain Retreats",
    description: "Escape to elevated retreats with panoramic vistas",
    image: "/mountain-cabin-retreat-scenic-view.jpg",
  },
  {
    icon: Waves,
    title: "Beachfront Paradise",
    description: "Discover paradise with sand, surf, and solitude",
    image: "/luxury-beachfront-villa-ocean-view.jpg",
  },
  {
    icon: Building2,
    title: "Urban Adventures",
    description: "Experience vibrant city life in modern spaces",
    image: "/modern-urban-loft-city-skyline.jpg",
  },
  {
    icon: TreePine,
    title: "Forest Getaways",
    description: "Immerse yourself in nature with trails at your doorstep",
    image: "/forest-cabin-surrounded-trees.jpg",
  },
  {
    icon: Palmtree,
    title: "Tropical Escapes",
    description: "Savor island living with palm-lined beaches",
    image: "/tropical-villa-palm-trees-pool.jpg",
  },
  {
    icon: Home,
    title: "Country Homes",
    description: "Find peace in rustic farmhouses and rolling hills",
    image: "/country-farmhouse-rolling-hills.jpg",
  },
  {
    icon: Shield,
    title: "Private Sanctuaries",
    description: "Experience ultimate seclusion in gated luxury estates",
    image: "/luxury-private-estate-with-gates-and-garden.jpg",
  },
  {
    icon: Tent,
    title: "Adventure & Outdoor Recreation",
    description: "Thrilling outdoor activities at your doorstep",
    image: "/adventure-cabin-with-hiking-and-outdoor-recreation.jpg",
  },
  {
    icon: Grape,
    title: "Vineyard and Agritourism",
    description: "Farm-to-table experiences and wine country charm",
    image: "/vineyard-villa-with-wine-cellar-and-grape-fields.jpg",
  },
  {
    icon: Baby,
    title: "Family-Friendly Homes",
    description: "Spacious properties designed for multi-generational travel",
    image: "/large-family-vacation-home-with-playground-and-poo.jpg",
  },
  {
    icon: Music,
    title: "Festival and Event Destinations",
    description: "Stay close to concerts, fairs, and cultural celebrations",
    image: "/modern-home-near-festival-grounds-and-event-venues.jpg",
  },
  {
    icon: Castle,
    title: "Unique and Themed Stays",
    description: "Unforgettable experiences in treehouses, castles, and more",
    image: "/unique-treehouse-or-castle-themed-vacation-rental.jpg",
  },
]

const CARD_WIDTH = 288
const GAP = 20
const SCROLL_AMOUNT = CARD_WIDTH + GAP

export function ExperienceCategories() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<string>("")
  const [initialFilters, setInitialFilters] = useState<Partial<any>>({})
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const scrollRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Duplicate categories for infinite scroll effect
  const infiniteCategories = [...categories, ...categories, ...categories]

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({
      left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    })
  }, [])

  // Start in the middle copy so infinite scroll works both directions
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollLeft = el.scrollWidth / 3
  }, [])

  // Infinite scroll: reset position when reaching edge copies
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
      scrollTimeoutRef.current = setTimeout(() => {
        const { scrollLeft, scrollWidth } = el
        const third = scrollWidth / 3
        if (scrollLeft >= third * 2 - 10) {
          el.scrollLeft = third
        } else if (scrollLeft <= 10) {
          el.scrollLeft = third * 2 - 1
        }
        scrollTimeoutRef.current = null
      }, 150)
    }

    el.addEventListener("scroll", handleScroll)
    return () => {
      el.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  const handleCardClick = (category: typeof categories[0], index: number) => {
    const config = getExperienceConfigByTitle(category.title)
    
    if (!config) {
      console.warn(`No experience config found for: ${category.title}`)
      return
    }

    // Set experience key and initial filters
    setSelectedExperience(config.key)
    setInitialFilters({
      ...config.filterPreset,
      specificFilters: config.defaultFeatures,
    })
    
    // Store ref for focus restoration
    const cardElement = cardRefs.current[index]
    if (cardElement) {
      cardElement.focus()
    }
    
    // Open modal with smooth animation
    setModalOpen(true)
  }

  return (
    <>
      <section id="experiences" className="py-14 pb-36 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3 text-balance drop-shadow-md">
              Explore by Experience
            </h2>
            <p className="text-base text-white/80 max-w-2xl mx-auto text-balance drop-shadow-sm">
              Find the perfect setting for your next adventure
            </p>
          </div>

          <div className="relative">
            {/* Scroll buttons */}
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-gray-800 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-gray-800 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-4 px-4 sm:px-12 scrollbar-hide"
              style={{ scrollSnapType: "x mandatory" }}
            >
            {infiniteCategories.map((category, index) => {
              const Icon = category.icon
              const originalIndex = index % categories.length
              return (
                <motion.div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[originalIndex] = el
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Filter by ${category.title}`}
                  onClick={() => handleCardClick(category, originalIndex)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleCardClick(category, originalIndex)
                    }
                  }}
                  className="group relative flex-shrink-0 snap-center aspect-[4/5] overflow-hidden rounded-xl cursor-pointer
                             border border-white/20 
                             shadow-[0_8px_30px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)]
                             hover:shadow-[0_20px_60px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.4)]
                             backdrop-blur-sm w-[288px] min-w-[288px]
                             focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent
                             transition-all duration-300"
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  {/* Background image - full coverage */}
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Gradient overlay - bottom only, top stays pure image */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 35%, transparent 60%)",
                    }}
                  />

                  {/* Content - bottom overlay only */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
                    {/* Category name - large, dramatic */}
                    <h3 className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl text-white font-bold mb-1.5 drop-shadow-2xl line-clamp-2">{category.title}</h3>

                    {/* Hover: Additional context fades in */}
                    <p className="text-white/90 text-xs sm:text-sm mt-1.5 sm:mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
            </div>
          </div>

          {/* Experience links - internal linking for SEO */}
          <div className="mt-6 text-center">
            <p className="text-white/80 text-sm mb-3">Browse by experience:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const config = getExperienceConfigByTitle(category.title)
                if (!config) return null
                return (
                  <Link
                    key={config.key}
                    href={`/results?experience=${config.key}`}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                  >
                    {category.title}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        {modalOpen && (
          <FilterModal
            open={modalOpen}
            onOpenChange={setModalOpen}
            experience={selectedExperience}
            initialFilters={initialFilters}
            triggerElementRef={cardRefs.current[0] ? { current: cardRefs.current[0] } : undefined}
          />
        )}
      </Suspense>
    </>
  )
}
