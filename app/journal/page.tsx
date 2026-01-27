import { Metadata } from "next"
import { getArticlesByCategory } from "@/lib/data/articles"
import { ArticleCard } from "@/components/articles/article-card"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { BookOpen, Heart, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Journal | TrustYourHost",
  description: "Real travel stories from guests who book direct. Discover inspiring experiences and unforgettable stays.",
}

export default function JournalPage() {
  const articles = getArticlesByCategory("journal")
  const featuredArticle = articles.find((a) => a.featured)
  const otherArticles = articles.filter((a) => a.id !== featuredArticle?.id)

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-amber-900 via-amber-800 to-amber-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-6">
              <BookOpen className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Journal
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Real stories from travelers who discovered the joy of booking direct. Inspiring experiences, unforgettable stays, and the connections that made them special.
            </p>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Travel Stories</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90">
              <Users className="w-4 h-4" />
              <span className="text-sm">Guest Experiences</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/90">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Memorable Stays</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Story */}
          {featuredArticle && (
            <div className="mb-16">
              <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">Featured Story</h2>
              <ArticleCard article={featuredArticle} variant="featured" />
            </div>
          )}

          {/* All Stories */}
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-6">More Stories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Share Your Story CTA */}
          <div className="mt-16 p-8 md:p-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              Have a story to share?
            </h3>
            <p className="text-amber-100 mb-6 max-w-xl mx-auto">
              We love hearing about your experiences booking direct. Share your story and inspire other travelers.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-amber-600 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
            >
              Share Your Story
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
