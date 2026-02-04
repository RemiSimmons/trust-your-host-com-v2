"use client"

import { useState } from "react"
import { Clock, BanIcon, Dog, Shield, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import type { Property } from "@/lib/types"
import { Button } from "@/components/ui/button"

interface HouseRulesCardProps {
  property: Property
}

export function HouseRulesCard({ property }: HouseRulesCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Important Information</h2>

      {/* House Rules - Collapsible */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">House Rules</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Show all <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
        
        {/* Custom House Rules - Always visible if present */}
        {property.house_rules && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-gray-800 font-medium mb-1">Host's Rules:</p>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{property.house_rules}</p>
          </div>
        )}
        
        {/* Default House Rules - Preview when collapsed */}
        <div className={`space-y-4 ${isExpanded ? '' : 'max-h-32 overflow-hidden'}`}>
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
