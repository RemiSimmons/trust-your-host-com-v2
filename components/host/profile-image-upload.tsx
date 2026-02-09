"use client"

import { useState, useRef } from "react"
import { Upload, X, Download, Loader2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

interface ProfileImageUploadProps {
  currentImageUrl?: string | null
  userName?: string
  onUploadSuccess?: (url: string) => void
  onRemoveSuccess?: () => void
}

export function ProfileImageUpload({
  currentImageUrl,
  userName = "User",
  onUploadSuccess,
  onRemoveSuccess,
}: ProfileImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(currentImageUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "Invalid file type. Please upload a JPG, PNG, or WebP image."
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File too large. Maximum size is 5MB."
    }
    return null
  }

  const uploadFile = async (file: File) => {
    const error = validateFile(file)
    if (error) {
      toast({
        title: "Invalid file",
        description: error,
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      console.log("[Client] Uploading file:", file.name, file.type, `${(file.size / 1024).toFixed(2)}KB`)

      const response = await fetch("/api/upload/profile-image", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("[Client] Upload failed:", response.status, data)
        
        // Show more specific error messages
        if (response.status === 500 && data.details?.includes("bucket")) {
          throw new Error(
            "Storage is not set up yet. Please ask an administrator to create the 'profile-images' bucket in Supabase."
          )
        }
        
        throw new Error(data.error || data.details || "Upload failed")
      }

      console.log("[Client] Upload successful:", data.url)
      setImageUrl(data.url)
      onUploadSuccess?.(data.url)

      toast({
        title: "Image uploaded",
        description: "Your profile image has been updated successfully.",
      })
    } catch (error) {
      console.error("[Client] Upload error:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      uploadFile(file)
    }
    // Reset input so the same file can be selected again
    e.target.value = ""
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }

  const handleRemove = async () => {
    setIsRemoving(true)

    try {
      const response = await fetch("/api/upload/profile-image", {
        method: "DELETE",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to remove image")
      }

      setImageUrl(null)
      onRemoveSuccess?.()

      toast({
        title: "Image removed",
        description: "Your profile image has been removed.",
      })
    } catch (error) {
      console.error("Remove error:", error)
      toast({
        title: "Failed to remove",
        description: error instanceof Error ? error.message : "Failed to remove image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRemoving(false)
    }
  }

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a")
      link.href = imageUrl
      link.download = `profile-image.${imageUrl.split(".").pop() || "jpg"}`
      link.target = "_blank"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-6">
        {/* Avatar Preview */}
        <div className="relative group">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            <AvatarImage src={imageUrl || undefined} />
            <AvatarFallback className="text-2xl bg-accent/10 text-accent">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          {/* Upload overlay on hover */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          >
            {isUploading ? (
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            ) : (
              <Camera className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Upload Area */}
        <div className="flex-1 space-y-3">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={cn(
              "border-2 border-dashed rounded-lg p-4 text-center transition-colors",
              dragActive
                ? "border-accent bg-accent/5"
                : "border-gray-200 hover:border-gray-300",
              isUploading && "opacity-50 pointer-events-none"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="space-y-2">
              <Upload className="h-8 w-8 mx-auto text-gray-400" />
              <div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="text-accent hover:underline font-medium"
                >
                  Click to upload
                </button>
                <span className="text-gray-500"> or drag and drop</span>
              </div>
              <p className="text-xs text-gray-400">
                JPG, PNG, or WebP (max 5MB)
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {imageUrl && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemove}
                disabled={isRemoving}
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                {isRemoving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
