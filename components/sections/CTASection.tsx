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
			className="py-16 md:py-24 text-foreground/90 bg-secondary"
		>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
					Ready to Ship Globally?
				</h2>
				<p className="text-lg text-foreground/70 mb-8">
					Get a free quote today and experience hassle-free
					international shipping with Dexter Logistics.
				</p>
				<div className="mb-8 overflow-hidden rounded-2xl border border-border/60 relative">
					<iframe
						title="Dexter Logistics Location"
						src="https://www.google.com/maps?q=31.5675,74.3653&output=embed"
						className="h-72 w-full"
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					/>
					<div className="absolute top-3 right-3 flex gap-2">
						<a
							href="https://www.google.com/maps?q=31.5675,74.3653"
							target="_blank"
							rel="noreferrer"
							className="bg-background/90 text-foreground text-xs font-semibold px-3 py-2 rounded-full shadow-sm hover:bg-background"
						>
							Open Map
						</a>
						<a
							href="https://www.google.com/maps/dir/?api=1&destination=31.5675,74.3653"
							target="_blank"
							rel="noreferrer"
							className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-2 rounded-full shadow-sm hover:opacity-90"
						>
							Directions
						</a>
					</div>
				</div>
				<div className="flex flex-col sm:flex-row justify-center">
					<Button
						size="lg"
						variant="outline"
						className="rounded-2xl border-foreground/40 text-foreground hover:bg-foreground/10 bg-transparent"
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
