import { ArticleLayout } from '@/components/content/article-layout';

export const metadata = {
  title: 'Safety & Trust: How We Vet Hosts | TrustYourHost',
  description: 'Learn about TrustYourHost\'s comprehensive host and property verification process. Every listing is manually reviewed to ensure safety and authenticity.',
};

export default function SafetyAndTrust() {
  return (
    <ArticleLayout
      title="Safety & Trust: How We Vet Hosts"
      description="Understanding our verification process and what makes TrustYourHost properties trustworthy"
      category="guests"
      lastUpdated="January 26, 2026"
      readTime="3 min"
    >
      <h2>Our Commitment</h2>
      <p>
        <strong>Every property on TrustYourHost is manually verified</strong> before going live. 
        No algorithms, no automation—a real person reviews every submission to ensure quality and safety.
      </p>

      <h2>Our 6-Step Verification Process</h2>

      <div className="space-y-6 my-8">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">Step 1: Initial Screening</h3>
          <p className="text-sm mb-2">We check for obvious red flags:</p>
          <ul className="text-sm space-y-1">
            <li>• Does the booking website exist and load?</li>
            <li>• Do photos look authentic (not stock images)?</li>
            <li>• Is contact information valid?</li>
            <li>• Does the address appear real?</li>
          </ul>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">Step 2: Host Identity</h3>
          <p className="text-sm mb-2">We verify the host is real:</p>
          <ul className="text-sm space-y-1">
            <li>• Email and phone verification</li>
            <li>• Response time test</li>
            <li>• Website domain registration check</li>
            <li>• Cross-reference with online presence</li>
          </ul>
        </div>

        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">Step 3: Property Verification</h3>
          <p className="text-sm mb-2">We confirm the property exists and matches:</p>
          <ul className="text-sm space-y-1">
            <li>• Reverse image search for stolen photos</li>
            <li>• Google Maps and Street View confirmation</li>
            <li>• Property details accuracy check</li>
            <li>• Location and neighborhood consistency</li>
          </ul>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">Step 4: Website Security</h3>
          <p className="text-sm mb-2">We test the booking website:</p>
          <ul className="text-sm space-y-1">
            <li>• Calendar functionality works</li>
            <li>• Secure payment processor (Stripe, PayPal)</li>
            <li>• SSL certificate present (HTTPS)</li>
            <li>• Mobile responsive design</li>
            <li>• No suspicious payment requests</li>
          </ul>
        </div>

        <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">Step 5: Business Legitimacy</h3>
          <p className="text-sm mb-2">We look for evidence of real business:</p>
          <ul className="text-sm space-y-1">
            <li>• Online reviews or social media presence</li>
            <li>• Domain age (not registered yesterday)</li>
            <li>• Professional presentation quality</li>
            <li>• Consistent branding across platforms</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">Step 6: Human Review</h3>
          <p className="text-sm mb-2">Final decision by our team:</p>
          <ul className="text-sm space-y-1">
            <li>• Overall impression and trustworthiness</li>
            <li>• Risk assessment</li>
            <li>• Quality standard check</li>
            <li>• <strong>If there's any doubt, we don't approve</strong></li>
          </ul>
        </div>
      </div>

      <p className="bg-blue-50 border-l-4 border-blue-500 p-4">
        <strong>Timeline:</strong> Most properties verified within 24-48 hours
      </p>

      <h2>What Verification Guarantees</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="border-2 border-green-200 bg-green-50 rounded-lg p-6">
          <h3 className="font-bold text-green-900 mb-3">✅ We CAN Verify:</h3>
          <ul className="text-sm space-y-2">
            <li>✓ Property exists at listed address</li>
            <li>✓ Host is real with valid contact</li>
            <li>✓ Photos appear authentic</li>
            <li>✓ Booking website functions securely</li>
            <li>✓ Legitimate vacation rental business</li>
          </ul>
        </div>

        <div className="border-2 border-yellow-200 bg-yellow-50 rounded-lg p-6">
          <h3 className="font-bold text-yellow-900 mb-3">⚠️ We CAN'T Verify:</h3>
          <ul className="text-sm space-y-2">
            <li>✗ Interior condition/cleanliness</li>
            <li>✗ Host's personality</li>
            <li>✗ Your personal satisfaction</li>
            <li>✗ Neighborhood noise levels</li>
            <li>✗ How host handles disputes</li>
          </ul>
        </div>
      </div>

      <p className="text-center italic text-gray-700">
        <strong>Verification confirms legitimacy, not perfection.</strong>
      </p>

      <h2>Trust Badges</h2>

      <div className="space-y-4 my-8">
        <div className="flex items-start gap-4 border-2 border-gray-200 rounded-lg p-4">
          <span className="text-3xl">✓</span>
          <div>
            <p className="font-bold">Verified Property</p>
            <p className="text-sm text-gray-600">
              Passed our full verification process. Every property has this badge.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 border-2 border-gray-200 rounded-lg p-4">
          <span className="text-3xl">⚡</span>
          <div>
            <p className="font-bold">Quick Response Host</p>
            <p className="text-sm text-gray-600">
              Typically responds within 24 hours. Tested during verification.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 border-2 border-gray-200 rounded-lg p-4">
          <span className="text-3xl">🏆</span>
          <div>
            <p className="font-bold">FIFA 2026 Featured</p>
            <p className="text-sm text-gray-600">
              Located in World Cup host city with featured placement.
            </p>
          </div>
        </div>
      </div>

      <h2>How You Can Stay Safe</h2>

      <h3>Before Booking:</h3>
      <ul className="text-sm">
        <li>✓ Look for Verified badge on all listings</li>
        <li>✓ Check for HTTPS (padlock) on booking website</li>
        <li>✓ Verify payment through Stripe/PayPal/Square</li>
        <li>✓ Message host first to gauge responsiveness</li>
        <li>✓ Google the property for additional reviews</li>
      </ul>

      <h3>When Booking:</h3>
      <ul className="text-sm">
        <li>✓ Use credit card (never debit, wire, or cash)</li>
        <li>✓ Screenshot everything (description, pricing, policies)</li>
        <li>✓ Read cancellation policy thoroughly</li>
        <li>✓ Save confirmation email immediately</li>
      </ul>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
        <p className="font-semibold text-red-900 mb-3">🚨 Never Book If You See:</p>
        <ul className="space-y-2 text-sm text-red-800">
          <li>❌ Requests for wire transfer, Western Union, Venmo, cash</li>
          <li>❌ Payment outside the booking website</li>
          <li>❌ Too good to be true pricing</li>
          <li>❌ Host won't provide phone number or refuses to talk</li>
          <li>❌ No SSL certificate (no padlock in browser)</li>
          <li>❌ Pressure to book immediately ("only 1 hour left!")</li>
          <li>❌ Multiple grammar/spelling errors everywhere</li>
          <li>❌ Photos look like stock images</li>
        </ul>
      </div>

      <h2>If You Suspect a Scam</h2>

      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 my-8">
        <h3 className="font-bold mb-3">Take These Steps:</h3>
        <ol className="text-sm space-y-2">
          <li><strong>1. Stop immediately</strong> - Don't proceed with booking</li>
          <li><strong>2. Don't send money</strong> - Especially outside booking website</li>
          <li><strong>3. Screenshot everything</strong> - Document what you saw</li>
          <li><strong>4. Report to us</strong> - Email hello@trustyourhost.com</li>
          <li><strong>5. If you paid:</strong> Contact credit card company for chargeback</li>
        </ol>
      </div>

      <h2>Our Ongoing Monitoring</h2>
      <p>Verification isn't one-time. We continuously:</p>
      <ul>
        <li>Listen to guest feedback and reports</li>
        <li>Track host response times</li>
        <li>Monitor booking website functionality</li>
        <li>Spot-check properties periodically</li>
        <li>Remove hosts who violate standards</li>
      </ul>

      <h2>Why We're Different</h2>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Aspect</th>
              <th className="border border-gray-300 px-4 py-2">TrustYourHost</th>
              <th className="border border-gray-300 px-4 py-2">Typical Platforms</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Verification</td>
              <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">Manual, every property</td>
              <td className="border border-gray-300 px-4 py-2">Mostly automated</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Review Time</td>
              <td className="border border-gray-300 px-4 py-2">24-48 hours</td>
              <td className="border border-gray-300 px-4 py-2">Instant (auto-approved)</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Quality Control</td>
              <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">High bar, selective</td>
              <td className="border border-gray-300 px-4 py-2">Volume-focused</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Fake Listings</td>
              <td className="border border-gray-300 px-4 py-2 text-green-600 font-semibold">Extremely rare</td>
              <td className="border border-gray-300 px-4 py-2">Common problem</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Report a Concern</h2>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 my-8 text-center">
        <h3 className="text-2xl font-bold mb-4">See Something Suspicious?</h3>
        <p className="text-gray-700 mb-4">
          If you encounter anything concerning, report it immediately.
        </p>
        <p className="font-semibold mb-2">
          Email: <a href="mailto:hello@trustyourhost.com" className="text-blue-600 hover:underline">hello@trustyourhost.com</a>
        </p>
        <p className="text-sm text-gray-600">
          We review all reports within 24 hours and take action when needed.
        </p>
      </div>

      <h2>Related Articles</h2>
      <ul>
        <li><a href="/help/for-guests/how-it-works" className="text-blue-600 hover:underline">How TrustYourHost Works</a></li>
        <li><a href="/help/for-guests/booking-direct" className="text-blue-600 hover:underline">Booking Direct: Complete Guide</a></li>
      </ul>
    </ArticleLayout>
  );
}
