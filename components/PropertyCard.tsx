"use client"

import Image from "next/image"
import Link from "next/link"
import { Bed, Bath, Square } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/app/providers"
import { tText } from "@/lib/i18n"
import type { Property } from "@/types/property"

interface PropertyCardProps {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  type: "buy" | "rent"
  lat?: number
  lng?: number
  titleI18n?: Property["titleI18n"]
  locationI18n?: Property["locationI18n"]
}

export default function PropertyCard({
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
}: PropertyCardProps) {
  const { lang } = useLanguage()
  const displayTitle = tText(titleI18n, lang, title)
  const displayLocation = tText(locationI18n, lang, location)
  const formattedPrice = new Intl.NumberFormat("en-KW", {
    style: "currency",
    currency: "KWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <Link href={`/property/${id}`}>
      <Card className="overflow-hidden hover:shadow-soft-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer h-full">
        <div className="relative h-64 w-full">
          <Image
            src={image}
            alt={displayTitle}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              {type === "buy" ? "For Sale" : "For Rent"}
            </span>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-slate-900 leading-[1.3]">{displayTitle}</h3>
          <p className="text-sm text-slate-600 mb-4 leading-[1.5]">{displayLocation}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-primary-600">{formattedPrice}</span>
            {type === "rent" && (
              <span className="text-sm text-slate-600">/month</span>
            )}
          </div>
          <div className="flex items-center gap-5 text-sm text-slate-600 leading-[1.5]">
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              <span>{area} m²</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

