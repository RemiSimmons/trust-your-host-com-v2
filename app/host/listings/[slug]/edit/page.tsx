import { PropertyForm } from "@/components/host/property-form"
import { getPropertyBySlug } from "@/lib/db/properties"
import { notFound } from "next/navigation"

export default async function EditListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = await getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold">Edit Listing</h1>
        <p className="text-muted-foreground">Update your property details.</p>
      </div>
      <PropertyForm initialData={property} />
    </div>
  )
}
