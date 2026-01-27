'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const hostFAQs = [
  {
    question: "What is TrustYourHost and how is it different from Airbnb or Vrbo?",
    answer: "TrustYourHost is a directory, not a booking platform: we showcase trusted short-term rental hosts and send guests directly to your own website or preferred booking channel. Unlike Airbnb or Vrbo, we do not sit in the middle of the transaction, set your rules, or charge guest service fees on top of your price."
  },
  {
    question: "Is TrustYourHost a booking platform or just a directory?",
    answer: "We are a curated directory: guests discover you on TrustYourHost, then click through to your direct booking site, contact form, or preferred channel to complete the booking. That means you stay in full control of pricing, payments, policies, and guest relationships."
  },
  {
    question: "Do I have to stop using Airbnb, Vrbo, or other OTAs to list on TrustYourHost?",
    answer: "No. Many hosts use TrustYourHost alongside Airbnb, Vrbo, and other OTAs to diversify and drive more profitable direct bookings. You keep your existing listings and simply add TrustYourHost as an additional discovery channel pointing to your direct site or contact method."
  },
  {
    question: "How does TrustYourHost make money if you do not charge guest booking fees?",
    answer: "We do not charge guests a service fee; instead, we charge hosts a flat subscription or listing fee after an initial free period. This keeps our incentives aligned: we focus on sending qualified, high-intent guests to hosts rather than taking a percentage of each booking."
  },
  {
    question: "Is it really free to list my property and for how long?",
    answer: "Yes, new hosts get a free listing period (the first 60 days) so you can test the platform and see the quality of leads. Before your trial ends, we'll clearly show your options and pricing so you can decide whether to continue."
  },
  {
    question: "Can I list if I only have an Airbnb/OTA listing and no direct booking website yet?",
    answer: "Yes. You can start by linking to your existing listing or a contact form while you work on a direct booking site. We'll also provide resources and partner recommendations to help you launch a simple, trustworthy direct booking website when you are ready."
  },
  {
    question: "How does TrustYourHost verify hosts and properties?",
    answer: "Every listing is reviewed by our team for basic identity, property details, website quality, and red-flag signals before going live. We prioritize hosts who present clear information, transparent policies, and consistent branding to help guests feel confident booking direct."
  },
  {
    question: "How can I improve my ranking or visibility in search results on TrustYourHost?",
    answer: "Complete profiles, high-quality photos, clear descriptions, working direct booking links, and accurate location details all help you appear more prominently. Hosts who are highly responsive and keep information up to date are also more likely to be featured in curated collections like FIFA 2026 city pages."
  },
  {
    question: "How can I list my property for FIFA World Cup 2026 host cities?",
    answer: "If your property is in or near a FIFA 2026 host city, you can select the relevant city and stadium proximity tags when you submit your listing. Our team then reviews it for inclusion on that city's World Cup hub so fans can easily find you by location and travel dates."
  }
]

export function DetailedHostFAQ() {
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
            Frequently Asked Questions for Hosts
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about listing on TrustYourHost
          </p>
        </motion.div>

        <div className="space-y-4">
          {hostFAQs.map((faq, index) => (
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
