"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Menu, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/app/providers"
import { t } from "@/lib/translations"

export default function Header() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const isPropertiesPage = pathname?.startsWith("/properties") ?? false
  const { lang, setLang } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-2 min-w-0">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 min-w-0 flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm flex-shrink-0">
              <Home className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold text-primary-600 truncate">Aqarna</span>
          </Link>

          {/* Search Bar - Desktop (hidden on /properties and /) */}
          {!isPropertiesPage && !isHomePage && (
            <div className="hidden flex-1 max-w-2xl mx-8 md:flex">
              <div className="relative w-full">
                <Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${lang === "ar" ? "right-3" : "left-3"}`} />
                <Input
                  type="text"
                  placeholder={t("searchPlaceholder", lang)}
                  className={`${lang === "ar" ? "pr-10" : "pl-10"} h-12 w-full rounded-lg border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200`}
                />
              </div>
            </div>
          )}

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/properties?type=buy"
              className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
            >
              {t("buy", lang)}
            </Link>
            <Link
              href="/properties?type=rent"
              className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
            >
              {t("rent", lang)}
            </Link>
            <Link
              href="/sell"
              className="text-sm font-medium text-slate-700 hover:text-primary-600 transition-colors"
            >
              {t("sell", lang)}
            </Link>
            {/* Language Toggle - Hidden on Home page */}
            {!isHomePage && (
              <div className="inline-flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    lang === "en"
                      ? "bg-white text-primary-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang("ar")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    lang === "ar"
                      ? "bg-white text-primary-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  aria-label="Switch to Arabic"
                >
                  AR
                </button>
              </div>
            )}
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Link href="/sell">
              <Button size="sm">{t("listProperty", lang)}</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button and Language Toggle */}
          <div className="md:hidden flex items-center gap-2 flex-shrink-0">
            <Link href="/sell" className="hidden sm:inline-block">
              <Button variant="outline" size="sm" className="text-xs whitespace-nowrap px-2">
                {t("listProperty", lang)}
              </Button>
            </Link>
            {/* Language Toggle - Hidden on Home page */}
            {!isHomePage && (
              <div className="inline-flex items-center rounded-lg bg-slate-100 p-1 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    lang === "en"
                      ? "bg-white text-primary-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang("ar")}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                    lang === "ar"
                      ? "bg-white text-primary-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  aria-label="Switch to Arabic"
                >
                  AR
                </button>
              </div>
            )}
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar (hidden on /properties and /) */}
        {!isPropertiesPage && !isHomePage && (
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 ${lang === "ar" ? "right-3" : "left-3"}`} />
              <Input
                type="text"
                placeholder={t("searchPlaceholder", lang)}
                className={`${lang === "ar" ? "pr-10" : "pl-10"} h-12 w-full rounded-lg border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200`}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
