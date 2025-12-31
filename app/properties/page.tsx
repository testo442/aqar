"use client"

import { useState, useMemo, useRef, useCallback, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import { Search, Filter, Map, List, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SearchToggle from "@/components/SearchToggle"
import ListingCard from "@/components/ListingCard"
import MobileListingRail from "@/components/MobileListingRail"
import { mockProperties } from "./data/properties"
import { GOVERNORATES, getAreasForGovernorate } from "@/lib/governorates"
import { useLanguage } from "@/app/providers"
import { t } from "@/lib/translations"
import { tText } from "@/lib/i18n"

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center">
      <div className="text-slate-600">Loading map...</div>
    </div>
  ),
})

// ---- Coord safety helper (page-level) ----
const isValidCoord = (lat: unknown, lng: unknown) => {
  const latNum = Number(lat)
  const lngNum = Number(lng)
  return Number.isFinite(latNum) && Number.isFinite(lngNum)
}

function PropertiesPageContent() {
  const searchParams = useSearchParams()
  const { lang } = useLanguage()
  const didInitFromUrl = useRef(false)
  const [searchType, setSearchType] = useState<"buy" | "rent">("buy")
  const [searchQuery, setSearchQuery] = useState("")
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>("any")
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>()
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | undefined>()
  const [mobileView, setMobileView] = useState<"map" | "list">("map")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGovernorateIds, setSelectedGovernorateIds] = useState<string[]>([])
  const [selectedAreaIds, setSelectedAreaIds] = useState<string[]>([])
  const [bedsMin, setBedsMin] = useState<number | null>(null)
  const [bathsMin, setBathsMin] = useState<number | null>(null)

  // Refs for scrolling listings into view
  const listingRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Prevent body scroll when filters modal is open (mobile only)
  useEffect(() => {
    // Only apply on mobile screens (md:hidden means modal only shows on mobile)
    if (typeof window === 'undefined') return
    
    const isMobile = window.innerWidth < 768 // md breakpoint
    if (!isMobile) return

    const prevOverflow = document.body.style.overflow
    if (showFilters) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = prevOverflow || ''
    }
    return () => {
      document.body.style.overflow = prevOverflow || ''
    }
  }, [showFilters])

  // Initialize state from URL params (only when params differ to avoid loops)
  useEffect(() => {
    if (didInitFromUrl.current) return

    const typeParam = searchParams.get("type")
    if (typeParam === "buy" || typeParam === "rent") {
      if (typeParam !== searchType) {
        setSearchType(typeParam)
      }
    }

    const queryParam = searchParams.get("query")
    const queryValue = queryParam ? queryParam.trim() : ""
    if (queryValue) {
      setSearchQuery(queryValue)
    }
    

    const maxPriceParam = searchParams.get("maxPrice")
    if (maxPriceParam) {
      const priceNum = Number(maxPriceParam)
      if (!Number.isNaN(priceNum) && priceNum > 0) {

        if (priceNum !== maxPrice) {
          setMaxPrice(priceNum)
        }
      }
    } else if (maxPrice !== null) {
      setMaxPrice(null)
    }

    const propertyTypeParam = searchParams.get("propertyType")
    if (propertyTypeParam) {
      const normalized = propertyTypeParam.toLowerCase()
      if (normalized !== propertyTypeFilter) {
        setPropertyTypeFilter(normalized)
      }
    } else if (propertyTypeFilter !== "any") {
      setPropertyTypeFilter("any")
    }
    didInitFromUrl.current = true

  }, [searchParams])

  // Filter properties based on search, governorate, area, maxPrice, and propertyType
  const filteredProperties = useMemo(() => {
    return mockProperties.filter((property) => {
      const matchesType = property.type === searchType
      const matchesSearch =
        searchQuery === "" ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      // Filter by maxPrice (if set)
      const matchesMaxPrice = maxPrice === null || property.price <= maxPrice
      
      // Filter by propertyType (if not "any")
      // Since Property type doesn't have a propertyType field, we check title
      let matchesPropertyType = true
      if (propertyTypeFilter !== "any") {
        const titleLower = property.title.toLowerCase()
        // Normalize filter: replace underscores with spaces for matching
        const filterNormalized = propertyTypeFilter.toLowerCase().replace(/_/g, " ")
        // Check if title contains the property type word
        matchesPropertyType = titleLower.includes(filterNormalized)
      }
      
      // Filter by governorates (if any selected)
      let matchesGovernorates = true
      if (selectedGovernorateIds.length > 0) {
        const allAreaIds = selectedGovernorateIds.flatMap((govId) => {
          const governorateAreas = getAreasForGovernorate(govId)
          return governorateAreas.map((a) => a.id)
        })
        matchesGovernorates = property.areaInfo?.id ? allAreaIds.includes(property.areaInfo.id) : false
      }
      
      // Filter by areas (if any selected)
      let matchesAreas = true
      if (selectedAreaIds.length > 0) {
        matchesAreas = property.areaInfo?.id ? selectedAreaIds.includes(property.areaInfo.id) : false
      }
      
      // Filter by bedrooms (if set)
      let matchesBeds = true
      if (bedsMin !== null) {
        const propertyBeds = property.bedrooms ?? 0
        matchesBeds = propertyBeds >= bedsMin
      }
      
      // Filter by bathrooms (if set)
      let matchesBaths = true
      if (bathsMin !== null) {
        const propertyBaths = property.bathrooms ?? 0
        matchesBaths = propertyBaths >= bathsMin
      }
      
      return matchesType && matchesSearch && matchesMaxPrice && matchesPropertyType && matchesGovernorates && matchesAreas && matchesBeds && matchesBaths
    })
  }, [searchType, searchQuery, maxPrice, propertyTypeFilter, selectedGovernorateIds, selectedAreaIds, bedsMin, bathsMin])

  // Properties that are SAFE to send to the map
  const mappableProperties = useMemo(() => {
    return filteredProperties.filter((p) => isValidCoord(p.lat, p.lng))
  }, [filteredProperties])

  // Handle property selection
  const handlePropertySelect = useCallback(
    (propertyId: string) => {
      setSelectedPropertyId(propertyId)

      // Scroll listing into view on desktop
      if (typeof window !== "undefined" && window.innerWidth >= 768) {
        const listingElement = listingRefs.current[propertyId]
        if (listingElement) {
          listingElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }

      // On mobile list view, scroll to listing
      if (
        typeof window !== "undefined" &&
        window.innerWidth < 768 &&
        mobileView === "list"
      ) {
        const listingElement = listingRefs.current[propertyId]
        if (listingElement) {
          listingElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }
      // On mobile map view, MobileListingRail handles scrolling
    },
    [mobileView]
  )

  // Handle property hover (desktop only)
  const handlePropertyHover = useCallback((propertyId: string | undefined) => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setHoveredPropertyId(propertyId)
    }
  }, [])


  // Handle area toggle
  const handleAreaToggle = useCallback((areaId: string) => {
    setSelectedAreaIds((prev) =>
      prev.includes(areaId) ? prev.filter((id) => id !== areaId) : [...prev, areaId]
    )
  }, [])

  // Handle clear filters
  const handleClearFilters = useCallback(() => {
    setSelectedGovernorateIds([])
    setSelectedAreaIds([])
    setMaxPrice(null)
    setPropertyTypeFilter("any")
    setBedsMin(null)
    setBathsMin(null)
  }, [])

  // Handle apply filters (close modal)
  const handleApplyFilters = useCallback(() => {
    setShowFilters(false)
  }, [])

  // Handle clear search and filters
  const handleClearSearch = useCallback(() => {
    setSearchQuery("")
    setSelectedGovernorateIds([])
    setSelectedAreaIds([])
    setMaxPrice(null)
    setPropertyTypeFilter("any")
    setBedsMin(null)
    setBathsMin(null)
  }, [])

  // Handle show all properties (reset everything including URL params)
  const handleShowAllProperties = useCallback(() => {
    setSearchType("buy")
    setSearchQuery("")
    setSelectedGovernorateIds([])
    setSelectedAreaIds([])
    setMaxPrice(null)
    setPropertyTypeFilter("any")
    setBedsMin(null)
    setBathsMin(null)
    // Clear URL params by navigating to /properties
    window.history.replaceState({}, "", "/properties")
  }, [])

  // Handle switch to buy
  const handleSwitchToBuy = useCallback(() => {
    setSearchType("buy")
  }, [])

  // Build mapping: areaId -> governorateId (for pruning areas when governorate is unselected)
  const areaToGovernorateId = useMemo(() => {
    const mapping: Record<string, string> = {}
    GOVERNORATES.forEach((gov) => {
      gov.areas.forEach((area) => {
        mapping[area.id] = gov.id
      })
    })
    return mapping
  }, [])

  // Handle governorate toggle (multi-select)
  const handleGovernorateToggle = useCallback((governorateId: string) => {
    setSelectedGovernorateIds((prev) => {
      const isSelected = prev.includes(governorateId)
      const newIds = isSelected 
        ? prev.filter((id) => id !== governorateId)
        : [...prev, governorateId]
      
      // Only remove areas when governorate is being unselected
      // When adding a governorate, keep all existing area selections
      if (isSelected) {
        // Remove only areas that belong to the unselected governorate
        setSelectedAreaIds((prevAreas) => 
          prevAreas.filter((areaId) => areaToGovernorateId[areaId] !== governorateId)
        )
      }
      
      return newIds
    })
  }, [areaToGovernorateId])

  // Get areas for all selected governorates
  const availableAreas = useMemo(() => {
    if (selectedGovernorateIds.length === 0) return []
    const allAreas = selectedGovernorateIds.flatMap((govId) => 
      getAreasForGovernorate(govId)
    )
    // Remove duplicates by id
    const seen = new Set<string>()
    return allAreas.filter((area) => {
      if (seen.has(area.id)) {
        return false
      }
      seen.add(area.id)
      return true
    })
  }, [selectedGovernorateIds])

  // Calculate active filters count
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (propertyTypeFilter !== "any" && propertyTypeFilter !== "") count++
    if (selectedGovernorateIds.length > 0) count++
    if (selectedAreaIds.length > 0) count++
    if (bedsMin !== null) count++
    if (bathsMin !== null) count++
    if (maxPrice !== null) count++
    return count
  }, [propertyTypeFilter, selectedGovernorateIds.length, selectedAreaIds.length, bedsMin, bathsMin, maxPrice])

  // Reset propertyTypeFilter if it becomes invalid when switching buy/rent
  useEffect(() => {
    if (propertyTypeFilter === "any") return
    
    const buyTypes = ["villa", "apartment", "land", "tower"]
    const rentTypes = ["villa", "apartment", "villa_floor"]
    const validTypes = searchType === "buy" ? buyTypes : rentTypes
    
    if (!validTypes.includes(propertyTypeFilter)) {
      setPropertyTypeFilter("any")
    }
  }, [searchType, propertyTypeFilter])

  // SAFE selected property for map flyTo
  const selectedProperty = useMemo(() => {
    if (!selectedPropertyId) return null

    const property = filteredProperties.find(
      (p) => p.id === selectedPropertyId
    )

    if (!property) return null

    if (!isValidCoord(property.lat, property.lng)) {
      console.warn("[PropertiesPage] Selected property has invalid coords:", {
        id: property.id,
        title: property.title,
        lat: property.lat,
        lng: property.lng,
      })
      return null
    }

    return {
      lat: Number(property.lat),
      lng: Number(property.lng),
    }
  }, [selectedPropertyId, filteredProperties])

  return (
    <div className="flex flex-col min-h-screen md:h-[calc(100vh-4rem)]">
      {/* Search Bar - Sticky Top */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm flex-shrink-0">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Mobile Header */}
            <div className="flex items-center justify-between md:hidden">
              <h1 className={`text-lg font-bold text-slate-900 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("properties", lang)}</h1>
              <div className="inline-flex items-center rounded-xl bg-white shadow-soft border border-slate-200 p-1">
                <button
                  type="button"
                  onClick={() => setMobileView("map")}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mobileView === "map"
                      ? "bg-primary-600 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Map className="h-4 w-4" />
                  {t("map", lang)}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileView("list")}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mobileView === "list"
                      ? "bg-primary-600 text-white"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                  {t("list", lang)}
                </button>
              </div>
            </div>

            {/* Search Controls */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Search className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 ${lang === "ar" ? "right-3" : "left-3"}`} />
                  <Input
                    type="text"
                    placeholder={t("searchByLocation", lang)}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${lang === "ar" ? "pr-10" : "pl-10"} h-11 rounded-xl`}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <SearchToggle value={searchType} onChange={setSearchType} />
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden"
                >
                  <Filter className={`h-4 w-4 ${lang === "ar" ? "ml-2" : "mr-2"}`} />
                  {t("filters", lang)}
                  {activeFilterCount > 0 && (
                    <span className={`inline-flex items-center justify-center rounded-full bg-primary-600 text-white text-xs font-semibold w-5 h-5 ${lang === "ar" ? "mr-2" : "ml-2"}`}>
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div
          className="fixed inset-0 z-[70] md:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowFilters(false)
            }
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 z-[71]" />
          
          {/* Modal */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-soft-xl max-h-[85vh] overflow-auto z-[72] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-200">
              <h2 className={`text-lg font-semibold text-slate-900 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("filters", lang)}</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {/* Property Type Selection */}
              <div className="mb-6">
                <h3 className={`text-sm font-semibold text-slate-900 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("propertyTypeLabel", lang)}</h3>
                <select
                  value={propertyTypeFilter}
                  onChange={(e) => setPropertyTypeFilter(e.target.value)}
                  className={`flex h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200 ${
                    lang === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  <option value="any">{t("any", lang)}</option>
                  {searchType === "buy" ? (
                    <>
                      <option value="villa">{t("villa", lang)}</option>
                      <option value="apartment">{t("apartment", lang)}</option>
                      <option value="land">{t("land", lang)}</option>
                      <option value="tower">{t("tower", lang)}</option>
                    </>
                  ) : (
                    <>
                      <option value="villa">{t("villa", lang)}</option>
                      <option value="apartment">{t("apartment", lang)}</option>
                      <option value="villa_floor">{t("villaFloor", lang)}</option>
                    </>
                  )}
                </select>
              </div>

              {/* Governorate Selection (Multi-select) */}
              <div className="mb-6">
                <h3 className={`text-sm font-semibold text-slate-900 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("governorate", lang)}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {GOVERNORATES.map((gov) => (
                    <button
                      key={gov.id}
                      type="button"
                      onClick={() => handleGovernorateToggle(gov.id)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${lang === "ar" ? "text-right" : "text-left"} ${
                        selectedGovernorateIds.includes(gov.id)
                          ? "bg-primary-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {tText({ en: gov.en, ar: gov.ar }, lang, gov.en)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Area Selection (show if any governorate selected) */}
              {selectedGovernorateIds.length > 0 && availableAreas.length > 0 && (
                <div className="mb-6">
                  <h3 className={`text-sm font-semibold text-slate-900 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("areas", lang)}</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {availableAreas.map((area) => (
                      <label
                        key={area.id}
                        className={`flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer ${lang === "ar" ? "flex-row-reverse" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAreaIds.includes(area.id)}
                          onChange={() => handleAreaToggle(area.id)}
                          className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-200"
                        />
                        <span className={`text-sm text-slate-700 ${lang === "ar" ? "text-right" : "text-left"}`}>{tText({ en: area.en, ar: area.ar }, lang, area.en)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Bedrooms Filter */}
              <div className="mb-6">
                <h3 className={`text-sm font-semibold text-slate-900 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("bedroomsLabel", lang)}</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setBedsMin(null)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      bedsMin === null
                        ? "bg-primary-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {t("any", lang)}
                  </button>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBedsMin(num)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        bedsMin === num
                          ? "bg-primary-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms Filter */}
              <div className="mb-6">
                <h3 className={`text-sm font-semibold text-slate-900 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("bathroomsLabel", lang)}</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setBathsMin(null)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      bathsMin === null
                        ? "bg-primary-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {t("any", lang)}
                  </button>
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setBathsMin(num)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        bathsMin === num
                          ? "bg-primary-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {num}+
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex gap-3 px-4 py-4 border-t border-slate-200 bg-white">
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="flex-1"
              >
                {t("clear", lang)}
              </Button>
              <Button
                onClick={handleApplyFilters}
                className="flex-1"
              >
                {t("apply", lang)}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Desktop */}
        <div className="hidden md:flex flex-1 min-h-0 w-full">
            <div className="w-[420px] lg:w-[480px] bg-white border-r flex flex-col min-h-0 overflow-hidden">
                <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
                  <div className="px-4 py-3 border-b sticky top-0 bg-white z-10">
                    <p className={`text-sm text-slate-600 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {filteredProperties.length} {filteredProperties.length === 1 ? t("propertyFound", lang) : t("propertiesFound", lang)}
                    </p>
                  </div>
                  {filteredProperties.length === 0 ? (
                    <div className={`flex flex-col items-center justify-center px-4 py-16 text-center ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <div className="mb-6">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          {t("noPropertiesFound", lang)}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {searchQuery
                            ? `${t("noResultsFor", lang)} "${searchQuery}" ${searchType === "buy" ? t("inBuy", lang) : t("inRent", lang)}`
                            : `No ${searchType === "buy" ? "properties for sale" : "rental properties"} match your filters`}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 w-full max-w-xs">
                        {searchQuery && (
                          <Button
                            variant="outline"
                            onClick={handleClearSearch}
                            className="w-full"
                          >
                            {t("clearSearch", lang)}
                          </Button>
                        )}
                        {searchType === "rent" && (
                          <Button
                            onClick={handleSwitchToBuy}
                            className="w-full"
                          >
                            {t("switchToBuy", lang)}
                          </Button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="px-4 pt-4 pb-4 space-y-4">
                      {filteredProperties.map((property) => (
                        <div
                          key={property.id}
                          ref={(el) => {
                            listingRefs.current[property.id] = el
                          }}
                          onMouseEnter={() => handlePropertyHover(property.id)}
                          onMouseLeave={() => handlePropertyHover(undefined)}
                        >
                          <ListingCard
                            {...property}
                            isHovered={hoveredPropertyId === property.id}
                            isSelected={selectedPropertyId === property.id}
                            href={`/properties/${property.id}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

          <div className="flex-1 relative min-h-0 overflow-hidden">
            <MapView
              properties={mappableProperties}
              selectedPropertyId={selectedPropertyId}
              hoveredPropertyId={hoveredPropertyId}
              onPropertyClick={handlePropertySelect}
              onPropertyHover={handlePropertyHover}
              className="h-full w-full"
            />
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden relative w-full flex-1 min-h-0">
          {mobileView === "map" ? (
            <>
              <div className="absolute inset-0">
                <MapView
                  properties={mappableProperties}
                  selectedPropertyId={selectedPropertyId}
                  hoveredPropertyId={undefined}
                  onPropertyClick={handlePropertySelect}
                  onPropertyHover={undefined}
                  className="w-full h-full"
                />
              </div>
              {filteredProperties.length === 0 ? (
                <div className="absolute bottom-20 left-4 right-4 z-30 pb-safe">
                  <div className={`bg-white rounded-2xl shadow-soft-lg border border-slate-200 p-6 ${lang === "ar" ? "text-right" : "text-left"}`}>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {t("noPropertiesFound", lang)}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {t("noPropertiesFoundSubtitle", lang)}
                    </p>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        onClick={handleClearFilters}
                        className="w-full"
                        size="sm"
                      >
                        {t("clearFilters", lang)}
                      </Button>
                      <Button
                        onClick={handleShowAllProperties}
                        className="w-full"
                        size="sm"
                      >
                        {t("showAllProperties", lang)}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                !showFilters && (
                  <div className="fixed left-0 right-0 bottom-0 z-[60] pb-[env(safe-area-inset-bottom)]">
                    <MobileListingRail
                      properties={filteredProperties}
                      selectedPropertyId={selectedPropertyId}
                      onSelect={handlePropertySelect}
                    />
                  </div>
                )
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {filteredProperties.length === 0 ? (
                    <div className={`flex flex-col items-center justify-center px-4 py-16 min-h-full ${lang === "ar" ? "text-right" : "text-left"}`}>
                      <div className="max-w-md w-full bg-white rounded-2xl shadow-soft-lg border border-slate-200 p-8">
                        <h3 className="text-xl font-semibold text-slate-900 mb-2 text-center">
                          {t("noPropertiesFound", lang)}
                        </h3>
                        <p className="text-sm text-slate-600 mb-6 text-center">
                          {t("noPropertiesFoundSubtitle", lang)}
                        </p>
                        <div className="flex flex-col gap-3">
                          <Button
                            variant="outline"
                            onClick={handleClearFilters}
                            className="w-full"
                          >
                            {t("clearFilters", lang)}
                          </Button>
                          <Button
                            onClick={handleShowAllProperties}
                            className="w-full"
                          >
                            {t("showAllProperties", lang)}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b sticky top-0 bg-white z-10">
                        <p className={`text-xs text-slate-600 ${lang === "ar" ? "text-right" : "text-left"}`}>
                          {filteredProperties.length} {filteredProperties.length === 1 ? t("propertyFound", lang) : t("propertiesFound", lang)}
                        </p>
                      </div>
                      <div className="px-3 pt-2 pb-4 space-y-3">
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      ref={(el) => {
                        listingRefs.current[property.id] = el
                      }}
                    >
                      <ListingCard
                        {...property}
                        isSelected={selectedPropertyId === property.id}
                        href={`/properties/${property.id}`}
                      />
                    </div>
                  ))}
                      </div>
                    </>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col h-full">
        <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="text-slate-600">Loading...</div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-slate-600">Loading properties...</div>
        </div>
      </div>
    }>
      <PropertiesPageContent />
    </Suspense>
  )
}
