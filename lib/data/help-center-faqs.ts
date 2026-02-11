/**
 * Help Center FAQ data - Comprehensive Q&A by audience
 * Each tab gets its own FAQPage schema block
 */

export interface HelpFaqItem {
  question: string
  answer: string
  section: string
}

// Tab 1: For Guests
export const guestFaqs: HelpFaqItem[] = [
  // BOOKING PROCESS
  {
    section: "Booking Process",
    question: "How do I search for properties?",
    answer: "Use our search page to filter by location, dates, number of guests, and experience type (e.g., waterfront, mountain, pet-friendly). You can also browse by FIFA 2026 host city or explore our curated experience categories on the homepage. Each property shows verified photos, amenities, and a direct link to the host's booking site.",
  },
  {
    section: "Booking Process",
    question: "How does direct booking work?",
    answer: "TrustYourHost is a directory—we connect you with verified hosts who book on their own websites. After you find a property, click \"Visit Website\" to go to the host's booking page. You'll check availability, review policies, and pay directly with the host. We never process payments.",
  },
  {
    section: "Booking Process",
    question: "What payment methods do hosts accept?",
    answer: "Payment methods vary by host. Most use Stripe, PayPal, or similar processors on their booking sites. You'll see the host's accepted methods when you visit their website. Common options include credit cards, debit cards, and sometimes bank transfer or PayPal.",
  },
  {
    section: "Booking Process",
    question: "Can I message hosts before booking?",
    answer: "Yes. Host contact information is typically available on their booking website. Many hosts use contact forms, email, or messaging built into their booking platform. Reach out with questions about availability, amenities, or local recommendations before you book.",
  },
  {
    section: "Booking Process",
    question: "What's included in the listing?",
    answer: "Each listing shows photos, amenities, sleeping arrangements, house rules, and cancellation policies. Hosts also provide details about what's included (WiFi, parking, linens, etc.) on their booking site. Check both the TrustYourHost listing and the host's website for complete information before booking.",
  },
  // SAFETY & TRUST
  {
    section: "Safety & Trust",
    question: "How do you verify properties?",
    answer: `Every property undergoes a manual review before going live. Our verification process includes several layers:

Host identity: We confirm the host's identity and that they own or legally manage the property. This helps ensure you're dealing with a real person responsible for the listing.

Property verification: We verify that photos match the listed property, the address is accurate, and the property exists as described. We may use public records, satellite imagery, and cross-references to validate listing accuracy.

Booking website check: We ensure the host's booking link works, processes payments securely (HTTPS, reputable processors like Stripe or PayPal), and displays clear policies. A broken or insecure site is grounds for rejection.

Ongoing monitoring: We monitor guest reports and may remove hosts who fail to meet our standards. Properties are periodically re-reviewed to maintain quality.

We don't visit every property in person, but we apply consistent checks to reduce risk. When in doubt, contact the host directly and ask questions before booking.`,
  },
  {
    section: "Safety & Trust",
    question: "What if a property isn't as described?",
    answer: "Contact your host immediately—they manage their own bookings and are responsible for resolution. Document the issue with photos and a clear description. If the host doesn't respond or resolve the matter, contact our support team with your booking details. We'll investigate and may remove listings that misrepresent properties.",
  },
  {
    section: "Safety & Trust",
    question: "Is my payment information secure?",
    answer: "Payments are processed on the host's booking site, not on TrustYourHost. We only feature hosts whose sites use secure connections (HTTPS) and reputable payment processors like Stripe or PayPal. Your card details never pass through our servers. Always verify the host's site shows a lock icon and uses a trusted payment provider.",
  },
  {
    section: "Safety & Trust",
    question: "Do properties have insurance?",
    answer: "Insurance varies by host. Many professional hosts carry liability and property insurance. Check the host's booking site and listing for insurance details. We recommend asking hosts directly about coverage before booking. TrustYourHost does not provide insurance for stays.",
  },
  {
    section: "Safety & Trust",
    question: "How do I report an issue?",
    answer: "If you experience problems during your stay, contact your host immediately—they're responsible for resolving issues. Document problems with photos and clear descriptions. If the host is unresponsive or unable to resolve the matter, contact our support team at hello@trustyourhost.com with your booking details and documentation. We'll investigate and take appropriate action.",
  },
  // FIFA 2026 SPECIFIC
  {
    section: "FIFA 2026",
    question: "How do I find stays for FIFA 2026?",
    answer: "Visit our FIFA 2026 section to browse properties in all 11 U.S. host cities. Filter by city, neighborhood, and stadium proximity. Each city page includes transportation tips, neighborhood guides, and links to verified properties. Use the event filter on our search page to surface FIFA-ready listings.",
  },
  {
    section: "FIFA 2026",
    question: "Can I book multiple cities for the tournament?",
    answer: "Yes. The tournament is spread across multiple cities. You can book separate stays in different host cities—each through its own host. Use our FIFA 2026 hub to plan by city and match schedule. Hosts set their own minimum stays, so check each listing for requirements.",
  },
  {
    section: "FIFA 2026",
    question: "What's the cancellation policy for FIFA properties?",
    answer: "Cancellation policies are set by each host and displayed on their booking site. FIFA-period bookings often have stricter policies due to high demand. Read the host's terms before booking and consider flexible options if your plans may change.",
  },
]

