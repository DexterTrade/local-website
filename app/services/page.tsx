import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Truck, Ship, Package, Warehouse, BarChart3, Clock } from "lucide-react"

export default function Services() {
  const serviceDetails = [
    {
      id: "air",
      icon: Package,
      title: "Air Freight",
      description: "Fast and reliable air cargo services for time-sensitive shipments",
      features: [
        "Express delivery within 24-48 hours",
        "Real-time tracking and updates",
        "Full insurance coverage",
        "Customs clearance assistance",
        "Door-to-door service",
        "Competitive rates for volume shipments",
      ],
      benefits: "Perfect for urgent shipments, perishable goods, and high-value items.",
    },
    {
      id: "sea",
      icon: Ship,
      title: "Sea Freight",
      description: "Cost-effective international shipping with flexible options",
      features: [
        "Full Container Load (FCL) services",
        "Less than Container Load (LCL) options",
        "Competitive international rates",
        "Port-to-port and door-to-door delivery",
        "Comprehensive documentation",
        "Flexible scheduling",
      ],
      benefits: "Ideal for large shipments, heavy cargo, and cost-sensitive routes.",
    },
    {
      id: "land",
      icon: Truck,
      title: "Land Transport",
      description: "Reliable ground transportation across the country",
      features: [
        "Domestic and cross-border trucking",
        "Fleet of modern vehicles",
        "Real-time GPS tracking",
        "Temperature-controlled options",
        "Flexible scheduling",
        "Dedicated or shared services",
      ],
      benefits: "Best for regional deliveries, last-mile solutions, and time-critical shipments.",
    },
    {
      id: "warehouse",
      icon: Warehouse,
      title: "Warehousing & Storage",
      description: "Secure storage and inventory management solutions",
      features: [
        "Climate-controlled facilities",
        "Inventory management systems",
        "Pick and pack services",
        "Cross-docking operations",
        "24/7 security monitoring",
        "Flexible lease terms",
      ],
      benefits: "Optimize your supply chain with our state-of-the-art storage facilities.",
    },
  ]

  const whyChoose = [
    {
      icon: BarChart3,
      title: "Cost Optimization",
      description: "Competitive rates without compromising on quality or service.",
    },
    {
      icon: Clock,
      title: "Reliability",
      description: "99.2% on-time delivery rate with proven track record.",
    },
    {
      icon: Package,
      title: "Full Coverage",
      description: "Comprehensive insurance and secure handling of all cargo.",
    },
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Comprehensive logistics solutions designed to meet your unique business requirements
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {serviceDetails.map((service, index) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.id}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:grid-flow-dense" : ""}`}
                  >
                    <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl font-bold">{service.title}</h2>
                      </div>
                      <p className="text-lg text-muted-foreground mb-6">{service.description}</p>

                      <div className="mb-8">
                        <h3 className="font-semibold mb-4">Key Features:</h3>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-accent mt-1">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-muted-foreground italic mb-6">{service.benefits}</p>
                      <Button>Get Quote for {service.title}</Button>
                    </div>

                    <div
                      className={`bg-secondary rounded-lg h-80 flex items-center justify-center ${index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}
                    >
                      <Icon className="h-40 w-40 opacity-20" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LogisticsPro?</h2>
              <p className="text-lg text-muted-foreground">Industry-leading expertise and customer commitment</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyChoose.map((item, index) => {
                const Icon = item.icon
                return (
                  <Card key={index} className="p-8 text-center">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Custom Solution?</h2>
            <p className="text-lg opacity-90 mb-8">Contact our team to discuss your specific logistics requirements</p>
            <Button size="lg" variant="secondary">
              Contact Us
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
