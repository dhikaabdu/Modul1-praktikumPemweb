import type { Metadata } from "next";
import Bagian from "@/components/Bagian";
import DaftarItem from "@/components/DaftarItem";
import { daftarItem } from "@/lib/data";

export const metadata: Metadata = {
  title: "Katalog | Week 3 Studio",
  description: "Cari dan filter semua item berdasarkan kategori.",
};

export default function HalamanKatalog() {
  return (
    <main
      id="konten"
      className="mx-auto w-full max-w-6xl flex-1 px-6 py-12 md:px-10"
    >
      <header className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-700">
          Jelajahi
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
          Katalog item
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Cari dan filter item berdasarkan kategori untuk menemukan yang Anda butuhkan.
        </p>
      </header>

      <Bagian id="daftar" judul="Daftar Item">
        <DaftarItem items={daftarItem} />
      </Bagian>
    </main>
  );
}
