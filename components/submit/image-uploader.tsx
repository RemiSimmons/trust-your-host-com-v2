'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, Trash2, Plus, GripVertical, Star, ImageIcon, AlertCircle } from 'lucide-react'
import { uploadPropertyImage, deletePropertyImage } from '@/app/host/properties/image-actions'
import Image from 'next/image'
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

interface SubmissionImageUploaderProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  minImages?: number
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
      <div className="aspect-[4/3] relative bg-gray-100">
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

export function SubmissionImageUploader({
  images,
  onImagesChange,
  maxImages = 5,
  minImages = 3,
}: SubmissionImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDeletingUrl, setIsDeletingUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = images.indexOf(active.id as string)
      const newIndex = images.indexOf(over.id as string)
      const newImages = arrayMove(images, oldIndex, newIndex)
      onImagesChange(newImages)
    }
  }, [images, onImagesChange])

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
    setUploadProgress(0)

    const newImageUrls: string[] = []
    const totalFiles = files.length
    let completed = 0

    for (const file of Array.from(files)) {
      // Client-side validation for immediate feedback
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        setError(`Invalid file type: ${file.name}. Only JPG, PNG, and WebP are allowed.`)
        continue
      }

      const maxSize = 5 * 1024 * 1024 // 5MB
      if (file.size > maxSize) {
        setError(`File too large: ${file.name}. Maximum size is 5MB. Try compressing at squoosh.app`)
        continue
      }

      // Upload via server action (bypasses RLS)
      const formData = new FormData()
      formData.append('file', file)
      formData.append('propertyId', 'submissions')

      console.log('[SubmissionImageUploader] Uploading via server action')

      const result = await uploadPropertyImage(formData)

      if (!result.success) {
        console.error('[SubmissionImageUploader] Upload error:', result.error)
        setError(result.error || `Failed to upload ${file.name}`)
        break // Stop on first error
      }

      if (result.url) {
        console.log('[SubmissionImageUploader] Uploaded successfully:', result.url)
        newImageUrls.push(result.url)
      }

      completed++
      setUploadProgress(Math.round((completed / totalFiles) * 100))
    }

    if (newImageUrls.length > 0) {
      onImagesChange([...images, ...newImageUrls])
    }

    setIsUploading(false)
    setUploadProgress(0)
    // Reset file input
    e.target.value = ''
  }

  const handleDelete = async (urlToDelete: string) => {
    setIsDeletingUrl(urlToDelete)
    setError(null)

    try {
      // Delete via server action (bypasses RLS)
      const result = await deletePropertyImage(urlToDelete, 'submissions')

      if (!result.success) {
        console.error('[SubmissionImageUploader] Delete error:', result.error)
        // Continue anyway to remove from UI
      }

      // Remove from state
      onImagesChange(images.filter((url) => url !== urlToDelete))
    } catch (err) {
      console.error('Error deleting image:', err)
      setError('Failed to delete image. Please try again.')
    } finally {
      setIsDeletingUrl(null)
    }
  }

  const isValid = images.length >= minImages

  return (
    <div className="space-y-4">
      {/* Validation message */}
      {!isValid && images.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          Please upload at least {minImages} images ({images.length}/{minImages} uploaded)
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <div className="whitespace-pre-line">{error}</div>
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
        <Card className="p-8 text-center border-dashed border-2">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-2">No images uploaded yet</p>
          <p className="text-sm text-muted-foreground">
            Upload {minImages}-{maxImages} high-quality photos of your property
          </p>
        </Card>
      )}

      {/* Upload button */}
      {images.length < maxImages && (
        <div className="flex flex-col items-center gap-2">
          <label htmlFor="submission-image-upload" className="w-full">
            <input
              id="submission-image-upload"
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
              className="w-full h-12"
              disabled={isUploading}
              onClick={() => document.getElementById('submission-image-upload')?.click()}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading... {uploadProgress}%
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  {images.length === 0 ? 'Upload Property Images' : `Add More Images (${images.length}/${maxImages})`}
                </>
              )}
            </Button>
          </label>
          <p className="text-xs text-muted-foreground text-center">
            Max 5MB per image. JPG, PNG, or WebP only.<br />
            Drag images to reorder. First image will be the main thumbnail.
          </p>
        </div>
      )}

      {/* Hidden input for form submission */}
      <input 
        type="hidden" 
        name="uploaded_images" 
        value={JSON.stringify(images)} 
      />
    </div>
  )
}
