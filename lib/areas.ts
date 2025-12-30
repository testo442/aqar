/**
 * Area registry for Kuwait real estate areas
 * Used for area-based filtering and display
 */
export interface Area {
  id: string
  en: string
  ar: string
  center: { lat: number; lng: number }
}

export const AREAS: Record<string, Area> = {
  dasma: {
    id: "dasma",
    en: "Dasma",
    ar: "الدسمة",
    center: { lat: 29.3500, lng: 48.0167 },
  },
  salmiya: {
    id: "salmiya",
    en: "Salmiya",
    ar: "السالمية",
    center: { lat: 29.3375, lng: 48.0758 },
  },
  hawalli: {
    id: "hawalli",
    en: "Hawalli",
    ar: "حولي",
    center: { lat: 29.3333, lng: 48.0833 },
  },
  jabriya: {
    id: "jabriya",
    en: "Jabriya",
    ar: "الجابرية",
    center: { lat: 29.3167, lng: 48.0500 },
  },
  salwa: {
    id: "salwa",
    en: "Salwa",
    ar: "سلوى",
    center: { lat: 29.2833, lng: 48.0833 },
  },
  kuwaitCity: {
    id: "kuwaitCity",
    en: "Kuwait City",
    ar: "مدينة الكويت",
    center: { lat: 29.3759, lng: 47.9774 },
  },
  surra: {
    id: "surra",
    en: "Surra",
    ar: "السرة",
    center: { lat: 29.3000, lng: 48.0000 },
  },
  fintas: {
    id: "fintas",
    en: "Fintas",
    ar: "الفنطاس",
    center: { lat: 29.2500, lng: 48.1000 },
  },
  messila: {
    id: "messila",
    en: "Messila",
    ar: "المسيلة",
    center: { lat: 29.3200, lng: 48.0400 },
  },
  bneidAlGar: {
    id: "bneidAlGar",
    en: "Bneid Al-Gar",
    ar: "بنيد القار",
    center: { lat: 29.3600, lng: 48.0200 },
  },
  yarmouk: {
    id: "yarmouk",
    en: "Yarmouk",
    ar: "اليرموك",
    center: { lat: 29.3052, lng: 48.0317 },
  },
}

