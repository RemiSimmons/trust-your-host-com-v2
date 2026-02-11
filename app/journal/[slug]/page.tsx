import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug, getArticlesByCategory } from "@/lib/data/articles"
import { ArticleDetail } from "@/components/articles/article-detail"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo/schema"
import { generateArticleBreadcrumbs } from "@/lib/seo/breadcrumb-helpers"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  
  if (!article) {
    return { title: "Story Not Found | TrustYourHost" }
  }

  return {
    title: `${article.title} | Journal | TrustYourHost`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
    },
  }
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article || article.category !== "journal") {
    notFound()
  }

  // Get related articles (same category, excluding current)
  const relatedArticles = getArticlesByCategory("journal")
    .filter((a) => a.id !== article.id)
    .slice(0, 4)

  const breadcrumbItems = generateArticleBreadcrumbs("journal", article.title)
  const canonicalUrl = `https://trustyourhost.com/journal/${article.slug}`
  const articleSchema = generateArticleSchema(article, canonicalUrl)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems.map((item) => ({
    name: item.label,
    url: item.href ? `https://trustyourhost.com${item.href}` : undefined,
  })))

  return (
    <div className="min-h-screen flex flex-col">
      <SchemaMarkup schema={[articleSchema, breadcrumbSchema]} />
      <NavBar />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <ArticleDetail article={article} relatedArticles={relatedArticles} />
      </main>
      <Footer />
    </div>
  )
}
