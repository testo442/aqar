"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Search, MapPin, DollarSign, Zap, Shield, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PropertyCard from "@/components/PropertyCard"
import SearchToggle from "@/components/SearchToggle"
import { useLanguage } from "@/app/providers"
import { t } from "@/lib/translations"

// Mock data - in production, this would come from an API
const featuredProperties = [
  {
    id: "1",
    title: "Luxury Villa in Salmiya",
    location: "Salmiya, Kuwait",
    price: 450000,
    bedrooms: 5,
    bathrooms: 4,
    area: 450,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    type: "buy" as const,
  },
  {
    id: "2",
    title: "Modern Apartment in Kuwait City",
    location: "Kuwait City, Kuwait",
    price: 1200,
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    type: "rent" as const,
  },
  {
    id: "3",
    title: "Spacious Family Home in Hawalli",
    location: "Hawalli, Kuwait",
    price: 380000,
    bedrooms: 4,
    bathrooms: 3,
    area: 380,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    type: "buy" as const,
  },
  {
    id: "4",
    title: "Cozy Studio in Jabriya",
    location: "Jabriya, Kuwait",
    price: 650,
    bedrooms: 1,
    bathrooms: 1,
    area: 65,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    type: "rent" as const,
  },
  {
    id: "5",
    title: "Elegant Townhouse in Dasma",
    location: "Dasma, Kuwait",
    price: 520000,
    bedrooms: 6,
    bathrooms: 5,
    area: 520,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    type: "buy" as const,
  },
  {
    id: "6",
    title: "Contemporary Apartment in Salwa",
    location: "Salwa, Kuwait",
    price: 950,
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    type: "rent" as const,
  },
]

export default function Home() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const [searchType, setSearchType] = useState<"buy" | "rent">("buy")
  const [location, setLocation] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [propertyType, setPropertyType] = useState("Any")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const params = new URLSearchParams()
    
    // Add type (required)
    params.set("type", searchType)
    
    // Add query (location) if provided
    const trimmedLocation = location.trim()
    if (trimmedLocation) {
      params.set("query", trimmedLocation)
    }
    
    // Add maxPrice if provided
    const priceValue = maxPrice.trim()
    if (priceValue && !isNaN(Number(priceValue)) && Number(priceValue) > 0) {
      params.set("maxPrice", priceValue)
    }
    
    // Add propertyType if not "Any"
    if (propertyType && propertyType !== "Any") {
      params.set("propertyType", propertyType.toLowerCase())
    }
    
    // Navigate to /properties with query params
    router.push(`/properties?${params.toString()}`)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="relative container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-5xl mx-auto">
            {/* Headline */}
            <div className={`text-center mb-8 md:mb-10 ${lang === "ar" ? "text-right" : "text-left"}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight text-slate-900">
                {t("homeTitle", lang)}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-[1.6]">
                {t("homeSubtitle", lang)}
              </p>
            </div>

            {/* Prominent Search Bar */}
            <div className="bg-white rounded-2xl shadow-soft-xl p-6 md:p-8">
              {/* Buy/Rent Toggle and Language Toggle */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <SearchToggle value={searchType} onChange={setSearchType} />
                <div className="inline-flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                      lang === "en"
                        ? "bg-white text-primary-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang("ar")}
                    className={`px-4 py-2.5 text-sm font-semibold rounded-md transition-all duration-200 ${
                      lang === "ar"
                        ? "bg-white text-primary-600 shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    aria-label="Switch to Arabic"
                  >
                    AR
                  </button>
                </div>
              </div>

              {/* Search Form */}
              <form className="space-y-4" onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Location Input */}
                  <div className="md:col-span-5">
                    <label htmlFor="location" className={`block text-xs font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {t("areaLabel", lang)}
                    </label>
                    <div className="relative">
                      <MapPin className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 ${lang === "ar" ? "right-4" : "left-4"}`} />
                      <Input
                        id="location"
                        type="text"
                        placeholder={t("locationPlaceholder", lang)}
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={`${lang === "ar" ? "pr-12" : "pl-12"} h-14 text-base rounded-xl border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200`}
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="md:col-span-3">
                    <label htmlFor="price" className={`block text-xs font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {searchType === "buy" ? t("maxPrice", lang) : t("maxRent", lang)}
                    </label>
                    <div className="relative">
                      <DollarSign className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 ${lang === "ar" ? "right-4" : "left-4"}`} />
                      <Input
                        id="price"
                        type="text"
                        placeholder={t("anyPrice", lang)}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className={`${lang === "ar" ? "pr-12" : "pl-12"} h-14 text-base rounded-xl border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200`}
                      />
                    </div>
                  </div>

                  {/* Property Type */}
                  <div className="md:col-span-2">
                    <label htmlFor="type" className={`block text-xs font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                      {t("propertyType", lang)}
                    </label>
                    <select
                      id="type"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className={`flex h-14 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200 ${lang === "ar" ? "text-right" : "text-left"}`}
                    >
                      <option>{t("any", lang)}</option>
                      <option>{t("villa", lang)}</option>
                      <option>{t("apartment", lang)}</option>
                      <option>{t("townhouse", lang)}</option>
                      <option>{t("studio", lang)}</option>
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="md:col-span-2 flex items-end">
                    <Button
                      type="submit"
                      className="h-14 w-full rounded-xl text-base font-semibold shadow-md hover:shadow-lg"
                    >
                      <Search className={`h-5 w-5 ${lang === "ar" ? "ml-2" : "mr-2"}`} />
                      {t("search", lang)}
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-3 mt-8">
              <Link href="/sell">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base font-semibold">
                  {t("listYourProperty", lang)}
                </Button>
              </Link>
              <Link
                href="/properties"
                className="text-sm text-slate-600 hover:text-primary-600 transition-colors font-medium"
              >
                {t("viewAll", lang)} {lang === "ar" ? "←" : "→"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-12 md:py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className={`flex items-start gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
              <div className="bg-primary-50 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-primary-600" />
              </div>
              <div className={lang === "ar" ? "text-right" : "text-left"}>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{t("fastSearch", lang)}</h3>
                <p className="text-sm text-slate-600">Find properties instantly with powerful filters</p>
              </div>
            </div>
            <div className={`flex items-start gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
              <div className="bg-primary-50 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary-600" />
              </div>
              <div className={lang === "ar" ? "text-right" : "text-left"}>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{t("trusted", lang)}</h3>
                <p className="text-sm text-slate-600">Verified listings and secure transactions</p>
              </div>
            </div>
            <div className={`flex items-start gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
              <div className="bg-primary-50 rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">
                <Map className="h-6 w-6 text-primary-600" />
              </div>
              <div className={lang === "ar" ? "text-right" : "text-left"}>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{t("mapFirst", lang)}</h3>
                <p className="text-sm text-slate-600">Explore properties on an interactive map</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
            <div className={lang === "ar" ? "text-right" : "text-left"}>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                {t("featuredProperties", lang)}
              </h2>
              <p className="text-base md:text-lg text-slate-600">
                Handpicked properties in prime locations
              </p>
            </div>
            <Link href="/properties">
              <Button variant="outline" className="mt-4 md:mt-0 rounded-xl">
                {t("viewAll", lang)}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.slice(0, 3).map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </section>

      {/* About Link */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/about"
            className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            {t("whyAqarna", lang)} {lang === "ar" ? "←" : "→"}
          </Link>
        </div>
      </section>
    </div>
  )
}
