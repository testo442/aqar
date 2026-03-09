"use client"

import { useState, useMemo, useCallback } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { useLanguage } from "@/app/providers"
import { mapCard as s } from "./v2Styles"
import type { Property } from "@/types/property"

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => <div className={s.mapLoading} />,
})

export interface MapListing {
  id: string
  title: string
  titleAr?: string
  price: number
  image: string
  location: string
  locationAr?: string
  lat: number
  lng: number
}

interface MapPreviewCardProps {
  listings: MapListing[]
}

export default function MapPreviewCard({ listings }: MapPreviewCardProps) {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [mapReady, setMapReady] = useState(false)

  const selected = useMemo(
    () => listings.find((l) => l.id === selectedId) ?? null,
    [listings, selectedId],
  )

  // Convert MapListing[] to Property[] for MapView
  const properties: Property[] = useMemo(
    () =>
      listings.map((l) => ({
        id: l.id,
        title: l.title,
        location: l.location,
        price: l.price,
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        image: l.image,
        type: "rent" as const,
        lat: l.lat,
        lng: l.lng,
      })),
    [listings],
  )

  // Toggle selection: tap same pin again to deselect
  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <div className={s.root} style={{ aspectRatio: "16/13" }}>
      {/* Reuse existing MapView in preview mode */}
      <div className="absolute inset-0">
        <MapView
          properties={properties}
          selectedPropertyId={selectedId ?? undefined}
          onPropertyClick={handleSelect}
          mode="preview"
          onReady={() => setMapReady(true)}
        />
      </div>

      {/* Loading overlay until map tiles are ready */}
      {!mapReady && (
        <div className={`${s.mapLoading} pointer-events-none`} />
      )}

      {/* "Tap pins to preview" label */}
      <div className={s.tapLabel}>
        <MapPin className={s.tapIcon} />
        <span>
          {isRTL ? "اضغط على الدبابيس للمعاينة" : "Tap pins to preview"}
        </span>
      </div>

      {/* Floating preview card — fixed bottom-left, visible when a pin is selected */}
      {selected && (
        <div className={s.previewCard}>
          <div className={s.previewImage} style={s.previewImageAspect}>
            <Image
              src={selected.image}
              alt={
                lang === "ar" && selected.titleAr
                  ? selected.titleAr
                  : selected.title
              }
              fill
              className="object-cover"
              sizes="190px"
            />
            <span className={s.previewPriceBadge}>
              {selected.price.toLocaleString()} KD
            </span>
          </div>
          <div className={s.previewBody}>
            <p className={s.previewPrice} dir="ltr">
              {selected.price.toLocaleString()} KD
              <span className={s.previewSuffix}> / mo</span>
            </p>
            <p className={s.previewSub}>
              {isRTL ? "اضغط على الدبابيس للمعاينة" : "Tap pins to preview"}
            </p>
            <div className="pt-0.5">
              <span className={s.previewChip}>
                {lang === "ar" && selected.locationAr
                  ? selected.locationAr
                  : selected.location}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Open Map CTA */}
      <div className={s.ctaWrap}>
        <Link href="/map">
          <span className={s.cta}>
            <MapPin className={s.ctaIcon} />
            {isRTL ? "فتح الخريطة" : "Open Map"}
          </span>
        </Link>
      </div>

      {/* Inset ring for depth */}
      <div className={s.insetRing} />
    </div>
  )
}
