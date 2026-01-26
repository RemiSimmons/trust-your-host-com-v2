import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { HostHero } from "@/components/home/host-hero"
import { ValueProposition } from "@/components/home/value-proposition"
import { ROICalculator } from "@/components/home/roi-calculator"
import { HowItWorksTimeline } from "@/components/home/how-it-works-timeline"
import { WebsiteSetupOffer } from "@/components/home/website-setup-offer"
import { MultiPropertyPricing } from "@/components/home/multi-property-pricing"
import { HostFAQ } from "@/components/home/host-faq"
import { HostCTA } from "@/components/home/host-cta"
import { FloatingPromo } from "@/components/home/floating-promo"

export const metadata: Metadata = {
  title: "For Hosts - List Your Property | TrustYourHost",
  description: "Keep your direct booking website. Get discovered by travelers. Pay $49/month, not 15% commissions. Start with 60 days free.",
}

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
        <HostFAQ />
        <HostCTA />
      </main>

      <Footer />
      <FloatingPromo />
    </div>
  )
}
