import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"

export const metadata: Metadata = {
  title: "Guides - TrustYourHost",
  description: "Travel guides and tips.",
}

export default function GuidesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Travel Guides</h1>
          <p className="text-xl text-muted-foreground">In-depth guides for your next adventure. Coming soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
