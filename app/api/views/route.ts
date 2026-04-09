/**
 * API Route: /api/views
 *
 * GET  ?id=<listingId>  → { views: number }
 * POST { listingId }    → { views: number, counted: boolean }
 *
 * The POST endpoint increments the count. Client-side 24h dedupe
 * prevents repeated calls, but the server is idempotent per request
 * (each valid POST = +1). The client gate is the dedup authority.
 */

import { NextRequest, NextResponse } from "next/server"
import { getViews, incrementViews } from "@/lib/views"

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id")
  if (!id || typeof id !== "string" || id.length > 100) {
    return NextResponse.json({ error: "Missing or invalid id" }, { status: 400 })
  }

  return NextResponse.json({ views: getViews(id) })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const listingId = body?.listingId

    if (!listingId || typeof listingId !== "string" || listingId.length > 100) {
      return NextResponse.json({ error: "Missing or invalid listingId" }, { status: 400 })
    }

    const views = incrementViews(listingId)
    return NextResponse.json({ views, counted: true })
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
