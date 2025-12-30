import type { Area } from "./areas"
import { AREAS } from "./areas"

export interface Governorate {
  id: string
  en: string
  ar: string
  areas: Area[]
}

export const GOVERNORATES: Governorate[] = [
  {
    id: "capital",
    en: "Capital",
    ar: "العاصمة",
    areas: [AREAS.kuwaitCity, AREAS.dasma, AREAS.bneidAlGar, AREAS.yarmouk],
  },
  {
    id: "hawalli",
    en: "Hawalli",
    ar: "حولي",
    areas: [AREAS.hawalli, AREAS.salmiya, AREAS.jabriya, AREAS.surra, AREAS.messila, AREAS.salwa],
  },
  {
    id: "farwaniya",
    en: "Farwaniya",
    ar: "الفروانية",
    areas: [],
  },
  {
    id: "mubarakAlKabeer",
    en: "Mubarak Al-Kabeer",
    ar: "مبارك الكبير",
    areas: [],
  },
  {
    id: "ahmadi",
    en: "Ahmadi",
    ar: "الأحمدي",
    areas: [AREAS.fintas],
  },
  {
    id: "jahra",
    en: "Jahra",
    ar: "الجهراء",
    areas: [],
  },
]

// Helper: Get governorate by ID
export const GOVERNORATE_BY_ID: Record<string, Governorate> = GOVERNORATES.reduce(
  (acc, gov) => {
    acc[gov.id] = gov
    return acc
  },
  {} as Record<string, Governorate>
)

// Helper: Get areas for a governorate
export function getAreasForGovernorate(governorateId: string): Area[] {
  const governorate = GOVERNORATE_BY_ID[governorateId]
  return governorate?.areas ?? []
}

