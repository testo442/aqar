/**
 * Client-side 24-hour view dedupe.
 *
 * Uses localStorage to track when a listing was last "viewed" by this
 * browser. If < 24 hours have passed, we skip the POST to /api/views.
 *
 * Key format: `aqarna_view_<listingId>` → ISO timestamp string
 */

const PREFIX = "aqarna_view_"
const WINDOW_MS = 24 * 60 * 60 * 1000 // 24 hours

/** Returns true if this listing has NOT been counted in the last 24h. */
export function shouldCountView(listingId: string): boolean {
  if (typeof window === "undefined") return false
  try {
    const key = PREFIX + listingId
    const stored = localStorage.getItem(key)
    if (!stored) return true
    const lastViewed = new Date(stored).getTime()
    if (Number.isNaN(lastViewed)) return true
    return Date.now() - lastViewed >= WINDOW_MS
  } catch {
    // localStorage blocked (private browsing, etc.) — allow the view
    return true
  }
}

/** Mark a listing as viewed right now. */
export function markViewed(listingId: string): void {
  if (typeof window === "undefined") return
  try {
    const key = PREFIX + listingId
    localStorage.setItem(key, new Date().toISOString())
  } catch {
    // localStorage blocked — silently ignore
  }
}

/**
 * Record a view for a listing. Handles dedupe + API call.
 * Returns the current view count (fetched regardless of whether a new view was counted).
 */
export async function recordView(listingId: string): Promise<{ views: number; counted: boolean }> {
  // Always fetch the latest count
  const countRes = await fetch(`/api/views?id=${encodeURIComponent(listingId)}`)
  const countData = await countRes.json()
  let views: number = countData.views ?? 0
  let counted = false

  // Only POST a new view if outside the 24h window
  if (shouldCountView(listingId)) {
    try {
      const res = await fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId }),
      })
      if (res.ok) {
        const data = await res.json()
        views = data.views
        counted = true
        markViewed(listingId)
      }
    } catch {
      // Network error — return the fetched count without incrementing
    }
  }

  return { views, counted }
}
