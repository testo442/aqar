import { redirect } from "next/navigation"

// Legacy scaffolding route — kept to avoid 404s, redirects to the real listings
export default function PropertyV2Redirect() {
  redirect("/properties")
}
