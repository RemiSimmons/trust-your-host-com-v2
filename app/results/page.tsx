import { Suspense } from "react"
import { ResultsPageClient } from "@/components/search/results-page-client"
import { getFeaturedProperties } from "@/lib/db/properties"

export const metadata = {
  title: "Search Results | TrustYourHost",
  description: "Find your perfect stay with our filtered search results",
}

export default async function ResultsPage() {
  // Fetch properties server-side (we'll filter client-side based on query params)
  const allProperties = await getFeaturedProperties()

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<ResultsLoadingSkeleton />}>
        <ResultsPageClient initialProperties={allProperties} />
      </Suspense>
    </div>
  )
}

function ResultsLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}


