"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { useLanguage } from "@/app/providers"
import { listingsPage as s } from "./v2Styles"

export interface ListingCardData {
  id: string
  title: string
  titleAr?: string
  price: number
  pricePeriod?: "mo" | "total"
  beds: number
  baths: number
  area: number
  image: string
  location: string
  locationAr?: string
  isFeatured?: boolean
  href?: string
}

export default function ListingCard({
  id,
  title,
  titleAr,
  price,
  pricePeriod = "mo",
  beds,
  baths,
  area,
  image,
  location,
  locationAr,
  isFeatured,
  href,
}: ListingCardData) {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"
  const displayTitle = isRTL && titleAr ? titleAr : title
  const displayLocation = isRTL && locationAr ? locationAr : location
  const suffix = pricePeriod === "mo"
    ? isRTL ? "/ شهر" : "/ mo"
    : ""

  const card = (
    <div className={isFeatured ? s.cardFeaturedWrap : s.card}>
      {/* Image */}
      <div className={s.cardImageWrap} style={s.cardImageAspect}>
        <Image
          src={image}
          alt={displayTitle}
          fill
          className={s.cardImage}
          sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw"
        />
        {isFeatured && (
          <span className={s.cardFeatured}>
            {isRTL ? "مميز" : "Featured"}
          </span>
        )}
      </div>

      {/* Body */}
      <div className={s.cardBody}>
        <div dir="ltr">
          <span className={s.cardPrice}>{price.toLocaleString()} KD</span>
          {suffix && <span className={s.cardPriceSuffix}> {suffix}</span>}
        </div>
        <p className={s.cardTitle}>{displayTitle}</p>
        <p className={s.cardMeta}>
          {beds} {isRTL ? "غرف" : "Bed"} · {baths} {isRTL ? "حمام" : "Bath"} · {area} m²
        </p>
        <div className={s.cardLocation}>
          <span className={s.cardLocationChip}>
            <MapPin className={s.cardLocationIcon} />
            {displayLocation}
          </span>
        </div>
      </div>
    </div>
  )

  if (href) return <Link href={href}>{card}</Link>
  return card
}
