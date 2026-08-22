# portifolio-animado

Portfólio de desenvolvedor. Next.js 15 (App Router) + React 19 + TypeScript +
Tailwind v4 + Framer Motion. Export estático: o build gera HTML pronto pras 6
rotas e o GitHub Pages só serve os arquivos.

No ar: https://sonouxcoder.github.io/portifolio-animado

```bash
npm install
npm run dev
```

> Rodar `npm run build` com o `npm run dev` aberto corrompe a pasta `.next`.
> Feche o dev antes de buildar, ou apague `.next` depois.

---

## Onde mexer

Nenhum texto de conteúdo mora dentro de componente. Tudo em `src/data`:

| arquivo | o que controla |
| --- | --- |
| `src/data/site.ts` | nome, papéis, e-mail, redes, frase do rodapé, itens da nav |
| `src/data/projects.ts` | os projetos: home, `/projetos/[slug]`, sitemap e metadata |
| `src/data/stack.ts` | as ferramentas espalhadas, com coordenada e desenhinho de cada uma |
| `src/data/process.ts` | as etapas de "COMO EU FAÇO AS COISAS" |
| `src/data/experiments.ts` | os quadros de "COISAS QUE EU TESTEI" |

**Trocar o domínio:** só `site.url`. Canonical, Open Graph, JSON-LD e o
`sitemap.xml` leem de lá.

**LinkedIn:** `src/data/site.ts` está com uma URL chutada (`/in/sonouxcoder`).
Troque pelo perfil real antes de publicar.

**Adicionar projeto:** um objeto novo em `projects.ts`. O `layout` escolhe a
composição na home:

- `full` — imagem gigante, quase toda a largura
- `small-right` — imagem pequena, deslocada pra direita
- `vertical` — print comprido
- `duo` — duas imagens montadas juntas

A página `/projetos/[slug]` e a entrada no sitemap saem sozinhas.

---

## Estrutura

```
src/
  app/          layout, home, /projetos/[slug], sitemap, robots, 404
  components/   Navbar, MobileMenu, Marquee, ProjectCard, ProjectGrid,
                ProjectPage, ScrollReveal, CustomCursor, PageTransition,
                Footer, Hero, SobreSection, StackSection, ProcessSection,
                ExperimentsSection, ContactSection, Doodles, Experimento
  data/         todo o conteúdo
  hooks/        useMedia (ponteiro fino, desktop)
  lib/          utilitários
public/assets/  imagens dos projetos e do retrato
```

## Sistema visual

Noite de inverno: grafite profundo, superfície chumbo, branco suave e uma
família fria de azuis. Os tokens vivem em `src/app/globals.css` — trocar os
hex de `@theme` + `:root` muda o site inteiro.

| token | papel |
| --- | --- |
| `--bg` `#0b0d10` | fundo da página |
| `--surface` `#14181d` | cards, molduras, seções invertidas |
| `--surface-2` `#1b2027` | elevação, sombras duras |
| `--text` `#e8ecf1` | texto principal |
| `--text-2` `#93a1b0` | texto secundário |
| `--accent` `#8ca3bc` | destaque: números, rótulos, marcadores |
| `--accent-2` `#6e8299` | variação profunda |
| `--ice` `#afc6db` | interação: hover, foco, seleção |
| `--border` / `--border-forte` | linha fria de baixo contraste |

A cor é reservada pra interação e pra hierarquia. Imagem de projeto **nunca**
recebe filtro que lave a cor — nem no hover: o hover é só um ganho de luz.

> O hex do `--accent` aparece duplicado dentro do data: URI do `.sublinha`.
> Um data: URI não lê variável CSS. Se trocar o accent, troque lá também.

Classe de componente vive dentro de `@layer components`. **Não escreva CSS
fora de layer** — ele passaria na frente de qualquer utility do Tailwind e um
`text-[14px]` no JSX pararia de funcionar sem explicação.

## Três armadilhas que já custaram caro aqui

1. **`clip-path` em elemento observado pelo IntersectionObserver não funciona.**
   O IO leva o recorte em conta: um elemento que se esconde com `clip-path`
   reporta `intersectionRatio 0`, nunca "entra na tela", nunca dispara o
   `whileInView` — e a imagem fica invisível pra sempre. Por isso
   `MaskReveal` observa a moldura e move o filho com `transform`.
2. **`overflow: clip`, nunca `hidden`, no `html`.** Vários elementos entram de
   fora da tela e o título de projetos sangra de propósito. `hidden` conteria
   tudo igual, mas viraria contêiner de rolagem e mataria todo
   `position: sticky` da página.
3. **`images.unoptimized` não aplica `basePath`.** No export estático parece a
   saída óbvia, mas nesse modo o `src` sai cru e toda imagem daria 404 dentro
   da subpasta do Pages. Por isso existe `src/lib/imagemLoader.ts`: um loader
   custom é o único ponto por onde todo src passa.

## Acessibilidade e movimento

`prefers-reduced-motion` corta parallax, rotação e deslize em todo lugar —
sobra um fade curto. Cursor custom só existe em ponteiro fino. O lightbox e o
menu prendem o foco, devolvem no fechar e respondem ao Esc.

## Sem saída pro site do cliente

Não existe botão de "ver ao vivo" em lugar nenhum. Quem chega vê o projeto por
dentro deste portfólio — estudo de caso, galeria e ficha — e não numa aba nova.
O campo `live` continua nos dados, mas como **informação** (o estado do
projeto), nunca como link.

## Publicação

```bash
npm run deploy
```

Builda o export estático e empurra a pasta `out` pro branch `gh-pages`, que é
de onde o GitHub Pages serve. Nenhuma variável de ambiente é necessária — o
`basePath` de produção já é o padrão, então o build local sai idêntico ao que
vai pro ar.

| variável | padrão |
| --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | `/portifolio-animado` — string vazia se for usar domínio próprio |
| `NEXT_PUBLIC_SITE_URL` | `https://sonouxcoder.github.io/portifolio-animado` |

O `basePath` vale também no `npm run dev`: a home fica em
`http://localhost:3000/portifolio-animado`. É de propósito — o dev mostra
exatamente o que o Pages vai mostrar.

### Trocar por deploy automático (opcional)

Hoje o deploy é manual porque o token do `gh` nesta máquina não tem o escopo
`workflow`, e o GitHub recusa o push de qualquer arquivo em
`.github/workflows/`. Pra liberar:

```bash
gh auth refresh -s workflow
```

Depois disso dá pra commitar um workflow que roda `npm ci && npm run build` e
publica `out/` com `actions/deploy-pages`, e trocar a origem do Pages de
branch pra GitHub Actions.

## Contato

O formulário não tem servidor: monta um `mailto:` e entrega pro programa de
e-mail. Sem backend, sem chave pra vazar, funciona em hospedagem estática.

---

## Sobrou do site antigo

`index.html`, `portfolio.html` e a pasta `assets/` na raiz são a versão
estática anterior. Nada no app Next lê esses arquivos — as imagens usadas
foram copiadas pra `public/assets/`. Dá pra apagar quando quiser.
