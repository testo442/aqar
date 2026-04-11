"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AppHeader from "@/components/v2/AppHeader"
import SearchBar from "@/components/v2/SearchBar"
import SegmentedControl, { type Segment } from "@/components/v2/SegmentedControl"
import MapPreviewCard from "@/components/v2/MapPreviewCard"
import BottomNav from "@/components/v2/BottomNav"
import FilterSheet from "@/components/v2/FilterSheet"
import MiniListingCard, { type MiniListingCardProps } from "@/components/v2/MiniListingCard"
import { useLanguage } from "@/app/providers"
import { Phone, Mail } from "lucide-react"
import WhatsAppIcon from "@/components/icons/WhatsAppIcon"
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
  const router = useRouter()

  const [segment, setSegment] = useState<Segment>("rent")
  const [search, setSearch] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)

  const navigateToMap = (query: string) => {
    if (query.trim()) {
      router.push(`/map?q=${encodeURIComponent(query.trim())}`)
    } else {
      router.push("/map")
    }
  }

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
              onSubmit={() => navigateToMap(search)}
              onSelectArea={(area) => navigateToMap(isRTL ? area.ar : area.en)}
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

        {/* Contact Us */}
        <section className="mt-6 mb-4">
          <h2 className={sec.title}>{isRTL ? "تواصل معنا" : "Contact Us"}</h2>
          <p className="text-xs text-slate-500 mt-1 mb-3 rtl:text-[13px]">
            {isRTL ? "نسعد بمساعدتك في أي وقت" : "We're here to help anytime"}
          </p>
          <div className="flex gap-2">
            <a
              href="https://wa.me/96500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl border border-border bg-card hover:bg-muted text-slate-600 text-sm font-semibold transition-colors duration-150"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {isRTL ? "واتساب" : "WhatsApp"}
            </a>
            <a
              href="tel:+96500000000"
              className="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl border border-border bg-card hover:bg-muted text-slate-600 text-sm font-semibold transition-colors duration-150"
            >
              <Phone className="h-4 w-4" />
              {isRTL ? "اتصال" : "Call"}
            </a>
            <a
              href="mailto:info@aqarna.kw"
              className="flex-1 flex items-center justify-center gap-2 h-11 rounded-2xl border border-border bg-card hover:bg-muted text-slate-600 text-sm font-semibold transition-colors duration-150"
            >
              <Mail className="h-4 w-4" />
              {isRTL ? "إيميل" : "Email"}
            </a>
          </div>
        </section>
      </div>

      <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} />
      <BottomNav />
    </div>
  )
}
