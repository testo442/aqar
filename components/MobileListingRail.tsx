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
          flex gap-2 px-3 py-2
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
                flex-shrink-0 w-[170px]
                bg-white rounded-xl
                shadow-md
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
              <div className="relative h-[50px] w-full">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <span
                  className={`
                    absolute top-1 ${lang === "ar" ? "left-1" : "right-1"}
                    bg-primary-600 text-white
                    text-[10px] font-semibold
                    px-1.5 py-0.5 rounded-full
                  `}
                >
                  {property.type === "buy" ? t("forSale", lang) : t("forRent", lang)}
                </span>
              </div>

              {/* Content */}
              <div className="p-1.5 space-y-0.5">
                <p className="text-[11px] font-semibold text-slate-900 line-clamp-1 leading-tight">
                  {property.title}
                </p>
                <div>
                  <p className="text-[10px] text-slate-600 truncate leading-tight">
                    {property.location}
                  </p>
                  {!isValidLatLng(property.lat, property.lng) && (
                    <p className="text-[10px] text-slate-500 mt-0.5 italic leading-tight">
                      {t("locationNotAvailable", lang)}
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  {lang === "ar" ? (
                    <p className="text-[11px] font-bold text-primary-600 tabular-nums" dir="ltr">
                      {new Intl.NumberFormat("en-KW", {
                        style: "currency",
                        currency: "KWD",
                        maximumFractionDigits: 0,
                      }).format(property.price)}
                    </p>
                  ) : (
                    <p className="text-[11px] font-bold text-primary-600 tabular-nums">
                      {new Intl.NumberFormat("en-KW", {
                        style: "currency",
                        currency: "KWD",
                        maximumFractionDigits: 0,
                      }).format(property.price)}
                    </p>
                  )}
                  <Link
                    href={`/properties/${property.id}`}
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    className={`flex items-center gap-0.5 text-[10px] font-semibold text-primary-600 hover:text-primary-700 transition-colors ${lang === "ar" ? "flex-row-reverse" : ""}`}
                  >
                    {t("view", lang)}
                    <ChevronRight className={`h-2.5 w-2.5 ${lang === "ar" ? "rotate-180" : ""}`} />
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
