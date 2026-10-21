import SubnetCalculatorContainer from "../components/SubnetCalculatorContainer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-paper py-12">
      <div className="mx-auto max-w-5xl px-5">
        <header className="mb-10">
          <h1 className="mb-3 text-3xl font-bold text-ink">Kalkulator Subnet</h1>
          <p className="max-w-2xl text-ink/70">
            Geser prefix dan lihat langsung bagaimana bit sebuah alamat IP terbagi antara
            network dan host.
          </p>
        </header>
        <SubnetCalculatorContainer />
      </div>
    </main>
  );
}
