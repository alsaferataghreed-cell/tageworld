import type { Metadata } from "next";
import { Tajawal, Inter } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TAG eWorld | دليل الروابط السريعة",
  description: "دليلك السريع والشامل لكافة روابط وخدمات ومنتجات DXN و eWorld مع تخصيص الروابط الذكية",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${inter.variable}`}>
      <body className="bg-[#F8FAFC] text-[#0A192F] antialiased selection:bg-[#0F2557] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
