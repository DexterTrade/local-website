import { Card } from "@/components/ui/card";
import { Plane, Package, Globe, Ban } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Dexter Logistics",
  description:
    "Comprehensive logistics and freight services — air freight, cargo handling, and international forwarding.",
};

const services = [
  { icon: Plane, title: "Air Freight", description: "Fast air cargo delivery." },
  { icon: Package, title: "Cargo Services", description: "Secure handling and tracking." },
  { icon: Globe, title: "Freight Forwarding", description: "Smooth customs support." },
  { icon: Ban, title: "Customs Clearance", description: "Compliant and hassle-free." },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-lg text-muted-foreground">
          Comprehensive logistics solutions tailored to your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="p-8 hover:shadow-lg transition rounded-2xl">
              <Icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground">{s.description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
