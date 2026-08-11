import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://thedaaluminium.com'),
  title: "THEDA Aluminium Ltd — Premium Roofing & Construction Solutions",
  description: "Top-quality roofing sheets, structural roof designs, and maintenance services for residential, commercial, and industrial projects across Nigeria.",
  keywords: "roofing, aluminium, steel structure, construction, Nigeria, Kaduna, Abuja, step-tile, long-span",
  openGraph: {
    title: "THEDA Aluminium Ltd — Premium Roofing & Construction Solutions",
    description: "Top-quality roofing sheets, structural roof designs, and maintenance services for residential, commercial, and industrial projects across Nigeria.",
    url: 'https://thedaaluminium.com',
    siteName: 'THEDA Aluminium Ltd',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541888081622-155e81f1e914?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'THEDA Aluminium Ltd Structural Roofing',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || '';

  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
      {gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
