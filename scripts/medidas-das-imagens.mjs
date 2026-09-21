/**
 * Relê as dimensões reais dos arquivos em public/assets/projetos e grava em
 * src/content/projects.ts, que alimenta os atributos width/height das <img>.
 *
 * Separado de `encolher-imagens.mjs` de propósito: dá para conferir as medidas
 * sem recomprimir nada.
 *
 *   node scripts/medidas-das-imagens.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PASTA = "public/assets/projetos";
const ALVO = "src/content/projects.ts";

let fonte = fs.readFileSync(ALVO, "utf8");
let trocadas = 0;

for (const nome of fs.readdirSync(PASTA).filter((f) => f.endsWith(".webp"))) {
  const { width, height } = await sharp(fs.readFileSync(path.join(PASTA, nome))).metadata();

  /* aspas nas chaves são opcionais — o Prettier tira as do projects.ts */
  const padrao = new RegExp(
    String.raw`("?src"?:\s*"[^"]*${nome.replace(".", "\\.")}",\s*\n\s*"?width"?:\s*)\d+(,\s*\n\s*"?height"?:\s*)\d+`,
    "g",
  );

  const antes = fonte;
  fonte = fonte.replace(padrao, `$1${width}$2${height}`);
  if (antes !== fonte) {
    trocadas += 1;
    console.log(`${nome.padEnd(22)} ${width} x ${height}`);
  }
}

fs.writeFileSync(ALVO, fonte);
console.log(`--- ${trocadas} imagens atualizadas em ${ALVO}`);
