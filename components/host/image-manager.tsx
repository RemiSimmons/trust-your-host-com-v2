'use client'

import { useState, useCallback } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, Trash2, Plus, GripVertical, Star, ImageIcon, AlertCircle } from 'lucide-react'
import { createBrowserClient } from '@/lib/supabase/client'
import Image from 'next/image'

interface ImageManagerProps {
  propertyId: string
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
}

interface SortableImageProps {
  id: string
  url: string
  index: number
  onDelete: (url: string) => void
  isDeleting: boolean
}

function SortableImage({ id, url, index, onDelete, isDeleting }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group rounded-lg overflow-hidden border-2 ${
        index === 0 ? 'border-orange-500' : 'border-gray-200 dark:border-gray-700'
      } ${isDragging ? 'z-50 shadow-lg' : ''}`}
    >
      {/* Main thumbnail badge */}
      {index === 0 && (
        <div className="absolute top-2 left-2 z-10 bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Star className="h-3 w-3 fill-white" />
          Main
        </div>
      )}

      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical className="h-4 w-4" />
      </div>

      {/* Delete button */}
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute bottom-2 right-2 z-10 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onDelete(url)}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>

      {/* Image */}
      <div className="aspect-[4/3] relative">
        <Image
          src={url}
          alt={`Property image ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      </div>
    </div>
  )
}

export function ImageManager({
  propertyId,
  images: initialImages,
  onImagesChange,
  maxImages = 5,
}: ImageManagerProps) {
  const [images, setImages] = useState<string[]>(initialImages)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeletingUrl, setIsDeletingUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.indexOf(active.id as string)
        const newIndex = items.indexOf(over.id as string)
        const newImages = arrayMove(items, oldIndex, newIndex)
        onImagesChange(newImages)
        return newImages
      })
    }
  }, [onImagesChange])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setError(null)
    
    // Check total image count
    if (images.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed. You can add ${maxImages - images.length} more.`)
      return
    }

    setIsUploading(true)

    const supabase = createBrowserClient()
    const newImageUrls: string[] = []

    for (const file of Array.from(files)) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}. Only JPG, PNG, and WebP are allowed.`)
        continue
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        setError(`File too large: ${file.name}. Maximum size is 5MB.`)
        continue
      }

      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${propertyId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        setError(`Failed to upload ${file.name}: ${uploadError.message}`)
        continue
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(data.path)

      newImageUrls.push(publicUrl)
    }

    if (newImageUrls.length > 0) {
      const updatedImages = [...images, ...newImageUrls]
      setImages(updatedImages)
      onImagesChange(updatedImages)
    }

    setIsUploading(false)
    // Reset file input
    e.target.value = ''
  }

  const handleDelete = async (urlToDelete: string) => {
    setIsDeletingUrl(urlToDelete)
    setError(null)

    try {
      const supabase = createBrowserClient()
      
      // Extract file path from URL
      const urlParts = urlToDelete.split('/property-images/')
      if (urlParts.length === 2) {
        const filePath = urlParts[1]
        
        // Delete from Supabase Storage
        const { error: deleteError } = await supabase.storage
          .from('property-images')
          .remove([filePath])

        if (deleteError) {
          console.error('Delete error:', deleteError)
          // Continue anyway to remove from UI
        }
      }

      // Remove from state
      const updatedImages = images.filter((url) => url !== urlToDelete)
      setImages(updatedImages)
      onImagesChange(updatedImages)
    } catch (err) {
      console.error('Error deleting image:', err)
      setError('Failed to delete image. Please try again.')
    } finally {
      setIsDeletingUrl(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((url, index) => (
                <SortableImage
                  key={url}
                  id={url}
                  url={url}
                  index={index}
                  onDelete={handleDelete}
                  isDeleting={isDeletingUrl === url}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <Card className="p-8 text-center border-dashed">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No images uploaded yet</p>
        </Card>
      )}

      {/* Upload button */}
      {images.length < maxImages && (
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="image-upload" className="w-full">
            <input
              id="image-upload"
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              multiple
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={isUploading}
              onClick={() => document.getElementById('image-upload')?.click()}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image ({images.length}/{maxImages})
                </>
              )}
            </Button>
          </label>
          <p className="text-xs text-muted-foreground">
            Max 5MB per image. JPG, PNG, or WebP only. Drag images to reorder.
          </p>
        </div>
      )}
    </div>
  )
}
