import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { ContactForm } from "@/components/support/contact-form"
import { Mail, MapPin, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - TrustYourHost",
  description: "Get in touch with the TrustYourHost team for support or inquiries.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-center font-serif text-3xl font-bold md:text-4xl">Contact Us</h1>

          <div className="grid gap-12 md:grid-cols-2 lg:gap-24">
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-semibold">We're here to help</h2>
                <p className="text-lg text-muted-foreground">
                  Have a question about a booking? Need help with your listing? Or just want to say hello? We'd love to
                  hear from you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">hello@trustyourhost.com</p>
                    <p className="text-sm text-muted-foreground">Response time: within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">404-301-0535</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-muted-foreground">
                      Atlanta, GA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
