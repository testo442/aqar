"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Property } from "@/types/property"
import { sanitizeLatLng, logInvalidCoords } from "@/lib/geo"
import { useLanguage } from "@/app/providers"
import { t } from "@/lib/translations"

// -----------------------------
// Leaflet default marker fix
// -----------------------------
const iconRetinaUrl = "/leaflet/marker-icon-2x.png"
const iconUrl = "/leaflet/marker-icon.png"
const shadowUrl = "/leaflet/marker-shadow.png"

const DefaultIcon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

// -----------------------------
// Coord safety helpers (using shared utility)
// -----------------------------
function getValidLatLng(p: Property): { lat: number; lng: number } | null {
  const coords = sanitizeLatLng(p.lat, p.lng)
  if (!coords) {
    logInvalidCoords(p.id, p.lat, p.lng)
  }
  return coords
}

// -----------------------------
// Small scalable marker icon
// -----------------------------
const createCustomIcon = (color: string, isHighlighted: boolean) => {
  const size = isHighlighted ? 30 : 22
  const dot = isHighlighted ? 7 : 6
  const border = isHighlighted ? 3 : 2
  const shadow = isHighlighted ? "0 3px 10px rgba(0,0,0,0.28)" : "0 2px 6px rgba(0,0,0,0.22)"

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width:${size}px;
        height:${size}px;
        background:${color};
        border:${border}px solid white;
        border-radius:9999px;
        box-shadow:${shadow};
        display:flex;
        align-items:center;
        justify-content:center;
        transition:transform .15s ease, box-shadow .15s ease;
        transform:${isHighlighted ? "scale(1.12)" : "scale(1)"};
      ">
        <div style="
          width:${dot}px;
          height:${dot}px;
          background:white;
          border-radius:9999px;
          opacity:0.95;
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

// -----------------------------
// Price pill marker icon (preview mode)
// -----------------------------
const createPricePillIcon = (price: number, selected: boolean) => {
  const text = `${price.toLocaleString()} KD`
  const bg = selected ? "#0D7377" : "#fff"
  const color = selected ? "#fff" : "#0D7377"
  const border = selected ? "#0B6165" : "#0D7377"
  const shadow = selected
    ? "0 3px 10px rgba(13,115,119,0.4)"
    : "0 1px 4px rgba(0,0,0,0.12), 0 0 0 1px rgba(13,115,119,0.15)"
  const scale = selected ? "scale(1.08)" : "scale(1)"
  const weight = selected ? "700" : "600"
  // Estimate pill width: ~7px per char + 20px horizontal padding + 3px border
  const estWidth = text.length * 7 + 23
  const estHeight = 26

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      display:inline-flex;align-items:center;justify-content:center;
      height:${estHeight}px;padding:0 10px;
      background:${bg};color:${color};border:1.5px solid ${border};
      border-radius:9999px;font-size:11px;font-weight:${weight};
      font-family:var(--font-noto-sans-arabic),system-ui,sans-serif;
      white-space:nowrap;box-shadow:${shadow};cursor:pointer;
      transition:all .15s ease;transform:${scale};
      pointer-events:auto;line-height:1;
    ">${text}</div>`,
    iconSize: [estWidth, estHeight],
    iconAnchor: [estWidth / 2, estHeight / 2],
  })
}

// -----------------------------
// Props
// -----------------------------
// -----------------------------
// Price label thresholds
// -----------------------------
export const PRICE_ZOOM_THRESHOLD = 14
export const MAX_PRICE_LABELS = 12

interface MapViewProps {
  properties: Property[]
  selectedPropertyId?: string
  hoveredPropertyId?: string
  onPropertyClick?: (propertyId: string) => void
  onPropertyHover?: (propertyId: string | undefined) => void
  className?: string
  mode?: "full" | "preview"
  onReady?: () => void
  /** Report current zoom + visible listing count so parent can react */
  onMapState?: (state: { zoom: number; visibleCount: number; showPrices: boolean }) => void
}

