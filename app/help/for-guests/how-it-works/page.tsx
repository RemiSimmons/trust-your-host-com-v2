import { ArticleLayout } from '@/components/content/article-layout';

export const metadata = {
  title: 'For Guests: How TrustYourHost Works | TrustYourHost',
  description: 'Discover how TrustYourHost helps travelers find verified vacation rentals with direct booking websites. No booking fees, authentic stays, and real host connections.',
};

export default function HowItWorksForGuests() {
  return (
    <ArticleLayout
      title="For Guests: How TrustYourHost Works"
      description="Your guide to finding and booking authentic vacation rentals through TrustYourHost"
      category="guests"
      lastUpdated="January 26, 2026"
      readTime="3 min"
    >
      <h2>What is TrustYourHost?</h2>
      <p>
        TrustYourHost is a curated directory of verified vacation rentals where every property 
        has direct booking. We're not Airbnb or VRBO—we're a discovery platform connecting 
        you to authentic hosts who book direct.
      </p>

      <p>
        <strong>Think of us as your trusted guide</strong> to quality vacation rentals. We verify 
        properties, then connect you directly to the host's website—no middleman, no platform fees.
      </p>

      <h2>How It Works: 4 Simple Steps</h2>

      <div className="space-y-6 my-8">
        <div className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-lg">
          <h3 className="font-bold text-lg mb-2">Step 1: Browse Our Directory</h3>
          <ul className="text-sm space-y-1">
            <li>• Search by location, dates, and preferences</li>
            <li>• Filter by amenities (pool, parking, pet-friendly)</li>
            <li>• View verified photos and property details</li>
            <li>• Compare multiple options</li>
          </ul>
          <p className="text-sm mt-2 text-gray-700">
            <strong>All properties are manually verified by our team.</strong>
          </p>
        </div>

        <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded-r-lg">
          <h3 className="font-bold text-lg mb-2">Step 2: Click "Visit Website"</h3>
          <p className="text-sm mb-2">
            When you find a property you like, we redirect you to the host's booking website where you'll see:
          </p>
          <ul className="text-sm space-y-1">
            <li>• Real-time availability calendar</li>
            <li>• Exact pricing with all fees</li>
            <li>• More photos and details</li>
            <li>• Host contact information</li>
          </ul>
        </div>

        <div className="border-l-4 border-orange-500 bg-orange-50 p-6 rounded-r-lg">
          <h3 className="font-bold text-lg mb-2">Step 3: Book Directly with Host</h3>
          <ul className="text-sm space-y-1">
            <li>• Complete booking on host's secure website</li>
            <li>• Pay directly (Stripe, PayPal, or similar)</li>
            <li>• Receive instant confirmation</li>
            <li>• Get host's direct contact info</li>
          </ul>
          <p className="text-sm mt-2 text-blue-600 font-semibold">
            💰 No TrustYourHost booking fees—ever!
          </p>
        </div>

        <div className="border-l-4 border-purple-500 bg-purple-50 p-6 rounded-r-lg">
          <h3 className="font-bold text-lg mb-2">Step 4: Enjoy Your Stay</h3>
          <ul className="text-sm space-y-1">
            <li>• Communicate directly with your host</li>
            <li>• Get personalized local recommendations</li>
            <li>• Build relationships for future stays</li>
            <li>• Leave reviews directly with host</li>
          </ul>
        </div>
      </div>

      <h2>Why Book Direct?</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <h3 className="font-bold mb-3">💵 Save Money</h3>
          <p className="text-sm mb-3">
            Platforms like Airbnb charge 10-15% guest fees. Direct booking = zero platform fees.
          </p>
          <p className="text-xs text-gray-600">
            Example: $1,500 booking on Airbnb = $1,650-1,725 total<br/>
            Same booking direct = $1,500 (save $150-225)
          </p>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="font-bold mb-3">🤝 Real Relationships</h3>
          <p className="text-sm">
            Talk directly to property owners who know their space intimately. Get local insider 
            tips, faster responses, and personal service.
          </p>
        </div>

        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6">
          <h3 className="font-bold mb-3">✅ Verified Quality</h3>
          <p className="text-sm">
            Every property is manually reviewed. We verify photos, host identity, property 
            location, and booking website functionality.
          </p>
        </div>

        <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
          <h3 className="font-bold mb-3">⚽ FIFA 2026 Ready</h3>
          <p className="text-sm">
            Properties near World Cup stadiums in all 11 U.S. host cities, with transport 
            guides and booking timelines.
          </p>
        </div>
      </div>

      <h2>What We Do (and Don't Do)</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div>
          <h3 className="font-semibold text-green-600 mb-3">✅ We Do:</h3>
          <ul className="text-sm space-y-2">
            <li>✓ Verify every property</li>
            <li>✓ Connect you to hosts</li>
            <li>✓ Feature FIFA 2026 properties</li>
            <li>✓ Organize by experience type</li>
            <li>✓ Provide detailed property info</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-red-600 mb-3">❌ We Don't:</h3>
          <ul className="text-sm space-y-2">
            <li>✗ Process bookings</li>
            <li>✗ Handle payments</li>
            <li>✗ Charge booking fees</li>
            <li>✗ Mediate disputes</li>
            <li>✗ Control pricing</li>
          </ul>
        </div>
      </div>

      <h2>Is It Safe?</h2>
      <p><strong>Yes.</strong> Here's why:</p>
      <ul>
        <li><strong>Manual verification:</strong> Every property reviewed by our team</li>
        <li><strong>Secure payments:</strong> Hosts use trusted processors (Stripe, PayPal)</li>
        <li><strong>Real businesses:</strong> Legitimate vacation rental operators</li>
        <li><strong>Credit card protection:</strong> Your bank offers fraud protection</li>
      </ul>

      <p className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
        <strong>⚠️ Red Flags to Avoid:</strong> Never book if host asks for wire transfer, 
        refuses to provide phone number, or pressures you to pay outside the website.
      </p>

      <p>
        <a href="/help/for-guests/safety-and-trust" className="text-blue-600 font-semibold hover:underline">
          Read our complete safety guide →
        </a>
      </p>

      <h2>What If I Have Issues?</h2>
      <p>
        Contact your host directly—you have their phone and email. Most hosts respond quickly 
        because it's their property and reputation. For payment disputes, contact your credit 
        card company about chargebacks.
      </p>

      <p className="text-sm text-gray-600 mt-2">
        <strong>Note:</strong> TrustYourHost doesn't mediate disputes because we're not part of 
        the booking transaction. We're a discovery platform, not a booking platform.
      </p>

      <h2>Direct Booking vs. Platforms</h2>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
              <th className="border border-gray-300 px-4 py-2">Direct Booking</th>
              <th className="border border-gray-300 px-4 py-2">Platforms</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Guest Fees</td>
              <td className="border border-gray-300 px-4 py-2 text-green-600">$0</td>
              <td className="border border-gray-300 px-4 py-2">10-15%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Communication</td>
              <td className="border border-gray-300 px-4 py-2">Direct email/phone</td>
              <td className="border border-gray-300 px-4 py-2">Platform messaging</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Host Type</td>
              <td className="border border-gray-300 px-4 py-2">Personal/authentic</td>
              <td className="border border-gray-300 px-4 py-2">Mixed/impersonal</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-semibold">Pricing</td>
              <td className="border border-gray-300 px-4 py-2 text-green-600">Often lower</td>
              <td className="border border-gray-300 px-4 py-2">Higher (fees added)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Ready to Explore?</h2>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 my-8">
        <h3 className="text-2xl font-bold mb-4">Start Your Search</h3>
        <p className="text-gray-700 mb-6">
          Browse verified vacation rentals, save on booking fees, and connect directly with hosts.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/search"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          >
            Search All Properties
          </a>
          <a 
            href="/fifa-2026"
            className="inline-block px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50"
          >
            FIFA 2026 Properties
          </a>
        </div>
      </div>

      <h2>Related Articles</h2>
      <ul>
        <li><a href="/help/for-guests/booking-direct" className="text-blue-600 hover:underline">Booking Direct: What to Expect</a></li>
        <li><a href="/help/for-guests/safety-and-trust" className="text-blue-600 hover:underline">Safety & Trust: How We Vet Hosts</a></li>
      </ul>
    </ArticleLayout>
  );
}
