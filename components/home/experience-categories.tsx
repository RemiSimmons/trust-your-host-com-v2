"use client"

import { useState, useRef, lazy, Suspense } from "react"
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
} from "lucide-react"
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
    count: "2,400+ properties",
    image: "/mountain-cabin-retreat-scenic-view.jpg",
  },
  {
    icon: Waves,
    title: "Beachfront Paradise",
    description: "Discover paradise with sand, surf, and solitude",
    count: "1,800+ properties",
    image: "/luxury-beachfront-villa-ocean-view.jpg",
  },
  {
    icon: Building2,
    title: "Urban Adventures",
    description: "Experience vibrant city life in modern spaces",
    count: "3,200+ properties",
    image: "/modern-urban-loft-city-skyline.jpg",
  },
  {
    icon: TreePine,
    title: "Forest Getaways",
    description: "Immerse yourself in nature with trails at your doorstep",
    count: "1,500+ properties",
    image: "/forest-cabin-surrounded-trees.jpg",
  },
  {
    icon: Palmtree,
    title: "Tropical Escapes",
    description: "Savor island living with palm-lined beaches",
    count: "900+ properties",
    image: "/tropical-villa-palm-trees-pool.jpg",
  },
  {
    icon: Home,
    title: "Country Homes",
    description: "Find peace in rustic farmhouses and rolling hills",
    count: "1,200+ properties",
    image: "/country-farmhouse-rolling-hills.jpg",
  },
  {
    icon: Shield,
    title: "Private Sanctuaries",
    description: "Experience ultimate seclusion in gated luxury estates",
    count: "850+ properties",
    image: "/luxury-private-estate-with-gates-and-garden.jpg",
  },
  {
    icon: Tent,
    title: "Adventure & Outdoor Recreation",
    description: "Thrilling outdoor activities at your doorstep",
    count: "1,650+ properties",
    image: "/adventure-cabin-with-hiking-and-outdoor-recreation.jpg",
  },
  {
    icon: Grape,
    title: "Vineyard and Agritourism",
    description: "Farm-to-table experiences and wine country charm",
    count: "720+ properties",
    image: "/vineyard-villa-with-wine-cellar-and-grape-fields.jpg",
  },
  {
    icon: Baby,
    title: "Family-Friendly Homes",
    description: "Spacious properties designed for multi-generational travel",
    count: "2,100+ properties",
    image: "/large-family-vacation-home-with-playground-and-poo.jpg",
  },
  {
    icon: Music,
    title: "Festival and Event Destinations",
    description: "Stay close to concerts, fairs, and cultural celebrations",
    count: "940+ properties",
    image: "/modern-home-near-festival-grounds-and-event-venues.jpg",
  },
  {
    icon: Castle,
    title: "Unique and Themed Stays",
    description: "Unforgettable experiences in treehouses, castles, and more",
    count: "560+ properties",
    image: "/unique-treehouse-or-castle-themed-vacation-rental.jpg",
  },
]

export function ExperienceCategories() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState<string>("")
  const [initialFilters, setInitialFilters] = useState<Partial<any>>({})
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({})

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
      <section id="experiences" className="py-20 pb-48 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4 text-balance drop-shadow-md">
              Explore by Experience
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto text-balance drop-shadow-sm">
              Find the perfect setting for your next adventure
            </p>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4
                         md:grid md:grid-cols-3 md:overflow-visible md:mx-0 md:px-0 md:gap-6
                         lg:grid-cols-4
                         scrollbar-hide">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Filter by ${category.title}`}
                  onClick={() => handleCardClick(category, index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleCardClick(category, index)
                    }
                  }}
                  className="group relative min-w-[260px] sm:min-w-[280px] flex-shrink-0 snap-center aspect-[4/5] overflow-hidden rounded-xl cursor-pointer 
                             md:min-w-0 md:flex-shrink md:aspect-[3/4]
                             border border-white/20 
                             shadow-[0_8px_30px_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.3)]
                             hover:shadow-[0_20px_60px_rgba(255,255,255,0.15),0_8px_20px_rgba(0,0,0,0.4)]
                             backdrop-blur-sm
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

                  {/* Gradient overlay - dramatic bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  {/* Content - bottom overlay only */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                    {/* Category name - large, dramatic */}
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold mb-2 drop-shadow-2xl line-clamp-2">{category.title}</h3>

                    {/* Property count - subtle */}
                    <p className="text-white/80 text-xs sm:text-sm drop-shadow-md flex items-center gap-1">
                      <Home className="h-3 w-3 sm:h-4 sm:w-4" />
                      {category.count}
                    </p>

                    {/* Hover: Additional context fades in */}
                    <p className="text-white/90 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
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
