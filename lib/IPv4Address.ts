export class IPv4Address {
  private constructor(private readonly value: number) {}

  static parse(text: string): IPv4Address | null {
    const parts = text.trim().split(".");
    if (parts.length !== 4) return null;
    let v = 0;
    for (const p of parts) {
      if (!/^\d{1,3}$/.test(p) || Number(p) > 255) return null;
      v = v * 256 + Number(p);
    }
    return new IPv4Address(v);
  }

  static fromInt(v: number): IPv4Address {
    return new IPv4Address(v >>> 0);
  }

  toInt(): number {
    return this.value;
  }

  octets(): number[] {
    return [24, 16, 8, 0].map((s) => (this.value >>> s) & 255);
  }

  toString(): string {
    return this.octets().join(".");
  }
}
