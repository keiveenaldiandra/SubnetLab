import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16">
      <p className="font-mono text-sm text-net">404</p>
      <h1 className="mt-3 text-3xl font-bold">Halaman tidak ditemukan</h1>
      <p className="mt-3 max-w-xl text-ink/80">Alamat halaman mungkin keliru. Pilih materi dari daftar modul untuk melanjutkan belajar.</p>
      <Link href="/modul" className="mt-6 inline-block rounded bg-net px-5 py-3 font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-net">Kembali ke Modul</Link>
    </main>
  );
}