// -----------------------------
// Map view updater
// -----------------------------
function MapViewUpdater({ center }: { center: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])

  return null
}

// -----------------------------
// Popup controller - ensures only one popup is open at a time
// -----------------------------
function PopupController({
  selectedPropertyId,
  mappableProperties,
}: {
  selectedPropertyId?: string
  mappableProperties: Property[]
}) {
  const map = useMap()

  useEffect(() => {
    // Close all popups first
    map.closePopup()

    if (!selectedPropertyId) return

    // Find the selected property's marker and open its popup
    const property = mappableProperties.find((p) => p.id === selectedPropertyId)
    if (!property) return

    const coords = sanitizeLatLng(property.lat, property.lng)
    if (!coords) return

    // Use setTimeout to ensure markers are rendered
    setTimeout(() => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          const marker = layer as L.Marker
          const latlng = marker.getLatLng()
          // Check if this marker matches the selected property coordinates
          if (
            Math.abs(latlng.lat - coords.lat) < 0.0001 &&
            Math.abs(latlng.lng - coords.lng) < 0.0001
          ) {
            marker.openPopup()
          }
        }
      })
    }, 50)
  }, [map, selectedPropertyId, mappableProperties])

  return null
}

// -----------------------------
// Safe flyTo (never crashes)
// -----------------------------
function MapFlyTo({
  selectedPropertyId,
  mappableProperties,
}: {
  selectedPropertyId?: string
  mappableProperties: Property[]
}) {
  const map = useMap()

  useEffect(() => {
    if (!selectedPropertyId) {
      // Close all popups when selection is cleared
      map.closePopup()
      return
    }

    // CRITICAL: only look inside mappableProperties (already validated)
    const property = mappableProperties.find((p) => p.id === selectedPropertyId)
    if (!property) {
      map.closePopup()
      return
    }

    const coords = sanitizeLatLng(property.lat, property.lng)
    if (!coords) {
      // Already logged in getValidLatLng, just skip flyTo
      map.closePopup()
      return
    }

    try {
      map.flyTo([coords.lat, coords.lng], map.getZoom(), { duration: 0.6 })
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[MapView] flyTo failed unexpectedly", e, { lat: coords.lat, lng: coords.lng })
      }
    }
  }, [map, selectedPropertyId, mappableProperties])

  return null
}



// -----------------------------
// Preview mode controller
// Disables interactions, invalidates size, fires onReady
// -----------------------------
function PreviewModeController({ onReady }: { onReady?: () => void }) {
  const map = useMap()

  useEffect(() => {
    // Disable all interactions for preview embed
    map.dragging.disable()
    map.touchZoom.disable()
    map.doubleClickZoom.disable()
    map.scrollWheelZoom.disable()
    map.boxZoom.disable()
    map.keyboard.disable()

    // Fix gray panel: invalidateSize after mount
    requestAnimationFrame(() => {
      map.invalidateSize()
      setTimeout(() => {
        map.invalidateSize()
        onReady?.()
      }, 150)
    })

    // Re-enable on pointerdown inside map (let user pan if they tap)
    const container = map.getContainer()
    const enable = () => {
      map.dragging.enable()
      map.touchZoom.enable()
    }
    const maybeDisable = (e: PointerEvent) => {
      if (!container.contains(e.target as Node)) {
        map.dragging.disable()
        map.touchZoom.disable()
      }
    }
    container.addEventListener("pointerdown", enable)
    document.addEventListener("pointerdown", maybeDisable)

    return () => {
      container.removeEventListener("pointerdown", enable)
      document.removeEventListener("pointerdown", maybeDisable)
    }
  }, [map, onReady])

  return null
}

