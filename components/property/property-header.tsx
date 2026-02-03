import { MapPin, Star, ShieldCheck, Share2 } from "lucide-react"
import type { Property } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { FavoriteButton } from "@/components/favorites/favorite-button"

interface PropertyHeaderProps {
  property: Property
}

export function PropertyHeader({ property }: PropertyHeaderProps) {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary font-bold leading-tight">
          {property.name}
        </h1>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <FavoriteButton propertyId={property.id} variant="header" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-700">
        <div className="flex items-center gap-1 hover:underline cursor-pointer font-medium">
          <MapPin className="h-4 w-4 md:h-5 md:w-5 text-gray-500" />
          <span>
            {property.location.city}, {property.location.state}
          </span>
        </div>

        <span className="hidden md:inline text-gray-300">|</span>

        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 md:h-5 md:w-5 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-gray-900">{property.rating.average}</span>
          <span className="text-gray-500 underline cursor-pointer">({property.rating.count} reviews)</span>
        </div>

        {property.verified && (
          <>
            <span className="hidden md:inline text-gray-300">|</span>
            <div className="flex items-center gap-1 text-accent">
              <ShieldCheck className="h-4 w-4 md:h-5 md:w-5" />
              <span className="font-medium">Verified Listing</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
