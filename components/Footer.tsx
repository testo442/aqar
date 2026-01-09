"use client"

import Link from "next/link"
import { useLanguage } from "@/app/providers"
import { t } from "@/lib/translations"

export default function Footer() {
  const { lang } = useLanguage()
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${lang === "ar" ? "text-right" : "text-left"}`}>
          <div className={`flex flex-wrap items-center gap-4 md:gap-6 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
            <Link 
              href="/privacy" 
              className="text-sm text-slate-600 hover:text-primary-600 transition-colors"
            >
              {t("privacyLink", lang)}
            </Link>
            <Link 
              href="/terms" 
              className="text-sm text-slate-600 hover:text-primary-600 transition-colors"
            >
              {t("termsLink", lang)}
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-slate-600 hover:text-primary-600 transition-colors"
            >
              {t("contactLink", lang)}
            </Link>
          </div>
          <p className="text-sm text-slate-500">
            {t("copyright", lang).replace("{year}", currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  )
}

