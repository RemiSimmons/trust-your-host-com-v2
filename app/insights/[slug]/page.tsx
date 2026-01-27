import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug, getArticlesByCategory } from "@/lib/data/articles"
import { ArticleDetail } from "@/components/articles/article-detail"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return { title: "Article Not Found | TrustYourHost" }
  }

  return {
    title: `${article.title} | Host Insights | TrustYourHost`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
    },
  }
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article || article.category !== "insights") {
    notFound()
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = getArticlesByCategory("insights")
    .filter((a) => a.id !== article.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pt-16">
        <ArticleDetail article={article} relatedArticles={relatedArticles} />
      </main>
      <Footer />
    </div>
  )
}
