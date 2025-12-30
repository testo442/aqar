"use client"

import { Map, List } from "lucide-react"
import { cn } from "@/lib/utils"

type ViewMode = "map" | "list"

interface ViewToggleProps {
  view: ViewMode
  onChange: (view: ViewMode) => void
  className?: string
}

export default function ViewToggle({ view, onChange, className }: ViewToggleProps) {
  return (
    <div className={cn("inline-flex items-center rounded-xl bg-white shadow-soft-lg border border-slate-200 p-1", className)}>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
          view === "list"
            ? "bg-primary-600 text-white shadow-sm"
            : "text-slate-700 hover:bg-slate-50"
        )}
      >
        <List className="h-4 w-4" />
        List
      </button>
      <button
        type="button"
        onClick={() => onChange("map")}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200",
          view === "map"
            ? "bg-primary-600 text-white shadow-sm"
            : "text-slate-700 hover:bg-slate-50"
        )}
      >
        <Map className="h-4 w-4" />
        Map
      </button>
    </div>
  )
}


