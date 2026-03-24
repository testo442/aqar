/**
 * V2 Design System — Single source of truth for /ui-v2 styling.
 *
 * Surfaces: bg-card (#FAF8F3), bg-background (#F6F5F2), bg-muted (#F1F0EC)
 * Borders:  border-border (#E6E4DD)
 * Primary:  primary-600 (#2E56D4)
 * Radii:    cards/controls rounded-2xl, pills rounded-full, inner rounded-xl
 * Shadows:  controls shadow-sm, cards/map shadow-soft
 */

// ─── Page layout ─────────────────────────────────────────────────────────────
export const page = {
  root: "min-h-screen bg-background pb-24 md:pb-10",
  container: "w-full max-w-[480px] md:max-w-3xl lg:max-w-5xl mx-auto px-5 md:px-6 pt-3",
  heroGrid: "md:grid md:grid-cols-[1fr_minmax(0,380px)] lg:grid-cols-[1fr_minmax(0,440px)] md:gap-5 md:items-start",
  controlsCol: "flex flex-col gap-2.5 mb-3 md:mb-0",
} as const

// ─── App Header ──────────────────────────────────────────────────────────────
export const header = {
  root: "sticky top-0 z-40 w-full bg-card border-b border-border",
  inner: "max-w-[480px] md:max-w-3xl lg:max-w-5xl mx-auto px-5 h-14",
  row: "h-full flex items-center justify-between",
  logo: "flex items-center gap-2",
  logoIcon: "h-6 w-6 text-primary-600",
  logoText: "text-[19px] font-bold text-slate-900 tracking-tight leading-none",
  logoSub: "text-[10px] font-medium text-slate-400 tracking-wide uppercase leading-none mt-0.5",
  langToggle: "flex items-center rounded-full border border-border shadow-sm overflow-hidden",
  langActive: "px-3 py-1.5 text-[11px] font-semibold bg-primary-600 text-white",
  langInactive: "px-3 py-1.5 text-[11px] font-semibold bg-card text-slate-500 hover:text-slate-700 transition-colors",
} as const

// ─── Search Bar ──────────────────────────────────────────────────────────────
export const searchBar = {
  root: "flex items-center bg-card rounded-2xl border border-border shadow-sm overflow-hidden h-12",
  iconWrapLTR: "flex-shrink-0 flex items-center h-full pl-4 pr-2",
  iconWrapRTL: "flex-shrink-0 flex items-center h-full pr-4 pl-2",
  icon: "h-4 w-4 text-slate-400",
  input: "flex-1 h-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none min-w-0",
  filterWrapLTR: "flex-shrink-0 pr-1.5",
  filterWrapRTL: "flex-shrink-0 pl-1.5",
  filterBtn: "flex items-center gap-1.5 h-9 px-3.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-xl transition-colors",
  filterIcon: "h-3.5 w-3.5",
  // Autocomplete dropdown
  dropdownWrap: "absolute left-0 right-0 top-full mt-1 z-50",
  dropdown: "bg-card rounded-2xl border border-border shadow-lg max-h-[200px] overflow-y-auto",
  dropdownItem: "flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-muted transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl",
  dropdownItemIcon: "h-3.5 w-3.5 text-slate-400 flex-shrink-0",
  dropdownItemText: "truncate",
  dropdownItemSub: "text-[11px] text-slate-400 ml-auto flex-shrink-0",
} as const

// ─── Segmented Control ───────────────────────────────────────────────────────
export const segmented = {
  bar: "flex items-center w-full bg-muted rounded-2xl p-1 border border-border",
  item: "flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 whitespace-nowrap rtl:text-[14px]",
  active: "bg-card text-primary-600 font-semibold shadow-sm",
  inactive: "text-slate-500 hover:text-slate-700",
  chevron: "h-3 w-3",
} as const

