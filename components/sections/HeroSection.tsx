"use client";
import { Button } from "@/components/ui/button";
import LightRays from "@/components/effects/SpotlightBackgroung";
import Magnet from "@/components/effects/MagnetResolver";
import TextType from "@/components/effects/TextTyping";
import LogoLoop from "@/components/effects/FlagLoop";
import ReactCountryFlag from "react-country-flag";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Logistics Made Simple | Dexter Logistics",
  description:
    "Ship worldwide with Dexter Logistics. DDP shipping, no hidden costs, and guaranteed peace of mind.",
};

const countryCodes = ["US", "GB", "FR", "DE", "IN", "JP", "CN", "ZA", "BR", "CA"];

export default function HeroSection() {
  const techLogos = countryCodes.map((code) => ({
    node: (
      <ReactCountryFlag
        countryCode={code}
        svg
        style={{ fontSize: "1.5em", boxShadow: "0 0 8px rgba(0,0,0,0.15)" }}
        title={code}
      />
    ),
  }));

  return (
    <section id="home" className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <TextType
                text={["Global Logistics Made Simple!"]}
                typingSpeed={95}
                pauseDuration={3500}
                showCursor
                cursorCharacter="|"
              />
            </h1>

            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Dexter Logistics connects Pakistan to the world. From household goods
              to commercial loads, we deliver with complete peace of mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Magnet padding={200} magnetStrength={1}>
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-2xl"
                  onClick={() =>
                    window.open(
                      "https://wa.me/923326135002?text=Hello%20Dexter%20Logistics!%20I%27m%20interested%20in%20booking%20a%20shipment.",
                      "_blank"
                    )
                  }
                >
                  Book Now
                </Button>
              </Magnet>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-secondary-foreground"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="bg-primary-foreground/10 rounded-lg h-96 flex items-center justify-center">
              <img
                src="/banner-image-2.jpeg"
                alt="Global logistics illustration"
                className="w-full h-full opacity-40 rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20">
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover
          scaleOnHover
        />
      </div>
    </section>
  );
}
