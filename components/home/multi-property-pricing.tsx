'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Check, TrendingDown } from 'lucide-react'

export function MultiPropertyPricing() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            <TrendingDown className="h-4 w-4" />
            Volume Discount
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Manage Multiple Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One account, one dashboard, volume pricing. Add as many properties as you want.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* First Property */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-2 border-orange-200 dark:border-orange-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-orange-600 text-white px-4 py-1 text-xs font-bold">
                FIRST PROPERTY
              </div>
              <CardContent className="pt-12 pb-8">
                <div className="text-center mb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">First property</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-orange-600">$49</span>
                    <span className="text-xl text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">After 60-day free trial</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">60-day free trial</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Verified directory listing</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Click analytics dashboard</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">FIFA 2026 Featured placement</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Additional Properties */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-2 border-blue-200 dark:border-blue-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 text-xs font-bold">
                20% OFF
              </div>
              <CardContent className="pt-12 pb-8">
                <div className="text-center mb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Additional properties</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-blue-600">$39</span>
                    <span className="text-xl text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm font-medium text-green-600 mt-2">Save $10/month per property!</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">All features included</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Same account, one dashboard</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Combined analytics view</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">No trial (billed immediately)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Unlimited properties</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pricing Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-xl font-bold text-center mb-6">Pricing Examples</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$49</p>
              <p className="text-sm text-muted-foreground">1 property</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$88</p>
              <p className="text-sm text-muted-foreground">2 properties</p>
              <p className="text-sm text-green-600 mt-1">Save $10/mo</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$127</p>
              <p className="text-sm text-muted-foreground">3 properties</p>
              <p className="text-sm text-green-600 mt-1">Save $20/mo</p>
            </div>
          </div>
          <p className="text-sm text-center text-muted-foreground mt-6">
            * First property includes 60-day free trial. Additional properties billed immediately at the discounted rate.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