// ─── Map Preview Card ────────────────────────────────────────────────────────
export const mapCard = {
  root: "relative rounded-2xl overflow-hidden border border-border shadow-soft",
  // "Tap pins to preview" label (pointer-events-none so map clicks pass through)
  tapLabel: "absolute top-2.5 left-3 rtl:left-auto rtl:right-3 z-20 pointer-events-none flex items-center gap-1.5 bg-card/95 backdrop-blur-sm text-slate-700 text-[11px] rtl:text-[12px] font-medium px-2.5 py-1.5 rounded-full shadow-sm border border-border",
  tapIcon: "h-3 w-3 text-primary-600",
  // Floating property preview card — stable bottom-left position
  previewCard: "absolute z-20 bottom-12 left-2.5 rtl:left-auto rtl:right-2.5 w-[170px] bg-card rounded-xl shadow-soft-lg border border-border overflow-hidden pointer-events-auto",
  previewImage: "relative w-full",
  previewImageAspect: { aspectRatio: "16/10" } as React.CSSProperties,
  previewPriceBadge: "absolute bottom-1.5 right-1.5 bg-card/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm border border-border",
  previewBody: "px-2.5 py-2 space-y-0.5",
  previewPrice: "text-[13px] font-bold text-slate-900",
  previewSuffix: "text-[10px] font-normal text-slate-400",
  previewSub: "text-[10px] text-slate-500 line-clamp-1 rtl:text-[11px]",
  previewChip: "inline-block bg-primary-600 text-white text-[10px] rtl:text-[11px] font-semibold px-2.5 rtl:px-3 py-0.5 rounded-full",
  // Open Map CTA
  ctaWrap: "absolute bottom-2.5 right-2.5 z-20 pointer-events-auto",
  cta: "inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs rtl:text-[13px] font-semibold px-3.5 py-2 rounded-full shadow-sm transition-colors",
  ctaIcon: "h-3.5 w-3.5",
  insetRing: "absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/[0.04] pointer-events-none z-30",
  // Leaflet-specific
  mapLoading: "absolute inset-0 bg-muted animate-pulse rounded-2xl pointer-events-none",
  focusHint: "absolute inset-x-0 bottom-10 z-20 flex justify-center pointer-events-none opacity-0 transition-opacity duration-300",
  focusHintVisible: "opacity-100",
  focusHintPill: "bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium px-3 py-1.5 rounded-full",
} as const

// ─── Section headers ─────────────────────────────────────────────────────────
export const section = {
  wrapper: "mt-5",
  headerRow: "flex items-baseline justify-between mb-3",
  title: "text-base font-bold text-slate-900 rtl:text-[17px] rtl:leading-relaxed",
  viewAll: "text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors rtl:text-[13px]",
} as const

// ─── Carousel ────────────────────────────────────────────────────────────────
export const carousel = {
  outerWrap: "-mx-4",
  rail: "flex gap-3 pl-4 overflow-x-auto scrollbar-hide pb-1 snap-x snap-mandatory scroll-smooth",
  endSpacer: "w-12 flex-shrink-0",
} as const

// ─── Mini Listing Card (Popular) ─────────────────────────────────────────────
export const listingCard = {
  root: "w-[146px] flex-shrink-0 snap-start bg-card rounded-2xl overflow-hidden border border-border shadow-soft flex flex-col",
  imageWrap: "relative w-full",
  imageAspect: { aspectRatio: "4/3" } as React.CSSProperties,
  image: "object-cover",
  body: "px-3 pt-2 pb-3 space-y-1 flex flex-col flex-1",
  title: "text-[13px] font-bold text-slate-900 line-clamp-1 leading-snug rtl:text-[14px] rtl:leading-normal",
  priceRow: "flex items-baseline gap-1",
  price: "text-[13px] font-bold text-slate-900 leading-snug",
  priceSuffix: "text-[11px] font-normal text-slate-400",
  ratingRow: "flex items-center gap-1",
  star: "text-amber-400 text-[11px] leading-none",
  ratingText: "text-[11px] font-medium text-slate-500 rtl:text-[12px]",
  verifiedIcon: "text-emerald-500 text-[11px] leading-none",
  metaRow: "text-[11px] text-slate-500 leading-snug rtl:text-[12px]",
  chipWrap: "pt-1 mt-auto",
  chip: "inline-flex items-center gap-0.5 bg-muted text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full border border-border rtl:text-[11px] rtl:px-2.5",
  chipIcon: "h-2.5 w-2.5 flex-shrink-0",
} as const

// ─── Trust bar ───────────────────────────────────────────────────────────────
export const trustBar = {
  wrapper: "flex items-center justify-center gap-2 py-4",
  item: "flex items-center gap-1",
  icon: "text-emerald-500 text-[11px]",
  text: "text-[11px] text-slate-400 rtl:text-[12px]",
  dot: "text-slate-300",
  accent: "text-[11px] font-semibold text-slate-600 rtl:text-[12px]",
} as const

// ─── Bottom Nav ──────────────────────────────────────────────────────────────
export const bottomNav = {
  root: "fixed bottom-0 left-0 right-0 z-40 md:hidden bg-card/90 backdrop-blur-sm border-t border-border pb-safe",
  grid: "grid grid-cols-5 h-14",
  item: "relative flex flex-col items-center justify-center gap-0.5 transition-colors",
  iconActive: "h-[18px] w-[18px] text-primary-600",
  iconInactive: "h-[18px] w-[18px] text-slate-400",
  labelActive: "text-[10px] font-bold text-primary-600",
  labelInactive: "text-[10px] font-semibold text-slate-400",
  dot: "absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-600",
} as const

