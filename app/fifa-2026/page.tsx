import { Metadata } from "next";
import Link from "next/link";
import { fifaCities } from "@/lib/data/fifa-cities";
import { NavBar } from "@/components/navigation/nav-bar";
import { Footer } from "@/components/navigation/footer";
import { FifaCitiesSection } from "@/components/home/fifa-cities-section";
import { 
  MapPin, 
  Calendar, 
  Building2, 
  Trophy,
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 USA - Host Cities & Vacation Rentals | TrustYourHost",
  description: "Find perfect vacation rentals for FIFA World Cup 2026 across 11 US host cities. Book direct accommodation near stadiums in New York, LA, Miami, Dallas, and more. Save on fees.",
  keywords: "FIFA World Cup 2026, FIFA 2026 accommodation, World Cup vacation rentals, FIFA host cities, World Cup hotels, soccer rentals USA",
  openGraph: {
    title: "FIFA World Cup 2026 USA - Host Cities & Vacation Rentals",
    description: "Find perfect vacation rentals for FIFA World Cup 2026 across 11 US host cities.",
    type: "website",
    url: "/fifa-2026",
  },
  alternates: {
    canonical: "/fifa-2026",
  },
};

export const revalidate = 3600

export default function Fifa2026Page() {
  const totalMatches = fifaCities.reduce((sum, city) => sum + city.stadium.matchesHosted, 0);
  const totalCapacity = fifaCities.reduce((sum, city) => sum + city.stadium.capacity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-green-900 dark:from-blue-950 dark:via-blue-900 dark:to-green-950 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg">
              <Trophy className="h-6 w-6 text-white" />
              <span className="font-bold text-lg text-white">FIFA WORLD CUP 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white drop-shadow-2xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_60%)]">
              Stay in the Action <br />
              <span className="text-yellow-400 drop-shadow-2xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_60%)]">Book Near the Stadiums</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-white max-w-3xl mx-auto leading-relaxed drop-shadow-lg [text-shadow:_0_2px_8px_rgb(0_0_0_/_50%)] font-medium">
              Book your vacation rental in one of 11 US host cities. From group stage to the 
              final, find the perfect home base for the world's biggest sporting event.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">11</div>
                <div className="text-sm md:text-base text-white font-semibold">Host Cities</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">{totalMatches}</div>
                <div className="text-sm md:text-base text-white font-semibold">Matches</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-yellow-400">
                  {(totalCapacity / 1000000).toFixed(1)}M+
                </div>
                <div className="text-sm md:text-base text-white font-semibold">Total Seats</div>
              </div>
            </div>

            <Link
              href="/search?fifa2026=true"
              className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <span>Browse All FIFA 2026 Properties</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
              Tournament Timeline
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="flex gap-3 sm:gap-6 items-start">
                  <div className="flex-shrink-0 w-20 sm:w-32 text-right">
                    <div className="font-bold text-sm sm:text-lg text-blue-600">June 11-27</div>
                    <div className="text-xs sm:text-sm text-gray-500">2026</div>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-600 mt-1" />
                  <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-4 sm:pl-6 ml-2">
                    <h3 className="font-bold text-lg sm:text-xl mb-2">Group Stage</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      48 teams compete across all 11 host cities in the opening round. 
                      Every city hosts multiple matches during this exciting phase.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-6 items-start">
                  <div className="flex-shrink-0 w-20 sm:w-32 text-right">
                    <div className="font-bold text-sm sm:text-lg text-blue-600">June 29 - July 3</div>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-600 mt-1" />
                  <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-4 sm:pl-6 ml-2">
                    <h3 className="font-bold text-lg sm:text-xl mb-2">Round of 32</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      The knockout stage begins as the top teams from the group stage compete 
                      for a spot in the Round of 16.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-6 items-start">
                  <div className="flex-shrink-0 w-20 sm:w-32 text-right">
                    <div className="font-bold text-sm sm:text-lg text-blue-600">July 5-8</div>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-600 mt-1" />
                  <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-4 sm:pl-6 ml-2">
                    <h3 className="font-bold text-lg sm:text-xl mb-2">Round of 16</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      16 teams remain in the hunt for glory. Every match becomes crucial 
                      as the competition intensifies.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-6 items-start">
                  <div className="flex-shrink-0 w-20 sm:w-32 text-right">
                    <div className="font-bold text-sm sm:text-lg text-blue-600">July 9-11</div>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-orange-600 mt-1" />
                  <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-4 sm:pl-6 ml-2">
                    <h3 className="font-bold text-lg sm:text-xl mb-2">Quarterfinals</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Eight teams battle for semifinal spots in matches held across select host cities.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-6 items-start">
                  <div className="flex-shrink-0 w-20 sm:w-32 text-right">
                    <div className="font-bold text-sm sm:text-lg text-blue-600">July 14-15</div>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-purple-600 mt-1" />
                  <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-4 sm:pl-6 ml-2">
                    <h3 className="font-bold text-lg sm:text-xl mb-2">Semifinals</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Four teams remain. Two matches determine who plays for the championship.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-6 items-start">
                  <div className="flex-shrink-0 w-20 sm:w-32 text-right">
                    <div className="font-bold text-sm sm:text-lg text-yellow-600">July 19</div>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 rounded-full bg-yellow-600 mt-1 ring-4 ring-yellow-200" />
                  <div className="flex-1 pl-4 sm:pl-6 ml-2">
                    <h3 className="font-bold text-lg sm:text-xl mb-2 flex items-center gap-2">
                      <span>Final</span>
                      <Trophy className="h-5 w-5 text-yellow-600" />
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-2">
                      The world watches as two nations compete for the greatest prize in sports 
                      at MetLife Stadium in New York/New Jersey.
                    </p>
                    <Link
                      href="/fifa-2026/new-york-new-jersey"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                      <span>View Final Host City Details</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Host Cities Section */}
        <FifaCitiesSection variant="dark" />

        {/* Why Book with TrustYourHost */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-center">
              Why Book Your FIFA 2026 Stay with TrustYourHost?
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              The smart way to experience the World Cup
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="font-bold text-xl mb-3">More Space, Better Value</h3>
                <p className="text-gray-700">
                  Get entire homes with multiple bedrooms, kitchens, and living spaces for less 
                  than cramped hotel rooms. Perfect for groups and families.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="font-bold text-xl mb-3">Prime Locations</h3>
                <p className="text-gray-700">
                  Stay in walkable neighborhoods near stadiums with easy access to dining, 
                  nightlife, and local attractions. Experience the city like a local.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
                <div className="text-4xl mb-4">💰</div>
                <h3 className="font-bold text-xl mb-3">Book Direct, Save More</h3>
                <p className="text-gray-700">
                  Connect directly with property owners and avoid hefty platform fees. 
                  More money for match tickets and experiences!
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-xl mb-3">FIFA 2026 Focused</h3>
                <p className="text-gray-700">
                  Properties curated specifically for World Cup travelers. Hosts understand 
                  match schedules, transit, and fan needs.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="font-bold text-xl mb-3">Verified Listings</h3>
                <p className="text-gray-700">
                  All properties are verified with photo verification and host identity checks. 
                  Book with confidence for this once-in-a-lifetime event.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-bold text-xl mb-3">Easy Booking</h3>
                <p className="text-gray-700">
                  Simple search, instant booking, and direct communication with hosts. 
                  No complicated processes or hidden fees.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Trophy className="h-16 w-16 mx-auto mb-6" />
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Don't Miss the World's Biggest Event
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Book your FIFA 2026 accommodation today and secure your spot in history
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search?fifa2026=true"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Explore All Properties</span>
                <ChevronRight className="h-5 w-5" />
              </Link>

              <Link
                href="/submit-property"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-2 border-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
              >
                <span>List Your Property</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
