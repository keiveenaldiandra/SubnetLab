const { test } = require("node:test");
const assert = require("node:assert/strict");
const { loadTs } = require("./load-ts.cjs");
const { IPv4Address } = loadTs("lib/IPv4Address.ts");
const { SubnetCalculator } = loadTs("lib/SubnetCalculator.ts");
const { modules } = loadTs("data/modules.ts");
const calculate = (ip, prefix) => new SubnetCalculator(IPv4Address.parse(ip), prefix).calculate();

test("IPv4 rejects malformed input and ambiguous leading zeroes", () => {
  for (const ip of ["", "192.168.1", "192.168.1.256", "192.168.01.1", "-1.0.0.0", "1e2.0.0.1", "1..2.3", "::1"]) {
    assert.equal(IPv4Address.parse(ip), null, ip);
  }
  for (const ip of ["0.0.0.0", "255.255.255.255", "192.168.10.77"]) {
    const parsed = IPv4Address.parse(` ${ip} `);
    assert.equal(parsed.toString(), ip);
    assert.equal(IPv4Address.fromInt(parsed.toInt()).toString(), ip);
  }
});

test("worked subnet example matches every displayed result", () => {
  assert.deepEqual(calculate("192.168.10.77", 26), {
    network: "192.168.10.64", broadcast: "192.168.10.127", mask: "255.255.255.192",
    wildcard: "0.0.0.63", firstHost: "192.168.10.65", lastHost: "192.168.10.126", totalHosts: 62,
  });
});

test("prefix boundaries /0, /31 and /32 preserve their special behavior", () => {
  const all = calculate("192.168.10.77", 0);
  assert.equal(all.network, "0.0.0.0");
  assert.equal(all.broadcast, "255.255.255.255");
  assert.equal(all.totalHosts, 4294967294);
  const pointToPoint = calculate("192.168.10.77", 31);
  assert.equal(pointToPoint.firstHost, "192.168.10.76");
  assert.equal(pointToPoint.lastHost, "192.168.10.77");
  assert.equal(pointToPoint.totalHosts, 2);
  const single = calculate("255.255.255.255", 32);
  assert.equal(single.firstHost, "255.255.255.255");
  assert.equal(single.lastHost, "255.255.255.255");
  assert.equal(single.totalHosts, 1);
});

test("all 33 prefixes contain the input and have the expected block size", () => {
  for (const ip of ["0.0.0.0", "10.20.30.40", "192.168.10.77", "255.255.255.255"]) {
    for (let prefix = 0; prefix <= 32; prefix++) {
      const result = calculate(ip, prefix);
      const first = IPv4Address.parse(result.network).toInt();
      const last = IPv4Address.parse(result.broadcast).toInt();
      const value = IPv4Address.parse(ip).toInt();
      assert.ok(first <= value && value <= last, `${ip}/${prefix}`);
      assert.equal(last - first + 1, 2 ** (32 - prefix));
    }
  }
});

test("exercise and VLSM allocations fit without overlapping", () => {
  const exercise = calculate("192.168.1.130", 27);
  assert.equal(exercise.network, "192.168.1.128");
  assert.equal(exercise.broadcast, "192.168.1.159");
  const allocations = [["192.168.10.0", 26, 50], ["192.168.10.64", 27, 25], ["192.168.10.96", 28, 10], ["192.168.10.112", 28, 12]];
  let end = -1;
  for (const [ip, prefix, needed] of allocations) {
    const subnet = calculate(ip, prefix);
    assert.equal(subnet.network, ip);
    assert.ok(subnet.totalHosts >= needed);
    assert.ok(IPv4Address.parse(subnet.network).toInt() > end);
    end = IPv4Address.parse(subnet.broadcast).toInt();
    assert.ok(end <= IPv4Address.parse("192.168.10.255").toInt());
  }
});

test("module slugs and table-of-contents anchors are unique", () => {
  assert.equal(new Set(modules.map(({ slug }) => slug)).size, modules.length);
  for (const modul of modules) {
    const ids = [...modul.sections.map(({ id }) => id), "tujuan", "contoh", "latihan", "referensi"];
    assert.equal(new Set(ids).size, ids.length, modul.slug);
    assert.ok(modul.exercise.question && modul.exercise.answer && modul.sections.length > 0);
  }
});