// ─── Listings Page ──────────────────────────────────────────────────────────
export const listingsPage = {
  // Results summary
  summaryRow: "flex items-center justify-between mb-1",
  summaryText: "text-sm font-semibold text-slate-900 rtl:text-[15px]",
  summaryCount: "text-sm text-slate-400 rtl:text-[14px]",
  // Filter chips
  chipsScroll: "flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-5 px-5",
  chip: "flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-slate-700 shadow-sm whitespace-nowrap rtl:text-[13px]",
  chipActive: "flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-600 border border-primary-600 text-xs font-medium text-white shadow-sm whitespace-nowrap rtl:text-[13px]",
  chipClose: "h-3 w-3 flex-shrink-0",
  chipMore: "flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-muted border border-border text-xs font-semibold text-primary-600 shadow-sm whitespace-nowrap rtl:text-[13px]",
  // Sort row
  sortRow: "flex items-center justify-between py-2.5",
  sortLeft: "flex items-center gap-1.5",
  sortLabel: "text-xs text-slate-400 rtl:text-[13px]",
  sortSelect: "text-xs font-semibold text-slate-700 bg-transparent outline-none cursor-pointer rtl:text-[13px]",
  saveBtn: "flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors rtl:text-[13px]",
  saveIcon: "h-3.5 w-3.5",
  // Listing grid
  gridWrap: "-mx-4",
  grid: "grid grid-cols-2 gap-2.5 px-4 md:grid-cols-3 lg:grid-cols-4",
  // Full listing card
  card: "bg-card rounded-2xl overflow-hidden border border-border shadow-soft flex flex-col transition-shadow",
  cardFeaturedWrap: "bg-card rounded-2xl overflow-hidden border-[1.5px] border-primary-400 shadow-lg flex flex-col ring-1 ring-primary-300/40 transition-shadow",
  cardImageWrap: "relative w-full",
  cardImageAspect: { aspectRatio: "4/3" } as React.CSSProperties,
  cardImage: "object-cover",
  cardHeart: "absolute top-2 right-2 rtl:right-auto rtl:left-2 z-10 h-7 w-7 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm border border-border transition-colors",
  cardHeartIcon: "h-3.5 w-3.5",
  cardHeartActive: "text-red-500 fill-red-500",
  cardHeartInactive: "text-slate-400",
  cardFeatured: "absolute top-2 left-2 rtl:left-auto rtl:right-2 z-10 bg-primary-600 text-white text-[9px] rtl:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm",
  cardBody: "px-2.5 pt-2 pb-3 space-y-0.5 flex flex-col flex-1",
  cardPrice: "text-[14px] font-bold text-slate-900 leading-snug",
  cardPriceSuffix: "text-[11px] font-normal text-slate-400",
  cardTitle: "text-[12px] font-medium text-slate-600 line-clamp-1 leading-snug rtl:text-[13px]",
  cardMeta: "text-[11px] text-slate-400 leading-snug rtl:text-[12px]",
  cardLocation: "pt-0.5 mt-auto",
  cardLocationChip: "inline-flex items-center gap-0.5 bg-muted text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-full border border-border rtl:text-[11px] rtl:px-2.5",
  cardLocationIcon: "h-2.5 w-2.5 flex-shrink-0",
  // Show on Map CTA — subtle default, stronger when filters active
  mapCta: "fixed bottom-[4.5rem] left-1/2 -translate-x-1/2 z-30 md:bottom-6 inline-flex items-center gap-1.5 bg-card hover:bg-muted text-slate-700 text-sm font-semibold px-5 py-2.5 rounded-full shadow-sm border border-border transition-all",
  mapCtaActive: "fixed bottom-[4.5rem] left-1/2 -translate-x-1/2 z-30 md:bottom-6 inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg transition-all",
  mapCtaIcon: "h-4 w-4",
} as const

