
interface SiteFooterProps {
  namaProduk: string;
}

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function SiteFooter({
  namaProduk,
}: SiteFooterProps) {
  const year = await getCurrentYear();

  return (
    <footer className="border-t mt-8">
      <div className="mx-auto max-w-6xl p-4 text-center text-sm text-gray-600">
        &copy; {year} {namaProduk}.
        Semua hak dilindungi.
      </div>
    </footer>
  );
}
