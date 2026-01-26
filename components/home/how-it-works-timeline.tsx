"use client"

import { motion } from "framer-motion"
import Link from "next/link"

function TimelineStep({
  number,
  title,
  description,
  duration,
  delay,
}: {
  number: string
  title: string
  description: string
  duration: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative pl-24 pb-16 last:pb-0"
    >
      {/* Number badge */}
      <div className="absolute left-0 w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg z-10">
        <span className="text-2xl font-bold text-white">{number}</span>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-serif text-2xl font-bold text-primary">{title}</h3>
          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">{duration}</span>
        </div>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

export function HowItWorksTimeline() {
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
            From Discovery to Direct Bookings
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Launch your direct booking website in just 4 simple steps
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Vertical timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-accent via-accent to-accent/30" />

            {/* Step 1 */}
            <TimelineStep
              number="1"
              title="List Your Property"
              description="Submit your property details and direct booking website URL. Takes 5 minutes. No credit card required to start your 60-day free trial."
              duration="5 minutes"
              delay={0}
            />

            {/* Step 2 */}
            <TimelineStep
              number="2"
              title="Get Verified"
              description="We manually review and verify your property within 24-48 hours. We check your booking website, photos, and property details for quality."
              duration="24-48 hours"
              delay={0.1}
            />

            {/* Step 3 */}
            <TimelineStep
              number="3"
              title="Go Live"
              description="Your property appears in our directory with prominent FIFA 2026 placement. Travelers click through to book on your site. Your 60-day trial begins."
              duration="Immediate"
              delay={0.2}
            />

            {/* Step 4 */}
            <TimelineStep
              number="4"
              title="Track Performance"
              description="Access your host dashboard to see click analytics, property views, and traffic sources. After 60 days, just $49/month to stay listed."
              duration="Ongoing"
              delay={0.3}
            />
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/submit-property">
              <button className="px-8 py-4 bg-accent text-white rounded-lg font-semibold text-lg hover:bg-accent/90 transition-all shadow-lg">
                Start Your 60-Day Free Trial
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
