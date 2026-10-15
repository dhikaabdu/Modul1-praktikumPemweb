import type { Metadata } from "next";
import ItemTerbaru from "@/components/ItemTerbaru";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Beranda | Week 3 Studio",
  description: "Jelajahi solusi inovatif untuk masa depan yang lebih baik.",
};

export default function Home() {
  return (
    <main id="konten" className="w-full flex-1">
      <div className="mx-auto max-w-6xl px-6 pt-8 md:px-10">
        <Hero />
      </div>

      <section
        id="item-terbaru"
        className="mx-auto max-w-6xl px-6 py-16 md:px-10"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-700">
              Pilihan untuk Anda
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Item terbaru
            </h2>
          </div>
          <a
            href="/katalog"
            className="text-sm font-semibold text-cyan-800 underline-offset-4 hover:underline"
          >
            Lihat semua item
          </a>
        </div>
        <ItemTerbaru />
      </section>

      <Contact />
    </main>
  );
}
