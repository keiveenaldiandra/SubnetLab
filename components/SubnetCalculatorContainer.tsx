"use client";

import { useState } from "react";
import useSubnetCalc from "../hooks/useSubnetCalc";

const quickExamples = [
  "192.168.1.1/24",
  "10.0.0.1/8",
  "172.16.0.1/16",
];

export default function SubnetCalculatorContainer() {
  const [input, setInput] = useState("192.168.1.1/24");

  const { result, error, calculate } = useSubnetCalc();

  const handleCalculate = () => {
    calculate(input);
  };

  return (
    <main>
      <h1>Subnet Calculator</h1>

      <input
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Contoh: 192.168.1.1/24"
      />

      <button onClick={handleCalculate}>Hitung</button>

      <div>
        <h2>Contoh Cepat</h2>

        {quickExamples.map((example) => (
          <button
            key={example}
            onClick={() => {
              setInput(example);
              calculate(example);
            }}
          >
            {example}
          </button>
        ))}
      </div>

      {error && <p>{error}</p>}

      {result && (
        <pre>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
