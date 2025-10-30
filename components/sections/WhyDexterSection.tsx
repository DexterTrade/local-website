import React from "react";
import {
	CheckCircle,
	Shield,
	Clock,
	Zap,
	TrendingUp,
	Users,
} from "lucide-react";

const whyDexter = [
	{
		icon: Shield,
		title: "DDP Service",
		description:
			"Delivered Duty Paid - all duties pre-handled with no hidden costs or customs tension.",
	},
	{
		icon: Clock,
		title: "Reliable Delivery",
		description:
			"Guaranteed on-time delivery with real-time tracking and professional handling.",
	},
	{
		icon: CheckCircle,
		title: "Complete Peace of Mind",
		description:
			"Full insurance coverage and secure handling of all cargo types and values.",
	},
	{
		icon: TrendingUp,
		title: "Competitive Pricing",
		description:
			"Transparent pricing with no surprises - what you see is what you pay.",
	},
	{
		icon: Users,
		title: "Expert Team",
		description:
			"Experienced logistics professionals dedicated to your shipping success.",
	},
	{
		icon: Zap,
		title: "Fast Processing",
		description:
			"Quick quote generation and efficient shipment processing from start to finish.",
	},
];
const WhyDexterSection = () => {
	return (
		<section
			id="why-dexter"
			className="py-16 md:py-24 bg-secondary"
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Why Choose Dexter?
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						We're committed to making international shipping simple,
						transparent, and reliable
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{whyDexter.map((feature, index) => {
						const Icon = feature.icon;
						return (
							<div
								key={index}
								className="bg-background p-8 hover:shadow-md transition-shadow rounded-2xl"
							>
								<div className="flex items-start gap-4">
									<div className="bg-accent/10 p-3 rounded-lg flex-0">
										<Icon className="h-6 w-6 text-accent" />
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

export default WhyDexterSection;
