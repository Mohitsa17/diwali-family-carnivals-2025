import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RegistrationProvider } from "@/contexts/RegistrationContext";
import { RegistrationModal } from "@/components/RegistrationModal";
import { FloatingRegisterButton } from "@/components/FloatingRegisterButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Diwali Family Carnivals Indore 2025",
  description: "Join us for an amazing Diwali Family Carnival in Indore with contests, food, and festivities for the whole family!",
  keywords: "Diwali, Indore, Family Carnival, Contests, Super Mom, Cutest Baby, Senior Citizens",
  openGraph: {
    title: "Diwali Family Carnivals Indore 2025",
    description: "Join us for an amazing Diwali Family Carnival in Indore with contests, food, and festivities for the whole family!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <RegistrationProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <RegistrationModal />
          <FloatingRegisterButton />
        </RegistrationProvider>
      </body>
    </html>
  );
}
