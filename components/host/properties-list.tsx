"use client"

import type { Property } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, MoreVertical } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PropertiesListProps {
  properties: Property[]
}

export function PropertiesList({ properties }: PropertiesListProps) {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/50">
        <h3 className="text-lg font-medium">No listings yet</h3>
        <p className="text-muted-foreground mb-4">Get started by creating your first property listing.</p>
        <Link href="/host/listings/new">
          <Button>Create Listing</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden flex flex-col group">
          <div className="relative aspect-[4/3]">
            <Image
              src={property.images[0] || "/placeholder.svg"}
              alt={property.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
              {property.published === false ? "Draft" : "Published"}
            </div>
          </div>

          <CardContent className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold truncate pr-2">{property.name}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" /> View
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {property.location.city}, {property.location.country}
            </p>
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">${property.pricing.baseNightlyRate}/night</span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span>
                  {property.rating.average} ({property.rating.count})
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex gap-2">
            <Link href={`/host/listings/${property.slug}/edit`} className="flex-1">
              <Button variant="outline" className="w-full bg-transparent">
                Edit
              </Button>
            </Link>
            <Link href={`/properties/${property.slug}`} className="flex-1">
              <Button variant="secondary" className="w-full">
                View
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
