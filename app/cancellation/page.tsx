import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Cancellation Policy - TrustYourHost",
  description: "Understand our cancellation policies for guests and hosts.",
}

export default function CancellationPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="mb-8 font-serif text-3xl font-bold md:text-4xl">Cancellation Policies</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            We understand that plans change. Our cancellation policies are designed to be fair to both guests and hosts.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Flexible</CardTitle>
                <CardDescription>Best for tentative plans</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2 text-sm">
                  <li>Full refund 1 day prior to arrival</li>
                  <li>Non-refundable if cancelled on arrival day</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Moderate</CardTitle>
                <CardDescription>Balanced protection</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2 text-sm">
                  <li>Full refund 5 days prior to arrival</li>
                  <li>50% refund if cancelled within 5 days</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strict</CardTitle>
                <CardDescription>Firm commitments</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2 text-sm">
                  <li>Full refund for 48 hours after booking</li>
                  <li>50% refund 7 days prior to arrival</li>
                  <li>No refund if cancelled within 7 days</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Host Cancellations</h2>
              <p className="text-muted-foreground">
                If a host cancels a reservation, the guest will receive a full refund. Hosts who cancel may be subject
                to penalties, including fees and blocked dates on their calendar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Extenuating Circumstances</h2>
              <p className="text-muted-foreground">
                We may be able to give a refund or waive the cancellation penalties if you have to cancel because of an
                unexpected circumstance that’s out of your control, such as natural disasters or government-mandated
                travel restrictions.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
