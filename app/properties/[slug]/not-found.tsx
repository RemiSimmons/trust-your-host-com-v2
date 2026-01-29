import Link from "next/link"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🏠</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the property you're looking for. It may have been removed or the link might be incorrect.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/search">
            <Button className="gap-2 bg-accent hover:bg-accent/90">
              <Search className="h-4 w-4" />
              Search Properties
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
