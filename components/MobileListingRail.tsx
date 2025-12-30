"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import type { Property } from "@/types/property"
import { isValidLatLng } from "@/lib/geo"
import { useLanguage } from "@/app/providers"
import { t } from "@/lib/translations"

interface MobileListingRailProps {
  properties: Property[]
  selectedPropertyId?: string
  onSelect: (propertyId: string) => void
}

export default function MobileListingRail({
  properties,
  selectedPropertyId,
  onSelect,
}: MobileListingRailProps) {
  const { lang } = useLanguage()
  const railRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  // Auto-scroll to selected card
  useEffect(() => {
    if (!selectedPropertyId) return

    const el = cardRefs.current[selectedPropertyId]
    const rail = railRef.current

    if (!el || !rail) return

    const railRect = rail.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()

    const offset =
      elRect.left -
      railRect.left -
      railRect.width / 2 +
      elRect.width / 2

    rail.scrollBy({
      left: offset,
      behavior: "smooth",
    })
  }, [selectedPropertyId])

  if (properties.length === 0) return null

  return (
    <div className="w-full">
      <div
        ref={railRef}
        className="
          flex gap-3 px-4 py-3
          overflow-x-auto
          overscroll-x-contain
          scrollbar-none
          snap-x snap-mandatory
        "
      >
        {properties.map((property) => {
          const isSelected = property.id === selectedPropertyId

          return (
            <button
              key={property.id}
              ref={(el) => {
                cardRefs.current[property.id] = el
              }}
              onClick={() => onSelect(property.id)}
              className={`
                snap-start
                flex-shrink-0 w-[260px]
                bg-white rounded-2xl
                shadow-lg
                overflow-hidden
                text-left
                transition
                ${
                  isSelected
                    ? "ring-2 ring-primary-600 scale-[1.02]"
                    : "hover:scale-[1.01]"
                }
              `}
            >
              {/* Image */}
              <div className="relative h-[110px] w-full">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <span
                  className="
                    absolute top-2 right-2
                    bg-primary-600 text-white
                    text-xs font-semibold
                    px-2 py-1 rounded-full
                  "
                >
                  {property.type === "buy" ? "For Sale" : "For Rent"}
                </span>
              </div>

              {/* Content */}
              <div className="p-3 space-y-1">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {property.title}
                </p>
                <div>
                  <p className="text-xs text-slate-600 truncate">
                    {property.location}
                  </p>
                  {!isValidLatLng(property.lat, property.lng) && (
                    <p className="text-xs text-slate-500 mt-0.5 italic">
                      {t("locationNotAvailable", lang)}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-primary-600">
                    {new Intl.NumberFormat("en-KW", {
                      style: "currency",
                      currency: "KWD",
                      maximumFractionDigits: 0,
                    }).format(property.price)}
                  </p>
                  <Link
                    href={`/properties/${property.id}`}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    View
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
