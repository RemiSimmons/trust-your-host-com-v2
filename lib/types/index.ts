// Import shared constants to ensure consistency across the app
import { EXPERIENCE_CATEGORIES as SHARED_EXPERIENCE_CATEGORIES, PROPERTY_TYPES } from "@/lib/data/property-constants"

// Export for backwards compatibility
export const EXPERIENCE_CATEGORIES = SHARED_EXPERIENCE_CATEGORIES
export type ExperienceCategory = (typeof EXPERIENCE_CATEGORIES)[number]
export type PropertyTypeValue = keyof typeof PROPERTY_TYPES

export interface FilterState {
  experience: string
  guests: number
  priceRange: [number, number]
  propertyTypes: string[]
  bookingPlatform: string[]
  locationRadius: string
  specificFilters: string[]
  amenities: string[]
}

export interface Property {
  id: string
  name: string
  slug: string

  location: {
    city: string
    state: string
    country: string
    coordinates: { lat: number; lng: number }
    region: string
  }

  images: string[]
  experiences: ExperienceCategory[]
  propertyType: PropertyTypeValue

  pricing: {
    baseNightlyRate: number
    currency: "USD"
    cleaningFee?: number
    minStay: number
    weeklyDiscount?: number
    monthlyDiscount?: number
  }

  capacity: {
    guests: number
    bedrooms: number
    beds: number
    bathrooms: number
    allowsPets: boolean
  }

  amenities: string[]
  quickHighlights: string[]

  description: string | {
    short: string
    full: string
  }
  
  house_rules?: string
  standard_house_rules?: string[]

  rating: {
    average: number
    count: number
  }

  host: {
    id: string
    name: string
    photo: string
    verified: boolean
    rating: number
    responseTime: string
  }

  verified: boolean
  featured: boolean
  
  // Directory model additions
  external_booking_url?: string
  subscription_status?: string
  trial_ends_at?: string
  total_clicks?: number
  is_fifa_2026?: boolean
  
  // Trust system badges
  verified_badge?: boolean // Admin manually verified
  fifa_featured?: boolean // Editorial FIFA 2026 feature
  quick_response_host?: boolean // Fast response time
  distance_to_stadium?: number // Miles to nearest stadium
  weekly_views?: number // Views in past 7 days
  last_response_time?: number // Minutes to respond
  host_response_rate?: number // Response rate percentage
  
  // Enhanced address and host information
  street_address?: string
  postal_code?: string
  full_address?: {
    street: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  listed_on_platforms?: string[] // Platforms host currently lists on
  other_platforms?: string // Other platforms (freeform text)
  typical_response_hours?: number // Expected response time in hours
  
  // Additional host editable fields
  contact_email?: string
  contact_phone?: string
  minimum_stay?: number
  approval_status?: string
  pending_changes?: Record<string, any>
}

export interface Booking {
  id: string
  propertyId: string
  propertyName: string
  propertyImage: string
  userId: string
  guestName: string
  guestEmail: string
  guestAvatar: string
  startDate: string
  endDate: string
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  guests: number
  createdAt: string
}

export interface Conversation {
  id: string
  guestId: string
  hostId: string
  propertyId: string
  otherUser: {
    id: string
    name: string
    avatar: string
  }
  property: {
    name: string
    image: string
  }
  lastMessage?: {
    content: string
    createdAt: string
    read: boolean
    senderId: string
  }
  updatedAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  content: string
  read: boolean
  createdAt: string
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: "super_admin" | "admin" | "moderator" | "support"
  permissions: string[]
  avatar: string
  status: "active" | "inactive" | "suspended"
  createdAt: string
  lastActive: string
}

export interface AgentWorkflow {
  id: string
  name: string
  type:
    | "messaging"
    | "scheduling"
    | "inventory"
    | "vendor"
    | "pricing"
    | "analytics"
    | "issue_resolution"
    | "multi_property"
  status: "active" | "paused" | "error" | "configuring"
  version: string
  lastRun?: string
  successRate: number
  tasksCompleted: number
  configuration: Record<string, any>
}

export interface AdminTask {
  id: string
  title: string
  description: string
  type: "user_report" | "content_moderation" | "system_alert" | "workflow_error" | "manual_review"
  priority: "low" | "medium" | "high" | "urgent"
  status: "pending" | "in_progress" | "completed" | "escalated"
  assignedTo?: string
  createdAt: string
  updatedAt: string
  metadata: Record<string, any>
}

export interface PlatformMetrics {
  users: {
    total: number
    active: number
    new: number
    churnRate: number
  }
  properties: {
    total: number
    active: number
    pending: number
  }
  bookings: {
    total: number
    pending: number
    confirmed: number
    revenue: number
  }
  workflows: {
    totalExecutions: number
    successRate: number
    errorRate: number
  }
}

// Article/Content Types
export type ArticleCategory = "insights" | "guides" | "journal" | "resources"

export interface ArticleAuthor {
  name: string
  avatar: string
  role?: string
  bio?: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string // Markdown content
  category: ArticleCategory
  tags: string[]
  featuredImage: string
  author: ArticleAuthor
  publishedAt: string
  updatedAt?: string
  readingTime: number // minutes
  featured?: boolean
  
  // Category-specific fields
  // For guides
  city?: string
  region?: string
  relatedProperties?: string[] // property IDs
  
  // For insights
  insightType?: "industry" | "tips" | "trends" | "case-study"
  
  // For journal
  guestName?: string
  tripDestination?: string
}
