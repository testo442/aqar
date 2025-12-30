/**
 * Geographic coordinate validation utilities
 * Prevents Leaflet crashes from invalid coordinates
 */

/**
 * Type guard: checks if lat and lng are valid numbers
 */
export function isValidLatLng(
  lat: unknown,
  lng: unknown
): boolean {
  if (typeof lat !== "number" || typeof lng !== "number") {
    return false
  }
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return false
  }
  // Valid latitude range: -90 to 90
  if (lat < -90 || lat > 90) {
    return false
  }
  // Valid longitude range: -180 to 180
  if (lng < -180 || lng > 180) {
    return false
  }
  return true
}

/**
 * Sanitize and validate coordinates
 * Returns null if invalid
 */
export function sanitizeLatLng(
  lat: unknown,
  lng: unknown
): { lat: number; lng: number } | null {
  if (typeof lat !== "number" || typeof lng !== "number") {
    return null
  }
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null
  }
  // Valid latitude range: -90 to 90
  if (lat < -90 || lat > 90) {
    return null
  }
  // Valid longitude range: -180 to 180
  if (lng < -180 || lng > 180) {
    return null
  }
  return { lat, lng }
}

/**
 * Dev-only logging for invalid coordinates
 */
export function logInvalidCoords(
  id: string,
  lat: unknown,
  lng: unknown
): void {
  if (process.env.NODE_ENV !== "production") {
    console.warn("[geo] Invalid coords for property", {
      id,
      lat,
      lng,
      latType: typeof lat,
      lngType: typeof lng,
    })
  }
}

