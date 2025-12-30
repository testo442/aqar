import Link from "next/link"
import { Search, TrendingUp, Shield, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Aqarna | Kuwait Real Estate",
  description: "Learn why Aqarna is your trusted partner for real estate in Kuwait.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Why Choose Aqarna?
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Your trusted partner for real estate in Kuwait. We make finding your dream home simple and secure.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">10,000+</div>
              <div className="text-sm md:text-base text-slate-600 font-medium">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">5,000+</div>
              <div className="text-sm md:text-base text-slate-600 font-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">50+</div>
              <div className="text-sm md:text-base text-slate-600 font-medium">Expert Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-1">24/7</div>
              <div className="text-sm md:text-base text-slate-600 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
              <div className="text-center">
                <div className="bg-primary-50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <Search className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Advanced Search</h3>
                <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                  Powerful filters and detailed listings help you find exactly what you&apos;re looking for.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <TrendingUp className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Market Insights</h3>
                <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                  Real-time data and pricing trends to help you make informed decisions.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary-50 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <Shield className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-slate-900">Trusted & Secure</h3>
                <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                  Verified listings and secure transactions. Your peace of mind is our priority.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center tracking-tight">
                How It Works
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Search Properties</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Use our powerful search filters to find properties that match your criteria. Filter by location, price, type, and more.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Explore on Map</h3>
                    <p className="text-slate-600 leading-relaxed">
                      View properties on an interactive map to see locations, neighborhoods, and nearby amenities.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Contact & View</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Get in touch with property owners or agents directly. Schedule viewings and ask questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Points */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center tracking-tight">
                Why Trust Aqarna?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Verified Listings</h4>
                    <p className="text-sm text-slate-600">All properties are verified for accuracy and authenticity.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Secure Platform</h4>
                    <p className="text-sm text-slate-600">Your data and transactions are protected with industry-standard security.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Expert Support</h4>
                    <p className="text-sm text-slate-600">Our team is available 24/7 to help you find your perfect property.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-1">Transparent Pricing</h4>
                    <p className="text-sm text-slate-600">No hidden fees. Clear pricing information for every property.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              Ready to Find Your Home?
            </h2>
            <p className="text-xl md:text-2xl text-primary-50 mb-10 leading-[1.6]">
              Join thousands of satisfied customers who found their perfect property with Aqarna.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/properties">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary-600 border-white hover:bg-primary-50 rounded-xl px-8 py-6 text-base font-semibold h-auto"
                >
                  Browse Properties
                </Button>
              </Link>
              <Button
                size="lg"
                className="bg-white/10 text-white border-2 border-white hover:bg-white/20 rounded-xl px-8 py-6 text-base font-semibold h-auto"
              >
                List Your Property
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