// ─── Map V2 Page ────────────────────────────────────────────────────────────
export const mapPage = {
  // Page shell — full height, no scroll
  root: "h-screen flex flex-col bg-background overflow-hidden",
  // Controls overlay — gradient backdrop for clean separation
  controlsWrap: "absolute top-0 left-0 right-0 z-20 pointer-events-none bg-gradient-to-b from-background via-background/80 to-transparent pb-4",
  controlsInner: "w-full max-w-[480px] md:max-w-3xl lg:max-w-5xl mx-auto px-4 pt-2 pointer-events-auto space-y-2",
  // Map container
  mapWrap: "relative flex-1 w-full",
  // Bottom results carousel — docked above bottom nav with gradient backdrop
  carouselWrap: "absolute bottom-[4.5rem] left-0 right-0 z-20 pointer-events-none pb-safe",
  carouselBg: "pt-4 pb-2",
  carouselRail: "flex gap-2 px-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pointer-events-auto",
  // Individual result card in carousel
  resultCard: "w-[240px] flex-shrink-0 snap-start bg-card rounded-xl border border-border shadow-lg overflow-hidden flex pointer-events-auto transition-all duration-150",
  resultCardActive: "w-[240px] flex-shrink-0 snap-start bg-card rounded-xl border-[1.5px] border-primary-400 shadow-lg overflow-hidden flex pointer-events-auto transition-all duration-150 ring-1 ring-primary-300/40",
  resultImage: "relative w-20 flex-shrink-0",
  resultBody: "flex-1 px-2 py-1.5 space-y-0.5 min-w-0",
  resultPrice: "text-[13px] font-bold text-slate-900 leading-snug",
  resultPriceSuffix: "text-[11px] font-normal text-slate-400",
  resultTitle: "text-[11px] font-medium text-slate-600 line-clamp-1 rtl:text-[12px]",
  resultMeta: "text-[10px] text-slate-400 rtl:text-[11px]",
  resultLocation: "text-[10px] text-slate-500 font-medium rtl:text-[11px]",
  // Show as List CTA — floats above carousel
  listCta: "absolute bottom-[8.5rem] left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 bg-card/95 backdrop-blur-sm hover:bg-muted text-slate-700 text-xs font-semibold px-4 py-2 rounded-full shadow-sm border border-border transition-all pointer-events-auto",
  listCtaIcon: "h-3.5 w-3.5",
} as const

// ─── Apply V2 Page ──────────────────────────────────────────────────────────
export const applyPage = {
  // Section card
  section: "bg-card rounded-2xl border border-border shadow-soft p-5 space-y-4",
  sectionTitle: "text-sm font-bold text-slate-900 rtl:text-[15px]",
  sectionSub: "text-xs text-slate-400 rtl:text-[13px]",
  // Form field
  label: "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 rtl:text-[12px] rtl:tracking-normal",
  input: "w-full h-11 rounded-2xl bg-background border border-border text-sm text-slate-900 placeholder:text-slate-400 outline-none px-4 focus:border-primary-400 focus:ring-1 focus:ring-primary-200 transition-colors",
  inputError: "border-red-300 focus:border-red-400 focus:ring-red-200",
  errorText: "text-xs text-red-500 mt-1",
  // Type chips
  typeGrid: "flex flex-wrap gap-2",
  typeChip: "px-4 py-2.5 rounded-2xl text-sm font-medium border transition-colors bg-background border-border text-slate-700 hover:border-slate-400",
  typeChipActive: "px-4 py-2.5 rounded-2xl text-sm font-medium border transition-colors bg-primary-600 text-white border-primary-600",
  // Stepper
  stepperRow: "flex items-center gap-3",
  stepperBtn: "h-9 w-9 rounded-xl border border-border bg-background text-slate-600 flex items-center justify-center text-lg font-semibold hover:bg-muted transition-colors",
  stepperValue: "text-sm font-bold text-slate-900 w-6 text-center tabular-nums",
  // Toggle — track 44×24, thumb 18×18, 3px inset
  toggleRow: "flex items-center justify-between",
  toggleTrack: "relative inline-flex w-[44px] h-[24px] rounded-full transition-colors cursor-pointer flex-shrink-0",
  toggleTrackOn: "bg-primary-600",
  toggleTrackOff: "bg-slate-300",
  toggleThumb: "absolute left-0 top-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-150",
  toggleThumbOn: "translate-x-[23px]",
  toggleThumbOff: "translate-x-[3px]",
  // Photo upload
  photoGrid: "flex gap-2 overflow-x-auto scrollbar-hide",
  photoSlot: "relative w-20 h-20 rounded-xl border border-border bg-background flex-shrink-0 overflow-hidden",
  photoAdd: "w-20 h-20 rounded-xl border-2 border-dashed border-border bg-background flex-shrink-0 flex flex-col items-center justify-center gap-1 text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors cursor-pointer",
  photoAddIcon: "h-5 w-5",
  photoAddText: "text-[9px] font-medium",
  // Map picker
  mapWrap: "w-full h-[220px] rounded-2xl border border-border overflow-hidden",
  mapLocateBtn: "flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors",
  mapLocateIcon: "h-3.5 w-3.5",
  mapCoords: "text-[11px] text-slate-400 tabular-nums mt-1.5",
  // Terms
  termsRow: "flex items-start gap-3",
  termsCheckbox: "mt-0.5 h-4 w-4 rounded border-border text-primary-600 focus:ring-primary-200",
  termsText: "text-xs text-slate-500 leading-relaxed rtl:text-[13px]",
  // Actions
  submitBtn: "w-full h-12 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors",
  draftBtn: "w-full h-11 rounded-2xl border border-border text-sm font-semibold text-slate-600 hover:bg-muted transition-colors",
} as const

