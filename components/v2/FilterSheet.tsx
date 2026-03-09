"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useLanguage } from "@/app/providers"
import { filterSheet as s } from "./v2Styles"

/** Shared filter values passed between FilterSheet and parent pages */
export interface FilterValues {
  maxPrice?: number
  types?: string[]
  beds?: number
}

interface FilterSheetProps {
  open: boolean
  onClose: () => void
  appliedFilters?: FilterValues
  onApply?: (filters: FilterValues) => void
}

const PROPERTY_TYPES = [
  { key: "villa",     en: "Villa",     ar: "فيلا" },
  { key: "apartment", en: "Apartment", ar: "شقة" },
  { key: "land",      en: "Land",      ar: "أرض" },
  { key: "floor",     en: "Floor",     ar: "دور" },
  { key: "chalet",    en: "Chalet",    ar: "شاليه" },
]

const BED_OPTIONS = [
  { key: "any", en: "Any", ar: "الكل" },
  { key: "1",   en: "1",   ar: "١" },
  { key: "2",   en: "2",   ar: "٢" },
  { key: "3",   en: "3",   ar: "٣" },
  { key: "4+",  en: "4+",  ar: "٤+" },
]

export default function FilterSheet({ open, onClose, appliedFilters, onApply }: FilterSheetProps) {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"

  // ── Draft state (local to sheet, synced from applied on open) ──────────
  const [maxPrice, setMaxPrice] = useState("")
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [beds, setBeds] = useState("any")

  // Sync draft ← applied every time the sheet opens
  useEffect(() => {
    if (open) {
      setMaxPrice(appliedFilters?.maxPrice ? String(appliedFilters.maxPrice) : "")
      setSelectedTypes(appliedFilters?.types ?? [])
      setBeds(appliedFilters?.beds ? (appliedFilters.beds >= 4 ? "4+" : String(appliedFilters.beds)) : "any")
    }
  }, [open, appliedFilters])

  const toggleType = (key: string) =>
    setSelectedTypes((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    )

  const handleApply = () => {
    const parsed: FilterValues = {}
    const priceNum = parseInt(maxPrice, 10)
    if (priceNum > 0) parsed.maxPrice = priceNum
    if (selectedTypes.length > 0) parsed.types = [...selectedTypes]
    if (beds !== "any") parsed.beds = beds === "4+" ? 4 : parseInt(beds, 10)
    onApply?.(parsed)
    onClose()
  }

  const handleClear = () => {
    setMaxPrice("")
    setSelectedTypes([])
    setBeds("any")
    onApply?.({})
    onClose()
  }

  return (
    <>
      <div
        className={`${s.backdrop} ${open ? s.backdropOpen : s.backdropClosed}`}
        onClick={onClose}
        aria-hidden
      />

      <div
        className={`${s.sheet} ${open ? s.sheetOpen : s.sheetClosed}`}
        role="dialog"
        aria-modal
        aria-label={isRTL ? "الفلاتر" : "Filters"}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className={s.dragHandle}>
          <div className={s.dragBar} />
        </div>

        <div className={`${s.headerRow} ${isRTL ? "flex-row-reverse" : ""}`}>
          <h2 className={s.headerTitle}>{isRTL ? "الفلاتر" : "Filters"}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className={s.closeBtn}>
            <X className={s.closeIcon} />
          </button>
        </div>

        <div className={s.content}>
          <section>
            <p className={s.sectionLabel}>{isRTL ? "الحد الأقصى للسعر" : "Max price"}</p>
            <div className={s.priceInputWrap}>
              <span className={isRTL ? s.pricePrefixRTL : s.pricePrefixLTR}>KD</span>
              <input
                type="number"
                inputMode="numeric"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder={isRTL ? "أي سعر" : "Any price"}
                className={`${s.priceInputBase} ${isRTL ? s.priceInputRTL : s.priceInputLTR}`}
                dir="ltr"
              />
            </div>
          </section>

          <section>
            <p className={s.sectionLabel}>{isRTL ? "نوع العقار" : "Property type"}</p>
            <div className={s.chipRow}>
              {PROPERTY_TYPES.map(({ key, en, ar }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleType(key)}
                  className={selectedTypes.includes(key) ? s.chipActive : s.chipInactive}
                >
                  {isRTL ? ar : en}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className={s.sectionLabel}>{isRTL ? "غرف النوم" : "Bedrooms"}</p>
            <div className="flex gap-2 flex-wrap">
              {BED_OPTIONS.map(({ key, en, ar }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setBeds(key)}
                  className={`h-10 min-w-[48px] px-3 rounded-2xl text-sm font-medium border transition-colors ${
                    beds === key
                      ? "bg-primary-600 text-white border-primary-600"
                      : "bg-background border-border text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {isRTL ? ar : en}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className={`${s.footer} ${isRTL ? "flex-row-reverse" : ""}`}>
          <button type="button" onClick={handleClear} className={s.clearBtn}>
            {isRTL ? "مسح الكل" : "Clear all"}
          </button>
          <button type="button" onClick={handleApply} className={s.applyBtn}>
            {isRTL ? "تطبيق الفلاتر" : "Apply filters"}
          </button>
        </div>
      </div>
    </>
  )
}
