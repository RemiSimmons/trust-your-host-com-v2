import type { Metadata } from "next"
import { Suspense } from "react"
import { getProperties } from "@/lib/db/properties"
import { SearchPageClient } from "@/components/search/search-page-client"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { Loader2 } from "lucide-react"
import { getExperienceConfig } from "@/lib/config/experience-config"
import { getCityById } from "@/lib/data/fifa-cities"
import { generateMetadata as genMeta } from "@/lib/seo/metadata"
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"

export const revalidate = 3600

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams
  const experienceKey = typeof params.experience === "string" ? params.experience : ""
  const cityParam = typeof params.city === "string" ? params.city : (typeof params.location === "string" ? params.location : "")
  const experienceConfig = experienceKey ? getExperienceConfig(experienceKey) : null
  const city = cityParam ? getCityById(cityParam) : null

  const experienceLabel = experienceConfig?.title || ""
  const cityLabel = city?.name || cityParam || ""

  let title = "Search Vacation Rentals | Direct Booking | TrustYourHost"
  let description = "Browse verified vacation rentals from trusted hosts. Book direct and save 10-15% vs Airbnb/Vrbo."

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
    url: "/search",
  })
}

export default async function SearchPage() {
  const properties = await getProperties()

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Site-wide schema for search page */}
      <SchemaMarkup schema={[generateOrganizationSchema(), generateWebSiteSchema()]} />
      <NavBar />
      {/* Scroll container starts below nav - content cannot scroll above this boundary */}
      <div className="flex-1 overflow-y-auto mt-[72px]">
        <main>
          <Suspense fallback={<SearchLoadingSkeleton />}>
            <SearchPageClient initialProperties={properties} />
          </Suspense>
        </main>
        <Footer />
      </div>
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
