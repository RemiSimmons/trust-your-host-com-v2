import { Metadata } from "next"
import { getArticlesByCategory } from "@/lib/data/articles"
import { ArticleCard } from "@/components/articles/article-card"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { Map, Trophy, Compass } from "lucide-react"

export const metadata: Metadata = {
  title: "City Guides | TrustYourHost",
  description: "Destination guides, FIFA 2026 city guides, and travel tips for your next adventure. Plan your perfect trip.",
}

export default function GuidesPage() {
  const articles = getArticlesByCategory("guides")
  const featuredArticles = articles.filter((a) => a.featured)
  const otherArticles = articles.filter((a) => !a.featured)
  const fifaGuides = articles.filter((a) => a.tags.includes("FIFA 2026"))

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-6">
              <Compass className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Guides
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Destination guides, travel tips, and insider knowledge to help you plan the perfect trip and find amazing places to stay.
            </p>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90">
              <Trophy className="w-4 h-4" />
              <span className="text-sm">FIFA 2026 Cities</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90">
              <Map className="w-4 h-4" />
              <span className="text-sm">City Guides</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90">
              <Compass className="w-4 h-4" />
              <span className="text-sm">Travel Tips</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* FIFA 2026 Section */}
          {fifaGuides.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-serif font-bold text-gray-900">FIFA World Cup 2026 Guides</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {fifaGuides.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}

          {/* Featured Guides */}
          {featuredArticles.length > 0 && (
            <div className="mb-16">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">Featured Guides</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredArticles.slice(0, 2).map((article) => (
                  <ArticleCard key={article.id} article={article} variant="featured" />
                ))}
              </div>
            </div>
          )}

          {/* All Guides */}
          {otherArticles.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">All Guides</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 p-8 md:p-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              Planning your trip?
            </h3>
            <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
              Find verified accommodations in destinations around the world. Book directly with trusted hosts.
            </p>
            <a
              href="/search"
              className="inline-flex items-center px-6 py-3 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
            >
              Browse Properties
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
