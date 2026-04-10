"use client"

import { useState, useMemo, useCallback } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  ChevronLeft,
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
import WhatsAppIcon from "@/components/icons/WhatsAppIcon"
import AppHeader from "@/components/v2/AppHeader"
import BottomNav from "@/components/v2/BottomNav"
import ImageLightbox from "@/components/v2/ImageLightbox"
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

/** Returns the day-of-week index: 0=Sun … 6=Sat */
function dow(d: Date) {
  return d.getDay()
}

// ─── Package-aware date rules ────────────────────────────────────────────────

/** Weekend (Thu–Sat): only Thu=4, Fri=5, Sat=6 are valid */
const WEEKEND_DAYS = new Set([4, 5, 6])
/** Weekday (Sun–Wed): only Sun=0, Mon=1, Tue=2, Wed=3 are valid */
const WEEKDAY_DAYS = new Set([0, 1, 2, 3])

/**
 * Returns true if a date is disabled for the active package,
 * independent of unavailable/past checks.
 */
function isPackageDisabled(date: Date, pkg: PackageKey): boolean {
  const d = dow(date)
  if (pkg === "weekend") return !WEEKEND_DAYS.has(d)
  if (pkg === "weekday") return !WEEKDAY_DAYS.has(d)
  // fullWeek and holiday: all days are valid check-in candidates
  return false
}

/**
 * Valid check-in day for the package?
 * - weekend: Thu only
 * - weekday: Sun only
 * - fullWeek / holiday: any day
 */
function isValidCheckIn(date: Date, pkg: PackageKey): boolean {
  if (pkg === "weekend") return dow(date) === 4 // Thursday
  if (pkg === "weekday") return dow(date) === 0 // Sunday
  return true
}

/**
 * Given a check-in date, compute the forced check-out date for the package.
 * Returns null if the package allows free check-out selection (holiday).
 */
