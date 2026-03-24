"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { LayoutList } from "lucide-react"
import SearchBar from "@/components/v2/SearchBar"
import SegmentedControl, { type Segment } from "@/components/v2/SegmentedControl"
import BottomNav from "@/components/v2/BottomNav"
import FilterSheet, { type FilterValues } from "@/components/v2/FilterSheet"
import { useLanguage } from "@/app/providers"
import { mapPage as mp } from "@/components/v2/v2Styles"
import { MOCK_LISTINGS } from "@/lib/mock-listings"
import type { Property } from "@/types/property"

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false })

// Map shared MockProperty → Property shape for MapView
const MOCK_PROPERTIES: (Property & { propertyType: string })[] = MOCK_LISTINGS.map((m) => ({
  id: m.id,
  title: m.title,
  location: m.location,
  price: m.price,
  bedrooms: m.bedrooms,
  bathrooms: m.bathrooms,
  area: m.area,
  image: m.image,
  type: m.type,
  lat: m.lat,
  lng: m.lng,
  propertyType: m.propertyType,
  titleI18n: { en: m.title, ar: m.titleAr },
  locationI18n: { en: m.location, ar: m.locationAr },
}))

export default function MapV2Page() {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"
  const searchParams = useSearchParams()

  const [segment, setSegment] = useState<Segment>("rent")
  const [search, setSearch] = useState(() => searchParams.get("q") ?? "")
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | undefined>()
  const [mapState, setMapState] = useState({ zoom: 11, visibleCount: 0, showPrices: false })
  const [filters, setFilters] = useState<FilterValues>({})
  const railRef = useRef<HTMLDivElement>(null)
  const scrollingFromMap = useRef(false)

  const filteredProperties = useMemo(() => {
    const q = search.trim().toLowerCase()
    return MOCK_PROPERTIES.filter((p) => {
      if (segment === "buy" && p.type !== "buy") return false
      if (segment === "rent" && p.type !== "rent") return false
      // Max price
      if (filters.maxPrice && p.price > filters.maxPrice) return false
      // Beds (minimum)
      if (filters.beds && p.bedrooms < filters.beds) return false
      // Baths (minimum)
      if (filters.baths && p.bathrooms < filters.baths) return false
      // Property types (multi-select)
      if (filters.types && filters.types.length > 0 && !filters.types.includes(p.propertyType)) return false
      // Search text
      if (q) {
        const haystack = [
          p.title, p.location,
          p.titleI18n?.ar, p.locationI18n?.ar,
          p.propertyType,
        ].join(" ").toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [segment, filters, search])

  // When a marker is clicked, scroll the carousel to that card
  const handlePropertyClick = useCallback((id: string) => {
    setSelectedId(id)
    scrollingFromMap.current = true
    const idx = filteredProperties.findIndex((p) => p.id === id)
    if (idx >= 0 && railRef.current) {
      const card = railRef.current.children[idx] as HTMLElement | undefined
      if (card) {
        card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
      }
    }
    // Reset flag after scroll animation
    setTimeout(() => { scrollingFromMap.current = false }, 400)
  }, [filteredProperties])

  // When carousel scrolls, update selected property
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    let ticking = false
    const onScroll = () => {
      if (scrollingFromMap.current) return
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        const railRect = rail.getBoundingClientRect()
        const centerX = railRect.left + railRect.width * 0.3
        let closestId: string | undefined
        let closestDist = Infinity
        for (let i = 0; i < rail.children.length; i++) {
          const child = rail.children[i] as HTMLElement
          const childRect = child.getBoundingClientRect()
          const childCenter = childRect.left + childRect.width / 2
          const dist = Math.abs(childCenter - centerX)
          if (dist < closestDist) {
            closestDist = dist
            closestId = filteredProperties[i]?.id
          }
        }
        if (closestId && closestId !== selectedId) {
          setSelectedId(closestId)
        }
      })
    }

    rail.addEventListener("scroll", onScroll, { passive: true })
    return () => rail.removeEventListener("scroll", onScroll)
  }, [filteredProperties, selectedId])

  const handleMapState = useCallback(
    (s: { zoom: number; visibleCount: number; showPrices: boolean }) => {
      setMapState(s)
    },
    [],
  )

  // Dynamic summary
  const summaryText = useMemo(() => {
    const count = mapState.visibleCount
    if (isRTL) {
      return count > 0
        ? `${count} عقار في المنطقة المرئية`
        : "حرّك الخريطة لاستكشاف العقارات"
    }
    return count > 0
      ? `${count} ${count === 1 ? "property" : "properties"} in view`
      : "Pan the map to explore"
  }, [mapState.visibleCount, isRTL])

  const displayTitle = (p: Property) =>
    isRTL && p.titleI18n?.ar ? p.titleI18n.ar : p.title
  const displayLocation = (p: Property) =>
    isRTL && p.locationI18n?.ar ? p.locationI18n.ar : p.location

  return (
    <div className={mp.root} dir={isRTL ? "rtl" : "ltr"}>
      <style>{`
        footer, [data-footer] { display: none !important; }
        body > header:first-of-type { display: none !important; }
        @media (max-width: 768px) {
          .leaflet-control-zoom { display: none !important; }
        }
      `}</style>
      {/* Map fills remaining height — no AppHeader on Map page to maximize vertical space */}
      <div className={mp.mapWrap}>
        {/* Controls overlay with gradient backdrop */}
        <div className={mp.controlsWrap}>
          <div className={mp.controlsInner}>
            <SearchBar
              value={search}
              onChange={setSearch}
              onFilterClick={() => setFilterOpen(true)}
              onSelectArea={(area) => setSearch(isRTL ? area.ar : area.en)}
            />
            <SegmentedControl value={segment} onChange={setSegment} />
            {/* Dynamic summary pill */}
            <div className="flex items-center">
              <span className="text-xs font-medium text-slate-600 bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm border border-border">
                {summaryText}
              </span>
            </div>
          </div>
        </div>

        {/* Existing MapView — reused, not replaced */}
        <MapView
          properties={filteredProperties}
          selectedPropertyId={selectedId}
          onPropertyClick={handlePropertyClick}
          className="h-full"
          mode="full"
          onMapState={handleMapState}
        />

        {/* Bottom results carousel — docked above nav */}
        {filteredProperties.length > 0 && (
          <div className={mp.carouselWrap}>
            {/* Show as List CTA — sits above the card rail */}
            <div className={mp.listCtaRow}>
              <Link href="/properties" className={mp.listCta}>
                <LayoutList className={mp.listCtaIcon} />
                {isRTL ? "عرض كقائمة" : "Show as List"}
              </Link>
            </div>
            <div className={mp.carouselBg}>
              <div ref={railRef} className={mp.carouselRail}>
                {filteredProperties.map((p) => {
                  const isActive = p.id === selectedId
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePropertyClick(p.id)}
                      className={isActive ? mp.resultCardActive : mp.resultCard}
                    >
                      <div className={mp.resultImage}>
                        <Image
                          src={p.image}
                          alt={displayTitle(p)}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className={mp.resultBody}>
                        <div dir="ltr">
                          <span className={mp.resultPrice}>
                            {p.price.toLocaleString()} KD
                          </span>
                          {p.type === "rent" && (
                            <span className={mp.resultPriceSuffix}> / mo</span>
                          )}
                        </div>
                        <p className={mp.resultTitle}>{displayTitle(p)}</p>
                        <p className={mp.resultMeta}>
                          {p.bedrooms} {isRTL ? "غرف" : "Bed"} · {p.bathrooms} {isRTL ? "حمام" : "Bath"} · {p.area} m²
                        </p>
                        <p className={mp.resultLocation}>{displayLocation(p)}</p>
                      </div>
                    </button>
                  )
                })}
                {/* End spacer */}
                <div className="w-6 flex-shrink-0" aria-hidden />
              </div>
            </div>
          </div>
        )}
      </div>

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        appliedFilters={filters}
        onApply={setFilters}
      />
      <BottomNav />
    </div>
  )
}
