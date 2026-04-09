/**
 * Server-side view count storage.
 *
 * Stores view counts in a JSON file. For production at scale,
 * swap this module for a database-backed implementation.
 *
 * File location:
 *  - Development: <project>/data/views.json
 *  - Production (serverless): /tmp/views.json (ephemeral — migrate to DB for durability)
 */

import fs from "fs"
import path from "path"

interface ViewStore {
  [listingId: string]: number
}

function getStorePath(): string {
  if (process.env.NODE_ENV === "production") {
    // /tmp is writable in serverless environments (Vercel, AWS Lambda)
    return "/tmp/views.json"
  }
  // Development: persist in project data directory
  const dir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return path.join(dir, "views.json")
}

function readStore(): ViewStore {
  const p = getStorePath()
  try {
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, "utf-8")
      return JSON.parse(raw) as ViewStore
    }
  } catch {
    // Corrupted file — start fresh
  }
  return {}
}

function writeStore(store: ViewStore): void {
  const p = getStorePath()
  fs.writeFileSync(p, JSON.stringify(store), "utf-8")
}

/** Get the current view count for a listing. */
export function getViews(listingId: string): number {
  const store = readStore()
  return store[listingId] ?? 0
}

/** Increment the view count for a listing by 1. Returns the new total. */
export function incrementViews(listingId: string): number {
  const store = readStore()
  const current = store[listingId] ?? 0
  store[listingId] = current + 1
  writeStore(store)
  return store[listingId]
}
