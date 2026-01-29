/**
 * Analytics event tracking utilities
 * Provides type-safe event tracking for user actions
 */

export type AnalyticsEvent =
  | "property_view"
  | "property_website_click"
  | "property_share"
  | "search_performed"
  | "filter_applied"
  | "article_view"
  | "article_share"
  | "host_signup_start"
  | "host_signup_complete"
  | "guest_signup_start"
  | "guest_signup_complete"
  | "contact_form_submit"
  | "fifa_city_view"
  | "experience_category_click"
  | "related_content_click"
  | "breadcrumb_click"

export interface EventProperties {
  [key: string]: string | number | boolean | undefined
}

/**
 * Track an analytics event
 * This is a wrapper that can be integrated with Google Analytics, Plausible, or custom analytics
 */
export function trackEvent(
  event: AnalyticsEvent,
  properties?: EventProperties
): void {
  // Google Analytics 4 (gtag.js)
  if (typeof window !== "undefined" && "gtag" in window) {
    const gtag = (window as any).gtag
    gtag("event", event, properties)
  }

  // Plausible Analytics
  if (typeof window !== "undefined" && "plausible" in window) {
    const plausible = (window as any).plausible
    plausible(event, { props: properties })
  }

  // Console log in development
  if (process.env.NODE_ENV === "development") {
    console.log("Analytics Event:", event, properties)
  }

  // Future: Send to your own analytics endpoint
  // fetch('/api/analytics', {
  //   method: 'POST',
  //   body: JSON.stringify({ event, properties, timestamp: Date.now() })
  // })
}

/**
 * Track property view
 */
export function trackPropertyView(propertyId: string, propertyName: string): void {
  trackEvent("property_view", {
    property_id: propertyId,
    property_name: propertyName,
  })
}

/**
 * Track website click (external link to host's site)
 */
export function trackWebsiteClick(
  propertyId: string,
  propertyName: string,
  url: string
): void {
  trackEvent("property_website_click", {
    property_id: propertyId,
    property_name: propertyName,
    url,
  })
}

/**
 * Track search action
 */
export function trackSearch(
  query?: string,
  location?: string,
  filters?: Record<string, any>
): void {
  trackEvent("search_performed", {
    query: query || "",
    location: location || "",
    has_filters: !!filters && Object.keys(filters).length > 0,
  })
}

/**
 * Track article view
 */
export function trackArticleView(
  articleId: string,
  title: string,
  category: string
): void {
  trackEvent("article_view", {
    article_id: articleId,
    article_title: title,
    category,
  })
}

/**
 * Track FIFA city page view
 */
export function trackFifaCityView(cityName: string): void {
  trackEvent("fifa_city_view", {
    city_name: cityName,
  })
}

/**
 * Track related content click
 */
export function trackRelatedContentClick(
  sourceType: "property" | "article" | "fifa_city",
  sourceId: string,
  targetType: "property" | "article",
  targetId: string
): void {
  trackEvent("related_content_click", {
    source_type: sourceType,
    source_id: sourceId,
    target_type: targetType,
    target_id: targetId,
  })
}

/**
 * Track breadcrumb navigation
 */
export function trackBreadcrumbClick(label: string, href: string): void {
  trackEvent("breadcrumb_click", {
    label,
    href,
  })
}

/**
 * Track experience category selection
 */
export function trackExperienceClick(category: string): void {
  trackEvent("experience_category_click", {
    category,
  })
}

/**
 * Track signup flows
 */
export function trackSignup(
  userType: "host" | "guest",
  step: "start" | "complete"
): void {
  const event = `${userType}_signup_${step}` as AnalyticsEvent
  trackEvent(event, {
    user_type: userType,
  })
}

/**
 * Track form submissions
 */
export function trackFormSubmit(formName: string): void {
  trackEvent("contact_form_submit", {
    form_name: formName,
  })
}
