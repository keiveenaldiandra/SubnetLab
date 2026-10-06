import { IPv4Address } from "./IPv4Address";

export interface SubnetResult {
  network: string;
  broadcast: string;
  mask: string;
  wildcard: string;
  firstHost: string;
  lastHost: string;
  totalHosts: number;
}

export class SubnetCalculator {
  constructor(private readonly ip: IPv4Address, private readonly prefix: number) {}

  private get mask(): number {
    return this.prefix === 0 ? 0 : (0xffffffff << (32 - this.prefix)) >>> 0;
  }

  calculate(): SubnetResult {
    const mask = this.mask;
    const network = (this.ip.toInt() & mask) >>> 0;
    const broadcast = (network | ~mask) >>> 0;
    const p2p = this.prefix >= 31;
    const hosts = this.prefix === 32 ? 1 : this.prefix === 31 ? 2 : 2 ** (32 - this.prefix) - 2;
    return {
      network: IPv4Address.fromInt(network).toString(),
      broadcast: IPv4Address.fromInt(broadcast).toString(),
      mask: IPv4Address.fromInt(mask).toString(),
      wildcard: IPv4Address.fromInt(~mask).toString(),
      firstHost: IPv4Address.fromInt(p2p ? network : network + 1).toString(),
      lastHost: IPv4Address.fromInt(p2p ? broadcast : broadcast - 1).toString(),
      totalHosts: hosts,
    };
  }
}
