"use client"

import { useState, FormEvent, useRef } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowLeft, Loader2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GOVERNORATES } from "@/lib/governorates"
import { useLanguage } from "@/app/providers"
import { t } from "@/lib/translations"
import { tText } from "@/lib/i18n"
import type L from "leaflet"

// Dynamically import map picker to avoid SSR issues
const SellMapPicker = dynamic(() => import("./SellMapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[240px] md:h-[280px] rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center">
      <div className="text-slate-500">Loading map...</div>
    </div>
  ),
})


interface FormData {
  fullName: string
  phone: string
  email: string
  purpose: "sell" | "rent" | ""
  propertyType: string
  governorate: string
  area: string
  bedrooms: string
  bathrooms: string
  price: string
  notes: string
  imageLinks: string
  lat: number | null
  lng: number | null
}

interface FormErrors {
  [key: string]: string
}

export default function SellPage() {
  const { lang } = useLanguage()
  const mapRef = useRef<L.Map | null>(null)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    purpose: "",
    propertyType: "",
    governorate: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    price: "",
    notes: "",
    imageLinks: "",
    lat: null,
    lng: null,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [accuracyMeters, setAccuracyMeters] = useState<number | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("required", lang)
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t("required", lang)
    }
    if (!formData.purpose) {
      newErrors.purpose = t("required", lang)
    }
    if (!formData.propertyType) {
      newErrors.propertyType = t("required", lang)
    }
    if (!formData.governorate) {
      newErrors.governorate = t("required", lang)
    }
    if (!formData.area.trim()) {
      newErrors.area = t("required", lang)
    }
    if (!formData.price.trim()) {
      newErrors.price = t("required", lang)
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price"
    }
    if (formData.lat === null || formData.lng === null) {
      newErrors.location = t("locationRequired", lang)
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!validate()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/list-property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          purpose: formData.purpose,
          propertyType: formData.propertyType,
          governorate: formData.governorate,
          area: formData.area.trim(),
          bedrooms: formData.bedrooms ? Number(formData.bedrooms) : undefined,
          bathrooms: formData.bathrooms ? Number(formData.bathrooms) : undefined,
          price: Number(formData.price),
          notes: formData.notes.trim() || undefined,
          imageLinks: formData.imageLinks.trim()
            ? formData.imageLinks
                .split("\n")
                .map((line) => line.trim())
                .filter((line) => line.length > 0)
            : undefined,
          lat: formData.lat!,
          lng: formData.lng!,
        }),
      })

      const data = await response.json()

      if (data.ok) {
        setIsSuccess(true)
      } else {
        setError(data.error || t("errorMessage", lang))
      }
    } catch (err) {
      // Handle network errors or JSON parse errors
      setError(t("networkError", lang))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    field: keyof FormData,
    value: string | number | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
    if (field === "lat" || field === "lng") {
      if (errors.location) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.location
          return newErrors
        })
      }
    }
  }

  const handleLocationChange = (lat: number, lng: number) => {
    setFormData((prev) => ({ ...prev, lat, lng }))
    // Clear accuracy when user manually changes location
    setAccuracyMeters(null)
    if (errors.location) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.location
        return newErrors
      })
    }
    setLocationError(null)
  }

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(t("geolocationNotSupported", lang))
      return
    }

    setLocationError(null)
    setIsLocating(true)
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords
        handleLocationChange(latitude, longitude)
        setAccuracyMeters(accuracy)
        setIsLocating(false)
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 15)
        }
      },
      (error) => {
        setIsLocating(false)
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(t("locationPermissionDenied", lang))
        } else if (error.code === error.TIMEOUT) {
          setLocationError(t("locationTimeout", lang))
        } else {
          setLocationError(t("locationUnavailable", lang))
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 0,
      }
    )
  }

  const handleMapReady = (map: L.Map) => {
    mapRef.current = map
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-primary-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className={`text-3xl font-bold text-slate-900 mb-4 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("successTitle", lang)}</h1>
            <p className={`text-slate-600 mb-8 leading-relaxed ${lang === "ar" ? "text-right" : "text-left"}`}>{t("successMessage", lang)}</p>
            <Link href="/properties">
              <Button size="lg" className="w-full">
                {t("backToProperties", lang)}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className={`text-lg md:text-xl font-bold text-slate-900 truncate flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
              {t("listYourPropertyTitle", lang)}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          <p className={`text-slate-600 mb-8 text-center ${lang === "ar" ? "text-right" : "text-left"}`}>{t("listYourPropertySubtitle", lang)}</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("fullName", lang)} <span className="text-red-500">*</span>
              </label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className={errors.fullName ? "border-red-300" : ""}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("phone", lang)} <span className="text-red-500">*</span>
              </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+965 XXXX XXXX"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className={`${errors.phone ? "border-red-300" : ""} dir-ltr`}
                  dir="ltr"
                />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("email", lang)} <span className="text-slate-400 text-xs">({t("optional", lang)})</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>

            {/* Purpose */}
            <div>
              <label className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("purpose", lang)} <span className="text-red-500">*</span>
              </label>
              <div className={`flex gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                <label className={`flex items-center gap-2 cursor-pointer ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <input
                    type="radio"
                    name="purpose"
                    value="sell"
                    checked={formData.purpose === "sell"}
                    onChange={(e) => handleChange("purpose", e.target.value)}
                    className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-200"
                  />
                  <span className="text-slate-700">{t("purposeSell", lang)}</span>
                </label>
                <label className={`flex items-center gap-2 cursor-pointer ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <input
                    type="radio"
                    name="purpose"
                    value="rent"
                    checked={formData.purpose === "rent"}
                    onChange={(e) => handleChange("purpose", e.target.value)}
                    className="w-4 h-4 text-primary-600 border-slate-300 focus:ring-primary-200"
                  />
                  <span className="text-slate-700">{t("purposeRent", lang)}</span>
                </label>
              </div>
              {errors.purpose && (
                <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>
              )}
            </div>

            {/* Property Type */}
            <div>
              <label htmlFor="propertyType" className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("propertyTypeLabel", lang)} <span className="text-red-500">*</span>
              </label>
              <select
                id="propertyType"
                value={formData.propertyType}
                onChange={(e) => handleChange("propertyType", e.target.value)}
                className={`flex h-11 w-full rounded-xl border bg-white px-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200 ${
                  errors.propertyType ? "border-red-300" : "border-slate-200"
                } ${lang === "ar" ? "text-right" : "text-left"}`}
              >
                <option value="">{t("selectType", lang)}</option>
                <option value="apartment">{t("apartment", lang)}</option>
                <option value="villa">{t("villa", lang)}</option>
                <option value="land">{t("land", lang)}</option>
                <option value="commercial">{t("commercial", lang)}</option>
              </select>
              {errors.propertyType && (
                <p className="mt-1 text-sm text-red-600">{errors.propertyType}</p>
              )}
            </div>

            {/* Governorate */}
            <div>
              <label htmlFor="governorate" className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("governorate", lang)} <span className="text-red-500">*</span>
              </label>
              <select
                id="governorate"
                value={formData.governorate}
                onChange={(e) => handleChange("governorate", e.target.value)}
                className={`flex h-11 w-full rounded-xl border bg-white px-3 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200 ${
                  errors.governorate ? "border-red-300" : "border-slate-200"
                } ${lang === "ar" ? "text-right" : "text-left"}`}
              >
                <option value="">{t("selectGovernorate", lang)}</option>
                {GOVERNORATES.map((gov) => (
                  <option key={gov.id} value={gov.id}>
                    {tText({ en: gov.en, ar: gov.ar }, lang, gov.en)}
                  </option>
                ))}
              </select>
              {errors.governorate && (
                <p className="mt-1 text-sm text-red-600">{errors.governorate}</p>
              )}
            </div>

            {/* Area */}
            <div>
              <label htmlFor="area" className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("areaLabel", lang)} <span className="text-red-500">*</span>
              </label>
              <Input
                id="area"
                type="text"
                placeholder={t("areaPlaceholder", lang)}
                value={formData.area}
                onChange={(e) => handleChange("area", e.target.value)}
                className={errors.area ? "border-red-300" : ""}
              />
              {errors.area && (
                <p className="mt-1 text-sm text-red-600">{errors.area}</p>
              )}
            </div>

            {/* Location on Map */}
            <div>
              <div className={`flex items-center justify-between mb-2 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                <label className={`block text-sm font-medium text-slate-700 ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {t("locationOnMap", lang)} <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {locationError && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleUseMyLocation}
                      disabled={isLocating}
                      className="text-xs"
                    >
                      {t("tryAgain", lang)}
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleUseMyLocation}
                    disabled={isLocating}
                    className="text-xs"
                  >
                    <MapPin className={`h-3 w-3 ${lang === "ar" ? "ml-1" : "mr-1"} ${isLocating ? "animate-pulse" : ""}`} />
                    {isLocating ? t("locating", lang) : t("useMyLocation", lang)}
                  </Button>
                </div>
              </div>
              <p className={`text-xs text-slate-500 mb-3 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("locationHint", lang)}</p>
              <SellMapPicker
                lat={formData.lat}
                lng={formData.lng}
                accuracyMeters={accuracyMeters}
                onLocationChange={handleLocationChange}
                onMapReady={handleMapReady}
              />
              <div className={`mt-2 space-y-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {formData.lat !== null && formData.lng !== null ? (
                  <>
                    <p className="text-sm text-slate-600">
                      {t("locationSelected", lang)}: <span className="tabular-nums" dir="ltr">{formData.lat.toFixed(5)}, {formData.lng.toFixed(5)}</span>
                    </p>
                    {accuracyMeters !== null && (
                      <p className="text-xs text-slate-500">
                        {t("accuracy", lang)}: ~<span className="tabular-nums" dir="ltr">{Math.round(accuracyMeters)}</span>m
                      </p>
                    )}
                    {accuracyMeters !== null && accuracyMeters > 200 && (
                      <p className="text-xs text-amber-600">
                        {t("accuracyWarning", lang)}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-slate-600">{t("noLocationSelected", lang)}</p>
                )}
              </div>
              {errors.location && (
                <p className="mt-1 text-sm text-red-600">{errors.location}</p>
              )}
              {locationError && (
                <p className="mt-1 text-sm text-amber-600">{locationError}</p>
              )}
            </div>

            {/* Bedrooms & Bathrooms */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="bedrooms" className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {t("bedroomsLabel", lang)} <span className="text-slate-400 text-xs">({t("optional", lang)})</span>
                </label>
                <Input
                  id="bedrooms"
                  type="number"
                  min="0"
                value={formData.bedrooms}
                onChange={(e) => handleChange("bedrooms", e.target.value as string)}
                />
              </div>
              <div>
                <label htmlFor="bathrooms" className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {t("bathroomsLabel", lang)} <span className="text-slate-400 text-xs">({t("optional", lang)})</span>
                </label>
                <Input
                  id="bathrooms"
                  type="number"
                  min="0"
                value={formData.bathrooms}
                onChange={(e) => handleChange("bathrooms", e.target.value as string)}
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("price", lang)} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  className={`${lang === "ar" ? "pl-16" : "pr-16"} ${errors.price ? "border-red-300" : ""}`}
                />
                <span className={`absolute top-1/2 -translate-y-1/2 text-slate-600 font-medium ${lang === "ar" ? "left-4" : "right-4"}`}>
                  {t("currency", lang)}
                </span>
              </div>
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("notes", lang)} <span className="text-slate-400 text-xs">({t("optional", lang)})</span>
              </label>
              <textarea
                id="notes"
                rows={4}
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                className={`flex w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200 resize-none ${lang === "ar" ? "text-right" : "text-left"}`}
                placeholder={t("notesPlaceholder", lang)}
              />
            </div>

            {/* Image Links */}
            <div>
              <label htmlFor="imageLinks" className={`block text-sm font-medium text-slate-700 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("imageLinks", lang)} <span className="text-slate-400 text-xs">({t("optional", lang)})</span>
              </label>
              <textarea
                id="imageLinks"
                rows={3}
                value={formData.imageLinks}
                onChange={(e) => handleChange("imageLinks", e.target.value)}
                className={`flex w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all duration-200 resize-none font-mono text-sm ${lang === "ar" ? "text-right" : "text-left"}`}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
              />
              <p className={`mt-1 text-xs text-slate-500 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("oneUrlPerLine", lang)}</p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className={`h-5 w-5 animate-spin ${lang === "ar" ? "ml-2" : "mr-2"}`} />
                    {t("submitting", lang)}
                  </>
                ) : (
                  t("submit", lang)
                )}
              </Button>
              {/* Trust Microcopy */}
              <div className={`mt-4 space-y-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t("trustResponseTime", lang)}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t("trustPrivacy", lang)}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

