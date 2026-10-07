"use client";
import { useSubnetCalc } from "@/hooks/useSubnetCalc";
import BinaryOctets from "./BinaryOctets";
import SubnetResultPresenter from "./SubnetResultPresenter";

// Container: mengambil state dari hook, lalu meneruskannya ke komponen presenter.
export default function SubnetCalculatorContainer() {
  const { ipText, setIpText, prefix, setPrefix, ip, result, error } = useSubnetCalc();
  return (
    <section className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <div className="space-y-6">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Alamat IPv4</span>
          <input value={ipText} onChange={(e) => setIpText(e.target.value)} inputMode="decimal"
            className="w-full rounded border border-line bg-white px-3 py-2 font-mono text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-net" />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Prefix: /{prefix}</span>
          <input type="range" min={0} max={32} value={prefix} onChange={(e) => setPrefix(Number(e.target.value))}
            className="w-full accent-net" />
        </label>
        <div>
          <span className="mb-2 block text-sm font-medium">Contoh cepat</span>
          <div className="flex flex-wrap gap-2">
            {[8, 16, 24, 26, 30].map((p) => (
              <button key={p} type="button" onClick={() => setPrefix(p)} aria-pressed={prefix === p}
                className={`rounded border px-3 py-1 font-mono text-sm transition-colors ${prefix === p ? "border-net bg-net text-white" : "border-line bg-white hover:border-net"}`}>
                /{p}
              </button>
            ))}
          </div>
        </div>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      </div>
      <div className="space-y-8">
        {ip && result ? (
          <>
            <div>
              <h2 className="mb-3 text-lg font-semibold">Bit network dan bit host</h2>
              <BinaryOctets octets={ip.octets()} prefix={prefix} />
              <p className="mt-3 text-sm text-ink/70">
                <span className="mr-1 inline-block h-3 w-3 rounded-sm bg-net align-middle" /> network
                <span className="ml-4 mr-1 inline-block h-3 w-3 rounded-sm bg-host align-middle" /> host
              </p>
            </div>
            <SubnetResultPresenter result={result} />
          </>
        ) : (
          <p className="text-ink/70">Masukkan alamat IPv4 untuk melihat hasil perhitungan subnet.</p>
        )}
      </div>
    </section>
  );
}
