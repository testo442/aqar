"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/app/providers"
import { t } from "@/lib/translations"

interface SearchToggleProps {
  value: "buy" | "rent"
  onChange: (value: "buy" | "rent") => void
  className?: string
}

export default function SearchToggle({ value, onChange, className }: SearchToggleProps) {
  const { lang } = useLanguage()
  return (
    <div className={cn("inline-flex items-center rounded-lg bg-slate-100 p-1", className)}>
      <button
        type="button"
        onClick={() => onChange("buy")}
        className={cn(
          "px-6 py-2.5 text-sm font-semibold rounded-md transition-all duration-200",
          value === "buy"
            ? "bg-white text-primary-600 shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        )}
      >
        {t("buy", lang)}
      </button>
      <button
        type="button"
        onClick={() => onChange("rent")}
        className={cn(
          "px-6 py-2.5 text-sm font-semibold rounded-md transition-all duration-200",
          value === "rent"
            ? "bg-white text-primary-600 shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        )}
      >
        {t("rent", lang)}
      </button>
    </div>
  )
}

