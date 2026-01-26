import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"

export const metadata: Metadata = {
  title: "Community - TrustYourHost",
  description: "Join the TrustYourHost community.",
}

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 font-serif text-3xl font-bold md:text-4xl">Community</h1>
          <p className="text-xl text-muted-foreground">Connect with other hosts and guests. Forum launching soon.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
