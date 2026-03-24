"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  CalendarCheck,
  FileText,
  BedDouble,
  Bath,
  Maximize2,
  Waves,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react"
import AppHeader from "@/components/v2/AppHeader"
import BottomNav from "@/components/v2/BottomNav"
import { useLanguage } from "@/app/providers"
import { propertyDetail as s } from "@/components/v2/v2Styles"
import { getPropertyById } from "@/lib/mock-listings"

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false })

const VIEWING_TYPES = new Set(["apartment", "villa", "chalet", "house", "floor"])

interface PageProps {
  params: {
    id: string
  }
}

export default function PropertyDetailsPage({ params }: PageProps) {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"
  const p = getPropertyById(params.id)

  // Not found state
  if (!p) {
    return (
      <div className="min-h-screen bg-background flex flex-col" dir={isRTL ? "rtl" : "ltr"}>
        <AppHeader />
        <div className="flex-1 flex items-center justify-center px-5">
          <div className="text-center space-y-4 max-w-sm">
            <h1 className="text-xl font-bold text-slate-900">
              {isRTL ? "العقار غير موجود" : "Property not found"}
            </h1>
            <p className="text-sm text-slate-500">
              {isRTL ? "لم نتمكن من العثور على هذا العقار." : "We couldn't find this property."}
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {isRTL ? "العودة للقوائم" : "Back to Listings"}
            </Link>
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }

  const isViewingType = VIEWING_TYPES.has(p.propertyType)
  const displayTitle = isRTL ? p.titleAr : p.title
  const displayLocation = isRTL ? p.locationAr : p.location
  const displayGov = isRTL ? p.governorateAr : p.governorate
  const displayDesc = isRTL ? p.descriptionAr : p.description
  const displayFeature = isRTL && p.featureAr ? p.featureAr : p.feature

  const primaryLabel = isViewingType
    ? isRTL ? "حجز معاينة" : "Book Viewing"
    : isRTL ? "طلب تفاصيل" : "Request Details"
  const PrimaryIcon = isViewingType ? CalendarCheck : FileText

  const priceLine = `${p.price.toLocaleString()} KD`
  const priceSuffix = p.pricePeriod === "mo" ? (isRTL ? "/ شهر" : "/ mo") : ""

  const listedText = isRTL
    ? `أُدرج منذ ${p.listedDaysAgo} أيام`
    : `Listed ${p.listedDaysAgo} days ago`

  const mapProperties = [
    {
      id: p.id,
      title: p.title,
      location: p.location,
      price: p.price,
      bedrooms: p.bedrooms,
      bathrooms: p.bathrooms,
      area: p.area,
      image: p.image,
      type: p.type,
      lat: p.lat,
      lng: p.lng,
    },
  ]

  return (
    <div className={s.root} dir={isRTL ? "rtl" : "ltr"}>
      <AppHeader />

      <div className={s.container}>
        {/* Back row */}
        <div className={s.backRow}>
          <Link href="/properties" className={s.backBtn}>
            <ArrowLeft className={s.backIcon} />
            {isRTL ? "العودة للقوائم" : "Back to Listings"}
          </Link>
        </div>

        {/* Hero image */}
        <div className={s.heroWrap} style={s.heroAspect}>
          <Image
            src={p.images[0]}
            alt={displayTitle}
            fill
            className={s.heroImage}
            sizes="(max-width: 480px) 100vw, 480px"
            priority
          />
          <div className={s.heroOverlay} />
          {p.images.length > 1 && (
            <span className={s.heroCounter}>
              1 / {p.images.length}
            </span>
          )}
        </div>

        {/* Title / price / facts */}
        <div className={s.infoSection}>
          <div className={s.priceRow} dir="ltr">
            <span className={s.price}>{priceLine}</span>
            {priceSuffix && <span className={s.priceSuffix}>{priceSuffix}</span>}
          </div>
          <h1 className={s.title}>{displayTitle}</h1>
          <div className={s.factsRow}>
            <span>{p.bedrooms} {isRTL ? "غرف" : "Bed"}</span>
            <span className={s.factsDot}>·</span>
            <span>{p.bathrooms} {isRTL ? "حمام" : "Bath"}</span>
            <span className={s.factsDot}>·</span>
            <span>{p.area} m²</span>
            <span className={s.factsDot}>·</span>
            <span>{displayLocation}</span>
          </div>
        </div>

        {/* Trust / meta pills */}
        <div className={s.metaSection}>
          <div className={s.metaRow}>
            <span className={s.metaPill}>
              <Clock className={s.metaIcon} />
              {listedText}
            </span>
            <span className={s.metaPill}>
              <MapPin className={s.metaIcon} />
              {displayGov}
            </span>
            {p.verified && (
              <span className={s.metaPill}>
                <ShieldCheck className={s.metaIcon} />
                {isRTL ? "موثّق" : "Verified"}
              </span>
            )}
          </div>
        </div>

        {/* Primary action row */}
        <div className={s.actionSection}>
          <div className={s.actionRow}>
            <button type="button" className={s.actionPrimary}>
              <PrimaryIcon className="h-4 w-4" />
              {primaryLabel}
            </button>
            <a href="tel:+96500000000" className={s.actionSecondary} aria-label="Call">
              <Phone className="h-4 w-4 text-slate-600" />
            </a>
            <a href="https://wa.me/96500000000" target="_blank" rel="noopener noreferrer" className={s.actionSecondary} aria-label="WhatsApp">
              <MessageCircle className="h-4 w-4 text-slate-600" />
            </a>
          </div>
        </div>

        <div className={s.divider} />

        {/* Description */}
        <div className={s.descSection}>
          <h2 className={s.descTitle}>
            {isRTL ? "الوصف" : "Description"}
          </h2>
          <p className={s.descBody}>{displayDesc}</p>
        </div>

        <div className={s.divider} />

        {/* Key facts / features */}
        <div className={s.factsSection}>
          <h2 className={s.factsTitle}>
            {isRTL ? "التفاصيل الرئيسية" : "Key Details"}
          </h2>
          <div className={s.factsGrid}>
            <div className={s.factCard}>
              <BedDouble className={s.factIcon} />
              <div>
                <p className={s.factLabel}>{isRTL ? "غرف النوم" : "Bedrooms"}</p>
                <p className={s.factValue}>{p.bedrooms}</p>
              </div>
            </div>
            <div className={s.factCard}>
              <Bath className={s.factIcon} />
              <div>
                <p className={s.factLabel}>{isRTL ? "الحمامات" : "Bathrooms"}</p>
                <p className={s.factValue}>{p.bathrooms}</p>
              </div>
            </div>
            <div className={s.factCard}>
              <Maximize2 className={s.factIcon} />
              <div>
                <p className={s.factLabel}>{isRTL ? "المساحة" : "Area"}</p>
                <p className={s.factValue}>{p.area} m²</p>
              </div>
            </div>
            {displayFeature && (
              <div className={s.factCard}>
                <Waves className={s.factIcon} />
                <div>
                  <p className={s.factLabel}>{isRTL ? "ميزة خاصة" : "Feature"}</p>
                  <p className={s.factValue}>{displayFeature}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={s.divider} />

        {/* Mini map / location */}
        <div className={s.mapSection}>
          <h2 className={s.mapTitle}>
            {isRTL ? "الموقع" : "Location"}
          </h2>
          <div className={s.mapWrap}>
            <MapView
              properties={mapProperties}
              selectedPropertyId={p.id}
              className="h-full"
              mode="preview"
            />
          </div>
          <div className={s.mapLocationRow}>
            <MapPin className={s.mapLocationIcon} />
            <span className={s.mapLocationText}>
              {displayLocation}, {displayGov}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA bar */}
      <div className={s.stickyBar}>
        <div className={s.stickyInner}>
          <div>
            <span className={s.stickyPrice} dir="ltr">{priceLine}</span>
            {priceSuffix && <span className={s.stickyPriceSuffix}> {priceSuffix}</span>}
          </div>
          <button type="button" className={s.stickyPrimary}>
            <PrimaryIcon className="h-4 w-4" />
            {primaryLabel}
          </button>
          <a href="tel:+96500000000" className={s.stickySecondary}>
            <Phone className={s.stickySecondaryIcon} />
            {isRTL ? "اتصل" : "Call"}
          </a>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
