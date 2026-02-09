"use client"

import dynamic from 'next/dynamic'

// Dynamically import ReactMarkdown with no SSR
const ReactMarkdown = dynamic(
  () => import('react-markdown'),
  { 
    ssr: false,
    loading: () => (
      <div className="prose prose-lg max-w-none animate-pulse">
        <div className="h-4 bg-muted rounded w-full mb-4"></div>
        <div className="h-4 bg-muted rounded w-5/6 mb-4"></div>
        <div className="h-4 bg-muted rounded w-4/6 mb-4"></div>
        <div className="h-4 bg-muted rounded w-full mb-4"></div>
        <div className="h-4 bg-muted rounded w-3/4"></div>
      </div>
    )
  }
)

export default ReactMarkdown
