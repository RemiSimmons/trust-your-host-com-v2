"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { HeroSearch } from "@/components/home/hero-search"
import { FifaBadgeOverlay } from "@/components/home/fifa-badge-overlay"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 sm:pt-28 md:pt-32 lg:pt-20 pb-20 sm:pb-24 overflow-hidden">
      {/* FIFA 2026 Badge Overlay - Desktop only (absolute positioned) */}
      <div className="hidden md:block">
        <FifaBadgeOverlay />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg px-2"
          >
            Find Your Perfect Getaway
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-12 leading-relaxed drop-shadow-md max-w-2xl mx-auto px-4"
          >
            Discover unique homes and unforgettable experiences curated just for you.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="w-full max-w-[1200px] mx-auto mb-6 sm:mb-20"
          >
            <HeroSearch />
          </motion.div>

          {/* FIFA 2026 Badge - Mobile only (below search bar) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:hidden mb-12"
          >
            <FifaBadgeOverlay />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className="h-8 w-8 text-white/60" />
      </motion.div>
    </section>
  )
}
