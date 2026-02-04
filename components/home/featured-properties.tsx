"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, MapPin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import type { Property } from "@/lib/types"
import { QuickViewModal } from "@/components/property/quick-view-modal"
import { FavoriteButton } from "@/components/favorites/favorite-button"

export function PropertyCard({ property }: { property: Property }) {
  const [showQuickView, setShowQuickView] = useState(false)
  
  return (
    <>
    <div
      className="group relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer
                border border-gray-200/60
                shadow-[0_8px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
                hover:-translate-y-2
                transition-all duration-300"
    >
      {/* Full-bleed image */}
      <div className="relative w-full h-full">
        <img
          src={property.images[0] || "/placeholder.svg"}
          alt={property.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Favorite button */}
      <div className="absolute top-4 right-4 z-20">
        <FavoriteButton propertyId={property.id} variant="card" />
      </div>

      {/* Trust Badges - Top Left */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {/* Verified Badge */}
        {property.verified_badge && (
          <div className="px-3 py-1 rounded-full bg-green-600/90 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
            <Check className="h-3 w-3" />
            Verified
          </div>
        )}
        
        {/* FIFA Featured */}
        {property.fifa_featured && (
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 shadow-lg">
            🏆 FIFA Featured
          </div>
        )}
        
        {/* Quick Response Host */}
        {property.quick_response_host && (
          <div className="px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
            ⚡ Quick Response
          </div>
        )}
      </div>

      {/* DEFAULT STATE: Minimal text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        {/* Title + Price (same row) */}
        <div className="flex items-start justify-between mb-2 gap-4">
          <h3 className="font-serif text-2xl text-white font-bold drop-shadow-lg flex-1 line-clamp-1">
            {property.name}
          </h3>
          <p className="text-white font-bold text-xl drop-shadow-lg whitespace-nowrap shrink-0">
            {formatCurrency(property.pricing.baseNightlyRate)}
            <span className="text-white/80 text-sm font-normal"> / night</span>
          </p>
        </div>

        {/* Location + Category (same row) */}
        <div className="flex items-center justify-between gap-4 mb-2">
          <p className="text-white/90 text-sm flex items-center gap-1 drop-shadow-md">
            <MapPin className="h-4 w-4" />
            {property.location.city}, {property.location.state || property.location.country}
          </p>
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs whitespace-nowrap shadow-md">
            {property.experiences[0]}
          </span>
        </div>

        {/* Trust Signals - Popularity & Proximity */}
        <div className="flex items-center gap-3 text-white/80 text-xs">
          {/* Weekly Views */}
          {property.weekly_views && property.weekly_views > 0 && (
            <span className="flex items-center gap-1">
              👀 {property.weekly_views} views this week
            </span>
          )}
          
          {/* Distance to Stadium */}
          {property.distance_to_stadium && (
            <span className="flex items-center gap-1">
              📍 {property.distance_to_stadium} mi to stadium
            </span>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6 z-30 backdrop-blur-sm">
        <div className="w-full text-white">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">
              {property.rating.average.toFixed(1)} ({property.rating.count} reviews)
            </span>
          </div>

          {/* All experience tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {property.experiences.map((exp) => (
              <span
                key={exp}
                className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs shadow-md"
              >
                {exp}
              </span>
            ))}
          </div>

          {/* Quick highlights */}
          <ul className="space-y-1 mb-4 text-sm">
            {property.quickHighlights.slice(0, 3).map((highlight, i) => (
              <li key={i} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-tight">{highlight}</span>
              </li>
            ))}
          </ul>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setShowQuickView(true)
              }}
              className="flex-1 bg-accent text-white py-3 px-4 rounded-lg hover:bg-accent/80 transition-colors text-sm font-medium shadow-lg"
            >
              Quick View
            </button>
            <Link
              href={`/properties/${property.slug}`}
              className="flex-1 text-center bg-gray-50 border-2 border-accent text-accent py-3 px-4 rounded-lg hover:bg-accent/10 hover:border-accent transition-colors text-sm font-medium shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

    </div>
    
    {/* Quick View Modal - Outside card container to prevent hover conflicts */}
    <QuickViewModal
      property={property}
      isOpen={showQuickView}
      onClose={() => setShowQuickView(false)}
    />
    </>
  )
}

export function FeaturedProperties({ properties }: { properties: Property[] }) {
  const featuredProperties = properties.slice(0, 6)

  return (
    <section className="relative z-20 -mt-32 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-bold mb-4">
            Handpicked for You
          </h2>
          <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto">
            Every property is personally vetted and approved
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {featuredProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            asChild
            className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300 shadow-md hover:shadow-lg bg-transparent"
          >
            <Link href="/search">Explore All Properties</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
