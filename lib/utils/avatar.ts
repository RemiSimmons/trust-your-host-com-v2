/**
 * Generate a consistent avatar for a host
 * If no avatar URL is provided, generates a consistent avatar based on host ID
 */
export function getHostAvatar(hostId: string, avatarUrl?: string | null, hostName?: string): string {
  // If host has uploaded an avatar, use it
  if (avatarUrl && avatarUrl.trim() !== '') {
    return avatarUrl
  }
  
  // Generate a consistent avatar based on host ID
  // Use DiceBear API for consistent, nice-looking avatars
  // Alternative: use a hash of the ID to pick a consistent pravatar number
  const hash = hashString(hostId)
  const avatarNumber = (hash % 70) + 1 // pravatar has 70 avatars
  
  return `https://i.pravatar.cc/150?img=${avatarNumber}`
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  if (!name || name.trim() === '') return 'H'
  
  const parts = name.trim().split(' ')
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/**
 * Simple string hash function for consistency
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}
