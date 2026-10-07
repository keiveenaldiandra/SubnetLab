interface Props { octets: number[]; prefix: number }

export default function BinaryOctets({ octets, prefix }: Props) {
  const bits = octets.flatMap((o) => o.toString(2).padStart(8, "0").split(""));
  return (
    <div role="img" aria-label={`Biner alamat IP, ${prefix} bit pertama adalah bagian network`} className="flex flex-wrap gap-x-4 gap-y-2 font-mono">
      {octets.map((_, o) => (
        <div key={o} className="flex gap-1">
          {bits.slice(o * 8, o * 8 + 8).map((b, i) => {
            const isNet = o * 8 + i < prefix;
            return (
              <span key={i} className={`grid h-8 w-6 sm:h-9 sm:w-7 place-items-center rounded-sm text-sm font-semibold ${isNet ? "bg-net text-white" : "bg-host text-ink"}`}>
                {b}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
