import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { LanguageProvider } from './providers'
import { HtmlAttributes } from './html-attributes'
// Old V1 Header/Footer kept but no longer rendered (V2 pages use AppHeader + BottomNav)
// import Header from '@/components/Header'
// import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
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
  // Read language cookie on server
  const cookieStore = await cookies()
  const langCookie = cookieStore.get("aqarna_lang")
  const initialLang = langCookie?.value === "ar" ? "ar" : "en"
  const initialDir = initialLang === "ar" ? "rtl" : "ltr"

  return (
    <html lang={initialLang} dir={initialDir} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <LanguageProvider initialLang={initialLang}>
          <HtmlAttributes />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
