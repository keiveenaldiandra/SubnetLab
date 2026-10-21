const { test } = require("node:test");
const assert = require("node:assert/strict");
const { loadTs } = require("./load-ts.cjs");
const { modules } = loadTs("data/modules.ts");
const origin = process.env.SUBNETLAB_TEST_ORIGIN || "http://127.0.0.1:3000";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

test("development serves the calculator, module list, and every module on direct load and refresh", async () => {
  const routes = [["/", "Kalkulator Subnet"], ["/modul/", "Modul Belajar"],
    ...modules.map(({ slug, title }) => [`/modul/${slug}/`, title])];
  for (const [route, title] of routes) {
    for (let request = 0; request < 2; request++) {
      const response = await fetch(`${origin}${basePath}${route}`);
      assert.equal(response.status, 200, `${route} request ${request + 1}`);
      const html = await response.text();
      assert.ok(html.includes(title), `Missing page title: ${route}`);
      assert.ok(!html.includes("missing exported function"), route);
    }
  }
});

test("development supports client-navigation requests for every module", async () => {
  for (const { slug, title } of modules) {
    const response = await fetch(`${origin}${basePath}/modul/${slug}/`, {
      headers: { RSC: "1" },
    });
    assert.equal(response.status, 200, slug);
    assert.ok(response.headers.get("content-type").includes("text/x-component"), slug);
    assert.ok((await response.text()).includes(title), slug);
  }
});

test("unknown module in development returns the custom 404", async () => {
  const response = await fetch(`${origin}${basePath}/modul/tidak-ada/`);
  assert.equal(response.status, 404);
  assert.ok((await response.text()).includes("Halaman tidak ditemukan"));
});
