'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Award, Zap, MapPin, Eye, Loader2 } from 'lucide-react'

interface TrustBadgeEditorProps {
  propertyId: string
  currentBadges: {
    verified_badge?: boolean
    fifa_featured?: boolean
    quick_response_host?: boolean
    distance_to_stadium?: number
    weekly_views?: number
  }
  onUpdate?: () => void
}

export function TrustBadgeEditor({ propertyId, currentBadges, onUpdate }: TrustBadgeEditorProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [badges, setBadges] = useState(currentBadges)

  async function handleUpdate() {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/admin/properties/${propertyId}/badges`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(badges)
      })

      if (!response.ok) throw new Error('Failed to update badges')

      alert('Trust badges updated successfully!')
      onUpdate?.()
    } catch (error) {
      console.error('Error updating badges:', error)
      alert('Failed to update badges. Please try again.')
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5" />
          Trust Badges
        </CardTitle>
        <CardDescription>
          Manage trust signals to help guests feel confident about this property
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Verified Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Check className="h-5 w-5 text-green-600" />
            <div>
              <Label htmlFor="verified_badge" className="font-semibold">
                Verified Badge
              </Label>
              <p className="text-sm text-muted-foreground">
                You've manually verified this property's details
              </p>
            </div>
          </div>
          <Switch
            id="verified_badge"
            checked={badges.verified_badge || false}
            onCheckedChange={(checked) => 
              setBadges({ ...badges, verified_badge: checked })
            }
          />
        </div>

        {/* FIFA Featured */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🏆</span>
            <div>
              <Label htmlFor="fifa_featured" className="font-semibold">
                FIFA 2026 Featured
              </Label>
              <p className="text-sm text-muted-foreground">
                Editorial selection for FIFA World Cup 2026
              </p>
            </div>
          </div>
          <Switch
            id="fifa_featured"
            checked={badges.fifa_featured || false}
            onCheckedChange={(checked) => 
              setBadges({ ...badges, fifa_featured: checked })
            }
          />
        </div>

        {/* Quick Response Host */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-blue-600" />
            <div>
              <Label htmlFor="quick_response_host" className="font-semibold">
                Quick Response Host
              </Label>
              <p className="text-sm text-muted-foreground">
                Host typically responds within 1 hour
              </p>
            </div>
          </div>
          <Switch
            id="quick_response_host"
            checked={badges.quick_response_host || false}
            onCheckedChange={(checked) => 
              setBadges({ ...badges, quick_response_host: checked })
            }
          />
        </div>

        {/* Distance to Stadium */}
        <div className="space-y-2">
          <Label htmlFor="distance_to_stadium" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Distance to Nearest FIFA Stadium (miles)
          </Label>
          <Input
            id="distance_to_stadium"
            type="number"
            step="0.1"
            min="0"
            placeholder="e.g., 0.5"
            value={badges.distance_to_stadium || ''}
            onChange={(e) => 
              setBadges({ 
                ...badges, 
                distance_to_stadium: e.target.value ? parseFloat(e.target.value) : undefined 
              })
            }
          />
          <p className="text-xs text-muted-foreground">
            Leave empty if not near a FIFA stadium
          </p>
        </div>

        {/* Weekly Views (Read-only) */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Weekly Views (Auto-calculated)
          </Label>
          <div className="px-3 py-2 bg-muted rounded-md text-sm">
            {badges.weekly_views || 0} views this week
          </div>
          <p className="text-xs text-muted-foreground">
            Automatically updated from click tracking data
          </p>
        </div>

        {/* Update Button */}
        <div className="pt-4 border-t">
          <Button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="w-full"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Update Trust Badges
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