// ─── Property Detail V2 Page ─────────────────────────────────────────────────
export const propertyDetail = {
  // Page shell
  root: "min-h-screen bg-background pb-24 md:pb-10",
  container: "w-full max-w-[480px] md:max-w-3xl lg:max-w-5xl mx-auto",
  // Back row
  backRow: "px-5 py-3 flex items-center gap-2",
  backBtn: "inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rtl:text-[14px]",
  backIcon: "h-4 w-4 rtl:rotate-180",
  // Hero image
  heroWrap: "relative w-full",
  heroAspect: { aspectRatio: "16/10" } as React.CSSProperties,
  heroImage: "object-cover",
  heroOverlay: "absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none",
  heroSave: "absolute top-3 right-3 rtl:right-auto rtl:left-3 z-10 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm border border-border transition-colors",
  heroSaveIcon: "h-4 w-4",
  heroSaveActive: "text-red-500 fill-red-500",
  heroSaveInactive: "text-slate-500",
  heroCounter: "absolute bottom-3 right-3 rtl:right-auto rtl:left-3 z-10 bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full",
  // Title / price / facts section
  infoSection: "px-5 pt-4 pb-3 space-y-2",
  priceRow: "flex items-baseline gap-1",
  price: "text-xl font-bold text-slate-900 leading-tight",
  priceSuffix: "text-sm font-normal text-slate-400",
  title: "text-base font-semibold text-slate-800 leading-snug rtl:text-[17px]",
  factsRow: "flex items-center gap-3 text-sm text-slate-500 rtl:text-[14px]",
  factsDot: "text-slate-300",
  // Trust / meta
  metaSection: "px-5 pb-3",
  metaRow: "flex items-center gap-3 flex-wrap",
  metaPill: "inline-flex items-center gap-1 bg-muted text-slate-600 text-[11px] rtl:text-[12px] font-medium px-2.5 py-1 rounded-full border border-border",
  metaIcon: "h-3 w-3 flex-shrink-0",
  // Action row
  actionSection: "px-5 pb-4",
  actionRow: "flex items-center gap-2",
  actionPrimary: "flex-1 h-11 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2",
  actionSecondary: "h-11 w-11 rounded-2xl border border-border bg-card hover:bg-muted flex items-center justify-center transition-colors",
  actionSecondaryIcon: "h-4.5 w-4.5 text-slate-600",
  // Divider
  divider: "h-px bg-border mx-5",
  // Description
  descSection: "px-5 py-4 space-y-2",
  descTitle: "text-sm font-bold text-slate-900 rtl:text-[15px]",
  descBody: "text-sm text-slate-600 leading-relaxed rtl:text-[14px] rtl:leading-relaxed",
  // Key facts / features
  factsSection: "px-5 py-4 space-y-3",
  factsTitle: "text-sm font-bold text-slate-900 rtl:text-[15px]",
  factsGrid: "grid grid-cols-2 gap-2",
  factCard: "bg-card rounded-2xl border border-border p-3 flex items-center gap-3",
  factIcon: "h-5 w-5 text-primary-600 flex-shrink-0",
  factLabel: "text-[11px] text-slate-400 rtl:text-[12px]",
  factValue: "text-sm font-semibold text-slate-900 rtl:text-[14px]",
  featureChip: "inline-flex items-center gap-1.5 bg-primary-600/10 text-primary-600 text-xs rtl:text-[13px] font-semibold px-3 py-1.5 rounded-full",
  featureIcon: "h-3.5 w-3.5",
  // Mini map
  mapSection: "px-5 py-4 space-y-3",
  mapTitle: "text-sm font-bold text-slate-900 rtl:text-[15px]",
  mapWrap: "w-full h-[180px] rounded-2xl border border-border overflow-hidden",
  mapLocationRow: "flex items-center gap-1.5 mt-2",
  mapLocationIcon: "h-3.5 w-3.5 text-slate-400 flex-shrink-0",
  mapLocationText: "text-xs text-slate-500 rtl:text-[13px]",
  // Sticky bottom CTA
  stickyBar: "fixed bottom-14 md:bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-sm border-t border-border pb-safe",
  stickyInner: "max-w-[480px] md:max-w-3xl lg:max-w-5xl mx-auto px-5 py-3 flex items-center gap-3",
  stickyPrimary: "flex-1 h-11 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2",
  stickySecondary: "h-11 px-5 rounded-2xl border border-border bg-card hover:bg-muted text-sm font-semibold text-slate-700 transition-colors flex items-center justify-center gap-2",
  stickySecondaryIcon: "h-4 w-4",
  stickyPrice: "text-sm font-bold text-slate-900",
  stickyPriceSuffix: "text-xs font-normal text-slate-400",
} as const

