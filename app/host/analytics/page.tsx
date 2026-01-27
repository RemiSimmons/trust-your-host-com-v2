import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getHostProperties } from '@/lib/db/properties'
import { DetailedAnalytics } from '@/components/host/detailed-analytics'

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic'

export default async function HostAnalyticsPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/host/login')
  
  // Get host's properties
  const properties = await getHostProperties(user.id)
  
  if (properties.length === 0) {
    redirect('/host/properties')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold">Detailed Analytics</h1>
        <p className="text-muted-foreground">
          Deep dive into your traffic sources, visitor behavior, and conversion metrics
        </p>
      </div>
      
      <DetailedAnalytics properties={properties} />
    </div>
  )
}
