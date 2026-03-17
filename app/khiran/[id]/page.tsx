"use client"

import { useState, useMemo, useCallback } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  ChevronLeft,
  Heart,
  Share2,
  Star,
  BedDouble,
  Bath,
  Users,
  Maximize2,
  Droplets,
  Waves,
  Flame,
  Wifi,
  ChevronRight,
  Phone,
  MapPin,
  BadgeCheck,
  CalendarDays,
} from "lucide-react"
import AppHeader from "@/components/v2/AppHeader"
import BottomNav from "@/components/v2/BottomNav"
import { useLanguage } from "@/app/providers"
import { chaletDetail as s } from "@/components/v2/v2Styles"
import {
  getChaletById,
  PACKAGES,
  type PackageKey,
} from "@/lib/mock-chalets"

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false })

// ─── Calendar helpers ──────────────────────────────────────────────────────────

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number) {
  // 0 = Sunday
  return new Date(year, month, 1).getDay()
}

function toISODate(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${dd}`
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function isBetween(d: Date, start: Date, end: Date) {
  return d > start && d < end
}

const MONTH_NAMES_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const MONTH_NAMES_AR = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
const WEEK_DAYS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const WEEK_DAYS_AR = ["أحد", "اثن", "ثلا", "أرب", "خمي", "جمع", "سبت"]

// ─── Page component ────────────────────────────────────────────────────────────

export default function ChaletDetailPage() {
  const params = useParams()
  const id = params.id as string
  const chalet = getChaletById(id)

  const { lang } = useLanguage()
  const isRTL = lang === "ar"

  const [saved, setSaved] = useState(false)
  const [heroIdx, setHeroIdx] = useState(0)
  const [activePackage, setActivePackage] = useState<PackageKey>("weekend")

  // Calendar state
  const today = useMemo(() => new Date(), [])
  const [calMonth, setCalMonth] = useState(today.getMonth())
  const [calYear, setCalYear] = useState(today.getFullYear())
  const [checkIn, setCheckIn] = useState<Date | null>(null)
  const [checkOut, setCheckOut] = useState<Date | null>(null)

  const unavailableSet = useMemo(() => {
    if (!chalet) return new Set<string>()
    return new Set(chalet.unavailableDates)
  }, [chalet])

  const handleDayClick = useCallback(
    (date: Date) => {
      const iso = toISODate(date)
      if (unavailableSet.has(iso)) return
      if (date < today) return

      if (!checkIn || (checkIn && checkOut)) {
        // Start new selection
        setCheckIn(date)
        setCheckOut(null)
      } else {
        // Complete selection
        if (date < checkIn) {
          setCheckIn(date)
          setCheckOut(checkIn)
        } else if (isSameDay(date, checkIn)) {
          setCheckIn(null)
        } else {
          // Verify no unavailable dates in range
          let blocked = false
          const cursor = new Date(checkIn)
          cursor.setDate(cursor.getDate() + 1)
          while (cursor < date) {
            if (unavailableSet.has(toISODate(cursor))) {
              blocked = true
              break
            }
            cursor.setDate(cursor.getDate() + 1)
          }
          if (blocked) {
            // Start fresh with this date
            setCheckIn(date)
            setCheckOut(null)
          } else {
            setCheckOut(date)
          }
        }
      }
    },
    [checkIn, checkOut, unavailableSet, today],
  )

  const nightCount = useMemo(() => {
    if (!checkIn || !checkOut) return 0
    return Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }, [checkIn, checkOut])

  const prevMonth = () => {
    if (calMonth === 0) {
      setCalMonth(11)
      setCalYear(calYear - 1)
    } else {
      setCalMonth(calMonth - 1)
    }
  }

  const nextMonth = () => {
    if (calMonth === 11) {
      setCalMonth(0)
      setCalYear(calYear + 1)
    } else {
      setCalMonth(calMonth + 1)
    }
  }

  // Not found
  if (!chalet) {
    return (
      <div className={s.root}>
        <AppHeader />
        <div className="px-5 py-20 text-center">
          <p className="text-sm text-slate-500">
            {isRTL ? "الشاليه غير موجود" : "Chalet not found"}
          </p>
          <Link href="/khiran" className="text-sm font-semibold text-primary-600 mt-3 inline-block">
            {isRTL ? "العودة إلى الخيران" : "Back to Khiran"}
          </Link>
        </div>
        <BottomNav />
      </div>
    )
  }

  const displayTitle = isRTL ? chalet.titleAr : chalet.title
  const displayDesc = isRTL ? chalet.descriptionAr : chalet.description
  const activePkg = PACKAGES.find((p) => p.key === activePackage)!
  const activePrice = chalet.pricing[activePackage]

  const allImages = chalet.images.length > 0 ? chalet.images : [chalet.image]

  const mapProperties = [
    {
      id: chalet.id,
      title: chalet.title,
      location: "Khiran",
      price: activePrice,
      bedrooms: chalet.bedrooms,
      bathrooms: chalet.bathrooms,
      area: chalet.area,
      image: chalet.image,
      type: "rent" as const,
      lat: chalet.lat,
      lng: chalet.lng,
      titleI18n: { en: chalet.title, ar: chalet.titleAr },
      locationI18n: { en: "Khiran", ar: "الخيران" },
    },
  ]

  // Calendar rendering
  const daysInMonth = getDaysInMonth(calYear, calMonth)
  const firstDay = getFirstDayOfWeek(calYear, calMonth)
  const monthName = isRTL ? MONTH_NAMES_AR[calMonth] : MONTH_NAMES_EN[calMonth]
  const weekDays = isRTL ? WEEK_DAYS_AR : WEEK_DAYS_EN

  const calendarDays: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) calendarDays.push(null)
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d)

  return (
    <div className={s.root} dir={isRTL ? "rtl" : "ltr"}>
      <style>{`
        footer, [data-footer] { display: none !important; }
        body > header:first-of-type { display: none !important; }
      `}</style>
      <AppHeader />

      <div className={s.container}>
        {/* Back row */}
        <div className={s.backRow}>
          <Link href="/khiran" className={s.backBtn}>
            <ChevronLeft className={s.backIcon} />
            {isRTL ? "العودة إلى الخيران" : "Back to Khiran"}
          </Link>
        </div>

        {/* Hero image */}
        <div className={s.heroWrap} style={s.heroAspect}>
          <Image
            src={allImages[heroIdx]}
            alt={displayTitle}
            fill
            className={s.heroImage}
            sizes="(max-width: 480px) 100vw, 480px"
            priority
          />
          <div className={s.heroOverlay} />

          {/* Share */}
          <button type="button" className={s.heroShare} aria-label="Share">
            <Share2 className={s.heroShareIcon} />
          </button>

          {/* Save */}
          <button
            type="button"
            className={s.heroSave}
            aria-label="Save"
            onClick={() => setSaved(!saved)}
          >
            <Heart className={`${s.heroSaveIcon} ${saved ? s.heroSaveActive : s.heroSaveInactive}`} />
          </button>

          {/* Photo counter */}
          {allImages.length > 1 && (
            <span className={s.heroCounter}>
              {heroIdx + 1} / {allImages.length}
            </span>
          )}
        </div>

        {/* Thumbnail strip */}
        {allImages.length > 1 && (
          <div className={s.thumbStrip}>
            {allImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setHeroIdx(i)}
                className={i === heroIdx ? s.thumbActive : s.thumb}
              >
                <Image src={img} alt="" fill className={s.thumbImage} sizes="64px" />
              </button>
            ))}
          </div>
        )}

        {/* Title / Location / Rating */}
        <div className={s.infoSection}>
          <h1 className={s.title}>{displayTitle}</h1>

          <div className={s.locationRow}>
            <MapPin className={s.locationIcon} />
            <span className={s.locationText}>
              {isRTL ? "الخيران، الأحمدي" : "Khiran, Al Ahmadi"}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className={s.ratingRow}>
              <Star className={s.ratingStar} />
              <span className={s.ratingText}>{chalet.rating}</span>
              <span className={s.ratingCount}>
                ({chalet.reviewCount} {isRTL ? "تقييم" : "reviews"})
              </span>
            </div>

            {chalet.verified && (
              <span className={s.verifiedBadge}>
                <BadgeCheck className={s.verifiedIcon} />
                {isRTL ? "موثق" : "Verified"}
              </span>
            )}
          </div>

          {/* Facts row */}
          <div className={s.factsRow}>
            <span><BedDouble className="h-4 w-4 inline -mt-0.5" /> {chalet.bedrooms} {isRTL ? "غرف" : "Beds"}</span>
            <span className={s.factsDot}>·</span>
            <span><Bath className="h-4 w-4 inline -mt-0.5" /> {chalet.bathrooms} {isRTL ? "حمام" : "Baths"}</span>
            <span className={s.factsDot}>·</span>
            <span><Users className="h-4 w-4 inline -mt-0.5" /> {chalet.capacity} {isRTL ? "شخص" : "Guests"}</span>
            <span className={s.factsDot}>·</span>
            <span><Maximize2 className="h-4 w-4 inline -mt-0.5" /> {chalet.area} m²</span>
          </div>
        </div>

        <div className={s.divider} />

        {/* Amenities */}
        <div className={s.amenitiesSection}>
          <h2 className={s.amenitiesTitle}>{isRTL ? "المرافق" : "Amenities"}</h2>
          <div className={s.amenitiesGrid}>
            <div className={chalet.pool ? s.amenityCard : s.amenityInactive}>
              <Droplets className={s.amenityIcon} />
              <span className={s.amenityLabel}>{isRTL ? "مسبح خاص" : "Private Pool"}</span>
            </div>
            <div className={chalet.beachAccess ? s.amenityCard : s.amenityInactive}>
              <Waves className={s.amenityIcon} />
              <span className={s.amenityLabel}>{isRTL ? "وصول للشاطئ" : "Beach Access"}</span>
            </div>
            <div className={chalet.bbq ? s.amenityCard : s.amenityInactive}>
              <Flame className={s.amenityIcon} />
              <span className={s.amenityLabel}>{isRTL ? "منطقة شواء" : "BBQ Area"}</span>
            </div>
            <div className={chalet.wifi ? s.amenityCard : s.amenityInactive}>
              <Wifi className={s.amenityIcon} />
              <span className={s.amenityLabel}>{isRTL ? "واي فاي" : "Wi-Fi"}</span>
            </div>
          </div>
        </div>

        <div className={s.divider} />

        {/* Description */}
        <div className={s.descSection}>
          <h2 className={s.descTitle}>{isRTL ? "عن الشاليه" : "About this chalet"}</h2>
          <p className={s.descBody}>{displayDesc}</p>
        </div>

        <div className={s.divider} />

        {/* Package pricing */}
        <div className={s.pricingSection}>
          <h2 className={s.pricingTitle}>{isRTL ? "الباقات والأسعار" : "Packages & Pricing"}</h2>
          <div className={s.pricingGrid}>
            {PACKAGES.map((pkg) => {
              const isActive = activePackage === pkg.key
              const price = chalet.pricing[pkg.key]
              const noteMap: Record<PackageKey, { en: string; ar: string }> = {
                weekend: { en: "Thu–Sat", ar: "خميس–سبت" },
                weekday: { en: "Sun–Wed", ar: "أحد–أربعاء" },
                fullWeek: { en: "7 nights", ar: "٧ ليالي" },
                holiday: { en: "Eid / Holidays", ar: "أعياد / عطلات" },
              }
              return (
                <button
                  key={pkg.key}
                  type="button"
                  onClick={() => setActivePackage(pkg.key)}
                  className={isActive ? s.pricingCardActive : s.pricingCard}
                >
                  <p className={isActive ? s.pricingLabelActive : s.pricingLabel}>
                    {isRTL ? pkg.ar : pkg.en}
                  </p>
                  <p dir="ltr">
                    <span className={isActive ? s.pricingPriceActive : s.pricingPrice}>
                      {price} KD
                    </span>
                    <span className={s.pricingSuffix}> {isRTL ? pkg.suffixAr : pkg.suffix}</span>
                  </p>
                  <p className={s.pricingNote}>
                    {isRTL ? noteMap[pkg.key].ar : noteMap[pkg.key].en}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <div className={s.divider} />

        {/* Calendar / Availability */}
        <div className={s.calendarSection}>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary-600" />
            <h2 className={s.calendarTitle}>{isRTL ? "التوفر والحجز" : "Availability"}</h2>
          </div>
          <p className={s.calendarSub}>
            {isRTL
              ? "اختر تاريخ الوصول والمغادرة"
              : "Select your check-in and check-out dates"}
          </p>

          <div className={s.calendarCard}>
            {/* Month nav */}
            <div className={s.calendarNav}>
              <button type="button" onClick={prevMonth} className={s.calendarNavBtn}>
                <ChevronLeft className={s.calendarNavIcon} />
              </button>
              <span className={s.calendarMonth}>{monthName} {calYear}</span>
              <button type="button" onClick={nextMonth} className={s.calendarNavBtn}>
                <ChevronRight className={s.calendarNavIcon} />
              </button>
            </div>

            {/* Weekday headers */}
            <div className={s.calendarWeekRow}>
              {weekDays.map((d) => (
                <span key={d} className={s.calendarWeekDay}>{d}</span>
              ))}
            </div>

            {/* Day grid */}
            <div className={s.calendarGrid}>
              {calendarDays.map((day, i) => {
                if (day === null) {
                  return <div key={`empty-${i}`} className={s.calendarDayEmpty} />
                }

                const date = new Date(calYear, calMonth, day)
                const iso = toISODate(date)
                const isPast = date < today && !isSameDay(date, today)
                const isUnavailable = unavailableSet.has(iso)
                const isToday = isSameDay(date, today)
                const isStart = checkIn && isSameDay(date, checkIn)
                const isEnd = checkOut && isSameDay(date, checkOut)
                const isInRange = checkIn && checkOut && isBetween(date, checkIn, checkOut)

                let className: string = s.calendarDay
                if (isPast) className = s.calendarDayPast
                else if (isUnavailable) className = s.calendarDayUnavailable
                else if (isStart || isEnd) className = s.calendarDaySelected
                else if (isInRange) className = s.calendarDayRange
                else if (isToday) className = s.calendarDayToday

                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => handleDayClick(date)}
                    className={className}
                    disabled={isPast || isUnavailable}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {/* Legend */}
            <div className={s.calendarLegend}>
              <span className={s.calendarLegendItem}>
                <span className={`${s.calendarLegendDot} bg-primary-600`} />
                {isRTL ? "محدد" : "Selected"}
              </span>
              <span className={s.calendarLegendItem}>
                <span className={`${s.calendarLegendDot} bg-slate-200`} style={{ textDecoration: "line-through" }} />
                {isRTL ? "غير متاح" : "Unavailable"}
              </span>
              <span className={s.calendarLegendItem}>
                <span className={`${s.calendarLegendDot} bg-primary-600/10 border border-primary-200`} />
                {isRTL ? "النطاق" : "Range"}
              </span>
            </div>
          </div>

          {/* Selected dates summary */}
          {checkIn && (
            <div className={s.datesSummary}>
              <div>
                <p className={s.datesSummaryLabel}>
                  {isRTL ? "الوصول" : "Check-in"}
                </p>
                <p className={s.datesSummaryValue}>
                  {checkIn.toLocaleDateString(isRTL ? "ar-KW" : "en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              {checkOut ? (
                <>
                  <ChevronRight className="h-4 w-4 text-slate-300 flex-shrink-0" />
                  <div>
                    <p className={s.datesSummaryLabel}>
                      {isRTL ? "المغادرة" : "Check-out"}
                    </p>
                    <p className={s.datesSummaryValue}>
                      {checkOut.toLocaleDateString(isRTL ? "ar-KW" : "en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right rtl:text-left">
                    <p className={s.datesSummaryNights}>
                      {nightCount} {isRTL ? "ليالي" : nightCount === 1 ? "night" : "nights"}
                    </p>
                    <p className="text-sm font-bold text-primary-600">
                      {activePrice * nightCount} KD
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-xs text-slate-400">
                  {isRTL ? "اختر تاريخ المغادرة" : "Select check-out date"}
                </p>
              )}
            </div>
          )}
        </div>

        <div className={s.divider} />

        {/* Map */}
        <div className={s.mapSection}>
          <h2 className={s.mapTitle}>{isRTL ? "الموقع" : "Location"}</h2>
          <div className={s.mapWrap}>
            <MapView
              properties={mapProperties}
              className="h-full"
              mode="preview"
            />
          </div>
          <div className={s.mapLocationRow}>
            <MapPin className={s.mapLocationIcon} />
            <span className={s.mapLocationText}>
              {isRTL ? "الخيران، محافظة الأحمدي، الكويت" : "Khiran, Al Ahmadi Governorate, Kuwait"}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className={s.stickyBar}>
        <div className={s.stickyInner}>
          <div className={s.stickyPriceCol}>
            <p dir="ltr">
              <span className={s.stickyPrice}>{activePrice} KD</span>
              <span className={s.stickyPriceSuffix}> {isRTL ? activePkg.suffixAr : activePkg.suffix}</span>
            </p>
            {checkIn && checkOut ? (
              <p className={s.stickyDates}>
                {checkIn.toLocaleDateString(isRTL ? "ar-KW" : "en-US", { month: "short", day: "numeric" })}
                {" → "}
                {checkOut.toLocaleDateString(isRTL ? "ar-KW" : "en-US", { month: "short", day: "numeric" })}
                {" · "}{nightCount} {isRTL ? "ليالي" : "nights"}
              </p>
            ) : (
              <p className={s.stickyDates}>
                {isRTL ? "اختر التواريخ أعلاه" : "Select dates above"}
              </p>
            )}
          </div>
          <button type="button" className={s.stickyPrimary}>
            {isRTL ? "طلب حجز" : "Request Booking"}
          </button>
          <button type="button" className={s.stickySecondary} aria-label="Call">
            <Phone className={s.stickySecondaryIcon} />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
