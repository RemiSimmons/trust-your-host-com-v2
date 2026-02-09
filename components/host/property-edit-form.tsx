'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { AlertCircle, CheckCircle2, Lock, Save, Clock, Loader2, ExternalLink } from 'lucide-react'
import { updatePropertyInstant, updatePropertyRequiresApproval, getPendingChangeRequests, updatePropertyImages } from '@/app/host/properties/actions'
import { useRouter } from 'next/navigation'
import type { Property } from '@/lib/types'
import { ImageManager } from './image-manager'
import { AMENITIES, STANDARD_HOUSE_RULES } from '@/lib/data/property-constants'
import Link from 'next/link'

interface PropertyEditFormProps {
  property: Property
}

interface ChangeRequest {
  id: string
  requested_changes: Record<string, any>
  requested_at: string
  status: string
}

export function PropertyEditForm({ property }: PropertyEditFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingImages, setIsSavingImages] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [activeTab, setActiveTab] = useState('instant')
  const [pendingChanges, setPendingChanges] = useState<ChangeRequest[]>([])
  const [images, setImages] = useState<string[]>(property.images || [])
  const [imagesChanged, setImagesChanged] = useState(false)

  // Handle description - can be string or object
  const descriptionText = typeof property.description === 'string' 
    ? property.description 
    : (property.description?.full || property.description?.short || '')
  
  // Get house rules with fallback
  const houseRulesText = (property as any).house_rules || ''
  const standardHouseRules = property.standard_house_rules || []

  // Fetch pending change requests
  useEffect(() => {
    async function fetchPending() {
      const requests = await getPendingChangeRequests(property.id)
      setPendingChanges(requests)
    }
    fetchPending()
  }, [property.id])

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages)
    setImagesChanged(true)
  }

  const handleSaveImages = async () => {
    setIsSavingImages(true)
    setMessage(null)

    try {
      const result = await updatePropertyImages(property.id, images)
      if (result.success) {
        setMessage({ type: 'success', text: 'Images saved successfully!' })
        setImagesChanged(false)
        router.refresh()
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save images' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred while saving images.' })
    } finally {
      setIsSavingImages(false)
    }
  }

  async function handleInstantUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('[PropertyEditForm] Form submitted, starting update...')
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    
    const updateData = {
      description: formData.get('description') as string,
      amenities: formData.getAll('amenities') as string[],
      house_rules: formData.get('house_rules') as string,
      standard_house_rules: formData.getAll('standard_house_rules') as string[],
      pricing: {
        baseNightlyRate: Number(formData.get('baseNightlyRate')),
        weeklyDiscount: Number(formData.get('weeklyDiscount')) || 0,
        monthlyDiscount: Number(formData.get('monthlyDiscount')) || 0,
        showWeeklyDiscount: formData.get('showWeeklyDiscount') === 'on',
        showMonthlyDiscount: formData.get('showMonthlyDiscount') === 'on',
      },
      minimum_stay: Number(formData.get('minimum_stay')),
      external_booking_url: formData.get('external_booking_url') as string,
      contact_email: formData.get('contact_email') as string,
      contact_phone: formData.get('contact_phone') as string,
      typical_response_hours: Number(formData.get('typical_response_hours')) || 24,
      is_fifa_2026: formData.get('is_fifa_2026') === 'on',
    }
    
    console.log('[PropertyEditForm] Update data:', updateData)
    
    try {
      console.log('[PropertyEditForm] Calling updatePropertyInstant...')
      const result = await updatePropertyInstant(property.id, updateData)
      console.log('[PropertyEditForm] Result:', result)

      if (result.success) {
        setMessage({ type: 'success', text: 'Changes saved successfully!' })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save changes' })
      }
    } catch (error) {
      console.error('[PropertyEditForm] Error:', error)
      setMessage({ type: 'error', text: `An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}` })
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleApprovalRequired(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await updatePropertyRequiresApproval(property.id, {
        name: formData.get('name') as string,
        property_type: formData.get('property_type') as string,
        postal_code: formData.get('postal_code') as string,
        location: {
          city: formData.get('city') as string,
          state: formData.get('state') as string,
          country: formData.get('country') as string,
          coordinates: property.location.coordinates,
        },
        capacity: {
          guests: Number(formData.get('guests')),
          bedrooms: Number(formData.get('bedrooms')),
          beds: Number(formData.get('beds')),
          bathrooms: Number(formData.get('bathrooms')),
        },
      })

      if (result.success) {
        setMessage({ 
          type: 'success', 
          text: 'Changes submitted for approval! Your property will be under review until approved.' 
        })
        router.refresh()
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to submit changes' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Pending Changes Notice */}
      {pendingChanges.length > 0 && (
        <Alert className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-500">
          <Clock className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            <p className="font-semibold text-yellow-900 dark:text-yellow-100">
              {pendingChanges.length} Change{pendingChanges.length > 1 ? 's' : ''} Awaiting Approval
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              Your change request is being reviewed by our team. Your listing will stay live with current information until approved.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {/* Status Alert */}
      {message && (
        <Alert variant={message.type === 'error' ? 'destructive' : 'default'}>
          {message.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="instant" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-900">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Instant Updates
            </div>
          </TabsTrigger>
          <TabsTrigger value="approval" className="data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-900">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              Requires Approval
            </div>
          </TabsTrigger>
          <TabsTrigger value="locked" className="data-[state=active]:bg-gray-50">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
              System Controlled
            </div>
          </TabsTrigger>
        </TabsList>

        {/* INSTANT UPDATES TAB */}
        <TabsContent value="instant" className="space-y-6">
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              These changes go live immediately and don't require admin approval.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleInstantUpdate} className="space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Property Description</CardTitle>
                <CardDescription>Tell travelers about your property</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  name="description"
                  defaultValue={descriptionText}
                  rows={6}
                  placeholder="Describe your property..."
                  required
                />
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Set your nightly rates and discounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="baseNightlyRate">Base Nightly Rate ($)</Label>
                    <Input
                      id="baseNightlyRate"
                      name="baseNightlyRate"
                      type="number"
                      min="0"
                      defaultValue={property.pricing.baseNightlyRate}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="weeklyDiscount">Weekly Discount (%)</Label>
                    <Input
                      id="weeklyDiscount"
                      name="weeklyDiscount"
                      type="number"
                      min="0"
                      max="100"
                      defaultValue={property.pricing.weeklyDiscount || 0}
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyDiscount">Monthly Discount (%)</Label>
                    <Input
                      id="monthlyDiscount"
                      name="monthlyDiscount"
                      type="number"
                      min="0"
                      max="100"
                      defaultValue={property.pricing.monthlyDiscount || 0}
                    />
                  </div>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Control discount visibility on your property page:
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="showWeeklyDiscount"
                      name="showWeeklyDiscount"
                      defaultChecked={property.pricing.showWeeklyDiscount !== false}
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded cursor-pointer"
                    />
                    <Label htmlFor="showWeeklyDiscount" className="font-normal cursor-pointer">
                      Display weekly discount to guests
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="showMonthlyDiscount"
                      name="showMonthlyDiscount"
                      defaultChecked={property.pricing.showMonthlyDiscount !== false}
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded cursor-pointer"
                    />
                    <Label htmlFor="showMonthlyDiscount" className="font-normal cursor-pointer">
                      Display monthly discount to guests
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>Minimum stay and booking information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="minimum_stay">Minimum Stay (nights)</Label>
                  <Input
                    id="minimum_stay"
                    name="minimum_stay"
                    type="number"
                    min="1"
                    defaultValue={property.minimum_stay || property.pricing.minStay || 1}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="external_booking_url">Your Booking Website URL</Label>
                  <Input
                    id="external_booking_url"
                    name="external_booking_url"
                    type="url"
                    defaultValue={property.external_booking_url || ''}
                    placeholder="https://yourwebsite.com/booking"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Include the full URL with https://
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>How travelers can reach you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    defaultValue={property.contact_email || ''}
                    placeholder="host@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    name="contact_phone"
                    type="tel"
                    defaultValue={property.contact_phone || ''}
                    placeholder="404-301-0535"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Event Associations */}
            <Card>
              <CardHeader>
                <CardTitle>Event Associations</CardTitle>
                <CardDescription>Feature your property for upcoming events to reach more travelers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <input
                      type="checkbox"
                      id="is_fifa_2026"
                      name="is_fifa_2026"
                      defaultChecked={property.is_fifa_2026 || false}
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded cursor-pointer mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="is_fifa_2026" className="font-medium cursor-pointer text-base">
                        FIFA World Cup 2026
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Feature your property for FIFA 2026 matches. Travelers searching for FIFA accommodations will see your listing.
                      </p>
                      {property.distance_to_stadium && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                          ✓ Your property is {property.distance_to_stadium} mi from the nearest FIFA stadium
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                    <AlertCircle className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-sm text-blue-900 dark:text-blue-100">
                      <strong>Tip:</strong> Properties featured for major events get significantly more views and bookings. Make sure your property details and photos are up to date!
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card>
              <CardHeader>
                <CardTitle>Typical Response Time</CardTitle>
                <CardDescription>How quickly do you typically respond to inquiries?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <input
                      type="radio"
                      name="typical_response_hours"
                      value="1"
                      defaultChecked={property.typical_response_hours === 1}
                      className="h-4 w-4 text-orange-600"
                    />
                    <span className="text-sm font-medium">Within 1 hour</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <input
                      type="radio"
                      name="typical_response_hours"
                      value="4"
                      defaultChecked={property.typical_response_hours === 4}
                      className="h-4 w-4 text-orange-600"
                    />
                    <span className="text-sm font-medium">Within 4 hours</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <input
                      type="radio"
                      name="typical_response_hours"
                      value="24"
                      defaultChecked={property.typical_response_hours === 24 || !property.typical_response_hours}
                      className="h-4 w-4 text-orange-600"
                    />
                    <span className="text-sm font-medium">Within 24 hours</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <input
                      type="radio"
                      name="typical_response_hours"
                      value="48"
                      defaultChecked={property.typical_response_hours === 48}
                      className="h-4 w-4 text-orange-600"
                    />
                    <span className="text-sm font-medium">Within 48 hours</span>
                  </label>
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {AMENITIES.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`amenity-${amenity}`}
                        name="amenities"
                        value={amenity}
                        defaultChecked={property.amenities?.includes(amenity)}
                      />
                      <label
                        htmlFor={`amenity-${amenity}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* House Rules */}
            <Card>
              <CardHeader>
                <CardTitle>House Rules</CardTitle>
                <CardDescription>Set expectations for guests (will be displayed prominently on your listing)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Standard House Rules - Checkboxes */}
                <div>
                  <Label className="text-base mb-3 block">Standard Rules</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {STANDARD_HOUSE_RULES.map((rule) => (
                      <div key={rule} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rule-${rule}`}
                          name="standard_house_rules"
                          value={rule}
                          defaultChecked={standardHouseRules.includes(rule)}
                        />
                        <label
                          htmlFor={`rule-${rule}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {rule}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom House Rules - Free Text */}
                <div>
                  <Label htmlFor="house_rules" className="text-base mb-2 block">
                    Additional Custom Rules
                  </Label>
                  <Textarea
                    id="house_rules"
                    name="house_rules"
                    defaultValue={houseRulesText}
                    rows={4}
                    placeholder="Add any additional custom rules specific to your property..."
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    These rules will be shown in a collapsible section on your property listing
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Changes (Updates Immediately)'}
              </Button>
              {property.slug && (
                <Link 
                  href={`/properties/${property.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button type="button" variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Public Listing
                  </Button>
                </Link>
              )}
            </div>
          </form>

          {/* Image Management Section - Separate from main form */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Property Images</CardTitle>
              <CardDescription>
                Manage your property photos. The first image will be used as the main thumbnail. 
                Maximum 5 images, 5MB each.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageManager
                propertyId={property.id}
                images={images}
                onImagesChange={handleImagesChange}
                maxImages={5}
              />
              
              {imagesChanged && (
                <Button
                  type="button"
                  onClick={handleSaveImages}
                  disabled={isSavingImages}
                  className="w-full"
                >
                  {isSavingImages ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving Images...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Image Changes
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* REQUIRES APPROVAL TAB */}
        <TabsContent value="approval" className="space-y-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Changes to these fields require admin re-approval. Your property will go into "Pending" status until approved.
            </AlertDescription>
          </Alert>

          <form onSubmit={handleApprovalRequired} className="space-y-6">
            {/* Property Name */}
            <Card>
              <CardHeader>
                <CardTitle>Property Name</CardTitle>
                <CardDescription>Requires approval</CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  name="name"
                  defaultValue={property.name}
                  placeholder="Beach House Paradise"
                  required
                />
              </CardContent>
            </Card>

            {/* Property Type */}
            <Card>
              <CardHeader>
                <CardTitle>Property Type</CardTitle>
                <CardDescription>Requires approval</CardDescription>
              </CardHeader>
              <CardContent>
                <select
                  name="property_type"
                  defaultValue={property.propertyType}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Cabin">Cabin</option>
                  <option value="Cottage">Cottage</option>
                </select>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle>Property Location</CardTitle>
                <CardDescription>Location changes require re-verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="postal_code">Location Radius (zip code)</Label>
                  <Input
                    id="postal_code"
                    name="postal_code"
                    defaultValue={property.postal_code || ''}
                    placeholder="Enter zip/postal code"
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your full street address is kept private and only shared with confirmed guests.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      defaultValue={property.location.city}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      name="state"
                      defaultValue={property.location.state}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    defaultValue={property.location.country}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Capacity */}
            <Card>
              <CardHeader>
                <CardTitle>Property Capacity</CardTitle>
                <CardDescription>Major changes require re-verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="guests">Maximum Guests</Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      min="1"
                      defaultValue={property.capacity.guests}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Input
                      id="bedrooms"
                      name="bedrooms"
                      type="number"
                      min="0"
                      defaultValue={property.capacity.bedrooms}
                      required
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="beds">Beds</Label>
                    <Input
                      id="beds"
                      name="beds"
                      type="number"
                      min="0"
                      defaultValue={property.capacity.beds}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Input
                      id="bathrooms"
                      name="bathrooms"
                      type="number"
                      min="0"
                      step="0.5"
                      defaultValue={property.capacity.bathrooms}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button type="submit" disabled={isSubmitting} className="w-full" variant="destructive">
              <AlertCircle className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Submitting...' : 'Submit for Re-Approval (Property Goes Pending)'}
            </Button>
          </form>
        </TabsContent>

        {/* LOCKED FIELDS TAB */}
        <TabsContent value="locked" className="space-y-6">
          <Alert>
            <Lock className="h-4 w-4" />
            <AlertDescription>
              These fields are system-controlled and cannot be edited. Contact support if you need to change them.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>System Controlled Fields</CardTitle>
              <CardDescription>Managed by TrustYourHost admin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Verification Status</Label>
                  <div className="mt-2">
                    <Badge variant={property.verified ? 'default' : 'secondary'}>
                      {property.verified ? 'Verified' : 'Pending'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Featured Status</Label>
                  <div className="mt-2">
                    <Badge variant={property.featured ? 'default' : 'outline'}>
                      {property.featured ? 'Featured' : 'Not Featured'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label>Property URL</Label>
                  <Input
                    value={`trustyourhost.com/properties/${property.slug}`}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div>
                  <Label>Property ID</Label>
                  <Input
                    value={property.id}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <Alert className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Need to change these fields? Contact us at <strong>hello@trustyourhost.com</strong> or call 404-301-0535
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
