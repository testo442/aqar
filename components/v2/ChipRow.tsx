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
          className="inline-flex items-center gap-1 pl-3 pr-1.5 py-1 rounded-full bg-muted border border-border text-slate-700 text-xs font-medium whitespace-nowrap flex-shrink-0"
        >
          {chip}
          <button
            type="button"
            onClick={() => onRemove(chip)}
            aria-label={`Remove ${chip}`}
            className="h-3.5 w-3.5 rounded-full flex items-center justify-center text-slate-400 hover:bg-border hover:text-slate-600 transition-colors flex-shrink-0"
          >
            <X className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}
    </div>
  )
}
