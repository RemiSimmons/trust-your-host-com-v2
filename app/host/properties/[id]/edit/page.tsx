import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getPropertyById } from '@/lib/db/properties'
import { PropertyEditForm } from '@/components/host/property-edit-form'

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic'

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/host/login')
  
  // Get property
  const property = await getPropertyById(params.id)
  
  if (!property) {
    redirect('/host/properties')
  }
  
  // Verify ownership
  if (property.host.id !== user.id) {
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
