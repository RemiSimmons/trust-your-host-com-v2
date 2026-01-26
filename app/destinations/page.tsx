import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Destinations - TrustYourHost",
  description: "Explore our top destinations.",
}

export default function DestinationsPage() {
  const destinations = ["New York", "London", "Paris", "Tokyo", "San Francisco", "Barcelona", "Rome", "Berlin"]

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 font-serif text-3xl font-bold md:text-4xl">All Destinations</h1>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {destinations.map((city) => (
              <Link
                key={city}
                href={`/search?q=${city}`}
                className="group flex h-32 items-center justify-center rounded-lg bg-muted p-6 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <span className="text-xl font-semibold">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
