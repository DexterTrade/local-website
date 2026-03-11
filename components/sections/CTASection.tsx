"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Metadata } from "next";
import { getCookie, sendMetaEvent } from "@/lib/meta-client";
import { COUNTRIES } from "@/lib/countries";
import {
	scrollToShippingForm,
	SHIPPING_FORM_ID,
	SHIPPING_NAME_INPUT_ID,
} from "@/lib/scroll-to-shipping-form";
import { buildInternalWhatsAppRedirectUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
	title: "Contact Dexter Logistics | Book a Shipment",
	description:
		"Ready to ship globally? Get in touch with Dexter Logistics for a fast, free quote.",
};

const CTASection = () => {
	const router = useRouter();
	const [name, setName] = useState("");
	const [whatsAppNumber, setWhatsAppNumber] = useState("");
	const [fromCountry, setFromCountry] = useState("");
	const [destinationCountry, setDestinationCountry] = useState("");
	const [shipmentWeight, setShipmentWeight] = useState("");
	const [shipmentWeightUnit, setShipmentWeightUnit] = useState("kg");
	const [cargoType, setCargoType] = useState("sea");
	const [shipmentType, setShipmentType] = useState("Commercial");
	const [nameError, setNameError] = useState("");
	const [countryError, setCountryError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const nameRegex = /^[A-Za-z\s.'-]+$/;

	const trackContactClick = async () => {
		await sendMetaEvent({
			event_name: "Contact",
			user_data: {
				fbp: getCookie("_fbp"),
				fbc: getCookie("_fbc"),
			},
			custom_data: {
				channel: "whatsapp",
				placement: "cta_section",
			},
		});
	};

	const handleGetShippingPrice = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (isSubmitting) return;

		const trimmedName = name.trim();
		const trimmedWhatsApp = whatsAppNumber.trim();
		let hasError = false;

		if (!nameRegex.test(trimmedName)) {
			setNameError("Name can include letters, spaces, and . ' - characters only.");
			hasError = true;
		} else {
			setNameError("");
		}

		if (fromCountry && destinationCountry && fromCountry === destinationCountry) {
			setCountryError("From Country and Destination Country cannot be the same.");
			hasError = true;
		} else {
			setCountryError("");
		}

		if (hasError) return;

		setIsSubmitting(true);

		const message =
			`Hello Dexter Logistics! I'm interested in booking a shipment.` +
			`\n\nName: ${trimmedName}` +
			`\nWhatsApp Number: ${trimmedWhatsApp}` +
			`\nFrom Country: ${fromCountry}` +
			`\nDestination Country: ${destinationCountry}` +
			`\nShipment Weight: ${shipmentWeight} ${shipmentWeightUnit}` +
			`\nCargo Type: ${cargoType}` +
			`\nShipment Type: ${shipmentType}`;

		try {
			await sendMetaEvent({
				event_name: "Lead",
				user_data: {
					fbp: getCookie("_fbp"),
					fbc: getCookie("_fbc"),
					phone: trimmedWhatsApp,
					first_name: trimmedName,
				},
				custom_data: {
					channel: "whatsapp",
					placement: "cta_bottom_form",
					name: trimmedName,
					whatsapp_number: trimmedWhatsApp,
					from_country: fromCountry,
					destination_country: destinationCountry,
					shipment_weight: shipmentWeight,
					shipment_weight_unit: shipmentWeightUnit,
					cargo_type: cargoType,
					shipment_type: shipmentType,
				},
			});
		} finally {
			setIsSubmitting(false);
		}

		router.push(buildInternalWhatsAppRedirectUrl(message, "cta_bottom_form"));
	};

	return (
		<>
			<section
				id="contact"
				className="py-16 md:py-24 text-foreground/90 bg-background"
			>
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
						Get Your Shipping Price
					</h2>
					<p className="text-lg text-foreground/70 mb-8">
						Fill in the details below and continue to WhatsApp for your quote.
					</p>
					<div
						id={SHIPPING_FORM_ID}
						className="rounded-2xl border border-border/60 bg-card p-6 text-left"
					>
					<h3 className="text-2xl font-semibold text-foreground mb-6">
						Get Shipping Price
					</h3>
					<form onSubmit={handleGetShippingPrice} className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="shipping-name">Name</Label>
							<Input
								id={SHIPPING_NAME_INPUT_ID}
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									if (nameError) setNameError("");
								}}
								placeholder="Enter your name"
								required
							/>
							{nameError ? (
								<p className="text-xs text-destructive">{nameError}</p>
							) : null}
						</div>
						<div className="space-y-2">
							<Label htmlFor="shipping-whatsapp">WhatsApp Number</Label>
							<Input
								id="shipping-whatsapp"
								value={whatsAppNumber}
								onChange={(e) => setWhatsAppNumber(e.target.value)}
								placeholder="+92..."
								inputMode="tel"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="from-country">From Country</Label>
							<select
								id="from-country"
								value={fromCountry}
								onChange={(e) => {
									setFromCountry(e.target.value);
									if (countryError) setCountryError("");
								}}
								className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
								required
							>
								<option value="" disabled>
									Select country
								</option>
								{COUNTRIES.map((country) => (
									<option key={`from-${country}`} value={country}>
										{country}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="destination-country">Destination Country</Label>
							<select
								id="destination-country"
								value={destinationCountry}
								onChange={(e) => {
									setDestinationCountry(e.target.value);
									if (countryError) setCountryError("");
								}}
								className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
								required
							>
								<option value="" disabled>
									Select country
								</option>
								{COUNTRIES.map((country) => (
									<option key={`to-${country}`} value={country}>
										{country}
									</option>
								))}
							</select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="shipment-weight">Shipment Weight</Label>
							<Input
								id="shipment-weight"
								value={shipmentWeight}
								onChange={(e) => setShipmentWeight(e.target.value)}
								placeholder="e.g., 25 kg"
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="shipment-weight-unit">Weight Unit</Label>
							<select
								id="shipment-weight-unit"
								value={shipmentWeightUnit}
								onChange={(e) => setShipmentWeightUnit(e.target.value)}
								className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
								required
							>
								<option value="kg">kg</option>
								<option value="pounds">pounds</option>
							</select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="cargo-type">Cargo Type</Label>
							<select
								id="cargo-type"
								value={cargoType}
								onChange={(e) => setCargoType(e.target.value)}
								className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
								required
							>
								<option value="sea">Sea</option>
								<option value="air">Air</option>
							</select>
						</div>
						{countryError ? (
							<p className="md:col-span-2 text-xs text-destructive">{countryError}</p>
						) : null}
						<div className="space-y-2 md:col-span-2">
							<Label htmlFor="shipment-type">Shipment Type (Commercial / Personal)</Label>
							<select
								id="shipment-type"
								value={shipmentType}
								onChange={(e) => setShipmentType(e.target.value)}
								className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
								required
							>
								<option value="Commercial">Commercial</option>
								<option value="Personal">Personal</option>
							</select>
						</div>
						<div className="md:col-span-2">
							<Button
								type="submit"
								size="lg"
								className="w-full rounded-2xl"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Sending..." : "Get Shipping Price"}
							</Button>
						</div>
					</form>
					</div>
				</div>
			</section>

			<section className="py-16 md:py-24 text-foreground/90 bg-secondary/45">
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
								onClick={() => {
									void sendMetaEvent({
										event_name: "FindLocation",
										user_data: {
											fbp: getCookie("_fbp"),
											fbc: getCookie("_fbc"),
										},
										custom_data: {
											placement: "cta_section",
											action: "open_map",
										},
									});
								}}
							>
								Open Map
							</a>
							<a
								href="https://www.google.com/maps/dir/?api=1&destination=31.5675,74.3653"
								target="_blank"
								rel="noreferrer"
								className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-2 rounded-full shadow-sm hover:opacity-90"
								onClick={() => {
									void sendMetaEvent({
										event_name: "FindLocation",
										user_data: {
											fbp: getCookie("_fbp"),
											fbc: getCookie("_fbc"),
										},
										custom_data: {
											placement: "cta_section",
											action: "directions",
										},
									});
								}}
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
							onClick={() => {
								void trackContactClick();
								scrollToShippingForm();
							}}
						>
							Contact Us
						</Button>
					</div>
				</div>
			</section>
		</>
	);
};

export default CTASection;
