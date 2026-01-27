import { ArticleLayout } from '@/components/content/article-layout';

export const metadata = {
  title: 'Getting Started Without a Direct Booking Site | TrustYourHost',
  description: 'How to list on TrustYourHost if you don\'t have a booking website yet. Options include our $500 setup service or DIY platforms starting at $29/month.',
};

export default function GettingStartedWithoutWebsite() {
  return (
    <ArticleLayout
      title="Getting Started Without a Direct Booking Site"
      description="Your options for creating a booking website and joining TrustYourHost"
      category="hosts"
      lastUpdated="January 26, 2026"
      readTime="3 min"
    >
      <h2>Do I Need a Website?</h2>
      <p>
        Yes. TrustYourHost connects travelers to hosts with direct booking websites. 
        We don't process bookings—we drive traffic to your site where guests book directly.
      </p>

      <h2>Why a Direct Booking Website Matters</h2>
      <ul>
        <li><strong>100% of revenue:</strong> No 15% commissions</li>
        <li><strong>Independence:</strong> You control your business</li>
        <li><strong>Direct relationships:</strong> Build repeat guest connections</li>
        <li><strong>Brand control:</strong> Your property, your way</li>
      </ul>

      <h2>Your Three Options</h2>

      <div className="space-y-6 my-8">
        <div className="border-2 border-orange-200 rounded-lg p-6 bg-orange-50">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Option 1: Done-For-You ($500)</h3>
              <p className="text-sm text-gray-700">Best for: Quick launch, non-technical hosts</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-orange-600">$500</div>
              <div className="text-xs text-gray-600">+ $15/mo hosting</div>
            </div>
          </div>
          
          <p className="mb-3">We partner with RemSimmons for professional setup:</p>
          <ul className="text-sm space-y-1 mb-4">
            <li>✓ Custom domain (yourproperty.com)</li>
            <li>✓ Booking calendar + payment processing</li>
            <li>✓ Mobile-responsive design</li>
            <li>✓ Ready in 5-7 days</li>
          </ul>
          
          <a 
            href="mailto:hello@remisimmons.com?subject=TrustYourHost%20Website%20Setup"
            className="inline-block px-4 py-2 bg-orange-600 text-white font-semibold rounded hover:bg-orange-700"
          >
            Get Started
          </a>
        </div>

        <div className="border-2 border-blue-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Option 2: DIY Platforms ($29-49/mo)</h3>
              <p className="text-sm text-gray-700">Best for: Tech-comfortable, budget-conscious hosts</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">$29-49</div>
              <div className="text-xs text-gray-600">per month</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <p className="font-semibold">Lodgify ($39/mo)</p>
              <p className="text-sm text-gray-600">Easy drag-and-drop builder, great for beginners</p>
            </div>
            <div>
              <p className="font-semibold">Hostfully ($49/mo)</p>
              <p className="text-sm text-gray-600">Advanced automation, multi-property features</p>
            </div>
            <div>
              <p className="font-semibold">Uplisting ($29/mo)</p>
              <p className="text-sm text-gray-600">Budget-friendly, core features</p>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-200 rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Option 3: Custom Developer ($2K-10K)</h3>
              <p className="text-sm text-gray-700">Best for: Unique features, specific branding needs</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-600">$2K+</div>
              <div className="text-xs text-gray-600">one-time</div>
            </div>
          </div>
          
          <p className="text-sm mb-3">Hire via Upwork, Fiverr, or local agencies for fully custom solutions.</p>
          <p className="text-sm text-gray-600">⚠️ Longest timeline (4-12 weeks) and requires ongoing maintenance</p>
        </div>
      </div>

      <h2>Decision Guide</h2>
      <div className="bg-gray-50 rounded-lg p-6 my-8">
        <div className="space-y-4">
          <div>
            <p className="font-semibold mb-2">Choose Done-For-You if:</p>
            <ul className="text-sm">
              <li>✓ You want to launch in 1-2 weeks</li>
              <li>✓ You're not tech-savvy</li>
              <li>✓ $500 upfront is manageable</li>
            </ul>
          </div>
          
          <div>
            <p className="font-semibold mb-2">Choose DIY Platform if:</p>
            <ul className="text-sm">
              <li>✓ You're comfortable with technology</li>
              <li>✓ You want lower upfront costs</li>
              <li>✓ You enjoy learning new tools</li>
            </ul>
          </div>
          
          <div>
            <p className="font-semibold mb-2">Choose Custom Developer if:</p>
            <ul className="text-sm">
              <li>✓ You need unique features</li>
              <li>✓ Brand identity is critical</li>
              <li>✓ Budget is $5K+</li>
            </ul>
          </div>
        </div>
      </div>

      <h2>Must-Have Features</h2>
      <p>Regardless of which option you choose, ensure your website has:</p>
      <ul>
        <li><strong>Availability calendar</strong> with real-time booking</li>
        <li><strong>Secure payment processing</strong> (Stripe recommended)</li>
        <li><strong>Mobile-responsive design</strong></li>
        <li><strong>High-quality photo galleries</strong></li>
        <li><strong>Clear pricing</strong> with all fees displayed</li>
        <li><strong>Contact forms</strong> for guest inquiries</li>
        <li><strong>SSL certificate</strong> (HTTPS security)</li>
      </ul>

      <h2>Timeline to Launch</h2>
      <div className="bg-blue-50 rounded-lg p-6 my-8">
        <h3 className="font-bold mb-4">Done-For-You Route: ~2 weeks</h3>
        <ol className="text-sm space-y-2">
          <li>Day 1: Contact RemSimmons, provide info</li>
          <li>Days 2-7: Website built</li>
          <li>Day 8-10: Review and finalize</li>
          <li>Day 11: Submit to TrustYourHost</li>
          <li>Day 12-13: Verification</li>
          <li>Day 14: Live and accepting bookings! 🎉</li>
        </ol>
      </div>

      <h2>Cost Comparison: First Year</h2>
      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Done-For-You</th>
              <th className="border border-gray-300 px-4 py-2 text-right">DIY</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Setup</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$500</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$0</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Monthly (12 months)</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$180</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$468</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">TrustYourHost (10 mo)</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$490</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$490</td>
            </tr>
            <tr className="font-bold">
              <td className="border border-gray-300 px-4 py-2">First Year Total</td>
              <td className="border border-gray-300 px-4 py-2 text-right text-green-600">$1,170</td>
              <td className="border border-gray-300 px-4 py-2 text-right text-green-600">$973</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>Ready to Get Started?</h2>
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-8 my-8">
        <h3 className="text-2xl font-bold mb-4">Choose Your Path</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <a 
            href="mailto:hello@remisimmons.com?subject=TrustYourHost%20Website%20Setup"
            className="block text-center px-6 py-4 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700"
          >
            Done-For-You Setup
          </a>
          <a 
            href="https://www.lodgify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center px-6 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          >
            Try Lodgify Free
          </a>
        </div>
        <p className="text-center text-sm text-gray-600 mt-4">
          Once ready, <a href="/submit-property" className="text-orange-600 font-semibold hover:underline">submit your property</a>
        </p>
      </div>

      <h2>Related Articles</h2>
      <ul>
        <li><a href="/help/for-hosts/how-it-works" className="text-orange-600 hover:underline">How TrustYourHost Works</a></li>
        <li><a href="/help/for-hosts/pricing-and-fees" className="text-orange-600 hover:underline">Pricing & Fees for Hosts</a></li>
      </ul>
    </ArticleLayout>
  );
}
