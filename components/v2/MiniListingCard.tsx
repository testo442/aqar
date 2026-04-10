"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/app/providers"
import { listingCard as s } from "./v2Styles"

export interface MiniListingCardProps {
  id: string
  title: string
  titleAr?: string
  price: number
  beds: number
  area: number
  image: string
  location: string
  locationAr?: string
  rating?: number
  stars?: number
  verified?: boolean
  href?: string
  lat?: number
  lng?: number
}

export default function MiniListingCard({
  title,
  titleAr,
  price,
  beds,
  area,
  image,
  location,
  locationAr,
  rating,
  stars = 0,
  verified,
  href,
}: MiniListingCardProps) {
  const { lang } = useLanguage()
  const displayTitle = lang === "ar" && titleAr ? titleAr : title
  const displayLocation = lang === "ar" && locationAr ? locationAr : location

  const content = (
    <div className={s.root}>
      {/* Image */}
      <div className={s.imageWrap} style={s.imageAspect}>
        <Image
          src={image}
          alt={displayTitle}
          fill
          className={s.image}
          sizes="146px"
        />
      </div>

      {/* Body — fixed vertical structure so every card aligns */}
      <div className={s.body}>
        {/* Row 1: title */}
        <h3 className={s.title}>{displayTitle}</h3>

        {/* Row 2: price */}
        <div className={s.priceRow} dir="ltr">
          <span className={s.price}>{price.toLocaleString()} KD</span>
          <span className={s.priceSuffix}> / mo</span>
        </div>

        {/* Row 3: rating / verified (always present, empty if no data) */}
        <div className={s.ratingRow}>
          {verified ? (
            <>
              <span className={s.verifiedIcon}>✓</span>
              <span className={s.ratingText}>{lang === "ar" ? "موثّق" : "Verified"}</span>
            </>
          ) : rating ? (
            <>
              <span className={s.star}>★</span>
              <span className={s.ratingText}>{rating.toFixed(1)}</span>
            </>
          ) : null}
        </div>

        {/* Row 4: specs/meta */}
        <p className={s.metaRow}>{beds} Bed · {area} m²</p>

        {/* Row 5: location chip (pushed to bottom via mt-auto) */}
        <div className={s.chipWrap}>
          <span className={s.chip}>
            {displayLocation}
            <ChevronRight className={s.chipIcon} />
          </span>
        </div>
      </div>
    </div>
  )

  if (href) return <Link href={href}>{content}</Link>
  return content
}
