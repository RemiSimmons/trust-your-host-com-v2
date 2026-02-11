/**
 * Homepage FAQ data - Hub & Spoke model
 * Conversion-critical objection handlers only. 40-60 words per answer.
 * Used for both UI and FAQPage schema.
 */

export const homepageFaqs = [
  {
    question: "What is TrustYourHost and how is it different from Airbnb?",
    answer: "TrustYourHost is a curated directory, not a booking platform. We connect you directly with verified hosts who book on their own sites—no middleman, no guest service fees. You browse, compare, then book direct with the host. We verify every property before listing.",
    learnMoreText: "Learn more about how we work",
    learnMoreHref: "/how-it-works",
    category: "guest" as const,
  },
  {
    question: "Do I book on TrustYourHost or directly with hosts?",
    answer: "You book directly with the host. TrustYourHost is a discovery directory. Browse properties here, then click through to the host's website to check availability and complete your reservation. We never process payments—you book straight with the host.",
    learnMoreText: "How booking works",
    learnMoreHref: "/faq/how-to-book",
    category: "guest" as const,
  },
  {
    question: "Are there booking fees for guests?",
    answer: "No. You book directly with hosts on their own sites. TrustYourHost adds zero service fees. You pay only what the host charges—no platform markups. Unlike Airbnb or Vrbo, we're a directory, not a marketplace, so your money goes straight to the host.",
    learnMoreText: "Guest fees & pricing",
    learnMoreHref: "/faq/guest-fees",
    category: "guest" as const,
  },
  {
    question: "How much does it cost to list my property?",
    answer: "We charge a flat monthly fee ($49/month for your first property) instead of commission. No per-booking fees, no percentage cuts. A 60-day free trial lets you test the waters. More profitable than paying 15-20% on every OTA booking.",
    learnMoreText: "Host pricing & fees",
    learnMoreHref: "/faq/host-fees",
    category: "host" as const,
  },
  {
    question: "Can I keep using Airbnb/Vrbo while listed here?",
    answer: "Yes. TrustYourHost is non-exclusive. Most hosts use us alongside Airbnb and Vrbo to grow direct bookings while keeping OTA listings active. We drive traffic to your site—you keep full control of pricing, policies, and guest communication.",
    learnMoreText: "Using multiple platforms",
    learnMoreHref: "/faq/can-i-use-with-otas",
    category: "host" as const,
  },
  {
    question: "How do you verify properties and hosts?",
    answer: "Every listing is manually reviewed. We verify host identity, property photos, location accuracy, and that booking websites work correctly. We monitor guest reports and may remove hosts who don't meet our standards. Your safety matters.",
    learnMoreText: "Verification process",
    learnMoreHref: "/help/for-guests/safety-and-trust",
    category: "trust" as const,
  },
  {
    question: "What if I need help during my stay?",
    answer: "You connect directly with your host—they handle availability, check-in, and any issues. TrustYourHost provides the directory; hosts manage their own bookings. For platform questions, our support team is available. Your host's contact info is on your confirmation.",
    learnMoreText: "Safety & support",
    learnMoreHref: "/help/for-guests/safety-and-trust",
    category: "trust" as const,
  },
]
