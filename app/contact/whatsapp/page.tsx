"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function WhatsAppRedirectPage() {
  const searchParams = useSearchParams();
  const message =
    searchParams.get("text") ??
    "Hello Dexter Logistics! I'm interested in booking a shipment.";
  const source = searchParams.get("source") ?? "website";
  const whatsappUrl = buildWhatsAppUrl(message);

  useEffect(() => {
    window.location.replace(whatsappUrl);
  }, [whatsappUrl]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold">Redirecting to WhatsApp</h1>
        <p className="mt-4 text-muted-foreground">
          Preparing your message from {source}. If nothing happens, continue
          manually.
        </p>
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
