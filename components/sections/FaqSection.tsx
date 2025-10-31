"use client";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "FAQs | Dexter Logistics",
	description:
		"Find answers to the most common questions about Dexter Logistics services, pricing, and shipping process.",
};

const faqs = [
	{
		question: "What is DDP shipping?",
		answer: "DDP (Delivered Duty Paid) means we handle all customs duties, taxes, and documentation for you. You pay a fixed price with no hidden charges.",
	},
	{
		question: "How can I track my shipment?",
		answer: "Once your shipment is booked, you’ll receive a tracking number and a live tracking link via WhatsApp or email.",
	},
	{
		question: "Do you offer air and sea freight both?",
		answer: "Yes! We provide both air freight for fast delivery and sea freight for large-volume or cost-effective shipments.",
	},
	{
		question: "How long does it take to deliver internationally?",
		answer: "Delivery times depend on the destination and shipping method. Typically, air freight takes 5–7 days and sea freight 25–35 days.",
	},
	{
		question: "Will our cargo be insured ?",
		answer: "Cargo sent internationally generally isnt insured however if a customer insist we do provide third part insurance polices.",
	},
  {
		question: "What if my parcel gets lost during freight forwarding?",
		answer: "We try our best to keep our customers stuff safe during the whole procedure. However if any mishaps happen £70 credit note will be issued to the customer which can be claimed during future shipments.",
	},
];

export default function FaqSection() {
	return (
		<section
			id="faq"
			className="py-16 md:py-24 bg-secondary"
		>
			<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						Frequently Asked Questions
					</h2>
					<p className="text-lg text-muted-foreground">
						Quick answers to common questions about our logistics
						services.
					</p>
				</div>

				<Accordion
					type="single"
					collapsible
					className="w-full"
				>
					{faqs.map((faq, index) => (
						<AccordionItem
							key={index}
							value={`faq-${index}`}
							className="border-b border-border"
						>
							<AccordionTrigger className="text-left text-lg font-medium text-foreground py-4">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
