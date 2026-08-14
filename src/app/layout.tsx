import type { Metadata } from "next";
import { italiana, cormorant, workSans, jetbrainsMono } from "./fonts";
import { SITE } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://wellnesscollectiveak.com"),
  title: {
    default: `${SITE.name} — Alaska's directory of wellness practitioners`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.tagline,
  openGraph: {
    title: `${SITE.name} — Alaska's directory of wellness practitioners`,
    description: SITE.tagline,
    siteName: SITE.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${italiana.variable} ${cormorant.variable} ${workSans.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
