'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, ExternalLink, Eye } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Property } from '@/lib/types'

interface PropertiesListClientProps {
  properties: Property[]
}

export function PropertiesListClient({ properties }: PropertiesListClientProps) {
  // Debug: Log property data
  console.log('[PropertiesListClient] Properties received:', properties.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    external_booking_url: p.external_booking_url
  })))

  if (properties.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <h3 className="text-lg font-semibold mb-2">No Properties Yet</h3>
          <p className="text-muted-foreground mb-4">
            Submit your first property to start receiving qualified traffic
          </p>
          <Button asChild>
            <Link href="/submit-property">
              Submit a Property
            </Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Property Image */}
            <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
              <Image
                src={property.images[0]}
                alt={property.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Property Details */}
            <div className="flex-1 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{property.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {property.location.city}, {property.location.state}
                  </p>
                </div>
                <div className="flex gap-2">
                  {property.verified && (
                    <Badge variant="default">Active</Badge>
                  )}
                  {!property.verified && (
                    <Badge variant="secondary">Pending</Badge>
                  )}
                  {property.featured && (
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium">{property.propertyType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Capacity</p>
                  <p className="font-medium">{property.capacity.guests} guests</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Bedrooms</p>
                  <p className="font-medium">{property.capacity.bedrooms}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Bathrooms</p>
                  <p className="font-medium">{property.capacity.bathrooms}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => {
                    console.log('[PropertiesListClient] Edit clicked, navigating to:', `/host/properties/${property.id}/edit`)
                    window.location.href = `/host/properties/${property.id}/edit`
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Property
                </Button>
                {property.slug ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      console.log('[PropertiesListClient] View Listing clicked, opening:', `/properties/${property.slug}`)
                      window.open(`/properties/${property.slug}`, '_blank')
                    }}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Listing
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" disabled>
                    <Eye className="h-4 w-4 mr-2" />
                    Not Published
                  </Button>
                )}
                {property.external_booking_url && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      console.log('[PropertiesListClient] Your Website clicked, opening:', property.external_booking_url)
                      window.open(property.external_booking_url, '_blank')
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Your Website
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
