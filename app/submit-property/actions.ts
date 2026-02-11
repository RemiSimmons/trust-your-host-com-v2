'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { sendPropertySubmissionNotification } from '@/lib/email/resend'
import { revalidatePath } from 'next/cache'

export async function submitPropertyListing(formData: FormData) {
  // Use admin client to bypass RLS for public submissions
  const supabase = createAdminClient()
  
  // Validate and normalize external URL
  let externalUrl = formData.get('external_booking_url') as string
  if (!externalUrl) {
    return { error: 'Please provide a valid website URL' }
  }
  
  // Auto-prepend https:// if missing
  externalUrl = externalUrl.trim()
  if (!externalUrl.startsWith('http://') && !externalUrl.startsWith('https://')) {
    externalUrl = `https://${externalUrl}`
  }
  
  // Basic URL validation
  try {
    new URL(externalUrl)
  } catch {
    return { error: 'Please provide a valid website URL' }
  }
  
  // Parse uploaded images (JSON array of Supabase Storage URLs)
  const uploadedImagesJson = formData.get('uploaded_images') as string
  let imageUrls: string[] = []
  
  try {
    imageUrls = JSON.parse(uploadedImagesJson || '[]')
  } catch {
    return { error: 'Invalid image data. Please re-upload your images.' }
  }
  
  if (imageUrls.length < 3) {
    return { error: 'Please upload at least 3 images of your property' }
  }

  if (imageUrls.length > 5) {
    return { error: 'Please upload no more than 5 images' }
  }
  
  // Validate description length
  const description = formData.get('description') as string
  const wordCount = description.trim().split(/\s+/).length
  if (wordCount > 150) {
    return { error: `Description is too long (${wordCount} words). Please keep it under 150 words.` }
  }

  // Parse amenities
  const amenities = formData.getAll('amenities') as string[]
  
  // Parse experiences
  const experiences = formData.getAll('experiences') as string[]
  
  // Parse listed platforms
  const listedPlatforms = formData.getAll('listed_platforms') as string[]
  
  // Build full address object
  const fullAddress = {
    street: formData.get('street_address') as string,
    city: formData.get('city') as string,
    state: formData.get('state') as string,
    postal_code: formData.get('postal_code') as string,
    country: formData.get('country') as string || 'United States'
  }
  
  // Parse typical response hours (optional)
  const responseHoursStr = formData.get('typical_response_hours') as string | null
  const typicalResponseHours = responseHoursStr ? Number(responseHoursStr) : null
  
  // Build capacity object
  // Check if "Pet Friendly" is in amenities to set allowsPets
  const allowsPets = amenities.includes('Pet Friendly')
  
  const capacity = {
    guests: Number(formData.get('max_guests')),
    bedrooms: Number(formData.get('bedrooms')),
    beds: Number(formData.get('beds')),
    bathrooms: Number(formData.get('bathrooms')),
    allowsPets: allowsPets
  }
  
  try {
    // Insert submission
    const { data, error } = await supabase
      .from('property_submissions')
      .insert({
        host_name: formData.get('host_name'),
        host_email: formData.get('host_email'),
        host_phone: formData.get('host_phone'),
        host_profile_picture: formData.get('host_profile_picture') as string || null,
        property_name: formData.get('property_name'),
        external_booking_url: externalUrl,
        city: fullAddress.city,
        state: fullAddress.state,
        country: fullAddress.country,
        street_address: fullAddress.street,
        postal_code: fullAddress.postal_code,
        full_address: fullAddress,
        experiences: experiences,
        property_type: formData.get('property_type'),
        image_urls: imageUrls,
        description: description,
        nightly_rate_min: Number(formData.get('nightly_rate_min')),
        nightly_rate_max: Number(formData.get('nightly_rate_max')),
        max_guests: capacity.guests,
        capacity: capacity,
        amenities: amenities,
        available_for_fifa_2026: formData.get('available_for_fifa_2026') === 'on',
        listed_on_platforms: listedPlatforms.length > 0 ? listedPlatforms : null,
        other_platforms: formData.get('other_platforms') as string || null,
        typical_response_hours: typicalResponseHours
      })
      .select()
      .single()
    
    if (error) {
      console.error('Submission error:', error)
      
      // Provide specific error messages based on error type
      if (error.code === '23505') {
        return { error: 'This property has already been submitted. Please check your email for the status.' }
      }
      
      if (error.code === '23514') {
        return { error: 'Invalid data format. Please check all required fields and try again.' }
      }
      
      if (error.message?.includes('email')) {
        return { error: 'Invalid email address. Please check and try again.' }
      }
      
      if (error.message?.includes('phone')) {
        return { error: 'Invalid phone number format. Please use a valid phone number.' }
      }
      
      // Log full error server-side but return generic message to client
      console.error('Property submission error:', error.message || 'Unknown error')
      return { error: 'Failed to submit property. Please contact support if this persists.' }
    }
    
    // Send email notification to admin
    const emailResult = await sendPropertySubmissionNotification({
      propertyName: data.property_name,
      hostName: data.host_name,
      hostEmail: data.host_email,
      submissionId: data.id
    })
    
    if (!emailResult.success) {
      console.error('[Submission] Email failed:', emailResult.error)
      // Don't fail the submission if email fails, just log it
    } else {
      console.log('[Submission] Email sent successfully:', emailResult.emailId)
    }
    
    return { success: true, submissionId: data.id }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}
