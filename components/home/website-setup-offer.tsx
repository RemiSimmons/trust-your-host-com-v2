"use client"

import { motion } from "framer-motion"
import { Check, Rocket } from "lucide-react"
import Link from "next/link"

export function WebsiteSetupOffer() {
  return (
    <section id="website" className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full text-sm font-bold mb-4 shadow-lg">
            <Rocket className="h-4 w-4" />
            <span>Website Setup Service</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Don't Have a Booking Website Yet?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            To list on TrustYourHost, you need a direct booking website. 
            Our trusted partner can build one for you.
          </p>
        </motion.div>

        {/* The Offer - Match existing card styling */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border-2 border-orange-200 dark:border-orange-800 overflow-hidden max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-6">
            <h3 className="text-2xl font-bold mb-2">Professional Booking Website</h3>
            <p className="text-orange-100">Launch-ready in 2-3 business days</p>
          </div>

          <div className="p-8">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-bold text-gray-900 dark:text-white">$500</span>
              <span className="text-gray-600 dark:text-gray-400">one-time setup</span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Professional design</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Booking system & calendar</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Payment processing (Stripe)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Custom domain setup</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Mobile-responsive</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">SEO optimized</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <div className="flex justify-between">
                  <span>Website hosting & maintenance <span className="text-xs text-gray-500">(optional)</span></span>
                  <span className="font-semibold">$25/month</span>
                </div>
                <div className="flex justify-between">
                  <span>TrustYourHost directory listing</span>
                  <span className="font-semibold">$49/month</span>
                </div>
                <div className="border-t border-gray-300 dark:border-gray-600 pt-2 flex justify-between font-bold">
                  <span>Total monthly cost</span>
                  <span className="text-orange-600 text-lg">$49-74/month</span>
                </div>
              </div>
            </div>

            <a
              href="https://remisimmons.com/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center font-bold py-4 rounded-lg transition-colors"
            >
              Get Your Website Built
            </a>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
              Built by RemSimmons, our trusted development partner
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
