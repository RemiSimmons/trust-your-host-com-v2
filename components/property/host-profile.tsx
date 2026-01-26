import Image from "next/image"
import { ShieldCheck, Star, Clock } from "lucide-react"
import type { Property } from "@/lib/types"
import { ContactHostButton } from "@/components/property/contact-host-button"

interface HostProfileProps {
  host: Property["host"]
  propertyId: string
}

export function HostProfile({ host, propertyId }: HostProfileProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
          <Image src={host.photo || "/placeholder.svg"} alt={host.name} fill className="object-cover" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-bold text-primary">Hosted by {host.name}</h2>
          <p className="text-gray-500 text-sm">Joined in 2021</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 md:gap-12">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-gray-700" />
          <span className="font-medium text-gray-900">{host.rating} Rating</span>
        </div>

        {host.verified && (
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-900">Identity Verified</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-700" />
          <span className="font-medium text-gray-900">Responds {host.responseTime}</span>
        </div>
      </div>

      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700">
          Hi! I'm {host.name}. I love hosting travelers and sharing my beautiful property with guests from around the
          world. I'm passionate about providing a comfortable and memorable stay. Feel free to reach out if you have any
          questions!
        </p>
      </div>

      <ContactHostButton propertyId={propertyId} />

      <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg text-xs text-gray-600 mt-4">
        <ShieldCheck className="h-5 w-5 text-accent shrink-0" />
        <p>To protect your payment, never transfer money or communicate outside of the TrustYourHost website or app.</p>
      </div>
    </div>
  )
}
