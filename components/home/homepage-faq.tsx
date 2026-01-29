'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: "What is TrustYourHost and how is it different from Airbnb or Vrbo?",
    answer: "TrustYourHost is a curated directory, not a booking platform. We send guests directly to your own website—we don't add guest service fees or control your policies. You maintain full control of pricing, guest communication, and bookings.",
    detailLink: "/faq/what-is-trustyourhost",
    links: [
      { text: "Full Answer: What is TrustYourHost?", href: "/faq/what-is-trustyourhost" },
      { text: "For Hosts: How TrustYourHost Works", href: "/for-hosts" }
    ],
    category: "host"
  },
  {
    question: "Can I keep using Airbnb, Vrbo, or other platforms if I list on TrustYourHost?",
    answer: "Yes, we are non-exclusive. Most hosts use TrustYourHost alongside OTAs to get more profitable direct bookings while keeping their existing listings active.",
    detailLink: "/faq/can-i-use-with-otas",
    links: [
      { text: "Full Answer: Using Multiple Platforms", href: "/faq/can-i-use-with-otas" },
      { text: "List Your Property", href: "/submit-property" }
    ],
    category: "host"
  },
  {
    question: "Do I book on TrustYourHost or directly with the host?",
    answer: "You discover places on TrustYourHost, then book directly on the host's website or chosen channel. We don't process your payment—everything happens between you and the host.",
    detailLink: "/faq/how-to-book",
    links: [
      { text: "Full Answer: How Booking Works", href: "/faq/how-to-book" },
      { text: "Browse Properties", href: "/search" }
    ],
    category: "guest"
  },
  {
    question: "Are there service or booking fees for guests?",
    answer: "TrustYourHost doesn't add a guest service fee. You pay whatever total the host shows on their own site—no platform markups or hidden fees.",
    detailLink: "/faq/guest-fees",
    links: [
      { text: "Full Answer: Guest Fees & Pricing", href: "/faq/guest-fees" },
      { text: "How It Works", href: "/how-it-works" }
    ],
    category: "guest"
  },
  {
    question: "How does TrustYourHost help with FIFA World Cup 2026 stays?",
    answer: "We highlight trusted hosts in all FIFA 2026 host cities and let you filter by city, neighborhood, and stadium proximity so you can book direct for match days.",
    detailLink: "/faq/fifa-2026-stays",
    links: [
      { text: "Full Answer: FIFA 2026 Accommodations", href: "/faq/fifa-2026-stays" },
      { text: "Browse All FIFA 2026 Cities", href: "/fifa-2026" }
    ],
    category: "fifa"
  },
  {
    question: "How do I find stays near FIFA 2026 stadiums and fan zones?",
    answer: "Visit our FIFA 2026 section, choose your host city, then filter by stadium proximity and neighborhood preferences to find the perfect match-day accommodation.",
    detailLink: "/faq/finding-fifa-properties",
    links: [
      { text: "View FIFA 2026 City Guides", href: "/fifa-2026" }
    ],
    category: "fifa"
  }
]

export function HomepageFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Everything you need to know about TrustYourHost
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden hover:border-white/30 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left group"
                >
                  <span className="font-semibold text-white text-lg pr-4 group-hover:text-orange-400 transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-white/80 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-5"
                  >
                    <p className="text-white/80 leading-relaxed mb-4">
                      {faq.answer}
                    </p>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                      {faq.links.map((link, linkIndex) => (
                        <Link
                          key={linkIndex}
                          href={link.href}
                          className="inline-flex items-center gap-1.5 text-sm text-orange-400 hover:text-orange-300 transition-colors group"
                        >
                          {link.text}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* More FAQs Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center space-y-4"
        >
          <p className="text-white/80 text-sm">
            Looking for more detailed information?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 border border-orange-600 rounded-lg text-white font-semibold transition-all"
            >
              View All FAQs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/for-hosts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-lg text-white font-medium transition-all"
            >
              For hosts
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-lg text-white font-medium transition-all"
            >
              For travelers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
