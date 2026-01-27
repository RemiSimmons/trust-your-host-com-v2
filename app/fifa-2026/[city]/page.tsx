import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  MapPin, 
  Calendar, 
  Building2, 
  Plane, 
  Train, 
  Car,
  Clock,
  Users,
  ChevronRight,
  Home,
  Star,
  DollarSign
} from "lucide-react";
import { fifaCities, getCityById } from "@/lib/data/fifa-cities";
import { NavBar } from "@/components/navigation/nav-bar";
import { Footer } from "@/components/navigation/footer";
import { FifaCityFAQ } from "@/components/faq/fifa-city-faq";

interface CityPageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateStaticParams() {
  return fifaCities.map((city) => ({
    city: city.id,
  }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city: cityId } = await params;
  const city = getCityById(cityId);

  if (!city) {
    return {
      title: "City Not Found",
    };
  }

  return {
    title: city.seo.metaTitle,
    description: city.seo.metaDescription,
    keywords: [...city.seo.topSearchPhrases, ...city.seo.longTailKeywords].join(", "),
    openGraph: {
      title: city.seo.metaTitle,
      description: city.seo.metaDescription,
      type: "website",
      url: `/fifa-2026/${city.id}`,
      images: [
        {
          url: city.heroImage,
          width: 1200,
          height: 630,
          alt: `${city.displayName} - FIFA World Cup 2026`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: city.seo.metaTitle,
      description: city.seo.metaDescription,
      images: [city.heroImage],
    },
    alternates: {
      canonical: `/fifa-2026/${city.id}`,
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city: cityId } = await params;
  const city = getCityById(cityId);

  if (!city) {
    notFound();
  }

  // Get other cities for cross-linking (exclude current city)
  const otherCities = fifaCities.filter((c) => c.id !== city.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/fifa-2026" className="text-blue-600 hover:text-blue-700">
              FIFA 2026
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">{city.name}</span>
          </nav>
        </div>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          
          {/* Placeholder for city image */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-green-900" />

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-6xl md:text-8xl">{city.emoji}</span>
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 px-4 py-2 rounded-full">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <span>🏆</span>
                    <span>{city.stadium.matchesHosted} MATCHES</span>
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                FIFA World Cup 2026 in {city.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-lg md:text-xl mb-6">
                <div className="flex items-center gap-2">
                  <Building2 className="h-6 w-6" />
                  <span>{city.stadium.officialName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  <span>{city.stadium.capacity.toLocaleString()} capacity</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {city.stadium.rounds.map((round, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold"
                  >
                    {round}
                  </span>
                ))}
              </div>

              <Link
                href={`/search?city=${city.id}&fifa2026=true`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Find Your Stay</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Match Schedule Section */}
        {city.matches.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">
                Match Schedule
              </h2>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {city.matches.map((match, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border-2 border-blue-100"
                  >
                    <div className="flex items-center gap-2 text-blue-600 mb-3">
                      <Calendar className="h-5 w-5" />
                      <span className="font-semibold">
                        {new Date(match.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{match.round}</h3>
                    {match.time && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{match.time}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Neighborhoods Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-center">
              Where to Stay in {city.name}
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Choose from {city.neighborhoods.length} top neighborhoods near {city.stadium.officialName}
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {city.neighborhoods.map((neighborhood, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-xl">{neighborhood.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-blue-600 font-semibold">
                      <MapPin className="h-4 w-4" />
                      <span>{neighborhood.distanceKm} km</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {neighborhood.description}
                  </p>

                  {neighborhood.avgPriceRange && (
                    <div className="flex items-center gap-2 text-green-600 font-semibold mb-3">
                      <DollarSign className="h-4 w-4" />
                      <span>{neighborhood.avgPriceRange}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700">Transit Options:</h4>
                    <div className="flex flex-wrap gap-2">
                      {neighborhood.transit.map((option, tidx) => (
                        <span
                          key={tidx}
                          className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-md"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/search?city=${city.id}&neighborhood=${encodeURIComponent(neighborhood.name)}`}
                    className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                  >
                    <span>View Properties</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Stay in [City] Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
              Experience {city.name} During the World Cup
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Attractions */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
                  <span className="text-3xl">🎯</span>
                  <span>Top Attractions</span>
                </h3>
                <ul className="space-y-3">
                  {city.highlights.attractions.map((attraction, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{attraction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Dining */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
                <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
                  <span className="text-3xl">🍽️</span>
                  <span>Dining Areas</span>
                </h3>
                <ul className="space-y-3">
                  {city.highlights.diningAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nightlife */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
                <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
                  <span className="text-3xl">🎉</span>
                  <span>Nightlife Districts</span>
                </h3>
                <ul className="space-y-3">
                  {city.highlights.nightlifeDistricts.map((district, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{district}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unique Experiences */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
                <h3 className="font-bold text-2xl mb-6 flex items-center gap-3">
                  <span className="text-3xl">✨</span>
                  <span>Unique Experiences</span>
                </h3>
                <ul className="space-y-3">
                  {city.highlights.uniqueExperiences.map((experience, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{experience}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Getting There Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">
              Getting to {city.name}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Airport */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Plane className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-xl">By Air</h3>
                </div>
                <p className="font-semibold text-lg mb-2">{city.practical.airport.name}</p>
                <p className="text-gray-600 mb-2">Code: {city.practical.airport.code}</p>
                <p className="text-sm text-gray-500">
                  {city.practical.airport.distanceKm} km to stadium
                </p>

                {city.practical.secondaryAirports && city.practical.secondaryAirports.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm font-semibold mb-2">Alternative Airports:</p>
                    <ul className="space-y-1">
                      {city.practical.secondaryAirports.map((airport, idx) => (
                        <li key={idx} className="text-sm text-gray-600">
                          {airport.code} ({airport.distanceKm} km)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Transit */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-full">
                    <Train className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-xl">Transit Tips</h3>
                </div>
                <ul className="space-y-3">
                  {city.practical.transportTips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Time */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-orange-100 rounded-full">
                    <Calendar className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-xl">Best Months</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {city.practical.bestMonths.map((month, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm font-semibold"
                    >
                      {month}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  <strong>Hotel Rate Note:</strong> {city.practical.hotelRateNote}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FifaCityFAQ cityName={city.name} />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
              Ready to Experience FIFA 2026 in {city.name}?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Browse {city.propertyCount || "available"} vacation rentals near {city.stadium.officialName}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/search?city=${city.id}&fifa2026=true`}
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Browse All {city.name} Properties</span>
                <ChevronRight className="h-5 w-5" />
              </Link>

              <Link
                href={`/submit-property?city=${city.id}`}
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-2 border-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
              >
                <span>List Your Property</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Other Cities */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-8 text-center">
              Explore Other FIFA 2026 Host Cities
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCities.map((otherCity) => (
                <Link
                  key={otherCity.id}
                  href={`/fifa-2026/${otherCity.id}`}
                  className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                >
                  <div className="relative h-32 bg-gradient-to-br from-blue-500 to-green-500">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl group-hover:scale-110 transition-transform">
                        {otherCity.emoji}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{otherCity.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{otherCity.stadium.officialName}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-600 font-semibold">
                        {otherCity.stadium.matchesHosted} matches
                      </span>
                      <ChevronRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/fifa-2026"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                <span>View All 11 Host Cities</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
