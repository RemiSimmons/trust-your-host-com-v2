import { Home, Shield, DollarSign, ArrowRight } from "lucide-react"
import Link from "next/link"

export function HowItWorksExplainer() {
  return (
    <section className="py-24 pb-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Glass morphism container */}
        <div className="bg-white/[0.03] backdrop-blur-md rounded-3xl px-6 sm:px-8 lg:px-12 py-16 border border-white/[0.08] shadow-2xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 text-balance drop-shadow-lg">
              How <span className="text-orange-500">TrustYourHost</span> Works
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto text-balance drop-shadow-sm leading-relaxed">
              A curated directory connecting travelers to verified self-hosted booking sites
            </p>
          </div>

          {/* 3 Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-12 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Home className="w-10 h-10 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">
                View Multiple Self-Hosted Sites
              </h3>
              <p className="text-white/80 leading-relaxed drop-shadow-sm">
                Browse verified properties with direct booking in one central location
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Shield className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">
                Self-Hosting Sites You Can Trust
              </h3>
              <p className="text-white/80 leading-relaxed drop-shadow-sm">
                Every property and booking website personally reviewed
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <DollarSign className="w-10 h-10 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">
                Avoid Middleman Fees
              </h3>
              <p className="text-white/80 leading-relaxed drop-shadow-sm">
                Book directly with hosts. No booking commissions.
              </p>
            </div>
          </div>

          {/* Learn More Link */}
          <div className="text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white font-semibold transition-colors group drop-shadow-md"
            >
              Learn more
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
