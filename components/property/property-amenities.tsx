import { Wifi, Car, Utensils, Flame, Wind, Tv, Coffee, Waves, Dumbbell, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PropertyAmenitiesProps {
  amenities: string[]
}

// Helper to map amenities to icons
const getAmenityIcon = (amenity: string) => {
  const lower = amenity.toLowerCase()
  if (lower.includes("wifi")) return <Wifi className="h-5 w-5" />
  if (lower.includes("parking")) return <Car className="h-5 w-5" />
  if (lower.includes("kitchen")) return <Utensils className="h-5 w-5" />
  if (lower.includes("fire")) return <Flame className="h-5 w-5" />
  if (lower.includes("air") || lower.includes("ac")) return <Wind className="h-5 w-5" />
  if (lower.includes("tv")) return <Tv className="h-5 w-5" />
  if (lower.includes("coffee")) return <Coffee className="h-5 w-5" />
  if (lower.includes("pool") || lower.includes("tub")) return <Waves className="h-5 w-5" />
  if (lower.includes("gym")) return <Dumbbell className="h-5 w-5" />
  if (lower.includes("pet")) return <PawPrint className="h-5 w-5" />
  return <div className="h-5 w-5 rounded-full bg-gray-200" />
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  // Display first 10 amenities
  const displayAmenities = amenities.slice(0, 10)

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold text-primary">What this place offers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayAmenities.map((amenity) => (
          <div key={amenity} className="flex items-center gap-3 text-gray-700">
            <div className="text-gray-500">{getAmenityIcon(amenity)}</div>
            <span>{amenity}</span>
          </div>
        ))}
      </div>

      {amenities.length > 10 && (
        <Button variant="outline" className="mt-4 bg-transparent">
          Show all {amenities.length} amenities
        </Button>
      )}
    </div>
  )
}
