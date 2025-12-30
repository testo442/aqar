"use client"

import { useEffect } from "react"
import { useLanguage } from "./providers"
import { dir } from "@/lib/i18n"

export function HtmlAttributes() {
  const { lang, didHydrateLang } = useLanguage()

  // Update attributes when language changes (after hydration)
  // Note: Initial attributes are set in layout.tsx from cookie (SSR)
  useEffect(() => {
    if (didHydrateLang) {
      const html = document.documentElement
      const currentLang = html.getAttribute("lang")
      const currentDir = html.getAttribute("dir")
      
      // Only update if different (avoid unnecessary DOM updates)
      if (currentLang !== lang) {
        html.setAttribute("lang", lang)
      }
      const expectedDir = dir(lang)
      if (currentDir !== expectedDir) {
        html.setAttribute("dir", expectedDir)
      }
    }
  }, [lang, didHydrateLang])

  return null
}

