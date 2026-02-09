import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import { ExperienceCategories } from "@/components/home/experience-categories"

export const metadata: Metadata = {
  title: "Experiences - Browse by Category | TrustYourHost",
  description: "Explore unique stays by experience type: Mountain Retreats, Beachfront Paradise, Urban Adventures, and more. Find your perfect getaway.",
}

export const revalidate = 3600

export default function ExperiencesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-primary/95 via-primary/90 to-accent/80">
      <NavBar />
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 text-balance drop-shadow-lg">
              Discover Your Perfect Experience
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto text-balance drop-shadow-md leading-relaxed">
              From mountain retreats to beachfront paradise, find the perfect setting for your next adventure. 
              Explore curated stays tailored to your travel style.
            </p>
          </div>
        </div>
        <ExperienceCategories />
      </main>
      <Footer />
    </div>
  )
}
