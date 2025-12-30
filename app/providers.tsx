"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { setLanguageCookie } from "@/lib/cookies"

type Language = "en" | "ar"

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  didHydrateLang: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = "aqarna_lang"

interface LanguageProviderProps {
  children: React.ReactNode
  initialLang: Language
}

export function LanguageProvider({ children, initialLang }: LanguageProviderProps) {
  const [lang, setLangState] = useState<Language>(initialLang)
  const [didHydrateLang, setDidHydrateLang] = useState(false)

  // Reconcile with localStorage on mount (but don't flip if cookie already matches)
  useEffect(() => {
    const savedLang = localStorage.getItem(STORAGE_KEY) as Language | null
    // Only update if localStorage differs from initialLang (from cookie)
    if (savedLang === "en" || savedLang === "ar") {
      if (savedLang !== initialLang) {
        // localStorage differs from cookie, prefer cookie (SSR source of truth)
        localStorage.setItem(STORAGE_KEY, initialLang)
      }
    } else {
      // No localStorage, write initialLang
      localStorage.setItem(STORAGE_KEY, initialLang)
    }
    setDidHydrateLang(true)
  }, [initialLang])

  // Wrapper to update both state, cookie, and localStorage
  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang)
    setLanguageCookie(newLang)
    if (didHydrateLang) {
      localStorage.setItem(STORAGE_KEY, newLang)
    }
  }, [didHydrateLang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, didHydrateLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

