/**
 * Zip Code to Coordinates Utility
 * Maps zip codes to their center coordinates for privacy-conscious map display
 */

import type { Property } from "@/lib/types"
import { fifaCities } from "@/lib/data/fifa-cities"

/**
 * Lookup map of US zip codes to their center coordinates
 * This is a curated subset of zip codes we actually serve
 * Add more zip codes as properties are added in new areas
 */
const ZIP_COORDINATES: Record<string, { lat: number; lng: number }> = {
  // Atlanta area
  "30301": { lat: 33.7490, lng: -84.3880 },
  "30302": { lat: 33.7550, lng: -84.3900 },
  "30303": { lat: 33.7490, lng: -84.3880 },
  "30304": { lat: 33.7730, lng: -84.3940 },
  "30305": { lat: 33.8400, lng: -84.3830 },
  "30306": { lat: 33.7850, lng: -84.3520 },
  "30307": { lat: 33.7640, lng: -84.3370 },
  "30308": { lat: 33.7710, lng: -84.3750 },
  "30309": { lat: 33.7880, lng: -84.3850 },
  "30310": { lat: 33.7320, lng: -84.4260 },
  
  // Miami area
  "33101": { lat: 25.7743, lng: -80.1937 },
  "33109": { lat: 25.7617, lng: -80.1390 },
  "33125": { lat: 25.7823, lng: -80.2270 },
  "33126": { lat: 25.7753, lng: -80.2906 },
  "33127": { lat: 25.8109, lng: -80.2003 },
  "33128": { lat: 25.7862, lng: -80.1900 },
  "33129": { lat: 25.7539, lng: -80.1956 },
  "33130": { lat: 25.7559, lng: -80.2078 },
  "33131": { lat: 25.7620, lng: -80.1918 },
  "33132": { lat: 25.7887, lng: -80.1901 },
  "33133": { lat: 25.7282, lng: -80.2464 },
  "33134": { lat: 25.7525, lng: -80.2531 },
  "33135": { lat: 25.7617, lng: -80.2270 },
  "33136": { lat: 25.7851, lng: -80.2101 },
  "33137": { lat: 25.8139, lng: -80.1900 },
  "33138": { lat: 25.8506, lng: -80.1900 },
  "33139": { lat: 25.7789, lng: -80.1345 },
  "33140": { lat: 25.8173, lng: -80.1234 },
  "33141": { lat: 25.8628, lng: -80.1373 },
  "33142": { lat: 25.8173, lng: -80.2378 },
  "33143": { lat: 25.7009, lng: -80.3095 },
  "33144": { lat: 25.7584, lng: -80.3145 },
  "33145": { lat: 25.7539, lng: -80.2270 },
  "33146": { lat: 25.7223, lng: -80.2606 },
  "33147": { lat: 25.8506, lng: -80.2173 },
  "33149": { lat: 25.7689, lng: -80.1400 },
  "33150": { lat: 25.8584, lng: -80.2009 },
  
  // Los Angeles area
  "90001": { lat: 33.9731, lng: -118.2479 },
  "90011": { lat: 34.0073, lng: -118.2581 },
  "90012": { lat: 34.0628, lng: -118.2373 },
  "90013": { lat: 34.0428, lng: -118.2473 },
  "90014": { lat: 34.0428, lng: -118.2573 },
  "90015": { lat: 34.0428, lng: -118.2673 },
  "90016": { lat: 34.0328, lng: -118.3517 },
  "90017": { lat: 34.0528, lng: -118.2673 },
  "90018": { lat: 34.0228, lng: -118.3117 },
  "90019": { lat: 34.0428, lng: -118.3417 },
  "90020": { lat: 34.0628, lng: -118.3117 },
  "90028": { lat: 34.1017, lng: -118.3267 },
  "90029": { lat: 34.0917, lng: -118.2817 },
  "90301": { lat: 33.8917, lng: -118.3967 },
  "90302": { lat: 33.9117, lng: -118.4067 },
  
  // New York area
  "10001": { lat: 40.7506, lng: -73.9971 },
  "10002": { lat: 40.7156, lng: -73.9871 },
  "10003": { lat: 40.7317, lng: -73.9888 },
  "10004": { lat: 40.7034, lng: -74.0123 },
  "10005": { lat: 40.7060, lng: -74.0084 },
  "10006": { lat: 40.7093, lng: -74.0134 },
  "10007": { lat: 40.7137, lng: -74.0073 },
  "10009": { lat: 40.7267, lng: -73.9789 },
  "10010": { lat: 40.7391, lng: -73.9826 },
  "10011": { lat: 40.7406, lng: -74.0006 },
  "10012": { lat: 40.7256, lng: -73.9984 },
  "10013": { lat: 40.7199, lng: -74.0032 },
  "10014": { lat: 40.7339, lng: -74.0063 },
  "10016": { lat: 40.7456, lng: -73.9789 },
  "10017": { lat: 40.7522, lng: -73.9727 },
  "10018": { lat: 40.7555, lng: -73.9926 },
  "10019": { lat: 40.7656, lng: -73.9878 },
  "10021": { lat: 40.7689, lng: -73.9594 },
  "10022": { lat: 40.7578, lng: -73.9678 },
  "10023": { lat: 40.7756, lng: -73.9823 },
  "10024": { lat: 40.7933, lng: -73.9733 },
  "10025": { lat: 40.7989, lng: -73.9667 },
  
  // Boston area
  "02108": { lat: 42.3601, lng: -71.0589 },
  "02109": { lat: 42.3656, lng: -71.0534 },
  "02110": { lat: 42.3550, lng: -71.0534 },
  "02111": { lat: 42.3506, lng: -71.0623 },
  "02113": { lat: 42.3656, lng: -71.0567 },
  "02114": { lat: 42.3612, lng: -71.0678 },
  "02115": { lat: 42.3423, lng: -71.0956 },
  "02116": { lat: 42.3500, lng: -71.0734 },
  "02118": { lat: 42.3389, lng: -71.0734 },
  "02119": { lat: 42.3223, lng: -71.0845 },
  "02120": { lat: 42.3312, lng: -71.0956 },
  "02121": { lat: 42.3089, lng: -71.0834 },
  "02122": { lat: 42.2889, lng: -71.0445 },
  "02124": { lat: 42.2823, lng: -71.0734 },
  "02125": { lat: 42.3156, lng: -71.0623 },
  "02126": { lat: 42.2656, lng: -71.1178 },
  "02127": { lat: 42.3323, lng: -71.0401 },
  "02128": { lat: 42.3656, lng: -71.0245 },
  "02129": { lat: 42.3789, lng: -71.0634 },
  "02130": { lat: 42.3089, lng: -71.1167 },
  "02131": { lat: 42.2845, lng: -71.1256 },
  
  // Philadelphia area
  "19101": { lat: 39.9500, lng: -75.1667 },
  "19102": { lat: 39.9523, lng: -75.1667 },
  "19103": { lat: 39.9534, lng: -75.1678 },
  "19104": { lat: 39.9556, lng: -75.1956 },
  "19106": { lat: 39.9489, lng: -75.1478 },
  "19107": { lat: 39.9467, lng: -75.1589 },
  "19111": { lat: 40.0656, lng: -75.0789 },
  "19114": { lat: 40.0712, lng: -75.0234 },
  "19115": { lat: 40.0867, lng: -75.0445 },
  "19116": { lat: 40.1156, lng: -75.0067 },
  "19118": { lat: 40.0756, lng: -75.2012 },
  "19119": { lat: 40.0556, lng: -75.1867 },
  "19120": { lat: 40.0356, lng: -75.1156 },
  "19121": { lat: 39.9789, lng: -75.1756 },
  "19122": { lat: 39.9845, lng: -75.1434 },
  "19123": { lat: 39.9634, lng: -75.1456 },
  "19124": { lat: 40.0089, lng: -75.1034 },
  "19125": { lat: 39.9778, lng: -75.1312 },
  "19126": { lat: 40.0556, lng: -75.1423 },
  "19127": { lat: 40.0267, lng: -75.2234 },
  
  // Dallas area
  "75201": { lat: 32.7867, lng: -96.7989 },
  "75202": { lat: 32.7789, lng: -96.7989 },
  "75203": { lat: 32.7567, lng: -96.7867 },
  "75204": { lat: 32.7989, lng: -96.7867 },
  "75205": { lat: 32.8156, lng: -96.7867 },
  "75206": { lat: 32.8267, lng: -96.7756 },
  "75207": { lat: 32.7889, lng: -96.8156 },
  "75208": { lat: 32.7456, lng: -96.8356 },
  "75209": { lat: 32.8456, lng: -96.8156 },
  "75210": { lat: 32.7656, lng: -96.8556 },
  "75211": { lat: 32.7456, lng: -96.8956 },
  "75212": { lat: 32.7889, lng: -96.8756 },
  "75214": { lat: 32.8456, lng: -96.7656 },
  "75215": { lat: 32.7656, lng: -96.8156 },
  "75216": { lat: 32.7156, lng: -96.8556 },
  "75217": { lat: 32.7256, lng: -96.6956 },
  "75218": { lat: 32.8356, lng: -96.7156 },
  "75219": { lat: 32.8056, lng: -96.8056 },
  "75220": { lat: 32.8656, lng: -96.8656 },
  
  // Houston area
  "77001": { lat: 29.7589, lng: -95.3678 },
  "77002": { lat: 29.7567, lng: -95.3678 },
  "77003": { lat: 29.7489, lng: -95.3456 },
  "77004": { lat: 29.7289, lng: -95.3678 },
  "77005": { lat: 29.7189, lng: -95.4289 },
  "77006": { lat: 29.7456, lng: -95.3956 },
  "77007": { lat: 29.7756, lng: -95.4056 },
  "77008": { lat: 29.7956, lng: -95.4056 },
  "77009": { lat: 29.7856, lng: -95.3756 },
  "77010": { lat: 29.7556, lng: -95.3556 },
  "77011": { lat: 29.7356, lng: -95.3256 },
  "77012": { lat: 29.7256, lng: -95.2956 },
  "77013": { lat: 29.7756, lng: -95.2856 },
  "77014": { lat: 29.9956, lng: -95.4856 },
  "77015": { lat: 29.7856, lng: -95.1956 },
  "77016": { lat: 29.8156, lng: -95.3456 },
  "77017": { lat: 29.6956, lng: -95.2856 },
  "77018": { lat: 29.8256, lng: -95.4156 },
  "77019": { lat: 29.7556, lng: -95.4256 },
  "77020": { lat: 29.7556, lng: -95.3356 },
  
  // Seattle area
  "98101": { lat: 47.6101, lng: -122.3331 },
  "98102": { lat: 47.6301, lng: -122.3231 },
  "98103": { lat: 47.6701, lng: -122.3431 },
  "98104": { lat: 47.6001, lng: -122.3331 },
  "98105": { lat: 47.6601, lng: -122.3031 },
  "98106": { lat: 47.5301, lng: -122.3531 },
  "98107": { lat: 47.6701, lng: -122.3731 },
  "98108": { lat: 47.5401, lng: -122.3131 },
  "98109": { lat: 47.6401, lng: -122.3431 },
  "98112": { lat: 47.6301, lng: -122.2931 },
  "98113": { lat: 47.6101, lng: -122.3531 },
  "98115": { lat: 47.6801, lng: -122.3031 },
  "98116": { lat: 47.5701, lng: -122.3931 },
  "98117": { lat: 47.6801, lng: -122.3731 },
  "98118": { lat: 47.5401, lng: -122.2731 },
  "98119": { lat: 47.6401, lng: -122.3631 },
  "98121": { lat: 47.6101, lng: -122.3431 },
  "98122": { lat: 47.6101, lng: -122.3031 },
  "98125": { lat: 47.7201, lng: -122.2931 },
  "98126": { lat: 47.5401, lng: -122.3731 },
  
  // San Francisco area
  "94102": { lat: 37.7789, lng: -122.4189 },
  "94103": { lat: 37.7723, lng: -122.4123 },
  "94104": { lat: 37.7912, lng: -122.4012 },
  "94105": { lat: 37.7867, lng: -122.3934 },
  "94107": { lat: 37.7623, lng: -122.3967 },
  "94108": { lat: 37.7923, lng: -122.4078 },
  "94109": { lat: 37.7923, lng: -122.4234 },
  "94110": { lat: 37.7489, lng: -122.4156 },
  "94111": { lat: 37.7967, lng: -122.4056 },
  "94112": { lat: 37.7223, lng: -122.4423 },
  "94114": { lat: 37.7589, lng: -122.4356 },
  "94115": { lat: 37.7856, lng: -122.4389 },
  "94116": { lat: 37.7423, lng: -122.4856 },
  "94117": { lat: 37.7689, lng: -122.4423 },
  "94118": { lat: 37.7789, lng: -122.4623 },
  "94121": { lat: 37.7789, lng: -122.4956 },
  "94122": { lat: 37.7589, lng: -122.4856 },
  "94123": { lat: 37.7989, lng: -122.4356 },
  "94124": { lat: 37.7323, lng: -122.3856 },
  "94127": { lat: 37.7356, lng: -122.4556 },
  
  // Kansas City area
  "64101": { lat: 39.1017, lng: -94.5844 },
  "64102": { lat: 39.0956, lng: -94.5789 },
  "64105": { lat: 39.1056, lng: -94.5789 },
  "64106": { lat: 39.0889, lng: -94.5789 },
  "64108": { lat: 39.0789, lng: -94.5589 },
  "64109": { lat: 39.0456, lng: -94.5789 },
  "64110": { lat: 39.0389, lng: -94.5589 },
  "64111": { lat: 39.0556, lng: -94.5889 },
  "64112": { lat: 39.0389, lng: -94.6089 },
  "64113": { lat: 39.0189, lng: -94.5989 },
  "64114": { lat: 38.9889, lng: -94.6189 },
  "64116": { lat: 39.1456, lng: -94.5589 },
  "64117": { lat: 39.1656, lng: -94.5289 },
  "64118": { lat: 39.2056, lng: -94.5789 },
  "64119": { lat: 39.1856, lng: -94.4989 },
  "64123": { lat: 39.1056, lng: -94.5489 },
  "64124": { lat: 39.0989, lng: -94.5389 },
  "64125": { lat: 39.0889, lng: -94.5089 },
  "64126": { lat: 39.1089, lng: -94.5089 },
  "64127": { lat: 39.0656, lng: -94.5289 },
}

