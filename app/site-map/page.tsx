import type { Metadata } from "next"
import { NavBar } from "@/components/navigation/nav-bar"
import { Footer } from "@/components/navigation/footer"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Sitemap - TrustYourHost",
  description: "Site navigation.",
}

export default function SitemapPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 font-serif text-3xl font-bold md:text-4xl">Sitemap</h1>
          <ul className="space-y-2 text-lg">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:underline">
                Search
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:underline">
                Sign Up
              </Link>
            </li>
            <li>
              <Link href="/host" className="hover:underline">
                Host Dashboard
              </Link>
            </li>
            <li>
              <Link href="/become-host" className="hover:underline">
                Become a Host
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/help" className="hover:underline">
                Help Center
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  )
}
