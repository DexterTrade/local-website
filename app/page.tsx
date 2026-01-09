import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import AlertStrip from "@/components/alert-strip";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyDexterSection from "@/components/sections/WhyDexterSection";
import DestinationsSection from "@/components/sections/DestinationsSection";
import SeaCargoSection from "@/components/sections/SeaCargoSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import FaqSection from "@/components/sections/FaqSection";

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
        <SeaCargoSection />
        <TestimonialsSection />
        <CTASection />
	  <FaqSection />
      </main>
      <Footer />
    </>
  );
}
