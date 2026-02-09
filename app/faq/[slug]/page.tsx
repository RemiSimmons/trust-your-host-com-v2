import { Metadata } from "next"
import { notFound } from "next/navigation"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { generateFAQPageSchema } from "@/lib/seo/schema"
import { SchemaMarkup } from "@/components/seo/schema-markup"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import ReactMarkdown from "react-markdown"

// FAQ content database
const faqContent: Record<string, {
  question: string
  answer: string
  relatedQuestions: Array<{ slug: string; question: string }>
  category: string
}> = {
  "what-is-trustyourhost": {
    question: "What is TrustYourHost and how is it different from Airbnb or Vrbo?",
    category: "For Guests",
    answer: `
# What is TrustYourHost?

TrustYourHost is a **curated directory**, not a booking platform. This is a crucial distinction that sets us apart from services like Airbnb, Vrbo, and Booking.com.

## How We're Different

### We Don't Process Bookings
When you find a property you love on TrustYourHost, we send you directly to the host's own website or booking page. We don't insert ourselves into the transaction, add guest service fees, or control your communication with the host.

### Hosts Keep Full Control
Hosts maintain complete control over:
- **Pricing**: No platform markups or hidden fees
- **Policies**: Their own cancellation and house rules
- **Guest Communication**: Direct relationship with guests
- **Calendar Management**: Use their own systems

### Benefits for Guests
- **No Platform Fees**: Pay the host's price directly, without Airbnb's 14-20% guest service fees
- **Direct Communication**: Talk directly with your host before booking
- **Authentic Experiences**: Find unique properties not listed on major OTAs
- **Better Support**: Work directly with hosts who care about your experience

### Benefits for Hosts
- **Higher Margins**: Keep 100% of your booking revenue
- **Guest Relationships**: Build direct connections with travelers
- **Full Flexibility**: Set your own terms and policies
- **Data Ownership**: Your guest data stays yours

## Our Role

We curate and verify hosts, showcase their properties, and drive qualified traffic to their direct booking sites. Think of us as a trusted referral service focused on connecting travelers with exceptional hosts who prioritize direct relationships over platform dependency.

## Learn More

- [How It Works for Guests](/how-it-works)
- [Why List With Us (For Hosts)](/for-hosts)
- [Browse Properties](/search)
    `,
    relatedQuestions: [
      { slug: "how-to-book", question: "How do I book on TrustYourHost?" },
      { slug: "guest-fees", question: "Are there service or booking fees?" },
      { slug: "can-i-use-with-otas", question: "Can hosts use multiple platforms?" }
    ]
  },
  "how-to-book": {
    question: "Do I book on TrustYourHost or directly with the host?",
    category: "For Guests",
    answer: `
# How Booking Works on TrustYourHost

You **discover** properties on TrustYourHost, then **book directly** with the host on their own website or chosen platform.

## The Booking Process

### 1. Search and Discover
Browse our curated directory of verified properties. Filter by location, dates, property type, and amenities to find your perfect match.

### 2. Review Property Details
Each listing includes:
- High-quality photos
- Detailed descriptions
- Amenities and house rules
- Guest reviews and ratings
- Host information and response time

### 3. Click "Book Now" or "Visit Host Site"
When ready, click the booking button. This takes you directly to:
- The host's personal website
- Their preferred booking platform
- A direct contact method (for some properties)

### 4. Complete Your Booking
Book directly with the host using their payment system. Your payment goes straight to the host—TrustYourHost never touches your money.

## Why This Approach?

### For You as a Guest
- **Lower Prices**: No 14-20% platform service fees added
- **Direct Support**: Communicate directly with your host
- **Flexibility**: Work directly on special requests or modifications
- **Transparency**: See exactly what you're paying for

### For Hosts
- **Higher Revenue**: Keep 100% of booking proceeds
- **Guest Relationships**: Build direct connections
- **Business Control**: Manage bookings their way

## What About Payment Protection?

When booking directly, you have the same legal protections as any online transaction:
- Credit card chargeback rights
- Consumer protection laws
- Host verification and reviews on TrustYourHost

Many hosts also use secure payment processors like Stripe or trusted booking software with built-in protection.

## Questions Before Booking?

Most hosts respond within hours. Message them directly through their booking site with any questions about:
- Availability and pricing
- Special requests
- Property details
- Check-in procedures

## Learn More

- [Guest Fees and Pricing](/faq/guest-fees)
- [What protections do I have?](/faq/guest-protection)
- [Browse All Properties](/search)
    `,
    relatedQuestions: [
      { slug: "guest-fees", question: "Are there booking fees for guests?" },
      { slug: "guest-protection", question: "What protections do I have?" },
      { slug: "payment-methods", question: "What payment methods can I use?" }
    ]
  },
  "can-i-use-with-otas": {
    question: "Can I keep using Airbnb, Vrbo, or other platforms if I list on TrustYourHost?",
    category: "For Hosts",
    answer: `
# Using TrustYourHost Alongside OTAs

**Yes, absolutely!** We are 100% non-exclusive. Most of our hosts maintain active listings on Airbnb, Vrbo, Booking.com, and other platforms while also being listed on TrustYourHost.

## The Multi-Channel Strategy

### Why Hosts Use Multiple Platforms

Smart hosts don't put all their eggs in one basket. Here's why:

1. **Revenue Diversification**: Different platforms attract different travelers
2. **Risk Management**: Platform policy changes don't kill your business
3. **Market Reach**: Each platform has unique audiences
4. **Profit Optimization**: Direct bookings through TrustYourHost are more profitable

### How It Works in Practice

#### Your OTA Listings
Continue using Airbnb, Vrbo, Booking.com, and others as you do today. These platforms provide:
- Broad market exposure
- Built-in payment processing
- Traveler insurance and protection
- Established trust with first-time bookers

#### Your TrustYourHost Listing
Add TrustYourHost to drive direct bookings:
- **No Commission Fees**: Keep 100% of revenue
- **Lower Guest Costs**: No platform service fees added
- **Direct Relationships**: Build your guest database
- **Full Control**: Your rules, your policies, your pricing

### Managing Calendar Sync

Most hosts handle multi-platform calendars using:

1. **Channel Management Software**: Tools like Hostfully, Guesty, or Lodgify sync calendars across all platforms automatically
2. **Manual Updates**: For lower-volume hosts, updating calendars manually works fine
3. **OTA Sync**: Some hosts keep their OTA calendars as the source of truth and update their direct site accordingly

## The Revenue Impact

### Example: A Weekend Booking for $1,000

**Airbnb Booking:**
- Guest Pays: $1,180 (includes ~$180 service fee)
- You Receive: $970 (after 3% host fee)
- **Your Net: $970**

**TrustYourHost Direct Booking:**
- Guest Pays: $1,000 (no platform fees)
- You Receive: $1,000
- TrustYourHost Monthly Fee: $0 (one flat fee covers all bookings)
- **Your Net: $1,000+**

That's **$30+ more per booking**, plus the guest saved $180.

## Best Practices

### Pricing Strategy
- **OTA Pricing**: Include platform fees in your pricing
- **Direct Pricing**: Offer slightly lower rates for direct bookings
- **Communicate Value**: Let guests know they're saving on fees

### Guest Communication
When someone books through an OTA, mention your direct booking option for future stays:
- "Book direct next time and save on platform fees"
- Include your website in your welcome materials
- Offer a returning guest discount for direct bookings

### Time Allocation
- **80% of bookings** may still come through OTAs initially
- **20% direct** can represent 25-30% of your profit
- Over time, many hosts flip this ratio as repeat guests book direct

## Getting Started

You can add TrustYourHost to your distribution mix today:

1. Keep all your existing OTA listings active
2. List on TrustYourHost to drive direct bookings
3. Set up calendar syncing (or manage manually)
4. Promote your direct booking option to guests

There's no downside—only upside profit potential.

## Learn More

- [How TrustYourHost Works for Hosts](/for-hosts)
- [Getting More Direct Bookings](/faq/getting-direct-bookings)
- [List Your Property](/submit-property)
    `,
    relatedQuestions: [
      { slug: "how-it-works-hosts", question: "How does TrustYourHost work?" },
      { slug: "host-fees", question: "What are the fees for hosts?" },
      { slug: "getting-direct-bookings", question: "How do I get direct bookings?" }
    ]
  },
  "fifa-2026-stays": {
    question: "How does TrustYourHost help with FIFA World Cup 2026 stays?",
    category: "FIFA World Cup 2026",
    answer: `
# Finding FIFA World Cup 2026 Accommodations

The FIFA World Cup 2026 is coming to North America with matches across the United States, Mexico, and Canada. TrustYourHost makes it easy to find trusted accommodations near every host city and stadium.

## FIFA 2026 Host Cities

### United States
- New York / New Jersey (MetLife Stadium - **Final Venue**)
- Los Angeles (SoFi Stadium)
- Miami (Hard Rock Stadium)
- Atlanta (Mercedes-Benz Stadium)
- Dallas (AT&T Stadium)
- Houston (NRG Stadium)
- Philadelphia (Lincoln Financial Field)
- Seattle (Lumen Field)
- Kansas City (Arrowhead Stadium)
- Boston (Gillette Stadium)
- San Francisco Bay Area (Levi's Stadium)

### Canada & Mexico
- Toronto, Vancouver (Canada)
- Mexico City, Guadalajara, Monterrey (Mexico)

## How to Find FIFA 2026 Properties

### 1. Browse by City
Visit our [FIFA 2026 section](/fifa-2026) and select your host city. Each city page includes:
- Properties organized by stadium proximity
- Neighborhood guides
- Transit information
- Match day tips

### 2. Filter by Distance
Sort properties by distance from the stadium:
- **Walking Distance** (0-1 miles): Walk to matches
- **Transit Access** (1-5 miles): Easy subway/train to stadium
- **City Properties** (5-15 miles): Downtown accommodations with good connections
- **Suburban Options** (15+ miles): More space, often better value

### 3. Book Early for Popular Matches
Properties near stadiums hosting marquee matches (semifinals, final) fill up fastest. Book 6-12 months in advance for:
- **Final** - MetLife Stadium, New York/New Jersey (July 19, 2026)
- **Semifinals** - AT&T Stadium, Dallas & Mercedes-Benz Stadium, Atlanta
- **Opening matches** in each host city

## Why Book Through TrustYourHost

### Direct Booking Advantages
- **No Platform Fees**: Save 15-20% vs major booking sites
- **Direct Host Contact**: Coordinate arrival times, parking, local tips
- **Flexible Policies**: Work directly with hosts on cancellations
- **Local Knowledge**: Hosts provide insider advice on match days

### Verified Properties
All FIFA 2026 properties are:
- Host-verified with ID and property checks
- Reviewed by previous guests
- Located within reasonable distance to stadiums
- Operated by responsive, experienced hosts

## Match Day Tips

### Transportation
- Book properties near public transit when possible
- Expect heavy traffic on match days
- Many hosts offer parking (confirm in advance)
- Consider walking distance properties for evening matches

### Minimum Stays
- Most hosts require 2-4 night minimums for major matches
- Final weekend may have longer minimum stays
- Book early for flexibility

### Pricing
- Expect premium pricing for match dates
- Properties closer to stadiums command higher rates
- Direct booking through TrustYourHost = no added guest fees
- Compare total costs including all fees

## Plan Your Trip

Ready to secure your FIFA 2026 accommodation?

- [Browse All FIFA Cities](/fifa-2026)
- [New York/NJ Properties (Final)](/fifa-2026/new-york-new-jersey)
- [Los Angeles Properties](/fifa-2026/los-angeles)
- [When should I book?](/faq/fifa-booking-tips)

The earlier you book, the better your selection and pricing will be.
    `,
    relatedQuestions: [
      { slug: "finding-fifa-properties", question: "How do I find FIFA properties?" },
      { slug: "fifa-booking-tips", question: "When should I book for FIFA 2026?" },
      { slug: "how-to-book", question: "How does booking work?" }
    ]
  }
}

