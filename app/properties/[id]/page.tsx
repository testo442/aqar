"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Bed, Bath, Square, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockProperties } from "../data/properties"
import { useLanguage } from "@/app/providers"
import { t } from "@/lib/translations"
import { tText, formatNumberForRTL } from "@/lib/i18n"
import { isValidLatLng } from "@/lib/geo"

interface PageProps {
  params: {
    id: string
  }
}

export default function PropertyDetailsPage({ params }: PageProps) {
  const { lang } = useLanguage()
  const property = mockProperties.find((p) => p.id === params.id)

  // Not found state
  if (!property) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className={`max-w-md mx-auto ${lang === "ar" ? "text-right" : "text-left"}`}>
            <div className="bg-white rounded-2xl shadow-soft-lg border border-slate-200 p-8 text-center">
              <h1 className="text-2xl font-bold text-slate-900 mb-3">{t("propertyNotFound", lang)}</h1>
              <p className="text-slate-600 mb-8">
                {t("propertyNotFoundDesc", lang)}
              </p>
              <Link href="/properties">
                <Button className="w-full">
                  <ArrowLeft className={`h-4 w-4 ${lang === "ar" ? "ml-2" : "mr-2"}`} />
                  {t("backToProperties", lang)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Format price
  const formattedPrice = new Intl.NumberFormat("en-KW", {
    style: "currency",
    currency: "KWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/properties">
              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className={`text-lg md:text-xl font-bold text-slate-900 truncate flex-1 ${lang === "ar" ? "text-right" : "text-left"}`}>
              {tText(property.titleI18n, lang, property.title)}
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Price and Location */}
          <div className="mb-6">
            <div className={`flex items-baseline gap-2 mb-2 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
              {lang === "ar" ? (
                <span className="text-3xl md:text-4xl font-bold text-primary-600 tabular-nums" dir="ltr">
                  {formattedPrice}
                </span>
              ) : (
                <span className="text-3xl md:text-4xl font-bold text-primary-600 tabular-nums">
                  {formattedPrice}
                </span>
              )}
              {property.type === "rent" && (
                <span className="text-lg text-slate-600">{t("month", lang)}</span>
              )}
            </div>
            <div className={`flex items-center gap-2 text-slate-600 mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
              <p className="text-base">{tText(property.locationI18n, lang, property.location)}</p>
            </div>
            {!isValidLatLng(property.lat, property.lng) && (
              <p className={`text-sm text-slate-500 italic mb-2 ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("locationNotAvailable", lang)}
              </p>
            )}
            {property.areaInfo && (
              <div className="inline-block">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200">
                  {tText({ en: property.areaInfo.en, ar: property.areaInfo.ar }, lang, property.areaInfo.en)}
                </span>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-slate-50 rounded-2xl">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Bed className="h-5 w-5 text-slate-600" />
              </div>
              {lang === "ar" ? (
                <div className="text-2xl font-bold text-slate-900 tabular-nums" dir="ltr">{property.bedrooms}</div>
              ) : (
                <div className="text-2xl font-bold text-slate-900 tabular-nums">{property.bedrooms}</div>
              )}
              <div className="text-xs text-slate-600">{t("bedrooms", lang)}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Bath className="h-5 w-5 text-slate-600" />
              </div>
              {lang === "ar" ? (
                <div className="text-2xl font-bold text-slate-900 tabular-nums" dir="ltr">{property.bathrooms}</div>
              ) : (
                <div className="text-2xl font-bold text-slate-900 tabular-nums">{property.bathrooms}</div>
              )}
              <div className="text-xs text-slate-600">{t("bathrooms", lang)}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Square className="h-5 w-5 text-slate-600" />
              </div>
              {lang === "ar" ? (
                <div className="text-2xl font-bold text-slate-900 tabular-nums" dir="ltr">{property.area}</div>
              ) : (
                <div className="text-2xl font-bold text-slate-900 tabular-nums">{property.area}</div>
              )}
              <div className="text-xs text-slate-600">{t("area", lang)}</div>
            </div>
          </div>

          {/* Overview Section */}
          <div className={`mb-8 ${lang === "ar" ? "text-right" : "text-left"}`}>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t("overview", lang)}</h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed">
                {t("overviewPlaceholder", lang)}
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 py-4 md:py-6 -mx-4 px-4 md:mx-0 md:px-0 md:border-0 md:static">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                variant="outline"
                className="flex-1 h-12 text-base font-semibold"
              >
                <a href="tel:+96500000000">
                  <Phone className={`h-5 w-5 ${lang === "ar" ? "ml-2" : "mr-2"}`} />
                  {t("callAgent", lang)}
                </a>
              </Button>
              <Button
                asChild
                className="flex-1 h-12 text-base font-semibold"
              >
                <a href="https://wa.me/96500000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className={`h-5 w-5 ${lang === "ar" ? "ml-2" : "mr-2"}`} />
                  {t("whatsapp", lang)}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

