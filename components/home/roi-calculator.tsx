"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function ROICalculator() {
  const [annualRevenue, setAnnualRevenue] = useState(60000)
  const [currentPlatform, setCurrentPlatform] = useState("airbnb") // airbnb, vrbo, both

  const platformFees = {
    airbnb: 0.15,
    vrbo: 0.12,
    both: 0.14, // Average
  }

  const fee = platformFees[currentPlatform as keyof typeof platformFees]
  const currentFees = annualRevenue * fee
  const withTrustYourHost = 1500 // One-time website + $59/mo * 12
  const annualSavings = currentFees - withTrustYourHost
  const lifetimeSavings = annualSavings * 5 // 5 years

  return (
    <section className="py-24 bg-gradient-to-b from-accent/5 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl text-primary font-bold mb-4">Calculate Your Savings</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how much you could save by switching to direct bookings
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 lg:p-12 border border-gray-200">
          {/* Input: Annual Revenue */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Your Annual Booking Revenue</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500">$</span>
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                className="hidden"
                id="revenue-slider"
              />
              <input
                type="number"
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                className="w-full pl-12 pr-4 py-4 text-3xl font-bold text-gray-900 border-2 border-gray-300 rounded-lg focus:border-accent focus:outline-none"
              />
            </div>
            <input
              type="range"
              min="10000"
              max="200000"
              step="5000"
              value={annualRevenue}
              onChange={(e) => setAnnualRevenue(Number(e.target.value))}
              className="w-full mt-4 accent-accent"
            />
          </div>

          {/* Input: Current Platform */}
          <div className="mb-12">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Current Booking Platform(s)</label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "airbnb", label: "Airbnb", fee: "15%" },
                { value: "vrbo", label: "Vrbo", fee: "12%" },
                { value: "both", label: "Both", fee: "~14%" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setCurrentPlatform(option.value)}
                  className={cn(
                    "p-4 border-2 rounded-lg font-semibold transition-all",
                    currentPlatform === option.value
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-gray-300 text-gray-700 hover:border-gray-400",
                  )}
                >
                  <div className="text-lg">{option.label}</div>
                  <div className="text-sm opacity-75">{option.fee} fees</div>
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Current Platform Fees */}
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <div className="text-sm text-red-600 font-medium mb-2">You're Currently Paying</div>
              <div className="text-4xl font-bold text-red-600 mb-1">${currentFees.toLocaleString()}</div>
              <div className="text-sm text-red-600">per year in platform fees</div>
            </div>

            {/* With TrustYourHost */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <div className="text-sm text-green-600 font-medium mb-2">With TrustYourHost</div>
              <div className="text-4xl font-bold text-green-600 mb-1">${withTrustYourHost.toLocaleString()}</div>
              <div className="text-sm text-green-600">first year investment</div>
            </div>

            {/* Annual Savings */}
            <div className="bg-accent/10 rounded-xl p-6 border-2 border-accent">
              <div className="text-sm text-accent font-medium mb-2">You Save</div>
              <div className="text-4xl font-bold text-accent mb-1">${annualSavings.toLocaleString()}</div>
              <div className="text-sm text-accent">in year one alone</div>
            </div>
          </div>

          {/* 5-Year Projection */}
          <div className="bg-primary rounded-xl p-8 text-center text-white">
            <div className="text-lg mb-2">5-Year Lifetime Savings</div>
            <div className="text-6xl font-bold mb-2">${lifetimeSavings.toLocaleString()}</div>
            <div className="text-white/80">That's real money back in your pocket</div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link href="/submit-property">
              <button className="px-8 py-4 bg-accent text-white rounded-lg font-semibold text-lg hover:bg-accent/90 transition-all shadow-lg">
                Start Saving Today
              </button>
            </Link>
            <p className="text-sm text-gray-500 mt-3">No long-term contracts. Cancel anytime.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
