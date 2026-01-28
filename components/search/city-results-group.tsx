"use client"

import { motion } from "framer-motion"
import { Trophy, MapPin } from "lucide-react"
import type { Property } from "@/lib/types"
import { PropertyCard } from "@/components/home/featured-properties"
import { fifaCities } from "@/lib/data/fifa-cities"

interface CityResultsGroupProps {
  cityId: string
  properties: Property[]
}

export function CityResultsGroup({ cityId, properties }: CityResultsGroupProps) {
  const cityData = fifaCities.find(c => c.id === cityId)
  
  if (!cityData || properties.length === 0) return null

  return (
    <div className="mb-12">
      {/* City Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{cityData.emoji}</span>
            <div>
              <h2 className="text-2xl font-bold">{cityData.displayName}</h2>
              <p className="text-white/80 text-sm">{cityData.stadium.officialName}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>{cityData.stadium.matchesHosted} matches</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{properties.length} properties</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {properties.map((property) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
