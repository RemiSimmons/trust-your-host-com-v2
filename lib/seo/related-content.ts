/**
 * Related content utilities for internal linking
 * Helps users discover relevant content and improves SEO
 */

import { Article, Property } from "@/lib/types"
import { getAllArticles } from "@/lib/data/articles"

export interface RelatedContent {
  articles: Article[]
  properties?: Property[]
}

/**
 * Find related articles based on tags, category, and content similarity
 */
export function findRelatedArticles(
  currentArticle: Article,
  allArticles: Article[],
  limit: number = 3
): Article[] {
  const scoredArticles = allArticles
    .filter((article) => article.id !== currentArticle.id)
    .map((article) => {
      let score = 0

      // Same category gets high score
      if (article.category === currentArticle.category) {
        score += 10
      }

      // Shared tags get points
      const sharedTags = article.tags.filter((tag) =>
        currentArticle.tags.includes(tag)
      )
      score += sharedTags.length * 5

      // Featured articles get slight boost
      if (article.featured) {
        score += 2
      }

      // Recent articles get slight boost
      const daysSincePublished = Math.floor(
        (Date.now() - new Date(article.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
      )
      if (daysSincePublished < 30) {
        score += 3
      }

      // For FIFA-related content
      if (
        currentArticle.tags.includes("FIFA 2026") &&
        article.tags.includes("FIFA 2026")
      ) {
        score += 15
      }

      // For city-specific guides
      if (currentArticle.city && article.city === currentArticle.city) {
        score += 12
      }

      // For region matching
      if (currentArticle.region && article.region === currentArticle.region) {
        score += 8
      }

      return { article, score }
    })
    .sort((a, b) => b.score - a.score)

  return scoredArticles.slice(0, limit).map((item) => item.article)
}

/**
 * Find articles related to a property listing
 */
export function findArticlesForProperty(
  property: Property,
  limit: number = 3
): Article[] {
  const allArticles = getAllArticles()

  const scoredArticles = allArticles.map((article) => {
    let score = 0

    // City match
    if (
      article.city &&
      article.city.toLowerCase() === property.location.city.toLowerCase()
    ) {
      score += 20
    }

    // Region match
    if (
      article.region &&
      article.region.toLowerCase() === property.location.region.toLowerCase()
    ) {
      score += 10
    }

    // FIFA property matches FIFA articles
    if (property.is_fifa_2026 && article.tags.includes("FIFA 2026")) {
      score += 15
    }

    // Experience/category matching
    if (article.category === "guides") {
      score += 5 // Guides are generally useful for properties
    }

    // State match
    if (article.tags.some((tag) => tag.toLowerCase().includes(property.location.state.toLowerCase()))) {
      score += 8
    }

    return { article, score }
  })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  return scoredArticles.slice(0, limit).map((item) => item.article)
}

/**
 * Find articles for FIFA city pages
 */
export function findArticlesForFifaCity(cityName: string, limit: number = 4): Article[] {
  const allArticles = getAllArticles()

  return allArticles
    .filter((article) => {
      // City name match
      const matchesCity =
        article.city?.toLowerCase().includes(cityName.toLowerCase()) ||
        article.title.toLowerCase().includes(cityName.toLowerCase())

      // Has FIFA 2026 tag
      const isFifaRelated = article.tags.includes("FIFA 2026")

      return matchesCity || isFifaRelated
    })
    .sort((a, b) => {
      // Prioritize city-specific articles
      const aMatchesCity = a.city?.toLowerCase().includes(cityName.toLowerCase())
      const bMatchesCity = b.city?.toLowerCase().includes(cityName.toLowerCase())

      if (aMatchesCity && !bMatchesCity) return -1
      if (!aMatchesCity && bMatchesCity) return 1

      // Then by featured
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1

      // Then by date
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    })
    .slice(0, limit)
}

/**
 * Find articles by category for hub pages
 */
export function findArticlesByCategory(
  category: string,
  featured: boolean = false,
  limit?: number
): Article[] {
  const allArticles = getAllArticles()

  let filtered = allArticles.filter((article) => article.category === category)

  if (featured) {
    filtered = filtered.filter((article) => article.featured)
  }

  // Sort by date
  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Find articles by tag
 */
export function findArticlesByTag(tag: string, limit?: number): Article[] {
  const allArticles = getAllArticles()

  const filtered = allArticles
    .filter((article) => article.tags.includes(tag))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Get featured articles for homepage or sections
 */
export function getFeaturedArticles(limit: number = 3): Article[] {
  const allArticles = getAllArticles()

  return allArticles
    .filter((article) => article.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

/**
 * Get recent articles
 */
export function getRecentArticles(limit: number = 5): Article[] {
  const allArticles = getAllArticles()

  return allArticles
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

/**
 * Search articles by keyword (simple text search)
 */
export function searchArticles(query: string, limit?: number): Article[] {
  const allArticles = getAllArticles()
  const lowerQuery = query.toLowerCase()

  const results = allArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )

  return limit ? results.slice(0, limit) : results
}
