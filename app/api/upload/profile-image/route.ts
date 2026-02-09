import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      console.error("[Profile Upload] Unauthorized - no user found")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    console.log("[Profile Upload] User:", user.id, user.email)

    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      console.error("[Profile Upload] No file in request")
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    console.log("[Profile Upload] File:", file.name, file.type, `${(file.size / 1024).toFixed(2)}KB`)

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      console.error("[Profile Upload] Invalid file type:", file.type)
      return NextResponse.json(
        { error: "Invalid file type. Please upload a JPG, PNG, or WebP image." },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      console.error("[Profile Upload] File too large:", file.size)
      return NextResponse.json(
        { error: "File too large. Maximum size is 5MB." },
        { status: 400 }
      )
    }

    // Generate unique filename
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const fileName = `${user.id}/${Date.now()}.${fileExt}`
    console.log("[Profile Upload] Target path:", fileName)

    // Convert File to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = new Uint8Array(arrayBuffer)

    // Check if bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
    if (bucketsError) {
      console.error("[Profile Upload] Failed to list buckets:", bucketsError)
    } else {
      const profileBucket = buckets.find(b => b.name === "profile-images")
      if (!profileBucket) {
        console.error("[Profile Upload] CRITICAL: 'profile-images' bucket does not exist!")
        return NextResponse.json(
          { 
            error: "Storage not configured. Please contact support.",
            details: "The profile-images storage bucket needs to be created in Supabase Dashboard."
          },
          { status: 500 }
        )
      }
      console.log("[Profile Upload] Bucket found:", profileBucket.name, "public:", profileBucket.public)
    }

    // Upload to Supabase Storage
    console.log("[Profile Upload] Uploading to storage...")
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("profile-images")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) {
      console.error("[Profile Upload] Upload error:", JSON.stringify(uploadError, null, 2))
      return NextResponse.json(
        { 
          error: "Failed to upload image. Please try again.",
          details: uploadError.message 
        },
        { status: 500 }
      )
    }

    console.log("[Profile Upload] Upload successful:", uploadData.path)

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("profile-images")
      .getPublicUrl(fileName)

    const publicUrl = urlData.publicUrl
    console.log("[Profile Upload] Public URL:", publicUrl)

    // Update profiles table with new avatar URL
    console.log("[Profile Upload] Updating profiles table...")
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id)

    if (updateError) {
      console.error("[Profile Upload] Profile update error:", updateError)
      // Don't fail - the upload succeeded, just the DB update failed
      console.warn("[Profile Upload] Image uploaded but profile table update failed. Continuing...")
    } else {
      console.log("[Profile Upload] Profile table updated successfully")
    }

    // Also update Auth metadata
    console.log("[Profile Upload] Updating auth metadata...")
    const { error: authError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl },
    })

    if (authError) {
      console.error("[Profile Upload] Auth update error:", authError)
    } else {
      console.log("[Profile Upload] Auth metadata updated successfully")
    }

    console.log("[Profile Upload] Complete! Returning success response")
    
    // Revalidate pages that show the avatar
    revalidatePath("/host")
    revalidatePath("/host/settings")
    revalidatePath("/settings")
    
    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: uploadData.path,
    })
  } catch (error) {
    console.error("[Profile Upload] Unexpected error:", error)
    return NextResponse.json(
      { 
        error: "An unexpected error occurred",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

// DELETE: Remove profile image
export async function DELETE() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get current avatar URL to extract the file path
    const { data: profile } = await supabase
      .from("profiles")
      .select("avatar_url")
      .eq("id", user.id)
      .single()

    if (profile?.avatar_url && profile.avatar_url.includes("profile-images")) {
      // Extract path from URL
      const urlParts = profile.avatar_url.split("/profile-images/")
      if (urlParts[1]) {
        const filePath = urlParts[1]
        
        // Delete from storage
        await supabase.storage
          .from("profile-images")
          .remove([filePath])
      }
    }

    // Clear avatar URL in profiles table
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: null })
      .eq("id", user.id)

    if (updateError) {
      console.error("Profile update error:", updateError)
    }

    // Clear Auth metadata
    await supabase.auth.updateUser({
      data: { avatar_url: null },
    })

    return NextResponse.json({
      success: true,
      message: "Profile image removed",
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
