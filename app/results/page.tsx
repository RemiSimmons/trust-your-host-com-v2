import type { Metadata } from "next"
import { Suspense } from "react"
import { ResultsPageClient } from "@/components/search/results-page-client"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { getProperties } from "@/lib/db/properties"
import { getExperienceConfig } from "@/lib/config/experience-config"
import { getCityById } from "@/lib/data/fifa-cities"
import { generateMetadata as genMeta } from "@/lib/seo/metadata"

interface ResultsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: ResultsPageProps): Promise<Metadata> {
  const params = await searchParams
  const experienceKey = typeof params.experience === "string" ? params.experience : ""
  const cityParam = typeof params.city === "string" ? params.city : ""
  const experienceConfig = experienceKey ? getExperienceConfig(experienceKey) : null
  const city = cityParam ? getCityById(cityParam) : null

  const experienceLabel = experienceConfig?.title || ""
  const cityLabel = city?.name || cityParam || ""

  let title = "Vacation Rentals | Direct Booking | TrustYourHost"
  let description = "Browse verified vacation rentals from trusted hosts. Book direct and save on fees."

  if (cityLabel && experienceLabel) {
    title = `${cityLabel} ${experienceLabel} Vacation Rentals | Direct Booking | TrustYourHost`
    description = `Find ${experienceLabel.toLowerCase()} in ${cityLabel}. Book verified vacation rentals directly from hosts. No platform fees.`
  } else if (experienceLabel) {
    title = `${experienceLabel} Vacation Rentals | Direct Booking | TrustYourHost`
    description = `Discover ${experienceLabel.toLowerCase()} vacation rentals. Book direct with verified hosts. No platform commissions.`
  } else if (cityLabel) {
    title = `${cityLabel} Vacation Rentals | Direct Booking | TrustYourHost`
    description = `Find vacation rentals in ${cityLabel}. Book directly from verified hosts. Save 10-15% vs Airbnb/Vrbo.`
  }

  return genMeta({
    title,
    description,
    url: "/results",
  })
}

export default async function ResultsPage() {
  // Fetch all properties server-side (filter client-side based on query params)
  const allProperties = await getProperties()

  const breadcrumbItems = [
    { label: "Search", href: "/search" },
    { label: "Results" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>
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


