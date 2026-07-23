import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://mon-portfolio-five-iota.vercel.app";
const TITLE = "François Codé Diene — Développeur Full-Stack | Francis Tech";
const DESCRIPTION =
  "Développeur full-stack à Dakar. Je conçois des plateformes web modernes avec Next.js, TypeScript, Prisma et PostgreSQL — TerangaLearn, SunuGestion, icagi.sn.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "développeur full-stack Dakar",
    "développeur Next.js Sénégal",
    "François Codé Diene",
    "Francis Tech",
    "création site web Dakar",
    "TypeScript",
    "Supabase",
  ],
  authors: [{ name: "François Codé Diene" }],
  creator: "François Codé Diene",
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: SITE_URL,
    siteName: "François Codé Diene",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
