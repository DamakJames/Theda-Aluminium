import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartDrawer from "../components/CartDrawer";
import AIChat from "../components/AIChat";
import { CartProvider } from "../context/CartContext";

export const metadata: Metadata = {
  title: "Pathfinder Paints — Nigeria's No.1 Paints, Tools & Finishing Experts",
  description: "Premium quality paints, professional tools, high quality working and production materials for painters, contractors, and creators across Nigeria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <AIChat />
        </CartProvider>
      </body>
    </html>
  );
}
