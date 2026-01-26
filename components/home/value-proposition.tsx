"use client"

import { motion } from "framer-motion"
import { Globe, Bot, Users, Check } from "lucide-react"

export function ValueProposition() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl text-primary font-bold mb-4">
            Take Control of Your Hosting Business
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to run a profitable, professional short-term rental business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Verified Directory Listing */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <Globe className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Verified Directory Listing</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Get featured in our curated vacation rental directory. We personally review every property and verify 
              your direct booking website before listing.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Manual verification process</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Prominent FIFA 2026 placement</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>SEO-optimized property pages</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Direct click-through to your site</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 2: Qualified Traffic */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <Bot className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Qualified Traffic to Your Site</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              We drive travelers looking for authentic, direct-booking stays to your website. No platform 
              interference—guests book directly with you.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Targeted FIFA 2026 travelers</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Experience-focused audience</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Click analytics dashboard</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>No booking fees or commissions</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 3: Keep Your Independence */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-accent" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-4">Keep Your Independence</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              You maintain full control. Use your existing booking system, pricing, and policies. We're a discovery 
              platform, not a middleman.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Use your own booking site</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Keep 100% of revenue</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Set your own terms</span>
              </li>
              <li className="flex items-start gap-2 text-gray-700">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Direct guest relationships</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
