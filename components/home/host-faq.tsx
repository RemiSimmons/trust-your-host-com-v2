"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What does the 60-day free trial include?",
    answer: "Your property is listed in our directory immediately upon approval. You get full access to analytics, FIFA 2026 placement, and all directory features for 60 days completely free. No credit card required to start. After 60 days, it's just $49/month to stay listed."
  },
  {
    question: "Do you process bookings or payments?",
    answer: "No. TrustYourHost is a directory connecting travelers to your direct booking website. Guests book and pay through YOUR site. We don't handle bookings, take commissions, or get involved in guest relationships. You keep 100% control and 100% of revenue."
  },
  {
    question: "What if I don't have a booking website?",
    answer: "We partner with RemSimmons to offer a $500 website setup service—launch-ready in 2-3 business days (see above). Alternatively, you can use platforms like Lodgify ($39/month), Hostfully ($49/month), or Uplisting ($29/month) to create your own booking site. Once your site is ready, submit your property to TrustYourHost."
  },
  {
    question: "How long does approval take?",
    answer: "We manually review every property within 24-48 hours. We verify your booking website works, check property details for accuracy, and ensure photos are authentic. Once approved, your property goes live immediately and your 60-day trial begins."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes! There's no long-term commitment. Cancel your $49/month subscription anytime through your host dashboard. Your property will be removed from the directory, but you keep your booking website and all guest relationships."
  },
  {
    question: "What analytics do I get?",
    answer: "Your host dashboard shows: property views, clicks to your website, traffic sources, and geographic data. You'll see which cities travelers are coming from and peak viewing times. This helps you understand your ROI from the directory listing."
  },
  {
    question: "Can I list multiple properties?",
    answer: "Absolutely! Manage all your properties from one account. Your first property is $49/month (with 60-day free trial). Each additional property is only $39/month (20% discount, no trial). All properties share one dashboard with combined analytics."
  },
  {
    question: "How does multi-property pricing work?",
    answer: "Your first property gets the 60-day free trial, then $49/month. When you add a second property, it's billed immediately at $39/month. Third property: another $39/month. Example: 3 properties = $127/month total (vs. $147 if full price). Unlimited properties allowed."
  },
  {
    question: "Can I edit my property after it's live?",
    answer: "Yes! You can instantly update photos, description, pricing, and contact info. Changes to address, property type, or capacity require admin re-approval (your listing stays live with current info). System-controlled fields like verification badges require contacting support."
  },
]

export function HostFAQ() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.details
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 group cursor-pointer hover:shadow-md transition-shadow"
            >
              <summary className="font-bold text-lg list-none flex items-center justify-between">
                <span className="text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown className="w-5 h-5 text-gray-500 transform group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
              </summary>
              <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                {faq.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}
