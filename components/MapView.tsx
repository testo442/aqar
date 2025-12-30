"use client"

import { useEffect, useMemo, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Property } from "@/types/property"
import { sanitizeLatLng, logInvalidCoords } from "@/lib/geo"

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
// Props
// -----------------------------
interface MapViewProps {
  properties: Property[]
  selectedPropertyId?: string
  hoveredPropertyId?: string
  onPropertyClick?: (propertyId: string) => void
  onPropertyHover?: (propertyId: string | undefined) => void
  className?: string
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
    if (!selectedPropertyId) return

    // CRITICAL: only look inside mappableProperties (already validated)
    const property = mappableProperties.find((p) => p.id === selectedPropertyId)
    if (!property) return

    const coords = sanitizeLatLng(property.lat, property.lng)
    if (!coords) {
      // Already logged in getValidLatLng, just skip flyTo
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
// Main component
// -----------------------------
export default function MapView({
  properties,
  selectedPropertyId,
  hoveredPropertyId,
  onPropertyClick,
  onPropertyHover,
  className = "",
}: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null)

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
          ? "#1D4ED8"
          : property.type === "buy"
          ? "#2563EB"
          : "#60A5FA"

      return (
        <Marker
          key={property.id}
          position={[coords.lat, coords.lng]}
          icon={createCustomIcon(color, isHighlighted)}
          eventHandlers={{
            click: () => onPropertyClick?.(property.id),
            mouseover: () => onPropertyHover?.(property.id),
            mouseout: () => onPropertyHover?.(undefined),
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-sm text-slate-900 mb-1">{property.title}</h3>
              <p className="text-xs text-slate-600 mb-2">{property.location}</p>
              <p className="text-sm font-bold text-primary-600">
                {new Intl.NumberFormat("en-KW", {
                  style: "currency",
                  currency: "KWD",
                  minimumFractionDigits: 0,
                }).format(property.price)}
                {property.type === "rent" && " /month"}
              </p>
            </div>
          </Popup>
        </Marker>
      )
    })
  }, [mappableProperties, selectedPropertyId, hoveredPropertyId, onPropertyClick, onPropertyHover])

  return (
    <div className={`relative w-full ${className}`} style={{ height: "100%", minHeight: "100%" }}>
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={11}
        style={{ height: "100%", width: "100%", minHeight: "100%", zIndex: 0 }}
        className="rounded-2xl"
        scrollWheelZoom
        zoomControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapViewUpdater center={center} />
        <MapFlyTo
  selectedPropertyId={selectedPropertyId}
  mappableProperties={mappableProperties}
/>




        {markers}
      </MapContainer>
    </div>
  )
}
