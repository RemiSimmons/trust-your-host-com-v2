'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Fields that can be updated instantly without approval
export async function updatePropertyInstant(
  propertyId: string,
  data: {
    description?: string
    amenities?: string[]
    house_rules?: string
    pricing?: {
      baseNightlyRate: number
      weeklyDiscount?: number
      monthlyDiscount?: number
    }
    minimum_stay?: number
    external_booking_url?: string
    contact_email?: string
    contact_phone?: string
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
    .select('host_id')
    .eq('id', propertyId)
    .single()

  if (!property || property.host_id !== user.id) {
    return { success: false, error: 'Property not found or unauthorized' }
  }

  // Update property
  const { error } = await supabase
    .from('properties')
    .update({
      description: data.description,
      amenities: data.amenities,
      house_rules: data.house_rules,
      pricing: data.pricing,
      minimum_stay: data.minimum_stay,
      external_booking_url: data.external_booking_url,
      contact_email: data.contact_email,
      contact_phone: data.contact_phone,
      updated_at: new Date().toISOString(),
    })
    .eq('id', propertyId)

  if (error) {
    console.error('Error updating property:', error)
    return { success: false, error: 'Failed to update property' }
  }

  revalidatePath('/host/properties')
  revalidatePath(`/properties/${propertyId}`)
  
  return { success: true }
}

// Fields that require admin re-approval
export async function updatePropertyRequiresApproval(
  propertyId: string,
  data: {
    name?: string
    property_type?: string
    location?: {
      address: string
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
    .select('host_id, name, property_type, location, capacity')
    .eq('id', propertyId)
    .single()

  if (!property || property.host_id !== user.id) {
    return { success: false, error: 'Property not found or unauthorized' }
  }

  // Create a pending changes record
  const pendingChanges: any = {}
  
  if (data.name && data.name !== property.name) {
    pendingChanges.name = data.name
  }
  if (data.property_type && data.property_type !== property.property_type) {
    pendingChanges.property_type = data.property_type
  }
  if (data.location) {
    pendingChanges.location = data.location
  }
  if (data.capacity) {
    pendingChanges.capacity = data.capacity
  }

  // Store pending changes and mark property as pending approval
  const { error } = await supabase
    .from('properties')
    .update({
      pending_changes: pendingChanges,
      approval_status: 'pending_changes', // New status for properties with pending changes
      updated_at: new Date().toISOString(),
    })
    .eq('id', propertyId)

  if (error) {
    console.error('Error submitting property changes:', error)
    return { success: false, error: 'Failed to submit changes for approval' }
  }

  // TODO: Send email notification to admin about pending changes
  // await sendPendingChangesNotification({ propertyId, propertyName: property.name, changes: pendingChanges })

  revalidatePath('/host/properties')
  revalidatePath(`/properties/${propertyId}`)
  
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
