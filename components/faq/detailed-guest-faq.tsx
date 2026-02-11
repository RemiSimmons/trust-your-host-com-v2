'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { guestFAQs } from '@/lib/data/guest-faqs'

export function DetailedGuestFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions for Travelers
          </h2>
          <p className="text-lg text-muted-foreground">
            Your guide to booking authentic stays with trusted hosts
          </p>
        </motion.div>

        <div className="space-y-4">
          {guestFAQs.map((faq, index) => (
            <motion.details
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg group cursor-pointer"
              open={openIndex === index}
              onClick={(e) => {
                e.preventDefault()
                setOpenIndex(openIndex === index ? null : index)
              }}
            >
              <summary className="font-bold text-lg p-6 list-none flex items-center justify-between hover:text-orange-600 transition-colors">
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </summary>
              <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}
