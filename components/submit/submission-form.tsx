'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { submitPropertyListing } from '@/app/submit-property/actions'
import { Loader2, CheckCircle } from 'lucide-react'
import { EXPERIENCE_CATEGORIES, AMENITIES, PROPERTY_TYPES } from '@/lib/data/property-constants'
import { SubmissionImageUploader } from './image-uploader'

export function SubmissionForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [wordCount, setWordCount] = useState(0)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [showOptionalSection, setShowOptionalSection] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validate minimum images
    if (uploadedImages.length < 3) {
      setError('Please upload at least 3 images of your property.')
      setIsLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const formData = new FormData(e.currentTarget)
    
    // Add selected experiences and amenities
    selectedExperiences.forEach(exp => formData.append('experiences', exp))
    selectedAmenities.forEach(amenity => formData.append('amenities', amenity))
    
    // Add selected platforms
    selectedPlatforms.forEach(platform => formData.append('listed_platforms', platform))
    
    // Add uploaded images
    formData.set('uploaded_images', JSON.stringify(uploadedImages))

    const result = await submitPropertyListing(formData)

    if (result.error) {
      console.error('Submission failed:', result.error)
      setError(result.error)
      setIsLoading(false)
      // Scroll to top to show error
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
          <h2 className="text-2xl font-bold mb-2">Submission Received!</h2>
          <p className="text-muted-foreground mb-4">
            Thank you for submitting your property. Our team will review it and get back to you within 24-48 hours.
          </p>
          <p className="text-sm text-muted-foreground">
            You'll receive an email once your property is approved and your 60-day free trial begins.
          </p>
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
      
      {/* Host Information */}
      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>Tell us about yourself</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="host_name">Full Legal Name *</Label>
              <Input id="host_name" name="host_name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="host_email">Email *</Label>
              <Input id="host_email" name="host_email" type="email" required />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="host_phone">Phone Number *</Label>
              <Input id="host_phone" name="host_phone" type="tel" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="host_profile_picture">Profile Picture URL (optional)</Label>
              <Input 
                id="host_profile_picture" 
                name="host_profile_picture" 
                type="url" 
                placeholder="https://example.com/profile.jpg"
              />
              <p className="text-xs text-muted-foreground">
                Direct link to your profile picture (JPG, PNG, or WebP)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
              Include the full URL with https:// (we'll auto-add it if you forget)
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
            <p className="text-xs text-muted-foreground">
              Full address helps us verify your property and improve SEO for local searches
            </p>
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
          <CardTitle>Property Images *</CardTitle>
          <CardDescription>
            Upload 3-5 high-quality photos of your property. First image will be the main thumbnail.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmissionImageUploader
            images={uploadedImages}
            onImagesChange={setUploadedImages}
            maxImages={5}
            minImages={3}
          />
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

      {/* Optional Information */}
      <Card className="border-2 border-dashed">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Optional Information</CardTitle>
              <CardDescription>Help us improve your listing (not required)</CardDescription>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowOptionalSection(!showOptionalSection)}
            >
              {showOptionalSection ? 'Hide' : 'Show'}
            </Button>
          </div>
        </CardHeader>
        {showOptionalSection && (
          <CardContent className="space-y-6">
            {/* Currently Listed On */}
            <div className="space-y-3">
              <Label>Currently Listed On</Label>
              <p className="text-xs text-muted-foreground">
                Helps us understand your current distribution
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['Airbnb', 'VRBO', 'Booking.com', 'Other'].map((platform) => (
                  <div key={platform} className="flex items-center space-x-2">
                    <Checkbox
                      id={`platform-${platform}`}
                      checked={selectedPlatforms.includes(platform)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPlatforms([...selectedPlatforms, platform])
                        } else {
                          setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform))
                        }
                      }}
                    />
                    <Label htmlFor={`platform-${platform}`} className="text-sm font-normal cursor-pointer">
                      {platform}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mt-3">
                <Label htmlFor="other_platforms">Other platforms (optional)</Label>
                <Input 
                  id="other_platforms" 
                  name="other_platforms" 
                  placeholder="e.g. TripAdvisor, Expedia"
                />
              </div>
            </div>

            {/* Typical Response Time */}
            <div className="space-y-3">
              <Label>Typical Response Time</Label>
              <p className="text-xs text-muted-foreground">
                We'll display this on your listing to set guest expectations
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="response_1hr"
                    name="typical_response_hours"
                    value="1"
                    className="h-4 w-4 text-orange-600"
                  />
                  <Label htmlFor="response_1hr" className="text-sm font-normal cursor-pointer">
                    Within 1 hour
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="response_4hr"
                    name="typical_response_hours"
                    value="4"
                    className="h-4 w-4 text-orange-600"
                  />
                  <Label htmlFor="response_4hr" className="text-sm font-normal cursor-pointer">
                    Within 4 hours
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="response_24hr"
                    name="typical_response_hours"
                    value="24"
                    className="h-4 w-4 text-orange-600"
                  />
                  <Label htmlFor="response_24hr" className="text-sm font-normal cursor-pointer">
                    Within 24 hours
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="response_48hr"
                    name="typical_response_hours"
                    value="48"
                    className="h-4 w-4 text-orange-600"
                  />
                  <Label htmlFor="response_48hr" className="text-sm font-normal cursor-pointer">
                    Within 48 hours
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        )}
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
