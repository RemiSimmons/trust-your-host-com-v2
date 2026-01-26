import { createServerClient } from "@/lib/supabase/server"
import { getHostBookings } from "@/lib/db/bookings"
import { redirect } from "next/navigation"
import { BookingsList } from "@/components/host/bookings-list"

export default async function HostBookingsPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const bookings = await getHostBookings(user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Bookings</h1>
        <p className="text-muted-foreground">Manage your upcoming reservations</p>
      </div>

      <BookingsList bookings={bookings} />
    </div>
  )
}
