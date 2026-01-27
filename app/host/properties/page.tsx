import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getHostProperties } from '@/lib/db/properties'
import { PropertiesListClient } from '@/components/host/properties-list-client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic'

export default async function HostPropertiesPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/host/login')
  
  // Get host's properties
  const properties = await getHostProperties(user.id)
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">My Properties</h1>
          <p className="text-muted-foreground">
            Manage your property listings and settings
          </p>
        </div>
        <Button asChild>
          <Link href="/submit-property">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>
      
      <PropertiesListClient properties={properties} />
    </div>
  )
}
