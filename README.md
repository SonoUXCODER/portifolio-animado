# portifolio-animado

Não é um portfólio comum: é um **impresso**. A página é uma folha em cima de
uma mesa, com marca de corte nos cantos, cabeço, fólio, sumário com
pontilhado, estampas encartadas no meio e colofão no fim. Quem chega folheia.

Next.js 15 (App Router) + React 19 + TypeScript +
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
| `src/data/arquivo.ts` | **a ordem dos cadernos, o sumário, os fólios e a régua** |
| `src/data/site.ts` | nome, papéis, e-mail, redes, frase e linha do colofão |
| `src/data/projects.ts` | os projetos: listagem, `/projetos/[slug]`, sitemap e metadata |
| `src/data/estampas.ts` | as três chapas 3D e suas legendas |
| `src/data/stack.ts` | as ferramentas espalhadas, com coordenada e desenho de cada uma |
| `src/data/process.ts` | as etapas da dobradura |
| `src/data/experiments.ts` | os quadros da gaveta |

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
  app/          layout (a folha), home, /projetos/[slug], sitemap, robots, 404
  components/   Capa, Sumario, Pagina, Encarte3D, Tema, Navbar, MobileMenu,
                Marquee, ProjectCard, ProjectGrid, ProjectPage, ScrollReveal,
                CustomCursor, PageTransition, Footer (colofão), SobreSection,
                StackSection, ProcessSection, ExperimentsSection,
                ContactSection, Doodles, Experimento
  data/         todo o conteúdo
  hooks/        useMedia (ponteiro fino, desktop)
  lib/          base (basePath), imagemLoader, utilitários
public/assets/  chapas dos projetos e o retrato
public/3d/      as três estampas em .glb
```

## Sistema visual

Preto e branco, sem exceção. A hierarquia vem de tamanho, peso e posição —
nunca de cor. A **única** cor do objeto inteiro são as chapas dos projetos:
as capturas dos sites entram sem filtro nenhum, e é isso que faz elas
saltarem da página.

Duas edições, trocadas pelo botão da régua e guardadas no `localStorage`:

| token | edição papel | edição noturna |
| --- | --- | --- |
| `--mesa` | `#e3e3e1` | `#060606` |
| `--papel` | `#ffffff` | `#121212` |
| `--tinta` | `#0a0a0a` | `#f2f2f2` |
| `--tinta-2` / `--tinta-3` | cinzas de apoio | idem, invertidos |
| `--linha` / `--linha-forte` | tinta translúcida | papel translúcido |

`--tinta-base` e `--papel-base` nunca mudam dentro de `.invertido` — é o que
permite a página em tinta cheia funcionar nas duas edições sem duplicar a
paleta e sem referência circular.

O tema é resolvido por um script inline no `<head>` (`scriptAntiPiscada`),
antes da primeira pintura. Sem ele a página nasce clara e pisca pro escuro
quando o React monta.

Classe de componente vive dentro de `@layer components`. **Não escreva CSS
fora de layer** — ele passaria na frente de qualquer utility do Tailwind e um
`text-[14px]` no JSX pararia de funcionar sem explicação.

## O aparato de impresso

| peça | onde | o que faz |
| --- | --- | --- |
| `.folha` | `layout.tsx` | a folha sobre a mesa, com sombra e sangria |
| `.marca-corte` | `layout.tsx` | as quatro marcas de corte nos cantos |
| `Pagina` | `components/Pagina.tsx` | cabeço + conteúdo + fólio de cada caderno |
| `Sumario` | `components/Sumario.tsx` | índice com pontilhado e encartes recuados |
| `Colofao` | `components/Footer.tsx` | a ficha de produção, no fim |
| `.escala-cinza` | vários | a barra de controle de cinza da prova |

A ordem dos cadernos, os números de página e os atalhos da régua saem todos
de `src/data/arquivo.ts`. Mexer na ordem daquele array reordena o arquivo
inteiro — nenhum número é digitado à mão em componente nenhum.

## As estampas 3D

Três esculturas encartadas entre os cadernos, em `src/data/estampas.ts`.
Cada uma cai numa virada da narrativa; não são intervalo decorativo.

`Encarte3D` é three.js na unha — sem react-three-fiber, que custaria uns
80 kB pra reimplementar exatamente o mesmo. Três regras sustentam a
performance:

1. o three só é baixado quando a estampa chega perto da tela (import
   dinâmico), então quem não rola até lá não paga nada;
2. o loop de render só gira enquanto a seção está visível;
3. ao desmontar, geometria, material, textura e contexto WebGL são
   destruídos na mão — três estampas vivas ao mesmo tempo estourariam o
   limite de contextos do navegador. Na prática nunca existe mais de uma.

Os arquivos originais somavam **149 MB**. Foram pra **2,9 MB**:

```bash
gltf-transform optimize in.glb a.glb --compress false --texture-compress false --simplify-ratio 0.06 --simplify-error 0.005
gltf-transform meshopt b.glb final.glb --level high
```

As texturas são reencodadas pra webp 1024 com sharp entre os dois passos: o
`--texture-compress` do gltf-transform quebra nestes arquivos (libvips
reclama de colourspace). O Daphne veio em PLY ascii de 91 MB e foi convertido
à parte, com rotação de Z-up pra Y-up.

> **Crédito pendente.** Os três modelos são scans de escultura. Se vieram de
> acervo de terceiros (Sketchfab, Scan the World, museu), a licença quase
> sempre é CC-BY e exige nome do autor e link. O campo `credito` em
> `estampas.ts` está com um marcador — preencha antes de divulgar.

## Quatro armadilhas que já custaram caro aqui

1. **`clip-path` em elemento observado pelo IntersectionObserver não funciona.**
   O IO leva o recorte em conta: um elemento que se esconde com `clip-path`
   reporta `intersectionRatio 0`, nunca "entra na tela", nunca dispara o
   `whileInView` — e a imagem fica invisível pra sempre. Por isso
   `MaskReveal` observa a moldura e move o filho com `transform`.
2. **`overflow: clip`, nunca `hidden`, no `html`.** Vários elementos entram de
   fora da tela e o título de projetos sangra de propósito. `hidden` conteria
   tudo igual, mas viraria contêiner de rolagem e mataria todo
   `position: sticky` da página.
3. **Acento maiúsculo some dentro de máscara de animação.** Com
   `line-height: 0.82`, o `overflow: hidden` que faz o texto subir corta o til
   e o acento agudo — "CÓDIGO" aparece na tela como "CODIGO" e ninguém entende
   por quê. A classe `.mascara-linha` devolve o espaço com padding e compensa
   no layout com margem negativa.
4. **`images.unoptimized` não aplica `basePath`.** No export estático parece a
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