// ─── Filter Sheet ────────────────────────────────────────────────────────────
export const filterSheet = {
  backdrop: "fixed inset-0 z-40 bg-black/25 transition-opacity duration-200",
  backdropOpen: "opacity-100 pointer-events-auto",
  backdropClosed: "opacity-0 pointer-events-none",
  sheet: "fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-card rounded-t-2xl shadow-soft-xl max-h-[85vh] transition-transform duration-300 ease-out",
  sheetOpen: "translate-y-0",
  sheetClosed: "translate-y-full",
  dragHandle: "flex justify-center pt-3 pb-1 flex-shrink-0",
  dragBar: "w-8 h-1 rounded-full bg-border",
  headerRow: "flex items-center justify-between px-5 py-3 border-b border-border flex-shrink-0",
  headerTitle: "text-sm font-semibold text-slate-900",
  closeBtn: "h-7 w-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-muted transition-colors",
  closeIcon: "h-4 w-4",
  content: "overflow-y-auto flex-1 px-5 py-5 space-y-6",
  sectionLabel: "text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3",
  priceInputWrap: "relative",
  pricePrefixLTR: "absolute top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 left-3.5",
  pricePrefixRTL: "absolute top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 right-3.5",
  priceInputBase: "w-full h-11 rounded-2xl bg-background border border-border text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200 transition-colors",
  priceInputLTR: "pl-10 pr-4",
  priceInputRTL: "pr-10 pl-4",
  chipRow: "flex flex-wrap gap-2",
  chipActive: "px-4 py-2 rounded-2xl text-sm font-medium border transition-colors bg-primary-600 text-white border-primary-600",
  chipInactive: "px-4 py-2 rounded-2xl text-sm font-medium border transition-colors bg-background border-border text-slate-700 hover:border-slate-400",
  footer: "flex gap-3 px-5 py-4 border-t border-border flex-shrink-0 pb-safe",
  clearBtn: "flex-1 h-11 rounded-2xl border border-border text-sm font-semibold text-slate-600 hover:bg-muted transition-colors",
  applyBtn: "flex-1 h-11 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors",
} as const

// ─── Khiran Booking Page ──────────────────────────────────────────────────────
export const khiranPage = {
  // Hero area
  heroBanner: "relative w-full h-32 rounded-2xl overflow-hidden border border-border shadow-soft mb-4",
  heroOverlay: "absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-transparent",
  heroContent: "absolute inset-0 flex flex-col justify-center px-5",
  heroTitle: "text-lg font-bold text-white leading-tight rtl:text-xl",
  heroSub: "text-[11px] text-white/80 mt-0.5 rtl:text-[12px]",
  // Package tabs
  packageBar: "flex items-center bg-muted rounded-2xl p-1 border border-border gap-0.5 mb-3",
  packageTab: "flex-1 py-2 rounded-xl text-[12px] font-medium text-center transition-all duration-150 whitespace-nowrap rtl:text-[13px]",
  packageTabActive: "bg-card text-primary-600 font-semibold shadow-sm",
  packageTabInactive: "text-slate-500 hover:text-slate-700",
  // Filter row (inline, compact)
  filterRow: "flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-5 px-5 mb-3",
  filterChip: "flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium text-slate-700 shadow-sm whitespace-nowrap rtl:text-[13px]",
  filterChipActive: "flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary-600 border border-primary-600 text-xs font-medium text-white shadow-sm whitespace-nowrap rtl:text-[13px]",
  filterChipIcon: "h-3 w-3 flex-shrink-0",
  // Results summary
  summaryRow: "flex items-center justify-between mb-2",
  summaryText: "text-sm font-semibold text-slate-900 rtl:text-[15px]",
  // Chalet card (booking-aware, vertical)
  card: "bg-card rounded-2xl overflow-hidden border border-border shadow-soft flex flex-col transition-shadow",
  cardImageWrap: "relative w-full",
  cardImageAspect: { aspectRatio: "16/10" } as React.CSSProperties,
  cardImage: "object-cover",
  cardTag: "absolute top-2 left-2 rtl:left-auto rtl:right-2 z-10 bg-primary-600 text-white text-[9px] rtl:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm",
  cardVerified: "absolute top-2 right-2 rtl:right-auto rtl:left-2 z-10 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm",
  cardBody: "px-3 pt-2.5 pb-3 space-y-1.5 flex flex-col flex-1",
  cardTitle: "text-[13px] font-bold text-slate-900 line-clamp-1 leading-snug rtl:text-[14px]",
  cardPriceRow: "flex items-baseline gap-1",
  cardPrice: "text-[15px] font-bold text-primary-600 leading-snug",
  cardPriceSuffix: "text-[11px] font-normal text-slate-400",
  cardRatingRow: "flex items-center gap-1.5",
  cardStar: "text-amber-400 text-[11px] leading-none",
  cardRating: "text-[11px] font-semibold text-slate-700",
  cardReviews: "text-[11px] text-slate-400",
  cardMeta: "text-[11px] text-slate-500 leading-snug rtl:text-[12px]",
  cardAmenities: "flex items-center gap-2 pt-0.5",
  cardAmenity: "flex items-center gap-0.5 text-[10px] text-slate-500 rtl:text-[11px]",
  cardAmenityIcon: "h-3 w-3 text-slate-400",
  cardBookBtn: "mt-auto pt-2",
  cardBookBtnInner: "w-full h-9 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold transition-colors",
  // Chalet grid
  grid: "grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3",
  // Map section
  mapSection: "mt-5 mb-3",
  mapTitle: "text-sm font-bold text-slate-900 mb-2 rtl:text-[15px]",
  mapWrap: "w-full h-[180px] rounded-2xl border border-border overflow-hidden shadow-soft",
  // Empty state
  empty: "py-16 text-center",
  emptyText: "text-sm text-slate-500",
} as const

