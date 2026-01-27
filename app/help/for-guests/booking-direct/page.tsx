import { ArticleLayout } from '@/components/content/article-layout';

export const metadata = {
  title: 'Booking Direct with Hosts: What to Expect | TrustYourHost',
  description: 'A complete guide to booking vacation rentals directly through host websites. Learn about the process, benefits, and what makes direct booking different.',
};

export default function BookingDirect() {
  return (
    <ArticleLayout
      title="Booking Direct with Hosts: What to Expect"
      description="Understanding the direct booking experience from discovery to check-out"
      category="guests"
      lastUpdated="January 26, 2026"
      readTime="3 min"
    >
      <h2>What is Direct Booking?</h2>
      <p>
        Direct booking means reserving through the host's own website, not through platforms 
        like Airbnb or VRBO. You work directly with the property owner—no middleman.
      </p>

      <h2>The Direct Booking Process</h2>

      <div className="space-y-4 my-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <h3 className="font-bold mb-2">1. Discover on TrustYourHost</h3>
          <p className="text-sm">Browse verified properties, filter by your preferences, compare options</p>
        </div>

        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <h3 className="font-bold mb-2">2. Visit Host's Website</h3>
          <p className="text-sm">Click "Visit Website" to see real-time availability, exact pricing, and complete details</p>
        </div>

        <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
          <h3 className="font-bold mb-2">3. Review Everything</h3>
          <p className="text-sm">Check cancellation policy, house rules, amenities, and total cost before booking</p>
        </div>

        <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
          <h3 className="font-bold mb-2">4. Book Securely</h3>
          <p className="text-sm">Complete reservation on host's website using secure payment (Stripe, PayPal)</p>
        </div>

        <div className="bg-pink-50 border-l-4 border-pink-500 p-4">
          <h3 className="font-bold mb-2">5. Communicate Directly</h3>
          <p className="text-sm">Get check-in instructions, ask questions, receive local tips—all direct from your host</p>
        </div>
      </div>

      <h2>Key Differences from Platform Booking</h2>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="border-2 border-green-200 bg-green-50 rounded-lg p-6">
          <h3 className="font-bold text-green-900 mb-3">✅ Direct Booking Benefits</h3>
          <ul className="text-sm space-y-2">
            <li><strong>No guest fees</strong> (save 10-15%)</li>
            <li><strong>Direct communication</strong> (email, phone, text)</li>
            <li><strong>Personal service</strong> (real relationships)</li>
            <li><strong>Often better prices</strong> (no commissions)</li>
            <li><strong>More flexibility</strong> (negotiate terms)</li>
          </ul>
        </div>

        <div className="border-2 border-gray-200 bg-gray-50 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-3">📋 What's Different</h3>
          <ul className="text-sm space-y-2">
            <li>Each host's website looks unique</li>
            <li>Cancellation policies vary by host</li>
            <li>You handle issues with host directly</li>
            <li>Payment goes to host (not platform)</li>
            <li>No standardized review system</li>
          </ul>
        </div>
      </div>

      <h2>Payment & Security</h2>
      
      <h3>How Payment Works</h3>
      <p>You pay the host through their website using:</p>
      <ul>
        <li><strong>Credit/debit cards</strong> via Stripe, Square, or PayPal</li>
        <li><strong>SSL encryption</strong> (look for padlock in browser)</li>
        <li><strong>PCI-compliant systems</strong> (same as Amazon, Uber)</li>
      </ul>

      <h3>Is It Safe?</h3>
      <p><strong>Yes, when booking TrustYourHost properties:</strong></p>
      <ul>
        <li>✓ We verify every host and property</li>
        <li>✓ Hosts use secure, trusted payment processors</li>
        <li>✓ Your credit card offers fraud protection</li>
        <li>✓ These are legitimate businesses</li>
      </ul>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
        <p className="font-semibold text-red-900 mb-3">🚨 Never Book If You See:</p>
        <ul className="space-y-1 text-sm text-red-800">
          <li>❌ Requests for wire transfer, Western Union, or cash</li>
          <li>❌ Payment outside the booking website</li>
          <li>❌ Too good to be true pricing</li>
          <li>❌ Host won't provide phone number</li>
          <li>❌ No SSL certificate (no padlock icon)</li>
          <li>❌ Pressure to book immediately</li>
        </ul>
      </div>

      <h2>Cancellations</h2>
      <p>
        Each host sets their own policy. Common types:
      </p>

      <div className="space-y-4 my-8">
        <div className="border-2 border-green-200 bg-green-50 rounded p-4">
          <p className="font-bold text-green-900">Flexible</p>
          <p className="text-sm text-green-800">Full refund up to 24-48 hours before check-in</p>
        </div>

        <div className="border-2 border-yellow-200 bg-yellow-50 rounded p-4">
          <p className="font-bold text-yellow-900">Moderate</p>
          <p className="text-sm text-yellow-800">Full refund up to 5-7 days before check-in</p>
        </div>

        <div className="border-2 border-red-200 bg-red-50 rounded p-4">
          <p className="font-bold text-red-900">Strict</p>
          <p className="text-sm text-red-800">Full refund up to 14-30 days before check-in</p>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        <strong>Pro tip:</strong> Consider travel insurance for expensive trips or if booking far 
        in advance (covers illness, job loss, emergencies).
      </p>

      <h2>Tips for Success</h2>

      <div className="bg-gray-50 rounded-lg p-6 my-8">
        <h3 className="font-bold mb-4">Before Booking:</h3>
        <ul className="text-sm space-y-2">
          <li>✓ Read full description and house rules</li>
          <li>✓ Check cancellation policy carefully</li>
          <li>✓ Message host with questions</li>
          <li>✓ Screenshot property details</li>
          <li>✓ Verify total cost including all fees</li>
        </ul>

        <h3 className="font-bold mt-6 mb-4">During Your Stay:</h3>
        <ul className="text-sm space-y-2">
          <li>✓ Report issues immediately (not after checkout)</li>
          <li>✓ Follow house rules respectfully</li>
          <li>✓ Ask host for local recommendations</li>
          <li>✓ Take photos of any pre-existing damage</li>
        </ul>
      </div>

      <h2>What If Something Goes Wrong?</h2>

      <h3>Property Issues</h3>
      <p className="text-sm">
        Contact host immediately. Document with photos. Most hosts will resolve issues quickly 
        or offer refunds.
      </p>

      <h3>Host Unresponsive</h3>
      <p className="text-sm">
        Try multiple methods (email, phone, text). If no response and can't access property, 
        contact your credit card company about disputing the charge.
      </p>

      <h3>When to Dispute a Charge</h3>
      <ul className="text-sm">
        <li>• Property doesn't exist (fraud)</li>
        <li>• Unable to access and host won't respond</li>
        <li>• Severely misrepresented or unsafe</li>
        <li>• Host won't honor agreed refund</li>
      </ul>

      <h2>Benefits of Repeat Bookings</h2>
      <p>Once you find a great property:</p>
      <ul>
        <li><strong>Return guest discounts</strong> (5-15% off)</li>
        <li><strong>Flexible terms</strong> (easier to negotiate)</li>
        <li><strong>Preferred status</strong> (first dibs on dates)</li>
        <li><strong>Personal relationship</strong> (host remembers you)</li>
        <li><strong>Trust</strong> (you know what you're getting)</li>
      </ul>

      <h2>Ready to Book Direct?</h2>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 my-8">
        <h3 className="text-2xl font-bold mb-4">Start Browsing</h3>
        <p className="text-gray-700 mb-6">
          Discover verified vacation rentals and start saving on booking fees while building 
          real relationships with hosts.
        </p>
        <div className="flex flex-wrap gap-4">
          <a 
            href="/search"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          >
            Browse Properties
          </a>
          <a 
            href="/fifa-2026"
            className="inline-block px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50"
          >
            FIFA 2026 Stays
          </a>
        </div>
      </div>

      <h2>Related Articles</h2>
      <ul>
        <li><a href="/help/for-guests/how-it-works" className="text-blue-600 hover:underline">How TrustYourHost Works</a></li>
        <li><a href="/help/for-guests/safety-and-trust" className="text-blue-600 hover:underline">Safety & Trust Guide</a></li>
      </ul>
    </ArticleLayout>
  );
}
