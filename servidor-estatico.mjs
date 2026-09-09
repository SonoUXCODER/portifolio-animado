/* Servidor só para conferir o export estático no mesmo subcaminho do GitHub Pages. */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const RAIZ = path.resolve("out");
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "/portifolio-animado";
const PORTA = Number(process.env.PORT ?? 4321);

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
  ".glb": "model/gltf-binary",
};

http
  .createServer((req, res) => {
    let url = decodeURIComponent((req.url ?? "/").split("?")[0]);
    if (url === BASE) url = `${BASE}/`;
    if (!url.startsWith(BASE)) {
      res.writeHead(302, { Location: `${BASE}/` });
      return res.end();
    }
    let rel = url.slice(BASE.length) || "/";
    let arquivo = path.join(RAIZ, rel);
    if (rel.endsWith("/")) arquivo = path.join(arquivo, "index.html");
    if (!fs.existsSync(arquivo) && fs.existsSync(`${arquivo}.html`)) arquivo = `${arquivo}.html`;
    if (!fs.existsSync(arquivo) || fs.statSync(arquivo).isDirectory()) {
      res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      return res.end(fs.readFileSync(path.join(RAIZ, "404.html")));
    }
    res.writeHead(200, {
      "content-type": TIPOS[path.extname(arquivo)] ?? "application/octet-stream",
    });
    fs.createReadStream(arquivo).pipe(res);
  })
  .listen(PORTA, () => console.log(`out/ em http://localhost:${PORTA}${BASE}/`));
