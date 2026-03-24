"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Map, LayoutList, PlusSquare, TreePalm } from "lucide-react"
import { useLanguage } from "@/app/providers"
import { bottomNav as s } from "./v2Styles"

const NAV_ITEMS = [
  { href: "/map",         icon: Map,        labelEn: "Map",      labelAr: "الخريطة" },
  { href: "/properties",  icon: LayoutList, labelEn: "Listings", labelAr: "العقارات" },
  { href: "/",            icon: Home,       labelEn: "Home",     labelAr: "الرئيسية" },
  { href: "/khiran",      icon: TreePalm,   labelEn: "Khiran",   labelAr: "الخيران" },
  { href: "/apply",       icon: PlusSquare, labelEn: "Apply",    labelAr: "تقديم" },
]

export default function BottomNav() {
  const pathname = usePathname()
  const { lang } = useLanguage()

  return (
    <nav className={s.root} aria-label="Bottom navigation">
      <div className={s.grid}>
        {NAV_ITEMS.map(({ href, icon: Icon, labelEn, labelAr }) => {
          const isActive = href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(href + "/")
          const label = lang === "ar" ? labelAr : labelEn

          return (
            <Link
              key={labelEn + href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={s.item}
            >
              <Icon
                className={isActive ? s.iconActive : s.iconInactive}
                aria-hidden
                strokeWidth={isActive ? 2.25 : 1.75}
              />
              <span className={isActive ? s.labelActive : s.labelInactive}>
                {label}
              </span>
              {isActive && <span className={s.dot} />}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
