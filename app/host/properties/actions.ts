'use server'

import { createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendPropertySubmissionNotification, sendPropertyChangeRequestNotification } from '@/lib/email/resend'
import { revalidatePath } from 'next/cache'

// Fields that can be updated instantly without approval
export async function updatePropertyInstant(
  propertyId: string,
  data: {
    description?: string
    amenities?: string[]
    house_rules?: string
    standard_house_rules?: string[]
    pricing?: {
      baseNightlyRate: number
      weeklyDiscount?: number
      monthlyDiscount?: number
    }
    minimum_stay?: number
    external_booking_url?: string
    contact_email?: string
    contact_phone?: string
    typical_response_hours?: number
  }
) {
  console.log('[updatePropertyInstant] Starting update for property:', propertyId)
  console.log('[updatePropertyInstant] Data received:', JSON.stringify(data, null, 2))
  
  const supabase = await createServerClient()
  
  // Verify user owns this property
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError) {
    console.error('[updatePropertyInstant] Auth error:', authError)
    return { success: false, error: 'Authentication error' }
  }
  if (!user) {
    console.log('[updatePropertyInstant] No user found')
    return { success: false, error: 'Unauthorized' }
  }
  console.log('[updatePropertyInstant] User authenticated:', user.id)

  const { data: property, error: fetchError } = await supabase
    .from('properties')
    .select('host_id, slug')
    .eq('id', propertyId)
    .single()

  if (fetchError) {
    console.error('[updatePropertyInstant] Error fetching property:', fetchError)
    return { success: false, error: `Failed to fetch property: ${fetchError.message}` }
  }

  if (!property || property.host_id !== user.id) {
    console.log('[updatePropertyInstant] Ownership check failed. Property host_id:', property?.host_id, 'User id:', user.id)
    return { success: false, error: 'Property not found or unauthorized' }
  }
  console.log('[updatePropertyInstant] Ownership verified')

  // Normalize URL if provided
  const updates = { ...data }
  if (updates.external_booking_url) {
    let normalizedUrl = updates.external_booking_url.trim()
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`
    }
    // Validate URL
    try {
      new URL(normalizedUrl)
    } catch {
      return { success: false, error: 'Invalid URL format' }
    }
    updates.external_booking_url = normalizedUrl
  }

  // Update property
  const updatePayload = {
    description: updates.description,
    amenities: updates.amenities,
    house_rules: updates.house_rules,
    standard_house_rules: updates.standard_house_rules,
    pricing: updates.pricing,
    minimum_stay: updates.minimum_stay,
    external_booking_url: updates.external_booking_url,
    contact_email: updates.contact_email,
    contact_phone: updates.contact_phone,
    typical_response_hours: updates.typical_response_hours,
    updated_at: new Date().toISOString(),
  }
  console.log('[updatePropertyInstant] Update payload:', JSON.stringify(updatePayload, null, 2))

  const { error } = await supabase
    .from('properties')
    .update(updatePayload)
    .eq('id', propertyId)

  if (error) {
    console.error('[updatePropertyInstant] Error updating property:', error)
    return { success: false, error: `Failed to update property: ${error.message}` }
  }

  console.log('[updatePropertyInstant] Update successful!')
  revalidatePath('/host/properties')
  revalidatePath(`/host/properties/${propertyId}/edit`)
  if (property.slug) {
    revalidatePath(`/properties/${property.slug}`)
  }
  revalidatePath('/search')
  
  return { success: true }
}

// Fields that require admin re-approval
export async function updatePropertyRequiresApproval(
  propertyId: string,
  data: {
    name?: string
    property_type?: string
    postal_code?: string
    location?: {
      city: string
      state: string
      country: string
      coordinates?: { lat: number; lng: number }
    }
    capacity?: {
      guests: number
      bedrooms: number
      beds: number
      bathrooms: number
    }
  }
) {
  const supabase = await createServerClient()
  
  // Verify user owns this property
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { data: property } = await supabase
    .from('properties')
    .select('host_id, slug, name, property_type, location, capacity, postal_code')
    .eq('id', propertyId)
    .single()

  if (!property || property.host_id !== user.id) {
    return { success: false, error: 'Property not found or unauthorized' }
  }

  // Get host profile for email
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  // Create a pending changes record
  const pendingChanges: any = {}
  const currentValues: any = {}
  
  if (data.name && data.name !== property.name) {
    pendingChanges.name = data.name
    currentValues.name = property.name
  }
  if (data.property_type && data.property_type !== property.property_type) {
    pendingChanges.property_type = data.property_type
    currentValues.property_type = property.property_type
  }
  if (data.postal_code) {
    pendingChanges.postal_code = data.postal_code
    currentValues.postal_code = property.postal_code
  }
  if (data.location) {
    pendingChanges.location = data.location
    currentValues.location = property.location
  }
  if (data.capacity) {
    pendingChanges.capacity = data.capacity
    currentValues.capacity = property.capacity
  }

  // If no changes were made, return early
  if (Object.keys(pendingChanges).length === 0) {
    return { success: false, error: 'No changes detected' }
  }

  // Insert into property_change_requests table for admin review
  const { error: insertError } = await supabase
    .from('property_change_requests')
    .insert({
      property_id: propertyId,
      host_id: user.id,
      requested_changes: pendingChanges,
      current_values: currentValues,
      status: 'pending',
      requested_at: new Date().toISOString(),
    })

  if (insertError) {
    console.error('Error creating change request:', insertError)
    return { success: false, error: 'Failed to submit changes for approval' }
  }

  // Also update property table to mark it has pending changes and hide from search
  const { error: updateError } = await supabase
    .from('properties')
    .update({
      pending_changes: pendingChanges,
      approval_status: 'pending_changes', // New status for properties with pending changes
      is_active: false, // Hide from search results until approved
      updated_at: new Date().toISOString(),
    })
    .eq('id', propertyId)

  if (updateError) {
    console.error('Error updating property status:', updateError)
    // Don't fail here since the change request was created
  }

  // Send email notification to admin about pending changes
  if (profile) {
    await sendPropertyChangeRequestNotification({
      propertyId,
      propertyName: property.name,
      hostName: profile.full_name || 'Host',
      hostEmail: profile.email || '',
      changes: pendingChanges,
    })
  }

  revalidatePath('/host/properties')
  revalidatePath('/admin/change-requests')
  if (property.slug) {
    revalidatePath(`/properties/${property.slug}`)
  }
  revalidatePath('/search')
  
  return { success: true }
}

// Toggle property active/paused status
export async function togglePropertyStatus(propertyId: string, active: boolean) {
  const supabase = await createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { data: property } = await supabase
    .from('properties')
    .select('host_id')
    .eq('id', propertyId)
    .single()

  if (!property || property.host_id !== user.id) {
    return { success: false, error: 'Property not found or unauthorized' }
  }

  const { error } = await supabase
    .from('properties')
    .update({
      is_active: active,
      updated_at: new Date().toISOString(),
    })
    .eq('id', propertyId)

  if (error) {
    return { success: false, error: 'Failed to update property status' }
  }

  revalidatePath('/host/properties')
  
  return { success: true }
}

// Get pending change requests for a property
export async function getPendingChangeRequests(propertyId: string) {
  const supabase = await createServerClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return []
  }

  const { data, error } = await supabase
    .from('property_change_requests')
    .select('*')
    .eq('property_id', propertyId)
    .eq('status', 'pending')
    .order('requested_at', { ascending: false })

  if (error) {
    console.error('Error fetching change requests:', error)
    return []
  }

  return data || []
}

// Update property images (instant update - no approval needed)
export async function updatePropertyImages(
  propertyId: string,
  images: string[]
) {
  const supabase = await createServerClient()
  
  // Verify user owns this property
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  const { data: property } = await supabase
    .from('properties')
    .select('host_id, slug')
    .eq('id', propertyId)
    .single()

  if (!property || property.host_id !== user.id) {
    return { success: false, error: 'Property not found or unauthorized' }
  }

  // Validate images array
  if (!Array.isArray(images)) {
    return { success: false, error: 'Invalid images data' }
  }

  // Limit to max 5 images
  const validatedImages = images.slice(0, 5)

  // Use admin client to bypass RLS for the update
  const adminSupabase = createAdminClient()

  // Update property images and verify the update took effect
  const { data: updated, error } = await adminSupabase
    .from('properties')
    .update({
      images: validatedImages,
      updated_at: new Date().toISOString(),
    })
    .eq('id', propertyId)
    .select('id, images')
    .single()

  if (error) {
    console.error('Error updating property images:', error)
    return { success: false, error: 'Failed to update images' }
  }

  if (!updated) {
    console.error('Image update returned no data - update may not have applied')
    return { success: false, error: 'Failed to update images - no rows affected' }
  }

  console.log(`[updatePropertyImages] Updated property ${propertyId} with ${validatedImages.length} images`)

  // Revalidate all pages that show property images
  revalidatePath('/host/properties')
  revalidatePath(`/host/properties/${propertyId}/edit`)
  if (property.slug) {
    revalidatePath(`/properties/${property.slug}`)
  }
  revalidatePath('/search')
  revalidatePath('/')
  
  return { success: true }
}

// Submit additional property for existing hosts
export async function submitAdditionalProperty(formData: FormData) {
  const supabase = await createServerClient()
  
  // Verify user is authenticated
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to submit a property' }
  }
  
  // Use admin client for inserting into property_submissions
  const adminSupabase = createAdminClient()
  
  // Get host profile info
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  // Get existing property to extract host contact info
  const { data: existingProperty } = await supabase
    .from('properties')
    .select('*')
    .eq('host_id', user.id)
    .limit(1)
    .single()
  
  // Build host info from profile and existing property
  const hostName = profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || ''
  const hostEmail = user.email || ''
  const hostPhone = existingProperty?.contact_phone || profile?.phone || ''
  const hostProfilePicture = profile?.avatar_url || user.user_metadata?.avatar_url || ''
  
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
  
  // Parse image URLs and convert share links to direct links
  const imageInput = formData.get('image_urls') as string
  const imageUrls = imageInput
    .split(/[,\n]/)
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

  // Parse amenities and experiences
  const amenities = formData.getAll('amenities') as string[]
  const experiences = formData.getAll('experiences') as string[]
  
  // Build full address object
  const fullAddress = {
    street: formData.get('street_address') as string,
    city: formData.get('city') as string,
    state: formData.get('state') as string,
    postal_code: formData.get('postal_code') as string,
    country: formData.get('country') as string || 'United States'
  }
  
  // Build capacity object
  const allowsPets = amenities.includes('Pet Friendly')
  const capacity = {
    guests: Number(formData.get('max_guests')),
    bedrooms: Number(formData.get('bedrooms')),
    beds: Number(formData.get('beds')),
    bathrooms: Number(formData.get('bathrooms')),
    allowsPets: allowsPets
  }
  
  try {
    // Insert into property_submissions with is_primary_property: false
    const { data, error } = await adminSupabase
      .from('property_submissions')
      .insert({
        host_id: user.id, // Link to existing host
        host_name: hostName,
        host_email: hostEmail,
        host_phone: hostPhone,
        host_profile_picture: hostProfilePicture || null,
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
        is_primary_property: false, // Mark as additional property
        status: 'pending'
      })
      .select()
      .single()
    
    if (error) {
      console.error('Additional property submission error:', error)
      
      if (error.code === '23505') {
        return { error: 'This property has already been submitted.' }
      }
      
      if (error.code === '23514') {
        return { error: 'Invalid data format. Please check all required fields and try again.' }
      }
      
      const errorMsg = error.message || 'Unknown error'
      return { error: `Failed to submit property: ${errorMsg.substring(0, 100)}. Please try again.` }
    }
    
    // Send email notification to admin
    const emailResult = await sendPropertySubmissionNotification({
      propertyName: data.property_name,
      hostName: hostName,
      hostEmail: hostEmail,
      submissionId: data.id
    })
    
    if (!emailResult.success) {
      console.error('[Additional Property Submission] Email failed:', emailResult.error)
    } else {
      console.log('[Additional Property Submission] Email sent successfully:', emailResult.emailId)
    }
    
    revalidatePath('/host')
    revalidatePath('/host/properties')
    
    return { success: true, submissionId: data.id }
  } catch (err) {
    console.error('Unexpected error:', err)
    return { error: 'An unexpected error occurred. Please try again.' }
  }
}
