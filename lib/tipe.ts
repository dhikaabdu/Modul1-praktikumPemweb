export type Kategori = "energi" | "lingkungan" | "kampus" | "air" | "transportasi";

export interface Item {
  id: number;
  judul: string;
  kategori: Kategori;
  deskripsi: string;
  tersedia: boolean;
  gambar?: string;
}
