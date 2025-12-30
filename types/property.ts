export interface Property {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  type: "buy" | "rent"
  lat?: number
  lng?: number
  // Optional i18n fields
  titleI18n?: { en: string; ar: string }
  locationI18n?: { en: string; ar: string }
  // Optional area/neighborhood info
  areaInfo?: {
    id: string
    en: string
    ar: string
  }
}


