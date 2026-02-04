import type { Property } from "@/lib/types"

interface PropertyDescriptionProps {
  description: Property["description"]
}

export function PropertyDescription({ description }: PropertyDescriptionProps) {
  // Handle both string and object formats
  const descriptionText = typeof description === 'string' 
    ? description 
    : (description?.full || description?.short || '')
  
  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl font-bold text-primary">About this place</h2>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{descriptionText}</p>
      </div>
    </div>
  )
}
