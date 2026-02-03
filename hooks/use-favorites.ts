"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { createBrowserClient } from "@/lib/supabase/client"

interface UseFavoritesReturn {
  favorites: Set<string>
  isLoading: boolean
  isFavorite: (propertyId: string) => boolean
  toggleFavorite: (propertyId: string) => Promise<{ success: boolean; error?: string }>
  refreshFavorites: () => Promise<void>
}

export function useFavorites(): UseFavoritesReturn {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  const supabase = useMemo(() => createBrowserClient(), [])

  // Fetch user and favorites on mount
  useEffect(() => {
    async function init() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          setUserId(user.id)
          await fetchFavorites(user.id)
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Error initializing favorites:", error)
        setIsLoading(false)
      }
    }

    init()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        setUserId(session.user.id)
        await fetchFavorites(session.user.id)
      } else if (event === "SIGNED_OUT") {
        setUserId(null)
        setFavorites(new Set())
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  const fetchFavorites = async (uid: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("property_id")
        .eq("user_id", uid)

      if (error) {
        console.error("Error fetching favorites:", error)
        return
      }

      const favoriteIds = new Set(data?.map((f: { property_id: string }) => f.property_id) || [])
      setFavorites(favoriteIds)
    } catch (error) {
      console.error("Error fetching favorites:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshFavorites = useCallback(async () => {
    if (userId) {
      await fetchFavorites(userId)
    }
  }, [userId])

  const isFavorite = useCallback((propertyId: string) => {
    return favorites.has(propertyId)
  }, [favorites])

  const toggleFavorite = useCallback(async (propertyId: string): Promise<{ success: boolean; error?: string }> => {
    if (!userId) {
      return { success: false, error: "Please sign in to save favorites" }
    }

    const currentlyFavorited = favorites.has(propertyId)

    // Optimistic update
    setFavorites((prev) => {
      const next = new Set(prev)
      if (currentlyFavorited) {
        next.delete(propertyId)
      } else {
        next.add(propertyId)
      }
      return next
    })

    try {
      if (currentlyFavorited) {
        // Remove favorite
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("property_id", propertyId)

        if (error) {
          // Revert optimistic update
          setFavorites((prev) => {
            const next = new Set(prev)
            next.add(propertyId)
            return next
          })
          console.error("Error removing favorite:", error)
          return { success: false, error: "Failed to remove from favorites" }
        }
      } else {
        // Add favorite
        const { error } = await supabase
          .from("favorites")
          .insert({
            user_id: userId,
            property_id: propertyId,
          })

        if (error) {
          // Revert optimistic update
          setFavorites((prev) => {
            const next = new Set(prev)
            next.delete(propertyId)
            return next
          })
          console.error("Error adding favorite:", error)
          return { success: false, error: "Failed to add to favorites" }
        }
      }

      return { success: true }
    } catch (error) {
      // Revert optimistic update
      setFavorites((prev) => {
        const next = new Set(prev)
        if (currentlyFavorited) {
          next.add(propertyId)
        } else {
          next.delete(propertyId)
        }
        return next
      })
      console.error("Error toggling favorite:", error)
      return { success: false, error: "An unexpected error occurred" }
    }
  }, [userId, favorites, supabase])

  return {
    favorites,
    isLoading,
    isFavorite,
    toggleFavorite,
    refreshFavorites,
  }
}
