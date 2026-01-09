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
  viewDetails: {
    en: "View details",
    ar: "عرض التفاصيل",
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
    ar: "الكل",
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
    en: "Floor",
    ar: "دور",
  },
  chalet: {
    en: "Chalet",
    ar: "شاليه",
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
    ar: "تم الاستلام",
  },
  successMessage: {
    en: "We've received your property details. Our team will contact you shortly.",
    ar: "تم استلام تفاصيل عقارك، وسيتم التواصل معك قريبًا.",
  },
  errorMessage: {
    en: "Something went wrong. Please try again.",
    ar: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
  },
  emailFailed: {
    en: "We couldn't send your submission. Please try again later or contact us directly.",
    ar: "لم نتمكن من إرسال طلبك. يرجى المحاولة مرة أخرى لاحقاً أو الاتصال بنا مباشرة.",
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
  // About page translations
  aboutTitle: {
    en: "Why Choose Aqarna?",
    ar: "لماذا تختار عقارنا؟",
  },
  aboutSubtitle: {
    en: "Your trusted partner for real estate in Kuwait. We make finding your dream home simple and secure.",
    ar: "شريكك الموثوق في العقارات في الكويت. نجعل العثور على منزل أحلامك بسيطاً وآمناً.",
  },
  aboutStatsProperties: {
    en: "Properties",
    ar: "عقار",
  },
  aboutStatsCustomers: {
    en: "Happy Customers",
    ar: "عميل سعيد",
  },
  aboutStatsAgents: {
    en: "Expert Agents",
    ar: "وكيل خبير",
  },
  aboutStatsSupport: {
    en: "Support",
    ar: "دعم",
  },
  aboutFeature1Title: {
    en: "Advanced Search",
    ar: "بحث متقدم",
  },
  aboutFeature1Desc: {
    en: "Powerful filters and detailed listings help you find exactly what you're looking for.",
    ar: "فلاتر قوية وقوائم مفصلة تساعدك في العثور على ما تبحث عنه بالضبط.",
  },
  aboutFeature2Title: {
    en: "Market Insights",
    ar: "رؤى السوق",
  },
  aboutFeature2Desc: {
    en: "Real-time data and pricing trends to help you make informed decisions.",
    ar: "بيانات في الوقت الفعلي واتجاهات الأسعار لمساعدتك في اتخاذ قرارات مدروسة.",
  },
  aboutFeature3Title: {
    en: "Trusted & Secure",
    ar: "موثوق وآمن",
  },
  aboutFeature3Desc: {
    en: "Verified listings and secure transactions. Your peace of mind is our priority.",
    ar: "قوائم موثقة ومعاملات آمنة. راحة بالك هي أولويتنا.",
  },
  aboutHowItWorks: {
    en: "How It Works",
    ar: "كيف يعمل",
  },
  aboutStep1Title: {
    en: "Search Properties",
    ar: "ابحث عن العقارات",
  },
  aboutStep1Desc: {
    en: "Use our powerful search filters to find properties that match your criteria. Filter by location, price, type, and more.",
    ar: "استخدم فلاتر البحث القوية للعثور على العقارات التي تطابق معاييرك. فلترة حسب الموقع والسعر والنوع والمزيد.",
  },
  aboutStep2Title: {
    en: "Explore on Map",
    ar: "استكشف على الخريطة",
  },
  aboutStep2Desc: {
    en: "View properties on an interactive map to see locations, neighborhoods, and nearby amenities.",
    ar: "اعرض العقارات على خريطة تفاعلية لرؤية المواقع والأحياء والمرافق القريبة.",
  },
  aboutStep3Title: {
    en: "Contact & View",
    ar: "تواصل وعرض",
  },
  aboutStep3Desc: {
    en: "Get in touch with property owners or agents directly. Schedule viewings and ask questions.",
    ar: "تواصل مع ملاك العقارات أو الوكلاء مباشرة. حدد مواعيد المشاهدة واطرح الأسئلة.",
  },
  aboutTrustTitle: {
    en: "Why Trust Aqarna?",
    ar: "لماذا تثق بعقارنا؟",
  },
  aboutTrust1Title: {
    en: "Verified Listings",
    ar: "قوائم موثقة",
  },
  aboutTrust1Desc: {
    en: "All properties are verified for accuracy and authenticity.",
    ar: "جميع العقارات موثقة للدقة والأصالة.",
  },
  aboutTrust2Title: {
    en: "Secure Platform",
    ar: "منصة آمنة",
  },
  aboutTrust2Desc: {
    en: "Your data and transactions are protected with industry-standard security.",
    ar: "بياناتك ومعاملاتك محمية بأمان معياري على مستوى الصناعة.",
  },
  aboutTrust3Title: {
    en: "Expert Support",
    ar: "دعم خبير",
  },
  aboutTrust3Desc: {
    en: "Our team is available 24/7 to help you find your perfect property.",
    ar: "فريقنا متاح على مدار الساعة لمساعدتك في العثور على عقارك المثالي.",
  },
  aboutTrust4Title: {
    en: "Transparent Pricing",
    ar: "أسعار شفافة",
  },
  aboutTrust4Desc: {
    en: "No hidden fees. Clear pricing information for every property.",
    ar: "لا توجد رسوم مخفية. معلومات أسعار واضحة لكل عقار.",
  },
  aboutCTATitle: {
    en: "Ready to Find Your Home?",
    ar: "هل أنت مستعد للعثور على منزلك؟",
  },
  aboutCTASubtitle: {
    en: "Join thousands of satisfied customers who found their perfect property with Aqarna.",
    ar: "انضم إلى آلاف العملاء الراضين الذين وجدوا عقارهم المثالي مع عقارنا.",
  },
  browseProperties: {
    en: "Browse Properties",
    ar: "تصفح العقارات",
  },
  // Footer
  privacyLink: {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
  },
  termsLink: {
    en: "Terms",
    ar: "الشروط والأحكام",
  },
  contactLink: {
    en: "Contact",
    ar: "تواصل معنا",
  },
  copyright: {
    en: "© {year} Aqarna",
    ar: "© {year} أقرنة",
  },
  // Privacy page
  privacyTitle: {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
  },
  privacyContent1: {
    en: "We respect your privacy. Information you submit is used only to respond to your inquiry or listing request.",
    ar: "نحترم خصوصيتك. تُستخدم المعلومات التي ترسلها فقط للرد على طلبك أو طلب عرض العقار.",
  },
  privacyContent2: {
    en: "We do not sell your personal data.",
    ar: "لا نقوم ببيع بياناتك الشخصية.",
  },
  // Terms page
  termsTitle: {
    en: "Terms",
    ar: "الشروط والأحكام",
  },
  termsContent1: {
    en: "Aqarna provides property information for browsing. Listings may change and should be verified.",
    ar: "توفّر أقرنة معلومات عقارية للتصفح. قد تتغير البيانات ويجب التحقق منها.",
  },
  termsContent2: {
    en: "By using the site, you agree not to misuse the service.",
    ar: "باستخدامك للموقع، أنت توافق على عدم إساءة استخدام الخدمة.",
  },
  // Contact page
  contactTitle: {
    en: "Contact",
    ar: "تواصل معنا",
  },
  contactContent: {
    en: "For support or inquiries, contact us:",
    ar: "للدعم أو الاستفسارات، تواصل معنا:",
  },
  contactEmail: {
    en: "Email: support@aqarna.com",
    ar: "البريد الإلكتروني: support@aqarna.com",
  },
  // Property details accountability links
  reportListing: {
    en: "Report this listing",
    ar: "الإبلاغ عن هذا العقار",
  },
  suggestEdit: {
    en: "Suggest an edit",
    ar: "اقتراح تعديل",
  },
  mailtoReportSubject: {
    en: "Aqarna: Report listing",
    ar: "أقرنة: الإبلاغ عن عقار",
  },
  mailtoSuggestSubject: {
    en: "Aqarna: Suggest edit",
    ar: "أقرنة: اقتراح تعديل",
  },
  mailtoBodyIntro: {
    en: "Please provide details below:",
    ar: "يرجى تقديم التفاصيل أدناه:",
  },
  property: {
    en: "Property",
    ar: "العقار",
  },
  propertyId: {
    en: "Property ID",
    ar: "معرف العقار",
  },
  url: {
    en: "URL",
    ar: "الرابط",
  },
}

/**
 * Get translation by key
 */
export function t(key: keyof typeof translations, lang: "en" | "ar"): string {
  return translations[key]?.[lang] ?? key
}

