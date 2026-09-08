/**
 * Conserta os 404 de prefetch do export estático (Next 16).
 *
 * O router pede `/pt/__next.$d$lang.__PAGE__.txt` (segmentos separados por
 * ponto), mas o `next build` grava `/pt/__next.$d$lang/__PAGE__.txt` (segmentos
 * como pastas). Resultado: todo prefetch de rota dinâmica dá 404, o console
 * enche de erro e a navegação entre idiomas/cases perde o pré-carregamento.
 *
 * Aqui os mesmos arquivos são duplicados com o nome achatado. Os dois formatos
 * passam a existir, então some o 404 e o prefetch volta a funcionar.
 */
import fs from "node:fs";
import path from "node:path";

const RAIZ = path.resolve("out");
let criados = 0;

function achatar(dirDoNext, base) {
  const pilha = [{ dir: dirDoNext, partes: [] }];
  while (pilha.length) {
    const { dir, partes } = pilha.pop();
    for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
      const cheio = path.join(dir, entrada.name);
      if (entrada.isDirectory()) {
        pilha.push({ dir: cheio, partes: [...partes, entrada.name] });
        continue;
      }
      const nome = [path.basename(dirDoNext), ...partes, entrada.name].join(".");
      const destino = path.join(base, nome);
      if (!fs.existsSync(destino)) {
        fs.copyFileSync(cheio, destino);
        criados += 1;
      }
    }
  }
}

function percorrer(dir) {
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entrada.isDirectory()) continue;
    const cheio = path.join(dir, entrada.name);
    if (entrada.name.startsWith("__next.")) achatar(cheio, dir);
    else percorrer(cheio);
  }
}

if (!fs.existsSync(RAIZ)) {
  console.error("achatar-prefetch: rode depois do build (out/ nao existe)");
  process.exit(1);
}

percorrer(RAIZ);
console.log(`achatar-prefetch: ${criados} payloads de prefetch duplicados`);
