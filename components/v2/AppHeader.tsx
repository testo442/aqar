"use client"

import Link from "next/link"
import { Building2 } from "lucide-react"
import { useLanguage } from "@/app/providers"
import { header as s } from "./v2Styles"

export default function AppHeader() {
  const { lang, setLang } = useLanguage()

  return (
    <header className={s.root}>
      <div className={s.inner}>
        <div className={s.row}>
          {/* Logo */}
          <Link href="/" className={s.logo}>
            <Building2 className={s.logoIcon} strokeWidth={2} />
            <span className={s.logoText}>Aqarna</span>
          </Link>

          {/* EN | AR toggle */}
          <div className={s.langToggle}>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={lang === "en" ? s.langActive : s.langInactive}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("ar")}
              className={lang === "ar" ? s.langActive : s.langInactive}
            >
              AR
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
