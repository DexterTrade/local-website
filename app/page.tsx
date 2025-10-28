import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plane, Package, Globe, CheckCircle, Shield, Clock, Zap, TrendingUp, Users } from "lucide-react"

export default function Home() {
  const services = [
    {
      icon: Plane,
      title: "Air Freight",
      description: "Fast and secure air cargo services for time-sensitive shipments to global destinations.",
    },
    {
      icon: Package,
      title: "Cargo Services",
      description: "Comprehensive cargo handling for household goods and commercial loads with full tracking.",
    },
    {
      icon: Globe,
      title: "Freight Forwarding",
      description: "Seamless international freight forwarding with customs clearance and documentation support.",
    },
  ]

  const whyDexter = [
    {
      icon: Shield,
      title: "DDP Service",
      description: "Delivered Duty Paid - all duties pre-handled with no hidden costs or customs tension.",
    },
    {
      icon: Clock,
      title: "Reliable Delivery",
      description: "Guaranteed on-time delivery with real-time tracking and professional handling.",
    },
    {
      icon: CheckCircle,
      title: "Complete Peace of Mind",
      description: "Full insurance coverage and secure handling of all cargo types and values.",
    },
    {
      icon: TrendingUp,
      title: "Competitive Pricing",
      description: "Transparent pricing with no surprises - what you see is what you pay.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced logistics professionals dedicated to your shipping success.",
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Quick quote generation and efficient shipment processing from start to finish.",
    },
  ]

  const destinations = [
    { country: "United Kingdom", flag: "🇬🇧" },
    { country: "United States", flag: "🇺🇸" },
    { country: "United Arab Emirates", flag: "🇦🇪" },
    { country: "Saudi Arabia", flag: "🇸🇦" },
    { country: "France", flag: "🇫🇷" },
    { country: "Canada", flag: "🇨🇦" },
    { country: "Germany", flag: "🇩🇪" },
    { country: "Netherlands", flag: "🇳🇱" },
  ]

  const testimonials = [
    {
      name: "Ahmed Hassan",
      company: "Import/Export Business",
      text: "Dexter made sending goods to the UK hassle-free. Their DDP service saved us thousands in unexpected costs.",
      rating: 5,
    },
    {
      name: "Fatima Khan",
      company: "E-commerce Seller",
      text: "Reliable, professional, and transparent. They handle my shipments to the USA with precision every time.",
      rating: 5,
    },
    {
      name: "Muhammad Ali",
      company: "Manufacturing Company",
      text: "Best logistics partner for our international operations. Highly responsive and efficient team.",
      rating: 5,
    },
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 md:py-32"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-balance">
                  Global Logistics Made Simple
                </h1>
                <p className="text-lg opacity-90 mb-8 leading-relaxed">
                  Dexter Logistics connects Pakistan to the world. From household goods to commercial loads, we deliver
                  with complete peace of mind. Our signature DDP service means no hidden costs, no customs tension—just
                  guaranteed, hassle-free delivery.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary">
                    Get a Quote
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="bg-primary-foreground/10 rounded-lg h-96 flex items-center justify-center">
                  <Globe className="h-48 w-48 opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive logistics solutions tailored to your shipping needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                    <Icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Dexter Section */}
        <section id="why-dexter" className="py-16 md:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Dexter?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're committed to making international shipping simple, transparent, and reliable
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyDexter.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="bg-background rounded-lg p-8 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="bg-accent/10 p-3 rounded-lg flex-shrink-0">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section id="destinations" className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Global Destinations</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We serve major destinations across the globe with reliable, efficient service
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {destinations.map((dest, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-3">{dest.flag}</div>
                  <p className="font-semibold text-foreground">{dest.country}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-lg text-muted-foreground">Trusted by businesses across Pakistan and beyond</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-8 bg-background">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-accent text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship Globally?</h2>
            <p className="text-lg opacity-90 mb-8">
              Get a free quote today and experience hassle-free international shipping with Dexter Logistics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Request a Quote
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
