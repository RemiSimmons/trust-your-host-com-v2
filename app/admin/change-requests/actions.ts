'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { sendPropertyChangeApprovedNotification, sendPropertyChangeRejectedNotification } from '@/lib/email/resend'

export async function approveChangeRequest(requestId: string, adminNotes?: string) {
  const supabase = createAdminClient()
  const userSupabase = await createServerClient()
  
  // Verify admin user
  const { data: { user } } = await userSupabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // Get the change request with property and host info
  const { data: request, error: fetchError } = await supabase
    .from('property_change_requests')
    .select(`
      *,
      property:properties (name, slug),
      host:profiles!property_change_requests_host_id_fkey (full_name, email)
    `)
    .eq('id', requestId)
    .eq('status', 'pending')
    .single()

  if (fetchError || !request) {
    return { success: false, error: 'Change request not found' }
  }

  // Apply the changes to the property and reactivate it
  const changes = request.requested_changes
  const updateData: any = {
    updated_at: new Date().toISOString(),
    approval_status: 'approved', // Reset to approved status
    pending_changes: null, // Clear pending changes
    is_active: true, // Reactivate property in search results
  }

  // Map requested changes to property fields
  if (changes.name) updateData.name = changes.name
  if (changes.property_type) updateData.property_type = changes.property_type
  if (changes.location) updateData.location = changes.location
  if (changes.capacity) updateData.capacity = changes.capacity
  if (changes.postal_code) updateData.postal_code = changes.postal_code

  const { error: updateError } = await supabase
    .from('properties')
    .update(updateData)
    .eq('id', request.property_id)

  if (updateError) {
    console.error('Error updating property:', updateError)
    return { success: false, error: 'Failed to update property' }
  }

  // Mark request as approved
  const { error: approveError } = await supabase
    .from('property_change_requests')
    .update({
      status: 'approved',
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
      admin_notes: adminNotes,
    })
    .eq('id', requestId)

  if (approveError) {
    return { success: false, error: 'Failed to mark as approved' }
  }

  // Send email notification to host
  if (request.host && request.property) {
    await sendPropertyChangeApprovedNotification({
      hostEmail: request.host.email,
      hostName: request.host.full_name || 'Host',
      propertyName: request.property.name,
      adminNotes: adminNotes,
    })
  }

  revalidatePath('/admin/change-requests')
  revalidatePath(`/properties/${request.property_id}`)
  revalidatePath('/search')
  revalidatePath('/host/properties')
  
  return { success: true }
}

export async function rejectChangeRequest(requestId: string, adminNotes: string) {
  const supabase = createAdminClient()
  const userSupabase = await createServerClient()
  
  // Verify admin user
  const { data: { user } } = await userSupabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  if (!adminNotes.trim()) {
    return { success: false, error: 'Admin notes required for rejection' }
  }

  // Get the change request with property and host info
  const { data: request, error: fetchError } = await supabase
    .from('property_change_requests')
    .select(`
      *,
      property:properties (name, slug),
      host:profiles!property_change_requests_host_id_fkey (full_name, email)
    `)
    .eq('id', requestId)
    .eq('status', 'pending')
    .single()

  if (fetchError || !request) {
    return { success: false, error: 'Change request not found' }
  }

  // Mark request as rejected
  const { error } = await supabase
    .from('property_change_requests')
    .update({
      status: 'rejected',
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
      admin_notes: adminNotes,
    })
    .eq('id', requestId)

  if (error) {
    return { success: false, error: 'Failed to reject request' }
  }

  // Restore property to active status and clear pending changes
  const { error: restoreError } = await supabase
    .from('properties')
    .update({
      approval_status: 'approved',
      pending_changes: null,
      is_active: true, // Reactivate property with original information
      updated_at: new Date().toISOString(),
    })
    .eq('id', request.property_id)

  if (restoreError) {
    console.error('Error restoring property status:', restoreError)
  }

  // Send email notification to host with rejection reason
  if (request.host && request.property) {
    await sendPropertyChangeRejectedNotification({
      hostEmail: request.host.email,
      hostName: request.host.full_name || 'Host',
      propertyName: request.property.name,
      adminNotes: adminNotes,
    })
  }

  revalidatePath('/admin/change-requests')
  revalidatePath('/search')
  revalidatePath('/host/properties')
  
  return { success: true }
}
