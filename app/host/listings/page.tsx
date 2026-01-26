import { createServerClient } from "@/lib/supabase/server"
import { getHostProperties } from "@/lib/db/properties"
import { redirect } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PropertiesList } from "@/components/host/properties-list"

export default async function HostListingsPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch properties for this host
  const properties = await getHostProperties(user.id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">My Listings</h1>
          <p className="text-muted-foreground">Manage your properties and availability</p>
        </div>
        <Link href="/host/listings/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Listing
          </Button>
        </Link>
      </div>

      <PropertiesList properties={properties} />
    </div>
  )
}
