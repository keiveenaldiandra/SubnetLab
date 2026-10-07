"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Kalkulator" },
  { href: "/modul", label: "Modul" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b border-line bg-white/70">
      <nav aria-label="Navigasi utama" className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="text-lg font-bold tracking-tight">
          Subnet<span className="text-net">Lab</span>
        </Link>
        <ul className="flex gap-1">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${active ? "bg-ink text-white" : "text-ink hover:bg-line/60"}`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
