import { stripe } from "@/lib/stripe"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2, XCircle } from "lucide-react"

export default async function CheckoutResultPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <XCircle className="w-16 h-16 text-red-500" />
        <h1 className="text-2xl font-bold">Invalid Session</h1>
        <p className="text-gray-500">No session ID provided.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    )
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)

    if (session.status === "complete") {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Booking Confirmed!</h1>
            <p className="text-gray-500 max-w-md mx-auto">
              Thank you for your reservation. We've sent a confirmation email to {session.customer_details?.email}.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button>View My Trips</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Browse More Homes</Button>
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <XCircle className="w-16 h-16 text-yellow-500" />
        <h1 className="text-2xl font-bold">Payment Incomplete</h1>
        <p className="text-gray-500">The payment was not successful or is still pending.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    )
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <XCircle className="w-16 h-16 text-red-500" />
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-gray-500">Could not retrieve checkout session.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    )
  }
}
