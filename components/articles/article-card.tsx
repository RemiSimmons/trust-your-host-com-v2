"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import type { Article } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ArticleCardProps {
  article: Article
  variant?: "default" | "featured" | "compact"
  className?: string
}

const categoryPaths = {
  insights: "/insights",
  guides: "/guides",
  journal: "/journal",
}

const categoryLabels = {
  insights: "Host Insights",
  guides: "Guide",
  journal: "Journal",
}

const categoryColors = {
  insights: "bg-blue-100 text-blue-700",
  guides: "bg-emerald-100 text-emerald-700",
  journal: "bg-amber-100 text-amber-700",
}

export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  const href = `${categoryPaths[article.category]}/${article.slug}`
  
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  if (variant === "featured") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn("group", className)}
      >
        <Link href={href} className="block">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-medium mb-3", categoryColors[article.category])}>
                {categoryLabels[article.category]}
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                {article.title}
              </h3>
              <p className="text-white/80 line-clamp-2 text-sm md:text-base">
                {article.excerpt}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={article.author.avatar}
                alt={article.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{article.author.name}</p>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readingTime} min read
                  </span>
                </div>
              </div>
            </div>
            <span className="flex items-center gap-1 text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Read <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </motion.article>
    )
  }

  if (variant === "compact") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn("group", className)}
      >
        <Link href={href} className="flex gap-4">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className={cn("inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-1", categoryColors[article.category])}>
              {categoryLabels[article.category]}
            </span>
            <h3 className="font-semibold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2 mb-1">
              {article.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{article.readingTime} min</span>
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  // Default variant
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("group", className)}
    >
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span className={cn("inline-block px-3 py-1 rounded-full text-xs font-medium", categoryColors[article.category])}>
              {categoryLabels[article.category]}
            </span>
          </div>
        </div>
        <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3">
          <Image
            src={article.author.avatar}
            alt={article.author.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{article.author.name}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{article.readingTime} min</span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
