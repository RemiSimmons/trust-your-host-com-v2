import Link from "next/link"
import { Heart, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

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
              <Link href="https://www.facebook.com/trustyourhost" target="_blank" rel="noopener noreferrer" className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="min-h-[44px] min-w-[44px] flex items-center justify-center text-muted-foreground hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://2minapp.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                2MinApp
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@trustyourhost.com"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>hello@trustyourhost.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+14043010535"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>404-301-0535</span>
                </a>
              </li>
              <li>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Atlanta, GA</span>
                </div>
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

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Safety & Trust
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
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
