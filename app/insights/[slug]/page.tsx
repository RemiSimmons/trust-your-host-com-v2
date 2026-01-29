import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug, getAllArticles } from "@/lib/data/articles"
import { ArticleDetail } from "@/components/articles/article-detail"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { generateArticleMetadata } from "@/lib/seo/metadata"
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { Breadcrumbs, generateArticleBreadcrumbs } from "@/components/seo/breadcrumbs"
import { findRelatedArticles } from "@/lib/seo/related-content"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return { title: "Article Not Found | TrustYourHost" }
  }

  return generateArticleMetadata(article)
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article || article.category !== "insights") {
    notFound()
  }

  // Get all articles for better related content matching
  const allArticles = getAllArticles()
  const relatedArticles = findRelatedArticles(article, allArticles, 3)

  // Generate schema markup
  const canonicalUrl = `https://trustyourhost.com/insights/${article.slug}`
  const articleSchema = generateArticleSchema(article, canonicalUrl)
  const breadcrumbItems = generateArticleBreadcrumbs("insights", article.title)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems.map((item) => ({
    name: item.label,
    url: item.href ? `https://trustyourhost.com${item.href}` : undefined,
  })))

  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup schema={[articleSchema, breadcrumbSchema]} />
      <NavBar />
      <main className="flex-1 pt-16">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        
        <ArticleDetail article={article} relatedArticles={relatedArticles} />
      </main>
      <Footer />
    </div>
  )
}
