import Link from "next/link"
import { Heart, Facebook, Twitter, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-accent fill-accent" />
              <span className="font-serif text-xl font-bold text-foreground">TrustYourHost</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Experience authentic stays with trusted local hosts. Your journey to memorable moments starts here.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://www.facebook.com/trustyourhost" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://2minapp.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                2MinApp
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Search Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/#experiences"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Experiences
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  City Guides
                </Link>
              </li>
              <li>
                <Link href="/journal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Travel Journal
                </Link>
              </li>
              <li>
                <Link href="/fifa-2026" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FIFA 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* For Hosts */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">For Hosts</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/for-hosts"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Why List With Us
                </Link>
              </li>
              <li>
                <Link
                  href="/submit-property"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  List Your Property
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Host Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/host-resources"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Host Resources
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Safety & Trust
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
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
