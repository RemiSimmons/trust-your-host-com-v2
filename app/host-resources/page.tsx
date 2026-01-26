import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"

export const metadata: Metadata = {
  title: "Host Resources - TrustYourHost",
  description: "Tips and resources for hosts.",
}

export default function HostResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Host Resources</h1>
          <p className="text-xl text-muted-foreground">Tips, tricks, and guides to help you become a Superhost.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
