"use client";

import { motion } from "framer-motion";
import { fifaCities } from "@/lib/data/fifa-cities";
import { getPropertiesByFifaCity } from "@/lib/data/properties";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Building2, ChevronRight, Map, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function FifaCitiesSection() {
  const router = useRouter();
  const [isMultiCityDialogOpen, setIsMultiCityDialogOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  // Calculate property counts for each city
  const cityPropertyCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    fifaCities.forEach(city => {
      counts[city.id] = getPropertiesByFifaCity(city.id).length
    })
    return counts
  }, [])

  // Gradient colors for city placeholders
  const gradientColors: Record<string, string> = {
    'new-york-new-jersey': 'from-blue-600 to-blue-900',
    'miami-gardens': 'from-cyan-500 to-blue-600',
    'atlanta': 'from-red-600 to-orange-700',
    'boston': 'from-blue-700 to-indigo-800',
    'philadelphia': 'from-green-600 to-teal-700',
    'kansas-city': 'from-red-600 to-red-800',
    'dallas': 'from-blue-600 to-blue-900',
    'houston': 'from-orange-600 to-red-700',
    'seattle': 'from-teal-600 to-green-700',
    'san-francisco': 'from-orange-500 to-red-600',
    'los-angeles': 'from-purple-600 to-pink-700',
  };

  const toggleCitySelection = (cityId: string) => {
    setSelectedCities(prev => 
      prev.includes(cityId) 
        ? prev.filter(id => id !== cityId)
        : [...prev, cityId]
    );
  };

  const openAllSelectedCities = () => {
    if (selectedCities.length === 0) return;
    
    // Navigate to combined search results instead of opening multiple tabs
    const cityIds = selectedCities.join(',');
    router.push(`/search?event=fifa-2026&city=${cityIds}`);
    
    setIsMultiCityDialogOpen(false);
    setSelectedCities([]);
  };

  return (
    <section
      id="fifa-cities-section"
      className="relative py-16 sm:py-20 md:py-24"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Glassmorphic Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/90 to-green-600/90 backdrop-blur-xl text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-2xl border border-white/20 ring-1 ring-white/10">
            <span className="text-xl">🏆</span>
            <span className="tracking-wide">FIFA WORLD CUP 2026</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
            Stay in the Action
          </h2>

          <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Book your vacation rental in one of 11 US host cities. From group stage to the final, 
            find the perfect home base for the world's biggest sporting event.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-white/90">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>June - July 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>11 Host Cities</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>80+ Matches</span>
            </div>
          </div>
        </motion.div>

        {/* Glassmorphic Frame around Cards Grid */}
        <div className="relative bg-white/[0.19] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-white/30 ring-1 ring-black/5">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-transparent to-green-500/5 pointer-events-none" />
          
          {/* City Cards Container - Horizontal scroll on mobile, grid on tablet+ */}
          <div className="relative flex overflow-x-auto snap-x snap-mandatory gap-3 pb-4 -mx-6 px-6
                         sm:grid sm:grid-cols-2 sm:overflow-visible sm:mx-0 sm:px-0 sm:gap-6
                         lg:grid-cols-3 xl:grid-cols-4 
                         scrollbar-hide"
               style={{
                 scrollbarWidth: 'none',
                 msOverflowStyle: 'none'
               }}>
          {/* Multi-City Tour Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="min-w-[280px] flex-shrink-0 snap-center sm:min-w-0 sm:flex-shrink"
          >
            <button
              onClick={() => setIsMultiCityDialogOpen(true)}
              className="group block w-full text-left"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 animate-gradient-xy">
                  {/* Animated pattern overlay */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.3),transparent_50%)] animate-pulse" />
                  </div>
                </div>

                {/* Subtle gradient for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Special Badge */}
                <div className="absolute top-4 left-4 right-4 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-purple-600 text-xs font-semibold shadow-lg">
                    <Map className="w-3 h-3" />
                    <span>MULTI-CITY TOUR</span>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Map className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 drop-shadow-lg">
                    <span className="text-2xl">🗺️</span>
                    <span>Plan Multi-City Tour</span>
                  </h3>

                  <div className="flex items-center gap-1.5 text-white/95 text-sm mb-3">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">Select multiple cities at once</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-white/90 text-sm">
                      <span>Open all selected cities</span>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-white/60 transition-all duration-300" />
              </div>
            </button>
          </motion.div>

          {/* Individual City Cards */}
          {fifaCities.map((city, index) => {
            const [imageError, setImageError] = useState(false);
            
            return (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="min-w-[280px] flex-shrink-0 snap-center sm:min-w-0 sm:flex-shrink"
            >
              <Link
                href={`/search?event=fifa-2026&city=${city.id}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-2">
                  {/* Background Image/Gradient - Full Card Fill */}
                  <div className="absolute inset-0">
                    {!imageError && (
                      <Image
                        src={`/fifa-cities/${city.id}.jpg`}
                        alt={`${city.displayName} - FIFA 2026 Host City`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        onError={() => setImageError(true)}
                      />
                    )}
                    {/* Gradient Fallback */}
                    {imageError && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradientColors[city.id] || 'from-blue-600 to-green-600'}`}>
                        {/* Subtle pattern overlay */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                      </div>
                    )}
                  </div>

                  {/* Subtle gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top Badges Row */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    {/* FIFA 2026 Badge (Left) */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500 text-white text-xs font-semibold shadow-lg">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>FIFA 2026</span>
                    </div>

                    {/* Match Count Badge (Right) */}
                    <div className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold shadow-lg">
                      {city.stadium.matchesHosted} Matches
                    </div>
                  </div>

                  {/* Special Tournament Badge (Top Left Corner Below FIFA Badge) */}
                  {city.stadium.rounds.includes("Final") && (
                    <div className="absolute top-14 left-4 z-10">
                      <div className="px-2.5 py-1 rounded-md bg-yellow-500 text-xs font-bold text-gray-900 shadow-lg animate-pulse">
                        ⭐ FINAL
                      </div>
                    </div>
                  )}
                  {city.stadium.rounds.includes("Semifinal") && !city.stadium.rounds.includes("Final") && (
                    <div className="absolute top-14 left-4 z-10">
                      <div className="px-2.5 py-1 rounded-md bg-yellow-600 text-xs font-bold text-white shadow-lg">
                        SEMIFINAL
                      </div>
                    </div>
                  )}

                  {/* Bottom Content Area (Over Image) */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    {/* City Name with Emoji */}
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 drop-shadow-lg">
                      <span className="text-2xl">{city.emoji}</span>
                      <span>{city.name}</span>
                    </h3>

                    {/* Stadium Name */}
                    <div className="flex items-center gap-1.5 text-white/95 text-sm mb-3">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium line-clamp-1">{city.stadium.officialName}</span>
                    </div>

                    {/* Property Count and Details */}
                    <div className="flex items-center justify-between">
                      {/* Property Count */}
                      <div className="flex items-center gap-1.5 text-white/90 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{cityPropertyCounts[city.id] || 0} properties</span>
                      </div>

                      {/* View Arrow */}
                      <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#d4af37]/60 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
            );
          })}
          </div>
        </div>

        {/* Search All FIFA Properties CTA */}
        <div className="mt-12 text-center">
          <Link href="/search?event=fifa-2026">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-6 text-lg shadow-xl"
            >
              <Map className="w-5 h-5 mr-2" />
              Search All FIFA 2026 Properties
            </Button>
          </Link>
        </div>

        {/* Multi-City Selection Dialog */}
        <Dialog open={isMultiCityDialogOpen} onOpenChange={setIsMultiCityDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-2xl">
                <Map className="h-6 w-6 text-purple-600" />
                Plan Your Multi-City FIFA 2026 Tour
              </DialogTitle>
              <DialogDescription>
                Select the cities you want to visit. We'll open all of them in separate tabs so you can compare properties and plan your journey.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Selected Count */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">
                    {selectedCities.length} {selectedCities.length === 1 ? 'city' : 'cities'} selected
                  </span>
                </div>
                {selectedCities.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCities([])}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              {/* City Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {fifaCities.map((city) => {
                  const isSelected = selectedCities.includes(city.id);
                  
                  return (
                    <button
                      key={city.id}
                      onClick={() => toggleCitySelection(city.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                      }`}
                    >
                      {/* Selection Indicator */}
                      <div className="absolute top-2 right-2">
                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
                        )}
                      </div>

                      {/* City Info */}
                      <div className="pr-8">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{city.emoji}</span>
                          <h4 className="font-bold text-gray-900">{city.name}</h4>
                        </div>
                        
                        <div className="space-y-1 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            <span className="line-clamp-1">{city.stadium.officialName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{city.stadium.matchesHosted} matches</span>
                          </div>
                        </div>

                        {/* Special Badges */}
                        <div className="mt-2 flex flex-wrap gap-1">
                          {city.stadium.rounds.includes("Final") && (
                            <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                              ⭐ Final
                            </Badge>
                          )}
                          {city.stadium.rounds.includes("Semifinal") && (
                            <Badge variant="secondary" className="text-xs">
                              Semifinal
                            </Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setIsMultiCityDialogOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={openAllSelectedCities}
                  disabled={selectedCities.length === 0}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Map className="w-4 h-4 mr-2" />
                  Open {selectedCities.length > 0 ? `${selectedCities.length} ` : ''}
                  {selectedCities.length === 1 ? 'City' : 'Cities'}
                </Button>
              </div>

              {/* Helper Text */}
              {selectedCities.length > 0 && (
                <p className="text-xs text-gray-500 text-center">
                  💡 Tip: Each city will open in a new tab so you can compare properties easily
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Glassmorphic Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/40 ring-1 ring-black/5">
            <p className="text-gray-700 font-medium mb-6 text-lg">
              Can't decide? Explore all FIFA 2026 properties across all host cities.
            </p>
            <Link
              href="/fifa-2026"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 border border-white/20"
            >
              <span>Explore All FIFA 2026 Host Cities</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