// -----------------------------
// Preview: fit bounds to all markers on mount
// -----------------------------
function PreviewFitBounds({
  mappableProperties,
}: {
  mappableProperties: Property[]
}) {
  const map = useMap()
  const fitted = useRef(false)

  useEffect(() => {
    if (fitted.current || mappableProperties.length === 0) return
    fitted.current = true

    const points: [number, number][] = mappableProperties
      .map((p) => {
        const c = getValidLatLng(p)
        return c ? [c.lat, c.lng] as [number, number] : null
      })
      .filter((c): c is [number, number] => c !== null)

    if (points.length === 0) return

    requestAnimationFrame(() => {
      map.invalidateSize()
      const bounds = L.latLngBounds(points)
      map.fitBounds(bounds, { padding: [35, 35], maxZoom: 13 })
    })
  }, [map, mappableProperties])

  return null
}

// -----------------------------
// Preview: pan to selected marker with vertical offset
// so the pin appears above the bottom preview card
// -----------------------------
function PreviewPanOnSelect({
  selectedPropertyId,
  mappableProperties,
}: {
  selectedPropertyId?: string
  mappableProperties: Property[]
}) {
  const map = useMap()

  useEffect(() => {
    if (!selectedPropertyId) return

    const property = mappableProperties.find((p) => p.id === selectedPropertyId)
    if (!property) return

    const coords = sanitizeLatLng(property.lat, property.lng)
    if (!coords) return

    // Pan so the selected pin sits in the upper ~35% of the map
    // by shifting the target center south (pin appears higher)
    const mapSize = map.getSize()
    const zoom = map.getZoom()
    const point = map.project([coords.lat, coords.lng], zoom)
    // Push center 20% of viewport height below the pin
    const offsetPoint = L.point(point.x, point.y + mapSize.y * 0.2)
    const newCenter = map.unproject(offsetPoint, zoom)

    map.panTo(newCenter, { animate: true, duration: 0.4 })
  }, [map, selectedPropertyId, mappableProperties])

  return null
}

// -----------------------------
// Zoom & bounds reporter — computes showPrices
// -----------------------------
function MapStateReporter({
  mappableProperties,
  onState,
}: {
  mappableProperties: Property[]
  onState: (s: { zoom: number; visibleCount: number; showPrices: boolean }) => void
}) {
  const map = useMap()

  const report = useCallback(() => {
    const zoom = map.getZoom()
    const bounds = map.getBounds()
    let visibleCount = 0
    for (const p of mappableProperties) {
      const c = sanitizeLatLng(p.lat, p.lng)
      if (c && bounds.contains([c.lat, c.lng])) visibleCount++
    }
    const showPrices = zoom >= PRICE_ZOOM_THRESHOLD && visibleCount <= MAX_PRICE_LABELS
    onState({ zoom, visibleCount, showPrices })
  }, [map, mappableProperties, onState])

  useEffect(() => {
    report()
    map.on("zoomend", report)
    map.on("moveend", report)
    return () => {
      map.off("zoomend", report)
      map.off("moveend", report)
    }
  }, [map, report])

  return null
}

