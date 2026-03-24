"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Map, SlidersHorizontal, X } from "lucide-react"
import AppHeader from "@/components/v2/AppHeader"
import SearchBar from "@/components/v2/SearchBar"
import SegmentedControl, { type Segment } from "@/components/v2/SegmentedControl"
import BottomNav from "@/components/v2/BottomNav"
import FilterSheet, { type FilterValues } from "@/components/v2/FilterSheet"
import ListingCard, { type ListingCardData } from "@/components/v2/ListingCard"
import { useLanguage } from "@/app/providers"
import {
  page as p,
  listingsPage as lp,
} from "@/components/v2/v2Styles"
import { MOCK_LISTINGS } from "@/lib/mock-listings"
import type { Area } from "@/lib/areas"

type SortOption = "recommended" | "price-low" | "price-high" | "latest"

interface ActiveFilters {
  maxPrice?: number
  beds?: number
  baths?: number
  types?: string[]
  location?: string
}

export default function ListingsV2Page() {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"

  const [segment, setSegment] = useState<Segment>("rent")
  const [search, setSearch] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [sort, setSort] = useState<SortOption>("recommended")
  const [filters, setFilters] = useState<ActiveFilters>({})

  const filterCount = useMemo(() => {
    let count = 0
    if (filters.maxPrice) count++
    if (filters.beds) count++
    if (filters.baths) count++
    if (filters.types && filters.types.length > 0) count++
    if (filters.location) count++
    return count
  }, [filters])

  // Convert FilterSheet values → ActiveFilters (preserves location which isn't in the sheet)
  const handleApplyFilters = (fv: FilterValues) => {
    setFilters((prev) => ({
      location: prev.location, // preserve location (not managed by sheet)
      maxPrice: fv.maxPrice,
      beds: fv.beds,
      baths: fv.baths,
      types: fv.types,
    }))
  }

  // Build FilterValues for the sheet (strips location which the sheet doesn't manage)
  const sheetFilters: FilterValues = useMemo(() => ({
    maxPrice: filters.maxPrice,
    beds: filters.beds,
    baths: filters.baths,
    types: filters.types,
  }), [filters.maxPrice, filters.beds, filters.baths, filters.types])

  // When user selects an area suggestion, set it as location filter
  const handleSelectArea = (area: Area) => {
    setSearch(isRTL ? area.ar : area.en)
  }

  const removeFilter = (key: keyof ActiveFilters) => {
    setFilters((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  // ── Filter + search + sort the shared mock data ────────────────────────────
  const filteredListings = useMemo(() => {
    const q = search.trim().toLowerCase()

    let results = MOCK_LISTINGS.filter((p) => {
      // Buy/Rent segment
      if (segment === "buy" && p.type !== "buy") return false
      if (segment === "rent" && p.type !== "rent") return false

      // Location filter
      if (filters.location && p.location !== filters.location) return false

      // Beds filter (minimum)
      if (filters.beds && p.bedrooms < filters.beds) return false

      // Baths filter (minimum)
      if (filters.baths && p.bathrooms < filters.baths) return false

      // Max price filter
      if (filters.maxPrice && p.price > filters.maxPrice) return false

      // Property type filter (multi-select)
      if (filters.types && filters.types.length > 0 && !filters.types.includes(p.propertyType)) return false

      // Search query — match against title, titleAr, location, locationAr, governorate, propertyType
      if (q) {
        const haystack = [
          p.title, p.titleAr, p.location, p.locationAr,
          p.governorate, p.governorateAr, p.propertyType,
        ].join(" ").toLowerCase()
        if (!haystack.includes(q)) return false
      }

      return true
    })

    // Sort
    if (sort === "price-low") {
      results = [...results].sort((a, b) => a.price - b.price)
    } else if (sort === "price-high") {
      results = [...results].sort((a, b) => b.price - a.price)
    } else if (sort === "latest") {
      results = [...results].sort((a, b) => a.listedDaysAgo - b.listedDaysAgo)
    }

    return results
  }, [segment, search, filters, sort])

  // ── Map shared MockProperty → ListingCardData ──────────────────────────────
  const cardData: ListingCardData[] = useMemo(() => {
    return filteredListings.map((p) => ({
      id: p.id,
      title: p.title,
      titleAr: p.titleAr,
      price: p.price,
      pricePeriod: p.pricePeriod,
      beds: p.bedrooms,
      baths: p.bathrooms,
      area: p.area,
      image: p.image,
      location: p.location,
      locationAr: p.locationAr,
      isFeatured: p.isFeatured,
    }))
  }, [filteredListings])

  // ── Dynamic results summary ────────────────────────────────────────────────
  const summaryText = useMemo(() => {
    const count = cardData.length
    const loc = filters.location
    if (isRTL) {
      if (loc) {
        const locAr = MOCK_LISTINGS.find((l) => l.location === loc)?.locationAr ?? loc
        return `${count} عقار في ${locAr}`
      }
      return `${count} عقار`
    }
    if (loc) {
      return `${count} ${count === 1 ? "home" : "homes"} in ${loc}`
    }
    return `${count} ${count === 1 ? "home" : "homes"} found`
  }, [cardData.length, filters.location, isRTL])

  // ── Filter chips ───────────────────────────────────────────────────────────
  const chips = useMemo(() => {
    const list: { key: keyof ActiveFilters; label: string }[] = []
    if (filters.location) {
      const locAr = MOCK_LISTINGS.find((l) => l.location === filters.location)?.locationAr
      list.push({
        key: "location",
        label: isRTL ? locAr ?? filters.location : filters.location,
      })
    }
    if (filters.beds) {
      list.push({
        key: "beds",
        label: isRTL ? `${filters.beds}+ غرف` : `${filters.beds}+ Beds`,
      })
    }
    if (filters.baths) {
      list.push({
        key: "baths",
        label: isRTL ? `${filters.baths}+ حمام` : `${filters.baths}+ Baths`,
      })
    }
    if (filters.maxPrice) {
      list.push({
        key: "maxPrice",
        label: isRTL ? `حتى ${filters.maxPrice.toLocaleString()} د.ك` : `Up to ${filters.maxPrice.toLocaleString()} KD`,
      })
    }
    if (filters.types && filters.types.length > 0) {
      list.push({
        key: "types",
        label: filters.types.join(", "),
      })
    }
    return list
  }, [filters, isRTL])

  // ── Sort options ───────────────────────────────────────────────────────────
  const sortOptions: { value: SortOption; en: string; ar: string }[] = [
    { value: "recommended", en: "Recommended", ar: "الأفضل" },
    { value: "price-low",   en: "Price: Low",  ar: "السعر: الأقل" },
    { value: "price-high",  en: "Price: High", ar: "السعر: الأعلى" },
    { value: "latest",      en: "Latest",      ar: "الأحدث" },
  ]

  return (
    <div className={p.root} dir={isRTL ? "rtl" : "ltr"}>
      <style>{`
        footer, [data-footer] { display: none !important; }
        body > header:first-of-type { display: none !important; }
      `}</style>
      <AppHeader />

      <div className={p.container}>
        {/* Search + Filter */}
        <div className="space-y-2.5 mb-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            onFilterClick={() => setFilterOpen(true)}
            filterCount={filterCount || undefined}
            onSelectArea={handleSelectArea}
          />
          <SegmentedControl value={segment} onChange={setSegment} />
        </div>

        {/* Results summary */}
        <div className={`${lp.summaryRow} ${isRTL ? "flex-row-reverse" : ""}`}>
          <span className={lp.summaryText}>{summaryText}</span>
        </div>

        {/* Filter chips */}
        {chips.length > 0 && (
          <div className={lp.chipsScroll}>
            {chips.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => removeFilter(key)}
                className={lp.chipActive}
              >
                {label}
                <X className={lp.chipClose} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setFilterOpen(true)}
              className={lp.chipMore}
            >
              <SlidersHorizontal className={lp.chipClose} />
              {isRTL ? "المزيد" : "More Filters"}
            </button>
          </div>
        )}

        {/* Sort row */}
        <div className={`${lp.sortRow} ${isRTL ? "flex-row-reverse" : ""}`}>
          <div className={`${lp.sortLeft} ${isRTL ? "flex-row-reverse" : ""}`}>
            <span className={lp.sortLabel}>{isRTL ? "ترتيب:" : "Sort:"}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className={lp.sortSelect}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {isRTL ? o.ar : o.en}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Listing grid — first 2 are featured */}
        <div className={lp.gridWrap}>
          <div className={lp.grid}>
            {cardData.map((listing, i) => (
              <ListingCard
                key={listing.id}
                {...listing}
                isFeatured={i < 2}
                href={`/properties/${listing.id}`}
              />
            ))}
          </div>
        </div>

        {/* Empty state */}
        {cardData.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-slate-500">
              {isRTL ? "لا توجد نتائج مطابقة." : "No matching results."}
            </p>
          </div>
        )}
      </div>

      {/* Show on Map floating CTA */}
      <Link
        href="/map"
        className={filterCount > 0 ? lp.mapCtaActive : lp.mapCta}
      >
        <Map className={lp.mapCtaIcon} />
        {isRTL ? "عرض على الخريطة" : "Show on Map"}
      </Link>

      <FilterSheet
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        appliedFilters={sheetFilters}
        onApply={handleApplyFilters}
      />
      <BottomNav />
    </div>
  )
}
