"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { MapContainer, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// ─── Types ───────────────────────────────────────────────────────────────────
export interface MapPin {
  id: string
  price: number
  lat: number
  lng: number
}

interface V2LeafletMapProps {
  pins: MapPin[]
  selectedId: string | null
  onSelect: (id: string) => void
  onFocusChange?: (focused: boolean) => void
  onReady?: () => void
}

// ─── Price pill divIcon ──────────────────────────────────────────────────────
function pricePillIcon(price: number, selected: boolean): L.DivIcon {
  const text = `${price.toLocaleString()} KD`

  // Default: white bg + blue border + blue text (visible on light tiles)
  // Selected: solid blue bg + white text + scale up
  const bg = selected ? "#2E56D4" : "#fff"
  const color = selected ? "#fff" : "#2E56D4"
  const border = selected ? "#2248BA" : "#2E56D4"
  const shadow = selected
    ? "0 3px 10px rgba(46,86,212,0.4)"
    : "0 1px 4px rgba(0,0,0,0.12), 0 0 0 1px rgba(46,86,212,0.15)"
  const scale = selected ? "scale(1.1)" : "scale(1)"
  const weight = selected ? "700" : "600"

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background:${bg};color:${color};border:1.5px solid ${border};
      border-radius:9999px;padding:4px 10px;font-size:11px;font-weight:${weight};
      font-family:var(--font-inter),system-ui,sans-serif;
      white-space:nowrap;box-shadow:${shadow};cursor:pointer;
      transition:all .15s ease;transform:${scale};
      pointer-events:auto;
    ">${text}</div>`,
    iconSize: [0, 0],
    iconAnchor: [40, 15],
  })
}

// ─── Marker renderer (imperative for perf) ──────────────────────────────────
function PinMarkers({
  pins,
  selectedId,
  onSelect,
}: {
  pins: MapPin[]
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const map = useMap()
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    // Clear previous
    markersRef.current.forEach((m) => m.remove())
    markersRef.current = []

    pins.forEach((pin) => {
      const marker = L.marker([pin.lat, pin.lng], {
        icon: pricePillIcon(pin.price, pin.id === selectedId),
        interactive: true,
      })
      marker.on("click", () => onSelect(pin.id))
      marker.addTo(map)
      markersRef.current.push(marker)
    })

    return () => {
      markersRef.current.forEach((m) => m.remove())
      markersRef.current = []
    }
  }, [map, pins, selectedId, onSelect])

  return null
}

// ─── Gesture focus controller ───────────────────────────────────────────────
// Default: interactions OFF → page scroll works through map area.
// On pointerdown inside map → interactions ON (map captures gestures).
// On pointerdown outside map → interactions OFF (page scroll resumes).
function GestureController({
  onFocusChange,
}: {
  onFocusChange: (focused: boolean) => void
}) {
  const map = useMap()

  useEffect(() => {
    const container = map.getContainer()

    // Initially disable all interactions
    map.dragging.disable()
    map.touchZoom.disable()
    map.doubleClickZoom.disable()
    map.scrollWheelZoom.disable()

    const enable = () => {
      map.dragging.enable()
      map.touchZoom.enable()
      map.doubleClickZoom.enable()
      map.scrollWheelZoom.enable()
      onFocusChange(true)
    }

    const maybeDisable = (e: PointerEvent) => {
      if (!container.contains(e.target as Node)) {
        map.dragging.disable()
        map.touchZoom.disable()
        map.doubleClickZoom.disable()
        map.scrollWheelZoom.disable()
        onFocusChange(false)
      }
    }

    container.addEventListener("pointerdown", enable)
    document.addEventListener("pointerdown", maybeDisable)

    return () => {
      container.removeEventListener("pointerdown", enable)
      document.removeEventListener("pointerdown", maybeDisable)
    }
  }, [map, onFocusChange])

  return null
}

// ─── InvalidateSize on mount ────────────────────────────────────────────────
function InvalidateSizeOnMount({ onReady }: { onReady?: () => void }) {
  const map = useMap()
  useEffect(() => {
    // rAF + 150ms to ensure tiles render after dynamic insert
    requestAnimationFrame(() => {
      map.invalidateSize()
      setTimeout(() => {
        map.invalidateSize()
        onReady?.()
      }, 150)
    })
  }, [map, onReady])
  return null
}

// ─── Main ───────────────────────────────────────────────────────────────────
export default function V2LeafletMap({
  pins,
  selectedId,
  onSelect,
  onFocusChange,
  onReady,
}: V2LeafletMapProps) {
  const center = useMemo<[number, number]>(() => {
    if (pins.length === 0) return [28.645, 48.373]
    const lat = pins.reduce((s, p) => s + p.lat, 0) / pins.length
    const lng = pins.reduce((s, p) => s + p.lng, 0) / pins.length
    return [lat, lng]
  }, [pins])

  const handleFocus = useCallback(
    (f: boolean) => onFocusChange?.(f),
    [onFocusChange],
  )

  return (
    <div className="absolute inset-0">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <InvalidateSizeOnMount onReady={onReady} />
        <PinMarkers pins={pins} selectedId={selectedId} onSelect={onSelect} />
        <GestureController onFocusChange={handleFocus} />
      </MapContainer>
    </div>
  )
}
