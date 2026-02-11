'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { homepageFaqs } from '@/lib/data/homepage-faqs'

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
          {homepageFaqs.map((faq, index) => (
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

                    {/* Learn more link */}
                    <Link
                      href={faq.learnMoreHref}
                      className="inline-flex items-center gap-1.5 text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium group/link"
                    >
                      {faq.learnMoreText}
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all FAQs - Hub & Spoke link to comprehensive help center */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/help"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 border border-orange-600 rounded-lg text-white font-semibold transition-all"
          >
            View all FAQs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
