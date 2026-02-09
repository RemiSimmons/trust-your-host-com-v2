'use server'

import { createServerClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Upload a property image using the admin client (bypasses RLS).
 * Validates that the user is authenticated and either:
 *   - Owns the property (for existing properties), or
 *   - Is uploading to the submissions folder (for new submissions)
 * 
 * Accepts a FormData with:
 *   - file: the image file
 *   - propertyId: the property ID (or 'submissions' for new submissions)
 */
export async function uploadPropertyImage(formData: FormData) {
  const file = formData.get('file') as File
  const propertyId = formData.get('propertyId') as string
  const isSubmission = propertyId === 'submissions'

  if (!file || !propertyId) {
    return { success: false, error: 'Missing file or property ID' }
  }

  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!validTypes.includes(file.type)) {
    return { success: false, error: `Invalid file type: ${file.name}. Only JPG, PNG, and WebP are allowed.` }
  }

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    return { success: false, error: `File too large: ${file.name}. Maximum size is 5MB.` }
  }

  // Verify user is authenticated
  const supabase = await createServerClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return { success: false, error: 'You must be logged in to upload images.' }
  }

  // If uploading to an existing property, verify ownership
  if (!isSubmission) {
    const { data: property, error: fetchError } = await supabase
      .from('properties')
      .select('host_id')
      .eq('id', propertyId)
      .single()

    if (fetchError || !property) {
      return { success: false, error: 'Property not found.' }
    }

    if (property.host_id !== user.id) {
      // Also check if user is admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        return { success: false, error: 'You do not have permission to upload images to this property.' }
      }
    }
  }

  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const folder = isSubmission ? 'submissions' : propertyId
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

  // Use admin client to upload (bypasses RLS)
  const adminSupabase = createAdminClient()

  // Convert File to ArrayBuffer for server-side upload
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { data, error: uploadError } = await adminSupabase.storage
    .from('property-images')
    .upload(fileName, buffer, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    console.error('[uploadPropertyImage] Upload error:', uploadError)
    return { success: false, error: `Failed to upload ${file.name}: ${uploadError.message}` }
  }

  // Get public URL
  const { data: { publicUrl } } = adminSupabase.storage
    .from('property-images')
    .getPublicUrl(data.path)

  console.log(`[uploadPropertyImage] Uploaded successfully: ${publicUrl}`)
  return { success: true, url: publicUrl }
}

/**
 * Delete a property image using the admin client (bypasses RLS).
 * Validates ownership before deleting.
 */
export async function deletePropertyImage(imageUrl: string, propertyId: string) {
  const isSubmission = propertyId === 'submissions'

  // Verify user is authenticated
  const supabase = await createServerClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return { success: false, error: 'You must be logged in to delete images.' }
  }

  // If deleting from an existing property, verify ownership
  if (!isSubmission) {
    const { data: property } = await supabase
      .from('properties')
      .select('host_id')
      .eq('id', propertyId)
      .single()

    if (!property || property.host_id !== user.id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (!profile || profile.role !== 'admin') {
        return { success: false, error: 'You do not have permission to delete this image.' }
      }
    }
  }

  // Extract file path from URL
  if (!imageUrl.includes('/property-images/')) {
    // Not a Supabase storage URL, just return success (remove from UI only)
    return { success: true }
  }

  const urlParts = imageUrl.split('/property-images/')
  if (urlParts.length !== 2) {
    return { success: true } // Can't parse URL, just remove from UI
  }

  const filePath = decodeURIComponent(urlParts[1])

  // Use admin client to delete (bypasses RLS)
  const adminSupabase = createAdminClient()

  const { error: deleteError } = await adminSupabase.storage
    .from('property-images')
    .remove([filePath])

  if (deleteError) {
    console.error('[deletePropertyImage] Delete error:', deleteError)
    // Don't fail hard - the image might have already been deleted
    return { success: true }
  }

  console.log(`[deletePropertyImage] Deleted successfully: ${filePath}`)
  return { success: true }
}
