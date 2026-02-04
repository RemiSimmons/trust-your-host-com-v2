/**
 * Generate a consistent avatar for a host
 * If no avatar URL is provided, generates an SVG with initials
 */
export function getHostAvatar(hostId: string, avatarUrl?: string | null, hostName?: string): string {
  // If host has uploaded an avatar, use it
  if (avatarUrl && avatarUrl.trim() !== '') {
    return avatarUrl
  }
  
  // Generate initials-based avatar
  const initials = getInitials(hostName || 'Host')
  const hash = hashString(hostId)
  
  // Generate consistent colors based on host ID
  const colors = [
    { bg: '#FF6B35', text: '#FFFFFF' }, // Orange
    { bg: '#4A90E2', text: '#FFFFFF' }, // Blue
    { bg: '#50C878', text: '#FFFFFF' }, // Green
    { bg: '#9B59B6', text: '#FFFFFF' }, // Purple
    { bg: '#E74C3C', text: '#FFFFFF' }, // Red
    { bg: '#F39C12', text: '#FFFFFF' }, // Yellow
    { bg: '#1ABC9C', text: '#FFFFFF' }, // Teal
    { bg: '#34495E', text: '#FFFFFF' }, // Dark Gray
  ]
  
  const colorIndex = hash % colors.length
  const { bg, text } = colors[colorIndex]
  
  // Create SVG data URL with initials
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <rect width="100" height="100" fill="${bg}"/>
      <text
        x="50"
        y="50"
        font-family="system-ui, -apple-system, sans-serif"
        font-size="40"
        font-weight="600"
        fill="${text}"
        text-anchor="middle"
        dominant-baseline="central"
      >${initials}</text>
    </svg>
  `.trim()
  
  // Encode SVG as data URL
  const encoded = encodeURIComponent(svg)
  return `data:image/svg+xml,${encoded}`
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
