import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { generateFAQPageSchema } from "@/lib/seo/schema"
import { generateHelpBreadcrumbs } from "@/lib/seo/breadcrumb-helpers"
import {
  guestFaqs,
  hostFaqs,
  fifaFaqs,
  getGuestFaqsForSchema,
  getHostFaqsForSchema,
  getFifaFaqsForSchema,
} from "@/lib/data/help-center-faqs"
import { HelpCenterTabs, HelpCenterTabsFallback } from "@/components/help/help-center-tabs"

export const metadata: Metadata = {
  title: "Help Center | Guest & Host Support | TrustYourHost",
  description: "Find answers about booking direct, host verification, FIFA 2026 properties, and platform features.",
}

export const revalidate = 3600

export default function HelpPage() {
  const breadcrumbItems = generateHelpBreadcrumbs()

  // Each tab gets its own FAQPage schema block
  const guestFaqSchema = generateFAQPageSchema(getGuestFaqsForSchema())
  const hostFaqSchema = generateFAQPageSchema(getHostFaqsForSchema())
  const fifaFaqSchema = generateFAQPageSchema(getFifaFaqsForSchema())

  return (
    <div className="flex min-h-screen flex-col">
      <SchemaMarkup schema={[guestFaqSchema, hostFaqSchema, fifaFaqSchema]} />
      <NavBar />
      <main className="flex-1">
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <div className="bg-muted py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 font-serif text-3xl font-bold md:text-5xl text-gray-900">
              Help Center
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers for guests, hosts, and FIFA 2026 travelers
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          <Suspense fallback={<HelpCenterTabsFallback guestFaqs={guestFaqs} hostFaqs={hostFaqs} fifaFaqs={fifaFaqs} />}>
            <HelpCenterTabs
              guestFaqs={guestFaqs}
              hostFaqs={hostFaqs}
              fifaFaqs={fifaFaqs}
            />
          </Suspense>

          {/* Conversion Links */}
          <div className="mt-16 p-8 bg-white rounded-xl border-2 border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Explore TrustYourHost</h2>
            <p className="text-gray-600 mb-6">
              Find vacation rentals, list your property, or explore FIFA 2026 stays.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/search"
                className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
              >
                Browse Vacation Rentals
              </Link>
              <Link
                href="/submit-property"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                List Your Property
              </Link>
              <Link
                href="/fifa-2026"
                className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
              >
                FIFA 2026 Stays
              </Link>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 border-2 border-orange-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Still have questions?</h2>
            <p className="text-gray-700 mb-6">
              Contact our support team for personalized assistance.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
