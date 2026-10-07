import SubnetCalculatorContainer from "../components/SubnetCalculatorContainer";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-4xl font-bold tracking-tight">Kalkulator Subnet</h1>
      <p className="mt-3 mb-10 max-w-xl text-ink/80">
        Geser prefix dan lihat langsung bagaimana bit sebuah alamat IP terbagi antara network dan host.
      </p>
      <SubnetCalculatorContainer />
    </main>
  );
}