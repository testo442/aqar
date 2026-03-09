"use client"

import { useState } from "react"
import AppHeader from "@/components/v2/AppHeader"
import SearchBar from "@/components/v2/SearchBar"
import SegmentedControl, { type Segment } from "@/components/v2/SegmentedControl"
import MapPreviewCard from "@/components/v2/MapPreviewCard"
import BottomNav from "@/components/v2/BottomNav"
import FilterSheet from "@/components/v2/FilterSheet"
import MiniListingCard, { type MiniListingCardProps } from "@/components/v2/MiniListingCard"
import { useLanguage } from "@/app/providers"
import {
  page as p,
  section as sec,
  carousel as car,
  trustBar as tb,
} from "@/components/v2/v2Styles"

const LISTINGS: (MiniListingCardProps & { lat: number; lng: number })[] = [
  {
    id: "1",
    title: "Sea-view Villa",
    titleAr: "فيلا مطلة على البحر",
    price: 1200,
    beds: 4,
    area: 520,
    location: "Khiran",
    locationAr: "الخيران",
    rating: 4.9,
    stars: 4,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    lat: 28.651,
    lng: 48.378,
  },
  {
    id: "2",
    title: "Modern Apartment",
    titleAr: "شقة حديثة",
    price: 650,
    beds: 2,
    area: 120,
    location: "Salmiya",
    locationAr: "السالمية",
    stars: 1,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80",
    lat: 29.334,
    lng: 48.083,
  },
  {
    id: "3",
    title: "Beachfront Chalet",
    titleAr: "شاليه على الشاطئ",
    price: 180,
    beds: 1,
    area: 50,
    location: "Khiran",
    locationAr: "الخيران",
    verified: true,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
    lat: 28.638,
    lng: 48.382,
  },
]

export default function UIV2Page() {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"

  const [segment, setSegment] = useState<Segment>("rent")
  const [search, setSearch] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className={p.root} dir={isRTL ? "rtl" : "ltr"}>
      {/* Hide the global site footer on this page */}
      <style>{`footer, [data-footer] { display: none !important; }`}</style>
      <AppHeader />

      <div className={p.container}>
        {/* Hero */}
        <div className={p.heroGrid}>
          <div className={p.controlsCol}>
            <SearchBar
              value={search}
              onChange={setSearch}
              onFilterClick={() => setFilterOpen(true)}
            />
            <SegmentedControl value={segment} onChange={setSegment} />
          </div>

          {/* Interactive map with listings as pins */}
          <MapPreviewCard listings={LISTINGS} />
        </div>

        {/* Popular in Khiran */}
        <section className={sec.wrapper}>
          <div className={`${sec.headerRow} ${isRTL ? "flex-row-reverse" : ""}`}>
            <h2 className={sec.title}>
              {isRTL ? "الأكثر رواجاً الآن" : "Popular Now"}
            </h2>
            <a href="/properties" className={sec.viewAll}>
              {isRTL ? "عرض الكل ←" : "View all →"}
            </a>
          </div>

          <div className={car.outerWrap}>
            <div className={`${car.rail} ${isRTL ? "flex-row-reverse" : ""}`}>
              {LISTINGS.map((listing) => (
                <MiniListingCard
                  key={listing.id}
                  {...listing}
                  href={`/properties/${listing.id}`}
                />
              ))}
              <div className={car.endSpacer} aria-hidden />
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <div className={`${tb.wrapper} ${isRTL ? "flex-row-reverse" : ""}`}>
          <span className={tb.item}>
            <span className={tb.icon}>✓</span>
            <span className={tb.text}>{isRTL ? "قوائم موثقة" : "Verified listings"}</span>
          </span>
          <span className={tb.dot}>·</span>
          <span className={tb.text}>{isRTL ? "بحث مبني على الخريطة" : "Map-first search"}</span>
          <span className={tb.dot}>·</span>
          <span className={tb.accent}>{isRTL ? "جاهز للكويت" : "Kuwait‑ready"}</span>
        </div>
      </div>

      <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} />
      <BottomNav />
    </div>
  )
}
