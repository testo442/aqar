"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomSheetProps {
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  collapsedHeight?: number
  expandedHeight?: number
}

export default function BottomSheet({
  children,
  isOpen,
  onToggle,
  collapsedHeight = 120,
  expandedHeight = 70,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startY, setStartY] = useState(0)
  const [currentY, setCurrentY] = useState(0)
  const [startHeight, setStartHeight] = useState(0)

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setStartY(e.touches[0].clientY)
    if (sheetRef.current) {
      setStartHeight(sheetRef.current.offsetHeight)
    }
  }

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    
    e.preventDefault() // Prevent scrolling while dragging
    
    const currentYPos = e.touches[0].clientY
    const deltaY = startY - currentYPos
    const newHeight = startHeight + deltaY
    const maxHeight = window.innerHeight * (expandedHeight / 100)
    const minHeight = collapsedHeight // Already in pixels
    
    if (sheetRef.current) {
      const clampedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight))
      setCurrentY(currentYPos)
      sheetRef.current.style.height = `${clampedHeight}px`
    }
  }

  // Handle touch end
  const handleTouchEnd = () => {
    if (!isDragging) return
    
    setIsDragging(false)
    const deltaY = startY - currentY
    const threshold = 50 // Minimum drag distance to toggle
    
    if (Math.abs(deltaY) > threshold) {
      if (deltaY > 0 && isOpen) {
        // Dragged down - collapse
        onToggle()
      } else if (deltaY < 0 && !isOpen) {
        // Dragged up - expand
        onToggle()
      }
    }
    
    // Reset height to state
    if (sheetRef.current) {
      sheetRef.current.style.height = ""
    }
    setCurrentY(0)
  }

  // Calculate height using window.innerHeight for mobile browsers
  const getHeight = () => {
    if (typeof window === "undefined") {
      return isOpen ? `${expandedHeight}vh` : `${collapsedHeight}px`
    }
    
    if (isOpen) {
      // Use viewport height but account for mobile browser UI
      const vh = window.innerHeight
      return `${Math.floor(vh * (expandedHeight / 100))}px`
    }
    return `${collapsedHeight}px`
  }

  return (
    <div
      ref={sheetRef}
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-soft-xl border-t border-slate-200 z-40 transition-all duration-300 ease-out flex flex-col",
        isDragging && "transition-none"
      )}
      style={{
        height: getHeight(),
        maxHeight: typeof window !== "undefined" ? `${window.innerHeight}px` : "100vh",
      }}
    >
      {/* Drag Handle */}
      <div
        className="flex items-center justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing select-none touch-none flex-shrink-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={(e) => {
          // Only toggle on click if not dragging
          if (!isDragging) {
            onToggle()
          }
        }}
      >
        <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          className="absolute right-4 top-3 p-2 text-slate-600 hover:text-slate-900 transition-colors touch-manipulation"
          aria-label={isOpen ? "Collapse" : "Expand"}
        >
          {isOpen ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Content - Scrollable independently */}
      <div 
        className="flex-1 overflow-y-auto overscroll-contain min-h-0"
        style={{ 
          touchAction: "pan-y",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </div>
    </div>
  )
}

