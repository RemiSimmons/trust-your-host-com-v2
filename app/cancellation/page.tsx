import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cancellation Policy - TrustYourHost",
  description: "Understand cancellation policies when booking direct.",
}

export default function CancellationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-12">
            <h1 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Cancellation Policies</h1>
            <p className="text-lg text-muted-foreground">
              Understanding cancellations when booking direct
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-12">
            {/* Important Notice */}
            <section className="bg-yellow-50 dark:bg-yellow-950/20 border-l-4 border-yellow-500 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">IMPORTANT: TRUSTYOURHOST DOESN'T HANDLE CANCELLATIONS</h2>
              <p className="mb-2">
                TrustYourHost is a directory that connects travelers to hosts with direct booking websites. We do not process bookings, payments, or cancellations.
              </p>
              <p className="font-semibold">
                <strong>Each host sets their own cancellation policy on their booking website.</strong>
              </p>
              <p className="mt-2 text-sm">
                When you book a property through a host's website, you agree to THEIR cancellation terms—not TrustYourHost's. This page explains common cancellation policy types you'll encounter.
              </p>
            </section>

            {/* Common Cancellation Policy Types */}
            <section>
              <h2 className="text-2xl font-bold mb-6">COMMON CANCELLATION POLICY TYPES</h2>
              <p className="mb-6">
                Hosts typically use one of these three cancellation policies:
              </p>

              <div className="space-y-8">
                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">FLEXIBLE</h3>
                  <p className="text-muted-foreground mb-4">Best for tentative plans</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Full refund if cancelled 24-48 hours before check-in</li>
                    <li>50% refund if cancelled within 24-48 hours</li>
                    <li>No refund after check-in or no-show</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    <strong>Who this is for:</strong> Travelers with uncertain plans or booking far in advance
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Risk level:</strong> Low for travelers, higher for hosts
                  </p>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">MODERATE</h3>
                  <p className="text-muted-foreground mb-4">Balanced protection</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Full refund if cancelled 5-7 days before check-in</li>
                    <li>50% refund if cancelled 2-5 days before check-in</li>
                    <li>No refund if cancelled within 48 hours or after check-in</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    <strong>Who this is for:</strong> Most bookings where dates are fairly certain
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Risk level:</strong> Moderate for both parties
                  </p>
                </div>

                <div className="border rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-2">STRICT</h3>
                  <p className="text-muted-foreground mb-4">Firm commitments</p>
                  <ul className="list-disc pl-6 space-y-2 mb-4">
                    <li>Full refund if cancelled 14-30 days before check-in</li>
                    <li>50% refund if cancelled 7-14 days before check-in</li>
                    <li>No refund if cancelled within 7 days or after check-in</li>
                  </ul>
                  <p className="text-sm text-muted-foreground">
                    <strong>Who this is for:</strong> High-demand properties, peak seasons (like FIFA 2026)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Risk level:</strong> Higher for travelers, lower for hosts
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-border" />

            {/* Important Notes */}
            <section>
              <h2 className="text-2xl font-bold mb-4">IMPORTANT NOTES ABOUT CANCELLATIONS</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Where to Find the Policy</h3>
                  <p className="mb-2">
                    Every host's booking website should clearly display their cancellation policy:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>On the property listing page</li>
                    <li>During the booking checkout process</li>
                    <li>In your booking confirmation email</li>
                  </ul>
                  <p className="mt-2 font-semibold">
                    <strong>Always read and understand the policy before booking.</strong>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">How to Cancel a Booking</h3>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Contact the host directly (email or phone from your confirmation)</li>
                    <li>Request cancellation in writing</li>
                    <li>Follow the host's cancellation process</li>
                    <li>Confirm you received cancellation confirmation</li>
                    <li>Check your bank statement for refund (may take 5-10 business days)</li>
                  </ol>
                  <p className="mt-2 font-semibold text-red-600 dark:text-red-400">
                    <strong>TrustYourHost cannot cancel bookings for you.</strong> You must work directly with the host.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Refund Processing</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Refunds are issued by the host through their payment processor</li>
                    <li>Typical processing time: 5-10 business days</li>
                    <li>Refund appears as credit to your original payment method</li>
                    <li>Contact your host if refund doesn't appear within stated timeframe</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-border" />

            {/* Host Cancellations */}
            <section>
              <h2 className="text-2xl font-bold mb-4">HOST CANCELLATIONS</h2>
              <p className="mb-4">
                If a host cancels your confirmed reservation:
              </p>

              <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 mb-4">
                <h3 className="font-semibold mb-2">What should happen:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You receive a full refund (100%)</li>
                  <li>Refund processed immediately</li>
                  <li>Host may face penalties (loss of listing, poor reviews)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2">What you should do:</h3>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Request written confirmation of cancellation from host</li>
                  <li>Request immediate full refund</li>
                  <li>If host doesn't refund, dispute charge with your credit card company</li>
                  <li>Report the cancellation to TrustYourHost so we can investigate</li>
                </ol>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                <strong>Note:</strong> Hosts who cancel confirmed bookings may be removed from TrustYourHost for reliability concerns.
              </p>
            </section>

            <hr className="border-border" />

            {/* Extenuating Circumstances */}
            <section>
              <h2 className="text-2xl font-bold mb-4">EXTENUATING CIRCUMSTANCES</h2>
              <p className="mb-4">
                Some hosts may waive cancellation penalties for events beyond your control, such as:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Natural disasters (hurricanes, earthquakes, wildfires)</li>
                <li>Government-mandated travel restrictions</li>
                <li>Medical emergencies (with documentation)</li>
                <li>Death in immediate family</li>
                <li>Military deployment</li>
                <li>Jury duty</li>
              </ul>
              <p className="font-semibold mb-4">
                <strong>This is at the host's discretion, not guaranteed.</strong>
              </p>

              <div>
                <h3 className="text-xl font-semibold mb-2">How to Request Exception</h3>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Contact host immediately when circumstance arises</li>
                  <li>Provide documentation (medical note, news articles, government orders)</li>
                  <li>Explain situation clearly and respectfully</li>
                  <li>Request cancellation policy exception</li>
                  <li>Get host's decision in writing</li>
                </ol>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                <strong>Travel insurance may cover these situations.</strong> Consider purchasing travel insurance for expensive trips or bookings made far in advance.
              </p>
            </section>

            <hr className="border-border" />

            {/* Non-Refundable Fees */}
            <section>
              <h2 className="text-2xl font-bold mb-4">NON-REFUNDABLE FEES</h2>
              <p className="mb-4">
                Even with full refunds, these fees are typically non-refundable:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cleaning fees</li>
                <li>Service fees charged by host's booking platform</li>
                <li>Payment processing fees</li>
                <li>Pet fees (if already paid)</li>
                <li>Special event fees</li>
              </ul>
              <p className="mt-2 text-sm text-muted-foreground">
                Check the specific policy on each host's booking website.
              </p>
            </section>

            <hr className="border-border" />

            {/* Travel Insurance */}
            <section>
              <h2 className="text-2xl font-bold mb-4">TRAVEL INSURANCE RECOMMENDATIONS</h2>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Consider travel insurance if:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>You're booking 3+ months in advance</li>
                  <li>The property has a strict cancellation policy</li>
                  <li>Your trip costs are significant ($2,000+)</li>
                  <li>You have concerns about weather, health, or work conflicts</li>
                  <li>You're traveling internationally</li>
                  <li>You're attending a major event (like FIFA 2026)</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Popular travel insurance providers:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Allianz Travel Insurance</li>
                  <li>World Nomads</li>
                  <li>Travel Guard</li>
                  <li>Travelex Insurance</li>
                </ul>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>Cost:</strong> Typically 5-10% of total trip cost
                </p>
                <p>
                  <strong>What it covers:</strong> Trip cancellation, trip interruption, medical emergencies, lost baggage (policies vary—read carefully)
                </p>
                <p>
                  <strong>What it usually doesn't cover:</strong> Change of mind, fear of travel, your team not advancing in tournament
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Modifying Reservation */}
            <section>
              <h2 className="text-2xl font-bold mb-4">MODIFYING YOUR RESERVATION</h2>
              <p className="mb-4">
                Some hosts allow reservation modifications instead of full cancellation:
              </p>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Possible modifications:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Change check-in/check-out dates</li>
                  <li>Reduce number of guests</li>
                  <li>Shorten stay length</li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Contact your host to ask about:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Their modification policy</li>
                  <li>Any fees for changes</li>
                  <li>Availability for new dates</li>
                  <li>Whether change is easier than cancel/rebook</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">
                <strong>This is entirely up to the host.</strong> Some are flexible, others enforce strict policies.
              </p>
            </section>

            <hr className="border-border" />

            {/* Partial Stays */}
            <section>
              <h2 className="text-2xl font-bold mb-4">PARTIAL STAYS</h2>
              <p className="mb-4">
                <strong>If you check in but leave early:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Most policies: No refund for unused nights</li>
                <li>Some hosts: May offer partial refund if they can re-book</li>
                <li>Your recourse: Limited unless property has major issues</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                <strong>Document issues immediately</strong> if you're leaving due to property problems. Photos and written communication with host are essential for any refund request.
              </p>
            </section>

            <hr className="border-border" />

            {/* Dispute Resolution */}
            <section>
              <h2 className="text-2xl font-bold mb-4">DISPUTE RESOLUTION</h2>
              <p className="mb-4">
                <strong>If you and the host can't agree on cancellation:</strong>
              </p>

              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Your Options</h3>
                <ol className="list-decimal pl-6 space-y-1">
                  <li><strong>Negotiate with host:</strong> Try to find middle ground</li>
                  <li><strong>Credit card chargeback:</strong> If property was misrepresented or host won't honor their policy</li>
                  <li><strong>Small claims court:</strong> For larger disputes (check local jurisdiction)</li>
                  <li><strong>Report to TrustYourHost:</strong> We'll investigate if host violated stated policies</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">When to Dispute a Charge</h3>
                <p className="mb-2">Valid reasons for credit card chargeback:</p>
                <ul className="list-disc pl-6 space-y-1 mb-2">
                  <li>Host won't honor their stated cancellation policy</li>
                  <li>Property doesn't exist (fraud)</li>
                  <li>Property severely misrepresented</li>
                  <li>Host charged wrong amount</li>
                  <li>Host refuses to refund after canceling on you</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  <strong>Timeframe:</strong> Contact your credit card company within 60 days of charge
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Documentation needed:</strong> Booking confirmation, cancellation policy screenshot, communication with host, evidence of issue
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Questions to Ask */}
            <section>
              <h2 className="text-2xl font-bold mb-4">QUESTIONS TO ASK BEFORE BOOKING</h2>
              <p className="mb-4">
                Protect yourself by confirming these details:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>What is the exact cancellation policy?</li>
                <li>Are any fees non-refundable?</li>
                <li>How far in advance must I cancel for full refund?</li>
                <li>Can I modify dates instead of cancelling?</li>
                <li>Do you offer refunds for extenuating circumstances?</li>
                <li>How long do refunds take to process?</li>
                <li>What happens if YOU (the host) need to cancel?</li>
              </ol>
              <p className="mt-4 font-semibold">
                <strong>Get answers in writing</strong> (email) before finalizing your booking.
              </p>
            </section>

            <hr className="border-border" />

            {/* Tips */}
            <section>
              <h2 className="text-2xl font-bold mb-4">TIPS FOR AVOIDING CANCELLATION ISSUES</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Before Booking:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Only book dates you're confident about</li>
                    <li>Choose flexible policy if plans are uncertain</li>
                    <li>Read the ENTIRE cancellation policy</li>
                    <li>Save screenshot of policy for your records</li>
                    <li>Consider travel insurance for expensive bookings</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">After Booking:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Save all confirmation emails</li>
                    <li>Note cancellation deadlines in your calendar</li>
                    <li>Set reminder 2 weeks before cancellation deadline</li>
                    <li>Keep host's contact information handy</li>
                    <li>Document any property issues immediately</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">If You Need to Cancel:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Do it as early as possible</li>
                    <li>Follow the host's stated process</li>
                    <li>Request written confirmation</li>
                    <li>Be polite and professional</li>
                    <li>Save all communication</li>
                  </ul>
                </div>
              </div>
            </section>

            <hr className="border-border" />

            {/* Remember */}
            <section>
              <h2 className="text-2xl font-bold mb-4">REMEMBER</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>TrustYourHost doesn't process bookings or cancellations</li>
                <li>Each host sets their own cancellation policy</li>
                <li>You agree to the host's terms when you book</li>
                <li>Refunds come from the host, not TrustYourHost</li>
                <li>Read and understand policies before booking</li>
                <li>Document everything</li>
                <li>Travel insurance can provide additional protection</li>
              </ul>

              <div className="mt-6 space-y-2">
                <p>
                  <strong>Questions about a specific property's cancellation policy?</strong>
                </p>
                <p className="text-muted-foreground">
                  Contact the host directly through their booking website before booking.
                </p>
                <p className="mt-4">
                  <strong>Concerns about a host not honoring their stated policy?</strong>
                </p>
                <p>
                  Report it to TrustYourHost at <a href="mailto:safety@trustyourhost.com" className="text-blue-600 hover:underline">safety@trustyourhost.com</a>
                </p>
              </div>
            </section>

            <hr className="border-border" />

            {/* Related Articles */}
            <section>
              <h2 className="text-2xl font-bold mb-4">RELATED ARTICLES</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <Link href="/how-it-works" className="text-blue-600 hover:underline">
                    How TrustYourHost Works
                  </Link>
                </li>
                <li>
                  <Link href="/help/for-guests/booking-direct" className="text-blue-600 hover:underline">
                    Booking Direct: What to Expect
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="text-blue-600 hover:underline">
                    Trust & Safety
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-blue-600 hover:underline">
                    Travel Insurance Guide
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
