"use client"

import { motion } from "framer-motion"
import { Sparkles, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HostHero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
      {/* Background image - host focused */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=80)",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full mb-6 border border-accent/30"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-accent font-medium text-sm">For Property Owners</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-5xl lg:text-7xl text-white font-bold mb-6 leading-tight"
            >
              Get Discovered by Travelers Booking Direct
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed"
            >
              List your property on our curated directory. Connect with travelers seeking authentic stays.
              No booking commissions—just $49/month.
            </motion.p>

            {/* Key stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-8 mb-10 text-white"
            >
              <div>
                <div className="text-4xl font-bold text-accent mb-1">100%</div>
                <div className="text-white/80 text-sm">Your Revenue</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-1">60 Days</div>
                <div className="text-white/80 text-sm">Free Trial</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-1">0%</div>
                <div className="text-white/80 text-sm">Booking Fees</div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/submit-property">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl"
                >
                  Start Your Free Trial
                </Button>
              </Link>
              <Link href="#roi-calculator">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-white/10 backdrop-blur-md border-2 border-white text-white hover:bg-white/20 hover:text-white"
                >
                  Calculate Savings
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="h-8 w-8 text-white/60" />
      </motion.div>
    </section>
  )
}
