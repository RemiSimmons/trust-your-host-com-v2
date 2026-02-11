import type { Property } from "@/lib/types"

/**
 * Determines if a property is a mock/sample property or a real property from the database.
 * 
 * Real properties have a host.id that is a UUID from the database join.
 * Mock properties have simple string IDs like "host1", "host2", etc., or IDs starting with 'mock-'.
 * 
 * @param property - The property to check
 * @returns true if the property is a mock/sample property, false if it's real
 */
export function isMockProperty(property: Property): boolean {
  // If no host ID exists, it's definitely mock
  if (!property.host?.id) {
    return true
  }

  const hostId = property.host.id

  // Check if it starts with 'mock-'
  if (hostId.startsWith('mock-')) {
    return true
  }

  // UUID format check: UUIDs are 36 characters with hyphens in specific positions
  // Example: "550e8400-e29b-41d4-a716-446655440000"
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  
  // If it matches UUID format, it's a real property from the database
  // If it doesn't match (e.g., "host1", "host2"), it's a mock property
  return !uuidRegex.test(hostId)
}
