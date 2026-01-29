import { Metadata } from "next"
import { getArticlesByCategory } from "@/lib/data/articles"
import { ArticleCard } from "@/components/articles/article-card"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { BookOpen, TrendingUp, Lightbulb } from "lucide-react"

export const metadata: Metadata = {
  title: "Host Resources | TrustYourHost",
  description: "Action-oriented guides and practical resources to help hosts adapt, plan, and operate more effectively.",
}

export default function HostResourcesPage() {
  const articles = getArticlesByCategory("resources")
  const featuredArticle = articles.find((a) => a.featured)
  const otherArticles = articles.filter((a) => a.id !== featuredArticle?.id)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-6">
              <BookOpen className="w-8 h-8 text-purple-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Host Resources
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Action-oriented guides and practical resources to help you adapt, plan, and operate more effectively. Build resilience and protect your hosting business.
            </p>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Cost Management</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Guest Management</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90">
              <Lightbulb className="w-4 h-4" />
              <span className="text-sm">Event Planning</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-16">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">Featured</h2>
              <ArticleCard article={featuredArticle} variant="featured" />
            </div>
          )}

          {/* All Articles */}
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">All Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 md:p-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              Ready to build a more resilient hosting business?
            </h3>
            <p className="text-purple-100 mb-6 max-w-xl mx-auto">
              Join TrustYourHost and connect directly with travelers while maintaining control over your pricing, policies, and guest relationships.
            </p>
            <a
              href="/become-host"
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
            >
              List Your Property
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
