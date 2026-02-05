"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, MapPin, Heart, ExternalLink, Check, Star, Trophy, ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Property } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { PropertyGallery } from "@/components/property/property-gallery"
import { PropertyCTA } from "@/components/property/property-cta"
import { AmenitiesList } from "@/components/property/amenities-list"
import { HouseRulesCard } from "@/components/property/house-rules-card"
import { RelatedProperties } from "@/components/property/related-properties"
import { LocationMap } from "@/components/property/location-map"
import { useFavorites } from "@/hooks/use-favorites"
import { useToast } from "@/hooks/use-toast"

interface PropertyDetailClientProps {
  property: Property
  relatedProperties: Property[]
}

export function PropertyDetailClient({ property, relatedProperties }: PropertyDetailClientProps) {
  const router = useRouter()
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const { isFavorite, toggleFavorite, isLoading } = useFavorites()
  const { toast } = useToast()

  const isSaved = isFavorite(property.id)

  useEffect(() => {
    // Track page view
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "property_detail_viewed", {
        property_id: property.id,
        property_slug: property.slug,
        fifa_city: property.is_fifa_2026,
        price: property.pricing.baseNightlyRate,
      })
    }
  }, [property])

  const handleSave = async () => {
    if (isLoading || isToggling) return
    
    setIsToggling(true)
    const { success, error } = await toggleFavorite(property.id)
    setIsToggling(false)

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else if (success) {
      toast({
        title: isSaved ? "Removed from favorites" : "Added to favorites",
        description: isSaved
          ? "Property has been removed from your saved list"
          : "Property has been saved to your favorites",
      })
    }
  }

  // Handle both string and object description formats
  const descriptionText = typeof property.description === 'string' 
    ? property.description 
    : (property.description?.full || property.description?.short || '')
  const descriptionWords = descriptionText.split(" ")
  const shouldTruncate = descriptionWords.length > 300

  return (
    <div className="bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              <Home className="h-4 w-4" />
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/search" className="hover:text-primary">
              Search
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/search?city=${property.location.city}`} className="hover:text-primary">
              {property.location.city}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate">{property.name}</span>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="bg-white border-b sticky top-[80px] z-30">
        <div className="container mx-auto px-6 py-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to search</span>
          </button>

          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {property.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="h-5 w-5" />
                  <span className="font-medium">
                    {property.location.city}, {property.location.state}
                  </span>
                </div>

                {property.distance_to_stadium && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-sm">
                      📍 {property.distance_to_stadium} mi to stadium
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-yellow-600">
                  <Star className="h-4 w-4 fill-yellow-600" />
                  <span className="font-semibold">{property.rating.average}</span>
                  <span className="text-gray-600">({property.rating.count} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {property.verified_badge && (
                  <div className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold flex items-center gap-1.5">
                    <Check className="h-4 w-4" />
                    Verified Property
                  </div>
                )}

                {property.fifa_featured && (
                  <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-bold flex items-center gap-1.5">
                    <Trophy className="h-4 w-4" />
                    FIFA 2026 Featured
                  </div>
                )}

                {property.quick_response_host && (
                  <div className="px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold flex items-center gap-1.5">
                    ⚡ Quick Response Host
                  </div>
                )}

                {property.typical_response_hours && (
                  <div className="px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold flex items-center gap-1.5">
                    ⏱️ Responds within {property.typical_response_hours === 1 ? '1 hour' : `${property.typical_response_hours} hours`}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={isLoading || isToggling}
              className={`p-3 rounded-full border-2 border-gray-300 hover:border-red-500 hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${isToggling ? "animate-pulse" : ""}`}
              aria-label={isSaved ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`h-6 w-6 ${isSaved ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <PropertyGallery images={property.images.slice(0, 10)} propertyName={property.name} />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
              <div className="text-gray-700 leading-relaxed">
                {shouldTruncate && !showFullDescription ? (
                  <>
                    <p>{descriptionWords.slice(0, 300).join(" ")}...</p>
                    <button
                      onClick={() => setShowFullDescription(true)}
                      className="text-accent font-semibold mt-2 hover:underline"
                    >
                      Read more
                    </button>
                  </>
                ) : (
                  <p>{descriptionText}</p>
                )}
              </div>
            </div>

            {/* Details Grid */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">🛏️</div>
                  <div className="font-semibold text-gray-900">{property.capacity.bedrooms}</div>
                  <div className="text-sm text-gray-600">Bedrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">🛁</div>
                  <div className="font-semibold text-gray-900">{property.capacity.bathrooms}</div>
                  <div className="text-sm text-gray-600">Bathrooms</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">👥</div>
                  <div className="font-semibold text-gray-900">{property.capacity.guests}</div>
                  <div className="text-sm text-gray-600">Max Guests</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">🏠</div>
                  <div className="font-semibold text-gray-900 capitalize">{property.propertyType}</div>
                  <div className="text-sm text-gray-600">Type</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <AmenitiesList amenities={property.amenities} />

            {/* Location */}
            <LocationMap property={property} />

            {/* House Rules */}
            <HouseRulesCard property={property} />
          </div>

          {/* Sidebar - Booking CTA */}
          <div className="lg:col-span-1">
            <PropertyCTA property={property} />
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <RelatedProperties properties={relatedProperties} />
          </div>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 p-4">
        <PropertyCTA property={property} compact />
      </div>
    </div>
  )
}
