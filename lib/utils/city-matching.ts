/**
 * City matching utilities for FIFA 2026 and other cities
 */

import type { Property } from "@/lib/types"

/**
 * Check if a property matches a given city ID
 * @param property The property to check
 * @param cityId The city ID to match against
 * @returns true if the property matches the city
 */
export function matchesCity(property: Property, cityId: string): boolean {
  if (!property.location?.city) return false

  const city = property.location.city
  const state = property.location.state || ""
  const cityLower = city.toLowerCase()

  // FIFA 2026 host city matching
  const fifaCityMatches: Record<string, boolean> = {
    "new-york-new-jersey":
      cityLower.includes("new") ||
      state === "New Jersey" ||
      city === "Brooklyn" ||
      city === "Hoboken" ||
      city === "East Rutherford" ||
      city === "Secaucus" ||
      city === "Jersey City",
    "miami-gardens":
      cityLower.includes("miami") ||
      city === "Miami Gardens" ||
      city === "Miami Beach" ||
      city === "Coral Gables" ||
      city === "Aventura" ||
      city === "Key Biscayne" ||
      city === "Coconut Grove",
    "los-angeles":
      cityLower.includes("angeles") ||
      city === "Inglewood" ||
      city === "Santa Monica" ||
      city === "Culver City" ||
      city === "Pasadena" ||
      city === "Manhattan Beach" ||
      city === "Venice",
    atlanta: city === "Atlanta" || city === "Decatur",
    boston:
      city === "Boston" ||
      city === "Foxborough" ||
      city === "Cambridge" ||
      city === "Providence",
    philadelphia: city === "Philadelphia",
    "kansas-city": city === "Kansas City",
    dallas:
      city === "Dallas" ||
      city === "Arlington" ||
      city === "Fort Worth" ||
      city === "Irving" ||
      city === "Plano",
    houston: city === "Houston",
    seattle: city === "Seattle",
    "san-francisco":
      cityLower.includes("san") ||
      city === "Santa Clara" ||
      city === "Mountain View" ||
      city === "Palo Alto" ||
      city === "Sunnyvale" ||
      city === "San Jose",
  }

  // Other popular cities
  const otherCityMatches: Record<string, boolean> = {
    austin: city === "Austin",
    chicago: city === "Chicago",
    denver: city === "Denver",
    "las-vegas": city === "Las Vegas" || cityLower.includes("vegas"),
    nashville: city === "Nashville",
    "new-orleans": city === "New Orleans",
    orlando: city === "Orlando",
    portland: city === "Portland",
    "san-diego": city === "San Diego",
    scottsdale: city === "Scottsdale" || city === "Phoenix",
  }

  return fifaCityMatches[cityId] || otherCityMatches[cityId] || false
}

/**
 * Filter properties by FIFA city ID
 * @param properties Array of properties to filter
 * @param cityId FIFA city ID to filter by
 * @returns Filtered array of properties
 */
export function filterPropertiesByCity(
  properties: Property[],
  cityId: string
): Property[] {
  return properties.filter((property) => matchesCity(property, cityId))
}

/**
 * Filter properties by multiple city IDs
 * @param properties Array of properties to filter
 * @param cityIds Array of city IDs to filter by
 * @returns Filtered array of properties
 */
export function filterPropertiesByCities(
  properties: Property[],
  cityIds: string[]
): Property[] {
  if (cityIds.length === 0) return properties

  return properties.filter((property) =>
    cityIds.some((cityId) => matchesCity(property, cityId))
  )
}
