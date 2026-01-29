import { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { HelpCircle, Users, Home, Trophy, DollarSign, Shield } from "lucide-react"
import Link from "next/link"
import { generateFAQPageSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | TrustYourHost",
  description: "Get answers to common questions about TrustYourHost. Learn how our platform works for hosts and guests, FIFA 2026 bookings, fees, and more.",
}

// FAQ data with individual page slugs
const faqCategories = [
  {
    name: "For Guests",
    icon: Users,
    color: "blue",
    faqs: [
      {
        slug: "what-is-trustyourhost",
        question: "What is TrustYourHost and how is it different from Airbnb or Vrbo?",
        preview: "TrustYourHost is a curated directory, not a booking platform. We connect you directly with verified hosts..."
      },
      {
        slug: "how-to-book",
        question: "Do I book on TrustYourHost or directly with the host?",
        preview: "You discover places on TrustYourHost, then book directly on the host's website or chosen channel..."
      },
      {
        slug: "guest-fees",
        question: "Are there service or booking fees for guests?",
        preview: "TrustYourHost doesn't add a guest service fee. You pay whatever total the host shows on their site..."
      },
      {
        slug: "guest-protection",
        question: "What protections do I have when booking directly?",
        preview: "Direct bookings offer the same legal protections as any accommodation transaction..."
      }
    ]
  },
  {
    name: "For Hosts",
    icon: Home,
    color: "emerald",
    faqs: [
      {
        slug: "how-it-works-hosts",
        question: "How does TrustYourHost work for hosts?",
        preview: "TrustYourHost is a curated directory that sends guests directly to your own website..."
      },
      {
        slug: "can-i-use-with-otas",
        question: "Can I keep using Airbnb, Vrbo, or other platforms?",
        preview: "Yes, we are non-exclusive. Most hosts use TrustYourHost alongside OTAs to get more profitable direct bookings..."
      },
      {
        slug: "host-fees",
        question: "What are the fees for hosts?",
        preview: "We charge a flat monthly or annual listing fee. No commissions, no booking fees, no hidden costs..."
      },
      {
        slug: "getting-direct-bookings",
        question: "How do I get more direct bookings?",
        preview: "TrustYourHost drives qualified traffic to your direct booking site through SEO, content marketing..."
      }
    ]
  },
  {
    name: "FIFA World Cup 2026",
    icon: Trophy,
    color: "orange",
    faqs: [
      {
        slug: "fifa-2026-stays",
        question: "How does TrustYourHost help with FIFA World Cup 2026 stays?",
        preview: "We highlight trusted hosts in all FIFA 2026 host cities and let you filter by stadium proximity..."
      },
      {
        slug: "finding-fifa-properties",
        question: "How do I find stays near FIFA 2026 stadiums?",
        preview: "Visit our FIFA 2026 section, choose your host city, then filter by stadium proximity..."
      },
      {
        slug: "fifa-booking-tips",
        question: "When should I book for FIFA 2026?",
        preview: "Book as early as possible. Properties near stadiums in host cities fill up quickly..."
      }
    ]
  },
  {
    name: "Pricing & Payments",
    icon: DollarSign,
    color: "purple",
    faqs: [
      {
        slug: "how-pricing-works",
        question: "How does pricing work on TrustYourHost?",
        preview: "Hosts set their own prices. What you see is what you pay - no platform markups..."
      },
      {
        slug: "payment-methods",
        question: "What payment methods can I use?",
        preview: "Payment methods depend on each host's setup. Most accept credit cards, some offer PayPal..."
      },
      {
        slug: "cancellation-policies",
        question: "What are the cancellation policies?",
        preview: "Each host sets their own cancellation policy. Review the policy before booking..."
      }
    ]
  },
  {
    name: "Trust & Safety",
    icon: Shield,
    color: "red",
    faqs: [
      {
        slug: "how-hosts-are-verified",
        question: "How are hosts verified on TrustYourHost?",
        preview: "All hosts go through our verification process including identity verification, property verification..."
      },
      {
        slug: "guest-reviews",
        question: "Can I see reviews from other guests?",
        preview: "Yes! Each property listing shows verified guest reviews and ratings..."
      },
      {
        slug: "reporting-issues",
        question: "How do I report a problem or concern?",
        preview: "Contact us immediately if you have concerns. We take all reports seriously..."
      }
    ]
  }
]

export default function FAQPage() {
  // Generate FAQ schema for all questions
  const allFaqs = faqCategories.flatMap(cat => 
    cat.faqs.map(faq => ({
      question: faq.question,
      answer: faq.preview,
      url: `/faq/${faq.slug}`
    }))
  )
  
  const faqSchema = generateFAQPageSchema(
    allFaqs.map(f => ({ question: f.question, answer: f.answer })),
    "https://trustyourhost.com/faq"
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SchemaMarkup schema={faqSchema} />
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-6">
              <HelpCircle className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/80">
              Everything you need to know about TrustYourHost
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <main className="flex-1 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <div key={category.name}>
                  <div className="flex items-center gap-3 mb-6">
                    <IconComponent className={`w-6 h-6 text-${category.color}-500`} />
                    <h2 className="text-2xl font-serif font-bold text-gray-900">
                      {category.name}
                    </h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.faqs.map((faq) => (
                      <Link
                        key={faq.slug}
                        href={`/faq/${faq.slug}`}
                        className="block p-6 bg-white rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all group"
                      >
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {faq.preview}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 md:p-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-orange-100 mb-6 max-w-xl mx-auto">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
