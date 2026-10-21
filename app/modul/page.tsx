import Link from "next/link";
import { modules } from "@/data/modules";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Modul Belajar | SubnetLab",
  description: "Belajar IPv4, subnet mask, CIDR, perhitungan subnet, dan VLSM melalui contoh dan latihan.",
};

export default function ModulListPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-4xl font-bold tracking-tight">Modul Belajar</h1>
      <p className="mt-3 max-w-xl text-ink/80">
        Pelajari dasar jaringan secara bertahap, lalu coba langsung di kalkulator.
      </p>
      <p className="mb-8 mt-3 text-sm text-ink/70">{modules.length} modul · {modules.reduce((total, modul) => total + modul.duration, 0)} menit baca · Mulai dari dasar, lanjutkan sesuai urutan.</p>
      <ul className="grid gap-5 sm:grid-cols-2">
        {modules.map((m, i) => (
          <li key={m.slug}>
            <Link
              href={`/modul/${m.slug}`}
              className="group flex h-full flex-col rounded border border-line bg-white p-5 transition-colors hover:border-net focus-visible:outline focus-visible:outline-2 focus-visible:outline-net"
            >
              <span className="font-mono text-sm text-net">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-2 text-xl font-semibold">{m.title}</span>
              <span className="mt-1 flex-1 text-ink/70">{m.summary}</span>
              <span className="mt-3 text-xs text-ink/60">{m.duration} menit baca · Contoh dan latihan</span>
              <span className="mt-4 text-sm font-medium text-net group-hover:underline">Baca modul →</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
