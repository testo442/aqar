import './globals.css'
import type { Metadata } from 'next'
import { Noto_Sans_Arabic } from 'next/font/google'
import { cookies } from 'next/headers'
import { LanguageProvider } from './providers'
import { HtmlAttributes } from './html-attributes'

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  // Only ship weights actually used by the V2 design system
  // (400 body, 500 medium, 600 semibold, 700 bold, 900 black headlines)
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-noto-sans-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aqarna | Kuwait Real Estate',
  description: 'Buy, rent, and explore properties across Kuwait.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Read language cookie on server — default to Arabic (RTL)
  const cookieStore = await cookies()
  const langCookie = cookieStore.get("aqarna_lang")
  const initialLang = langCookie?.value === "en" ? "en" : "ar"
  const initialDir = initialLang === "ar" ? "rtl" : "ltr"

  return (
    <html lang={initialLang} dir={initialDir} suppressHydrationWarning>
      <body className={`${notoSansArabic.variable} font-sans antialiased`}>
        <LanguageProvider initialLang={initialLang}>
          <HtmlAttributes />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
