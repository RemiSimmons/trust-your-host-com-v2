"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from "lucide-react"
import type { Article } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import ReactMarkdown from "@/components/articles/react-markdown-wrapper"

interface ArticleDetailProps {
  article: Article
  relatedArticles?: Article[]
}

const categoryPaths = {
  insights: "/insights",
  guides: "/guides",
  journal: "/journal",
  resources: "/host-resources",
}

const categoryLabels = {
  insights: "Host Insights",
  guides: "Guide",
  journal: "Journal",
  resources: "Host Resources",
}

const categoryColors = {
  insights: "bg-blue-100 text-blue-700",
  guides: "bg-emerald-100 text-emerald-700",
  journal: "bg-amber-100 text-amber-700",
  resources: "bg-purple-100 text-purple-700",
}

export function ArticleDetail({ article, relatedArticles }: ArticleDetailProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <article className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] min-h-[400px]">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-24 left-4 md:left-8 z-10">
          <Link href={categoryPaths[article.category]}>
            <Button variant="ghost" className="text-white hover:text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {categoryLabels[article.category]}
            </Button>
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <span className={cn("inline-block px-3 py-1 rounded-full text-sm font-medium mb-4", categoryColors[article.category])}>
              {categoryLabels[article.category]}
            </span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-serif font-bold text-white mb-4"
            >
              {article.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl"
            >
              {article.excerpt}
            </motion.p>
            
            {/* Meta Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 md:gap-6"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white/30"
                />
                <div>
                  <p className="font-medium text-white">{article.author.name}</p>
                  {article.author.role && (
                    <p className="text-sm text-white/70">{article.author.role}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readingTime} min read
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Share/Save Actions */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-gray-500">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500">
              <Bookmark className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Markdown Content */}
        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-gray-700 prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-l-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:py-1 prose-blockquote:not-italic">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        {/* Conversion Links - internal linking for SEO */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Explore TrustYourHost</h3>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors text-sm font-medium"
            >
              Browse Vacation Rentals
            </Link>
            <Link
              href="/submit-property"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              List Your Property
            </Link>
            <Link
              href="/fifa-2026"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
            >
              FIFA 2026 Stays
            </Link>
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl">
            <Image
              src={article.author.avatar}
              alt={article.author.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-900 mb-1">Written by {article.author.name}</p>
              {article.author.role && (
                <p className="text-sm text-gray-600 mb-2">{article.author.role}</p>
              )}
              {article.author.bio && (
                <p className="text-gray-600">{article.author.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <p className="text-gray-600 mb-6">Continue exploring with these related guides and insights.</p>
            <div className="grid gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`${categoryPaths[relatedArticle.category]}/${relatedArticle.slug}`}
                  className="flex gap-4 group"
                >
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={relatedArticle.featuredImage}
                      alt={relatedArticle.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors mb-1">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{relatedArticle.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
