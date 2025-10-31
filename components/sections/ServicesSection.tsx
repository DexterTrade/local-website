"use client"
import { Card } from "@/components/ui/card";
import { Plane, Package, Globe, Ban } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Dexter Logistics",
  description:
    "Comprehensive logistics and freight services — air freight, cargo handling, and international forwarding.",
};


export default function ServicesSection() {
  // Smooth scroll for Air Freight → Destinations
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const services = [
  { icon: Plane, title: "Air Freight", description: "Fast air cargo delivery.", onClick: () => handleScroll("destinations"), customClass:"cursor-pointer"},
  { icon: Package, title: "Cargo Services", description: "Secure handling and tracking." },
  { icon: Globe, title: "Freight Forwarding", description: "Smooth customs support." },
  { icon: Ban, title: "Customs Clearance", description: "Compliant and hassle-free." },
  {
    icon: Package,
    title: "Sea Cargo (Coming Soon)",
    description: "Efficient ocean freight for bulk shipments — launching soon.",
  },
];

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Comprehensive logistics solutions tailored to your needs
        </p>

        {/* === Feature Tags === */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <span className="bg-primary/10 text-primary text-sm md:text-base font-medium px-4 py-2 rounded-full">
            🚀 7 Day Delivery
          </span>
          <span className="bg-primary/10 text-primary text-sm md:text-base font-medium px-4 py-2 rounded-full">
            📦 No Minimum Quantity
          </span>
        </div>
      </div>

      {/* === Services Grid === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 max-w-7xl mx-auto px-4">
        {services.map((s, i) => {
          const Icon = s.icon;
          const isComingSoon = s.title.toLowerCase().includes("coming soon");

          return (
            <div key={i} className="relative">
              <Card onClick={s.onClick} className={"p-8 h-full hover:shadow-lg transition rounded-2xl flex flex-col justify-between "+ s.customClass} >
                <div>
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground">{s.description}</p>
                </div>
              </Card>

              {/* === Coming Soon Overlay === */}
              {isComingSoon && (
                <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center rounded-2xl text-lg font-semibold">
                  Coming Soon
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
