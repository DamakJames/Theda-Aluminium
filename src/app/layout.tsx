import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL('https://thedaaluminium.com'),
  title: "THEDA Aluminium Ltd — Premium Roofing & Construction Solutions",
  description: "Top-quality roofing sheets, structural roof designs, and maintenance services for residential, commercial, and industrial projects across Nigeria.",
  keywords: [
    "roofing company Nigeria", "aluminium roofing sheets", "steel roof structures", "roofing contractors Kaduna", 
    "roofing contractors Abuja", "step-tile aluminium", "long-span aluminium", "metcopo roofing", 
    "stone coated roof tiles", "industrial roofing", "warehouse roofing", "residential roofing", 
    "roof maintenance Nigeria", "roof installation services", "THEDA aluminium", "best roofing company in Nigeria",
    "affordable roofing sheets", "structural steel fabrication", "roofing quotes Abuja", "roofing quotes Kaduna"
  ],
  openGraph: {
    title: "THEDA Aluminium Ltd — Premium Roofing & Construction Solutions",
    description: "Top-quality roofing sheets, structural roof designs, and maintenance services for residential, commercial, and industrial projects across Nigeria.",
    url: 'https://thedaaluminium.com',
    siteName: 'THEDA Aluminium Ltd',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'THEDA Aluminium Ltd Structural Roofing',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "THEDA Aluminium Ltd",
  "image": "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  "@id": "https://thedaaluminium.com",
  "url": "https://thedaaluminium.com",
  "telephone": "+2348033316873",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "No. 19 Park Drive, Opposite Finetex, Kakuri Industrial Layout",
    "addressLocality": "Kaduna",
    "addressCountry": "NG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 10.4907,
    "longitude": 7.4241
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "08:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://facebook.com/thedaaluminium",
    "https://instagram.com/thedaaluminium"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
