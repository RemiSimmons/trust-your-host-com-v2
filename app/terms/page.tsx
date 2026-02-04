import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import Link from "next/link"
import { generateMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = generateMetadata({
  title: "Terms of Service",
  description: "Read our terms of service and conditions for using the TrustYourHost directory platform. Clear terms for hosts and travelers.",
  url: "/terms",
})

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-4 font-serif text-4xl font-bold">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Last Updated: January 26, 2026
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border">
            <h2 className="font-semibold mb-3">Quick Navigation</h2>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <a href="#acceptance" className="text-blue-600 hover:underline">1. Acceptance of Terms</a>
              <a href="#description" className="text-blue-600 hover:underline">2. Description of Service</a>
              <a href="#registration" className="text-blue-600 hover:underline">3. Account Registration</a>
              <a href="#host-responsibilities" className="text-blue-600 hover:underline">4. Host Responsibilities</a>
              <a href="#subscription" className="text-blue-600 hover:underline">5. Subscription Terms</a>
              <a href="#prohibited" className="text-blue-600 hover:underline">6. Prohibited Activities</a>
              <a href="#content-ownership" className="text-blue-600 hover:underline">7. Content Ownership</a>
              <a href="#verification" className="text-blue-600 hover:underline">8. Verification & Approval</a>
              <a href="#liability" className="text-blue-600 hover:underline">9. Liability & Disclaimers</a>
              <a href="#indemnification" className="text-blue-600 hover:underline">10. Indemnification</a>
              <a href="#dispute-resolution" className="text-blue-600 hover:underline">11. Dispute Resolution</a>
              <a href="#termination" className="text-blue-600 hover:underline">12. Termination</a>
              <a href="#changes" className="text-blue-600 hover:underline">13. Changes to Terms</a>
              <a href="#governing-law" className="text-blue-600 hover:underline">14. Governing Law</a>
              <a href="#contact" className="text-blue-600 hover:underline">15. Contact</a>
            </div>
          </div>

          <div className="prose prose-stone max-w-none dark:prose-invert bg-white dark:bg-gray-800 p-8 rounded-lg">
            {/* Introduction */}
            <p className="lead text-lg mb-6">
              Welcome to TrustYourHost. These Terms of Service ("Terms") govern your use of our directory platform. By accessing or using TrustYourHost, you agree to be bound by these Terms.
            </p>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-2">Important: We're a Directory, Not a Booking Platform</h3>
              <p className="text-sm mb-0">
                TrustYourHost is a <strong>directory service</strong> that connects travelers with vacation rental hosts who have their own direct booking websites. We do NOT process bookings, handle reservations, or process payments between travelers and hosts. All bookings occur directly between travelers and hosts on the host's own website.
              </p>
            </div>

            {/* Section 1 */}
            <h2 id="acceptance" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              1. Acceptance of Terms
            </h2>

            <p className="mb-4">
              By accessing, browsing, or using TrustYourHost ("Platform," "Service," "we," "us," or "our"), you ("you," "your," "User") acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
            </p>

            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>If you do not agree to these Terms, you must not use our Platform</li>
              <li>These Terms constitute a legally binding agreement between you and TrustYourHost</li>
              <li>You must be at least 18 years old to create a host account or list a property</li>
              <li>By using our Service, you represent and warrant that you meet these eligibility requirements</li>
            </ul>

            {/* Section 2 */}
            <h2 id="description" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              2. Description of Service
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.1 What TrustYourHost Is</h3>
            <p className="mb-4">
              TrustYourHost is a <strong>directory and discovery platform</strong> that:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Connects travelers with vacation rental hosts</li>
              <li>Displays property listings with links to hosts' direct booking websites</li>
              <li>Charges hosts a monthly subscription fee to be listed in our directory</li>
              <li>Provides search, filtering, and discovery tools for travelers</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.2 What TrustYourHost Is NOT</h3>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-6">
              <p className="font-semibold mb-2">❌ We Do NOT:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm mb-0">
                <li>Process bookings or reservations</li>
                <li>Handle payments between travelers and hosts</li>
                <li>Act as a party to rental agreements</li>
                <li>Provide property management services</li>
                <li>Guarantee property availability or quality</li>
                <li>Act as a real estate agent or broker</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Host-Traveler Relationship</h3>
            <p className="mb-4">
              When a traveler clicks "Visit Website" on a property listing, they are directed to the host's own independent booking website. Any booking, payment, or rental agreement occurs directly between the traveler and the host. <strong>TrustYourHost is not a party to this transaction.</strong>
            </p>

            {/* Section 3 */}
            <h2 id="registration" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              3. Account Registration
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Host Accounts</h3>
            <p className="mb-4">To list a property on TrustYourHost, you must create a host account and provide:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Accurate and complete registration information (name, email, phone number)</li>
              <li>Valid property information and images</li>
              <li>A functional direct booking website URL</li>
              <li>Payment information for subscription billing</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Account Security</h3>
            <p className="mb-4">You are responsible for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Maintaining the confidentiality of your account password</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized access or security breach</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Accurate Information</h3>
            <p className="mb-4">
              You agree to provide accurate, current, and complete information and to update this information promptly if it changes. Providing false or misleading information may result in account termination.
            </p>

            {/* Section 4 */}
            <h2 id="host-responsibilities" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              4. Host Responsibilities
            </h2>

            <p className="mb-4">As a host listing a property on TrustYourHost, you are solely responsible for:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Property Listings</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Providing accurate property descriptions, amenities, and pricing information</li>
              <li>Using authentic, unaltered photos of your property</li>
              <li>Updating your listing promptly when information changes</li>
              <li>Ensuring your listing does not violate any laws or third-party rights</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Legal Compliance</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Permits & Licenses:</strong> Obtaining all necessary permits, licenses, and approvals required to operate a short-term rental in your jurisdiction</li>
              <li><strong>Taxes:</strong> Collecting and remitting all applicable taxes (occupancy tax, sales tax, etc.)</li>
              <li><strong>Insurance:</strong> Maintaining adequate liability and property insurance</li>
              <li><strong>Local Laws:</strong> Complying with all local, state, and federal laws regarding short-term rentals</li>
              <li><strong>HOA/Condo Rules:</strong> Complying with any homeowner association or condominium rules</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Direct Booking Website</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Maintaining a functional, accessible booking website</li>
              <li>Ensuring your booking system accurately reflects availability</li>
              <li>Processing bookings and payments securely on your own platform</li>
              <li>Keeping your booking URL active and operational</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.4 Guest Communication</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Responding promptly to guest inquiries received through your booking website</li>
              <li>Honoring confirmed bookings made through your direct booking system</li>
              <li>Providing accurate check-in information and house rules</li>
              <li>Maintaining professional and respectful communication with guests</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">4.5 Property Standards</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Maintaining your property in a safe, clean, and habitable condition</li>
              <li>Ensuring all advertised amenities are functional</li>
              <li>Addressing guest complaints and issues promptly</li>
              <li>Complying with health and safety regulations</li>
            </ul>

            {/* Section 5 */}
            <h2 id="subscription" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              5. Subscription Terms
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Subscription Fee</h3>
            <p className="mb-4">
              Hosts pay a <strong>$49 per month subscription fee</strong> to maintain their property listing on TrustYourHost. This fee covers directory listing, search visibility, and platform access.
            </p>

            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg mb-6">
              <p className="font-semibold mb-2">✅ What's Included in Your Subscription:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm mb-0">
                <li>Property listing in our directory</li>
                <li>Search visibility for travelers</li>
                <li>AI-powered recommendation inclusion</li>
                <li>Click tracking and analytics</li>
                <li>Badge eligibility (Verified, FIFA Featured, etc.)</li>
                <li>Customer support</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Free Trial</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>New hosts receive a <strong>60-day free trial</strong> upon approval</li>
              <li>Your first payment will be charged on day 61 after approval</li>
              <li>You can cancel anytime during the trial period without being charged</li>
              <li>The free trial is available once per property</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Payment & Billing</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Payment Method:</strong> You must provide a valid credit card or other accepted payment method via Stripe</li>
              <li><strong>Automatic Renewal:</strong> Your subscription automatically renews each month unless canceled</li>
              <li><strong>Billing Date:</strong> You will be charged on the same day each month (e.g., if you start on the 15th, you'll be billed on the 15th monthly)</li>
              <li><strong>Failed Payments:</strong> If a payment fails, we will attempt to charge your card again. If payment continues to fail, your listing may be suspended</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.4 Cancellation Policy</h3>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg mb-6">
              <p className="font-semibold mb-2">Cancellation Terms:</p>
              <ul className="list-disc pl-6 space-y-1 text-sm mb-0">
                <li>You may cancel your subscription at any time from your host dashboard</li>
                <li>Cancellation takes effect at the end of your current billing period</li>
                <li>You will retain access until the end of the paid period</li>
                <li><strong>No Refunds:</strong> We do not provide refunds for partial months or unused time</li>
                <li>Your property listing will be removed from the directory once your subscription ends</li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">5.5 Price Changes</h3>
            <p className="mb-4">
              We reserve the right to change our subscription pricing. If we increase the price, we will notify you at least 30 days in advance. The new price will apply starting with your next billing cycle after the notice period. You may cancel your subscription before the price increase takes effect.
            </p>

            {/* Section 6 */}
            <h2 id="prohibited" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              6. Prohibited Activities
            </h2>

            <p className="mb-4">You agree NOT to:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">6.1 Content Violations</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Post fake, fraudulent, or misleading property listings</li>
              <li>Use photos that do not accurately represent your property</li>
              <li>List properties you do not own or have authorization to rent</li>
              <li>Include false information about amenities, location, or availability</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Platform Abuse</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Scrape, crawl, or use automated tools to access the Platform</li>
              <li>Reverse engineer or attempt to access our source code</li>
              <li>Interfere with the proper functioning of the Platform</li>
              <li>Circumvent any access restrictions or security measures</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">6.3 Legal Violations</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Use the Platform for any illegal purpose</li>
              <li>Violate any local, state, federal, or international laws</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Engage in discriminatory practices prohibited by law</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">6.4 Misconduct</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Harass, abuse, or harm other users</li>
              <li>Impersonate another person or entity</li>
              <li>Spam or send unsolicited communications</li>
              <li>Engage in fraudulent activity</li>
            </ul>

            {/* Section 7 */}
            <h2 id="content-ownership" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              7. Content Ownership & License
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">7.1 Your Content</h3>
            <p className="mb-4">
              You retain ownership of all content you submit to TrustYourHost, including property descriptions, photos, and other materials ("Your Content").
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">7.2 License to TrustYourHost</h3>
            <p className="mb-4">
              By submitting Your Content, you grant TrustYourHost a worldwide, non-exclusive, royalty-free, transferable license to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Display Your Content on our Platform</li>
              <li>Use Your Content in marketing and promotional materials</li>
              <li>Modify, resize, or reformat Your Content for display purposes</li>
              <li>Cache and store Your Content on our servers</li>
            </ul>
            <p className="mb-4">
              This license ends when you delete Your Content or terminate your account, except for content that has been shared or cached.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">7.3 Content Representations</h3>
            <p className="mb-4">By submitting Your Content, you represent and warrant that:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You own or have the necessary rights to Your Content</li>
              <li>Your Content does not infringe on any third-party rights</li>
              <li>Your Content complies with these Terms and applicable laws</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">7.4 TrustYourHost Platform</h3>
            <p className="mb-4">
              TrustYourHost owns all rights to the Platform, including our code, design, trademarks, logos, and functionality. You may not copy, modify, or create derivative works based on our Platform.
            </p>

            {/* Section 8 */}
            <h2 id="verification" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              8. Verification & Approval Process
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.1 Manual Review</h3>
            <p className="mb-4">
              All property submissions are manually reviewed by our team before being approved for listing. We typically review submissions within 24-48 hours.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.2 Approval Criteria</h3>
            <p className="mb-4">We may approve or reject listings based on:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Quality of property photos and descriptions</li>
              <li>Functionality of direct booking website</li>
              <li>Compliance with our listing standards</li>
              <li>Verification of property legitimacy</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.3 Right to Reject</h3>
            <p className="mb-4">
              We reserve the right to reject any property submission at our sole discretion without providing a reason. Common rejection reasons include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Low-quality or insufficient photos</li>
              <li>Non-functional or suspicious booking website</li>
              <li>Incomplete or inaccurate information</li>
              <li>Property does not meet our quality standards</li>
              <li>Suspected fraud or misrepresentation</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.4 Right to Remove</h3>
            <p className="mb-4">
              Even after approval, we reserve the right to remove or suspend any listing if:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>We receive complaints about the property or host</li>
              <li>We discover inaccurate or misleading information</li>
              <li>The host violates these Terms</li>
              <li>The booking website becomes non-functional</li>
              <li>We suspect fraudulent activity</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">8.5 No Guarantee of Accuracy</h3>
            <p className="mb-4">
              While we manually review listings, we do not verify the accuracy of all information provided by hosts. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Inaccurate property descriptions</li>
              <li>False claims about amenities or features</li>
              <li>Unavailability of advertised properties</li>
              <li>Quality or condition of properties</li>
            </ul>

            {/* Section 9 */}
            <h2 id="liability" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              9. Liability & Disclaimers
            </h2>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-6">
              <h3 className="text-lg font-semibold mb-2">⚠️ IMPORTANT LIABILITY DISCLAIMERS</h3>
              <p className="text-sm mb-0">
                Please read this section carefully. It limits TrustYourHost's liability for issues related to property rentals, bookings, and host-traveler interactions.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">9.1 "AS IS" Service</h3>
            <p className="mb-4">
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">9.2 No Party to Rental Agreements</h3>
            <p className="mb-4">
              TrustYourHost is a <strong>directory service only</strong>. We are not:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>A party to any rental agreement between hosts and travelers</li>
              <li>Responsible for the conduct of hosts or travelers</li>
              <li>A real estate agent, broker, or property manager</li>
              <li>An insurer or guarantor of property quality or availability</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">9.3 No Responsibility for Host-Traveler Disputes</h3>
            <p className="mb-4">
              TrustYourHost is NOT responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Property condition, safety, or cleanliness</li>
              <li>Accuracy of property descriptions or photos</li>
              <li>Availability of properties</li>
              <li>Host-traveler communication or disputes</li>
              <li>Cancellations, refunds, or booking modifications</li>
              <li>Personal injury or property damage</li>
              <li>Lost or stolen belongings</li>
              <li>Fraudulent hosts or fake listings</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">9.4 Third-Party Websites</h3>
            <p className="mb-4">
              TrustYourHost links to hosts' independent booking websites. We are not responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Content on third-party websites</li>
              <li>Functionality of third-party booking systems</li>
              <li>Security of third-party payment processing</li>
              <li>Terms and conditions of host booking websites</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">9.5 Limitation of Liability</h3>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, TRUSTYOURHOST SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
              <li>LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES</li>
              <li>DAMAGES ARISING FROM YOUR USE OR INABILITY TO USE THE PLATFORM</li>
              <li>DAMAGES ARISING FROM HOST-TRAVELER INTERACTIONS</li>
            </ul>
            <p className="mb-4">
              IN NO EVENT SHALL TRUSTYOURHOST'S TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM (I.E., YOUR SUBSCRIPTION FEES, NOT TO EXCEED $588).
            </p>

            {/* Section 10 */}
            <h2 id="indemnification" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              10. Indemnification
            </h2>

            <p className="mb-4">
              You agree to indemnify, defend, and hold harmless TrustYourHost and its officers, directors, employees, contractors, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising from or related to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your use of the Platform</li>
              <li>Your property listings and submissions</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any law or regulation</li>
              <li>Your violation of third-party rights</li>
              <li>Injuries, damages, or disputes involving your property or guests</li>
              <li>Your booking website or booking process</li>
            </ul>

            {/* Section 11 */}
            <h2 id="dispute-resolution" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              11. Dispute Resolution
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">11.1 Host-Traveler Disputes</h3>
            <p className="mb-4">
              Disputes between hosts and travelers (regarding bookings, cancellations, refunds, property issues, etc.) are <strong>solely between the host and traveler</strong>. TrustYourHost is not involved in resolving these disputes.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">11.2 Disputes with TrustYourHost</h3>
            <p className="mb-4">
              For disputes with TrustYourHost (regarding subscriptions, account issues, listing rejections, etc.):
            </p>

            <h4 className="text-lg font-semibold mt-4 mb-2">Informal Resolution</h4>
            <p className="mb-4">
              Before filing a legal claim, you agree to contact us at <a href="mailto:hello@trustyourhost.com" className="text-blue-600 hover:underline">hello@trustyourhost.com</a> and attempt to resolve the dispute informally for at least 30 days.
            </p>

            <h4 className="text-lg font-semibold mt-4 mb-2">Binding Arbitration</h4>
            <p className="mb-4">
              If informal resolution fails, any dispute shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in Atlanta, Georgia. Each party shall bear its own costs.
            </p>

            <h4 className="text-lg font-semibold mt-4 mb-2">Class Action Waiver</h4>
            <p className="mb-4">
              You agree that disputes shall be resolved individually and you waive the right to participate in class actions, class arbitrations, or representative actions.
            </p>

            {/* Section 12 */}
            <h2 id="termination" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              12. Termination
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">12.1 Termination by You</h3>
            <p className="mb-4">
              You may terminate your account and cancel your subscription at any time from your host dashboard. Your listing will remain active until the end of your current billing period.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">12.2 Termination by TrustYourHost</h3>
            <p className="mb-4">
              We reserve the right to suspend or terminate your account immediately, without prior notice, if:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>You violate these Terms</li>
              <li>You engage in fraudulent or illegal activity</li>
              <li>Your payment method fails repeatedly</li>
              <li>We receive multiple complaints about your property or conduct</li>
              <li>We suspect your account poses a security risk</li>
              <li>We discontinue the Service (with 30 days' notice)</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">12.3 Effect of Termination</h3>
            <p className="mb-4">Upon termination:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Your property listing will be removed from the directory</li>
              <li>Your access to the Platform will be revoked</li>
              <li>You will not receive a refund for any unused subscription time</li>
              <li>Sections of these Terms that should survive (e.g., liability, indemnification) will continue to apply</li>
            </ul>

            {/* Section 13 */}
            <h2 id="changes" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              13. Changes to These Terms
            </h2>

            <p className="mb-4">
              We reserve the right to modify these Terms at any time. If we make material changes, we will:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Update the "Last Updated" date at the top of this page</li>
              <li>Notify you via email at least 30 days before the changes take effect</li>
              <li>Post a notice on the Platform</li>
            </ul>
            <p className="mb-4">
              Your continued use of the Platform after the changes take effect constitutes acceptance of the modified Terms. If you do not agree to the changes, you must cancel your subscription before they take effect.
            </p>

            {/* Section 14 */}
            <h2 id="governing-law" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              14. Governing Law & Jurisdiction
            </h2>

            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the United States and the State of Georgia, without regard to conflict of law principles.
            </p>
            <p className="mb-4">
              Subject to the arbitration clause in Section 11, any legal action or proceeding arising out of or related to these Terms shall be brought exclusively in the state or federal courts located in Fulton County, Atlanta, Georgia, and you consent to the jurisdiction of such courts.
            </p>

            {/* Section 15 */}
            <h2 id="contact" className="text-2xl font-bold mt-10 mb-4 scroll-mt-20">
              15. Contact Information
            </h2>

            <p className="mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>

            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg mb-6">
              <p className="font-semibold mb-2">TrustYourHost Support</p>
              <p className="mb-1"><strong>Email:</strong> <a href="mailto:hello@trustyourhost.com" className="text-blue-600 hover:underline">hello@trustyourhost.com</a></p>
              <p className="mb-0"><strong>Response Time:</strong> We aim to respond within 3 business days</p>
            </div>

            {/* Additional Sections */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              16. Miscellaneous
            </h2>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.1 Entire Agreement</h3>
            <p className="mb-4">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and TrustYourHost regarding your use of the Platform.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.2 Severability</h3>
            <p className="mb-4">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.3 Waiver</h3>
            <p className="mb-4">
              Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.4 Assignment</h3>
            <p className="mb-4">
              You may not assign or transfer these Terms or your account to any third party without our written consent. We may assign these Terms without restriction.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">16.5 No Agency</h3>
            <p className="mb-4">
              No agency, partnership, joint venture, or employment relationship is created between you and TrustYourHost as a result of these Terms or your use of the Platform.
            </p>

            {/* Footer Navigation */}
            <div className="mt-12 pt-6 border-t flex justify-between items-center">
              <Link href="/privacy" className="text-blue-600 hover:underline">
                View Privacy Policy →
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
