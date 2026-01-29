"use client"

import { Clock, BanIcon, Dog, Shield } from "lucide-react"
import Link from "next/link"
import type { Property } from "@/lib/types"

interface HouseRulesCardProps {
  property: Property
}

export function HouseRulesCard({ property }: HouseRulesCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Important Information</h2>

      {/* House Rules */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">House Rules</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">Check-in</div>
              <div className="text-sm text-gray-600">After 3:00 PM</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">Check-out</div>
              <div className="text-sm text-gray-600">Before 11:00 AM</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <BanIcon className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">Smoking</div>
              <div className="text-sm text-gray-600">Not allowed</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Dog className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <div className="font-medium text-gray-900">Pets</div>
              <div className="text-sm text-gray-600">
                {property.capacity.allowsPets ? "Allowed" : "Not allowed"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Cancellation Policy</h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-3">
          Cancellation policies vary by host. Please review the full cancellation policy on the host's website before booking.
        </p>
        <Link
          href="/cancellation"
          className="text-accent hover:underline text-sm font-semibold inline-flex items-center gap-1"
        >
          View full cancellation policy
          <span>→</span>
        </Link>
      </div>

      {/* Minimum Stay */}
      {property.pricing.minStay > 1 && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Minimum Stay</h3>
          <p className="text-gray-700 text-sm">
            This property requires a minimum stay of {property.pricing.minStay} nights.
          </p>
        </div>
      )}

      {/* Safety Notice */}
      <div className="border-t pt-4 bg-blue-50 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <div className="font-semibold text-gray-900 mb-1">Safety & Trust</div>
            <p className="text-sm text-gray-700">
              TrustYourHost verifies property listings and host information. Always communicate and pay through the host's official booking website.
            </p>
            <Link
              href="/safety"
              className="text-blue-600 hover:underline text-sm font-semibold inline-flex items-center gap-1 mt-2"
            >
              Learn more about safety
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
