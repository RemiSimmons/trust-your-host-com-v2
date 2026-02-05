'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { submitAdditionalProperty } from '@/app/host/properties/actions'
import { Loader2, CheckCircle } from 'lucide-react'
import { EXPERIENCE_CATEGORIES, AMENITIES, PROPERTY_TYPES } from '@/lib/data/property-constants'

interface HostInfo {
  name: string
  email: string
  phone: string
  profilePicture: string
}

interface AddPropertyFormProps {
  hostId: string
  hostInfo: HostInfo
}

export function AddPropertyForm({ hostId, hostInfo }: AddPropertyFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [wordCount, setWordCount] = useState(0)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    // Add host ID (from session)
    formData.append('host_id', hostId)
    
    // Add selected experiences and amenities
    selectedExperiences.forEach(exp => formData.append('experiences', exp))
    selectedAmenities.forEach(amenity => formData.append('amenities', amenity))

    const result = await submitAdditionalProperty(formData)

    if (result.error) {
      console.error('Submission failed:', result.error)
      setError(result.error)
      setIsLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setSubmitted(true)
      setIsLoading(false)
    }
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value
    const words = text.trim().split(/\s+/).filter(w => w.length > 0)
    setWordCount(words.length)
  }

  if (submitted) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Property Submitted!</h2>
          <p className="text-muted-foreground mb-4">
            Your new property has been submitted for review. Our team will review it and notify you within 24-48 hours.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Once approved, you'll receive a 60-day free trial for this property.
          </p>
          <Button asChild>
            <a href="/host">Return to Dashboard</a>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 px-4 py-3 rounded shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-red-800 dark:text-red-400">Submission Error</p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Property Details */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Basic information about your property</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="property_name">Property Name *</Label>
            <Input id="property_name" name="property_name" placeholder="e.g. Sunset Beach Villa" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="external_booking_url">Your Direct Booking Website URL *</Label>
            <Input 
              id="external_booking_url" 
              name="external_booking_url" 
              type="url" 
              placeholder="https://yourwebsite.com/booking" 
              required 
            />
            <p className="text-sm text-muted-foreground">
              Please include the full URL starting with https:// (e.g., https://yourwebsite.com/booking)
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-sm">Property Address</h3>
            <div className="space-y-2">
              <Label htmlFor="street_address">Street Address *</Label>
              <Input 
                id="street_address" 
                name="street_address" 
                placeholder="123 Main Street" 
                required 
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" name="city" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province *</Label>
                <Input id="state" name="state" placeholder="e.g. CA, FL, TX" required />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postal Code *</Label>
                <Input id="postal_code" name="postal_code" placeholder="e.g. 90210" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input id="country" name="country" defaultValue="United States" required />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="property_type">Property Type *</Label>
            <Select name="property_type" required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PROPERTY_TYPES).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Experience Categories *</Label>
            <p className="text-sm text-muted-foreground mb-2">Select all that apply</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {EXPERIENCE_CATEGORIES.map((exp) => (
                <div key={exp} className="flex items-center space-x-2">
                  <Checkbox
                    id={`exp-${exp}`}
                    checked={selectedExperiences.includes(exp)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedExperiences([...selectedExperiences, exp])
                      } else {
                        setSelectedExperiences(selectedExperiences.filter(e => e !== exp))
                      }
                    }}
                  />
                  <Label htmlFor={`exp-${exp}`} className="text-sm font-normal cursor-pointer">
                    {exp}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Property Description * (Max 150 words)</Label>
            <Textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Describe your property, its features, and what makes it special..."
              required
              onChange={handleDescriptionChange}
            />
            <p className={`text-sm ${wordCount > 150 ? 'text-red-600' : 'text-muted-foreground'}`}>
              {wordCount} / 150 words
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Capacity */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Capacity</CardTitle>
          <CardDescription>Set your rates and guest limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nightly_rate_min">Min Nightly Rate ($) *</Label>
              <Input id="nightly_rate_min" name="nightly_rate_min" type="number" min="0" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nightly_rate_max">Max Nightly Rate ($) *</Label>
              <Input id="nightly_rate_max" name="nightly_rate_max" type="number" min="0" required />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-sm">Property Capacity</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="max_guests">Maximum Guests *</Label>
                <Input id="max_guests" name="max_guests" type="number" min="1" max="50" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Input id="bedrooms" name="bedrooms" type="number" min="0" required />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="beds">Beds *</Label>
                <Input id="beds" name="beds" type="number" min="1" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Input id="bathrooms" name="bathrooms" type="number" min="0.5" step="0.5" required />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Property Images</CardTitle>
          <CardDescription>Provide 3-5 high-quality images of your property</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image_urls">Image URLs or Download Links *</Label>
              <Textarea
                id="image_urls"
                name="image_urls"
                rows={5}
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg, https://example.com/image3.jpg&#10;&#10;Or enter one URL per line:&#10;https://drive.google.com/file/d/xxx/view&#10;https://www.dropbox.com/s/xxx/photo.jpg"
                className="font-mono text-sm"
                required
              />
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  ✅ Accepted: Direct image URLs, Google Drive, Dropbox, OneDrive, or WeTransfer links
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Enter URLs separated by commas OR one URL per line</li>
                  <li>Minimum 3 images, maximum 5</li>
                  <li>Accepted formats: JPG, PNG, WebP</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
          <CardDescription>Select all amenities your property offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {AMENITIES.map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={selectedAmenities.includes(amenity)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedAmenities([...selectedAmenities, amenity])
                    } else {
                      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity))
                    }
                  }}
                />
                <Label htmlFor={`amenity-${amenity}`} className="text-sm font-normal cursor-pointer">
                  {amenity}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* FIFA 2026 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="available_for_fifa_2026" name="available_for_fifa_2026" />
            <Label htmlFor="available_for_fifa_2026" className="cursor-pointer">
              ⚽ Available for FIFA World Cup 2026
            </Label>
          </div>
          <p className="text-sm text-muted-foreground mt-2 ml-6">
            Check this if your property will be available during the FIFA World Cup 2026
          </p>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Property for Review'
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        By submitting, you agree to our terms and that your listing will be reviewed before going live.
        You'll receive a 60-day free trial once approved.
      </p>
    </form>
  )
}
