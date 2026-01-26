import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, UserCheck, Home, MessageSquare } from "lucide-react"

export const metadata: Metadata = {
  title: "Trust & Safety - TrustYourHost",
  description: "Learn how we keep our community safe.",
}

export default function SafetyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="mb-4 font-serif text-3xl font-bold md:text-5xl">Trust & Safety</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your safety is our top priority. We've built tools and policies to help you stay safe and book with
              confidence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-16">
            <Card>
              <CardHeader>
                <ShieldCheck className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure Payments</CardTitle>
                <CardDescription>Always pay through TrustYourHost</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Never send money outside of the TrustYourHost platform. If anyone asks you to pay off-site, report it
                  to us immediately. Our secure payment system protects your money until you check in.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <UserCheck className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Verified Profiles</CardTitle>
                <CardDescription>Know who you're hosting or staying with</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  We require verified information from both hosts and guests, including phone numbers and email
                  addresses. Hosts can also require guests to provide government ID before booking.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Home className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Property Standards</CardTitle>
                <CardDescription>Quality you can trust</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  We encourage hosts to accurately describe their properties and provide honest photos. Read reviews
                  from past guests to get a sense of what to expect.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Secure Messaging</CardTitle>
                <CardDescription>Communicate safely</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Use our messaging system to communicate with your host or guest. This keeps your contact info private
                  and gives us a record of your conversation in case of any disputes.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">In an emergency?</h2>
            <p className="text-muted-foreground mb-6">
              If you're in an unsafe situation, contact local emergency services immediately.
            </p>
            <p className="text-sm text-muted-foreground">
              TrustYourHost Safety Line: +1 (555) 999-8888 (Available 24/7)
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
