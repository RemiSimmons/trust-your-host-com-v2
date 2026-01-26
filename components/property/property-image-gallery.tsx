"use client"

import { useState } from "react"
import Image from "next/image"
import { Grid3x3, X, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PropertyImageGalleryProps {
  images: string[]
}

export function PropertyImageGallery({ images }: PropertyImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <>
      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-[500px] container mx-auto px-6 pt-6">
        {/* Large main image */}
        <button
          onClick={() => {
            setCurrentImage(0)
            setLightboxOpen(true)
          }}
          className="col-span-2 row-span-2 relative overflow-hidden rounded-l-xl group cursor-pointer"
        >
          <Image
            src={images[0] || "/placeholder.svg"}
            alt="Main property view"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </button>

        {/* 4 smaller images */}
        {images.slice(1, 5).map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentImage(index + 1)
              setLightboxOpen(true)
            }}
            className={cn(
              "relative overflow-hidden group cursor-pointer",
              index === 1 && "rounded-tr-xl",
              index === 3 && "rounded-br-xl",
            )}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Property view ${index + 2}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {index === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">+{images.length - 5} photos</span>
              </div>
            )}
          </button>
        ))}

        {/* View all photos button */}
        <div className="absolute bottom-6 right-6 z-10 hidden md:block">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-900 shadow-sm"
            onClick={() => {
              setCurrentImage(0)
              setLightboxOpen(true)
            }}
          >
            <Grid3x3 className="h-4 w-4 mr-2" />
            Show all photos
          </Button>
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative h-[300px] w-full">
        <Image src={images[currentImage] || "/placeholder.svg"} alt="Property view" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent h-20" />

        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {currentImage + 1} / {images.length}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            prevImage()
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-gray-900 shadow-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            nextImage()
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 text-gray-900 shadow-sm"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
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
