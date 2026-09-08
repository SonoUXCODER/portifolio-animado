# sonostudios — portfólio

Next.js (App Router) exportado como site estático e publicado no GitHub Pages,
em três idiomas (`en`, `pt`, `de`).

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # gera out/
npm run preview   # serve out/ em http://localhost:4321/portifolio-animado/
```

## Por que este repositório existe

O repositório `portifolio-animado` só tinha a branch `gh-pages`, com o build
já compilado e minificado — não havia código-fonte em lugar nenhum. Este
projeto é o fonte reconstruído a partir daquele build: mesma copy (extraída dos
três dicionários que iam no bundle), mesmo CSS, mesmos assets, mesmas
animações — com os bugs corrigidos e a arquitetura ajustada.

## Trocar o nome para "sonostudios"

Uma linha, em [`src/content/site.ts`](src/content/site.ts):

```ts
name: "sonostudios",
wordmark: "sonostudios®",
```

Ou sem tocar no código, definindo no build:

```bash
NEXT_PUBLIC_SITE_NAME=sonostudios NEXT_PUBLIC_SITE_WORDMARK='sonostudios®' npm run build
```

Muda de uma vez: cabeçalho, rodapé gigante, tela de abertura, `<title>`,
Open Graph, sitemap e a página de escolha de idioma.

## Estrutura

```
src/
  app/                      rotas (export estático)
    [lang]/                 home + /work/[slug]
  components/
    animacoes.tsx           primitivas de entrada/rolagem
    intervalo.tsx           escultura 3D (three.js, carregado sob demanda)
    passagem.tsx            revelação circular para a seção seguinte
    rolagem-suave.tsx       Lenis
    cursor.tsx              cursor desenhado
    secoes/                 hero, sobre, trabalho, filosofia, capacidades, contato
  content/
    dictionaries/{en,pt,de}.ts   toda a copy
    site.ts projects.ts capabilities.ts interludes.ts
  lib/
    motion.ts               tokens de movimento (molas, durações, lerp)
```

### Conteúdo

`src/content/index.ts` resolve metadados + copy **no servidor** e entrega a cada
página só o que ela mostra. A home não carrega os cinco estudos de caso; a
página de case não carrega os outros quatro; e nenhuma página carrega os outros
dois idiomas.

Há uma checagem de integridade que roda no build: se faltar a copy de um
projeto, de uma capacidade ou de um intervalo em qualquer idioma, o build
quebra com o nome do que falta em vez de publicar `undefined`.

## O que foi corrigido

| Sintoma | Causa | Correção |
| --- | --- | --- |
| Rolagem travando com a roda do mouse | Lenis em modo `duration: 1.05`: cada evento de roda reiniciava a animação do zero | `lerp: 0.12` (suavização exponencial, não reinicia) — `src/lib/motion.ts` |
| Animações "atrasadas" em relação à rolagem | Lenis e framer-motion em loops de quadro separados | Lenis roda dentro do `frame.update` do framer, antes dele |
| Mouse lento | Mola do cursor superamortecida (razão ≈ 1.5) e um `closest()` no DOM por evento de ponteiro | Mola em ≈ 0.85 e consulta ao DOM no máximo uma vez por quadro |
| O nome da obra ("Klio", "Daphne") subindo pelo meio da tela | O corredor da passagem caía exatamente nos 100svh em que o painel da escultura se soltava e subia | `.intervalo` com 300svh e `.passagem` com `-200svh`: a revelação inteira acontece com o painel preso. Mais: passagem acima do painel no `z-index` e HUD com opacidade presa ao mesmo progresso |
| Menu "Capacidades" parando uma tela depois da seção | A âncora somava `window.innerHeight` para alvos dentro da passagem | Com a geometria nova o fim do corredor coincide com o topo da seção; a correção some |
| Links da página de escolha de idioma dando 404 | `<a href="/en">` sem o basePath do GitHub Pages | `<Link>`, que aplica o basePath |
| 404 de prefetch no console | Bug do export estático do Next 16 (grava pasta, pede nome com ponto) | `scripts/achatar-prefetch.mjs`, rodado no `build` |

## O que ficou mais leve

Primeira visita, gzip, sem os polyfills legados (que navegador moderno pula):

| | antes | depois |
| --- | ---: | ---: |
| home `/pt` | 252,0 KB | 227,2 KB |
| case | 233,9 KB | 210,7 KB |

- Copy por idioma e por página, resolvida no servidor (antes os três idiomas
  inteiros iam no bundle de toda visita).
- `stack` (camadas e ferramentas, ~9 KB nos três idiomas) foi removido: estava
  no bundle e não era renderizado em lugar nenhum.
- `LazyMotion` + `m`: só os recursos de animação que o site usa.
- `next/image` trocado por `<img>` — o export é estático, então o otimizador não
  fazia nada e o componente ia junto assim mesmo.
- Texto que acende palavra a palavra: uma assinatura de rolagem por parágrafo
  em vez de uma por palavra (um parágrafo de 60 palavras tinha 60).
- Abertura com piso de 420 ms em vez de 1,1 s travado.
- three.js continua carregando sob demanda, só quando um intervalo se aproxima.

## Publicação

`.github/workflows/deploy.yml` faz `npm ci && npm run build` e publica `out/`
na branch `gh-pages` a cada push na `main`.
