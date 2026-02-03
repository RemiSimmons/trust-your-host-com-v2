"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFavorites } from "@/hooks/use-favorites"
import { useToast } from "@/hooks/use-toast"

interface FavoriteButtonProps {
  propertyId: string
  variant?: "card" | "header" | "icon"
  className?: string
}

export function FavoriteButton({
  propertyId,
  variant = "card",
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoading } = useFavorites()
  const { toast } = useToast()
  const [isToggling, setIsToggling] = useState(false)

  const favorited = isFavorite(propertyId)

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (isLoading || isToggling) return

    setIsToggling(true)
    const { success, error } = await toggleFavorite(propertyId)
    setIsToggling(false)

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else if (success) {
      toast({
        title: favorited ? "Removed from favorites" : "Added to favorites",
        description: favorited
          ? "Property has been removed from your saved list"
          : "Property has been saved to your favorites",
      })
    }
  }

  if (variant === "card") {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading || isToggling}
        className={cn(
          "rounded-full bg-white/20 backdrop-blur-md border border-white/30 p-2",
          "hover:bg-white/30 transition-all duration-200 shadow-lg",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-white/50",
          isToggling && "animate-pulse",
          className
        )}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "h-5 w-5 transition-colors duration-200",
            favorited ? "fill-red-500 text-red-500" : "text-white"
          )}
        />
      </button>
    )
  }

  if (variant === "header") {
    return (
      <button
        onClick={handleClick}
        disabled={isLoading || isToggling}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
          "border border-gray-200 bg-white",
          "hover:bg-gray-50 transition-colors duration-200",
          "text-sm font-medium",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "focus:outline-none focus:ring-2 focus:ring-[#2C5F7C]/50 focus:ring-offset-2",
          isToggling && "animate-pulse",
          className
        )}
        aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-colors duration-200",
            favorited ? "fill-red-500 text-red-500" : "text-gray-600"
          )}
        />
        <span>{favorited ? "Saved" : "Save"}</span>
      </button>
    )
  }

  // Icon variant
  return (
    <button
      onClick={handleClick}
      disabled={isLoading || isToggling}
      className={cn(
        "p-2 rounded-full hover:bg-gray-100 transition-colors duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-[#2C5F7C]/50",
        isToggling && "animate-pulse",
        className
      )}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-colors duration-200",
          favorited ? "fill-red-500 text-red-500" : "text-gray-600"
        )}
      />
    </button>
  )
}
