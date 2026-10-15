
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Week 3 Studio",
  description: "A polished landing page built with Next.js and Tailwind CSS.",
};

const tautan = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:p-2"
        >
          Lewati ke konten utama
        </a>

        <SiteHeader
          namaProduk="Week 3 Studio"
          tautan={tautan}
        />

        {children}

        <SiteFooter namaProduk="Week 3 Studio" />
      </body>
    </html>
  );
}
