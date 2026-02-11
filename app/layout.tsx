import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: {
    default: "TrustYourHost - Find Your Perfect Getaway",
    template: "%s | TrustYourHost",
  },
  description:
    "Discover unique homes and unforgettable experiences curated just for you. Book directly with verified hosts and save on fees.",
  generator: "v0.app",
  metadataBase: new URL("https://trustyourhost.com"),
  openGraph: {
    type: "website",
    siteName: "TrustYourHost",
    title: "TrustYourHost - Find Your Perfect Getaway",
    description:
      "Discover unique homes and unforgettable experiences curated just for you. Book directly with verified hosts and save on fees.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TrustYourHost - Find Your Perfect Getaway",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrustYourHost - Find Your Perfect Getaway",
    description:
      "Discover unique homes and unforgettable experiences curated just for you. Book directly with verified hosts and save on fees.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  other: {
    "p:domain_verify": "64447ef9a97344553bbf268f57639733",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {/* Pinterest Tag */}
        <Script id="pinterest-tag" strategy="afterInteractive">
          {`
            !function(e){if(!window.pintrk){window.pintrk = function () {
            window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
            n=window.pintrk;n.queue=[],n.version="3.0";var
            t=document.createElement("script");t.async=!0,t.src=e;var
            r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
            pintrk('load', '2613979236506');
            pintrk('page');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src="https://ct.pinterest.com/v3/?event=init&tid=2613979236506&noscript=1"
          />
        </noscript>
        {/* end Pinterest Tag */}

        {/* Site-wide Organization + WebSite schema for answer engines */}
        <SchemaMarkup schema={[generateOrganizationSchema(), generateWebSiteSchema()]} />
        
        {children}
        <Analytics />
      </body>
    </html>
  )
}
