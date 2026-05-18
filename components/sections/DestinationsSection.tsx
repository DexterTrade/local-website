import { Metadata } from "next";
import React from "react";
import { Card } from "../ui/card";
import { createClient } from "@supabase/supabase-js";
import type { Country } from "@/lib/supabase";

export const metadata: Metadata = {
	title: "Global Destinations | Dexter Logistics",
	description:
		"Ship from Pakistan to the UK, USA, UAE, Canada, and more — trusted international delivery.",
};

const codeToEmoji = (code: string) => {
	if (!code || code.length !== 2) return "🌍";
	return code
		.toUpperCase()
		.split("")
		.map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
		.join("");
};

const getDisplayName = (code: string) => {
	if (!code || code.length !== 2) return code ?? "";
	try {
		return new Intl.DisplayNames(["en"], { type: "region" }).of(code.toUpperCase()) ?? code;
	} catch {
		return code;
	}
};

const DestinationsSection = async () => {
	const supabase = createClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);

	const { data } = await supabase
		.from("countries")
		.select("*")
		.eq("is_active", true)
		.order("id");

	const countries = (data ?? []) as Country[];

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
					{countries.map((dest) => {
						const code = dest.country_name ?? "";
						const isCode = code.length === 2;
						return (
							<Card
								key={dest.id}
								className="p-6 text-center hover:shadow-lg transition-shadow rounded-2xl"
							>
								<div className="text-4xl mb-3">
									{isCode ? codeToEmoji(code) : "🌍"}
								</div>
								<p className="font-semibold text-foreground mb-1">
									{isCode ? getDisplayName(code) : code}
								</p>
								<p className="text-sm text-primary font-medium">
									₨{(dest.rates ?? 0).toLocaleString()} / kg
								</p>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default DestinationsSection;
