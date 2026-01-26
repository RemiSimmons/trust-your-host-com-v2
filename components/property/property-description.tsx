import type { Property } from "@/lib/types"

interface PropertyDescriptionProps {
  description: Property["description"]
}

export function PropertyDescription({ description }: PropertyDescriptionProps) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl font-bold text-primary">About this place</h2>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 leading-relaxed text-lg">{description.full}</p>
        <p className="text-gray-700 leading-relaxed mt-4">
          Experience the perfect blend of comfort and adventure. Whether you're looking to relax or explore, this
          property offers everything you need for an unforgettable stay.
        </p>
      </div>
    </div>
  )
}
