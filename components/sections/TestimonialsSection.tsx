import { Metadata } from "next";
import { Card } from "../ui/card";

export const metadata: Metadata = {
	title: "Client Testimonials | Dexter Logistics",
	description:
		"See what our clients say about our reliable international shipping and DDP service.",
};

const testimonials = [
	{
		name: "Ahmed Hassan",
		company: "Import/Export Business",
		text: "Dexter made sending goods to the UK hassle-free. Their DDP service saved us thousands in unexpected costs.",
		rating: 5,
	},
	{
		name: "Fatima Khan",
		company: "E-commerce Seller",
		text: "Reliable, professional, and transparent. They handle my shipments to the USA with precision every time.",
		rating: 5,
	},
	{
		name: "Muhammad Ali",
		company: "Manufacturing Company",
		text: "Best logistics partner for our international operations. Highly responsive and efficient team.",
		rating: 5,
	},
];

const TestimonialsSection = () => {
	return (
		<section className="py-16 md:py-24 bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						What Our Clients Say
					</h2>
					<p className="text-lg text-muted-foreground">
						Trusted by businesses across Pakistan and beyond
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{testimonials.map((testimonial, index) => (
						<Card
							key={index}
							className="p-8 bg-background rounded-2xl"
						>
							<div className="flex gap-1 mb-4">
								{[...Array(testimonial.rating)].map((_, i) => (
									<span
										key={i}
										className="text-accent text-lg"
									>
										★
									</span>
								))}
							</div>
							<p className="text-muted-foreground mb-6 italic">
								"{testimonial.text}"
							</p>
							<div>
								<p className="font-semibold">
									{testimonial.name}
								</p>
								<p className="text-sm text-muted-foreground">
									{testimonial.company}
								</p>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default TestimonialsSection;
