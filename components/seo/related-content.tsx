import Link from "next/link"
import Image from "next/image"
import { Article } from "@/lib/types"
import { ArrowRight, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RelatedContentProps {
  articles: Article[]
  title?: string
  description?: string
  className?: string
}

/**
 * Related content section for displaying contextual articles
 * Improves internal linking and helps users discover relevant content
 */
export function RelatedContent({
  articles,
  title = "Related Articles",
  description,
  className,
}: RelatedContentProps) {
  if (!articles || articles.length === 0) return null

  return (
    <section className={className}>
      <div className="space-y-2 mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <RelatedArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

/**
 * Individual article card for related content
 */
function RelatedArticleCard({ article }: { article: Article }) {
  const categoryLabels: Record<string, string> = {
    insights: "Insights",
    guides: "Guides",
    journal: "Journal",
    resources: "Resources",
  }

  const articleUrl = `/${article.category}/${article.slug}`

  return (
    <Link href={articleUrl}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 group">
        {/* Featured Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="bg-background/90">
              {categoryLabels[article.category]}
            </Badge>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {article.excerpt}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{article.readingTime} min read</span>
            </div>
            <div className="flex items-center gap-1 group-hover:text-primary transition-colors">
              <span>Read more</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

/**
 * Compact version for sidebars or inline suggestions
 */
export function RelatedContentCompact({ articles, title }: RelatedContentProps) {
  if (!articles || articles.length === 0) return null

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      <div className="space-y-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/${article.category}/${article.slug}`}
            className="block group"
          >
            <div className="flex gap-3">
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {article.readingTime} min read
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
