"use client"

import type { Booking } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { updateBookingStatus } from "@/app/host/actions"
import { useTransition } from "react"

interface BookingsListProps {
  bookings: Booking[]
}

export function BookingsList({ bookings }: BookingsListProps) {
  const [isPending, startTransition] = useTransition()

  const handleStatusUpdate = async (bookingId: string, status: "confirmed" | "cancelled") => {
    startTransition(async () => {
      try {
        await updateBookingStatus(bookingId, status)
        // toast.success(`Booking ${status}`)
      } catch (error) {
        console.error(error)
        // toast.error("Failed to update booking")
      }
    })
  }

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
        <p className="text-muted-foreground">No bookings found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Property Image */}
              <div className="relative w-full md:w-48 h-32 md:h-auto">
                <Image
                  src={booking.propertyImage || "/placeholder.svg"}
                  alt={booking.propertyName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Booking Details */}
              <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{booking.propertyName}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {format(new Date(booking.startDate), "MMM d")} -{" "}
                        {format(new Date(booking.endDate), "MMM d, yyyy")}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getStatusColor(booking.status)} variant="outline">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={booking.guestAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{booking.guestName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{booking.guestName}</p>
                      <p className="text-xs text-muted-foreground">{booking.guests} guests</p>
                    </div>
                  </div>
                  {/* Action buttons for pending bookings */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-lg">${booking.totalPrice}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>

                    {booking.status === "pending" && (
                      <div className="flex gap-2 pl-4 border-l">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300 bg-transparent"
                          onClick={() => handleStatusUpdate(booking.id, "confirmed")}
                          disabled={isPending}
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Accept</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 bg-transparent"
                          onClick={() => handleStatusUpdate(booking.id, "cancelled")}
                          disabled={isPending}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Decline</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
