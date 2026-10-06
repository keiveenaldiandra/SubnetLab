"use client";
import { useMemo, useState } from "react";
import { IPv4Address } from "@/lib/IPv4Address";
import { SubnetCalculator, SubnetResult } from "@/lib/SubnetCalculator";

export function useSubnetCalc() {
  const [ipText, setIpText] = useState("192.168.10.77");
  const [prefix, setPrefix] = useState(26);

  const { ip, result, error } = useMemo(() => {
    const parsed = IPv4Address.parse(ipText);
    if (!parsed) {
      return { ip: null, result: null as SubnetResult | null, error: "Alamat IP tidak valid. Gunakan format seperti 192.168.1.10." };
    }
    return { ip: parsed, result: new SubnetCalculator(parsed, prefix).calculate(), error: null };
  }, [ipText, prefix]);

  return { ipText, setIpText, prefix, setPrefix, ip, result, error };
}
