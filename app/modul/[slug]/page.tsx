import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { modules } from "@/data/modules";

export const dynamicParams = false;

export function generateStaticParams() {
  return modules.map(({ slug }) => ({ slug }));
}

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const modul = modules.find(({ slug }) => slug === params.slug);
  return {
    title: modul ? `${modul.title} | SubnetLab` : "Modul tidak ditemukan | SubnetLab",
    description: modul?.summary,
  };
}

export default function ModulDetailPage({ params }: Props) {
  const index = modules.findIndex(({ slug }) => slug === params.slug);
  if (index === -1) notFound();

  const modul = modules[index];
  const previous = modules[index - 1];
  const next = modules[index + 1];
  const linkClass = "rounded text-net underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-net";

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <Link href="/modul" className={linkClass}>← Kembali ke Modul</Link>
      <header className="mb-10 mt-8 max-w-3xl">
        <p className="mb-3 text-sm font-medium text-net">Modul {index + 1} dari {modules.length} · {modul.duration} menit baca</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{modul.title}</h1>
        <p className="mt-3 text-lg text-ink/80">{modul.summary}</p>
      </header>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <article className="min-w-0 space-y-8 leading-7">
          <section aria-labelledby="tujuan" className="rounded-lg border border-line bg-white p-5 sm:p-6">
            <h2 id="tujuan" className="text-xl font-semibold">Tujuan belajar</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-ink/80">
              {modul.objectives.map((objective) => <li key={objective}>{objective}</li>)}
            </ul>
          </section>

          {modul.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id}>
              <h2 id={section.id} className="scroll-mt-6 text-2xl font-semibold tracking-tight">{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 text-ink/80">{paragraph}</p>)}
              {section.steps && (
                <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink/80">
                  {section.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              )}
            </section>
          ))}

          <section aria-labelledby="contoh" className="rounded-lg border border-line bg-white p-5 sm:p-6">
            <h2 id="contoh" className="text-xl font-semibold">{modul.example.title}</h2>
            <p className="mb-4 mt-2 text-ink/80">{modul.example.description}</p>
            <dl className="divide-y divide-line border-y border-line">
              {modul.example.rows.map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-2 sm:gap-4">
                  <dt className="text-sm text-ink/70">{label}</dt>
                  <dd className="min-w-0 break-words font-mono text-sm font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
            <Link href="/" className={`mt-5 inline-block font-medium ${linkClass}`}>Coba di kalkulator →</Link>
          </section>

          <section aria-labelledby="latihan" className="rounded-lg border border-net/30 bg-net/5 p-5 sm:p-6">
            <h2 id="latihan" className="text-xl font-semibold">Latihan mandiri</h2>
            <p className="mt-3">{modul.exercise.question}</p>
            <details className="mt-4">
              <summary className="cursor-pointer rounded font-medium text-net focus-visible:outline focus-visible:outline-2 focus-visible:outline-net">Lihat pembahasan</summary>
              <p className="mt-3 border-t border-net/20 pt-3 text-ink/80">{modul.exercise.answer}</p>
            </details>
          </section>

          <section aria-labelledby="referensi">
            <h2 id="referensi" className="text-lg font-semibold">Bacaan lanjutan</h2>
            <ul className="mt-2 space-y-2 text-sm">
              {modul.references.map((reference) => <li key={reference.href}><a href={reference.href} className={linkClass}>{reference.title}</a></li>)}
            </ul>
          </section>
        </article>

        <aside className="order-first rounded-lg border border-line bg-white p-5 lg:order-none lg:sticky lg:top-6">
          <nav aria-label="Daftar isi modul">
            <h2 className="font-semibold">Dalam modul ini</h2>
            <ol className="mt-3 space-y-3 text-sm">
              {modul.sections.map((section) => <li key={section.id}><a href={`#${section.id}`} className={linkClass}>{section.title}</a></li>)}
              <li><a href="#contoh" className={linkClass}>Contoh perhitungan</a></li>
              <li><a href="#latihan" className={linkClass}>Latihan mandiri</a></li>
            </ol>
          </nav>
        </aside>
      </div>

      <nav aria-label="Navigasi antar modul" className="mt-12 grid gap-4 border-t border-line pt-6 sm:grid-cols-2">
        {previous ? (
          <Link href={`/modul/${previous.slug}`} className={`rounded-lg border border-line bg-white p-5 ${linkClass}`}>
            <span className="block text-sm text-ink/70">← Modul sebelumnya</span>
            <span className="mt-1 block font-semibold">{previous.title}</span>
          </Link>
        ) : <Link href="/modul" className={`self-center ${linkClass}`}>Lihat semua modul</Link>}
        {next ? (
          <Link href={`/modul/${next.slug}`} className={`rounded-lg border border-line bg-white p-5 ${linkClass}`}>
            <span className="block text-sm text-ink/70">Modul berikutnya →</span>
            <span className="mt-1 block font-semibold">{next.title}</span>
          </Link>
        ) : (
          <Link href="/" className={`rounded-lg border border-line bg-white p-5 ${linkClass}`}>
            <span className="block text-sm text-ink/70">Semua materi sudah dibaca</span>
            <span className="mt-1 block font-semibold">Lanjut latihan di kalkulator →</span>
          </Link>
        )}
      </nav>
    </main>
  );
}
