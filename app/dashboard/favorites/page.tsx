import { createServerClient } from "@/lib/supabase/server"
import { getFavoriteProperties } from "@/lib/db/properties"
import { redirect } from "next/navigation"
import { PropertyCard } from "@/components/home/featured-properties"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function FavoritesPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const favorites = await getFavoriteProperties(user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Favorites</h1>
        <p className="text-muted-foreground">Properties you've saved for later</p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/50">
          <h3 className="text-lg font-medium">No favorites yet</h3>
          <p className="text-muted-foreground mb-4">Start exploring to find your next dream stay.</p>
          <Link href="/search">
            <Button>Explore Properties</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
