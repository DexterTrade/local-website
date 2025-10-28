import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Award, Users, Globe, TrendingUp } from "lucide-react"

export default function About() {
  const stats = [
    { icon: Globe, label: "Countries Served", value: "150+" },
    { icon: Users, label: "Active Clients", value: "5,000+" },
    { icon: TrendingUp, label: "Annual Growth", value: "35%" },
    { icon: Award, label: "Industry Awards", value: "12" },
  ]

  const team = [
    {
      name: "John Smith",
      role: "CEO & Founder",
      bio: "With 25+ years in logistics, John founded LogisticsPro to revolutionize the industry.",
    },
    {
      name: "Maria Garcia",
      role: "Chief Operations Officer",
      bio: "Leading our operations team with expertise in supply chain optimization.",
    },
    {
      name: "David Lee",
      role: "Head of Technology",
      bio: "Driving innovation with cutting-edge logistics technology solutions.",
    },
    {
      name: "Sarah Williams",
      role: "Customer Success Director",
      bio: "Ensuring every client receives exceptional service and support.",
    },
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About LogisticsPro</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              Leading the logistics industry with innovation, reliability, and customer-first solutions
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Founded in 2010, LogisticsPro emerged from a simple vision: to transform the logistics industry through
                innovation and customer-centric solutions. What started as a small regional carrier has grown into a
                global logistics powerhouse serving over 5,000 clients across 150 countries.
              </p>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Our journey has been marked by continuous innovation, strategic partnerships, and an unwavering
                commitment to excellence. We've invested heavily in technology, infrastructure, and talent to ensure our
                clients receive the best possible service.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, LogisticsPro stands as an industry leader, recognized for our reliability, innovation, and
                customer satisfaction. We continue to evolve and adapt to meet the changing needs of the global supply
                chain.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8 bg-secondary">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To provide innovative, reliable, and cost-effective logistics solutions that empower businesses to
                  grow and succeed in the global marketplace.
                </p>
              </Card>
              <Card className="p-8 bg-secondary">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the world's most trusted logistics partner, known for excellence, innovation, and customer
                  satisfaction.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">By The Numbers</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <Icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <p className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
              <p className="text-lg text-muted-foreground">Experienced professionals dedicated to your success</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="p-6 text-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-secondary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Reliability</h3>
                <p className="text-muted-foreground">
                  We deliver on our promises, every single time. Our 99.2% on-time delivery rate speaks to our
                  commitment.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously invest in technology and processes to stay ahead of industry trends.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
                <p className="text-muted-foreground">
                  Your success is our success. We tailor solutions to meet your unique business needs.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                <p className="text-muted-foreground">
                  We operate with transparency and honesty in all our business relationships.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
