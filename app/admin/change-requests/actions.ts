'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function approveChangeRequest(requestId: string, adminNotes?: string) {
  const supabase = createAdminClient()
  const userSupabase = await createServerClient()
  
  // Verify admin user
  const { data: { user } } = await userSupabase.auth.getUser()
  if (!user) {
    return { success: false, error: 'Unauthorized' }
  }

  // Get the change request
  const { data: request, error: fetchError } = await supabase
    .from('property_change_requests')
    .select('*')
    .eq('id', requestId)
    .eq('status', 'pending')
    .single()

  if (fetchError || !request) {
    return { success: false, error: 'Change request not found' }
  }

  // Apply the changes to the property
  const changes = request.requested_changes
  const updateData: any = {
    updated_at: new Date().toISOString(),
  }

  // Map requested changes to property fields
  if (changes.name) updateData.name = changes.name
  if (changes.property_type) updateData.property_type = changes.property_type
  if (changes.location) updateData.location = changes.location
  if (changes.capacity) updateData.capacity = changes.capacity

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

  // TODO: Send email notification to host
  // await sendChangeRequestApprovedEmail(request.host_id, request.property_id)

  revalidatePath('/admin/change-requests')
  revalidatePath(`/properties/${request.property_id}`)
  
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

  // Get the change request
  const { data: request, error: fetchError } = await supabase
    .from('property_change_requests')
    .select('*')
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

  // TODO: Send email notification to host with rejection reason
  // await sendChangeRequestRejectedEmail(request.host_id, request.property_id, adminNotes)

  revalidatePath('/admin/change-requests')
  
  return { success: true }
}