/**
 * City center coordinates fallback
 * Used when zip code is not found in the lookup
 */
const CITY_CENTERS: Record<string, { lat: number; lng: number }> = {
  "Atlanta": { lat: 33.7490, lng: -84.3880 },
  "Miami": { lat: 25.7617, lng: -80.1918 },
  "Miami Gardens": { lat: 25.9420, lng: -80.2456 },
  "Coral Gables": { lat: 25.7218, lng: -80.2685 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  "Inglewood": { lat: 33.9617, lng: -118.3531 },
  "New York": { lat: 40.7128, lng: -74.0060 },
  "Brooklyn": { lat: 40.6782, lng: -73.9442 },
  "Hoboken": { lat: 40.7439, lng: -74.0324 },
  "Boston": { lat: 42.3601, lng: -71.0589 },
  "Foxborough": { lat: 42.0654, lng: -71.2478 },
  "Philadelphia": { lat: 39.9526, lng: -75.1652 },
  "Dallas": { lat: 32.7767, lng: -96.7970 },
  "Arlington": { lat: 32.7357, lng: -97.1081 },
  "Houston": { lat: 29.7604, lng: -95.3698 },
  "Seattle": { lat: 47.6062, lng: -122.3321 },
  "San Francisco": { lat: 37.7749, lng: -122.4194 },
  "Santa Clara": { lat: 37.3541, lng: -121.9552 },
  "Kansas City": { lat: 39.0997, lng: -94.5786 },
}

/**
 * Get center coordinates for a given zip code
 * @param postalCode - US zip code
 * @returns Center coordinates or null if not found
 */
export function getZipCenterCoordinates(postalCode: string): { lat: number; lng: number } | null {
  // Normalize zip code (remove spaces, handle ZIP+4 format)
  const normalizedZip = postalCode.trim().split('-')[0].split(' ')[0]
  
  return ZIP_COORDINATES[normalizedZip] || null
}

/**
 * Get city center coordinates from a city name
 * @param city - City name
 * @returns Center coordinates or null if not found
 */
export function getCityCenterCoordinates(city: string): { lat: number; lng: number } | null {
  // Try direct lookup
  if (CITY_CENTERS[city]) {
    return CITY_CENTERS[city]
  }
  
  // Try case-insensitive lookup
  const cityKey = Object.keys(CITY_CENTERS).find(
    key => key.toLowerCase() === city.toLowerCase()
  )
  
  if (cityKey) {
    return CITY_CENTERS[cityKey]
  }
  
  // Try FIFA cities as fallback
  const fifaCity = fifaCities.find(
    c => c.name.toLowerCase() === city.toLowerCase()
  )
  
  if (fifaCity?.coordinates) {
    return {
      lat: fifaCity.coordinates[0],
      lng: fifaCity.coordinates[1]
    }
  }
  
  return null
}

/**
 * Get map display coordinates for a property
 * Uses zip code center first, then city center, then falls back to existing coordinates
 * 
 * This is the main function that map components should use
 * 
 * @param property - Property object
 * @returns Coordinates for map display (zip code center or fallback)
 */
export function getPropertyMapCoordinates(property: Property): { lat: number; lng: number } {
  // Priority 1: Use zip code center if available
  if (property.postal_code) {
    const zipCoords = getZipCenterCoordinates(property.postal_code)
    if (zipCoords) {
      return zipCoords
    }
  }
  
  // Priority 2: Use city center
  const cityCoords = getCityCenterCoordinates(property.location.city)
  if (cityCoords) {
    return cityCoords
  }
  
  // Priority 3: Fall back to existing coordinates (for mock data/legacy properties)
  return {
    lat: property.location.coordinates.lat,
    lng: property.location.coordinates.lng
  }
}

/**
 * Check if a property is using approximate (privacy-protected) coordinates
 * @param property - Property object
 * @returns True if using zip code or city center (privacy protected), false if exact coords
 */
export function isUsingApproximateCoordinates(property: Property): boolean {
  if (property.postal_code) {
    const zipCoords = getZipCenterCoordinates(property.postal_code)
    if (zipCoords) return true
  }
  
  const cityCoords = getCityCenterCoordinates(property.location.city)
  if (cityCoords) return true
  
  return false
}
