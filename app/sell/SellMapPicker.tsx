"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Circle, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Leaflet default marker fix
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

interface SellMapPickerProps {
  lat: number | null
  lng: number | null
  accuracyMeters?: number | null
  onLocationChange: (lat: number, lng: number) => void
  onMapReady?: (map: L.Map) => void
}

// Component to handle map clicks and marker dragging
function MapClickHandler({
  onLocationChange,
}: {
  onLocationChange: (lat: number, lng: number) => void
}) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng
      onLocationChange(lat, lng)
    },
  })
  return null
}

// Component to handle marker drag end
function DraggableMarker({
  lat,
  lng,
  onLocationChange,
}: {
  lat: number
  lng: number
  onLocationChange: (lat: number, lng: number) => void
}) {
  const markerRef = useRef<L.Marker | null>(null)

  const eventHandlers = {
    dragend: () => {
      const marker = markerRef.current
      if (marker) {
        const { lat, lng } = marker.getLatLng()
        onLocationChange(lat, lng)
      }
    },
  }

  return (
    <Marker
      position={[lat, lng]}
      draggable={true}
      ref={(ref) => {
        markerRef.current = ref as L.Marker | null
      }}
      eventHandlers={eventHandlers}
    />
  )
}

export default function SellMapPicker({
  lat,
  lng,
  accuracyMeters,
  onLocationChange,
  onMapReady,
}: SellMapPickerProps) {
  const mapRef = useRef<L.Map | null>(null)
  const [isMapReady, setIsMapReady] = useState(false)

  useEffect(() => {
    if (mapRef.current && onMapReady) {
      onMapReady(mapRef.current)
    }
  }, [isMapReady, onMapReady])

  const center: [number, number] = lat !== null && lng !== null ? [lat, lng] : [29.3759, 47.9774] // Kuwait City

  return (
    <div className="w-full h-[240px] md:h-[280px] rounded-xl border border-slate-200 overflow-hidden">
      <MapContainer
        center={center}
        zoom={11}
        className="w-full h-full"
        scrollWheelZoom={false}
        ref={(map) => {
          mapRef.current = map
          if (map) {
            setIsMapReady(true)
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onLocationChange={onLocationChange} />
        {lat !== null && lng !== null && (
          <>
            {/* Accuracy circle - only show if accuracy is available */}
            {accuracyMeters !== null && accuracyMeters !== undefined && accuracyMeters > 0 && (
              <Circle
                center={[lat, lng]}
                radius={accuracyMeters}
                pathOptions={{
                  color: "#3b82f6",
                  fillColor: "#3b82f6",
                  fillOpacity: 0.1,
                  weight: 1,
                  opacity: 0.5,
                }}
                interactive={false}
              />
            )}
            <DraggableMarker lat={lat} lng={lng} onLocationChange={onLocationChange} />
          </>
        )}
      </MapContainer>
    </div>
  )
}

