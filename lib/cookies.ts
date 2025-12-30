/**
 * Cookie utilities for language persistence
 */

const COOKIE_NAME = "aqarna_lang"

/**
 * Set language cookie
 */
export function setLanguageCookie(lang: "en" | "ar"): void {
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_NAME}=${lang}; path=/; max-age=31536000; samesite=lax`
  }
}

/**
 * Get language from cookie (client-side)
 */
export function getLanguageCookie(): "en" | "ar" | null {
  if (typeof document === "undefined") return null
  
  const cookies = document.cookie.split(";")
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=")
    if (name === COOKIE_NAME) {
      if (value === "en" || value === "ar") {
        return value
      }
    }
  }
  return null
}

