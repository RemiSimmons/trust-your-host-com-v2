import { getProperties } from "@/lib/db/properties"
import { SearchPageClient } from "@/components/search/search-page-client"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"

export default async function SearchPage() {
  const properties = await getProperties()

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1">
        <SearchPageClient initialProperties={properties} />
      </main>
      <Footer />
    </div>
  )
}
