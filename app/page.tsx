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
import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dexter Logistics - Global Cargo & Freight Services",
  description:
    "Premier cargo, logistics, and freight-forwarding services from Pakistan to UK, USA, UAE, Saudi Arabia, France, Canada, and Europe. DDP service with no hidden costs.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dexter Logistics - Global Cargo & Freight Services",
    description:
      "Premier cargo, logistics, and freight-forwarding services from Pakistan to UK, USA, UAE, Saudi Arabia, France, Canada, and Europe. DDP service with no hidden costs.",
    url: getSiteUrl(),
    siteName: "Dexter Logistics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dexter Logistics - Global Cargo & Freight Services",
    description:
      "Premier cargo, logistics, and freight-forwarding services from Pakistan to UK, USA, UAE, Saudi Arabia, France, Canada, and Europe. DDP service with no hidden costs.",
  },
};

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
