"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { updateProfile } from "@/app/actions/profile"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import { ProfileImageUpload } from "@/components/host/profile-image-upload"
import { useToast } from "@/hooks/use-toast"

interface SettingsFormProps {
  user: User & { user_metadata: { full_name?: string; avatar_url?: string } }
  profileData?: { avatar_url?: string | null; full_name?: string | null }
}

export function SettingsForm({ user, profileData }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    profileData?.avatar_url || user.user_metadata.avatar_url || null
  )
  const { toast } = useToast()

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    try {
      // Add the current avatar URL to the form data
      if (avatarUrl) {
        formData.set("avatarUrl", avatarUrl)
      } else {
        formData.delete("avatarUrl")
      }
      
      await updateProfile(formData)
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Update failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const displayName = profileData?.full_name || user.user_metadata.full_name || user.email || "User"

  return (
    <div className="space-y-6">
      {/* Profile Image Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Photo</CardTitle>
          <CardDescription>
            Upload a profile photo to help hosts and guests recognize you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileImageUpload
            currentImageUrl={avatarUrl}
            userName={displayName}
            onUploadSuccess={(url) => setAvatarUrl(url)}
            onRemoveSuccess={() => setAvatarUrl(null)}
          />
        </CardContent>
      </Card>

      {/* Profile Information Section */}
      <form action={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal details and public profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  defaultValue={profileData?.full_name || user.user_metadata.full_name} 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} disabled className="bg-muted" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
