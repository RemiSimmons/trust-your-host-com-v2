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

const EXPERIENCE_CATEGORIES = [
  'Mountain Retreats',
  'Beachfront Escapes',
  'Wine Country',
  'Historic Charm',
  'Desert Oasis',
  'Lakefront Leisure',
  'Urban Exploration',
  'Countryside Calm',
  'Island Paradise',
  'Forest Hideaways',
  'Ski & Snow',
  'Coastal Towns'
]

const AMENITIES = [
  'WiFi',
  'Full Kitchen',
  'Free Parking',
  'Pet Friendly',
  'Washer/Dryer',
  'Air Conditioning',
  'Pool',
  'Hot Tub',
  'EV Charging',
  'Fireplace',
  'BBQ Grill',
  'Gym/Fitness'
]

export function SubmissionForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [wordCount, setWordCount] = useState(0)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [showOptionalSection, setShowOptionalSection] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    // Add selected experiences and amenities
    selectedExperiences.forEach(exp => formData.append('experiences', exp))
    selectedAmenities.forEach(amenity => formData.append('amenities', amenity))
    
    // Add selected platforms
    selectedPlatforms.forEach(platform => formData.append('listed_platforms', platform))

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
              placeholder="yourwebsite.com or booking.com/your-property" 
              required 
            />
            <p className="text-sm text-muted-foreground">
              Where travelers will book your property. Don't worry about https:// - we'll add it automatically!
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
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="cabin">Cabin</SelectItem>
                <SelectItem value="apartment">Apartment/Condo</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="lodge">Lodge</SelectItem>
                <SelectItem value="glamping">Glamping</SelectItem>
                <SelectItem value="treehouse">Treehouse</SelectItem>
                <SelectItem value="historic">Historic Home</SelectItem>
                <SelectItem value="unique-stay">Unique Stay</SelectItem>
                <SelectItem value="other">Other</SelectItem>
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

          <div className="space-y-2">
            <Label htmlFor="max_guests">Maximum Guests *</Label>
            <Input id="max_guests" name="max_guests" type="number" min="1" max="50" required />
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
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg, https://example.com/image3.jpg&#10;&#10;Or enter one URL per line:&#10;https://drive.google.com/file/d/xxx/view&#10;https://www.dropbox.com/s/xxx/photo.jpg&#10;https://onedrive.live.com/download?...&#10;https://wetransfer.com/downloads/xxx"
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
                  <li>For Google Drive: Share link with "Anyone with the link can view"</li>
                  <li>For Dropbox: Use share link or direct download link</li>
                  <li>For OneDrive: Use share or download link</li>
                  <li>For WeTransfer: Copy the download link</li>
                </ul>
              </div>
            </div>

            {/* Upload service icons/badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/>
                </svg>
                Google Drive
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4.5 8.5l3 3L12 8l4.5 3.5 3-3L12 2z"/>
                  <path d="M4.5 15.5l3 3L12 16l4.5 2.5 3-3L12 10l-7.5 5.5z"/>
                </svg>
                Dropbox
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                  <path d="M14 8h-4v4H8v4h4v4h4v-4h4v-4h-4V8z"/>
                </svg>
                OneDrive
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 rounded-full text-xs font-medium text-purple-700 dark:text-purple-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                WeTransfer
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
