"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Phone,
  CalendarCheck,
  Navigation,
  BedDouble,
  Bath,
  Maximize2,
  Waves,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react"
import WhatsAppIcon from "@/components/icons/WhatsAppIcon"
import AppHeader from "@/components/v2/AppHeader"
import BottomNav from "@/components/v2/BottomNav"
import { useLanguage } from "@/app/providers"
import { propertyDetail as s } from "@/components/v2/v2Styles"

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false })

const GOOGLE_MAPS_DIR = "https://www.google.com/maps/dir/?api=1&destination="

// ── Mock property ───────────────────────────────────────────────────────────
const MOCK = {
  id: "p-1",
  title: "Sea-view Villa with Private Garden",
  titleAr: "فيلا مطلة على البحر مع حديقة خاصة",
  price: 1200,
  type: "rent" as const,
  propertyType: "villa",
  bedrooms: 4,
  bathrooms: 3,
  area: 520,
  location: "Khiran",
  locationAr: "الخيران",
  governorate: "Al Ahmadi",
  governorateAr: "الأحمدي",
  lat: 28.651,
  lng: 48.378,
  feature: "Sea View",
  featureAr: "إطلالة بحرية",
  image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
  ],
  description:
    "A beautifully designed sea-view villa located in the heart of Khiran. The property features an open-plan living area with floor-to-ceiling windows, a private garden, and direct access to the beach promenade. Ideal for families seeking a modern coastal lifestyle with premium finishes throughout.",
  descriptionAr:
    "فيلا مصممة بأناقة تطل على البحر في قلب الخيران. يتميز العقار بمساحة معيشة مفتوحة مع نوافذ ممتدة من الأرض حتى السقف، وحديقة خاصة، ووصول مباشر إلى ممشى الشاطئ. مثالية للعائلات الباحثة عن نمط حياة ساحلي عصري بتشطيبات فاخرة.",
  listedDaysAgo: 3,
}

export default function PropertyDetailV2Page() {
  const { lang } = useLanguage()
  const isRTL = lang === "ar"
  const p = MOCK
  const displayTitle = isRTL && p.titleAr ? p.titleAr : p.title
  const displayLocation = isRTL && p.locationAr ? p.locationAr : p.location
  const displayGov = isRTL && p.governorateAr ? p.governorateAr : p.governorate
  const displayDesc = isRTL && p.descriptionAr ? p.descriptionAr : p.description
  const displayFeature = isRTL && p.featureAr ? p.featureAr : p.feature

  const mapsUrl = `${GOOGLE_MAPS_DIR}${p.lat},${p.lng}`

  const priceLine = p.type === "rent"
    ? `${p.price.toLocaleString()} KD`
    : `${p.price.toLocaleString()} KD`
  const priceSuffix = p.type === "rent" ? (isRTL ? "/ شهر" : "/ mo") : ""

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
      <style>{`
        footer, [data-footer] { display: none !important; }
        body > header:first-of-type { display: none !important; }
      `}</style>
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
            <span className={s.metaPill}>
              <ShieldCheck className={s.metaIcon} />
              {isRTL ? "موثّق" : "Verified"}
            </span>
          </div>
        </div>

        {/* Contact actions */}
        <div className={s.actionSection}>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="h-11 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors duration-150 flex items-center justify-center gap-2"
            >
              <CalendarCheck className="h-4 w-4" />
              {isRTL ? "حجز معاينة" : "Book Viewing"}
            </button>
            <div className="flex gap-2">
              <a
                href="https://wa.me/96500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-11 rounded-2xl border border-border bg-card hover:bg-muted text-sm font-semibold text-slate-600 transition-colors duration-150 flex items-center justify-center gap-2"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {isRTL ? "واتساب" : "WhatsApp"}
              </a>
              <a
                href="tel:+96500000000"
                className="flex-1 h-11 rounded-2xl border border-border bg-card hover:bg-muted text-sm font-semibold text-slate-600 transition-colors duration-150 flex items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                {isRTL ? "اتصال" : "Call"}
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-11 rounded-2xl border border-border bg-card hover:bg-muted text-sm font-semibold text-slate-600 transition-colors duration-150 flex items-center justify-center gap-2"
              >
                <Navigation className="h-4 w-4" />
                {isRTL ? "اتجاهات" : "Directions"}
              </a>
            </div>
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

      {/* Sticky bottom bar — Book Viewing primary + WhatsApp + Call */}
      <div className={s.stickyBar}>
        <div className={s.stickyInner}>
          <div>
            <span className={s.stickyPrice} dir="ltr">{priceLine}</span>
            {priceSuffix && <span className={s.stickyPriceSuffix}> {priceSuffix}</span>}
          </div>
          <button
            type="button"
            className={s.stickyPrimary}
          >
            {isRTL ? "حجز معاينة" : "Book Viewing"}
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
    </div>
  )
}