function getAutoCheckOut(checkInDate: Date, pkg: PackageKey): Date | null {
  const out = new Date(checkInDate)
  if (pkg === "weekend") {
    out.setDate(out.getDate() + 2) // Thu → Sat
    return out
  }
  if (pkg === "weekday") {
    out.setDate(out.getDate() + 3) // Sun → Wed
    return out
  }
  if (pkg === "fullWeek") {
    out.setDate(out.getDate() + 7) // any → +7
    return out
  }
  return null // holiday: user picks freely
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

  const [heroIdx, setHeroIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
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

  // Reset dates when package changes
  const handlePackageChange = useCallback((pkg: PackageKey) => {
    setActivePackage(pkg)
    setCheckIn(null)
    setCheckOut(null)
  }, [])

  const handleDayClick = useCallback(
    (date: Date) => {
      const iso = toISODate(date)
      if (unavailableSet.has(iso)) return
      if (date < today) return
      if (isPackageDisabled(date, activePackage)) return

      // For weekend/weekday/fullWeek: check-in auto-sets check-out
      const autoOut = isValidCheckIn(date, activePackage)
        ? getAutoCheckOut(date, activePackage)
        : null

      if (activePackage !== "holiday" && autoOut) {
        // Only allow valid check-in days
        if (!isValidCheckIn(date, activePackage)) return

        // Verify no unavailable or package-disabled dates in the auto range
        let blocked = false
        const cursor = new Date(date)
        cursor.setDate(cursor.getDate() + 1)
        while (cursor <= autoOut) {
          const cursorIso = toISODate(cursor)
          if (unavailableSet.has(cursorIso) || isPackageDisabled(cursor, activePackage)) {
            blocked = true
            break
          }
          cursor.setDate(cursor.getDate() + 1)
        }
        if (blocked) return // Can't book this range

        // Toggle off if same check-in clicked
        if (checkIn && isSameDay(date, checkIn)) {
          setCheckIn(null)
          setCheckOut(null)
        } else {
          setCheckIn(date)
          setCheckOut(autoOut)
        }
        return
      }

      // Holiday: free check-in / check-out selection (original logic)
      if (!checkIn || (checkIn && checkOut)) {
        setCheckIn(date)
        setCheckOut(null)
      } else {
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
            setCheckIn(date)
            setCheckOut(null)
          } else {
            setCheckOut(date)
          }
        }
      }
    },
    [checkIn, checkOut, unavailableSet, today, activePackage],
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

        {/* Hero image — tap to open fullscreen viewer */}
        <div className={`${s.heroWrap} relative`} style={s.heroAspect}>
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute inset-0 block p-0 border-0 bg-transparent cursor-pointer"
            aria-label={isRTL ? "عرض الصور" : "View photos"}
          >
            <Image
              src={allImages[heroIdx]}
              alt={displayTitle}
              fill
              className={s.heroImage}
              sizes="(max-width: 480px) 100vw, 480px"
              priority
            />
            <div className={s.heroOverlay} />
            {allImages.length > 1 && (
              <span className={s.heroCounter}>
                {heroIdx + 1} / {allImages.length}
              </span>
            )}
          </button>

          {/* Share (above the image button so it stays clickable) */}
          <button
            type="button"
            className={`${s.heroShare} z-10`}
            aria-label="Share"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className={s.heroShareIcon} />
          </button>
        </div>

        {/* Thumbnail strip — tap opens the fullscreen viewer at that index */}
        {allImages.length > 1 && (
          <div className={s.thumbStrip}>
            {allImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setHeroIdx(i)
                  setLightboxOpen(true)
                }}
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
                  onClick={() => handlePackageChange(pkg.key)}
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
            {activePackage === "weekend"
              ? isRTL ? "اختر يوم خميس للوصول (خميس–سبت)" : "Select a Thursday to check in (Thu–Sat)"
              : activePackage === "weekday"
              ? isRTL ? "اختر يوم أحد للوصول (أحد–أربعاء)" : "Select a Sunday to check in (Sun–Wed)"
              : activePackage === "fullWeek"
              ? isRTL ? "اختر يوم الوصول (٧ ليالي)" : "Select your check-in day (7 nights)"
              : isRTL ? "اختر تاريخ الوصول والمغادرة" : "Select your check-in and check-out dates"}
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
                const pkgDisabled = isPackageDisabled(date, activePackage)
                const isDisabled = isPast || isUnavailable || pkgDisabled
                const isToday = isSameDay(date, today)
                const isStart = checkIn && isSameDay(date, checkIn)
                const isEnd = checkOut && isSameDay(date, checkOut)
                const isInRange = checkIn && checkOut && isBetween(date, checkIn, checkOut)

                let className: string = s.calendarDay
                if (isPast || pkgDisabled) className = s.calendarDayPast
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
                    disabled={isDisabled}
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

        {/* Contact the host */}
        <div className={s.descSection}>
          <h2 className={s.descTitle}>{isRTL ? "تواصل مع المالك" : "Contact Host"}</h2>
          <p className="text-xs text-slate-400 mb-3 rtl:text-[13px]">
            {isRTL ? "لديك سؤال قبل الحجز؟" : "Have a question before booking?"}
          </p>
          <div className="flex gap-2">
            <a
              href="https://wa.me/96500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl border border-border bg-card hover:bg-muted text-slate-600 text-sm font-semibold transition-colors duration-150"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {isRTL ? "واتساب" : "WhatsApp"}
            </a>
            <a
              href="tel:+96500000000"
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-xl border border-border bg-card hover:bg-muted text-slate-600 text-sm font-semibold transition-colors duration-150"
            >
              <Phone className="h-4 w-4" />
              {isRTL ? "اتصال" : "Call"}
            </a>
          </div>
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
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${chalet.lat},${chalet.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            <MapPin className="h-3.5 w-3.5" />
            {isRTL ? "فتح في خرائط جوجل" : "Get Directions"}
          </a>
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
          <a href="https://wa.me/96500000000" target="_blank" rel="noopener noreferrer" className={s.stickySecondary} aria-label="WhatsApp">
            <WhatsAppIcon className={s.stickySecondaryIcon} />
          </a>
          <a href="tel:+96500000000" className={s.stickySecondary} aria-label="Call">
            <Phone className={s.stickySecondaryIcon} />
          </a>
        </div>
      </div>

      <BottomNav />

      {/* Fullscreen image lightbox */}
      <ImageLightbox
        images={allImages}
        startIndex={heroIdx}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        alt={displayTitle}
      />
    </div>
  )
}
