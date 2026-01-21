import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Dexter Logistics",
  description:
    "Contact Dexter Logistics for quotes, shipping inquiries, and logistics support. We're ready to help with your cargo needs.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
