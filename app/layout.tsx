import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ExtraCursor from "@/app/components/ExtraCursor";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import SideLabels from "@/app/components/SideLabels";
import { siteMeta, socialLinks } from "@/app/data";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "greek"],
  display: "swap",
});

const OG_IMAGE =
  "https://city-talks.gr/wp-content/uploads/2024/03/city-talks-001-1.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: "%s - City Talks",
  },
  description: siteMeta.description,
  applicationName: siteMeta.name,
  authors: [{ name: siteMeta.name }],
  keywords: [
    "City Talks",
    "Δήμοι",
    "Τοπική Αυτοδιοίκηση",
    "Smart Cities",
    "Έξυπνες Πόλεις",
    "Local Administration",
  ],
  openGraph: {
    type: "website",
    locale: "el_GR",
    url: siteMeta.url,
    siteName: siteMeta.name,
    title: siteMeta.title,
    description: siteMeta.description,
    images: [
      {
        url: OG_IMAGE,
        width: 2080,
        height: 1123,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
    images: [OG_IMAGE],
  },
  alternates: {
    canonical: siteMeta.url,
  },
};

/**
 * Site-wide JSON-LD graph: an `Organization` describing City Talks as the
 * publisher, plus a `WebSite` with a `SearchAction` hint. Per-article
 * `Article` schema is emitted inside `app/articles/[slug]/page.tsx`.
 *
 * Keys are kept flat and safe to JSON.stringify — injecting via a single
 * server-rendered <script> tag is the conventional way to ship JSON-LD in
 * a Next.js App Router Server Component.
 */
const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteMeta.url}#organization`,
      name: siteMeta.name,
      url: siteMeta.url,
      email: siteMeta.email,
      description: siteMeta.description,
      logo: {
        "@type": "ImageObject",
        url: `${siteMeta.url}/icon`,
      },
      sameAs: socialLinks.map((s) => s.href),
    },
    {
      "@type": "WebSite",
      "@id": `${siteMeta.url}#website`,
      url: siteMeta.url,
      name: siteMeta.name,
      description: siteMeta.greekTagline,
      inLanguage: "el",
      publisher: { "@id": `${siteMeta.url}#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[color:var(--ct-bg)]">
        <ExtraCursor />
        <Header />
        <SideLabels />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger -- Static JSON-LD generated from our own siteMeta constants
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </body>
    </html>
  );
}
