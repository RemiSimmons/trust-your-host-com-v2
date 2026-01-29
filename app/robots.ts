import { MetadataRoute } from "next"

/**
 * Robots.txt configuration for TrustYourHost
 * Allows crawling of public content while protecting admin and user areas
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://trustyourhost.com"

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/search",
          "/properties/",
          "/fifa-2026/",
          "/insights/",
          "/guides/",
          "/journal/",
          "/host-resources/",
          "/experiences",
          "/for-hosts",
          "/become-host",
          "/how-it-works",
          "/help/",
          "/safety",
          "/privacy",
          "/terms",
          "/cancellation",
        ],
        disallow: [
          "/admin/",
          "/dashboard/",
          "/host/",
          "/inbox/",
          "/api/",
          "/login",
          "/signup",
          "/checkout/",
          "/submit-property",
          "/*?*", // Disallow URLs with query parameters to avoid duplicate content
        ],
      },
      // Special rules for Google
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/search",
          "/properties/",
          "/fifa-2026/",
          "/insights/",
          "/guides/",
          "/journal/",
          "/host-resources/",
        ],
        disallow: [
          "/admin/",
          "/dashboard/",
          "/host/",
          "/inbox/",
          "/api/",
        ],
      },
      // Special rules for Bing
      {
        userAgent: "Bingbot",
        allow: [
          "/",
          "/search",
          "/properties/",
          "/fifa-2026/",
        ],
        disallow: [
          "/admin/",
          "/dashboard/",
          "/host/",
          "/inbox/",
          "/api/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
