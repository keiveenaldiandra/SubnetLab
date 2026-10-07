import { SubnetResult } from "@/lib/SubnetCalculator";

// Presenter: hanya menampilkan data dari props, tanpa state atau logika.
export default function SubnetResultPresenter({ result }: { result: SubnetResult }) {
  const rows: [string, string][] = [
    ["Network address", result.network],
    ["Broadcast address", result.broadcast],
    ["Subnet mask", result.mask],
    ["Wildcard mask", result.wildcard],
    ["Host pertama", result.firstHost],
    ["Host terakhir", result.lastHost],
    ["Jumlah host usable", result.totalHosts.toLocaleString("id-ID")],
  ];
  return (
    <dl className="divide-y divide-line border-y border-line">
      {rows.map(([label, value]) => (
        <div key={label} className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-sm text-ink/70">{label}</dt>
          <dd className="font-mono text-base font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
