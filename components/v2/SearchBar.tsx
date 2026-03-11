"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { Search, SlidersHorizontal, MapPin } from "lucide-react"
import { useLanguage } from "@/app/providers"
import { searchBar as s } from "./v2Styles"
import { AREAS, type Area } from "@/lib/areas"

const areaList: Area[] = Object.values(AREAS)

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onFilterClick?: () => void
  filterCount?: number
  /** Called when user selects an area suggestion */
  onSelectArea?: (area: Area) => void
}

export default function SearchBar({ value, onChange, onFilterClick, filterCount, onSelectArea }: SearchBarProps) {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"
  const placeholder = isRTL ? "المنطقة، المبنى، الشارع..." : "Area, building, street..."

  const [focused, setFocused] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Filter area suggestions based on input
  const suggestions = useMemo(() => {
    const q = value.trim().toLowerCase()
    if (!q || q.length < 1) return []
    return areaList
      .filter((a) =>
        a.en.toLowerCase().includes(q) || a.ar.includes(value.trim())
      )
      .slice(0, 6)
  }, [value])

  const showDropdown = focused && suggestions.length > 0

  const handleSelect = (area: Area) => {
    onChange(isRTL ? area.ar : area.en)
    setFocused(false)
    onSelectArea?.(area)
  }

  return (
    <div ref={wrapRef} className="relative">
      <div className={`${s.root} ${isRTL ? "flex-row-reverse" : ""}`}>
        <div className={isRTL ? s.iconWrapRTL : s.iconWrapLTR}>
          <Search className={s.icon} />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          dir={isRTL ? "rtl" : "ltr"}
          className={s.input}
        />

        <div className={isRTL ? s.filterWrapRTL : s.filterWrapLTR}>
          <button
            type="button"
            onClick={onFilterClick}
            className={s.filterBtn}
            aria-label="Open filters"
          >
            <SlidersHorizontal className={s.filterIcon} />
            {filterCount
              ? isRTL ? `فلاتر (${filterCount})` : `Filter (${filterCount})`
              : isRTL ? "فلاتر" : "Filter"}
          </button>
        </div>
      </div>

      {/* Autocomplete dropdown */}
      {showDropdown && (
        <div className={s.dropdownWrap}>
          <div className={s.dropdown}>
            {suggestions.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() => handleSelect(area)}
                className={s.dropdownItem}
              >
                <MapPin className={s.dropdownItemIcon} />
                <span className={s.dropdownItemText}>
                  {isRTL ? area.ar : area.en}
                </span>
                <span className={s.dropdownItemSub}>
                  {isRTL ? area.en : area.ar}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
