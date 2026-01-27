import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { ArrowLeft, Clock, Calendar } from "lucide-react"
import Link from "next/link"

interface ArticleLayoutProps {
  title: string
  description: string
  category: "hosts" | "guests" | "fifa" | "general"
  lastUpdated: string
  readTime: string
  children: React.ReactNode
}

const categoryConfig = {
  hosts: {
    label: "For Hosts",
    color: "text-orange-600",
    bg: "bg-orange-50",
    breadcrumb: "/help",
  },
  guests: {
    label: "For Guests",
    color: "text-blue-600",
    bg: "bg-blue-50",
    breadcrumb: "/help",
  },
  fifa: {
    label: "FIFA 2026",
    color: "text-green-600",
    bg: "bg-green-50",
    breadcrumb: "/fifa-2026",
  },
  general: {
    label: "Help Center",
    color: "text-gray-600",
    bg: "bg-gray-50",
    breadcrumb: "/help",
  },
}

export function ArticleLayout({
  title,
  description,
  category,
  lastUpdated,
  readTime,
  children,
}: ArticleLayoutProps) {
  const config = categoryConfig[category]

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        {/* Header */}
        <div className={`${config.bg} border-b`}>
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link
              href={config.breadcrumb}
              className={`inline-flex items-center gap-2 ${config.color} hover:underline mb-4 text-sm font-medium`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {config.label}
            </Link>

            <div className={`inline-block px-3 py-1 ${config.bg} border ${config.color} rounded-full text-xs font-semibold mb-4`}>
              {config.label}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{description}</p>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Updated {lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readTime} read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <article className="prose prose-lg max-w-none">
            {children}
          </article>
        </div>

        {/* Help CTA */}
        <div className="bg-gray-50 border-t">
          <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you get the most out of TrustYourHost.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
