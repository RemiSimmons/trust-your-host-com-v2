"use client"

import { useState } from "react"
import { Clock, Shield, ChevronRight } from "lucide-react"
import Link from "next/link"
import type { Property } from "@/lib/types"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

interface HouseRulesCardProps {
  property: Property
}

export function HouseRulesCard({ property }: HouseRulesCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const hasStandardRules = property.standard_house_rules && property.standard_house_rules.length > 0
  const hasCustomRules = property.house_rules && property.house_rules.trim() !== ''
  const hasAnyRules = hasStandardRules || hasCustomRules
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Important Information</h2>

      {/* House Rules - Minimalistic Collapsible */}
      {hasAnyRules && (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50 rounded-lg transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">House Rules</h3>
                <p className="text-sm text-gray-600">
                  {hasStandardRules && hasCustomRules 
                    ? `${property.standard_house_rules?.length} rules + custom guidelines`
                    : hasStandardRules 
                    ? `${property.standard_house_rules?.length} rules`
                    : 'Custom guidelines'}
                </p>
              </div>
            </div>
            <ChevronRight 
              className={`h-5 w-5 text-gray-600 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="px-4 pb-4 space-y-4">
            {/* Standard House Rules */}
            {hasStandardRules && (
              <div className="space-y-2">
                <ul className="space-y-2">
                  {property.standard_house_rules?.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-600 mt-0.5 font-bold">✓</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Custom House Rules */}
            {hasCustomRules && (
              <div className="pt-3 border-t">
                <p className="text-sm font-semibold text-gray-800 mb-2">Additional Guidelines:</p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {property.house_rules}
                </p>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Default Info - Check-in/Check-out */}
      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <div className="text-xs text-gray-600 uppercase font-semibold mb-1">Check-in</div>
          <div className="text-sm text-gray-900">After 3:00 PM</div>
        </div>
        <div>
          <div className="text-xs text-gray-600 uppercase font-semibold mb-1">Check-out</div>
          <div className="text-sm text-gray-900">Before 11:00 AM</div>
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
