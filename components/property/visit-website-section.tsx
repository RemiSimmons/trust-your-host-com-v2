'use client'

import { ExternalLink, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Property } from '@/lib/types'

interface VisitWebsiteSectionProps {
  property: Property
}

export function VisitWebsiteSection({ property }: VisitWebsiteSectionProps) {
  // Extract hostname from external URL if it exists
  let hostname = 'the host'
  if (property.external_booking_url) {
    try {
      hostname = new URL(property.external_booking_url).hostname.replace('www.', '')
    } catch (e) {
      // Use fallback if URL parsing fails
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-2xl p-8 text-center">
        <h3 className="font-serif text-2xl font-bold mb-4">
          Ready to Book Your Stay?
        </h3>
        <p className="text-muted-foreground mb-2">
          Book directly with the host at their website
        </p>
        {property.external_booking_url && (
          <p className="text-sm text-muted-foreground mb-6">
            Hosted at: <span className="font-mono">{hostname}</span>
          </p>
        )}
        
        {property.external_booking_url ? (
          <a
            href={`/track/click?property_id=${property.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
          >
            Visit {property.host.name}'s Website
            <ExternalLink className="h-5 w-5" />
          </a>
        ) : (
          <Button size="lg" disabled>
            Contact Host for Booking
          </Button>
        )}
        
        {property.total_clicks && property.total_clicks > 50 && (
          <div className="mt-4">
            <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm px-3 py-1 rounded-full">
              <TrendingUp className="h-4 w-4" />
              Popular: {property.total_clicks}+ clicks
            </span>
          </div>
        )}
      </div>
      
      {/* Keep property description below */}
      <div className="mt-8 prose prose-gray dark:prose-invert max-w-none">
        <h4 className="font-serif text-xl font-bold mb-4">About this property</h4>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {typeof property.description === 'string' 
            ? property.description 
            : (property.description?.full || property.description?.short || '')}
        </p>
      </div>
    </div>
  )
}
