import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const metadata: Metadata = {
  title: "Help Center - TrustYourHost",
  description: "Find answers to frequently asked questions about TrustYourHost.",
}

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1">
        <div className="bg-muted py-16 md:py-24 text-center">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 font-serif text-3xl font-bold md:text-5xl">How can we help?</h1>
            <div className="mx-auto max-w-xl relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search for articles..." className="pl-10 h-12 text-lg bg-background" />
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold mb-6">For Guests</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I book a place?</AccordionTrigger>
                  <AccordionContent>
                    To book a place, search for your destination, select your dates, and click "Reserve". You'll be
                    prompted to enter your payment details to confirm the booking.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is the cancellation policy?</AccordionTrigger>
                  <AccordionContent>
                    Cancellation policies vary by host. You can see the specific policy for each property on its listing
                    page before you book.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I contact the host?</AccordionTrigger>
                  <AccordionContent>
                    You can contact the host by clicking the "Contact Host" button on any property listing page. Once
                    you have a booking, you can also message them from your Trips page.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>When am I charged?</AccordionTrigger>
                  <AccordionContent>
                    You are charged immediately upon confirming your reservation. For some long-term stays, payment
                    schedules may differ.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">For Hosts</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="host-1">
                  <AccordionTrigger>How do I list my property?</AccordionTrigger>
                  <AccordionContent>
                    Click "List Your Property" in the navigation menu, sign up or log in, and follow the step-by-step guide
                    to create your listing. You can also visit "How It Works" to learn more about hosting first.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="host-2">
                  <AccordionTrigger>How do I get paid?</AccordionTrigger>
                  <AccordionContent>
                    We send payouts directly to your connected bank account via Stripe. Payouts are typically released
                    24 hours after your guest checks in.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="host-3">
                  <AccordionTrigger>Is there insurance for hosts?</AccordionTrigger>
                  <AccordionContent>
                    Yes, every booking is covered by our Host Guarantee which provides protection for property damage.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="host-4">
                  <AccordionTrigger>Can I set my own house rules?</AccordionTrigger>
                  <AccordionContent>
                    Absolutely. You can set rules regarding pets, parties, smoking, and quiet hours which guests must
                    agree to before booking.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
