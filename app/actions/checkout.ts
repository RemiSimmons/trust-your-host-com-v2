"use server"

import { stripe } from "@/lib/stripe"
import { getPropertyById } from "@/lib/db/properties"
import { format } from "date-fns"

export async function createCheckoutSession(
  propertyId: string,
  dates: { checkIn: string; checkOut: string },
  guests: number,
) {
  const property = await getPropertyById(propertyId)

  if (!property) {
    throw new Error("Property not found")
  }

  // Calculate nights
  const start = new Date(dates.checkIn)
  const end = new Date(dates.checkOut)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (nights < 1) {
    throw new Error("Invalid booking dates")
  }

  const nightlyTotal = property.pricing.baseNightlyRate * nights
  const cleaningFee = property.pricing.cleaningFee
  const serviceFee = Math.round(nightlyTotal * 0.12)
  const totalAmount = nightlyTotal + cleaningFee + serviceFee

  // Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: property.name,
            description: `Stay at ${property.name} for ${nights} nights (${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}). ${guests} guests.`,
            images: property.images.slice(0, 1), // Use first image
          },
          unit_amount: totalAmount * 100, // Amount in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
  })

  return { clientSecret: session.client_secret }
}
