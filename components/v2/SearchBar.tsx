"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { useLanguage } from "@/app/providers"
import { searchBar as s } from "./v2Styles"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onFilterClick?: () => void
  filterCount?: number
}

export default function SearchBar({ value, onChange, onFilterClick, filterCount }: SearchBarProps) {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"
  const placeholder = isRTL ? "المنطقة، المبنى، الشارع..." : "Area, building, street..."

  return (
    <div className={`${s.root} ${isRTL ? "flex-row-reverse" : ""}`}>
      <div className={isRTL ? s.iconWrapRTL : s.iconWrapLTR}>
        <Search className={s.icon} />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  )
}
