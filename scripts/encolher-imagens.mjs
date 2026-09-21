/**
 * Reduz as imagens de projeto ao tamanho em que elas realmente aparecem.
 *
 * As capas vinham em 3150px de largura e nunca são exibidas acima de ~1350
 * (a capa do estudo de caso, a 94vw numa tela de 1440). 1800px cobre isso com
 * folga para tela densa e corta cerca de 60% do peso.
 *
 * Roda uma vez, na mão — não entra no `build`. Recomprimir um webp a cada
 * build degradaria a imagem de novo a cada vez, e o ganho já está no commit.
 *
 *   node scripts/encolher-imagens.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PASTA = "public/assets/projetos";
const LARGURA_MAXIMA = 1800;
const QUALIDADE = 82;

const kb = (n) => `${Math.round(n / 1024)} KB`;
const novasMedidas = {};
let antes = 0;
let depois = 0;

for (const nome of fs.readdirSync(PASTA).filter((f) => f.endsWith(".webp"))) {
  const caminho = path.join(PASTA, nome);
  /* lê para memória antes: no Windows o sharp segura o arquivo aberto e
     gravar por cima do que ele está lendo falha */
  const entrada = fs.readFileSync(caminho);
  const tamanhoAntes = entrada.length;
  const original = await sharp(entrada).metadata();

  const buffer = await sharp(entrada)
    .resize({ width: LARGURA_MAXIMA, withoutEnlargement: true })
    .webp({ quality: QUALIDADE, effort: 6 })
    .toBuffer();

  /* se recomprimir não ajudou, fica como está — nada de perder qualidade à toa */
  if (buffer.length >= tamanhoAntes) {
    novasMedidas[nome] = { width: original.width, height: original.height };
    antes += tamanhoAntes;
    depois += tamanhoAntes;
    console.log(`${nome.padEnd(22)} mantida   ${kb(tamanhoAntes)}`);
    continue;
  }

  fs.writeFileSync(caminho, buffer);
  const agora = await sharp(buffer).metadata();
  novasMedidas[nome] = { width: agora.width, height: agora.height };
  antes += tamanhoAntes;
  depois += buffer.length;
  console.log(
    `${nome.padEnd(22)} ${original.width}px → ${agora.width}px   ` +
      `${kb(tamanhoAntes)} → ${kb(buffer.length)}   (-${Math.round(100 - (buffer.length / tamanhoAntes) * 100)}%)`,
  );
}

/* as medidas vão para projects.ts, que alimenta width/height das <img> */
const alvo = "src/content/projects.ts";
let fonte = fs.readFileSync(alvo, "utf8");
for (const [nome, { width, height }] of Object.entries(novasMedidas)) {
  const re = new RegExp(
    `("src":\\s*"[^"]*${nome.replace(".", "\\.")}",\\s*\\n\\s*"width":\\s*)\\d+(,\\s*\\n\\s*"height":\\s*)\\d+`,
    "g",
  );
  fonte = fonte.replace(re, `$1${width}$2${height}`);
}
fs.writeFileSync(alvo, fonte);

console.log("---");
console.log(`total ${kb(antes)} → ${kb(depois)}  (-${Math.round(100 - (depois / antes) * 100)}%)`);
console.log("medidas atualizadas em", alvo);
