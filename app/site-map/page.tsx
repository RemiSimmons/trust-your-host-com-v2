import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sitemap - TrustYourHost",
  description: "Browse all pages on TrustYourHost. Find vacation rentals, FIFA 2026 host cities, travel guides, and more.",
}

const sections = [
  {
    title: "Main Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/search", label: "Search Properties" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/experiences", label: "Experiences" },
      { href: "/destinations", label: "Destinations" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "For Hosts",
    links: [
      { href: "/for-hosts", label: "For Hosts" },
      { href: "/submit-property", label: "List Your Property" },
      { href: "/become-host", label: "Become a Host" },
    ],
  },
  {
    title: "FIFA World Cup 2026",
    links: [
      { href: "/fifa-2026", label: "FIFA 2026 Overview" },
      { href: "/fifa-2026/guides/planning-your-trip", label: "Trip Planning Guide" },
      { href: "/fifa-2026/guides/best-time-to-book", label: "Best Time to Book" },
    ],
  },
  {
    title: "Guides & Content",
    links: [
      { href: "/guides", label: "City Guides" },
      { href: "/journal", label: "Travel Journal" },
      { href: "/insights", label: "Host Insights" },
      { href: "/host-resources", label: "Host Resources" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/faq", label: "FAQ" },
      { href: "/help/for-guests/how-it-works", label: "How Booking Works" },
      { href: "/help/for-guests/booking-direct", label: "Booking Direct" },
      { href: "/help/for-guests/safety-and-trust", label: "Safety & Trust" },
      { href: "/help/for-hosts/how-it-works", label: "How Hosting Works" },
      { href: "/help/for-hosts/pricing-and-fees", label: "Pricing & Fees" },
      { href: "/help/for-hosts/getting-started-without-website", label: "Getting Started Without a Website" },
    ],
  },
  {
    title: "Legal & Policies",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/cancellation", label: "Cancellation Policy" },
      { href: "/safety", label: "Safety" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Login" },
      { href: "/signup", label: "Sign Up" },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="mb-2 font-serif text-3xl font-bold md:text-4xl">Sitemap</h1>
          <p className="text-gray-600 mb-10">All pages on TrustYourHost</p>

          <div className="grid gap-10 md:grid-cols-2">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-semibold text-lg text-gray-900 mb-3 border-b border-gray-200 pb-2">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-700 hover:text-accent hover:underline transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
