const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { loadTs } = require("./load-ts.cjs");
const { createPreviewServer } = require("../scripts/preview.cjs");
const { modules } = loadTs("data/modules.ts");
const root = path.resolve(__dirname, "../out");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/SubnetLab";
const routes = ["/", "/modul/", ...modules.map(({ slug }) => `/modul/${slug}/`)];
let server;
let origin;

before(async () => {
  server = createPreviewServer(basePath);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { await new Promise((resolve) => server.close(resolve)); });

test("every exported page loads directly with valid links, anchors, and assets", async () => {
  for (const route of routes) {
    const url = `${origin}${basePath}${route}`;
    const response = await fetch(url);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, route);
    for (const [, raw] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const target = new URL(raw.replaceAll("&amp;", "&"), url);
      if (target.origin !== origin) continue;
      assert.ok(target.pathname.startsWith(`${basePath}/`), `Wrong base path: ${raw}`);
      if (target.hash && target.pathname === new URL(url).pathname) {
        assert.ok(html.includes(`id="${target.hash.slice(1)}"`), `Missing anchor: ${raw}`);
      } else {
        assert.equal((await fetch(target)).status, 200, `Broken link or asset: ${raw}`);
      }
    }
  }
});

test("all four lessons render their own material, exercise, and navigation", () => {
  for (const [index, modul] of modules.entries()) {
    const html = fs.readFileSync(path.join(root, "modul", modul.slug, "index.html"), "utf8");
    assert.ok(html.includes(`<title>${modul.title} | SubnetLab</title>`));
    assert.ok(html.includes(modul.sections[0].title));
    assert.ok(html.includes(modul.exercise.question));
    assert.ok(html.includes(modul.exercise.answer));
    assert.ok(html.includes("<details"));
    assert.ok(!html.includes("Modul yang dipilih:"));
    if (index > 0) assert.ok(html.includes(`${basePath}/modul/${modules[index - 1].slug}/`));
    if (index + 1 < modules.length) assert.ok(html.includes(`${basePath}/modul/${modules[index + 1].slug}/`));
  }
});

test("unknown slugs return 404 with a working way back to the module list", async () => {
  const response = await fetch(`${origin}${basePath}/modul/tidak-ada/`);
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.ok(html.includes("Halaman tidak ditemukan"));
  assert.ok(html.includes(`${basePath}/modul/`));
  assert.ok(fs.existsSync(path.join(root, ".nojekyll")));
});
