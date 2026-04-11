"use client"

import { X } from "lucide-react"

interface ChipRowProps {
  chips: string[]
  onRemove: (chip: string) => void
}

export default function ChipRow({ chips, onRemove }: ChipRowProps) {
  if (chips.length === 0) return null

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
      {chips.map((chip) => (
        <span
          key={chip}
          className="inline-flex items-center gap-1 pl-3 pr-1 py-1 rounded-full bg-muted border border-border text-slate-700 text-xs font-medium whitespace-nowrap flex-shrink-0"
        >
          {chip}
          <button
            type="button"
            onClick={() => onRemove(chip)}
            aria-label={`Remove ${chip}`}
            className="h-6 w-6 -mr-0.5 rounded-full flex items-center justify-center text-slate-500 hover:bg-border hover:text-slate-700 transition-colors flex-shrink-0"
          >
            <X className="h-3 w-3" aria-hidden />
          </button>
        </span>
      ))}
    </div>
  )
}
