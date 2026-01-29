"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { trackEvent } from "@/lib/analytics/events"

/**
 * Analytics Provider Component
 * Tracks page views and route changes
 * Add this to your root layout
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Track page view on route change
    if (typeof window !== "undefined") {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "")
      
      // Google Analytics 4 pageview
      if ("gtag" in window) {
        const gtag = (window as any).gtag
        gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: url,
        })
      }

      // Plausible pageview (automatic, but can be manually triggered if needed)
      if ("plausible" in window) {
        const plausible = (window as any).plausible
        plausible("pageview")
      }

      // Console log in development
      if (process.env.NODE_ENV === "development") {
        console.log("Page view:", url)
      }
    }
  }, [pathname, searchParams])

  return <>{children}</>
}

/**
 * Google Analytics Script Component
 * Add this to your root layout <head>
 */
export function GoogleAnalyticsScript() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!measurementId) {
    return null
  }

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

/**
 * Plausible Analytics Script Component
 * Lightweight, privacy-friendly alternative to Google Analytics
 * Add this to your root layout <head>
 */
export function PlausibleScript() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN

  if (!domain) {
    return null
  }

  return (
    <script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  )
}
