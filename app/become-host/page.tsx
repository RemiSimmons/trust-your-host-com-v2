import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { HostHero } from "@/components/home/host-hero"
import { ValueProposition } from "@/components/home/value-proposition"
import { ROICalculator } from "@/components/home/roi-calculator"
import { HowItWorksTimeline } from "@/components/home/how-it-works-timeline"
import { HostCTA } from "@/components/home/host-cta"

export const metadata: Metadata = {
  title: "Why Host With TrustYourHost - List Your Property",
  description: "Stop paying 15% to booking platforms. List your property for free and connect directly with FIFA 2026 guests. See how hosting works and calculate your potential earnings.",
}

export default function BecomeHostPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1">
        <HostHero />
        <ValueProposition />
        <HowItWorksTimeline />
        <div id="roi-calculator">
          <ROICalculator />
        </div>
        <HostCTA />
      </main>

      <Footer />
    </div>
  )
}
