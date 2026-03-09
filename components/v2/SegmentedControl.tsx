"use client"

import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/app/providers"
import { segmented as s } from "./v2Styles"

export type Segment = "buy" | "rent" | "khiran"

export interface SegmentDef {
  key: Segment
  en: string
  ar: string
  hasChevron?: boolean
}

interface SegmentedControlProps {
  value: Segment
  onChange: (value: Segment) => void
  segments?: SegmentDef[]
}

const DEFAULT_SEGMENTS: SegmentDef[] = [
  { key: "buy",  en: "Buy",  ar: "شراء"  },
  { key: "rent", en: "Rent", ar: "إيجار" },
]

export default function SegmentedControl({ value, onChange, segments }: SegmentedControlProps) {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"
  const segs = segments ?? DEFAULT_SEGMENTS

  return (
    <div className={`${s.bar} ${isRTL ? "flex-row-reverse" : ""}`}>
      {segs.map((seg) => {
        const active = value === seg.key
        return (
          <button
            key={seg.key}
            type="button"
            onClick={() => onChange(seg.key)}
            className={`${s.item} ${active ? s.active : s.inactive}`}
          >
            {lang === "ar" ? seg.ar : seg.en}
            {seg.hasChevron && <ChevronDown className={s.chevron} />}
          </button>
        )
      })}
    </div>
  )
}
