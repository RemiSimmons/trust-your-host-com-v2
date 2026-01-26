"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const reviewSchema = z.object({
  bookingId: z.string().uuid(),
  propertyId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
})

export async function submitReview(prevState: any, formData: FormData) {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to leave a review" }
  }

  const rawData = {
    bookingId: formData.get("bookingId"),
    propertyId: formData.get("propertyId"),
    rating: Number(formData.get("rating")),
    comment: formData.get("comment"),
  }

  const validatedFields = reviewSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return { error: validatedFields.error.errors[0].message }
  }

  const { bookingId, propertyId, rating, comment } = validatedFields.data

  try {
    // 1. Check if the booking exists and belongs to the user and is completed
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("id, status, user_id")
      .eq("id", bookingId)
      .single()

    if (bookingError || !booking) {
      return { error: "Booking not found" }
    }

    if (booking.user_id !== user.id) {
      return { error: "Unauthorized" }
    }

    if (booking.status !== "completed") {
      // Allow reviewing if status is confirmed and end_date is past, but for now strict check on status
      // Ideally we check date too.
      return { error: "You can only review completed stays" }
    }

    // 2. Insert the review
    const { error: insertError } = await supabase.from("reviews").insert({
      property_id: propertyId,
      user_id: user.id,
      rating,
      comment,
    })

    if (insertError) {
      console.error("Error submitting review:", insertError)
      return { error: "Failed to submit review" }
    }

    // 3. Update property rating average (optional, can be done via database trigger or scheduled job)
    // For now, we'll leave it to a trigger or separate process to recalculate average.

    revalidatePath("/dashboard")
    revalidatePath(`/properties/${propertyId}`)

    return { success: true }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { error: "An unexpected error occurred" }
  }
}
