"use client"

import { useState, useEffect } from "react"
import { X, MapPin, Star, Bed, Bath, Users, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Property } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface QuickViewModalProps {
  property: Property
  isOpen: boolean
  onClose: () => void
}

export function QuickViewModal({ property, isOpen, onClose }: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Close on ESC key and prevent body scroll
  useEffect(() => {
    if (!isOpen) return

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyPress)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [isOpen, onClose])

  // Early return after all hooks
  if (!isOpen) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  const handleBookingClick = () => {
    if (property.external_booking_url) {
      window.open(property.external_booking_url, "_blank", "noopener,noreferrer")
    }
  }

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      style={{ pointerEvents: "auto" }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-serif text-2xl font-bold text-gray-900 pr-8">Quick View</h2>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 group">
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={`${property.name} - Photo ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Image Navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 px-3 py-1 rounded-full text-white text-xs">
                    {currentImageIndex + 1} / {property.images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            {property.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {property.images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      currentImageIndex === index ? "ring-2 ring-accent" : ""
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {property.verified_badge && (
                <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  ✓ Verified
                </div>
              )}
              {property.fifa_featured && (
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold">
                  🏆 FIFA Featured
                </div>
              )}
              {property.quick_response_host && (
                <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                  ⚡ Quick Response
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-4">
            {/* Title & Location */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                {property.name}
              </h3>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <MapPin className="h-4 w-4" />
                <span>{property.location.city}, {property.location.state}</span>
              </div>
              {property.distance_to_stadium && (
                <div className="text-sm text-gray-600">
                  📍 {property.distance_to_stadium} mi to stadium
                </div>
              )}
              <div className="flex items-center gap-2 mt-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{property.rating.average}</span>
                <span className="text-gray-600 text-sm">({property.rating.count} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(property.pricing.baseNightlyRate)}
                </span>
                <span className="text-gray-600">/ night</span>
              </div>
              {property.pricing.cleaningFee && (
                <div className="text-sm text-gray-600 mt-1">
                  + {formatCurrency(property.pricing.cleaningFee)} cleaning fee
                </div>
              )}
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bed className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                <div className="font-semibold text-sm">{property.capacity.bedrooms}</div>
                <div className="text-xs text-gray-600">Bedrooms</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Bath className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                <div className="font-semibold text-sm">{property.capacity.bathrooms}</div>
                <div className="text-xs text-gray-600">Bathrooms</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Users className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                <div className="font-semibold text-sm">{property.capacity.guests}</div>
                <div className="text-xs text-gray-600">Guests</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">About</h4>
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                {typeof property.description === 'string' 
                  ? property.description 
                  : (property.description?.short || property.description?.full || '')}
              </p>
            </div>

            {/* Key Highlights */}
            {property.quickHighlights.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Highlights</h4>
                <ul className="space-y-1">
                  {property.quickHighlights.slice(0, 3).map((highlight, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4">
              <Button
                onClick={handleBookingClick}
                className="w-full bg-accent hover:bg-accent/90 text-white py-6 text-base"
              >
                <span>Visit Website to Book</span>
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>

            {/* Host Info */}
            <div className="border-t pt-4">
              <div className="flex items-center gap-3">
                <img
                  src={property.host.photo}
                  alt={property.host.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-gray-900">{property.host.name}</div>
                  <div className="text-xs text-gray-600">{property.host.responseTime}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
