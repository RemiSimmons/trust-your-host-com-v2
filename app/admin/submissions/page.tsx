import { createServerClient } from '@/lib/supabase/server'
import { SubmissionsTable } from '@/components/admin/submissions-table'
import { redirect } from 'next/navigation'

// Force dynamic rendering - admin pages should never be pre-rendered
export const dynamic = 'force-dynamic'

export default async function AdminSubmissionsPage() {
  const supabase = await createServerClient()
  
  // Defense-in-depth: verify admin access (layout also checks, but page should too)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/host/login')
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (profile?.role !== 'admin') redirect('/')
  
  // Fetch pending submissions using admin client
  const { createAdminClient } = await import('@/lib/supabase/admin')
  const adminSupabase = createAdminClient()
  const { data: submissions } = await adminSupabase
    .from('property_submissions')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Property Submissions</h1>
        <p className="text-muted-foreground">
          Review and approve new property listings
        </p>
      </div>
      <SubmissionsTable submissions={submissions || []} />
    </div>
  )
}
