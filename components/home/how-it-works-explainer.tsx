import { Home, Shield, DollarSign, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HowItWorksExplainer() {
  return (
    <section className="py-16 pb-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass morphism container */}
        <div className="bg-white/[0.19] backdrop-blur-2xl rounded-2xl px-5 sm:px-6 lg:px-10 py-12 border border-white/30 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 text-balance drop-shadow-lg">
              How <span className="text-orange-500">TrustYourHost</span> Works
            </h2>
            <p className="text-base text-white/80 max-w-2xl mx-auto text-balance drop-shadow-sm leading-relaxed">
              A curated directory connecting travelers to verified self-hosted booking sites
            </p>
          </div>

          {/* 3 Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Home className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-md">
                View Multiple Self-Hosted Sites
              </h3>
              <p className="text-sm text-white/80 leading-relaxed drop-shadow-sm">
                Browse verified properties with direct booking in one central location
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Shield className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-md">
                Self-Hosting Sites You Can Trust
              </h3>
              <p className="text-sm text-white/80 leading-relaxed drop-shadow-sm">
                Every property and booking website personally reviewed
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <DollarSign className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-md">
                Avoid Middleman Fees
              </h3>
              <p className="text-sm text-white/80 leading-relaxed drop-shadow-sm">
                Book directly with hosts. No booking commissions.
              </p>
            </div>
          </div>

          {/* Learn More Link */}
          <div className="text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold transition-colors group drop-shadow-md text-sm"
            >
              Learn more
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