// -----------------------------
// Main component
// -----------------------------
export default function MapView({
  properties,
  selectedPropertyId,
  hoveredPropertyId,
  onPropertyClick,
  onPropertyHover,
  className = "",
  mode = "full",
  onReady,
  onMapState,
}: MapViewProps) {
  const isPreview = mode === "preview"
  const mapRef = useRef<L.Map | null>(null)
  const { lang } = useLanguage()
  const [showPrices, setShowPrices] = useState(false)

  const handleMapState = useCallback(
    (s: { zoom: number; visibleCount: number; showPrices: boolean }) => {
      setShowPrices(s.showPrices)
      onMapState?.(s)
    },
    [onMapState],
  )

  // Only allow valid properties to touch Leaflet
  const mappableProperties = useMemo(() => {
    return (properties ?? []).filter((p) => {
      const coords = getValidLatLng(p)
      return coords !== null
    })
  }, [properties])

  const center = useMemo<[number, number]>(() => {
    if (mappableProperties.length === 0) return [29.3759, 47.9774] // Kuwait City fallback

    let sumLat = 0
    let sumLng = 0
    for (const p of mappableProperties) {
      const c = getValidLatLng(p)!
      sumLat += c.lat
      sumLng += c.lng
    }

    const avgLat = sumLat / mappableProperties.length
    const avgLng = sumLng / mappableProperties.length

    if (!Number.isFinite(avgLat) || !Number.isFinite(avgLng)) return [29.3759, 47.9774]
    return [avgLat, avgLng]
  }, [mappableProperties])

  const markers = useMemo(() => {
    return mappableProperties.map((property) => {
      const coords = getValidLatLng(property)!
      const isHighlighted = property.id === selectedPropertyId || property.id === hoveredPropertyId

      const color =
        property.id === selectedPropertyId
          ? "#0B6165"
          : property.type === "buy"
          ? "#0D7377"
          : "#0F8A8F"

      // Use price pills when zoomed in + few visible listings (non-preview only)
      const icon =
        !isPreview && showPrices
          ? createPricePillIcon(property.price, isHighlighted)
          : createCustomIcon(color, isHighlighted)

      return (
        <Marker
          key={property.id}
          position={[coords.lat, coords.lng]}
          icon={icon}
          eventHandlers={{
            click: () => {
              onPropertyClick?.(property.id)
            },
            mouseover: () => onPropertyHover?.(property.id),
            mouseout: () => onPropertyHover?.(undefined),
          }}
        >
          {!isPreview && (
            <Popup
              key={property.id}
              maxWidth={220}
              className="custom-popup"
              autoClose={true}
              closeOnClick={true}
            >
              <div className="p-2">
                <h3 className="font-semibold text-xs text-slate-900 mb-1 line-clamp-2">{property.title}</h3>
                <p className="text-xs font-bold text-primary-600 mb-2 tabular-nums">
                  {new Intl.NumberFormat("en-KW", {
                    style: "currency",
                    currency: "KWD",
                    minimumFractionDigits: 0,
                  }).format(property.price)}
                  {property.type === "rent" && " /month"}
                </p>
                <Link
                  href={`/properties/${property.id}`}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-700 transition-colors underline"
                >
                  {t("viewDetails", lang)}
                </Link>
              </div>
            </Popup>
          )}
        </Marker>
      )
    })
  }, [mappableProperties, selectedPropertyId, hoveredPropertyId, onPropertyClick, onPropertyHover, lang, isPreview, showPrices])

  return (
    <div className={`relative w-full ${className}`} style={{ height: "100%", minHeight: "100%" }}>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={isPreview ? 13 : 11}
        style={{ height: "100%", width: "100%", minHeight: "100%", zIndex: 0 }}
        className="rounded-2xl"
        scrollWheelZoom={!isPreview}
        zoomControl={!isPreview}
        attributionControl={!isPreview}
      >
        {/* CARTO Voyager @2x — best free raster option for premium feel.
            For true premium (vector, smooth zoom, 3D): migrate to Mapbox GL JS or MapTiler SDK.
            Both require a paid API key but deliver significantly sharper rendering. */}
        <TileLayer
          attribution={isPreview ? "" : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'}
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png"
          tileSize={512}
          zoomOffset={-1}
          maxZoom={20}
          maxNativeZoom={18}
        />

        {isPreview && (
          <>
            <PreviewModeController onReady={onReady} />
            <PreviewFitBounds mappableProperties={mappableProperties} />
            <PreviewPanOnSelect
              selectedPropertyId={selectedPropertyId}
              mappableProperties={mappableProperties}
            />
          </>
        )}

        {!isPreview && (
          <>
            <MapViewUpdater center={center} />
            <MapStateReporter
              mappableProperties={mappableProperties}
              onState={handleMapState}
            />
            <MapFlyTo
              selectedPropertyId={selectedPropertyId}
              mappableProperties={mappableProperties}
            />
            <PopupController
              selectedPropertyId={selectedPropertyId}
              mappableProperties={mappableProperties}
            />
          </>
        )}

        {markers}
      </MapContainer>
    </div>
  )
}
