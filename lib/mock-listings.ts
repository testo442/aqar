/**
 * Shared mock property data for all V2 pages.
 * Single source of truth — Home, Listings, Map, and Property Detail all import from here.
 */

export interface MockProperty {
  id: string
  title: string
  titleAr: string
  price: number
  pricePeriod: "mo" | "total"
  type: "rent" | "buy"
  propertyType: "villa" | "apartment" | "chalet" | "floor" | "land" | "commercial"
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  images: string[]
  location: string
  locationAr: string
  governorate: string
  governorateAr: string
  lat: number
  lng: number
  feature?: string
  featureAr?: string
  description: string
  descriptionAr: string
  listedDaysAgo: number
  isFeatured?: boolean
  verified?: boolean
  rating?: number
  stars?: number
}

export const MOCK_LISTINGS: MockProperty[] = [
  {
    id: "1",
    title: "Sea-view Villa",
    titleAr: "فيلا مطلة على البحر",
    price: 1200,
    pricePeriod: "mo",
    type: "rent",
    propertyType: "villa",
    bedrooms: 4,
    bathrooms: 3,
    area: 520,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    ],
    location: "Khiran",
    locationAr: "الخيران",
    governorate: "Al Ahmadi",
    governorateAr: "الأحمدي",
    lat: 28.651,
    lng: 48.378,
    feature: "Sea View",
    featureAr: "إطلالة بحرية",
    description: "A beautifully designed sea-view villa located in the heart of Khiran. The property features an open-plan living area with floor-to-ceiling windows, a private garden, and direct access to the beach promenade.",
    descriptionAr: "فيلا مصممة بأناقة تطل على البحر في قلب الخيران. يتميز العقار بمساحة معيشة مفتوحة مع نوافذ ممتدة من الأرض حتى السقف، وحديقة خاصة، ووصول مباشر إلى ممشى الشاطئ.",
    listedDaysAgo: 3,
    isFeatured: true,
    rating: 4.9,
    stars: 4,
  },
  {
    id: "2",
    title: "Modern Apartment",
    titleAr: "شقة حديثة",
    price: 650,
    pricePeriod: "mo",
    type: "rent",
    propertyType: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    location: "Salmiya",
    locationAr: "السالمية",
    governorate: "Hawally",
    governorateAr: "حولي",
    lat: 29.334,
    lng: 48.083,
    feature: "Modern Design",
    featureAr: "تصميم عصري",
    description: "A sleek and modern apartment in the vibrant Salmiya district. Close to shopping centers, restaurants, and the Arabian Gulf Road. Perfect for young professionals.",
    descriptionAr: "شقة أنيقة وحديثة في حي السالمية النابض بالحياة. قريبة من مراكز التسوق والمطاعم وشارع الخليج العربي. مثالية للمهنيين الشباب.",
    listedDaysAgo: 5,
    stars: 1,
  },
  {
    id: "3",
    title: "Beachfront Chalet",
    titleAr: "شاليه على الشاطئ",
    price: 180,
    pricePeriod: "mo",
    type: "rent",
    propertyType: "chalet",
    bedrooms: 1,
    bathrooms: 1,
    area: 50,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    ],
    location: "Khiran",
    locationAr: "الخيران",
    governorate: "Al Ahmadi",
    governorateAr: "الأحمدي",
    lat: 28.638,
    lng: 48.382,
    feature: "Beachfront",
    featureAr: "على الشاطئ",
    description: "A cozy beachfront chalet perfect for weekend getaways. Direct beach access with stunning sunset views over the Arabian Gulf.",
    descriptionAr: "شاليه مريح على الشاطئ مثالي لعطلات نهاية الأسبوع. وصول مباشر للشاطئ مع إطلالات غروب خلابة على الخليج العربي.",
    listedDaysAgo: 1,
    verified: true,
  },
  {
    id: "4",
    title: "Luxury Floor",
    titleAr: "دور فاخر",
    price: 2800,
    pricePeriod: "mo",
    type: "rent",
    propertyType: "floor",
    bedrooms: 5,
    bathrooms: 4,
    area: 600,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    location: "Jabriya",
    locationAr: "الجابرية",
    governorate: "Hawally",
    governorateAr: "حولي",
    lat: 29.325,
    lng: 48.030,
    feature: "Full Floor",
    featureAr: "دور كامل",
    description: "An expansive luxury full floor in Jabriya with premium marble finishes, a grand reception hall, and panoramic city views. Ideal for large families.",
    descriptionAr: "دور فاخر واسع في الجابرية بتشطيبات رخامية فاخرة وصالة استقبال كبيرة وإطلالات بانورامية على المدينة. مثالي للعائلات الكبيرة.",
    listedDaysAgo: 7,
    isFeatured: true,
  },
  {
    id: "5",
    title: "Cozy Studio",
    titleAr: "ستوديو مريح",
    price: 320,
    pricePeriod: "mo",
    type: "rent",
    propertyType: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    ],
    location: "Hawally",
    locationAr: "حولي",
    governorate: "Hawally",
    governorateAr: "حولي",
    lat: 29.340,
    lng: 48.028,
    description: "A well-maintained studio apartment in the heart of Hawally. Walking distance to public transport, shops, and cafés.",
    descriptionAr: "شقة استوديو بحالة ممتازة في قلب حولي. على مسافة قريبة من وسائل النقل العام والمحلات والمقاهي.",
    listedDaysAgo: 2,
  },
  {
    id: "6",
    title: "Garden Villa",
    titleAr: "فيلا مع حديقة",
    price: 1500,
    pricePeriod: "total",
    type: "buy",
    propertyType: "villa",
    bedrooms: 4,
    bathrooms: 3,
    area: 450,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    location: "Mishref",
    locationAr: "مشرف",
    governorate: "Hawally",
    governorateAr: "حولي",
    lat: 29.295,
    lng: 48.060,
    feature: "Private Garden",
    featureAr: "حديقة خاصة",
    description: "A spacious villa with a lush private garden in the prestigious Mishref area. Features a swimming pool, BBQ area, and modern kitchen.",
    descriptionAr: "فيلا واسعة مع حديقة خاصة خضراء في منطقة مشرف الراقية. تتميز بمسبح ومنطقة شواء ومطبخ حديث.",
    listedDaysAgo: 10,
  },
]

/** Look up a single property by ID */
export function getPropertyById(id: string): MockProperty | undefined {
  return MOCK_LISTINGS.find((p) => p.id === id)
}
