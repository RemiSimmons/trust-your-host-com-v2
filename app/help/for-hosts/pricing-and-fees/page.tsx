import { ArticleLayout } from '@/components/content/article-layout';

export const metadata = {
  title: 'Pricing & Fees for Hosts on TrustYourHost',
  description: 'Simple, transparent pricing for vacation rental hosts: $49/month for your first property with 60-day free trial. No booking commissions, no hidden fees.',
};

export default function PricingAndFees() {
  return (
    <ArticleLayout
      title="Pricing & Fees for Hosts on TrustYourHost"
      description="Understanding the cost of listing your vacation rental on our directory"
      category="hosts"
      lastUpdated="January 26, 2026"
      readTime="4 min"
    >
      <h2>Simple, Transparent Pricing</h2>
      <p>
        TrustYourHost uses a simple monthly subscription model with no booking commissions, 
        no percentage fees, and no surprises. You pay a flat monthly fee to be listed in 
        our directory—that's it.
      </p>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 my-8">
        <h3 className="text-2xl font-bold mb-4">Pricing at a Glance</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-blue-200">
            <div>
              <div className="font-bold text-lg">First Property</div>
              <div className="text-sm text-gray-600">Includes 60-day free trial</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-600">$49</div>
              <div className="text-sm text-gray-600">/month</div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <div className="font-bold text-lg">Each Additional Property</div>
              <div className="text-sm text-gray-600">Volume discount pricing</div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-orange-600">$39</div>
              <div className="text-sm text-gray-600">/month</div>
            </div>
          </div>
        </div>
      </div>

      <h2>What's Included in Your Subscription</h2>
      <p>
        Your monthly subscription includes everything you need to get discovered by travelers:
      </p>
      <ul>
        <li><strong>Directory listing:</strong> Your property featured in search results</li>
        <li><strong>City page placement:</strong> Automatic inclusion on relevant city pages</li>
        <li><strong>Experience categorization:</strong> Listed under relevant themes (beachfront, urban, mountain, etc.)</li>
        <li><strong>FIFA 2026 placement:</strong> Featured on FIFA city pages (if applicable)</li>
        <li><strong>Property analytics:</strong> Track views, clicks, and traffic sources</li>
        <li><strong>Host dashboard:</strong> Manage listings and view performance</li>
        <li><strong>Photo galleries:</strong> Unlimited photos per property</li>
        <li><strong>Listing updates:</strong> Edit details anytime at no extra cost</li>
        <li><strong>Email support:</strong> Help from our team when you need it</li>
      </ul>

      <h2>60-Day Free Trial</h2>
      <p>
        Every first property gets a <strong>60-day free trial</strong>. Here's how it works:
      </p>
      <ul>
        <li><strong>No credit card required</strong> to submit your property</li>
        <li><strong>Trial starts upon approval</strong> (not when you submit)</li>
        <li><strong>Full access</strong> to all features during trial</li>
        <li><strong>Email reminder</strong> 7 days before trial ends</li>
        <li><strong>Set up billing anytime</strong> during trial (via secure Stripe checkout)</li>
        <li><strong>Cancel anytime</strong> with no questions asked</li>
      </ul>

      <p>
        We offer this free trial because we're confident you'll see value in the qualified 
        traffic we send to your website. No risk, no pressure—just 60 days to see if 
        TrustYourHost works for your property.
      </p>

      <h2>Multi-Property Pricing</h2>
      <p>
        If you manage multiple vacation rentals, you'll benefit from volume pricing:
      </p>

      <div className="bg-gray-50 rounded-lg p-6 my-8">
        <h3 className="font-bold text-lg mb-4">Pricing Examples</h3>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center pb-3 border-b">
            <span><strong>1 property:</strong></span>
            <span className="font-bold">$49/month</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b">
            <span><strong>2 properties:</strong> $49 + $39</span>
            <span className="font-bold">$88/month</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b">
            <span><strong>3 properties:</strong> $49 + $39 + $39</span>
            <span className="font-bold">$127/month</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b">
            <span><strong>5 properties:</strong> $49 + (4 × $39)</span>
            <span className="font-bold">$205/month</span>
          </div>
          <div className="flex justify-between items-center">
            <span><strong>10 properties:</strong> $49 + (9 × $39)</span>
            <span className="font-bold">$400/month</span>
          </div>
        </div>
      </div>

      <p>
        <strong>Important:</strong> Only your first property gets the 60-day free trial. 
        Additional properties are billed immediately at the $39/month rate.
      </p>

      <h2>What We DON'T Charge</h2>
      <p>
        Unlike traditional booking platforms, TrustYourHost never charges:
      </p>
      <ul>
        <li><strong>❌ Booking commissions</strong> (we don't take a percentage of bookings)</li>
        <li><strong>❌ Setup fees</strong> (no upfront cost to list)</li>
        <li><strong>❌ Transaction fees</strong> (we never see your bookings or payments)</li>
        <li><strong>❌ Payment processing fees</strong> (you use your own processor)</li>
        <li><strong>❌ Cancellation fees</strong> (cancel anytime without penalty)</li>
        <li><strong>❌ Per-photo fees</strong> (upload as many photos as you want)</li>
        <li><strong>❌ Guest service fees</strong> (travelers pay zero to use TrustYourHost)</li>
        <li><strong>❌ Hidden fees</strong> (what you see is what you pay)</li>
      </ul>

      <h2>Cost Comparison: TrustYourHost vs. Booking Platforms</h2>
      <p>
        Let's compare the real cost of listing on TrustYourHost versus traditional platforms:
      </p>

      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Scenario</th>
              <th className="border border-gray-300 px-4 py-2 text-right">TrustYourHost</th>
              <th className="border border-gray-300 px-4 py-2 text-right">Airbnb (15%)</th>
              <th className="border border-gray-300 px-4 py-2 text-right">VRBO (15%)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">1 booking at $1,000</td>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">$49</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$150</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$150</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">3 bookings at $1,500 each</td>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">$49</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$675</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$675</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">10 bookings at $2,000 each</td>
              <td className="border border-gray-300 px-4 py-2 text-right font-semibold">$49</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$3,000</td>
              <td className="border border-gray-300 px-4 py-2 text-right">$3,000</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-2"><strong>Annual (20 bookings avg)</strong></td>
              <td className="border border-gray-300 px-4 py-2 text-right font-bold text-green-600">$588</td>
              <td className="border border-gray-300 px-4 py-2 text-right font-bold text-red-600">$6,000</td>
              <td className="border border-gray-300 px-4 py-2 text-right font-bold text-red-600">$6,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="font-semibold text-lg text-gray-900">
        Over one year, a host with 20 bookings averaging $2,000 each saves $5,412 
        with TrustYourHost compared to Airbnb or VRBO.
      </p>

      <h2>Payment & Billing</h2>

      <h3>How Payment Works</h3>
      <ul>
        <li>All payments processed securely through Stripe</li>
        <li>Major credit cards accepted (Visa, Mastercard, Amex, Discover)</li>
        <li>Automatic monthly billing (set it and forget it)</li>
        <li>Update payment method anytime in your dashboard</li>
        <li>Email receipt sent for every payment</li>
      </ul>

      <h3>Billing Cycle</h3>
      <ul>
        <li><strong>First property:</strong> Billed on day 61 (after 60-day trial)</li>
        <li><strong>Additional properties:</strong> Billed immediately upon approval</li>
        <li><strong>Renewal:</strong> Automatic monthly on your billing date</li>
        <li><strong>Prorated:</strong> If you cancel mid-month, no refund for partial month</li>
      </ul>

      <h3>Failed Payments</h3>
      <p>
        If your payment fails, here's what happens:
      </p>
      <ol>
        <li><strong>Day 1:</strong> Email notification of failed payment</li>
        <li><strong>Day 3:</strong> Second retry attempt</li>
        <li><strong>Day 7:</strong> Final retry attempt + warning email</li>
        <li><strong>Day 10:</strong> Property listing paused (not deleted)</li>
        <li><strong>After payment:</strong> Property reactivated within 24 hours</li>
      </ol>

      <h2>Cancellation Policy</h2>
      <p>
        You can cancel your subscription anytime with no penalties or fees:
      </p>
      <ul>
        <li>Cancel directly from your host dashboard</li>
        <li>No need to contact support (though we're here if you have questions)</li>
        <li>Access continues until end of current billing period</li>
        <li>No refunds for partial months</li>
        <li>Your property is removed from directory after billing period ends</li>
        <li>You keep your booking website and all guest relationships</li>
        <li>Reactivate anytime (no setup fees)</li>
      </ul>

      <p>
        <strong>Important:</strong> When you cancel, only your TrustYourHost listing ends. 
        Your booking website, guest relationships, and business continue exactly as before. 
        We're not a platform you depend on—we're just a marketing channel.
      </p>

      <h2>Tax & Invoicing</h2>
      <ul>
        <li>All prices shown are in USD</li>
        <li>Sales tax may apply depending on your location</li>
        <li>Invoices emailed automatically for each payment</li>
        <li>Annual receipts available for tax purposes</li>
        <li>Business expense (consult your tax professional)</li>
      </ul>

      <h2>Frequently Asked Questions</h2>

      <h3>When does my 60-day trial start?</h3>
      <p>
        Your trial starts the day we approve your property, not when you submit it. 
        For example, if you submit on Monday and we approve on Wednesday, your trial 
        runs from Wednesday to 60 days later.
      </p>

      <h3>Can I get a refund if I'm not satisfied?</h3>
      <p>
        We don't offer refunds for partial months, but you can cancel anytime and 
        you won't be charged again. This is why we offer a 60-day free trial—so 
        you can try TrustYourHost risk-free before paying anything.
      </p>

      <h3>What if I don't get any bookings from TrustYourHost?</h3>
      <p>
        We drive traffic to your website and track clicks in your dashboard. However, 
        we can't guarantee bookings because factors like your pricing, availability, 
        property appeal, and booking website experience all affect conversion. If 
        you're not seeing results, our team can review your listing and offer 
        optimization suggestions.
      </p>

      <h3>Can I pause my subscription temporarily?</h3>
      <p>
        Not currently. You can cancel and reactivate anytime without setup fees, 
        but there's no "pause" option. If you know you'll be back, it's often 
        easier to keep the subscription active since it's only $49/month.
      </p>

      <h3>Do I need separate subscriptions for each property?</h3>
      <p>
        No! You manage all properties under one account. Your first property is 
        $49/month, and each additional property is $39/month, all billed together 
        on one invoice.
      </p>

      <h3>What happens if I add a property mid-month?</h3>
      <p>
        Additional properties are billed immediately at $39/month, and the billing 
        cycle aligns with your primary property. You'll pay the full $39 for the 
        first month (no proration) and then $39/month going forward.
      </p>

      <h2>Ready to Start Your Free Trial?</h2>

      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
        <p className="font-semibold text-lg mb-2">List Your Property - 60 Days Free</p>
        <p className="text-gray-700 mb-4">
          No credit card required. Cancel anytime. Keep 100% of your booking revenue.
        </p>
        <a 
          href="/submit-property" 
          className="inline-block px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700"
        >
          Submit Your Property
        </a>
      </div>

      <h2>Related Articles</h2>
      <ul>
        <li><a href="/help/for-hosts/how-it-works" className="text-orange-600 hover:underline">How TrustYourHost Works</a></li>
        <li><a href="/help/for-hosts/getting-started-without-website" className="text-orange-600 hover:underline">Getting Started Without a Booking Website</a></li>
      </ul>
    </ArticleLayout>
  );
}
