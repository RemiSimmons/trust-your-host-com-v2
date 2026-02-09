/**
 * Simple in-memory rate limiter using IP/identifier tracking
 * 
 * This is a basic rate limiter suitable for single-server deployments.
 * For production at scale, consider using Redis-based rate limiting.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key)
    }
  }
}, 5 * 60 * 1000)

export interface RateLimitConfig {
  /** Unique identifier (usually IP address) */
  identifier: string
  /** Maximum number of requests allowed in the window */
  limit: number
  /** Time window in seconds */
  windowSeconds: number
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  success: boolean
  /** Number of requests remaining in current window */
  remaining: number
  /** Timestamp when the limit resets (Unix timestamp in ms) */
  resetAt: number
  /** Optional error message if rate limited */
  error?: string
}

/**
 * Check if a request should be rate limited
 * 
 * @example
 * ```ts
 * const result = rateLimit({
 *   identifier: request.ip || 'unknown',
 *   limit: 10,
 *   windowSeconds: 60
 * })
 * 
 * if (!result.success) {
 *   return NextResponse.json({ error: result.error }, { status: 429 })
 * }
 * ```
 */
export function rateLimit(config: RateLimitConfig): RateLimitResult {
  const { identifier, limit, windowSeconds } = config
  const now = Date.now()
  const windowMs = windowSeconds * 1000
  
  const entry = rateLimitStore.get(identifier)
  
  // No existing entry or entry has expired
  if (!entry || entry.resetAt < now) {
    const resetAt = now + windowMs
    rateLimitStore.set(identifier, { count: 1, resetAt })
    return {
      success: true,
      remaining: limit - 1,
      resetAt,
    }
  }
  
  // Entry exists and is still valid
  if (entry.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: entry.resetAt,
      error: `Rate limit exceeded. Try again in ${Math.ceil((entry.resetAt - now) / 1000)} seconds.`,
    }
  }
  
  // Increment count
  entry.count++
  rateLimitStore.set(identifier, entry)
  
  return {
    success: true,
    remaining: limit - entry.count,
    resetAt: entry.resetAt,
  }
}

/**
 * Get client identifier from request (IP address)
 * Checks common headers for proxy/CDN scenarios
 */
export function getClientIdentifier(request: Request): string {
  // Try various headers in order of preference
  const headers = new Headers(request.headers)
  
  // Cloudflare
  const cfConnectingIp = headers.get('cf-connecting-ip')
  if (cfConnectingIp) return cfConnectingIp
  
  // Common proxy headers
  const xForwardedFor = headers.get('x-forwarded-for')
  if (xForwardedFor) {
    // Take the first IP in the list
    return xForwardedFor.split(',')[0].trim()
  }
  
  const xRealIp = headers.get('x-real-ip')
  if (xRealIp) return xRealIp
  
  // Vercel-specific
  const vercelIp = headers.get('x-vercel-forwarded-for')
  if (vercelIp) return vercelIp.split(',')[0].trim()
  
  // Fallback
  return 'unknown'
}
