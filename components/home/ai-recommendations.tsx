"use client"
import { useState, useEffect } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { PropertyCard } from "@/components/home/featured-properties"
import type { Property } from "@/lib/types"

export function AIRecommendations({ properties }: { properties: Property[] }) {
  const [recommendations, setRecommendations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (properties.length > 0) {
      fetchRecommendations()
    }
  }, [properties])

  const fetchRecommendations = async () => {
    setIsLoading(true)

    try {
      const userPreferences = {
        experiences: ["Hiking & Trails", "Wellness Retreats"],
        budget: { min: 200, max: 400 },
        travelStyle: "adventure-wellness",
        groupSize: 2,
      }

      const searchHistory = [
        { location: "Blue Ridge, GA", dates: "2024-03-15 to 2024-03-20" },
        { experiences: ["Mountain Lodges", "Hiking & Trails"] },
      ]

      const availableProperties = properties.slice(0, 10).map((p) => ({
        id: p.id,
        name: p.name,
        location: `${p.location.city}, ${p.location.state}`,
        experiences: p.experiences,
        price: p.pricing.baseNightlyRate,
        rating: p.rating.average,
        highlights: p.quickHighlights,
      }))

      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPreferences,
          searchHistory,
          availableProperties,
        }),
      })

      if (!response.ok) throw new Error("Failed to fetch")

      const data = await response.json()
      setRecommendations(data.recommendations || [])
    } catch (error) {
      console.error("Failed to fetch recommendations:", error)
      setRecommendations([])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </div>
    )
  }

  if (recommendations.length === 0) return null

  return (
    <section className="py-24 relative overflow-hidden text-white">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-white/10 backdrop-blur-md rounded-lg">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <span className="text-white/90 font-semibold tracking-wide uppercase text-sm">Curated Just For You</span>
        </div>

        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8 drop-shadow-md">
          Handpicked Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {recommendations.map((rec, index) => {
            const property = properties.find((p) => p.id === rec.propertyId)
            if (!property) return null

            return (
              <div key={index} className="relative">
                {/* AI Match Badge */}
                <div className="absolute top-4 left-4 z-30 bg-accent/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg border border-white/20">
                  <Sparkles className="h-3 w-3 inline mr-1" />
                  {rec.matchScore}% Match
                </div>

                <PropertyCard property={property} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
