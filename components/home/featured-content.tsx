'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Compass, BookOpen, Lightbulb, FileText, ChevronDown } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import type { Article } from '@/lib/types'

interface FeaturedContentProps {
  guides: Article[]
  journal: Article[]
  insights: Article[]
  resources: Article[]
}

const colorMap = {
  emerald: { bg: 'bg-emerald-100', icon: 'text-emerald-600' },
  purple: { bg: 'bg-purple-100', icon: 'text-purple-600' },
  blue: { bg: 'bg-blue-100', icon: 'text-blue-600' },
  orange: { bg: 'bg-orange-100', icon: 'text-orange-600' },
} as const

export function FeaturedContent({ guides, journal, insights, resources }: FeaturedContentProps) {
  const sections = [
    {
      title: "City Guides",
      description: "Destination guides and travel tips for your next adventure",
      icon: Compass,
      color: "emerald" as const,
      articles: guides.slice(0, 3),
      viewAllHref: "/guides"
    },
    {
      title: "Travel Journal",
      description: "Stories and experiences from hosts and guests",
      icon: BookOpen,
      color: "purple" as const,
      articles: journal.slice(0, 3),
      viewAllHref: "/journal"
    },
    {
      title: "Host Insights",
      description: "Expert advice and strategies for vacation rental hosts",
      icon: Lightbulb,
      color: "blue" as const,
      articles: insights.slice(0, 3),
      viewAllHref: "/insights"
    },
    {
      title: "Host Resources",
      description: "Tools, templates, and guides for professional hosts",
      icon: FileText,
      color: "orange" as const,
      articles: resources.slice(0, 3),
      viewAllHref: "/host-resources"
    }
  ]

  // Only show sections that have articles
  const activeSections = sections.filter(section => section.articles.length > 0)

  if (activeSections.length === 0) return null

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Collapsible defaultOpen={true} className="group">
          <CollapsibleTrigger className="flex w-full items-center justify-between text-left hover:opacity-90 transition-opacity rounded-lg p-2 -m-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center flex-1"
            >
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
                Latest Guides & Resources
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover travel tips, host insights, and destination guides to help you plan the perfect trip or grow your hosting business
              </p>
            </motion.div>
            <ChevronDown className="h-6 w-6 text-gray-500 shrink-0 ml-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </CollapsibleTrigger>
          {/* Section titles shown when main is collapsed */}
          <div className="hidden group-data-[state=closed]:flex pt-4 flex-wrap gap-3 justify-center">
            {activeSections.map((section) => (
              <Link
                key={section.title}
                href={section.viewAllHref}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all text-gray-900 font-medium"
              >
                <section.icon className="w-4 h-4 text-gray-600" />
                {section.title}
              </Link>
            ))}
          </div>
          <CollapsibleContent>
            {/* Full content when main is expanded */}
            <div>
              <div className="space-y-4 pt-8">
                {activeSections.map((section, sectionIndex) => {
                  const IconComponent = section.icon
                  const colors = colorMap[section.color]
                  return (
                    <Collapsible key={section.title} defaultOpen={false} className="group/section">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: sectionIndex * 0.1 }}
                        className="rounded-xl border border-gray-200 bg-white overflow-hidden"
                      >
                        <CollapsibleTrigger className="flex w-full items-center justify-between text-left hover:bg-gray-50/50 transition-colors p-4 sm:p-6">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${colors.bg}`}>
                              <IconComponent className={`w-5 h-5 ${colors.icon}`} />
                            </div>
                            <div>
                              <h3 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">
                                {section.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {section.description}
                              </p>
                            </div>
                          </div>
                          <ChevronDown className="h-5 w-5 text-gray-500 shrink-0 ml-4 transition-transform duration-200 group-data-[state=open]/section:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="px-4 sm:px-6 pb-6 pt-0">
                            <div className="flex justify-end -mt-2 mb-4">
                              <Link
                                href={section.viewAllHref}
                                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                              >
                                View all
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                              {section.articles.map((article) => (
                                <Link
                                  key={article.id}
                                  href={`/${article.category}/${article.slug}`}
                                  className="group block bg-gray-50 rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all overflow-hidden"
                                >
                                  {article.image && (
                                    <div className="aspect-video bg-gray-200 overflow-hidden">
                                      <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>
                                  )}
                                  <div className="p-5">
                                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                                      {article.title}
                                    </h4>
                                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                                      {article.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                      <span>{article.category}</span>
                                      {article.readTime && <span>{article.readTime} min read</span>}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <Link
                              href={section.viewAllHref}
                              className="sm:hidden inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors mt-4"
                            >
                              View all {section.title}
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </CollapsibleContent>
                      </motion.div>
                    </Collapsible>
                  )
                })}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
              >
                <div className="inline-flex flex-wrap justify-center gap-4">
                  <Link
                    href="/guides"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
                  >
                    Explore All Guides
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/insights"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 hover:border-gray-900 text-gray-900 font-medium rounded-lg transition-colors"
                  >
                    For Hosts
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  )
}
