export class IPv4Address {
  private address: string;

  constructor(address: string) {
    if (!IPv4Address.isValid(address)) {
      throw new Error("IPv4 address tidak valid");
    }

    this.address = address;
  }

  public getAddress(): string {
    return this.address;
  }

  public toBinary(): string {
    return this.address
      .split(".")
      .map((octet) => Number(octet).toString(2).padStart(8, "0"))
      .join(".");
  }

  public getOctets(): number[] {
    return this.address.split(".").map(Number);
  }

  public static isValid(address: string): boolean {
    const parts = address.split(".");

    if (parts.length !== 4) {
      return false;
    }

    return parts.every((part) => {
      if (!/^\d+$/.test(part)) {
        return false;
      }

      const value = Number(part);
      return value >= 0 && value <= 255;
    });
  }
}