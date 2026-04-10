"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ImageLightboxProps {
  images: string[]
  startIndex?: number
  open: boolean
  onClose: () => void
  alt?: string
}

export default function ImageLightbox({
  images,
  startIndex = 0,
  open,
  onClose,
  alt = "Property image",
}: ImageLightboxProps) {
  const [index, setIndex] = useState(startIndex)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    if (open) setIndex(startIndex)
  }, [open, startIndex])

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowLeft") goPrev()
      else if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", onKey)
    // Lock body scroll while open
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose, goPrev, goNext])

  if (!open) return null

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const THRESHOLD = 50
    if (dx > THRESHOLD) goPrev()
    else if (dx < -THRESHOLD) goNext()
    touchStartX.current = null
  }

  const showArrows = images.length > 1

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center select-none"
      role="dialog"
      aria-modal="true"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-150"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white text-sm font-medium tabular-nums">
        {index + 1} / {images.length}
      </div>

      {/* Prev */}
      {showArrows && (
        <button
          type="button"
          onClick={goPrev}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm items-center justify-center text-white transition-colors duration-150"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Image */}
      <div className="relative w-full h-full flex items-center justify-center px-4 py-16">
        <div className="relative w-full h-full max-w-5xl">
          <Image
            key={images[index]}
            src={images[index]}
            alt={alt}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>

      {/* Next */}
      {showArrows && (
        <button
          type="button"
          onClick={goNext}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm items-center justify-center text-white transition-colors duration-150"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}