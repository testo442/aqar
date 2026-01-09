"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { AREAS } from "@/lib/areas"
import { tText } from "@/lib/i18n"
import type { Area } from "@/lib/areas"

interface AreaAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  lang: "en" | "ar"
  id?: string
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

export default function AreaAutocomplete({
  value,
  onChange,
  placeholder,
  className = "",
  lang,
  id,
  icon,
  iconPosition = "left",
}: AreaAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Area[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Get all areas as an array (memoized)
  const allAreas = useMemo(() => Object.values(AREAS), [])

  // Filter areas based on query
  useEffect(() => {
    const query = value.trim()
    if (query.length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const filtered = allAreas
      .filter((area) => {
        if (lang === "en") {
          // Case-insensitive match on English names
          return area.en.toLowerCase().includes(query.toLowerCase())
        } else {
          // Basic includes match for Arabic
          return area.ar.includes(query)
        }
      })
      .slice(0, 8) // Max 8 suggestions

    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
    setHighlightedIndex(-1)
  }, [value, lang, allAreas])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    if (showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSuggestions])

  // Handle Esc key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSuggestions(false)
        inputRef.current?.blur()
      }
    }

    if (showSuggestions) {
      document.addEventListener("keydown", handleEsc)
      return () => document.removeEventListener("keydown", handleEsc)
    }
  }, [showSuggestions])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault()
      handleSelect(suggestions[highlightedIndex])
    }
  }

  const handleSelect = (area: Area) => {
    const displayName = lang === "en" ? area.en : area.ar
    onChange(displayName)
    setShowSuggestions(false)
    inputRef.current?.blur()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleInputFocus = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true)
    }
  }

  const isRTL = lang === "ar"

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        {icon && iconPosition === "left" && (
          <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "right-3" : "left-3"} z-10`}>
            {icon}
          </div>
        )}
        <Input
          ref={inputRef}
          id={id}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`${icon && iconPosition === "left" ? (isRTL ? "pr-10" : "pl-10") : ""} ${className}`}
        />
        {icon && iconPosition === "right" && (
          <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? "left-3" : "right-3"} z-10`}>
            {icon}
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className={`absolute z-[100] w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          <div className="max-h-64 overflow-y-auto">
            {suggestions.map((area, index) => {
              const displayName = lang === "en" ? area.en : area.ar
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => handleSelect(area)}
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
        </div>
      )}
    </div>
  )
}

