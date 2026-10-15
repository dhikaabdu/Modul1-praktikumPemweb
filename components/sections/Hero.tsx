import Link from "next/link";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-6 py-16 text-white shadow-xl sm:px-10 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
          Week 3 Studio
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          Temukan solusi kecil untuk perubahan yang lebih besar.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          Jelajahi berbagai item inovatif di bidang energi, lingkungan, air,
          dan transportasi untuk membantu membangun masa depan yang lebih baik.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/katalog"
            className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Jelajahi katalog
          </Link>
          <a
            href="#item-terbaru"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Lihat item terbaru
          </a>
        </div>
      </div>
    </section>
  );
}
