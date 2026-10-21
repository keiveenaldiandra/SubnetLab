const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

function createPreviewServer(basePath = "/SubnetLab") {
  const root = path.resolve(__dirname, "../out");
  const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".txt": "text/plain; charset=utf-8" };

  return http.createServer((req, res) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname); }
    catch { res.writeHead(400).end(); return; }

    const notFound = () => {
      res.writeHead(404, { "Content-Type": types[".html"] });
      res.end(fs.readFileSync(path.join(root, "404.html")));
    };
    if (basePath && (pathname === "/" || pathname === basePath)) {
      res.writeHead(308, { Location: `${basePath}/` }).end();
      return;
    }
    if (!pathname.startsWith(`${basePath}/`)) { notFound(); return; }

    let file = path.resolve(root, `.${pathname.slice(basePath.length)}`);
    const relative = path.relative(root, file);
    if (relative.startsWith("..") || path.isAbsolute(relative)) { notFound(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!pathname.endsWith("/")) {
        res.writeHead(308, { Location: `${pathname}/` }).end();
        return;
      }
      file = path.join(file, "index.html");
    }
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { notFound(); return; }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
}

module.exports = { createPreviewServer };

if (require.main === module) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/SubnetLab";
  const port = Number(process.env.PORT || 3100);
  createPreviewServer(basePath).listen(port, "127.0.0.1", () => {
    console.log(`Preview: http://127.0.0.1:${port}${basePath}/`);
  });
}
