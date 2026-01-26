import { PropertyForm } from "@/components/host/property-form"

export default function NewListingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold">Create New Listing</h1>
        <p className="text-muted-foreground">Fill in the details to publish your property.</p>
      </div>
      <PropertyForm />
    </div>
  )
}
