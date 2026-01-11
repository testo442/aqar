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
    areas: [
      AREAS.rawda,
      AREAS.mansouriya,
      AREAS.kaifan,
      AREAS.mirqab,
      AREAS.adailiya,
      AREAS.nuzha,
      AREAS.qibla,
      AREAS.dasman,
      AREAS.khaldiya,
      AREAS.faiha,
      AREAS.dasma,
      AREAS.salhiya,
      AREAS.sharq,
      AREAS.qadsiya,
      AREAS.shamiya,
      AREAS.daiya,
      AREAS.yarmouk,
      AREAS.surra,
      AREAS.qortuba,
      AREAS.qairawan,
      AREAS.nahdha,
      AREAS.granada,
      AREAS.abdullahAlSalem,
      AREAS.bneidAlGar,
      AREAS.sulaibikhatWestNorth,
      AREAS.sulaibikhat,
      AREAS.doha,
      AREAS.shuwaikh,
      AREAS.watya,
      AREAS.kuwaitCity,
    ],
  },
  {
    id: "hawalli",
    en: "Hawalli",
    ar: "حولي",
    areas: [
      AREAS.jabriya,
      AREAS.rumaithiya,
      AREAS.salmiya,
      AREAS.shaab,
      AREAS.hawalli,
      AREAS.hawalliMaidan,
      AREAS.nigra,
      AREAS.bidaa,
      AREAS.bayan,
      AREAS.mishref,
      AREAS.siddeeq,
      AREAS.zahra,
      AREAS.hittin,
      AREAS.surraSouth,
      AREAS.salwa,
      AREAS.shuhada,
      AREAS.salam,
      AREAS.abdullahAlMubarakHawalli,
    ],
  },
  {
    id: "farwaniya",
    en: "Farwaniya",
    ar: "الفروانية",
    areas: [
      AREAS.khaitan,
      AREAS.khaitanNew,
      AREAS.jleebAlShuyoukh,
      AREAS.ishbiliya,
      AREAS.andalus,
      AREAS.khaitanAbrag,
      AREAS.ardhiya,
      AREAS.omariya,
      AREAS.farwaniya,
      AREAS.firdous,
      AREAS.abbasiya,
      AREAS.sabahAlNasser,
      AREAS.riggai,
      AREAS.rehab,
      AREAS.rabiya,
      AREAS.mubarakAlAbdullah,
      AREAS.mubarakAlAbdullahWest,
      AREAS.shaddadiya,
      AREAS.hassawi,
      AREAS.dajeej,
    ],
  },
  {
    id: "ahmadi",
    en: "Ahmadi",
    ar: "الأحمدي",
    areas: [
      AREAS.mahboula,
      AREAS.dhaher,
      AREAS.eqaila,
      AREAS.fintas,
      AREAS.mangaf,
      AREAS.sabahiya,
      AREAS.abuHalifa,
      AREAS.hadiya,
      AREAS.riqqa,
      AREAS.ahmadi,
      AREAS.fahaheel,
      AREAS.fahadAlAhmad,
      AREAS.jaberAlAli,
      AREAS.aliSabahAlSalemUmmAlHayman,
      AREAS.sabahAlAhmadCity,
      AREAS.ahmadiEast,
      AREAS.khiran,
      AREAS.khiranCity,
      AREAS.sabahAlAhmadSeaCity,
      AREAS.zour,
      AREAS.bnaider,
      AREAS.julaia,
      AREAS.nuwaiseeb,
      AREAS.shuaiba,
      AREAS.minaAbdullah,
      AREAS.minaAlAhmadi,
      AREAS.wafra,
    ],
  },
  {
    id: "mubarakAlKabeer",
    en: "Mubarak Al-Kabeer",
    ar: "مبارك الكبير",
    areas: [
      AREAS.messila,
      AREAS.abuAlHasaniya,
      AREAS.qurain,
      AREAS.qusour,
      AREAS.adan,
      AREAS.masayel,
      AREAS.fnaitees,
      AREAS.subhan,
      AREAS.abuFtaira,
      AREAS.sabahAlSalem,
      AREAS.mubarakAlKabeer,
    ],
  },
  {
    id: "jahra",
    en: "Jahra",
    ar: "الجهراء",
    areas: [
      AREAS.waha,
      AREAS.qasr,
      AREAS.naeem,
      AREAS.oyoun,
      AREAS.naseem,
      AREAS.taima,
      AREAS.saadAlAbdullahCity,
      AREAS.mutlaa,
      AREAS.jahraNew,
      AREAS.jahraOld,
      AREAS.jahraSouth,
      AREAS.amghara,
      AREAS.sulaibiya,
      AREAS.abdali,
      AREAS.rawdatain,
      AREAS.kabed,
      AREAS.salmi,
      AREAS.subiya,
    ],
  },
]

// Mapping from governorate ID to array of areas (canonical source of truth)
export const AREAS_BY_GOVERNORATE: Record<string, Area[]> = GOVERNORATES.reduce(
  (acc, gov) => {
    acc[gov.id] = gov.areas
    return acc
  },
  {} as Record<string, Area[]>
)

// Helper: Get governorate by ID
export const GOVERNORATE_BY_ID: Record<string, Governorate> = GOVERNORATES.reduce(
  (acc, gov) => {
    acc[gov.id] = gov
    return acc
  },
  {} as Record<string, Governorate>
)

// Helper: Get areas for a governorate (canonical source - NEVER derive from listings)
export function getAreasForGovernorate(governorateId: string): Area[] {
  return AREAS_BY_GOVERNORATE[governorateId] ?? []
}

// Helper: Get all areas across all governorates (flat list, no duplicates - canonical source)
export function getAllAreas(): Area[] {
  const allAreas = GOVERNORATES.flatMap((gov) => gov.areas).filter(Boolean)
  const uniqueAreasMap = new Map<string, Area>()
  allAreas.forEach((area) => {
    if (!area) return
    if (!uniqueAreasMap.has(area.id)) {
      uniqueAreasMap.set(area.id, area)
    }
  })
  return Array.from(uniqueAreasMap.values())
}
