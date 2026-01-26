"use client"

import type { Booking } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { ReviewModal } from "@/components/reviews/review-modal"

interface TripsListProps {
  bookings: Booking[]
}

export function TripsList({ bookings }: TripsListProps) {
  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20"
      case "cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
      case "completed":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/50">
        <h3 className="text-lg font-medium">No trips yet</h3>
        <p className="text-muted-foreground mb-4">Time to plan your next adventure!</p>
        <Link href="/search">
          <Button>Explore Properties</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking) => (
        <Card key={booking.id} className="overflow-hidden flex flex-col">
          <div className="relative aspect-video">
            <Image
              src={booking.propertyImage || "/placeholder.svg"}
              alt={booking.propertyName}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2">
              <Badge className={getStatusColor(booking.status)} variant="outline">
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
          </div>

          <CardContent className="flex-1 p-4">
            <h3 className="font-semibold text-lg mb-2">{booking.propertyName}</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {format(new Date(booking.startDate), "MMM d")} - {format(new Date(booking.endDate), "MMM d, yyyy")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Location details</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 gap-2 flex-col sm:flex-row">
            <Link href={`/properties/${booking.propertyId}`} className="w-full">
              <Button variant="outline" className="w-full bg-transparent">
                View Property
              </Button>
            </Link>
            {booking.status === "completed" && (
              <ReviewModal bookingId={booking.id} propertyId={booking.propertyId} propertyName={booking.propertyName} />
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
