"use client"

import Link from "next/link"
import { Search, TrendingUp, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/app/providers"
import { t } from "@/lib/translations"

export default function AboutPage() {
  const { lang } = useLanguage()
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto text-center ${lang === "ar" ? "text-right" : "text-left"}`}>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              {t("aboutTitle", lang)}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              {t("aboutSubtitle", lang)}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1" dir="ltr">10,000+</div>
              <div className="text-sm md:text-base text-slate-600 font-medium">{t("aboutStatsProperties", lang)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1" dir="ltr">5,000+</div>
              <div className="text-sm md:text-base text-slate-600 font-medium">{t("aboutStatsCustomers", lang)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1" dir="ltr">50+</div>
              <div className="text-sm md:text-base text-slate-600 font-medium">{t("aboutStatsAgents", lang)}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1" dir="ltr">24/7</div>
              <div className="text-sm md:text-base text-slate-600 font-medium">{t("aboutStatsSupport", lang)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
              <div className="text-center">
                <div className="bg-primary-50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <Search className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className={`text-xl md:text-2xl font-bold mb-3 text-slate-900 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("aboutFeature1Title", lang)}</h3>
                <p className={`text-slate-600 leading-relaxed text-base md:text-lg ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {t("aboutFeature1Desc", lang)}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <TrendingUp className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className={`text-xl md:text-2xl font-bold mb-3 text-slate-900 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("aboutFeature2Title", lang)}</h3>
                <p className={`text-slate-600 leading-relaxed text-base md:text-lg ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {t("aboutFeature2Desc", lang)}
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <Shield className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className={`text-xl md:text-2xl font-bold mb-3 text-slate-900 ${lang === "ar" ? "text-right" : "text-left"}`}>{t("aboutFeature3Title", lang)}</h3>
                <p className={`text-slate-600 leading-relaxed text-base md:text-lg ${lang === "ar" ? "text-right" : "text-left"}`}>
                  {t("aboutFeature3Desc", lang)}
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center tracking-tight ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("aboutHowItWorks", lang)}
              </h2>
              <div className="space-y-6">
                <div className={`flex gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <div className="flex-shrink-0">
                    <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold" dir="ltr">
                      1
                    </div>
                  </div>
                  <div className={lang === "ar" ? "text-right" : "text-left"}>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{t("aboutStep1Title", lang)}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {t("aboutStep1Desc", lang)}
                    </p>
                  </div>
                </div>
                <div className={`flex gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <div className="flex-shrink-0">
                    <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold" dir="ltr">
                      2
                    </div>
                  </div>
                  <div className={lang === "ar" ? "text-right" : "text-left"}>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{t("aboutStep2Title", lang)}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {t("aboutStep2Desc", lang)}
                    </p>
                  </div>
                </div>
                <div className={`flex gap-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <div className="flex-shrink-0">
                    <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold" dir="ltr">
                      3
                    </div>
                  </div>
                  <div className={lang === "ar" ? "text-right" : "text-left"}>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{t("aboutStep3Title", lang)}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {t("aboutStep3Desc", lang)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Points */}
            <div>
              <h2 className={`text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center tracking-tight ${lang === "ar" ? "text-right" : "text-left"}`}>
                {t("aboutTrustTitle", lang)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`flex items-start gap-3 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <CheckCircle className={`h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5 ${lang === "ar" ? "ml-3" : ""}`} />
                  <div className={lang === "ar" ? "text-right" : "text-left"}>
                    <h4 className="font-semibold text-slate-900 mb-1">{t("aboutTrust1Title", lang)}</h4>
                    <p className="text-sm text-slate-600">{t("aboutTrust1Desc", lang)}</p>
                  </div>
                </div>
                <div className={`flex items-start gap-3 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <CheckCircle className={`h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5 ${lang === "ar" ? "ml-3" : ""}`} />
                  <div className={lang === "ar" ? "text-right" : "text-left"}>
                    <h4 className="font-semibold text-slate-900 mb-1">{t("aboutTrust2Title", lang)}</h4>
                    <p className="text-sm text-slate-600">{t("aboutTrust2Desc", lang)}</p>
                  </div>
                </div>
                <div className={`flex items-start gap-3 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <CheckCircle className={`h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5 ${lang === "ar" ? "ml-3" : ""}`} />
                  <div className={lang === "ar" ? "text-right" : "text-left"}>
                    <h4 className="font-semibold text-slate-900 mb-1">{t("aboutTrust3Title", lang)}</h4>
                    <p className="text-sm text-slate-600">{t("aboutTrust3Desc", lang)}</p>
                  </div>
                </div>
                <div className={`flex items-start gap-3 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <CheckCircle className={`h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5 ${lang === "ar" ? "ml-3" : ""}`} />
                  <div className={lang === "ar" ? "text-right" : "text-left"}>
                    <h4 className="font-semibold text-slate-900 mb-1">{t("aboutTrust4Title", lang)}</h4>
                    <p className="text-sm text-slate-600">{t("aboutTrust4Desc", lang)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className={`max-w-3xl mx-auto text-center ${lang === "ar" ? "text-right" : "text-left"}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              {t("aboutCTATitle", lang)}
            </h2>
            <p className="text-xl md:text-2xl text-primary-50 mb-10 leading-[1.6]">
              {t("aboutCTASubtitle", lang)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary-600 border-white hover:bg-primary-50 rounded-xl px-8 py-6 text-base font-semibold h-auto"
                >
                  {t("browseProperties", lang)}
                </Button>
              </Link>
              <Link href="/sell">
                <Button
                  size="lg"
                  className="bg-white/10 text-white border-2 border-white hover:bg-white/20 rounded-xl px-8 py-6 text-base font-semibold h-auto"
                >
                  {t("listYourProperty", lang)}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

