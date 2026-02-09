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

export const revalidate = 3600

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
          {/* Quick Links to Help Articles */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Popular Help Topics</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <a href="/help/for-hosts/how-it-works" className="block p-6 bg-orange-50 hover:bg-orange-100 rounded-lg border-2 border-orange-200 transition">
                <h3 className="font-bold text-lg mb-2 text-orange-900">For Hosts: How It Works</h3>
                <p className="text-sm text-gray-700">Learn how TrustYourHost drives traffic to your booking website</p>
              </a>
              
              <a href="/help/for-guests/how-it-works" className="block p-6 bg-blue-50 hover:bg-blue-100 rounded-lg border-2 border-blue-200 transition">
                <h3 className="font-bold text-lg mb-2 text-blue-900">For Guests: How It Works</h3>
                <p className="text-sm text-gray-700">Discover how to book directly with verified hosts</p>
              </a>
              
              <a href="/fifa-2026/guides/planning-your-trip" className="block p-6 bg-green-50 hover:bg-green-100 rounded-lg border-2 border-green-200 transition">
                <h3 className="font-bold text-lg mb-2 text-green-900">FIFA 2026 Guide</h3>
                <p className="text-sm text-gray-700">Plan your World Cup trip with our complete guide</p>
              </a>
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">For Guests</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-gray-900 hover:text-orange-600">Do I book on TrustYourHost or directly with the host?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base">
                    You book directly on the host's website. TrustYourHost is a directory that connects you to verified hosts. 
                    When you find a property you like, click "Visit Website" and complete your booking on their secure site. 
                    <a href="/help/for-guests/how-it-works" className="text-blue-600 hover:underline ml-1">Learn more →</a>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-gray-900 hover:text-orange-600">Are there service or booking fees for guests?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base">
                    No! TrustYourHost is completely free for travelers. Unlike Airbnb or VRBO that charge 10-15% guest fees, 
                    you pay zero platform fees when booking direct. You only pay what the host charges on their website.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-gray-900 hover:text-orange-600">How do I find stays near FIFA 2026 stadiums and fan zones?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base">
                    Visit our <a href="/fifa-2026" className="text-green-600 hover:underline">FIFA 2026 section</a> to browse 
                    properties in all 11 U.S. host cities. Filter by distance to stadium and view transportation guides for each venue. 
                    <a href="/fifa-2026/guides/planning-your-trip" className="text-green-600 hover:underline ml-1">Planning guide →</a>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-gray-900 hover:text-orange-600">How does TrustYourHost verify properties?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base">
                    Every property is manually reviewed before listing. We verify host identity, property photos, location, and 
                    booking website functionality. This ensures you're booking with legitimate hosts. 
                    <a href="/help/for-guests/safety-and-trust" className="text-blue-600 hover:underline ml-1">See our verification process →</a>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">For Hosts</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="host-1">
                  <AccordionTrigger className="text-gray-900 hover:text-orange-600">Can I keep using Airbnb, Vrbo, or other platforms if I list on TrustYourHost?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base">
                    Absolutely! TrustYourHost complements your existing channels. We drive traffic to your direct booking website, 
                    helping you reduce OTA dependency while keeping those channels open. Many hosts use us alongside other platforms. 
                    <a href="/help/for-hosts/how-it-works" className="text-orange-600 hover:underline ml-1">Learn more →</a>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="host-2">
                  <AccordionTrigger className="text-gray-900 hover:text-orange-600">How much does it cost to list?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base">
                    $49/month for your first property with a 60-day free trial. Additional properties are $39/month each. 
                    No booking commissions, no percentage fees, no hidden costs. Cancel anytime. 
                    <a href="/help/for-hosts/pricing-and-fees" className="text-orange-600 hover:underline ml-1">View full pricing →</a>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="host-3">
                  <AccordionTrigger className="text-gray-900 hover:text-orange-600">Do I need my own booking website?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base">
                    Yes. TrustYourHost connects travelers to your direct booking website. We offer done-for-you setup ($500) 
                    or you can use DIY platforms like Lodgify ($39/mo) or Hostfully ($49/mo). 
                    <a href="/help/for-hosts/getting-started-without-website" className="text-orange-600 hover:underline ml-1">Explore options →</a>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="host-4">
                  <AccordionTrigger className="text-gray-900 hover:text-orange-600">How does TrustYourHost help with FIFA World Cup 2026 stays?</AccordionTrigger>
                  <AccordionContent className="text-gray-700 text-base">
                    Properties in FIFA host cities get automatic featured placement on our FIFA 2026 pages, exposure to 
                    international travelers, and prominence in "near stadium" searches. This is a once-in-a-generation 
                    opportunity for hosts in the 11 U.S. host cities.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-8 border-2 border-orange-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Still have questions?</h2>
            <p className="text-gray-700 mb-6">
              Browse our detailed help articles or contact our support team for personalized assistance.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/help/for-hosts/how-it-works" className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition">
                For Hosts
              </a>
              <a href="/help/for-guests/how-it-works" className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                For Guests
              </a>
              <a href="/contact" className="inline-block px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
