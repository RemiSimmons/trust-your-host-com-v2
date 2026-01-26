"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createProperty, updateProperty } from "@/app/host/actions"
import type { Property } from "@/lib/types"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface PropertyFormProps {
  initialData?: Property
}

export function PropertyForm({ initialData }: PropertyFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  // We wrap the server action to handle loading state
  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      if (initialData) {
        await updateProperty(initialData.slug, formData)
      } else {
        await createProperty(formData)
      }
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="space-y-4 p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold">Basic Information</h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Property Name</Label>
            <Input id="name" name="name" defaultValue={initialData?.name} placeholder="e.g. Seaside Villa" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyType">Property Type</Label>
            <Select name="propertyType" defaultValue={initialData?.propertyType || "villa"}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="cabin">Cabin</SelectItem>
                <SelectItem value="apartment">Apartment/Condo</SelectItem>
                <SelectItem value="glamping">Glamping</SelectItem>
                <SelectItem value="treehouse">Treehouse</SelectItem>
                <SelectItem value="unique-stay">Unique Stay</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={initialData?.description.full}
            placeholder="Describe your property..."
            className="h-32"
            required
          />
        </div>
      </div>

      <div className="space-y-4 p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold">Location</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" defaultValue={initialData?.location.city} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region/State</Label>
            <Input id="region" name="region" defaultValue={initialData?.location.region} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input id="country" name="country" defaultValue={initialData?.location.country} required />
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold">Details & Pricing</h3>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="space-y-2">
            <Label htmlFor="guests">Max Guests</Label>
            <Input
              type="number"
              id="guests"
              name="guests"
              defaultValue={initialData?.capacity.guests}
              required
              min="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input
              type="number"
              id="bedrooms"
              name="bedrooms"
              defaultValue={initialData?.capacity.bedrooms}
              required
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="beds">Beds</Label>
            <Input type="number" id="beds" name="beds" defaultValue={initialData?.capacity.beds} required min="0" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input
              type="number"
              id="bathrooms"
              name="bathrooms"
              defaultValue={initialData?.capacity.bathrooms}
              required
              min="0"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="space-y-2">
            <Label htmlFor="price">Nightly Rate ($)</Label>
            <Input
              type="number"
              id="price"
              name="price"
              defaultValue={initialData?.pricing.baseNightlyRate}
              required
              min="0"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minStay">Min Stay (Nights)</Label>
            <Input
              type="number"
              id="minStay"
              name="minStay"
              defaultValue={initialData?.pricing.minStay}
              required
              min="1"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold">Amenities</h3>
        <div className="space-y-2">
          <Label htmlFor="amenities">Amenities (comma separated)</Label>
          <Input
            id="amenities"
            name="amenities"
            defaultValue={initialData?.amenities.join(", ")}
            placeholder="Wifi, Pool, Kitchen, Parking..."
          />
        </div>
      </div>

      <div className="space-y-4 p-6 border rounded-lg bg-card">
        <h3 className="text-lg font-semibold">Property Images</h3>
        <div className="space-y-2">
          <Label htmlFor="images">Image URLs (one per line)</Label>
          <Textarea
            id="images"
            name="images"
            defaultValue={initialData?.images.join("\n")}
            placeholder="https://example.com/image1.jpg\nhttps://example.com/image2.jpg"
            className="h-32 font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Enter public URLs for your images. Supported formats: JPG, PNG, WebP.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {initialData ? "Update Property" : "Create Property"}
        </Button>
      </div>
    </form>
  )
}
