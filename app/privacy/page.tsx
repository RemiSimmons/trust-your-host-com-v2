import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import Link from "next/link"
import { generateMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = generateMetadata({
  title: "Privacy Policy",
  description: "Learn how TrustYourHost collects, uses, and protects your personal information. Transparent privacy practices for our directory platform.",
  url: "/privacy",
})

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 font-serif text-4xl font-bold">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last Updated: January 26, 2026
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border">
            <h2 className="font-semibold mb-3">Quick Navigation</h2>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <a href="#information-collection" className="text-blue-600 hover:underline">1. Information Collection</a>
              <a href="#use-of-information" className="text-blue-600 hover:underline">2. Use of Information</a>
              <a href="#information-sharing" className="text-blue-600 hover:underline">3. Information Sharing</a>
              <a href="#data-security" className="text-blue-600 hover:underline">4. Data Security</a>
              <a href="#cookies" className="text-blue-600 hover:underline">5. Cookies & Tracking</a>
              <a href="#user-rights" className="text-blue-600 hover:underline">6. Your Rights (GDPR/CCPA)</a>
              <a href="#international" className="text-blue-600 hover:underline">7. International Transfers</a>
              <a href="#children" className="text-blue-600 hover:underline">8. Children's Privacy</a>
              <a href="#changes" className="text-blue-600 hover:underline">9. Changes to Policy</a>
              <a href="#contact" className="text-blue-600 hover:underline">10. Contact Us</a>
            </div>
          </div>

          <div className="prose prose-stone max-w-none dark:prose-invert bg-white dark:bg-gray-800 p-8 rounded-lg">
            {/* Introduction */}
            <p className="lead text-lg mb-6">
              TrustYourHost ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our directory platform at trustyourhost.com.
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-2">What TrustYourHost Does</h3>
              <p className="text-sm mb-0">
                TrustYourHost is a <strong>directory platform</strong> that connects travelers with vacation rental hosts who have their own direct booking websites. We do NOT process bookings or payments between travelers and hosts. We only charge hosts a subscription fee to be listed in our directory.
              </p>
            </div>

            {/* Section 1 */}
            <h2 id="information-collection" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">1.1 Information You Provide to Us</h3>
            
            <h4 className="text-lg font-semibold mt-4 mb-2">For Hosts (Property Owners):</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Account Information:</strong> Name, email address, phone number</li>
              <li><strong>Property Information:</strong> Property name, description, location (city, state, country, full address for verification), property type, amenities, pricing</li>
              <li><strong>Images:</strong> Property photos you upload</li>
              <li><strong>Booking Website:</strong> URL of your direct booking website</li>
              <li><strong>Payment Information:</strong> Credit card details (processed and stored by Stripe, not by us)</li>
              <li><strong>Optional Information:</strong> Platforms you're listed on (Airbnb, VRBO, etc.), typical response time</li>
            </ul>

            <h4 className="text-lg font-semibold mt-4 mb-2">For Travelers (Guests):</h4>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Browsing Behavior:</strong> Properties you view, search queries, filters you apply</li>
              <li><strong>Click Tracking:</strong> When you click "Visit Website" to go to a host's booking site (anonymous, used for analytics)</li>
              <li><strong>Account Information (if you create an account):</strong> Email address, name</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">1.2 Information We Collect Automatically</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Technical Data:</strong> IP address, browser type, device type, operating system</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, referral source</li>
              <li><strong>Cookies & Similar Technologies:</strong> Session cookies, authentication tokens, analytics cookies (see Section 5)</li>
            </ul>

            {/* Section 2 */}
            <h2 id="use-of-information" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              2. How We Use Your Information
            </h2>

            <p className="mb-4">We use the information we collect for the following purposes:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Operating the Platform</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Creating and managing host accounts</li>
              <li>Displaying property listings to travelers</li>
              <li>Facilitating connections between travelers and hosts (via click-throughs to host websites)</li>
              <li>Verifying and approving property submissions</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Processing Subscriptions</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Billing hosts for their $49/month subscription</li>
              <li>Managing free trial periods (60 days)</li>
              <li>Processing subscription renewals and cancellations</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Communication</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Sending transactional emails (property approval, subscription confirmations, password resets)</li>
              <li>Responding to support requests</li>
              <li>Sending important updates about our service (with option to opt-out of non-essential communications)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.4 Analytics & Improvement</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Understanding how users interact with our platform</li>
              <li>Improving search and discovery features</li>
              <li>Optimizing property listings and recommendations</li>
              <li>Identifying and fixing technical issues</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.5 AI-Powered Recommendations</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Using Google Gemini AI to provide personalized property recommendations based on your search queries</li>
              <li>Analyzing search patterns to improve recommendation quality</li>
            </ul>

            {/* Section 3 */}
            <h2 id="information-sharing" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              3. How We Share Your Information
            </h2>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg mb-6">
              <p className="font-semibold mb-2">✅ We Do NOT Sell Your Data</p>
              <p className="text-sm mb-0">
                TrustYourHost does not sell, rent, or trade your personal information to third parties for marketing purposes.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Service Providers</h3>
            <p className="mb-4">We share your information with trusted third-party service providers who help us operate our platform:</p>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">🗄️ Supabase (Database & Authentication)</h4>
                <p className="text-sm mb-1"><strong>Data Shared:</strong> All account and property data</p>
                <p className="text-sm mb-1"><strong>Purpose:</strong> Secure data storage and user authentication</p>
                <p className="text-sm mb-0"><strong>Location:</strong> United States (US region)</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">💳 Stripe (Payment Processing)</h4>
                <p className="text-sm mb-1"><strong>Data Shared:</strong> Host payment information for subscriptions</p>
                <p className="text-sm mb-1"><strong>Purpose:</strong> Processing $49/month host subscriptions</p>
                <p className="text-sm mb-0"><strong>Compliance:</strong> PCI-DSS Level 1 certified</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">📧 Resend (Email Delivery)</h4>
                <p className="text-sm mb-1"><strong>Data Shared:</strong> Email addresses, names</p>
                <p className="text-sm mb-0"><strong>Purpose:</strong> Transactional emails (approvals, notifications)</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">🤖 Google Gemini AI</h4>
                <p className="text-sm mb-1"><strong>Data Shared:</strong> Search queries (anonymized)</p>
                <p className="text-sm mb-0"><strong>Purpose:</strong> AI-powered property recommendations</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">🔒 Cloudflare (CDN & Security)</h4>
                <p className="text-sm mb-1"><strong>Data Shared:</strong> IP addresses, request data</p>
                <p className="text-sm mb-0"><strong>Purpose:</strong> DDoS protection, content delivery</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">📊 Google Analytics (if enabled)</h4>
                <p className="text-sm mb-1"><strong>Data Shared:</strong> Anonymous usage data</p>
                <p className="text-sm mb-0"><strong>Purpose:</strong> Traffic analytics</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Legal Requirements</h3>
            <p className="mb-4">We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., court orders, subpoenas).</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Business Transfers</h3>
            <p className="mb-4">If TrustYourHost is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website of any change in ownership.</p>

            {/* Section 4 */}
            <h2 id="data-security" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              4. Data Security
            </h2>

            <p className="mb-4">We take the security of your personal information seriously and implement industry-standard security measures:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Technical Safeguards</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>HTTPS Encryption:</strong> All data transmitted between your browser and our servers is encrypted using TLS/SSL</li>
              <li><strong>Database Encryption:</strong> Data at rest is encrypted in Supabase's secure database</li>
              <li><strong>Access Controls:</strong> Strict access controls limit who can access your data internally</li>
              <li><strong>Regular Security Audits:</strong> We regularly review and update our security practices</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Payment Security</h3>
            <p className="mb-4">
              We do NOT store credit card information on our servers. All payment processing is handled by Stripe, which is PCI-DSS Level 1 certified (the highest level of payment security).
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Account Security</h3>
            <p className="mb-4">
              You are responsible for maintaining the confidentiality of your account password. We recommend using a strong, unique password and enabling two-factor authentication if available.
            </p>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-6">
              <p className="text-sm mb-0">
                <strong>⚠️ No Security System is Perfect:</strong> While we strive to protect your information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>

            {/* Section 5 */}
            <h2 id="cookies" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              5. Cookies & Tracking Technologies
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.1 What Are Cookies?</h3>
            <p className="mb-4">
              Cookies are small text files stored on your device that help us recognize you and remember your preferences.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Types of Cookies We Use</h3>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">Essential Cookies (Required)</h4>
                <p className="text-sm mb-1"><strong>Purpose:</strong> Authentication, session management, security</p>
                <p className="text-sm mb-0"><strong>Can Be Disabled?</strong> No (required for platform to function)</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">Analytics Cookies (Optional)</h4>
                <p className="text-sm mb-1"><strong>Purpose:</strong> Understanding how users interact with our platform</p>
                <p className="text-sm mb-1"><strong>Services:</strong> Google Analytics</p>
                <p className="text-sm mb-0"><strong>Can Be Disabled?</strong> Yes (via browser settings or opt-out)</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">Functional Cookies (Optional)</h4>
                <p className="text-sm mb-1"><strong>Purpose:</strong> Remembering your preferences (language, theme)</p>
                <p className="text-sm mb-0"><strong>Can Be Disabled?</strong> Yes (may affect functionality)</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.3 How to Control Cookies</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or delete cookies. Check your browser's help section for instructions.</li>
              <li><strong>Google Analytics Opt-Out:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics Opt-out Browser Add-on</a></li>
              <li><strong>Do Not Track:</strong> We respect Do Not Track (DNT) browser signals</li>
            </ul>

            {/* Section 6 */}
            <h2 id="user-rights" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              6. Your Rights (GDPR/CCPA)
            </h2>

            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information under laws such as the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">6.1 Your Rights Include:</h3>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">🔍 Right to Access</h4>
                <p className="text-sm mb-0">Request a copy of the personal information we hold about you</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">✏️ Right to Correction</h4>
                <p className="text-sm mb-0">Request correction of inaccurate or incomplete information</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">🗑️ Right to Deletion</h4>
                <p className="text-sm mb-0">Request deletion of your personal information (subject to legal obligations)</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">📤 Right to Data Portability</h4>
                <p className="text-sm mb-0">Request a machine-readable copy of your data</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">🚫 Right to Object</h4>
                <p className="text-sm mb-0">Object to certain types of processing (e.g., marketing)</p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2">⏸️ Right to Restriction</h4>
                <p className="text-sm mb-0">Request restriction of processing in certain circumstances</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">6.2 How to Exercise Your Rights</h3>
            <p className="mb-4">
              To exercise any of these rights, please contact us at: <a href="mailto:hello@trustyourhost.com" className="text-blue-600 hover:underline">hello@trustyourhost.com</a>
            </p>
            <p className="mb-4">
              We will respond to your request within 30 days. We may ask you to verify your identity before processing your request.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">6.3 California-Specific Rights (CCPA)</h3>
            <p className="mb-4">If you are a California resident, you have additional rights:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Right to know what personal information we collect, use, and share</li>
              <li>Right to delete your personal information (subject to exceptions)</li>
              <li>Right to opt-out of sale of personal information (we do NOT sell personal information)</li>
              <li>Right to non-discrimination for exercising your CCPA rights</li>
            </ul>

            {/* Section 7 */}
            <h2 id="international" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              7. International Data Transfers
            </h2>

            <p className="mb-4">
              TrustYourHost is based in the United States. If you access our platform from outside the United States, please be aware that your information will be transferred to, stored, and processed in the United States.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">7.1 Data Storage Location</h3>
            <p className="mb-4">
              Our primary database (Supabase) is hosted in the United States. By using our platform, you consent to the transfer of your information to the United States.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">7.2 EU-US Data Transfers</h3>
            <p className="mb-4">
              For users in the European Economic Area (EEA), United Kingdom, or Switzerland, we rely on appropriate safeguards for international data transfers, including Standard Contractual Clauses approved by the European Commission.
            </p>

            {/* Section 8 */}
            <h2 id="children" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              8. Children's Privacy
            </h2>

            <p className="mb-4">
              TrustYourHost is not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at <a href="mailto:hello@trustyourhost.com" className="text-blue-600 hover:underline">hello@trustyourhost.com</a> and we will delete such information.
            </p>

            {/* Section 9 */}
            <h2 id="changes" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              9. Changes to This Privacy Policy
            </h2>

            <p className="mb-4">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">9.1 How We Notify You</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Material Changes:</strong> We will notify you via email and/or a prominent notice on our website at least 30 days before the changes take effect</li>
              <li><strong>Minor Changes:</strong> We will update the "Last Updated" date at the top of this policy</li>
            </ul>

            <p className="mb-4">
              Your continued use of TrustYourHost after any changes indicates your acceptance of the updated Privacy Policy.
            </p>

            {/* Section 10 */}
            <h2 id="contact" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              10. Contact Us
            </h2>

            <p className="mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>

            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
              <p className="font-semibold mb-2">TrustYourHost Privacy Team</p>
              <p className="mb-1"><strong>Email:</strong> <a href="mailto:hello@trustyourhost.com" className="text-blue-600 hover:underline">hello@trustyourhost.com</a></p>
              <p className="mb-0"><strong>Response Time:</strong> We aim to respond within 3 business days</p>
            </div>

            {/* Footer Navigation */}
            <div className="mt-12 pt-6 border-t flex justify-between items-center">
              <Link href="/terms" className="text-blue-600 hover:underline">
                View Terms of Service →
              </Link>
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
