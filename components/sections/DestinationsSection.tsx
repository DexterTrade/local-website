import { Metadata } from "next";
import React from "react";
import { Card } from "../ui/card";
import { getCountryRates } from "@/lib/rates-store";

export const metadata: Metadata = {
	title: "Global Destinations | Dexter Logistics",
	description:
		"Ship from Pakistan to the UK, USA, UAE, Canada, and more — trusted international delivery.",
};

const destinations = [
	{ country: "United Kingdom", flag: "🇬🇧" },
	{ country: "United States", flag: "🇺🇸" },
	{ country: "United Arab Emirates", flag: "🇦🇪" },
	{ country: "Saudi Arabia", flag: "🇸🇦" },
	{ country: "France", flag: "🇫🇷" },
	{ country: "Canada", flag: "🇨🇦" },
	{ country: "Germany", flag: "🇩🇪" },
	{ country: "Netherlands", flag: "🇳🇱" },
];

const DestinationsSection = async () => {
	const rates = await getCountryRates();
	const ratesMap = new Map(rates.map((rate) => [rate.country, rate]));
	const destinationsWithRates = destinations.map((destination) => ({
		...destination,
		rate: ratesMap.get(destination.country),
	}));

	return (
		<section
			id="destinations"
			className="py-16 md:py-24 bg-background"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Global Destinations
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						We serve major destinations across the globe with
						reliable, efficient service
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{destinationsWithRates.map((dest, index) => (
						<Card
							key={index}
							className="p-6 text-center hover:shadow-lg transition-shadow rounded-2xl"
						>
							<div className="text-4xl mb-3">{dest.flag}</div>
							<p className="font-semibold text-foreground mb-1">
								{dest.country}
							</p>

							<p className="text-sm text-primary font-medium">
								₨{(dest.rate?.rate_per_kg ?? 0).toLocaleString()} / kg
							</p>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default DestinationsSection;