// Tab 2: For Hosts
export const hostFaqs: HelpFaqItem[] = [
  // GETTING STARTED
  {
    section: "Getting Started",
    question: "How do I list my property?",
    answer: "Go to our List Your Property page and submit your property details, photos, and booking website URL. Our team reviews each submission and will contact you within a few business days. Once approved, your listing goes live on TrustYourHost.",
  },
  {
    section: "Getting Started",
    question: "What are the requirements to list?",
    answer: "You need a functional direct booking website (your own site or a channel like Lodgify, Hostfully, etc.), quality photos of your property, and accurate listing details. Properties must be vacation rentals or short-term stays. We don't accept listings that rely solely on OTA booking links.",
  },
  {
    section: "Getting Started",
    question: "How much does it cost?",
    answer: `TrustYourHost uses a flat monthly fee model—no per-booking commissions.

**Pricing:**
- First property: $49/month (60-day free trial)
- Additional properties: $39/month each
- No booking commissions, no percentage fees, no hidden costs

**Comparison to OTAs:**
- Airbnb/Vrbo: 15–20% commission per booking + 3% host fee
- On a $2,000/month property: OTAs take ~$300–400; TrustYourHost is $49 flat
- Direct bookings keep 100% of what you charge; we only charge the listing fee

**What you get:** Featured placement in search, FIFA 2026 exposure (if applicable), traffic to your direct site, and full control of pricing and policies. Cancel anytime.`,
  },
  {
    section: "Getting Started",
    question: "How long does approval take?",
    answer: "Most submissions are reviewed within 3–5 business days. We'll email you if we need additional information or documents. High-quality submissions with complete information and a working booking website are typically approved faster. Complex submissions or those requiring additional verification may take longer.",
  },
  // VERIFICATION
  {
    section: "Verification",
    question: "What's the verification process?",
    answer: "We review your property details, photos, and booking website. We verify that the site works, accepts bookings, and has clear policies. We may check host identity and property ownership. Most listings are reviewed within 3–5 business days.",
  },
  {
    section: "Verification",
    question: "How long does verification take?",
    answer: "Typically 3–5 business days. We'll email you if we need more information. Complex or high-volume submissions may take longer. You can speed things up by ensuring your booking site is live and your listing details are complete.",
  },
  {
    section: "Verification",
    question: "What documents do I need?",
    answer: "We may request ID verification and proof of property ownership or management (e.g., utility bill, deed, property management agreement). Most hosts are approved with standard listing info. We'll contact you if we need additional documents.",
  },
  {
    section: "Verification",
    question: "Can I list without my own website?",
    answer: "Yes, but you need a direct booking solution. We offer done-for-you website setup ($500 one-time) or you can use DIY platforms like Lodgify ($39/mo), Hostfully ($49/mo), Booqable, or similar services. We don't accept listings that only link to Airbnb or Vrbo—you must have your own booking platform.",
  },
  // PLATFORM USE
  {
    section: "Platform Use",
    question: "Can I use other platforms simultaneously?",
    answer: "Yes. TrustYourHost is non-exclusive. Most hosts use us alongside Airbnb, Vrbo, and other channels. We drive traffic to your direct booking site—you keep full control of your calendar and can sync with other platforms.",
  },
  {
    section: "Platform Use",
    question: "Do you provide a booking website?",
    answer: "We don't build sites ourselves, but we offer done-for-you setup ($500) or you can use DIY platforms like Lodgify ($39/mo), Hostfully ($49/mo), or similar. Your property must have a functional direct booking site to list on TrustYourHost.",
  },
  {
    section: "Platform Use",
    question: "How do I manage my listing?",
    answer: "Once approved, you can log in to your host dashboard to update photos, descriptions, availability, and pricing. Changes sync to TrustYourHost. Your booking site remains the source of truth for reservations—we send guests there to book.",
  },
  {
    section: "Platform Use",
    question: "How do guests contact me?",
    answer: "Guests see your booking website link on TrustYourHost. They contact you through the messaging or contact form on your booking site. We don't handle guest communication—all inquiries and bookings happen directly between you and your guests through your own platform.",
  },
]