// Generate static params for all FAQ pages
export function generateStaticParams() {
  return Object.keys(faqContent).map((slug) => ({
    slug: slug,
  }))
}

// Generate metadata for each FAQ page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const faq = faqContent[slug]
  
  if (!faq) {
    return {
      title: "FAQ Not Found | TrustYourHost"
    }
  }

  return {
    title: `${faq.question} | TrustYourHost FAQ`,
    description: faq.answer.slice(0, 160).replace(/#/g, '').trim() + "...",
  }
}

export default async function FAQDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const faq = faqContent[slug]

  if (!faq) {
    notFound()
  }

  // Generate FAQ schema
  const faqSchema = generateFAQPageSchema(
    [{ question: faq.question, answer: faq.answer }],
    `https://trustyourhost.com/faq/${slug}`
  )

  const breadcrumbItems = [
    { label: "FAQ", href: "/faq" },
    { label: faq.category },
    { label: faq.question }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SchemaMarkup schema={faqSchema} />
      <NavBar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          {/* Back Link */}
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all FAQs
          </Link>

          {/* Question */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
            {faq.question}
          </h1>
          
          {/* Category Badge */}
          <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full mb-8">
            {faq.category}
          </div>

          {/* Answer */}
          <div className="prose prose-lg max-w-none mb-12">
            <ReactMarkdown>{faq.answer}</ReactMarkdown>
          </div>

          {/* Related Questions */}
          {faq.relatedQuestions.length > 0 && (
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Related Questions
              </h2>
              <div className="space-y-4">
                {faq.relatedQuestions.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/faq/${related.slug}`}
                    className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                        {related.question}
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 p-8 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-center">
            <h3 className="text-2xl font-serif font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/80 mb-6">
              Contact our support team for personalized assistance
            </p>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
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
