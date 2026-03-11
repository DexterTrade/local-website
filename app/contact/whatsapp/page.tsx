import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppRedirectPageProps = {
	searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function pickFirst(value: string | string[] | undefined) {
	if (Array.isArray(value)) return value[0];
	return value;
}

export default async function WhatsAppRedirectPage({
	searchParams,
}: WhatsAppRedirectPageProps) {
	const resolvedSearchParams = searchParams ? await searchParams : {};
	const message =
		pickFirst(resolvedSearchParams.text) ??
		"Hello Dexter Logistics! I'm interested in booking a shipment.";
	const source = pickFirst(resolvedSearchParams.source) ?? "website";
	const whatsappUrl = buildWhatsAppUrl(message);

	return (
		<main className="min-h-screen bg-background text-foreground">
			<div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
				<h1 className="text-3xl font-bold">Redirecting to WhatsApp</h1>
				<p className="mt-4 text-muted-foreground">
					If nothing happens, continue manually.
				</p>
				<script
					dangerouslySetInnerHTML={{
						__html: `window.location.replace(${JSON.stringify(whatsappUrl)});`,
					}}
				/>
				<Link
					href={whatsappUrl}
					className="mt-8 inline-flex rounded-2xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
				>
					Open WhatsApp
				</Link>
			</div>
		</main>
	);
}
