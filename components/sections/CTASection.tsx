"use client"

import { Button } from "../ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact Dexter Logistics | Book a Shipment",
	description:
		"Ready to ship globally? Get in touch with Dexter Logistics for a fast, free quote.",
};

const CTASection = () => {
	return (
		<section
			id="contact"
			className="py-16 md:py-24 bg-card text-foreground/90"
		>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
					Ready to Ship Globally?
				</h2>
				<p className="text-lg text-foreground/70 mb-8">
					Get a free quote today and experience hassle-free
					international shipping with Dexter Logistics.
				</p>
				<div className="flex flex-col sm:flex-row justify-center">
					<Button
						size="lg"
						variant="outline"
						className="border-foreground/40 text-foreground hover:bg-foreground/10 bg-transparent"
						onClick={() =>
							window.open(
								"https://wa.me/923326135002?text=Hello%20Dexter%20Logistics!%20I%27m%20interested%20in%20booking%20a%20shipment.",
								"_blank"
							)
						}
					>
						Contact Us
					</Button>
				</div>
			</div>
		</section>
	);
};

export default CTASection;