// ─── Khiran Chalet Detail Page ────────────────────────────────────────────────
export const chaletDetail = {
  // Page shell
  root: "min-h-screen bg-background pb-28 md:pb-10",
  container: "w-full max-w-[480px] md:max-w-3xl lg:max-w-5xl mx-auto",
  // Back row
  backRow: "px-5 py-3 flex items-center gap-2",
  backBtn: "inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors rtl:text-[14px]",
  backIcon: "h-4 w-4 rtl:rotate-180",
  // Hero image
  heroWrap: "relative w-full",
  heroAspect: { aspectRatio: "16/10" } as React.CSSProperties,
  heroImage: "object-cover",
  heroOverlay: "absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none",
  heroSave: "absolute top-3 right-3 rtl:right-auto rtl:left-3 z-10 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm border border-border transition-colors",
  heroSaveIcon: "h-4 w-4",
  heroSaveActive: "text-red-500 fill-red-500",
  heroSaveInactive: "text-slate-500",
  heroShare: "absolute top-3 right-14 rtl:right-auto rtl:left-14 z-10 h-9 w-9 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm border border-border transition-colors",
  heroShareIcon: "h-4 w-4 text-slate-500",
  heroCounter: "absolute bottom-3 right-3 rtl:right-auto rtl:left-3 z-10 bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full",
  // Thumbnail strip
  thumbStrip: "flex gap-1.5 px-5 pt-2 overflow-x-auto scrollbar-hide",
  thumb: "relative w-16 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent cursor-pointer",
  thumbActive: "relative w-16 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 border-primary-600 cursor-pointer",
  thumbImage: "object-cover",
  // Title section
  infoSection: "px-5 pt-4 pb-3 space-y-2",
  titleRow: "flex items-start justify-between gap-3",
  title: "text-lg font-bold text-slate-900 leading-snug rtl:text-xl",
  locationRow: "flex items-center gap-1.5",
  locationIcon: "h-3.5 w-3.5 text-slate-400 flex-shrink-0",
  locationText: "text-xs text-slate-500 rtl:text-[13px]",
  ratingRow: "flex items-center gap-1.5",
  ratingStar: "h-4 w-4 text-amber-400 fill-amber-400",
  ratingText: "text-sm font-semibold text-slate-900",
  ratingCount: "text-xs text-slate-400",
  verifiedBadge: "inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-200",
  verifiedIcon: "h-3 w-3",
  // Facts row
  factsRow: "flex items-center gap-3 text-sm text-slate-500 rtl:text-[14px]",
  factsDot: "text-slate-300",
  // Amenities grid
  amenitiesSection: "px-5 py-4 space-y-3",
  amenitiesTitle: "text-sm font-bold text-slate-900 rtl:text-[15px]",
  amenitiesGrid: "grid grid-cols-2 gap-2",
  amenityCard: "bg-card rounded-2xl border border-border p-3 flex items-center gap-3",
  amenityIcon: "h-5 w-5 text-primary-600 flex-shrink-0",
  amenityLabel: "text-sm font-medium text-slate-700 rtl:text-[14px]",
  amenityInactive: "bg-muted rounded-2xl border border-border p-3 flex items-center gap-3 opacity-40",
  // Divider
  divider: "h-px bg-border mx-5",
  // Description
  descSection: "px-5 py-4 space-y-2",
  descTitle: "text-sm font-bold text-slate-900 rtl:text-[15px]",
  descBody: "text-sm text-slate-600 leading-relaxed rtl:text-[14px] rtl:leading-relaxed",
  // Package pricing section
  pricingSection: "px-5 py-4 space-y-3",
  pricingTitle: "text-sm font-bold text-slate-900 rtl:text-[15px]",
  pricingGrid: "grid grid-cols-2 gap-2",
  pricingCard: "bg-card rounded-2xl border border-border p-3 space-y-1 cursor-pointer transition-all",
  pricingCardActive: "bg-card rounded-2xl border-[1.5px] border-primary-400 p-3 space-y-1 cursor-pointer transition-all ring-1 ring-primary-300/40 shadow-sm",
  pricingLabel: "text-[11px] font-medium text-slate-500 rtl:text-[12px]",
  pricingLabelActive: "text-[11px] font-semibold text-primary-600 rtl:text-[12px]",
  pricingPrice: "text-base font-bold text-slate-900",
  pricingPriceActive: "text-base font-bold text-primary-600",
  pricingSuffix: "text-[11px] font-normal text-slate-400",
  pricingNote: "text-[10px] text-slate-400 rtl:text-[11px]",
  // Calendar section
  calendarSection: "px-5 py-4 space-y-3",
  calendarTitle: "text-sm font-bold text-slate-900 rtl:text-[15px]",
  calendarSub: "text-xs text-slate-400 rtl:text-[13px]",
  calendarCard: "bg-card rounded-2xl border border-border p-4 shadow-soft",
  calendarNav: "flex items-center justify-between mb-3",
  calendarNavBtn: "h-8 w-8 rounded-xl flex items-center justify-center text-slate-500 hover:bg-muted transition-colors",
  calendarNavIcon: "h-4 w-4",
  calendarMonth: "text-sm font-semibold text-slate-900 rtl:text-[15px]",
  calendarWeekRow: "grid grid-cols-7 mb-1",
  calendarWeekDay: "text-center text-[10px] font-semibold text-slate-400 py-1 uppercase",
  calendarGrid: "grid grid-cols-7",
  calendarDay: "relative h-9 flex items-center justify-center text-sm text-slate-700 cursor-pointer rounded-lg hover:bg-muted transition-colors",
  calendarDayToday: "relative h-9 flex items-center justify-center text-sm font-semibold text-primary-600 cursor-pointer rounded-lg hover:bg-muted transition-colors",
  calendarDaySelected: "relative h-9 flex items-center justify-center text-sm font-semibold text-white bg-primary-600 rounded-lg cursor-pointer",
  calendarDayRange: "relative h-9 flex items-center justify-center text-sm text-primary-600 bg-primary-600/10 cursor-pointer",
  calendarDayUnavailable: "relative h-9 flex items-center justify-center text-sm text-slate-300 line-through cursor-not-allowed",
  calendarDayEmpty: "h-9",
  calendarDayPast: "relative h-9 flex items-center justify-center text-sm text-slate-300 cursor-not-allowed",
  calendarLegend: "flex items-center gap-4 pt-2",
  calendarLegendItem: "flex items-center gap-1.5 text-[10px] text-slate-400",
  calendarLegendDot: "w-2.5 h-2.5 rounded-sm",
  // Selected dates summary
  datesSummary: "bg-muted rounded-2xl border border-border px-4 py-3 flex items-center justify-between",
  datesSummaryLabel: "text-xs text-slate-500 rtl:text-[13px]",
  datesSummaryValue: "text-sm font-semibold text-slate-900 rtl:text-[15px]",
  datesSummaryNights: "text-xs text-slate-400 rtl:text-[13px]",
  // Map section
  mapSection: "px-5 py-4 space-y-3",
  mapTitle: "text-sm font-bold text-slate-900 rtl:text-[15px]",
  mapWrap: "w-full h-[180px] rounded-2xl border border-border overflow-hidden",
  mapLocationRow: "flex items-center gap-1.5 mt-2",
  mapLocationIcon: "h-3.5 w-3.5 text-slate-400 flex-shrink-0",
  mapLocationText: "text-xs text-slate-500 rtl:text-[13px]",
  // Sticky bottom CTA
  stickyBar: "fixed bottom-14 md:bottom-0 left-0 right-0 z-30 bg-card/95 backdrop-blur-sm border-t border-border pb-safe",
  stickyInner: "max-w-[480px] md:max-w-3xl lg:max-w-5xl mx-auto px-5 py-3 flex items-center gap-3",
  stickyPriceCol: "flex-1 min-w-0",
  stickyPrice: "text-sm font-bold text-slate-900",
  stickyPriceSuffix: "text-xs font-normal text-slate-400",
  stickyDates: "text-[11px] text-slate-400 truncate",
  stickyPrimary: "flex-1 h-11 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2",
  stickySecondary: "h-11 w-11 rounded-2xl border border-border bg-card hover:bg-muted flex items-center justify-center transition-colors flex-shrink-0",
  stickySecondaryIcon: "h-4 w-4 text-slate-600",
} as const
