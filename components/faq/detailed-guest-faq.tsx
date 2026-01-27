'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const guestFAQs = [
  {
    question: "What is TrustYourHost and how does it work for guests?",
    answer: "TrustYourHost is a curated directory that helps you discover authentic stays with vetted hosts and then book directly with them. You browse by city, neighborhood, and experience, then click through to the host's own site or chosen channel to complete your reservation."
  },
  {
    question: "Do I book on TrustYourHost or directly with the host?",
    answer: "You do not complete payment on TrustYourHost. Once you find a place you like, you're taken to the host's website or contact method to check availability, review policies, and securely pay."
  },
  {
    question: "Why should I use TrustYourHost instead of only Airbnb, Vrbo, or hotels?",
    answer: "Booking direct with trusted hosts can mean clearer communication, more flexible options, and fewer added service fees. TrustYourHost helps you find those hosts while still giving you transparency about who you're booking with and where you're staying."
  },
  {
    question: "Are there service or booking fees for guests?",
    answer: "TrustYourHost does not add a guest service fee on top of the price you see from the host. You'll pay whatever total the host displays on their own site or booking channel, which is often more transparent than platform-level markups."
  },
  {
    question: "How do you verify that hosts and properties are legitimate?",
    answer: "Before a listing goes live, we review host details, property information, and linked websites for consistency and potential risk signals. We also monitor reports from guests and may remove hosts who fail to meet our standards of trust and transparency."
  },
  {
    question: "Is it safe to book on a host's own website?",
    answer: "Our goal is to feature hosts whose websites use standard security practices, clear policies, and reputable payment processors. Even so, we encourage you to look for secure connections (https), clear terms, and to contact the host with any questions before paying."
  },
  {
    question: "Who processes my payment and handles refunds or cancellations?",
    answer: "Your payment is processed by the host or their booking system, not by TrustYourHost. The host's policies for refunds, changes, and cancellations apply, so always review them on the final booking page before you confirm."
  },
  {
    question: "How do I find stays near FIFA World Cup 2026 stadiums and fan zones?",
    answer: "You can browse our FIFA 2026 section, choose your host city, and then filter listings by stadium proximity and neighborhood. Each city hub highlights areas that are convenient for match days, nightlife, and local attractions."
  }
]

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
