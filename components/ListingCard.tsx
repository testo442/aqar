"use client"

import Image from "next/image"
import Link from "next/link"
import { Bed, Bath, Square } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Property } from "@/types/property"
import { useLanguage } from "@/app/providers"
import { tText } from "@/lib/i18n"
import { t } from "@/lib/translations"
import { isValidLatLng } from "@/lib/geo"

interface ListingCardProps extends Property {
  isHovered?: boolean
  isSelected?: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  onClick?: () => void
  href?: string
}

export default function ListingCard({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
  type,
  titleI18n,
  locationI18n,
  lat,
  lng,
  isHovered = false,
  isSelected = false,
  onMouseEnter,
  onMouseLeave,
  onClick,
  href,
}: ListingCardProps) {
  const { lang } = useLanguage()
  const displayTitle = tText(titleI18n, lang, title)
  const displayLocation = tText(locationI18n, lang, location)

  const formattedPrice = new Intl.NumberFormat("en-KW", {
    style: "currency",
    currency: "KWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick()
    }
  }

  const cardContent = (
    <Card className="overflow-hidden hover:shadow-soft-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer h-full">
      <div className="relative h-64 w-full">
        <Image
          src={image}
          alt={displayTitle}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className={`absolute top-4 ${lang === "ar" ? "left-4" : "right-4"}`}>
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            {type === "buy" ? t("forSale", lang) : t("forRent", lang)}
          </span>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-slate-900 leading-[1.3]">
          {displayTitle}
        </h3>
        <div className="mb-4">
          <p className="text-sm text-slate-600 leading-[1.5]">{displayLocation}</p>
          {!isValidLatLng(lat, lng) && (
            <p className="text-xs text-slate-500 mt-1 italic">
              {t("locationNotAvailable", lang)}
            </p>
          )}
        </div>
        <div className={`flex items-center justify-between mb-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
          {lang === "ar" ? (
            <span className="text-xl font-bold text-primary-600 tabular-nums" dir="ltr">{formattedPrice}</span>
          ) : (
            <span className="text-xl font-bold text-primary-600 tabular-nums">{formattedPrice}</span>
          )}
          {type === "rent" && (
            <span className="text-sm text-slate-600">{t("month", lang)}</span>
          )}
        </div>
        <div className="flex items-center gap-5 text-sm text-slate-600 leading-[1.5]">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            {lang === "ar" ? (
              <span className="tabular-nums" dir="ltr">{bedrooms}</span>
            ) : (
              <span className="tabular-nums">{bedrooms}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            {lang === "ar" ? (
              <span className="tabular-nums" dir="ltr">{bathrooms}</span>
            ) : (
              <span className="tabular-nums">{bathrooms}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-4 w-4" />
            {lang === "ar" ? (
              <span className="tabular-nums" dir="ltr">{area} m²</span>
            ) : (
              <span className="tabular-nums">{area} m²</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={!href ? handleCardClick : undefined}
      className={`transition-all duration-200 ${
        isSelected ? "ring-2 ring-primary-500 rounded-2xl" : ""
      } ${isHovered ? "ring-2 ring-primary-300 rounded-2xl" : ""}`}
    >
      {href ? (
        <Link href={href} onClick={(e) => {
          // If onClick is provided, call it but don't prevent navigation
          if (onClick) {
            onClick()
          }
        }}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  )
}

