import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { DetailedGuestFAQ } from "@/components/faq/detailed-guest-faq"
import { Search, Heart, ExternalLink, Shield, Users, CreditCard, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "How It Works - TrustYourHost",
  description: "Discover verified properties and book directly with hosts. Simple, transparent, and commission-free directory for travelers.",
}

export default function HowItWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="mb-4 font-serif text-4xl font-bold md:text-6xl">How TrustYourHost Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're a directory connecting you to verified hosts with direct booking websites. No middleman, no extra fees.
            </p>
          </div>

          {/* 3-Step Process */}
          <div className="mb-20">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Step 1 */}
              <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Browse Verified Properties</h3>
                <p className="text-muted-foreground leading-relaxed">
                  View multiple self-hosted booking sites in one central location. Every property personally reviewed.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-950 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Find Your Perfect Stay</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Filter by location, amenities, and price. Read property details and see authentic photos.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 bg-orange-100 dark:bg-orange-950 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ExternalLink className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Book Directly with Host</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Click "Visit Website" to book on the host's own site. Communicate directly, avoid platform fees.
                </p>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mb-20 bg-muted/50 rounded-2xl p-8 md:p-12">
            <h2 className="font-serif text-3xl font-bold mb-8 text-center">Why Choose TrustYourHost</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Self-hosting sites you can trust</h3>
                  <p className="text-sm text-muted-foreground">Every property and booking website personally verified</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CreditCard className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">No booking commissions</h3>
                  <p className="text-sm text-muted-foreground">Book directly and avoid middleman fees</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Direct communication with hosts</h3>
                  <p className="text-sm text-muted-foreground">Connect directly for questions and special requests</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Users className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold mb-1">Secure bookings on host's platform</h3>
                  <p className="text-sm text-muted-foreground">Use the host's trusted booking system</p>
                </div>
              </div>
            </div>
          </div>


          {/* Bottom CTA */}
          <div className="text-center space-y-4">
            <Link href="/search">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold">
                Start Browsing Properties
              </Button>
            </Link>
            <div>
              <Link href="/for-hosts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Hosting with us? Learn more →
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed FAQ Section */}
        <DetailedGuestFAQ />
      </main>
      <Footer />
    </div>
  )
}
