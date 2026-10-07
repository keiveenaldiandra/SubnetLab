import Link from "next/link";
import { modules } from "@/data/modules";

export function generateStaticParams() {
  return modules.map((modul) => ({
    slug: modul.slug,
  }));
}

type ModulDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function ModulDetailPage({
  params,
}: ModulDetailPageProps) {
  return (
    <main>
      <Link href="/modul">← Kembali ke Modul</Link>

      <h1>Detail Modul</h1>

      <p>
        Modul yang dipilih: <strong>{params.slug}</strong>
      </p>
    </main>
  );
}