import React from "react";
import { Package } from "lucide-react";

const seaCargoFeatures = [
	{
		flag: "🇺🇸",
		title: "USA",
		description: "Reliable sea freight routes with consistent transit times.",
	},
	{
		flag: "🇬🇧",
		title: "UK",
		description: "Secure ocean shipping with end-to-end coordination.",
	},
	{
		flag: "🇦🇪",
		title: "UAE",
		description: "Efficient port handling and fast delivery windows.",
	},
	{
		icon: Package,
		title: "LCL / FCL Containers",
		description: "20-foot & 40-foot options for every shipment size.",
	},
];

const SeaCargoSection = () => {
	return (
		<section id="sea-cargo" className="py-16 md:py-24 bg-secondary">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Sea Cargo
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						Dependable ocean freight options tailored to your route
						and volume
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{seaCargoFeatures.map((feature, index) => {
						return (
							<div
								key={index}
								className="bg-background p-8 hover:shadow-md transition-shadow rounded-2xl"
							>
								<div className="flex items-start gap-4">
									<div className="bg-accent/10 p-3 rounded-lg flex-0">
										{feature.flag ? (
											<span className="text-2xl">{feature.flag}</span>
										) : (
											<Package className="h-6 w-6 text-accent" />
										)}
									</div>
									<div>
										<h3 className="text-lg font-semibold mb-2">
											{feature.title}
										</h3>
										<p className="text-muted-foreground text-sm">
											{feature.description}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default SeaCargoSection;
