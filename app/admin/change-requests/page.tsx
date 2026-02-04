import { createAdminClient } from '@/lib/supabase/admin'
import { ChangeRequestsList } from '@/components/admin/change-requests-list'

// Force dynamic rendering - admin pages should never be pre-rendered
export const dynamic = 'force-dynamic'

export default async function AdminChangeRequestsPage() {
  const supabase = createAdminClient()
  
  // Fetch all pending change requests
  const { data: requests, error } = await supabase
    .from('property_change_requests')
    .select(`
      *,
      property:properties (
        id,
        name,
        slug,
        location,
        property_type,
        capacity
      ),
      host:profiles!property_change_requests_host_id_fkey (
        id,
        full_name,
        email
      )
    `)
    .eq('status', 'pending')
    .order('requested_at', { ascending: false })

  if (error) {
    console.error('Error fetching change requests:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
  }

  console.log('[AdminChangeRequests] Found', requests?.length || 0, 'pending requests')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Property Change Requests</h1>
        <p className="text-muted-foreground">
          Review and approve changes that require verification
        </p>
      </div>
      
      <ChangeRequestsList requests={requests || []} />
    </div>
  )
}
