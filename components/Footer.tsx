import Link from "next/link"
import { Home } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white shadow-sm">
                <Home className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">Aqarna</span>
            </Link>
            <p className="text-sm text-slate-400">
              Your trusted real estate partner in Kuwait. Find your dream home today.
            </p>
          </div>

          {/* Buy & Rent */}
          <div>
            <h3 className="font-semibold mb-4">Buy & Rent</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/buy" className="hover:text-white transition-colors">
                  Browse Homes
                </Link>
              </li>
              <li>
                <Link href="/rent" className="hover:text-white transition-colors">
                  Rentals
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-white transition-colors">
                  Sell Your Home
                </Link>
              </li>
              <li>
                <Link href="/agents" className="hover:text-white transition-colors">
                  Find Agents
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Aqarna. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

