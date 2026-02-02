'use server'

import { createServerClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe'
import { sendPropertyApprovedNotification } from '@/lib/email/resend'
import { revalidatePath } from 'next/cache'

export async function approvePropertySubmission(submissionId: string) {
  const supabase = await createServerClient()
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const adminSupabase = createAdminClient()
  
  // Get submission details
  const { data: submission, error: submissionError } = await adminSupabase
    .from('property_submissions')
    .select('*')
    .eq('id', submissionId)
    .single()
  
  if (submissionError || !submission) {
    console.error('Error fetching submission:', submissionError)
    return { error: 'Submission not found' }
  }
  
  // Check if host profile exists using admin client
  const { data: existingProfile } = await adminSupabase
    .from('profiles')
    .select('*')
    .eq('email', submission.host_email)
    .single()
  
  let hostId = existingProfile?.id
  
  // Create new host account if doesn't exist
  if (!hostId) {
    const { data: newUser, error: authError } = await adminSupabase.auth.admin.createUser({
      email: submission.host_email,
      email_confirm: true,
      user_metadata: {
        full_name: submission.host_name,
        phone: submission.host_phone
      }
    })
    
    if (authError || !newUser) {
      return { error: 'Failed to create host account' }
    }
    
    hostId = newUser.user.id
    
    // Update profile with role and phone using admin client
    await adminSupabase
      .from('profiles')
      .update({ 
        role: 'host',
        phone: submission.host_phone 
      })
      .eq('id', hostId)
  }
  
  // Check if this is host's first property (for volume pricing)
  const { data: existingProperties } = await adminSupabase
    .from('properties')
    .select('id')
    .eq('host_id', hostId)
  
  const isFirstProperty = !existingProperties || existingProperties.length === 0
  const monthlyAmount = isFirstProperty ? 49.00 : 39.00
  
  // NOTE: Stripe customer and subscription will be created when host sets up billing
  // This allows approved hosts to set up payment on their own timeline
  
  // Generate unique slug
  const baseSlug = submission.property_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  let slug = baseSlug
  let counter = 1
  
  // Check if slug exists and append number if needed using admin client
  while (true) {
    const { data: existing } = await adminSupabase
      .from('properties')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (!existing) break
    slug = `${baseSlug}-${counter}`
    counter++
  }
  
  // Create property in properties table using admin client
  const { data: property, error: propertyError } = await adminSupabase
    .from('properties')
    .insert({
      host_id: hostId,
      name: submission.property_name,
      slug: slug,
      external_booking_url: submission.external_booking_url,
      location: {
        city: submission.city,
        state: submission.state,
        country: submission.country,
        coordinates: { lat: 0, lng: 0 },
        region: submission.state || submission.city
      },
      images: submission.image_urls,
      experiences: submission.experiences,
      property_type: submission.property_type,
      pricing: {
        baseNightlyRate: submission.nightly_rate_min,
        currency: 'USD',
        minStay: 1
      },
      capacity: {
        guests: submission.max_guests,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        allowsPets: submission.amenities?.includes('Pet Friendly') || false
      },
      amenities: submission.amenities || [],
      description: {
        short: submission.description.substring(0, 200),
        full: submission.description
      },
      subscription_status: 'pending_payment', // Will be updated when billing is set up
      trial_ends_at: null, // Will be set when billing is configured
      stripe_subscription_id: null, // Will be set by Stripe webhook
      stripe_customer_id: null, // Will be set by Stripe webhook
      is_fifa_2026: submission.available_for_fifa_2026,
      verified: true,
      featured: false,
      // Multi-property pricing
      is_primary_property: isFirstProperty,
      monthly_amount: monthlyAmount,
      // Address fields
      street_address: submission.street_address,
      postal_code: submission.postal_code,
      full_address: submission.full_address,
      listed_on_platforms: submission.listed_on_platforms,
      other_platforms: submission.other_platforms,
      typical_response_hours: submission.typical_response_hours
    })
    .select()
    .single()
  
  if (propertyError) {
    return { error: 'Failed to create property listing' }
  }
  
  // Update submission status using admin client
  const { error: updateError } = await adminSupabase
    .from('property_submissions')
    .update({
      status: 'approved',
      reviewed_by: (await supabase.auth.getUser()).data.user?.id,
      reviewed_at: new Date().toISOString()
    })
    .eq('id', submissionId)
  
  if (updateError) {
    console.error('Error updating submission status:', updateError)
    return { error: 'Failed to update submission status' }
  }
  
  // Send approval notification with billing setup link
  // The login URL includes redirectTo param to send hosts directly to billing after auth
  await sendPropertyApprovedNotification({
    email: submission.host_email,
    name: submission.host_name,
    propertyName: submission.property_name,
    loginUrl: `${process.env.NEXT_PUBLIC_APP_URL}/host/login?redirectTo=/host/billing`,
    billingSetupUrl: `${process.env.NEXT_PUBLIC_APP_URL}/host/billing`
  })
  
  revalidatePath('/admin/submissions')
  return { success: true, propertyId: property.id }
}

export async function rejectPropertySubmission(
  submissionId: string,
  reason: string
) {
  const supabase = await createServerClient()
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const adminSupabase = createAdminClient()
  
  const { error: updateError } = await adminSupabase
    .from('property_submissions')
    .update({
      status: 'rejected',
      rejection_reason: reason,
      reviewed_by: (await supabase.auth.getUser()).data.user?.id,
      reviewed_at: new Date().toISOString()
    })
    .eq('id', submissionId)
  
  if (updateError) {
    console.error('Error rejecting submission:', updateError)
    return { error: 'Failed to reject submission' }
  }
  
  revalidatePath('/admin/submissions')
  return { success: true }
}
