"use client"

import { useState, useCallback } from "react"
import { Star, Minus, Plus } from "lucide-react"
import type { Property, Booking } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { createCheckoutSession } from "@/app/actions/checkout"
import { differenceInDays, parseISO, isValid, startOfDay } from "date-fns"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

interface BookingSidebarProps {
  property: Property
  blockedDates?: Booking[]
}

export function BookingSidebar({ property, blockedDates = [] }: BookingSidebarProps) {
  const [guests, setGuests] = useState(1)
  const [dates, setDates] = useState({ checkIn: "", checkOut: "" })
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Calculate nights dynamically
  const checkInDate = parseISO(dates.checkIn)
  const checkOutDate = parseISO(dates.checkOut)
  const nights = isValid(checkInDate) && isValid(checkOutDate) ? differenceInDays(checkOutDate, checkInDate) : 0

  const checkAvailability = useCallback(() => {
    if (!isValid(checkInDate) || !isValid(checkOutDate)) return true

    const start = startOfDay(checkInDate)
    const end = startOfDay(checkOutDate)

    for (const booking of blockedDates) {
      const bookingStart = parseISO(booking.startDate)
      const bookingEnd = parseISO(booking.endDate)

      // Check if range overlaps
      // (StartA <= EndB) and (EndA >= StartB)
      if (start < bookingEnd && end > bookingStart) {
        return false
      }
    }
    return true
  }, [checkInDate, checkOutDate, blockedDates])

  const isAvailable = checkAvailability()

  const nightlyTotal = property.pricing.baseNightlyRate * (nights > 0 ? nights : 0)
  const cleaningFee = property.pricing.cleaningFee
  const serviceFee = Math.round(nightlyTotal * 0.12) // 12% service fee
  const total = nightlyTotal + cleaningFee + serviceFee

  const fetchClientSecret = useCallback(() => {
    return createCheckoutSession(property.id, dates, guests).then((data) => data.clientSecret)
  }, [property.id, dates, guests])

  const handleReserve = () => {
    if (nights > 0 && dates.checkIn && dates.checkOut) {
      if (!isAvailable) {
        setError("These dates are already booked.")
        return
      }
      setError(null)
      setIsCheckoutOpen(true)
    } else {
      // You could add a toast here to say "Please select dates"
      alert("Please select check-in and check-out dates")
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-2xl font-bold text-gray-900">{formatCurrency(property.pricing.baseNightlyRate)}</span>
            <span className="text-gray-500"> / night</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-gray-900 text-gray-900" />
            <span className="font-semibold">{property.rating.average}</span>
            <span className="text-gray-500 underline">({property.rating.count} reviews)</span>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl mb-4 overflow-hidden">
          <div className="grid grid-cols-2 border-b border-gray-300">
            <div className="p-3 border-r border-gray-300">
              <label className="block text-xs font-bold text-gray-800 uppercase mb-1">Check-in</label>
              <input
                type="date"
                className="w-full text-sm outline-none text-gray-600 cursor-pointer"
                onChange={(e) => {
                  setDates({ ...dates, checkIn: e.target.value })
                  setError(null)
                }}
                value={dates.checkIn}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="p-3">
              <label className="block text-xs font-bold text-gray-800 uppercase mb-1">Checkout</label>
              <input
                type="date"
                className="w-full text-sm outline-none text-gray-600 cursor-pointer"
                onChange={(e) => {
                  setDates({ ...dates, checkOut: e.target.value })
                  setError(null)
                }}
                value={dates.checkOut}
                min={dates.checkIn || new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
          <div className="p-3">
            <label className="block text-xs font-bold text-gray-800 uppercase mb-1">Guests</label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                {guests} guest{guests > 1 ? "s" : ""}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                  disabled={guests <= 1}
                >
                  <Minus className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setGuests(Math.min(property.capacity.guests, guests + 1))}
                  className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                  disabled={guests >= property.capacity.guests}
                >
                  <Plus className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-2 font-medium">{error}</p>}
        {!isAvailable && !error && <p className="text-red-500 text-sm mb-2 font-medium">Dates not available</p>}

        <Button
          className="w-full h-12 text-lg font-semibold mb-4 bg-primary hover:bg-primary/90"
          onClick={handleReserve}
          disabled={nights <= 0 || !isAvailable}
        >
          {isAvailable ? "Reserve" : "Unavailable"}
        </Button>

        <p className="text-center text-sm text-gray-500 mb-6">You won't be charged yet</p>

        <div className="space-y-4">
          <div className="flex justify-between text-gray-600">
            <span className="underline">
              {formatCurrency(property.pricing.baseNightlyRate)} x {nights} nights
            </span>
            <span>{formatCurrency(nightlyTotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="underline">Cleaning fee</span>
            <span>{formatCurrency(cleaningFee)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span className="underline">Service fee</span>
            <span>{formatCurrency(serviceFee)}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center font-bold text-lg text-gray-900">
          <span>Total before taxes</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>

      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete your booking</DialogTitle>
            <DialogDescription>Enter your payment details to reserve {property.name}.</DialogDescription>
          </DialogHeader>
          {isCheckoutOpen && (
            <div className="py-4">
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
