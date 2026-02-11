import Link from "next/link"
import { Heart, Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative z-20 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-accent fill-accent" />
            <span className="font-serif text-xl font-bold text-foreground">TrustYourHost</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="https://www.facebook.com/trustyourhost" target="_blank" rel="noopener noreferrer" className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com/intent/user?screen_name=BuildWithRemi" target="_blank" rel="noopener noreferrer" className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-accent transition-colors" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </Link>
            <Link href="#" className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://2minapp.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
              2MinApp
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: For Guests */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Guests</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Search Properties
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Safety & Trust
                </Link>
              </li>
              <li>
                <Link href="/help?tab=guests" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Guest Help →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: For Hosts */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Hosts</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/for-hosts" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Why List With Us
                </Link>
              </li>
              <li>
                <Link href="/submit-property" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  List Your Property
                </Link>
              </li>
              <li>
                <Link href="/host-resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Host Resources
                </Link>
              </li>
              <li>
                <Link href="/help?tab=hosts" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Host Help →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: FIFA 2026 */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">FIFA 2026</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/fifa-2026" className="block py-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  All Host Cities
                </Link>
              </li>
              <li>
                <Link href="/fifa-2026/guides/planning-your-trip" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Booking Guide
                </Link>
              </li>
              <li>
                <Link href="/help?tab=fifa" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                  FAQ →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} TrustYourHost. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/site-navigation" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
