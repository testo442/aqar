/**
 * API Route: /api/list-property
 * 
 * Handles property listing lead submissions from /sell page.
 * 
 * Required Environment Variables (for production email delivery):
 * - RESEND_API_KEY: Your Resend API key
 * - LEADS_TO_EMAIL: Destination email address for leads
 * - RESEND_FROM (optional): Sender email (defaults to "Aqarna Leads <onboarding@resend.dev>")
 * 
 * If env vars are not set, leads are logged to console (dev-friendly).
 */

import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { isValidLatLng } from "@/lib/geo"
import { GOVERNORATE_BY_ID } from "@/lib/governorates"

interface LeadData {
  fullName: string
  phone: string
  email?: string
  purpose: "sell" | "rent"
  propertyType: string
  governorate: string
  area: string
  bedrooms?: number
  bathrooms?: number
  price: number
  notes?: string
  imageLinks?: string[]
  lat: number
  lng: number
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json()

    // Validate required fields
    if (!body.fullName?.trim()) {
      return NextResponse.json({ ok: false, error: "Full name is required" }, { status: 400 })
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ ok: false, error: "Phone is required" }, { status: 400 })
    }
    if (!body.purpose || !["sell", "rent"].includes(body.purpose)) {
      return NextResponse.json({ ok: false, error: "Purpose must be 'sell' or 'rent'" }, { status: 400 })
    }
    if (!body.propertyType?.trim()) {
      return NextResponse.json({ ok: false, error: "Property type is required" }, { status: 400 })
    }
    if (!body.governorate?.trim()) {
      return NextResponse.json({ ok: false, error: "Governorate is required" }, { status: 400 })
    }
    if (!body.area?.trim()) {
      return NextResponse.json({ ok: false, error: "Area is required" }, { status: 400 })
    }
    if (!body.price || typeof body.price !== "number" || body.price <= 0) {
      return NextResponse.json({ ok: false, error: "Valid price is required" }, { status: 400 })
    }

    // Validate coordinates using shared utility
    if (!isValidLatLng(body.lat, body.lng)) {
      return NextResponse.json(
        { ok: false, error: "Please select a valid location on the map." },
        { status: 400 }
      )
    }

    // Kuwait bounds: lat between 28.3 and 30.2, lng between 46.3 and 49.3
    if (body.lat < 28.3 || body.lat > 30.2 || body.lng < 46.3 || body.lng > 49.3) {
      return NextResponse.json(
        { ok: false, error: "Please select a valid location on the map." },
        { status: 400 }
      )
    }

    // Get governorate name for email subject
    const governorate = GOVERNORATE_BY_ID[body.governorate]
    const governorateName = governorate?.en || body.governorate
    const purposeLabel = body.purpose === "sell" ? "Buy" : "Rent"

    // Format location info
    const locationInfo = isValidLatLng(body.lat, body.lng)
      ? `${body.lat.toFixed(5)}, ${body.lng.toFixed(5)}`
      : "Location not available"
    const mapsLink = isValidLatLng(body.lat, body.lng)
      ? `https://www.google.com/maps?q=${body.lat},${body.lng}`
      : "N/A"

    // Prepare email content
    const timestamp = new Date().toISOString()
    const emailText = `
New Property Listing Request

Contact Information:
- Name: ${body.fullName}
- Phone: ${body.phone}
${body.email ? `- Email: ${body.email}` : ""}

Property Details:
- Purpose: ${purposeLabel}
- Property Type: ${body.propertyType}
- Governorate: ${governorateName}
- Area: ${body.area}
${body.bedrooms ? `- Bedrooms: ${body.bedrooms}` : ""}
${body.bathrooms ? `- Bathrooms: ${body.bathrooms}` : ""}
- Price: ${body.price} KWD

Location:
- Coordinates: ${locationInfo}
- Maps: ${mapsLink}

${body.notes ? `Notes:\n${body.notes}\n` : ""}
${body.imageLinks && body.imageLinks.length > 0 ? `Image Links:\n${body.imageLinks.join("\n")}\n` : ""}
Submitted: ${timestamp}
    `.trim()

    // Check if Resend is configured
    const resendApiKey = process.env.RESEND_API_KEY
    const leadsToEmail = process.env.LEADS_TO_EMAIL
    const resendFrom = process.env.RESEND_FROM || "Aqarna Leads <onboarding@resend.dev>"
    const resendConfigured = resendApiKey && leadsToEmail

    if (resendConfigured) {
      // Send email via Resend SDK
      try {
        const resend = new Resend(resendApiKey)
        
        const emailSubject = `New Aqarna lead — ${purposeLabel} ${body.propertyType} — ${governorateName}/${body.area}`
        
        const result = await resend.emails.send({
          from: resendFrom,
          to: leadsToEmail,
          subject: emailSubject,
          text: emailText,
        })

        if (result.error) {
          console.error("[Resend API Error]", result.error)
          return NextResponse.json(
            { ok: false, error: "Failed to send email. Please try again later." },
            { status: 500 }
          )
        }

        return NextResponse.json({ ok: true, mode: "email" })
      } catch (error) {
        console.error("[Resend API Request Failed]", error)
        return NextResponse.json(
          { ok: false, error: "Failed to send email. Please try again later." },
          { status: 500 }
        )
      }
    }

    // Fallback: Log to console (dev mode)
    console.log("=".repeat(60))
    console.log("NEW PROPERTY LISTING LEAD (DEV MODE)")
    console.log("=".repeat(60))
    console.log(emailText)
    console.log("=".repeat(60))
    console.log("Note: Set RESEND_API_KEY and LEADS_TO_EMAIL to enable email delivery")

    return NextResponse.json({ ok: true, mode: "log" })
  } catch (error) {
    console.error("[List Property API Error]", error)
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

