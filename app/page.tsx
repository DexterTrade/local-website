import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import AlertStrip from "@/components/alert-strip";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyDexterSection from "@/components/sections/WhyDexterSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <>
      <AlertStrip />
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyDexterSection />
        <DestinationsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
