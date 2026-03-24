"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  Waves,
  Droplets,
  Flame,
  Wifi,
  Users,
  BedDouble,
  Star,
  SlidersHorizontal,
  BadgeCheck,
} from "lucide-react"
import AppHeader from "@/components/v2/AppHeader"
import BottomNav from "@/components/v2/BottomNav"
import { useLanguage } from "@/app/providers"
import {
  page as p,
  khiranPage as kp,
} from "@/components/v2/v2Styles"
import {
  KHIRAN_CHALETS,
  PACKAGES,
  type PackageKey,
  type MockChalet,
} from "@/lib/mock-chalets"

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false })

type SortOption = "recommended" | "price-low" | "price-high" | "rating"

export default function KhiranPage() {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"

  const [activePackage, setActivePackage] = useState<PackageKey>("weekend")
  const [maxPrice, setMaxPrice] = useState("")
  const [minBeds, setMinBeds] = useState<number | undefined>()
  const [minBaths, setMinBaths] = useState<number | undefined>()
  const [sort, setSort] = useState<SortOption>("recommended")

  const pkg = PACKAGES.find((pk) => pk.key === activePackage)!

  const parsedMaxPrice = maxPrice ? Number(maxPrice) : undefined

  // Filter + sort chalets
  const filteredChalets = useMemo(() => {
    let results = KHIRAN_CHALETS.filter((c) => {
      if (parsedMaxPrice && c.pricing[activePackage] > parsedMaxPrice) return false
      if (minBeds && c.bedrooms < minBeds) return false
      if (minBaths && c.bathrooms < minBaths) return false
      return true
    })

    if (sort === "price-low") {
      results = [...results].sort((a, b) => a.pricing[activePackage] - b.pricing[activePackage])
    } else if (sort === "price-high") {
      results = [...results].sort((a, b) => b.pricing[activePackage] - a.pricing[activePackage])
    } else if (sort === "rating") {
      results = [...results].sort((a, b) => b.rating - a.rating)
    }

    return results
  }, [activePackage, parsedMaxPrice, minBeds, minBaths, sort])

  // Map properties shape
  const mapProperties = useMemo(
    () =>
      filteredChalets.map((c) => ({
        id: c.id,
        title: c.title,
        location: "Khiran",
        price: c.pricing[activePackage],
        bedrooms: c.bedrooms,
        bathrooms: c.bathrooms,
        area: c.area,
        image: c.image,
        type: "rent" as const,
        lat: c.lat,
        lng: c.lng,
        titleI18n: { en: c.title, ar: c.titleAr },
        locationI18n: { en: "Khiran", ar: "الخيران" },
      })),
    [filteredChalets, activePackage],
  )

  const displayTitle = (c: MockChalet) =>
    isRTL ? c.titleAr : c.title

  const displayTag = (c: MockChalet) =>
    isRTL ? c.tagAr : c.tag

  const summaryText = useMemo(() => {
    const count = filteredChalets.length
    return isRTL
      ? `${count} شاليه متاح`
      : `${count} ${count === 1 ? "chalet" : "chalets"} available`
  }, [filteredChalets.length, isRTL])

  const amenityIcon = (key: string) => {
    switch (key) {
      case "pool": return <Droplets className={kp.cardAmenityIcon} />
      case "beach": return <Waves className={kp.cardAmenityIcon} />
      case "bbq": return <Flame className={kp.cardAmenityIcon} />
      case "wifi": return <Wifi className={kp.cardAmenityIcon} />
      default: return null
    }
  }

  const amenityLabel = (key: string) => {
    const labels: Record<string, { en: string; ar: string }> = {
      pool: { en: "Pool", ar: "مسبح" },
      beach: { en: "Beach", ar: "شاطئ" },
      bbq: { en: "BBQ", ar: "شواء" },
      wifi: { en: "WiFi", ar: "واي فاي" },
    }
    return isRTL ? labels[key]?.ar : labels[key]?.en
  }

  const bedOptions = [
    { label: isRTL ? "الكل" : "All", value: undefined },
    { label: "1+", value: 1 },
    { label: "2+", value: 2 },
    { label: "3+", value: 3 },
  ]

  const bathOptions = [
    { label: isRTL ? "الكل" : "All", value: undefined },
    { label: "1+", value: 1 },
    { label: "2+", value: 2 },
    { label: "3+", value: 3 },
  ]

  return (
    <div className={p.root} dir={isRTL ? "rtl" : "ltr"}>
      <style>{`
        footer, [data-footer] { display: none !important; }
        body > header:first-of-type { display: none !important; }
      `}</style>
      <AppHeader />

      <div className={p.container}>
        {/* Hero banner */}
        <div className={kp.heroBanner}>
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
            alt="Khiran"
            fill
            className="object-cover"
            sizes="480px"
            priority
          />
          <div className={kp.heroOverlay} />
          <div className={kp.heroContent}>
            <h1 className={kp.heroTitle}>
              {isRTL ? "شاليهات الخيران" : "Khiran Chalets"}
            </h1>
            <p className={kp.heroSub}>
              {isRTL
                ? "احجز شاليهك على شاطئ الخليج"
                : "Book your beachfront getaway"}
            </p>
          </div>
        </div>

        {/* Package tabs */}
        <div className={kp.packageBar}>
          {PACKAGES.map((pk) => (
            <button
              key={pk.key}
              type="button"
              onClick={() => setActivePackage(pk.key)}
              className={`${kp.packageTab} ${
                activePackage === pk.key ? kp.packageTabActive : kp.packageTabInactive
              }`}
            >
              {isRTL ? pk.ar : pk.en}
            </button>
          ))}
        </div>

        {/* Filters row */}
        <div className={kp.filterRow}>
          <SlidersHorizontal className={`${kp.filterChipIcon} mt-1.5 flex-shrink-0 text-slate-400`} />
          {/* Max price input */}
          <div className="flex-shrink-0 flex items-center gap-1">
            <span className="text-[11px] text-slate-400">{isRTL ? "حتى" : "Max"}</span>
            <input
              type="number"
              inputMode="numeric"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="KD"
              className="w-16 h-7 px-2 rounded-lg bg-card border border-border text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:border-primary-400 tabular-nums"
            />
          </div>
          <span className="w-px h-5 bg-border flex-shrink-0 self-center" />
          <span className="text-[11px] text-slate-400 flex-shrink-0 self-center">
            {isRTL ? "غرف:" : "Beds:"}
          </span>
          {bedOptions.map((opt) => (
            <button
              key={`bed-${opt.label}`}
              type="button"
              onClick={() => setMinBeds(opt.value)}
              className={minBeds === opt.value ? kp.filterChipActive : kp.filterChip}
            >
              {opt.label}
            </button>
          ))}
          <span className="w-px h-5 bg-border flex-shrink-0 self-center" />
          <span className="text-[11px] text-slate-400 flex-shrink-0 self-center">
            {isRTL ? "حمام:" : "Baths:"}
          </span>
          {bathOptions.map((opt) => (
            <button
              key={`bath-${opt.label}`}
              type="button"
              onClick={() => setMinBaths(opt.value)}
              className={minBaths === opt.value ? kp.filterChipActive : kp.filterChip}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Results summary + sort */}
        <div className={`${kp.summaryRow} ${isRTL ? "flex-row-reverse" : ""}`}>
          <span className={kp.summaryText}>{summaryText}</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-xs font-semibold text-slate-700 bg-transparent outline-none cursor-pointer rtl:text-[13px]"
          >
            <option value="recommended">{isRTL ? "الأفضل" : "Recommended"}</option>
            <option value="price-low">{isRTL ? "السعر: الأقل" : "Price: Low"}</option>
            <option value="price-high">{isRTL ? "السعر: الأعلى" : "Price: High"}</option>
            <option value="rating">{isRTL ? "التقييم" : "Top Rated"}</option>
          </select>
        </div>

        {/* Chalet grid */}
        <div className={kp.grid}>
          {filteredChalets.map((chalet) => (
            <Link key={chalet.id} href={`/khiran/${chalet.id}`} className={kp.card}>
              {/* Image */}
              <div className={kp.cardImageWrap} style={kp.cardImageAspect}>
                <Image
                  src={chalet.image}
                  alt={displayTitle(chalet)}
                  fill
                  className={kp.cardImage}
                  sizes="(max-width: 640px) 100vw, 300px"
                />
                {chalet.tag && (
                  <span className={kp.cardTag}>{displayTag(chalet)}</span>
                )}
                {chalet.verified && (
                  <span className={kp.cardVerified}>
                    <BadgeCheck className="h-3 w-3 inline -mt-px" /> {isRTL ? "موثق" : "Verified"}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className={kp.cardBody}>
                <h3 className={kp.cardTitle}>{displayTitle(chalet)}</h3>

                {/* Price for active package */}
                <div className={kp.cardPriceRow} dir="ltr">
                  <span className={kp.cardPrice}>
                    {chalet.pricing[activePackage].toLocaleString()} KD
                  </span>
                  <span className={kp.cardPriceSuffix}>
                    {isRTL ? pkg.suffixAr : pkg.suffix}
                  </span>
                </div>

                {/* Rating */}
                <div className={kp.cardRatingRow}>
                  <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                  <span className={kp.cardRating}>{chalet.rating}</span>
                  <span className={kp.cardReviews}>
                    ({chalet.reviewCount} {isRTL ? "تقييم" : "reviews"})
                  </span>
                </div>

                {/* Meta */}
                <p className={kp.cardMeta}>
                  <BedDouble className="h-3 w-3 inline -mt-0.5 text-slate-400" />{" "}
                  {chalet.bedrooms} {isRTL ? "غرف" : "Bed"} ·{" "}
                  <Users className="h-3 w-3 inline -mt-0.5 text-slate-400" />{" "}
                  {chalet.capacity} {isRTL ? "شخص" : "guests"} · {chalet.area} m²
                </p>

                {/* Amenities */}
                <div className={kp.cardAmenities}>
                  {chalet.pool && (
                    <span className={kp.cardAmenity}>
                      {amenityIcon("pool")} {amenityLabel("pool")}
                    </span>
                  )}
                  {chalet.beachAccess && (
                    <span className={kp.cardAmenity}>
                      {amenityIcon("beach")} {amenityLabel("beach")}
                    </span>
                  )}
                  {chalet.bbq && (
                    <span className={kp.cardAmenity}>
                      {amenityIcon("bbq")} {amenityLabel("bbq")}
                    </span>
                  )}
                  {chalet.wifi && (
                    <span className={kp.cardAmenity}>
                      {amenityIcon("wifi")} {amenityLabel("wifi")}
                    </span>
                  )}
                </div>

                {/* Book button */}
                <div className={kp.cardBookBtn}>
                  <span className={kp.cardBookBtnInner + " flex items-center justify-center"}>
                    {isRTL ? "عرض التفاصيل" : "View Details"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filteredChalets.length === 0 && (
          <div className={kp.empty}>
            <p className={kp.emptyText}>
              {isRTL ? "لا توجد شاليهات مطابقة." : "No matching chalets."}
            </p>
          </div>
        )}

        {/* Contextual Khiran map */}
        <div className={kp.mapSection}>
          <h2 className={kp.mapTitle}>
            {isRTL ? "موقع الشاليهات" : "Chalet Locations"}
          </h2>
          <div className={kp.mapWrap}>
            <MapView
              properties={mapProperties}
              className="h-full"
              mode="preview"
            />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
