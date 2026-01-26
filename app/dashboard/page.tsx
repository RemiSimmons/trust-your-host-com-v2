import { createServerClient } from "@/lib/supabase/server"
import { getGuestBookings } from "@/lib/db/bookings"
import { redirect } from "next/navigation"
import { TripsList } from "@/components/guest/trips-list"
import { ProfileCompletionWidget } from "@/components/dashboard/profile-completion-widget"
import { getProfile } from "@/lib/db/profiles"

export default async function GuestDashboardPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const bookings = await getGuestBookings(user.id)
  const profile = await getProfile(user.id)

  const displayProfile = profile || {
    full_name: user.user_metadata.full_name,
    avatar_url: user.user_metadata.avatar_url,
    email: user.email,
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold">My Trips</h1>
          <p className="text-muted-foreground">Upcoming and past reservations</p>
        </div>

        <TripsList bookings={bookings} />
      </div>

      <div className="space-y-6">
        <ProfileCompletionWidget profile={displayProfile} type="guest" />

        {/* Future widgets can go here */}
      </div>
    </div>
  )
}
