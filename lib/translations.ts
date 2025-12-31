/**
 * Translation dictionary for core user flows
 * Uses the existing I18nText pattern
 */
import type { I18nText } from "./i18n"

export const translations: Record<string, I18nText> = {
  // Common
  search: {
    en: "Search",
    ar: "بحث",
  },
  buy: {
    en: "Buy",
    ar: "شراء",
  },
  rent: {
    en: "Rent",
    ar: "إيجار",
  },
  sell: {
    en: "Sell",
    ar: "بيع",
  },
  listProperty: {
    en: "List Property",
    ar: "اعرض عقارك",
  },
  viewAll: {
    en: "View all properties",
    ar: "عرض جميع العقارات",
  },
  back: {
    en: "Back",
    ar: "رجوع",
  },
  home: {
    en: "Home",
    ar: "الرئيسية",
  },
  language: {
    en: "Language",
    ar: "اللغة",
  },
  view: {
    en: "View",
    ar: "عرض",
  },
  submit: {
    en: "Submit",
    ar: "إرسال",
  },
  loading: {
    en: "Loading...",
    ar: "جاري التحميل...",
  },

  // Homepage
  homeTitle: {
    en: "Real Estate in Kuwait",
    ar: "العقارات في الكويت",
  },
  homeSubtitle: {
    en: "Find your perfect home. Buy or rent properties across Kuwait with confidence.",
    ar: "ابحث عن منزلك المثالي. اشترِ أو استأجر عقارات في جميع أنحاء الكويت بثقة.",
  },
  searchPlaceholder: {
    en: "Search properties, locations...",
    ar: "ابحث عن عقارات، مواقع...",
  },
  locationPlaceholder: {
    en: "Enter city, area, or neighborhood",
    ar: "أدخل المدينة أو المنطقة أو الحي",
  },
  maxPrice: {
    en: "Max Price",
    ar: "الحد الأقصى للسعر",
  },
  maxRent: {
    en: "Max Rent",
    ar: "الحد الأقصى للإيجار",
  },
  anyPrice: {
    en: "Any price",
    ar: "أي سعر",
  },
  propertyType: {
    en: "Type",
    ar: "النوع",
  },
  any: {
    en: "Any",
    ar: "أي",
  },
  listYourProperty: {
    en: "List Your Property",
    ar: "اعرض عقارك",
  },
  fastSearch: {
    en: "Fast Search",
    ar: "بحث سريع",
  },
  trusted: {
    en: "Trusted",
    ar: "موثوق",
  },
  mapFirst: {
    en: "Map-First",
    ar: "خريطة أولاً",
  },
  featuredProperties: {
    en: "Featured Properties",
    ar: "عقارات مميزة",
  },
  whyAqarna: {
    en: "Why Aqarna?",
    ar: "لماذا عقارنا؟",
  },

  // Properties Page
  properties: {
    en: "Properties",
    ar: "العقارات",
  },
  map: {
    en: "Map",
    ar: "الخريطة",
  },
  list: {
    en: "List",
    ar: "القائمة",
  },
  propertiesFound: {
    en: "properties found",
    ar: "عقار موجود",
  },
  propertyFound: {
    en: "property found",
    ar: "عقار موجود",
  },
  searchByLocation: {
    en: "Search by location or property name...",
    ar: "ابحث حسب الموقع أو اسم العقار...",
  },
  filters: {
    en: "Filters",
    ar: "المرشحات",
  },
  governorate: {
    en: "Governorate",
    ar: "المحافظة",
  },
  areas: {
    en: "Areas",
    ar: "المناطق",
  },
  clear: {
    en: "Clear",
    ar: "مسح",
  },
  apply: {
    en: "Apply",
    ar: "تطبيق",
  },
  noPropertiesFound: {
    en: "No properties found",
    ar: "لا توجد عقارات",
  },
  noPropertiesFoundSubtitle: {
    en: "Try adjusting your filters or search.",
    ar: "جرّب تعديل الفلاتر أو البحث.",
  },
  clearFilters: {
    en: "Clear filters",
    ar: "مسح الفلاتر",
  },
  showAllProperties: {
    en: "Show all properties",
    ar: "عرض جميع العقارات",
  },
  noResultsFor: {
    en: "No results for",
    ar: "لا توجد نتائج لـ",
  },
  inBuy: {
    en: "in Buy",
    ar: "في الشراء",
  },
  inRent: {
    en: "in Rent",
    ar: "في الإيجار",
  },
  clearSearch: {
    en: "Clear search",
    ar: "مسح البحث",
  },
  switchToBuy: {
    en: "Switch to Buy",
    ar: "التبديل إلى الشراء",
  },

  // Property Details
  bedrooms: {
    en: "Beds",
    ar: "غرف نوم",
  },
  bathrooms: {
    en: "Baths",
    ar: "حمامات",
  },
  area: {
    en: "m²",
    ar: "م²",
  },
  overview: {
    en: "Overview",
    ar: "نظرة عامة",
  },
  callAgent: {
    en: "Call Agent",
    ar: "اتصل بالوكيل",
  },
  whatsapp: {
    en: "WhatsApp",
    ar: "واتساب",
  },
  propertyNotFound: {
    en: "Property not found",
    ar: "العقار غير موجود",
  },
  propertyNotFoundDesc: {
    en: "It may have been removed or the link is incorrect.",
    ar: "قد يكون تم حذف العقار أو الرابط غير صحيح.",
  },
  backToProperties: {
    en: "Back to Properties",
    ar: "العودة إلى العقارات",
  },

  // Sell Page
  listYourPropertyTitle: {
    en: "List Your Property",
    ar: "اعرض عقارك",
  },
  listYourPropertySubtitle: {
    en: "Submit details and our team will contact you to list it on Aqarna.",
    ar: "أرسل التفاصيل وسيتواصل فريقنا معك لعرضه على عقارنا.",
  },
  fullName: {
    en: "Full Name",
    ar: "الاسم الكامل",
  },
  phone: {
    en: "Phone",
    ar: "الهاتف",
  },
  email: {
    en: "Email",
    ar: "البريد الإلكتروني",
  },
  purpose: {
    en: "Purpose",
    ar: "الغرض",
  },
  purposeSell: {
    en: "Sell",
    ar: "بيع",
  },
  purposeRent: {
    en: "Rent",
    ar: "إيجار",
  },
  propertyTypeLabel: {
    en: "Property Type",
    ar: "نوع العقار",
  },
  apartment: {
    en: "Apartment",
    ar: "شقة",
  },
  villa: {
    en: "Villa",
    ar: "فيلا",
  },
  land: {
    en: "Land",
    ar: "أرض",
  },
  tower: {
    en: "Tower",
    ar: "برج",
  },
  villaFloor: {
    en: "Villa Floor",
    ar: "دور فيلا",
  },
  commercial: {
    en: "Commercial",
    ar: "تجاري",
  },
  selectGovernorate: {
    en: "Select governorate",
    ar: "اختر المحافظة",
  },
  areaLabel: {
    en: "Area",
    ar: "المنطقة",
  },
  areaPlaceholder: {
    en: "e.g., Salmiya, Dasma",
    ar: "مثال: السالمية، الدسمة",
  },
  bedroomsLabel: {
    en: "Bedrooms",
    ar: "غرف النوم",
  },
  bathroomsLabel: {
    en: "Bathrooms",
    ar: "الحمامات",
  },
  price: {
    en: "Price",
    ar: "السعر",
  },
  currency: {
    en: "KWD",
    ar: "د.ك",
  },
  notes: {
    en: "Notes",
    ar: "ملاحظات",
  },
  imageLinks: {
    en: "Image Links",
    ar: "روابط الصور",
  },
  locationOnMap: {
    en: "Location on map",
    ar: "الموقع على الخريطة",
  },
  locationHint: {
    en: "Click on the map to select your property location",
    ar: "انقر على الخريطة لتحديد موقع عقارك",
  },
  useMyLocation: {
    en: "Use my location",
    ar: "استخدم موقعي",
  },
  locationSelected: {
    en: "Selected",
    ar: "محدد",
  },
  noLocationSelected: {
    en: "No location selected",
    ar: "لم يتم تحديد موقع",
  },
  locationRequired: {
    en: "Please select a location on the map.",
    ar: "يرجى تحديد موقع على الخريطة.",
  },
  required: {
    en: "Required",
    ar: "مطلوب",
  },
  optional: {
    en: "optional",
    ar: "اختياري",
  },
  submitting: {
    en: "Submitting...",
    ar: "جاري الإرسال...",
  },
  successTitle: {
    en: "Thank You!",
    ar: "شكراً لك!",
  },
  successMessage: {
    en: "We've received your property details. Our team will contact you shortly.",
    ar: "لقد استلمنا تفاصيل عقارك. سيتواصل فريقنا معك قريباً.",
  },
  errorMessage: {
    en: "Something went wrong. Please try again.",
    ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  },
  networkError: {
    en: "Network error. Please check your connection and try again.",
    ar: "خطأ في الشبكة. يرجى التحقق من اتصالك والمحاولة مرة أخرى.",
  },
  trustResponseTime: {
    en: "We respond within 24 hours.",
    ar: "نرد خلال 24 ساعة.",
  },
  trustPrivacy: {
    en: "Your details are private and only used to contact you about this listing.",
    ar: "بياناتك خاصة وتُستخدم فقط للتواصل معك بخصوص هذا العرض.",
  },
  selectType: {
    en: "Select type",
    ar: "اختر النوع",
  },
  oneUrlPerLine: {
    en: "One URL per line",
    ar: "رابط واحد في كل سطر",
  },
  month: {
    en: "/month",
    ar: "/شهر",
  },
  forSale: {
    en: "For Sale",
    ar: "للبيع",
  },
  forRent: {
    en: "For Rent",
    ar: "للإيجار",
  },
  overviewPlaceholder: {
    en: "This property offers a comfortable living space in a desirable location. Contact us for more details and to schedule a viewing.",
    ar: "يقدم هذا العقار مساحة معيشة مريحة في موقع مرغوب فيه. اتصل بنا لمزيد من التفاصيل وترتيب معاينة.",
  },
  notesPlaceholder: {
    en: "Additional details about your property...",
    ar: "تفاصيل إضافية حول عقارك...",
  },
  geolocationNotSupported: {
    en: "Geolocation is not supported by your browser.",
    ar: "الموقع الجغرافي غير مدعوم في متصفحك.",
  },
  locationPermissionDenied: {
    en: "Location permission denied. Please enable location access in your browser settings.",
    ar: "تم رفض إذن الموقع. يرجى تفعيل الوصول إلى الموقع في إعدادات المتصفح.",
  },
  locationTimeout: {
    en: "Location request timed out. Please try again.",
    ar: "انتهت مهلة طلب الموقع. يرجى المحاولة مرة أخرى.",
  },
  locationUnavailable: {
    en: "Couldn't get your location. Try again or select a location on the map.",
    ar: "تعذر الحصول على موقعك. حاول مرة أخرى أو حدد موقعاً على الخريطة.",
  },
  locating: {
    en: "Locating...",
    ar: "جاري تحديد الموقع...",
  },
  tryAgain: {
    en: "Try again",
    ar: "حاول مرة أخرى",
  },
  accuracy: {
    en: "Accuracy",
    ar: "الدقة",
  },
  accuracyWarning: {
    en: "Location seems approximate. Adjust the pin if needed.",
    ar: "الموقع تقريبي. عدّل الدبوس إذا لزم.",
  },
  locationNotAvailable: {
    en: "Location not available",
    ar: "الموقع غير متوفر",
  },
}

/**
 * Get translation by key
 */
export function t(key: keyof typeof translations, lang: "en" | "ar"): string {
  return translations[key]?.[lang] ?? key
}

