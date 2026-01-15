import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dexter Logistics - Global Cargo & Freight Services",
  description:
    "Premier cargo, logistics, and freight-forwarding services from Pakistan to UK, USA, UAE, Saudi Arabia, France, Canada, and Europe. DDP service with no hidden costs.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
          <a
            href="https://wa.me/923328884396?text=Hello%20Dexter%20Logistics!%20I%27m%20interested%20in%20booking%20a%20shipment."
            target="_blank"
            rel="noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/60"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="h-7 w-7"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16.004 2.99C9.376 2.99 4 8.366 4 14.994c0 2.64.868 5.066 2.334 7.04L4 30l8.14-2.312a11.924 11.924 0 0 0 3.864.62c6.628 0 12.004-5.376 12.004-12.004S22.632 2.99 16.004 2.99zm0 21.516a9.44 9.44 0 0 1-4.79-1.312l-.344-.204-4.83 1.37 1.372-4.708-.224-.362a9.415 9.415 0 0 1-1.46-5.206c0-5.204 4.23-9.436 9.436-9.436 5.206 0 9.436 4.23 9.436 9.436s-4.23 9.422-9.436 9.422zm5.464-6.94c-.298-.148-1.77-.874-2.042-.972-.274-.1-.474-.148-.67.15-.2.3-.77.972-.944 1.172-.174.2-.348.224-.646.076-.298-.148-1.258-.464-2.394-1.478-.886-.79-1.482-1.77-1.656-2.066-.172-.298-.018-.458.13-.606.134-.134.298-.348.446-.522.148-.174.198-.298.298-.498.1-.2.05-.374-.024-.522-.074-.148-.67-1.62-.92-2.224-.242-.582-.488-.504-.67-.514l-.57-.01a1.1 1.1 0 0 0-.8.374c-.274.3-1.044 1.02-1.044 2.486 0 1.466 1.07 2.882 1.22 3.082.148.2 2.108 3.216 5.106 4.514.714.308 1.27.492 1.704.63.716.226 1.368.194 1.884.118.574-.086 1.77-.722 2.022-1.42.25-.698.25-1.294.174-1.42-.074-.126-.274-.2-.572-.348z" />
            </svg>
          </a>
        </ThemeProvider>
      </body>
    </html>
  );
}
