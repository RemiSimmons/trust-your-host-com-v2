"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"

interface PropertyCTAProps {
  property: Property
  compact?: boolean
}

export function PropertyCTA({ property, compact = false }: PropertyCTAProps) {
  const handleBookingClick = () => {
    // Track analytics event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "visit_website_clicked", {
        property_id: property.id,
        destination_url: property.external_booking_url,
        source_page: "detail_page",
      })
    }

    // Open booking URL in new tab
    if (property.external_booking_url) {
      window.open(property.external_booking_url, "_blank", "noopener,noreferrer")
    }
  }

  const getHostname = (url?: string) => {
    if (!url) return "host's website"
    try {
      const hostname = new URL(url).hostname
      return hostname.replace("www.", "")
    } catch {
      return "host's website"
    }
  }

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(property.pricing.baseNightlyRate)}
            <span className="text-base font-normal text-gray-600"> / night</span>
          </div>
        </div>
        <Button
          onClick={handleBookingClick}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-white shadow-lg"
        >
          <span>Visit Website</span>
          <ExternalLink className="h-4 w-4 ml-2" />
        </Button>
      </div>
    )
  }

  return (
    <div className="sticky top-24 bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6 space-y-6">
      {/* Price */}
      <div className="border-b pb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            {formatCurrency(property.pricing.baseNightlyRate)}
          </span>
          <span className="text-lg text-gray-600">/ night</span>
        </div>
        {property.pricing.cleaningFee && (
          <div className="text-sm text-gray-600 mt-2">
            + {formatCurrency(property.pricing.cleaningFee)} cleaning fee
          </div>
        )}
        {property.pricing.minStay > 1 && (
          <div className="text-sm text-gray-600 mt-1">
            {property.pricing.minStay} night minimum stay
          </div>
        )}
        {typeof property.pricing.weeklyDiscount === 'number' && property.pricing.showWeeklyDiscount !== false && (
          <div className="text-sm text-green-600 mt-1 font-semibold">
            {property.pricing.weeklyDiscount}% discount for 7+ nights
          </div>
        )}
        {typeof property.pricing.monthlyDiscount === 'number' && property.pricing.showMonthlyDiscount !== false && (
          <div className="text-sm text-green-600 mt-1 font-semibold">
            {property.pricing.monthlyDiscount}% discount for 30+ nights
          </div>
        )}
      </div>

      {/* CTA Button */}
      <Button
        onClick={handleBookingClick}
        size="lg"
        className="w-full bg-accent hover:bg-accent/90 text-white text-lg py-6 shadow-xl"
      >
        <span>Visit Website to Book</span>
        <ExternalLink className="h-5 w-5 ml-2" />
      </Button>

      {/* Redirect Notice */}
      <div className="text-center text-sm text-gray-600">
        <p>You'll be redirected to</p>
        <p className="font-semibold text-gray-900 mt-1">
          {getHostname(property.external_booking_url)}
        </p>
      </div>

      {/* Quick Info */}
      <div className="border-t pt-4 space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <span className="text-green-600">✓</span>
          <span>Direct booking with host</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <span className="text-green-600">✓</span>
          <span>No TrustYourHost booking fees</span>
        </div>
        {property.quick_response_host && (
          <div className="flex items-center gap-2 text-gray-700">
            <span className="text-blue-600">⚡</span>
            <span>Quick response expected</span>
          </div>
        )}
      </div>

      {/* Host Info */}
      <div className="border-t pt-4">
        <div className="text-sm text-gray-600 mb-2">Hosted by</div>
        <div className="flex items-center gap-3">
          <img
            src={property.host.photo}
            alt={property.host.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="font-semibold text-gray-900">{property.host.name}</div>
            {property.host.verified && (
              <div className="text-xs text-green-600 flex items-center gap-1">
                ✓ Verified Host
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
