"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight, Grid3x3, X, ChevronLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PropertyGalleryRedesignProps {
  images: string[]
}

export function PropertyGalleryRedesign({ images }: PropertyGalleryRedesignProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  if (images.length === 0) {
    return (
      <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full bg-white">
        {/* Main Large Image */}
        <div className="relative w-full h-[600px] sm:h-[700px]">
          <Image
            src={images[currentImage] || images[0] || "/placeholder.svg"}
            alt="Main property view"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Thumbnail Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.slice(0, 8).map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={cn(
                  "relative flex-shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded overflow-hidden border-2 transition-all",
                  currentImage === index
                    ? "border-gray-900 scale-105"
                    : "border-transparent hover:border-gray-300"
                )}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
            {images.length > 8 && (
              <div className="relative flex-shrink-0 w-24 h-16 sm:w-32 sm:h-20 rounded overflow-hidden border-2 border-gray-200 bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-600">+{images.length - 8}</span>
              </div>
            )}
          </div>
        </div>

        {/* Full Gallery Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <Button
            onClick={() => {
              setCurrentImage(0)
              setLightboxOpen(true)
            }}
            className="bg-black text-white hover:bg-gray-800 flex items-center gap-2"
          >
            Full Gallery
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg transition-all z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 hover:bg-white text-gray-900 shadow-lg transition-all z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col"
          >
            <div className="flex items-center justify-between p-4 text-white">
              <span className="text-sm font-medium">
                {currentImage + 1} / {images.length}
              </span>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 relative flex items-center justify-center p-4">
              <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
                <Image
                  src={images[currentImage] || "/placeholder.svg"}
                  alt={`Property view ${currentImage + 1}`}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            </div>

            <div className="h-20 bg-black/50 overflow-x-auto flex items-center gap-2 px-4 justify-center">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={cn(
                    "relative w-16 h-12 flex-shrink-0 rounded-md overflow-hidden transition-opacity",
                    currentImage === idx ? "opacity-100 ring-2 ring-white" : "opacity-50 hover:opacity-80",
                  )}
                >
                  <Image src={img || "/placeholder.svg"} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


