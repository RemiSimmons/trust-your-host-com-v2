'use server'

import { createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export async function deleteMyAccount() {
  const supabase = await createServerClient()
  
  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return { error: 'Not authenticated' }
  }

  const adminClient = createAdminClient()

  try {
    // Delete all related data first (in order of dependencies)
    
    // Clear any reviewed_by references
    await adminClient
      .from('property_submissions')
      .update({ reviewed_by: null })
      .eq('reviewed_by', user.id)

    // Delete property submissions by this user
    await adminClient
      .from('property_submissions')
      .delete()
      .eq('host_email', user.email)

    // Delete bookings
    await adminClient
      .from('bookings')
      .delete()
      .eq('user_id', user.id)

    // Delete reviews
    await adminClient
      .from('reviews')
      .delete()
      .eq('user_id', user.id)

    // Delete properties (this cascades to clicks and analytics)
    await adminClient
      .from('properties')
      .delete()
      .eq('host_id', user.id)

    // Delete profile
    await adminClient
      .from('profiles')
      .delete()
      .eq('id', user.id)

    // Finally, delete the auth user (this handles sessions, tokens, identities)
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(user.id)

    if (deleteError) {
      console.error('Error deleting auth user:', deleteError)
      return { error: 'Failed to delete account: ' + deleteError.message }
    }

    // Sign out locally
    await supabase.auth.signOut()

  } catch (error) {
    console.error('Error during account deletion:', error)
    return { error: 'Failed to delete account' }
  }

  redirect('/?deleted=true')
}

export async function adminDeleteUser(userId: string) {
  const supabase = await createServerClient()
  
  // Verify caller is admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') {
    return { error: 'Unauthorized - Admin only' }
  }

  const adminClient = createAdminClient()

  try {
    // Get user email for property_submissions cleanup
    const { data: targetUser } = await adminClient.auth.admin.getUserById(userId)
    const targetEmail = targetUser?.user?.email

    // Clear reviewed_by references
    await adminClient
      .from('property_submissions')
      .update({ reviewed_by: null })
      .eq('reviewed_by', userId)

    // Delete property submissions
    if (targetEmail) {
      await adminClient
        .from('property_submissions')
        .delete()
        .eq('host_email', targetEmail)
    }

    // Delete all related data
    await adminClient.from('bookings').delete().eq('user_id', userId)
    await adminClient.from('reviews').delete().eq('user_id', userId)
    await adminClient.from('properties').delete().eq('host_id', userId)
    await adminClient.from('profiles').delete().eq('id', userId)

    // Delete auth user
    const { error } = await adminClient.auth.admin.deleteUser(userId)
    
    if (error) {
      return { error: 'Failed to delete user: ' + error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Admin delete user error:', error)
    return { error: 'Failed to delete user' }
  }
}
