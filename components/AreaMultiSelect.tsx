"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { MapPin, X, ChevronDown } from "lucide-react"
import { AREAS } from "@/lib/areas"
import { tText } from "@/lib/i18n"
import { t } from "@/lib/translations"
import type { Area } from "@/lib/areas"

interface AreaMultiSelectProps {
  selectedAreaIds: string[]
  onChange: (areaIds: string[]) => void
  placeholder?: string
  className?: string
  lang: "en" | "ar"
  id?: string
}

export default function AreaMultiSelect({
  selectedAreaIds,
  onChange,
  placeholder,
  className = "",
  lang,
  id,
}: AreaMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Get all areas as an array (memoized)
  const allAreas = useMemo(() => Object.values(AREAS), [])

  // Get selected areas
  const selectedAreas = useMemo(() => {
    return allAreas.filter((area) => selectedAreaIds.includes(area.id))
  }, [allAreas, selectedAreaIds])

  // Filter areas based on search query
  const filteredAreas = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (query.length < 1) {
      return allAreas
    }

    return allAreas.filter((area) => {
      if (lang === "en") {
        return area.en.toLowerCase().includes(query)
      } else {
        return area.ar.includes(searchQuery.trim())
      }
    })
  }, [searchQuery, lang, allAreas])

  // Filter out already selected areas from suggestions
  const availableAreas = useMemo(() => {
    return filteredAreas.filter((area) => !selectedAreaIds.includes(area.id))
  }, [filteredAreas, selectedAreaIds])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery("")
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Handle Esc key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false)
        setSearchQuery("")
        inputRef.current?.blur()
      }
    }

    document.addEventListener("keydown", handleEsc)
    return () => document.removeEventListener("keydown", handleEsc)
  }, [isOpen])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || availableAreas.length === 0) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        setIsOpen(true)
        inputRef.current?.focus()
      }
      return
    }

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev < availableAreas.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault()
      handleToggleArea(availableAreas[highlightedIndex].id)
    }
  }

  const handleToggleArea = (areaId: string) => {
    if (selectedAreaIds.includes(areaId)) {
      onChange(selectedAreaIds.filter((id) => id !== areaId))
    } else {
      onChange([...selectedAreaIds, areaId])
    }
    setSearchQuery("")
    setHighlightedIndex(-1)
  }

  const handleRemoveArea = (areaId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(selectedAreaIds.filter((id) => id !== areaId))
  }

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange([])
    setSearchQuery("")
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isOpen) {
      setIsOpen(false)
      setSearchQuery("")
      inputRef.current?.blur()
    } else {
      setIsOpen(true)
      inputRef.current?.focus()
    }
  }

  const isRTL = lang === "ar"

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Input field with chips */}
      <div
        className={`flex items-center gap-2 min-h-[3.5rem] px-4 py-2 rounded-xl border border-slate-200 bg-white focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200 transition-all cursor-text ${
          isRTL ? "flex-row-reverse" : ""
        }`}
        onClick={() => {
          // Only open if not already open (buttons use stopPropagation to prevent this)
          if (!isOpen) {
            inputRef.current?.focus()
            setIsOpen(true)
          }
        }}
      >
        <MapPin className={`h-5 w-5 text-slate-400 flex-shrink-0 ${isRTL ? "ml-2" : "mr-2"}`} />
        
        <div className={`flex-1 flex flex-wrap gap-2 min-w-0 ${isRTL ? "justify-end" : ""}`}>
          {/* Selected area chips */}
          {selectedAreas.map((area) => {
            const displayName = lang === "en" ? area.en : area.ar
            return (
              <div
                key={area.id}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-sm font-medium flex-shrink-0 ${
                  isRTL ? "flex-row-reverse" : ""
                }`}
              >
                <span>{displayName}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveArea(area.id, e)}
                  className="hover:bg-primary-100 rounded p-0.5 transition-colors"
                  aria-label={lang === "ar" ? "إزالة" : "Remove"}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )
          })}
          
          {/* Search input */}
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={selectedAreas.length === 0 ? placeholder : ""}
            className={`flex-1 min-w-[120px] outline-none bg-transparent text-base text-slate-900 placeholder:text-slate-400 ${
              isRTL ? "text-right" : "text-left"
            }`}
          />
        </div>

        {/* Clear button (if areas selected) */}
        {selectedAreas.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className={`flex-shrink-0 text-xs text-slate-500 hover:text-slate-700 font-medium transition-colors ${
              isRTL ? "mr-auto" : "ml-auto"
            }`}
          >
            {t("clear", lang)}
          </button>
        )}

        {/* Chevron */}
        <button
          type="button"
          onClick={handleChevronClick}
          className={`flex-shrink-0 p-1 hover:bg-slate-50 rounded transition-colors ${isRTL ? "mr-2" : "ml-2"}`}
          aria-label={isOpen ? (lang === "ar" ? "إغلاق" : "Close") : (lang === "ar" ? "فتح" : "Open")}
          aria-expanded={isOpen}
        >
          <ChevronDown
            className={`h-5 w-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className={`absolute z-[100] w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {availableAreas.length > 0 ? (
            <div ref={listRef} className="max-h-64 overflow-y-auto">
              {availableAreas.slice(0, 8).map((area, index) => {
                const displayName = lang === "en" ? area.en : area.ar
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => handleToggleArea(area.id)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full px-4 py-3 text-sm transition-colors ${
                      index === highlightedIndex
                        ? "bg-primary-50 text-primary-700"
                        : "text-slate-700 hover:bg-slate-50"
                    } ${isRTL ? "text-right" : "text-left"}`}
                  >
                    {displayName}
                  </button>
                )
              })}
            </div>
          ) : searchQuery.trim().length > 0 ? (
            <div className={`px-4 py-3 text-sm text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
              {t("noPropertiesFound", lang)}
            </div>
          ) : selectedAreas.length === allAreas.length ? (
            <div className={`px-4 py-3 text-sm text-slate-500 ${isRTL ? "text-right" : "text-left"}`}>
              {lang === "ar" ? "جميع المناطق محددة" : "All areas selected"}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

