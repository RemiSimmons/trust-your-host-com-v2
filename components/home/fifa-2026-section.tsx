'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import Link from 'next/link'

const FIFA_HOST_CITIES = [
  { name: 'New York / New Jersey', slug: 'new-york', state: 'NY' },
  { name: 'Miami', slug: 'miami', state: 'FL' },
  { name: 'Atlanta', slug: 'atlanta', state: 'GA' },
  { name: 'Boston', slug: 'boston', state: 'MA' },
  { name: 'Philadelphia', slug: 'philadelphia', state: 'PA' },
  { name: 'Kansas City', slug: 'kansas-city', state: 'MO' },
  { name: 'Dallas', slug: 'dallas', state: 'TX' },
  { name: 'Houston', slug: 'houston', state: 'TX' },
  { name: 'Seattle', slug: 'seattle', state: 'WA' },
  { name: 'San Francisco', slug: 'san-francisco', state: 'CA' },
  { name: 'Los Angeles', slug: 'los-angeles', state: 'CA' }
]

export function FIFA2026Section() {
  return (
    <section id="fifa-cities-section" className="py-16 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
          >
            ⚽ FIFA World Cup 2026
          </motion.div>
          <h2 className="font-serif text-4xl font-bold mb-4">
            Host City Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your perfect stay in one of the 11 US cities hosting the FIFA World Cup 2026
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {FIFA_HOST_CITIES.map((city, index) => (
            <motion.div
              key={city.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/search?city=${city.slug}&fifa2026=true`}
                className="block group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500">
                  <MapPin className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-lg mb-1">{city.name}</h3>
                  <p className="text-sm text-muted-foreground">{city.state}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
