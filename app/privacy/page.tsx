"use client"

import { useLanguage } from "@/app/providers"
import { t } from "@/lib/translations"

export default function PrivacyPage() {
  const { lang } = useLanguage()
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className={`max-w-3xl mx-auto ${lang === "ar" ? "text-right" : "text-left"}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {t("privacyTitle", lang)}
          </h1>
          <div className="prose prose-slate max-w-none space-y-4">
            <p className="text-slate-700 leading-relaxed text-base md:text-lg">
              {t("privacyContent1", lang)}
            </p>
            <p className="text-slate-700 leading-relaxed text-base md:text-lg">
              {t("privacyContent2", lang)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


