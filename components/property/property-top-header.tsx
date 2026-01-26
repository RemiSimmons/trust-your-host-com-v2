"use client"

import Link from "next/link"
import { ArrowLeft, Phone, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/types"

interface PropertyTopHeaderProps {
  property: Property
  totalProperties: number
}

export function PropertyTopHeader({ property, totalProperties }: PropertyTopHeaderProps) {
  const fullAddress = `${property.location.city}, ${property.location.state} ${property.location.country}`
  
  return (
    <div className="bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-semibold hidden sm:inline">Back to All Properties</span>
            <span className="text-sm font-semibold sm:hidden">Back</span>
          </Link>

          {/* Property Count */}
          <div className="text-sm text-gray-600 font-medium">
            {totalProperties}+ Properties
          </div>

          {/* Call Me & Menu */}
          <div className="flex items-center gap-4">
            <a
              href="tel:8302714538"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm font-medium">Call Me</span>
              <span className="text-sm text-gray-600">830.271.4538</span>
            </a>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Property Address & Price */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
          {property.name}
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 mb-4 font-sans">
          {fullAddress}
        </p>
        <p className="text-4xl sm:text-5xl font-bold text-gray-900 font-sans">
          ${property.pricing.baseNightlyRate.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

