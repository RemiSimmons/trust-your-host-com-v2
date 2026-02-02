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
  
  if (!externalUrl.startsWith('http://') && !externalUrl.startsWith('https://')) {
    return { error: 'Please provide a valid website URL' }
  }
  
  // Parse image URLs and convert share links to direct links
  // Support both comma-separated and newline-separated URLs
  const imageInput = formData.get('image_urls') as string
  const imageUrls = imageInput
    .split(/[,\n]/) // Split by comma or newline
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(url => {
      // Convert Google Drive share links to direct download links
      if (url.includes('drive.google.com')) {
        const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/)
        if (fileIdMatch) {
          return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`
        }
      }
      
      // Convert Dropbox share links to direct download links
      if (url.includes('dropbox.com')) {
        return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '').replace('?dl=1', '')
      }
      
      // OneDrive and WeTransfer links are typically already direct download links
      // or can be used as-is for the submission review
      
      return url
    })
  
  if (imageUrls.length < 3) {
    return { error: 'Please provide at least 3 image URLs or download links' }
  }

  if (imageUrls.length > 5) {
    return { error: 'Please provide no more than 5 image URLs or download links' }
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
        max_guests: Number(formData.get('max_guests')),
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
      return { error: 'Failed to submit property. Please try again.' }
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
