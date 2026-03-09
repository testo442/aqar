"use client"

import { useState, useRef, FormEvent } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { MapPin, Camera, Loader2, CheckCircle } from "lucide-react"
import AppHeader from "@/components/v2/AppHeader"
import BottomNav from "@/components/v2/BottomNav"
import { useLanguage } from "@/app/providers"
import { GOVERNORATES } from "@/lib/governorates"
import { tText } from "@/lib/i18n"
import {
  page as p,
  applyPage as ap,
} from "@/components/v2/v2Styles"
import type L from "leaflet"

const SellMapPicker = dynamic(() => import("@/app/sell/SellMapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[220px] rounded-2xl border border-border bg-muted flex items-center justify-center">
      <span className="text-xs text-slate-400">Loading map...</span>
    </div>
  ),
})

// ── Property types ───────────────────────────────────────────────────────────
const PROPERTY_TYPES = [
  { key: "apartment",  en: "Apartment",  ar: "شقة" },
  { key: "villa",      en: "Villa",      ar: "فيلا" },
  { key: "chalet",     en: "Chalet",     ar: "شاليه" },
  { key: "floor",      en: "Floor",      ar: "دور" },
  { key: "land",       en: "Land",       ar: "أرض" },
  { key: "commercial", en: "Commercial", ar: "تجاري" },
]

const PURPOSE_OPTIONS = [
  { key: "rent", en: "Rent", ar: "إيجار" },
  { key: "sale", en: "Sale", ar: "بيع" },
]

interface FormData {
  propertyType: string
  purpose: string
  title: string
  price: string
  area: string
  bedrooms: number
  bathrooms: number
  furnished: boolean
  governorate: string
  district: string
  block: string
  lat: number | null
  lng: number | null
  fullName: string
  phone: string
  whatsapp: boolean
  email: string
  termsAccepted: boolean
}

interface FormErrors {
  [key: string]: string
}

