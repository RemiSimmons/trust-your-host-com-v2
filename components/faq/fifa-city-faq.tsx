'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface FifaCityFAQProps {
  cityName: string
}

export function FifaCityFAQ({ cityName }: FifaCityFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const cityFAQs = [
    {
      question: `When should I book accommodation for FIFA World Cup 2026 in ${cityName}?`,
      answer: `Demand around match days in ${cityName} will be high, so it's smart to start looking as soon as you have a rough idea of your dates. Our city page highlights typical busy periods and helps you find hosts who are prepared for event-level stays.`
    },
    {
      question: `Which neighborhoods are best for staying near the stadium in ${cityName}?`,
      answer: `${cityName}'s page lists the main neighborhoods within a reasonable travel time of the stadium, along with what they're known for (quiet, nightlife, family-friendly, etc.). You can use those neighborhood names as filters when browsing listings to quickly focus on the areas that fit your trip style.`
    },
    {
      question: `How far are typical stays from the stadium in ${cityName} and how do I get there?`,
      answer: `Listings show approximate distance or travel time to the stadium where hosts have provided that detail. We also share common transport options—such as local transit lines and rideshare zones—so you can estimate match-day travel in ${cityName}.`
    },
    {
      question: `Will prices be higher during FIFA 2026 in ${cityName} and are there minimum stays?`,
      answer: `Many hosts in ${cityName} adjust pricing and minimum stay requirements during major events, including FIFA 2026. You'll see those details on each host's site or booking page, so compare a few options and dates to find the right balance of budget and convenience.`
    },
    {
      question: "Can I combine multiple cities into one FIFA 2026 trip?",
      answer: `Yes. You can use TrustYourHost to explore stays across different host cities, then bookmark or save your favorites to plan a multi-city itinerary. Many guests choose one "home base" city and add 1-2 extra cities for specific matches or sightseeing.`
    }
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            FIFA 2026 FAQs for {cityName}
          </h2>
          <p className="text-lg text-muted-foreground">
            Your guide to planning the perfect World Cup stay
          </p>
        </motion.div>

        <div className="space-y-4">
          {cityFAQs.map((faq, index) => (
            <motion.details
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg group cursor-pointer"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Have more questions about {cityName}?
          </p>
          <a
            href="/fifa-2026"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
          >
            View All FIFA 2026 Cities →
          </a>
        </motion.div>
      </div>
    </section>
  )
}
