import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import Link from "next/link"
import { generateMetadata } from "@/lib/seo/metadata"

export const metadata: Metadata = generateMetadata({
  title: "Trust & Safety",
  description: "Learn how TrustYourHost keeps our community safe. Manual property verification, secure direct booking, and transparent host reviews.",
  url: "/safety",
})

export default function SafetyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h1 className="mb-4 font-serif text-3xl font-bold md:text-5xl">Trust & Safety</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your Safety, Our Priority
            </p>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              TrustYourHost connects hosts and travelers through verified properties and secure direct booking. Here's how we protect everyone in our community.
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-12">
            {/* Manual Property Verification */}
            <section>
              <h2 className="text-2xl font-bold mb-4">MANUAL PROPERTY VERIFICATION</h2>
              <p className="mb-4">
                Every property is manually reviewed before going live. We verify:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Property exists:</strong> Address confirmation via Google Maps and Street View</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Photos are authentic:</strong> No stock images or stolen content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Booking website works:</strong> Functional calendar, payment system, and contact forms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Host is legitimate:</strong> Valid contact information and responsive communication</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                Approval time: 24-48 hours. We prioritize thorough review over speed.
              </p>
            </section>

            <hr className="border-border" />

            {/* Secure Direct Booking */}
            <section>
              <h2 className="text-2xl font-bold mb-4">SECURE DIRECT BOOKING</h2>
              <p className="mb-4">
                All payments go through trusted processors on the host's booking website:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Industry-standard processors:</strong> Stripe, Square, PayPal (same as Amazon, Uber)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>SSL encryption:</strong> All booking websites use HTTPS for secure data transfer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>PCI compliance:</strong> Payment data is encrypted and never stored by hosts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Credit card protection:</strong> Your bank provides fraud protection and chargeback rights</span>
                </li>
              </ul>
              <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 my-6">
                <p className="font-semibold text-red-900 dark:text-red-200 mb-2">🚨 NEVER PAY OUTSIDE THE BOOKING WEBSITE</p>
                <p className="text-red-800 dark:text-red-300">
                  Legitimate hosts never ask for wire transfers, cash, or payment through personal accounts. If anyone requests this, report them immediately.
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Host Standards & Accountability */}
            <section>
              <h2 className="text-2xl font-bold mb-4">HOST STANDARDS & ACCOUNTABILITY</h2>
              <p className="mb-4">
                We maintain quality standards and hold hosts accountable:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Verified contact info:</strong> All hosts provide working email and phone numbers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Response expectations:</strong> "Quick Response" badge for hosts who reply within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Accurate listings:</strong> Properties must match photos and descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Removal policy:</strong> Hosts with repeated complaints or violations are delisted</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                For hosts: Maintaining high standards protects your reputation and builds trust with travelers.
              </p>
            </section>

            <hr className="border-border" />

            {/* Traveler Protections */}
            <section>
              <h2 className="text-2xl font-bold mb-4">TRAVELER PROTECTIONS</h2>
              <p className="mb-4">
                Multiple layers of protection for your booking:
              </p>
              <ul className="list-none space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Direct communication:</strong> Talk directly with property owners before booking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Transparent policies:</strong> Cancellation terms, house rules, and fees clearly stated</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Credit card rights:</strong> Chargeback protection if property is misrepresented</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Report concerns:</strong> Easy reporting system for issues or suspicious activity</span>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground italic">
                Document everything: Save screenshots of listings, confirmations, and conversations for your protection.
              </p>
            </section>

            <hr className="border-border" />

            {/* Warning Signs */}
            <section>
              <h2 className="text-2xl font-bold mb-4">🚨 WARNING SIGNS</h2>
              <p className="mb-4">
                Watch for these red flags when booking. If you see any of these, DO NOT BOOK and report it to us immediately.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">PAYMENT RED FLAGS</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Asks for wire transfer or Western Union</li>
                    <li>Requests payment outside booking website</li>
                    <li>Wants cash payment on arrival</li>
                    <li>Uses personal PayPal/Venmo instead of business account</li>
                    <li>No SSL certificate (no HTTPS/padlock in browser)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">COMMUNICATION RED FLAGS</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Won't provide phone number</li>
                    <li>Refuses video call to show property</li>
                    <li>Pressures immediate booking ("only available for 1 hour!")</li>
                    <li>Story doesn't make sense or keeps changing</li>
                    <li>Poor grammar suggesting overseas scam</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">PROPERTY RED FLAGS</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Photos look like stock images</li>
                    <li>Price too good to be true</li>
                    <li>Can't find property on Google Maps</li>
                    <li>No reviews anywhere online</li>
                    <li>Listing details are vague or incomplete</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">WEBSITE RED FLAGS</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Website looks unprofessional or broken</li>
                    <li>Multiple spelling/grammar errors</li>
                    <li>No contact information visible</li>
                    <li>Can't complete booking (fake form)</li>
                    <li>Redirects to suspicious payment pages</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-border" />

            {/* What TrustYourHost Does Not Do */}
            <section>
              <h2 className="text-2xl font-bold mb-4">WHAT TRUSTYOURHOST DOES NOT DO</h2>
              <p className="mb-4">
                It's important to understand our role. We're a directory, not a booking platform:
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">WE DO NOT:</h3>
                  <ul className="list-none space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Process bookings or payments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Handle guest-host disputes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Manage cancellations or refunds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Provide customer service for stays</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Store your payment information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">✗</span>
                      <span>Control pricing or policies</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">WE DO:</h3>
                  <ul className="list-none space-y-1">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Verify properties before listing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Connect you to verified hosts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Monitor property quality standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Remove problematic listings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Provide reporting tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Investigate reported concerns</span>
                    </li>
                  </ul>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground italic">
                Think of us like Yelp or TripAdvisor: We help you discover quality properties, but the transaction happens directly between you and the host.
              </p>
            </section>

            <hr className="border-border" />

            {/* If Something Goes Wrong */}
            <section>
              <h2 className="text-2xl font-bold mb-4">IF SOMETHING GOES WRONG</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">FOR TRAVELERS</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Property Not as Described</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Take photos immediately upon arrival</li>
                        <li>Contact host directly to resolve</li>
                        <li>Document all communication</li>
                        <li>If unresolved, contact your credit card company</li>
                        <li>Report to TrustYourHost for investigation</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Can't Access Property</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Call/text host using provided number</li>
                        <li>Try email if phone doesn't work</li>
                        <li>Wait 30 minutes for response</li>
                        <li>If no response, find alternative accommodation</li>
                        <li>Dispute charge with credit card company</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Safety Concerns</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Leave immediately if you feel unsafe</li>
                        <li>Contact local authorities if needed</li>
                        <li>Document everything with photos/videos</li>
                        <li>Dispute charge with your bank</li>
                        <li>Report to TrustYourHost immediately</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">FOR HOSTS</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Problematic Guest</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Document issues with photos/videos</li>
                        <li>Communicate clearly with guest</li>
                        <li>Refer to your stated house rules</li>
                        <li>Ask guest to leave if rules violated</li>
                        <li>Contact local authorities for serious issues</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Payment Dispute</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Keep all booking confirmations</li>
                        <li>Save communication history</li>
                        <li>Provide evidence to payment processor</li>
                        <li>Be responsive to chargeback inquiries</li>
                        <li>Consider travel insurance requirement</li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Property Damage</h4>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Take before/after photos always</li>
                        <li>Document damage immediately</li>
                        <li>Contact guest about charges</li>
                        <li>File claim with your insurance</li>
                        <li>Use security deposit per your policy</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-border" />

            {/* Report a Safety Concern */}
            <section>
              <h2 className="text-2xl font-bold mb-4">REPORT A SAFETY CONCERN</h2>
              <p className="mb-4">
                Seen something suspicious? Property not as described? Host asking for payment outside the system? Let us know immediately.
              </p>
              <p className="mb-2">
                <strong>Email:</strong> <a href="mailto:safety@trustyourhost.com" className="text-blue-600 hover:underline">safety@trustyourhost.com</a>
              </p>
              <p className="text-sm text-muted-foreground">
                We review all reports within 24 hours and take action when needed. Your identity will be kept confidential.
              </p>
            </section>

            <hr className="border-border" />

            {/* In an Emergency */}
            <section>
              <h2 className="text-2xl font-bold mb-4">IN AN EMERGENCY</h2>
              <p className="mb-4">
                If you're in immediate danger or need urgent assistance, contact local emergency services first:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li><strong>USA:</strong> 911 (Police, Fire, Medical)</li>
                <li><strong>Canada:</strong> 911 (Police, Fire, Medical)</li>
                <li><strong>Mexico:</strong> 911 (Police, Fire, Medical)</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                TrustYourHost is not an emergency service. Always contact local authorities for urgent safety concerns.
              </p>
            </section>

            <hr className="border-border" />

            {/* Learn More */}
            <section>
              <h2 className="text-2xl font-bold mb-4">LEARN MORE</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Link href="/help/for-guests/safety-and-trust" className="text-blue-600 hover:underline">
                    Guest Safety Guide
                  </Link>
                </li>
                <li>
                  <Link href="/help/for-hosts/how-it-works" className="text-blue-600 hover:underline">
                    Host Verification Process
                  </Link>
                </li>
                <li>
                  <Link href="/help/for-guests/booking-direct" className="text-blue-600 hover:underline">
                    Booking Direct Safety
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
