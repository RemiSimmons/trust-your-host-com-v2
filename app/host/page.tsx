import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PropertiesGrid } from '@/components/host/properties-grid'
import { getHostProperties } from '@/lib/db/properties'
import { getPropertyClickAnalytics } from '@/lib/db/analytics'

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic'

export default async function HostDashboardPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/host/login')
  
  // Get host's properties
  const properties = await getHostProperties(user.id)
  
  // Get analytics for each property
  const analyticsData = await Promise.all(
    properties.map(async (property) => {
      const clicks = await getPropertyClickAnalytics(property.id)
      return { property, clicks }
    })
  )
  
  // Calculate total monthly cost
  const totalMonthlyCost = properties.reduce((sum, prop, index) => {
    // First property: $49, additional: $39 each
    return sum + (index === 0 ? 49 : 39)
  }, 0)
  
  return (
    <div className="space-y-8">
      <PropertiesGrid 
        properties={analyticsData}
        totalMonthlyCost={totalMonthlyCost}
      />
    </div>
  )
}
