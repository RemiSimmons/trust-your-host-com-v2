import { createServerClient } from "@/lib/supabase/server"
import type { Booking } from "@/lib/types"

// Mock bookings data
const mockBookings: Booking[] = [
  {
    id: "1",
    propertyId: "prop_1",
    propertyName: "Seaside Villa",
    propertyImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    userId: "user_1",
    guestName: "Alice Johnson",
    guestEmail: "alice@example.com",
    guestAvatar: "https://i.pravatar.cc/150?u=alice",
    startDate: "2023-12-20",
    endDate: "2023-12-27",
    totalPrice: 1450,
    status: "confirmed",
    guests: 4,
    createdAt: "2023-11-15T10:00:00Z",
  },
  {
    id: "2",
    propertyId: "prop_2",
    propertyName: "Mountain Cabin",
    propertyImage: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?auto=format&fit=crop&w=800&q=80",
    userId: "user_2",
    guestName: "Bob Smith",
    guestEmail: "bob@example.com",
    guestAvatar: "https://i.pravatar.cc/150?u=bob",
    startDate: "2024-01-05",
    endDate: "2024-01-10",
    totalPrice: 890,
    status: "pending",
    guests: 2,
    createdAt: "2023-11-20T14:30:00Z",
  },
  {
    id: "3",
    propertyId: "prop_1",
    propertyName: "Seaside Villa",
    propertyImage: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80",
    userId: "user_3",
    guestName: "Charlie Brown",
    guestEmail: "charlie@example.com",
    guestAvatar: "https://i.pravatar.cc/150?u=charlie",
    startDate: "2023-11-10",
    endDate: "2023-11-15",
    totalPrice: 1100,
    status: "completed",
    guests: 3,
    createdAt: "2023-10-01T09:00:00Z",
  },
]

export async function getHostBookings(hostId: string): Promise<Booking[]> {
  const supabase = await createServerClient()

  // Logic to join bookings -> properties -> host_id = hostId
  const { data, error } = await supabase.from("bookings").select(`
      *,
      property:properties(name, images, host_id),
      guest:profiles(full_name, email, avatar_url)
    `)
  // This filter on nested resource is tricky in basic Supabase client without custom query
  // But we can filter locally or use !inner join if Supabase supports it well in JS client
  // For now, let's assume we fetch filtered if connected.

  if (error) {
    if (error.code === "PGRST205" || error.message.includes("Could not find the table")) {
      // Fallback to mock data
      return mockBookings
    }
    return []
  }

  // Map real data to Booking type (simplified implementation)
  return data
    .filter((b: any) => b.property.host_id === hostId)
    .map((b: any) => ({
      id: b.id,
      propertyId: b.property_id,
      propertyName: b.property.name,
      propertyImage: b.property.images[0] || "",
      userId: b.user_id,
      guestName: b.guest.full_name,
      guestEmail: b.guest.email,
      guestAvatar: b.guest.avatar_url,
      startDate: b.start_date,
      endDate: b.end_date,
      totalPrice: Number(b.total_price),
      status: b.status,
      guests: b.guests,
      createdAt: b.created_at,
    }))
}

export async function getGuestBookings(userId: string): Promise<Booking[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      property:properties(name, images, host_id),
      guest:profiles(full_name, email, avatar_url)
    `)
    .eq("user_id", userId)

  if (error) {
    if (error.code === "PGRST205" || error.message.includes("Could not find the table")) {
      // Fallback to mock data
      return mockBookings.filter((b) => b.userId === userId)
    }
    return []
  }

  return data.map((b: any) => ({
    id: b.id,
    propertyId: b.property_id,
    propertyName: b.property.name,
    propertyImage: b.property.images[0] || "",
    userId: b.user_id,
    guestName: b.guest.full_name,
    guestEmail: b.guest.email,
    guestAvatar: b.guest.avatar_url,
    startDate: b.start_date,
    endDate: b.end_date,
    totalPrice: Number(b.total_price),
    status: b.status,
    guests: b.guests,
    createdAt: b.created_at,
  }))
}

export async function getBookingsForProperty(propertyId: string): Promise<Booking[]> {
  const supabase = await createServerClient()

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("property_id", propertyId)
    .neq("status", "cancelled") // Don't block dates for cancelled bookings

  if (error) {
    if (error.code === "PGRST205" || error.message.includes("Could not find the table")) {
      // Fallback to mock data
      return mockBookings.filter((b) => b.propertyId === propertyId && b.status !== "cancelled")
    }
    return []
  }

  // Map to Booking type (we only really need dates here, but let's map everything we can)
  return data.map((b: any) => ({
    id: b.id,
    propertyId: b.property_id,
    propertyName: "", // Not needed for availability check
    propertyImage: "", // Not needed
    userId: b.user_id,
    guestName: "", // Not needed
    guestEmail: "", // Not needed
    guestAvatar: "", // Not needed
    startDate: b.start_date,
    endDate: b.end_date,
    totalPrice: Number(b.total_price),
    status: b.status,
    guests: b.guests,
    createdAt: b.created_at,
  }))
}
