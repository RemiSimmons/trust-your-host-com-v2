import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { HostHero } from "@/components/home/host-hero"
import { ValueProposition } from "@/components/home/value-proposition"
import { ROICalculator } from "@/components/home/roi-calculator"
import { HowItWorksTimeline } from "@/components/home/how-it-works-timeline"
import { WebsiteSetupOffer } from "@/components/home/website-setup-offer"
import { MultiPropertyPricing } from "@/components/home/multi-property-pricing"
import { DetailedHostFAQ } from "@/components/faq/detailed-host-faq"
import { HostCTA } from "@/components/home/host-cta"
import { FloatingPromo } from "@/components/home/floating-promo"
import { generateForHostsMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = generateForHostsMetadata()

export const revalidate = 3600

export default function ForHostsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1">
        <HostHero />
        <ValueProposition />
        <div id="how-it-works">
          <HowItWorksTimeline />
        </div>
        <div id="roi-calculator">
          <ROICalculator />
        </div>
        <MultiPropertyPricing />
        <WebsiteSetupOffer />
        <DetailedHostFAQ />
        <HostCTA />
      </main>

      <Footer />
      <FloatingPromo />
    </div>
  )
}
