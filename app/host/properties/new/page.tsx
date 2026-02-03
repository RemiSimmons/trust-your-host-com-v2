import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AddPropertyForm } from '@/components/host/add-property-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Info, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic'

export default async function AddPropertyPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/host/login')
  
  // Get host profile information
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
  
  // Get count of existing properties to verify host status
  const { count: propertyCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('host_id', user.id)
  
  // Check if user has at least one property (is an existing host)
  const isExistingHost = (propertyCount || 0) > 0
  
  // Get first property to extract host contact info if available
  const { data: existingProperty } = await supabase
    .from('properties')
    .select('*')
    .eq('host_id', user.id)
    .limit(1)
    .single()
  
  // Build host info from profile and existing property
  const hostInfo = {
    name: profile?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || '',
    email: user.email || '',
    phone: existingProperty?.contact_phone || profile?.phone || '',
    profilePicture: profile?.avatar_url || user.user_metadata?.avatar_url || ''
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Navigation */}
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/host">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
      </Button>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold">Add New Property</h1>
        <p className="text-muted-foreground mt-2">
          Add another property to your portfolio. Your host information is already on file.
        </p>
      </div>

      {/* Host Info Preview (Read-only) */}
      <Card className="bg-muted/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Info className="h-4 w-4" />
            Your Host Profile
          </CardTitle>
          <CardDescription>
            This information will be used for your new property listing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div>
              <p className="text-muted-foreground">Name</p>
              <p className="font-medium">{hostInfo.name || 'Not set'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Email</p>
              <p className="font-medium">{hostInfo.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Phone</p>
              <p className="font-medium">{hostInfo.phone || 'Not set'}</p>
            </div>
          </div>
          {(!hostInfo.name || !hostInfo.phone) && (
            <p className="text-xs text-amber-600 mt-3">
              Missing information? You can update your profile in Settings.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Pricing Info */}
      <Alert className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription>
          <p className="font-semibold text-blue-900 dark:text-blue-100">
            Additional Property Pricing
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
            Each additional property is <strong>$39/month</strong> after your 60-day free trial.
            Your first property remains at $49/month.
          </p>
        </AlertDescription>
      </Alert>

      {/* Property Form */}
      <AddPropertyForm hostId={user.id} hostInfo={hostInfo} />
    </div>
  )
}
