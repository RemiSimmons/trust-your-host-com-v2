"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GripVertical } from "lucide-react"
import type { Property } from "@/lib/types"
import { PropertyCard } from "@/components/home/featured-properties"
import { MapView } from "./map-view"
import { cn } from "@/lib/utils"

interface SplitViewProps {
  properties: Property[]
  stadiumCoords?: { lat: number; lng: number }
  radiusMiles?: number
  distanceFrom?: "stadium" | "city-center"
}

export function SplitView({
  properties,
  stadiumCoords,
  radiusMiles = 25,
  distanceFrom = "stadium",
}: SplitViewProps) {
  const [splitPosition, setSplitPosition] = useState(50) // Percentage
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return

    const container = e.currentTarget
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100

    // Constrain between 30% and 70%
    setSplitPosition(Math.max(30, Math.min(70, percentage)))
  }

  return (
    <div
      className="relative flex h-[calc(100vh-240px)] gap-0 overflow-hidden rounded-xl border-2 border-gray-200/60 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* List Panel */}
      <div
        className="relative overflow-hidden bg-white"
        style={{ width: `${splitPosition}%` }}
      >
        <div className="h-full overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-6">
            <AnimatePresence mode="popLayout">
              {properties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {properties.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No properties found</p>
            </div>
          )}
        </div>
      </div>

      {/* Draggable Divider */}
      <div
        className={cn(
          "relative w-2 cursor-col-resize bg-gray-200 hover:bg-accent transition-colors group z-10",
          isDragging && "bg-accent"
        )}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center">
          <div className="bg-white rounded-full p-2 shadow-lg border border-gray-200 group-hover:border-accent transition-colors">
            <GripVertical className="h-4 w-4 text-gray-400 group-hover:text-accent" />
          </div>
        </div>
      </div>

      {/* Map Panel */}
      <div
        className="relative overflow-hidden bg-gray-50"
        style={{ width: `${100 - splitPosition}%` }}
      >
        <div className="h-full flex items-start pt-0">
          <div className="w-full h-full">
            <MapView
              properties={properties}
              stadiumCoords={stadiumCoords}
              radiusMiles={radiusMiles}
              distanceFrom={distanceFrom}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
