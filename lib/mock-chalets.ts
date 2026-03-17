/**
 * Khiran chalet mock data — booking-focused with package-based pricing.
 */

export type PackageKey = "weekend" | "weekday" | "fullWeek" | "holiday"

export interface ChaletPackagePrice {
  weekend: number
  weekday: number
  fullWeek: number
  holiday: number
}

export interface MockChalet {
  id: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  /** Per-package pricing in KD */
  pricing: ChaletPackagePrice
  bedrooms: number
  bathrooms: number
  capacity: number
  area: number
  image: string
  images: string[]
  lat: number
  lng: number
  /** Amenity flags */
  pool: boolean
  beachAccess: boolean
  bbq: boolean
  wifi: boolean
  rating: number
  reviewCount: number
  verified: boolean
  /** Dates that are unavailable (ISO strings, YYYY-MM-DD) */
  unavailableDates: string[]
  /** e.g. "Beachfront", "Pool Villa" */
  tag?: string
  tagAr?: string
}

export const KHIRAN_CHALETS: MockChalet[] = [
  {
    id: "kh-1",
    title: "Sunset Beach Chalet",
    titleAr: "شاليه غروب الشاطئ",
    description: "A stunning beachfront chalet with direct Gulf access. Features a private pool, outdoor BBQ area, and panoramic sunset views from the terrace. Perfect for families and weekend retreats.",
    descriptionAr: "شاليه مذهل على الشاطئ مع وصول مباشر للخليج. يضم مسبحاً خاصاً ومنطقة شواء خارجية وإطلالات بانورامية على الغروب من الشرفة. مثالي للعائلات وعطلات نهاية الأسبوع.",
    pricing: { weekend: 85, weekday: 55, fullWeek: 320, holiday: 120 },
    bedrooms: 2,
    bathrooms: 2,
    capacity: 8,
    area: 120,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    lat: 28.638,
    lng: 48.382,
    pool: true,
    beachAccess: true,
    bbq: true,
    wifi: true,
    rating: 4.8,
    reviewCount: 124,
    unavailableDates: ["2026-03-20", "2026-03-21", "2026-03-22", "2026-03-27", "2026-03-28", "2026-04-03", "2026-04-04"],
    verified: true,
    tag: "Beachfront",
    tagAr: "على الشاطئ",
  },
  {
    id: "kh-2",
    title: "Palm Garden Retreat",
    titleAr: "استراحة حديقة النخيل",
    description: "A spacious retreat set among mature palm gardens. Large private pool, covered majlis area, and modern kitchen. Ideal for group gatherings and extended family stays.",
    descriptionAr: "استراحة واسعة وسط حدائق النخيل. مسبح خاص كبير ومجلس مغطى ومطبخ حديث. مثالية للتجمعات العائلية والإقامات الطويلة.",
    pricing: { weekend: 65, weekday: 40, fullWeek: 240, holiday: 95 },
    bedrooms: 3,
    bathrooms: 2,
    capacity: 12,
    area: 180,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    ],
    lat: 28.645,
    lng: 48.375,
    pool: true,
    beachAccess: false,
    bbq: true,
    wifi: true,
    rating: 4.6,
    reviewCount: 89,
    unavailableDates: ["2026-03-19", "2026-03-25", "2026-03-26", "2026-04-01", "2026-04-02"],
    verified: true,
    tag: "Pool Villa",
    tagAr: "فيلا مسبح",
  },
  {
    id: "kh-3",
    title: "Luxury Marina Chalet",
    titleAr: "شاليه المارينا الفاخر",
    description: "Premium waterfront chalet overlooking the Khiran marina. Features 4 bedrooms, a heated infinity pool, private dock access, and luxury interiors. The ultimate Khiran experience.",
    descriptionAr: "شاليه فاخر على الواجهة البحرية يطل على مارينا الخيران. يضم ٤ غرف نوم ومسبح إنفينتي مدفأ ورصيف خاص وتشطيبات فاخرة. تجربة الخيران المثالية.",
    pricing: { weekend: 120, weekday: 80, fullWeek: 480, holiday: 180 },
    bedrooms: 4,
    bathrooms: 3,
    capacity: 16,
    area: 250,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    lat: 28.651,
    lng: 48.378,
    pool: true,
    beachAccess: true,
    bbq: true,
    wifi: true,
    rating: 4.9,
    reviewCount: 203,
    unavailableDates: ["2026-03-20", "2026-03-21", "2026-03-22", "2026-03-23", "2026-03-28", "2026-03-29", "2026-04-04", "2026-04-05"],
    verified: true,
    tag: "Premium",
    tagAr: "مميز",
  },
  {
    id: "kh-4",
    title: "Cozy Studio Chalet",
    titleAr: "شاليه استوديو مريح",
    description: "A compact, well-appointed studio chalet steps from the beach. Comes with kitchenette, Wi-Fi, and beach access. Great value for couples or solo travelers.",
    descriptionAr: "شاليه استوديو مريح ومجهز على بعد خطوات من الشاطئ. يضم مطبخاً صغيراً وواي فاي ووصول للشاطئ. قيمة ممتازة للأزواج أو المسافرين الأفراد.",
    pricing: { weekend: 35, weekday: 22, fullWeek: 130, holiday: 55 },
    bedrooms: 1,
    bathrooms: 1,
    capacity: 4,
    area: 55,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    lat: 28.640,
    lng: 48.385,
    pool: false,
    beachAccess: true,
    bbq: false,
    wifi: true,
    rating: 4.3,
    reviewCount: 47,
    unavailableDates: ["2026-03-21", "2026-03-27"],
    verified: false,
  },
  {
    id: "kh-5",
    title: "Family Beach House",
    titleAr: "بيت الشاطئ العائلي",
    description: "A large family-friendly beach house with 3 bedrooms, expansive living areas, private pool, and direct beach access. Outdoor BBQ and kids play area included.",
    descriptionAr: "بيت شاطئي عائلي كبير مع ٣ غرف نوم ومناطق معيشة واسعة ومسبح خاص ووصول مباشر للشاطئ. يشمل منطقة شواء خارجية ومنطقة لعب للأطفال.",
    pricing: { weekend: 95, weekday: 60, fullWeek: 380, holiday: 140 },
    bedrooms: 3,
    bathrooms: 3,
    capacity: 14,
    area: 200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    lat: 28.635,
    lng: 48.380,
    pool: true,
    beachAccess: true,
    bbq: true,
    wifi: true,
    rating: 4.7,
    reviewCount: 156,
    unavailableDates: ["2026-03-19", "2026-03-20", "2026-03-21", "2026-03-26", "2026-03-27", "2026-04-02", "2026-04-03"],
    verified: true,
    tag: "Family Pick",
    tagAr: "اختيار العائلة",
  },
  {
    id: "kh-6",
    title: "Gulf View Suite",
    titleAr: "جناح إطلالة الخليج",
    description: "A stylish 2-bedroom suite with unobstructed Gulf views. Modern decor, beach access, and a cozy BBQ corner. Ideal for small groups seeking a relaxed escape.",
    descriptionAr: "جناح أنيق بغرفتي نوم مع إطلالة خليجية بدون عوائق. ديكور حديث ووصول للشاطئ وركن شواء مريح. مثالي للمجموعات الصغيرة الباحثة عن استرخاء.",
    pricing: { weekend: 75, weekday: 50, fullWeek: 290, holiday: 110 },
    bedrooms: 2,
    bathrooms: 1,
    capacity: 6,
    area: 95,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    ],
    lat: 28.648,
    lng: 48.370,
    pool: false,
    beachAccess: true,
    bbq: true,
    wifi: true,
    rating: 4.5,
    reviewCount: 72,
    unavailableDates: ["2026-03-22", "2026-03-28", "2026-03-29", "2026-04-04"],
    verified: true,
  },
]

/** Look up a single chalet by ID */
export function getChaletById(id: string): MockChalet | undefined {
  return KHIRAN_CHALETS.find((c) => c.id === id)
}

/** Package display info */
export const PACKAGES: { key: PackageKey; en: string; ar: string; suffix: string; suffixAr: string }[] = [
  { key: "weekend",  en: "Weekend",    ar: "نهاية الأسبوع", suffix: "/ night", suffixAr: "/ ليلة" },
  { key: "weekday",  en: "Weekday",    ar: "أيام الأسبوع",  suffix: "/ night", suffixAr: "/ ليلة" },
  { key: "fullWeek", en: "Full Week",  ar: "أسبوع كامل",    suffix: "/ week",  suffixAr: "/ أسبوع" },
  { key: "holiday",  en: "Holiday",    ar: "العطلة الحالية", suffix: "/ night", suffixAr: "/ ليلة" },
]
