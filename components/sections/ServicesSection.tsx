"use client";

import { Card } from "@/components/ui/card";
import { Plane, Package, Globe, Ban, Ship } from "lucide-react";
import { Metadata } from "next";
import { useCallback } from "react";

export const metadata: Metadata = {
  title: "Our Services | Dexter Logistics",
  description:
    "Comprehensive logistics and freight services — air freight, cargo handling, freight forwarding, and customs clearance.",
};

export default function ServicesSection() {
  // Smooth scroll for Air Freight → Destinations
  const handleScroll = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const services = [
    {
      icon: Plane,
      title: "Air Freight",
      description: "Fast and secure air cargo services for time-sensitive shipments.",
      onClick: () => handleScroll("destinations"),
    },
    {
      icon: Package,
      title: "Cargo Services",
      description: "Comprehensive cargo handling for household and commercial loads.",
    },
    {
      icon: Globe,
      title: "Freight Forwarding",
      description: "Seamless international freight forwarding with full customs support.",
    },
    {
      icon: Ban,
      title: "Customs Clearance",
      description: "Expert customs clearance ensuring compliant and hassle-free processing.",
    },
    {
      icon: Ship,
      title: "Sea Freight",
      description: "Global shipping by sea for large-scale cargo — efficient and affordable.",
      comingSoon: true,
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
        <p className="text-lg text-muted-foreground">
          Comprehensive logistics solutions tailored to your needs
        </p>
      </div>

      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-5
          gap-8 
          max-w-7xl 
          mx-auto 
          px-4
        "
      >
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="relative group h-full">
              <Card
                onClick={s.onClick}
                className={`
                  flex flex-col justify-between
                  p-8 h-full rounded-2xl transition-all duration-300
                  cursor-pointer overflow-hidden
                  ${s.comingSoon ? "opacity-70 pointer-events-none select-none" : ""}
                `}
              >
                <div className="relative z-10">
                  <Icon className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
                  <p className="text-muted-foreground">{s.description}</p>
                </div>

                {/* Hover light effect */}
                {!s.comingSoon && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
                )}
              </Card>

              {/* Overlay for Coming Soon */}
              {s.comingSoon && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-lg font-semibold rounded-2xl">
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
