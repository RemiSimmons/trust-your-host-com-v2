import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getPropertyById } from '@/lib/db/properties'
import { PropertyEditForm } from '@/components/host/property-edit-form'

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic'

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  console.log('[EditPropertyPage] User:', user?.id, user?.email)
  console.log('[EditPropertyPage] Property ID:', id)
  
  if (!user) {
    console.log('[EditPropertyPage] No user, redirecting to login')
    redirect('/host/login')
  }
  
  // Get property - first try direct database query to get host_id
  const { data: dbProperty } = await supabase
    .from('properties')
    .select('id, host_id, name')
    .eq('id', id)
    .single()
  
  console.log('[EditPropertyPage] DB Property:', dbProperty)
  console.log('[EditPropertyPage] Property host_id:', dbProperty?.host_id)
  console.log('[EditPropertyPage] Current user.id:', user.id)
  console.log('[EditPropertyPage] Match:', dbProperty?.host_id === user.id)
  
  // Get full property for the form
  const property = await getPropertyById(id)
  
  if (!property) {
    console.log('[EditPropertyPage] Property not found, redirecting')
    redirect('/host/properties')
  }
  
  console.log('[EditPropertyPage] Property host.id from mapper:', property.host.id)
  
  // Verify ownership using the direct host_id from database
  if (dbProperty?.host_id !== user.id) {
    console.log('[EditPropertyPage] Ownership mismatch! host_id:', dbProperty?.host_id, 'user.id:', user.id)
    redirect('/host/properties')
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Edit Property</h1>
        <p className="text-muted-foreground">
          Update your property details. Some changes require admin re-approval.
        </p>
      </div>
      
      <PropertyEditForm property={property} />
    </div>
  )
}
