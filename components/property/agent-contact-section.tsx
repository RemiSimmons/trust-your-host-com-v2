"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/types"

interface AgentContactSectionProps {
  property: Property
}

export function AgentContactSection({ property }: AgentContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    agreeToTerms: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "", agreeToTerms: false })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Agent Info & Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Agent Profile */}
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={property.host.photo || "/placeholder.svg"}
                alt={property.host.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">{property.host.name}</h3>
              <p className="text-sm text-gray-600">Real estate agent</p>
            </div>
          </div>

          {/* Property Description */}
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {typeof property.description === 'string' 
                ? property.description 
                : (property.description?.full || property.description?.short || '')}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">Contact {property.host.name}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F7C] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F7C] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2C5F7C] focus:border-transparent"
                  required
                />
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="mt-1 h-4 w-4 text-[#2C5F7C] focus:ring-[#2C5F7C] border-gray-300 rounded"
                  required
                />
                <label htmlFor="agree" className="text-sm text-gray-600">
                  By providing {property.host.name} with your contact information, you agree to our{" "}
                  <a href="/privacy" className="text-[#2C5F7C] hover:underline">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                Send Message
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}


