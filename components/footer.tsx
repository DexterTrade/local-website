import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">DL</span>
              </div>
              <span className="font-bold">Dexter Logistics</span>
            </div>
            <p className="text-sm opacity-90">
              Premier cargo, logistics, and freight-forwarding services connecting Pakistan to the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#why-dexter" className="hover:underline">
                  Why Dexter
                </a>
              </li>
              <li>
                <a href="#destinations" className="hover:underline">
                  Destinations
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:underline">
                  Air Freight
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  Cargo Services
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  Freight Forwarding
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  DDP Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+92 (42) 1234-5678</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@dexterlogistics.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-90">
            <p>&copy; 2025 Dexter Logistics and Couriers. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
              <a href="#" className="hover:underline">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