// Tab 3: FIFA 2026 (general)
export const fifaFaqs: HelpFaqItem[] = [
  {
    section: "FIFA 2026",
    question: "Which cities are hosting FIFA 2026?",
    answer: "The 11 U.S. host cities are: New York/New Jersey, Los Angeles, Miami Gardens, Dallas, San Francisco Bay Area, Atlanta, Houston, Seattle, Philadelphia, Boston, and Kansas City. Canada and Mexico also host matches. We feature properties in all U.S. host cities.",
  },
  {
    section: "FIFA 2026",
    question: "When should I book for the World Cup?",
    answer: "As early as possible. Properties near stadiums fill up quickly, and prices rise as the tournament approaches. Many hosts release FIFA-period availability 12–18 months ahead. Booking 6–12 months before match dates typically offers the best selection and rates.",
  },
  {
    section: "FIFA 2026",
    question: "Are there minimum stay requirements?",
    answer: "Minimum stays are set by each host. FIFA-period bookings often have 3–7 night minimums due to demand. Check each property's listing and the host's booking site for exact requirements. Some hosts offer single-night stays.",
  },
  {
    section: "FIFA 2026",
    question: "How close are properties to stadiums?",
    answer: "Distance varies by city. Our FIFA 2026 city pages show neighborhoods by proximity to each stadium, with transit options. You can filter search results by \"near stadium\" or by specific neighborhoods. Each city guide includes transportation tips for match days.",
  },
  {
    section: "FIFA 2026",
    question: "What about transportation to matches?",
    answer: "Each host city has different transportation options. Our city guides provide detailed transit information including public transport, rideshare recommendations, and parking tips. Most stadiums are accessible by metro, light rail, or bus. We recommend booking properties near transit lines for easier match-day travel.",
  },
  {
    section: "FIFA 2026",
    question: "What are the refund policies for cancelled matches?",
    answer: "Refund policies are set by individual hosts and vary by property. If FIFA officially cancels or reschedules a match, contact your host immediately to discuss options. We recommend reviewing cancellation policies carefully before booking and considering travel insurance for FIFA-period stays. Hosts may offer flexible policies for official tournament changes.",
  },
  {
    section: "FIFA 2026",
    question: "Can I book for multiple match dates in one city?",
    answer: "Yes, if the host has availability for your desired dates. Many hosts offer discounts for extended stays during the tournament. Contact hosts directly through their booking sites to inquire about multi-match packages or longer bookings. Some properties may have minimum stay requirements that already cover multiple match days.",
  },
  {
    section: "FIFA 2026",
    question: "Are properties verified for FIFA 2026?",
    answer: "All properties on TrustYourHost undergo our standard verification process, regardless of FIFA designation. Properties tagged for FIFA 2026 have been confirmed by hosts as available during the tournament period and meet proximity or amenity criteria relevant to World Cup travelers. We verify photos, booking sites, and host identity for all listings.",
  },
]

/** All FAQs flattened for schema (question + answer only) */
export function getGuestFaqsForSchema() {
  return guestFaqs.map((f) => ({ question: f.question, answer: f.answer }))
}

export function getHostFaqsForSchema() {
  return hostFaqs.map((f) => ({ question: f.question, answer: f.answer }))
}

export function getFifaFaqsForSchema() {
  return fifaFaqs.map((f) => ({ question: f.question, answer: f.answer }))
}
