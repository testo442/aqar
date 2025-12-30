export type I18nText = { en: string; ar: string }

/**
 * Get translated text from i18n object
 * @param value - The i18n text object
 * @param lang - The target language
 * @param fallback - Fallback string if value is undefined
 * @returns The translated text or fallback
 */
export function tText(
  value: I18nText | undefined,
  lang: "en" | "ar",
  fallback?: string
): string {
  if (value) {
    return value[lang]
  }
  return fallback ?? ""
}

/**
 * Get text direction based on language
 * @param lang - The language code
 * @returns "rtl" for Arabic, "ltr" for others
 */
export function dir(lang: "en" | "ar"): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr"
}

/**
 * Check if language is Arabic
 */
export function isArabic(lang: "en" | "ar"): boolean {
  return lang === "ar"
}

/**
 * Format number for display in RTL context
 * Returns the string value - components should wrap it in a span with dir="ltr" when lang === "ar"
 * Use this helper to get the formatted string, then wrap it appropriately
 */
export function formatNumberForRTL(value: string | number, lang: "en" | "ar"): string {
  return typeof value === "number" ? value.toString() : value
}

