import { Suspense } from "react"
import { getProperties } from "@/lib/db/properties"
import { SearchPageClient } from "@/components/search/search-page-client"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { Loader2 } from "lucide-react"

export default async function SearchPage() {
  const properties = await getProperties()

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-[80px]">
        <Suspense fallback={<SearchLoadingSkeleton />}>
          <SearchPageClient initialProperties={properties} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function SearchLoadingSkeleton() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )
}
