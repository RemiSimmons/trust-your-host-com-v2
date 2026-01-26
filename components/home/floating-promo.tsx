"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Globe } from "lucide-react"
import Link from "next/link"

const messages = [
  { 
    icon: Sparkles,
    text: "60-Day Free Trial", 
    subtext: "Start listing today", 
    link: "/submit-property" 
  },
  { 
    icon: Globe,
    text: "Need a Website?", 
    subtext: "Built for $500", 
    link: "https://remisimmons.com/contact" 
  },
]

export function FloatingPromo() {
  const [messageIndex, setMessageIndex] = useState(0)
  const [isMorphing, setIsMorphing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Start morph animation
      setIsMorphing(true)
      
      // Change message after retraction (halfway through)
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length)
      }, 400)
      
      // End morph animation
      setTimeout(() => {
        setIsMorphing(false)
      }, 800)
    }, 5000) // Change every 5 seconds
    
    return () => clearInterval(interval)
  }, [])

  const currentMessage = messages[messageIndex]
  const Icon = currentMessage.icon

  return (
    <Link
      href={currentMessage.link}
      target={currentMessage.link.startsWith('http') ? '_blank' : undefined}
      rel={currentMessage.link.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="fixed bottom-8 right-8 z-50 hidden md:block group"
    >
      <motion.div
        animate={{
          width: isMorphing ? "64px" : "280px",
          height: "64px",
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-shadow duration-300 overflow-hidden relative"
        whileHover={{ y: -4 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-6"
            >
              {/* Icon */}
              <Icon className="w-6 h-6 flex-shrink-0" />
              
              {/* Text - only show when not morphing */}
              <AnimatePresence>
                {!isMorphing && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1"
                  >
                    <div className="font-bold text-sm leading-tight whitespace-nowrap">
                      {currentMessage.text}
                    </div>
                    <div className="text-xs text-orange-100 leading-tight whitespace-nowrap">
                      {currentMessage.subtext}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </Link>
  )
}
