'use client'

/**
 * Featured Q&A Component - AEO Optimized
 * 
 * Single question/answer block for top of landing pages
 * Optimized for featured snippets, voice search, and answer engines
 * 
 * Usage:
 * <FeaturedQA
 *   question="How does TrustYourHost work?"
 *   answer="TrustYourHost is a verified directory..."
 *   ctaText="Search properties to get started"
 *   ctaLink="/search"
 * />
 */

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface FeaturedQAProps {
  question: string
  answer: string
  ctaText?: string
  ctaLink?: string
  className?: string
}

export function FeaturedQA({ 
  question, 
  answer, 
  ctaText, 
  ctaLink,
  className 
}: FeaturedQAProps) {
  return (
    <div 
      className={cn(
        "bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-6 rounded-r-lg shadow-sm hover:shadow-md transition-shadow",
        className
      )}
      itemScope 
      itemType="https://schema.org/Question"
    >
      {/* Question */}
      <h2 
        className="text-xl md:text-2xl font-semibold text-gray-900 mb-3" 
        itemProp="name"
      >
        {question}
      </h2>
      
      {/* Answer */}
      <div 
        itemScope 
        itemProp="acceptedAnswer" 
        itemType="https://schema.org/Answer"
      >
        <div 
          itemProp="text" 
          className="text-gray-700 text-base md:text-lg leading-relaxed"
        >
          {answer}
          {ctaLink && ctaText && (
            <>
              {' '}
              <Link 
                href={ctaLink} 
                className="text-blue-600 hover:text-blue-700 font-medium underline decoration-2 underline-offset-2 hover:decoration-blue-700 transition-colors"
              >
                {ctaText}
              </Link>
              .
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * Variant: Compact Featured Q&A
 * For pages where space is limited
 */
export function FeaturedQACompact({ 
  question, 
  answer, 
  ctaText, 
  ctaLink,
  className 
}: FeaturedQAProps) {
  return (
    <div 
      className={cn(
        "bg-blue-50 border-l-3 border-blue-500 p-4 rounded-r-md",
        className
      )}
      itemScope 
      itemType="https://schema.org/Question"
    >
      <h3 
        className="text-lg font-semibold text-gray-900 mb-2" 
        itemProp="name"
      >
        {question}
      </h3>
      <div 
        itemScope 
        itemProp="acceptedAnswer" 
        itemType="https://schema.org/Answer"
      >
        <div itemProp="text" className="text-gray-700 text-sm leading-relaxed">
          {answer}
          {ctaLink && ctaText && (
            <> <Link href={ctaLink} className="text-blue-600 hover:text-blue-700 font-medium">
              {ctaText}
            </Link>.</>
          )}
        </div>
      </div>
    </div>
  )
}