export default function ApplyV2Page() {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"
  const mapRef = useRef<L.Map | null>(null)

  const [form, setForm] = useState<FormData>({
    propertyType: "",
    purpose: "rent",
    title: "",
    price: "",
    area: "",
    bedrooms: 2,
    bathrooms: 1,
    furnished: false,
    governorate: "",
    district: "",
    block: "",
    lat: null,
    lng: null,
    fullName: "",
    phone: "",
    whatsapp: true,
    email: "",
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [accuracyMeters, setAccuracyMeters] = useState<number | null>(null)
  const [photos, setPhotos] = useState<string[]>([])

  const set = (field: keyof FormData, value: string | number | boolean | null) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => { const n = { ...prev }; delete n[field]; return n })
    }
  }

  const handleLocationChange = (lat: number, lng: number) => {
    setForm((prev) => ({ ...prev, lat, lng }))
    setAccuracyMeters(null)
    setLocationError(null)
    if (errors.location) {
      setErrors((prev) => { const n = { ...prev }; delete n.location; return n })
    }
  }

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setLocationError(isRTL ? "تحديد الموقع غير مدعوم" : "Geolocation not supported")
      return
    }
    setLocationError(null)
    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords
        handleLocationChange(latitude, longitude)
        setAccuracyMeters(accuracy)
        setIsLocating(false)
        if (mapRef.current) mapRef.current.setView([latitude, longitude], 15)
      },
      (err) => {
        setIsLocating(false)
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError(isRTL ? "تم رفض إذن الموقع" : "Location permission denied")
        } else {
          setLocationError(isRTL ? "تعذر تحديد الموقع" : "Could not determine location")
        }
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
    )
  }

  const handleMapReady = (map: L.Map) => { mapRef.current = map }

  const handlePhotoAdd = () => {
    // Placeholder: in production, open file picker
    const placeholder = `https://images.unsplash.com/photo-${1600596542815 + photos.length}?w=200&q=60`
    setPhotos((prev) => [...prev, placeholder])
  }

  const validate = (): boolean => {
    const e: FormErrors = {}
    if (!form.propertyType) e.propertyType = isRTL ? "مطلوب" : "Required"
    if (!form.title.trim()) e.title = isRTL ? "مطلوب" : "Required"
    if (!form.price.trim() || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = isRTL ? "أدخل سعر صالح" : "Enter a valid price"
    if (!form.governorate) e.governorate = isRTL ? "مطلوب" : "Required"
    if (!form.district.trim()) e.district = isRTL ? "مطلوب" : "Required"
    if (form.lat === null || form.lng === null) e.location = isRTL ? "حدد الموقع على الخريطة" : "Select location on map"
    if (!form.fullName.trim()) e.fullName = isRTL ? "مطلوب" : "Required"
    if (!form.phone.trim()) e.phone = isRTL ? "مطلوب" : "Required"
    if (!form.termsAccepted) e.terms = isRTL ? "يجب الموافقة على الشروط" : "You must accept the terms"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()
    setSubmitError(null)
    if (!validate()) return
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/list-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          purpose: form.purpose === "sale" ? "sell" : "rent",
          propertyType: form.propertyType,
          governorate: form.governorate,
          area: form.district.trim(),
          bedrooms: form.bedrooms,
          bathrooms: form.bathrooms,
          price: Number(form.price),
          lat: form.lat!,
          lng: form.lng!,
          notes: form.block.trim() ? `Block/Street: ${form.block}` : undefined,
        }),
      })
      const data = await res.json()
      if (data.ok) setIsSuccess(true)
      else setSubmitError(data.error || (isRTL ? "حدث خطأ" : "Something went wrong"))
    } catch {
      setSubmitError(isRTL ? "خطأ في الشبكة" : "Network error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className={p.root} dir={isRTL ? "rtl" : "ltr"}>
        <style>{`
          footer, [data-footer] { display: none !important; }
          body > header:first-of-type { display: none !important; }
        `}</style>
        <AppHeader />
        <div className={p.container}>
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <CheckCircle className="h-14 w-14 text-emerald-500 mb-4" strokeWidth={1.5} />
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {isRTL ? "تم الإرسال بنجاح" : "Submitted Successfully"}
            </h2>
            <p className="text-sm text-slate-500 max-w-xs mb-6">
              {isRTL
                ? "سيقوم فريقنا بمراجعة عقارك والتواصل معك قريباً"
                : "Our team will review your property and contact you soon."}
            </p>
            <Link
              href="/properties"
              className="inline-flex h-11 items-center px-6 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors"
            >
              {isRTL ? "تصفح العقارات" : "Browse Properties"}
            </Link>
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  // ── Governorate areas ──────────────────────────────────────────────────────
  const selectedGov = GOVERNORATES.find((g) => g.id === form.governorate)

  return (
    <div className={p.root} dir={isRTL ? "rtl" : "ltr"}>
      <style>{`
        footer, [data-footer] { display: none !important; }
        body > header:first-of-type { display: none !important; }
      `}</style>
      <AppHeader />

      <div className={p.container}>
        <form onSubmit={handleSubmit} className="space-y-4 pb-4">

          {/* ── Intro ─────────────────────────────────────────────────────── */}
          <div className="pt-1 pb-2">
            <h1 className="text-lg font-bold text-slate-900 rtl:text-[20px]">
              {isRTL ? "أضف عقارك" : "Submit Your Property"}
            </h1>
            <p className="text-xs text-slate-400 mt-1 rtl:text-[13px]">
              {isRTL
                ? "أدخل التفاصيل وسيتواصل فريقنا معك للمراجعة والنشر"
                : "Fill in the details below. Our team will review and reach out to get your listing live."}
            </p>
          </div>

          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
              {submitError}
            </div>
          )}

          {/* ── Property Type ─────────────────────────────────────────────── */}
          <div className={ap.section}>
            <p className={ap.sectionTitle}>{isRTL ? "نوع العقار" : "Property Type"}</p>
            <div className={ap.typeGrid}>
              {PROPERTY_TYPES.map(({ key, en, ar }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => set("propertyType", key)}
                  className={form.propertyType === key ? ap.typeChipActive : ap.typeChip}
                >
                  {isRTL ? ar : en}
                </button>
              ))}
            </div>
            {errors.propertyType && <p className={ap.errorText}>{errors.propertyType}</p>}
          </div>

          {/* ── Purpose ───────────────────────────────────────────────────── */}
          <div className={ap.section}>
            <p className={ap.sectionTitle}>{isRTL ? "الغرض" : "Purpose"}</p>
            <div className="flex gap-2">
              {PURPOSE_OPTIONS.map(({ key, en, ar }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => set("purpose", key)}
                  className={`flex-1 py-2.5 rounded-2xl text-sm font-semibold border transition-colors ${
                    form.purpose === key
                      ? "bg-primary-600 text-white border-primary-600"
                      : "bg-background border-border text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {isRTL ? ar : en}
                </button>
              ))}
            </div>
          </div>

          {/* ── Basic Details ─────────────────────────────────────────────── */}
          <div className={ap.section}>
            <p className={ap.sectionTitle}>{isRTL ? "التفاصيل الأساسية" : "Basic Details"}</p>

            <div>
              <label className={ap.label}>{isRTL ? "عنوان العقار" : "Property Title"}</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder={isRTL ? "مثال: فيلا فاخرة في الخيران" : "e.g. Luxury Villa in Khiran"}
                className={`${ap.input} ${errors.title ? ap.inputError : ""}`}
              />
              {errors.title && <p className={ap.errorText}>{errors.title}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={ap.label}>{isRTL ? "السعر (د.ك)" : "Price (KWD)"}</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                  placeholder="0"
                  dir="ltr"
                  className={`${ap.input} ${errors.price ? ap.inputError : ""}`}
                />
                {errors.price && <p className={ap.errorText}>{errors.price}</p>}
              </div>
              <div>
                <label className={ap.label}>{isRTL ? "المساحة (م²)" : "Area (m²)"}</label>
                <input
                  type="number"
                  inputMode="numeric"
                  value={form.area}
                  onChange={(e) => set("area", e.target.value)}
                  placeholder="0"
                  dir="ltr"
                  className={ap.input}
                />
              </div>
            </div>

            {/* Bedrooms / Bathrooms steppers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={ap.label}>{isRTL ? "غرف النوم" : "Bedrooms"}</label>
                <div className={ap.stepperRow}>
                  <button type="button" className={ap.stepperBtn} onClick={() => set("bedrooms", Math.max(0, form.bedrooms - 1))}>−</button>
                  <span className={ap.stepperValue}>{form.bedrooms}</span>
                  <button type="button" className={ap.stepperBtn} onClick={() => set("bedrooms", form.bedrooms + 1)}>+</button>
                </div>
              </div>
              <div>
                <label className={ap.label}>{isRTL ? "الحمامات" : "Bathrooms"}</label>
                <div className={ap.stepperRow}>
                  <button type="button" className={ap.stepperBtn} onClick={() => set("bathrooms", Math.max(0, form.bathrooms - 1))}>−</button>
                  <span className={ap.stepperValue}>{form.bathrooms}</span>
                  <button type="button" className={ap.stepperBtn} onClick={() => set("bathrooms", form.bathrooms + 1)}>+</button>
                </div>
              </div>
            </div>

            {/* Furnished toggle */}
            <div className={ap.toggleRow}>
              <span className="text-sm text-slate-700 font-medium rtl:text-[14px]">{isRTL ? "مفروش" : "Furnished"}</span>
              <button
                type="button"
                onClick={() => set("furnished", !form.furnished)}
                className={`${ap.toggleTrack} ${form.furnished ? ap.toggleTrackOn : ap.toggleTrackOff}`}
                role="switch"
                aria-checked={form.furnished}
              >
                <span className={`${ap.toggleThumb} ${form.furnished ? ap.toggleThumbOn : ap.toggleThumbOff}`} />
              </button>
            </div>
          </div>

          {/* ── Location ──────────────────────────────────────────────────── */}
          <div className={ap.section}>
            <div className="flex items-center justify-between">
              <p className={ap.sectionTitle}>{isRTL ? "الموقع" : "Location"}</p>
              <button
                type="button"
                onClick={handleUseMyLocation}
                disabled={isLocating}
                className={ap.mapLocateBtn}
              >
                <MapPin className={`${ap.mapLocateIcon} ${isLocating ? "animate-pulse" : ""}`} />
                {isLocating
                  ? isRTL ? "جاري التحديد..." : "Locating..."
                  : isRTL ? "موقعي" : "Use my location"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={ap.label}>{isRTL ? "المحافظة" : "Governorate"}</label>
                <select
                  value={form.governorate}
                  onChange={(e) => { set("governorate", e.target.value); set("district", "") }}
                  className={`${ap.input} ${errors.governorate ? ap.inputError : ""}`}
                >
                  <option value="">{isRTL ? "اختر" : "Select"}</option>
                  {GOVERNORATES.map((gov) => (
                    <option key={gov.id} value={gov.id}>
                      {tText({ en: gov.en, ar: gov.ar }, lang, gov.en)}
                    </option>
                  ))}
                </select>
                {errors.governorate && <p className={ap.errorText}>{errors.governorate}</p>}
              </div>
              <div>
                <label className={ap.label}>{isRTL ? "المنطقة" : "Area / District"}</label>
                {selectedGov ? (
                  <select
                    value={form.district}
                    onChange={(e) => set("district", e.target.value)}
                    className={`${ap.input} ${errors.district ? ap.inputError : ""}`}
                  >
                    <option value="">{isRTL ? "اختر" : "Select"}</option>
                    {selectedGov.areas.map((a) => (
                      <option key={a.id} value={a.id}>
                        {tText({ en: a.en, ar: a.ar }, lang, a.en)}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={form.district}
                    onChange={(e) => set("district", e.target.value)}
                    placeholder={isRTL ? "المنطقة" : "District"}
                    className={`${ap.input} ${errors.district ? ap.inputError : ""}`}
                  />
                )}
                {errors.district && <p className={ap.errorText}>{errors.district}</p>}
              </div>
            </div>

            <div>
              <label className={ap.label}>
                {isRTL ? "القطعة / الشارع" : "Block / Street"}
                <span className="text-slate-300 font-normal ltr:ml-1 rtl:mr-1">({isRTL ? "اختياري" : "optional"})</span>
              </label>
              <input
                type="text"
                value={form.block}
                onChange={(e) => set("block", e.target.value)}
                placeholder={isRTL ? "قطعة ٣، شارع ١٢" : "Block 3, Street 12"}
                className={ap.input}
              />
            </div>

            {/* Inline map picker — reuses real SellMapPicker from /sell */}
            <div className={ap.mapWrap}>
              <SellMapPicker
                lat={form.lat}
                lng={form.lng}
                accuracyMeters={accuracyMeters}
                onLocationChange={handleLocationChange}
                onMapReady={handleMapReady}
              />
            </div>
            {form.lat !== null && form.lng !== null && (
              <p className={ap.mapCoords}>
                {isRTL ? "الموقع المحدد:" : "Selected:"} <span dir="ltr">{form.lat.toFixed(5)}, {form.lng.toFixed(5)}</span>
              </p>
            )}
            {errors.location && <p className={ap.errorText}>{errors.location}</p>}
            {locationError && <p className="text-xs text-amber-600 mt-1">{locationError}</p>}
          </div>

          {/* ── Photos ────────────────────────────────────────────────────── */}
          <div className={ap.section}>
            <p className={ap.sectionTitle}>{isRTL ? "الصور" : "Photos"}</p>
            <p className={ap.sectionSub}>{isRTL ? "أضف صور العقار (اختياري)" : "Add property photos (optional)"}</p>
            <div className={ap.photoGrid}>
              {photos.map((src, i) => (
                <div key={i} className={ap.photoSlot}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              <button type="button" onClick={handlePhotoAdd} className={ap.photoAdd}>
                <Camera className={ap.photoAddIcon} />
                <span className={ap.photoAddText}>{isRTL ? "إضافة" : "Add"}</span>
              </button>
            </div>
          </div>

          {/* ── Contact Info ──────────────────────────────────────────────── */}
          <div className={ap.section}>
            <p className={ap.sectionTitle}>{isRTL ? "معلومات التواصل" : "Contact Info"}</p>

            <div>
              <label className={ap.label}>{isRTL ? "الاسم الكامل" : "Full Name"}</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                className={`${ap.input} ${errors.fullName ? ap.inputError : ""}`}
              />
              {errors.fullName && <p className={ap.errorText}>{errors.fullName}</p>}
            </div>

            <div>
              <label className={ap.label}>{isRTL ? "رقم الهاتف" : "Phone Number"}</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+965 XXXX XXXX"
                dir="ltr"
                className={`${ap.input} ${errors.phone ? ap.inputError : ""}`}
              />
              {errors.phone && <p className={ap.errorText}>{errors.phone}</p>}
            </div>

            {/* WhatsApp toggle */}
            <div className={ap.toggleRow}>
              <span className="text-sm text-slate-700 font-medium rtl:text-[14px]">
                {isRTL ? "واتساب متاح على هذا الرقم" : "WhatsApp available on this number"}
              </span>
              <button
                type="button"
                onClick={() => set("whatsapp", !form.whatsapp)}
                className={`${ap.toggleTrack} ${form.whatsapp ? ap.toggleTrackOn : ap.toggleTrackOff}`}
                role="switch"
                aria-checked={form.whatsapp}
              >
                <span className={`${ap.toggleThumb} ${form.whatsapp ? ap.toggleThumbOn : ap.toggleThumbOff}`} />
              </button>
            </div>

            <div>
              <label className={ap.label}>
                {isRTL ? "البريد الإلكتروني" : "Email"}
                <span className="text-slate-300 font-normal ltr:ml-1 rtl:mr-1">({isRTL ? "اختياري" : "optional"})</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="your@email.com"
                dir="ltr"
                className={ap.input}
              />
            </div>
          </div>

          {/* ── Terms ─────────────────────────────────────────────────────── */}
          <div className={ap.termsRow}>
            <input
              type="checkbox"
              checked={form.termsAccepted}
              onChange={(e) => set("termsAccepted", e.target.checked)}
              className={ap.termsCheckbox}
            />
            <p className={ap.termsText}>
              {isRTL
                ? "أؤكد أن المعلومات المقدمة دقيقة وأوافق على شروط وأحكام عقارنا."
                : "I confirm that the information provided is accurate and I agree to Aqarna's terms and conditions."}
            </p>
          </div>
          {errors.terms && <p className={ap.errorText}>{errors.terms}</p>}

          {/* ── Actions ───────────────────────────────────────────────────── */}
          <div className="space-y-2.5 pt-1">
            <button type="submit" disabled={isSubmitting} className={ap.submitBtn}>
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {isRTL ? "جاري الإرسال..." : "Submitting..."}
                </span>
              ) : (
                isRTL ? "إرسال العقار" : "Submit Property"
              )}
            </button>
            <button type="button" className={ap.draftBtn}>
              {isRTL ? "حفظ كمسودة" : "Save Draft"}
            </button>
          </div>

        </form>
      </div>

      <BottomNav />
    </div>
  )
}
