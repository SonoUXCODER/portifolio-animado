# portifolio-animado

Portfólio de um desenvolvedor full-stack e designer de produto. A direção é
**engenharia editorial**: grade suíça, precisão de documentação técnica, uma
única cor de acento e nenhuma animação que não responda "por que isso existe?".

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind v4 + Framer Motion.
Export estático: o build gera HTML pronto pras 6 rotas e o GitHub Pages só
serve os arquivos.

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
| `src/data/sections.ts` | **a ordem das seções, os números dos marcadores e a navegação** |
| `src/data/site.ts` | nome, e-mail, redes, e a linha de crédito do rodapé |
| `src/data/projects.ts` | os projetos: home, `/projetos/[slug]`, sitemap e metadata |
| `src/data/experience.ts` | a linha do tempo |
| `src/data/stack.ts` | as ferramentas, agrupadas por camada |
| `src/data/process.ts` | os seis passos do método, dentro de "Sobre" |
| `src/data/experiments.ts` | os estudos do laboratório |
| `src/data/estampas.ts` | as três esculturas 3D e suas legendas |

**A ordem das seções sai de `sections.ts`.** A navegação, o indicador de seção
ativa, o número de cada marcador e o menu mobile leem tudo de lá. Reordenar
aquele array reordena o site — mas `app/page.tsx` precisa acompanhar, porque é
ele que decide onde entram as peças que **não** são seção (as esculturas e a
faixa de declaração).

> A `note` de uma seção não pode repetir o título dela. Em Projetos as duas
> frases eram idênticas e a página dizia a mesma coisa duas vezes seguidas.

**Trocar o domínio:** só `site.url`. Canonical, Open Graph, JSON-LD e o
`sitemap.xml` leem de lá.

**LinkedIn:** `src/data/site.ts` está com uma URL chutada (`/in/sonouxcoder`).
Troque pelo perfil real antes de divulgar.

**Adicionar projeto:** um objeto novo em `projects.ts`. O `layout` escolhe a
composição na home:

- `full` — imagem larga, texto embaixo em duas colunas
- `small-right` — texto à esquerda, imagem menor deslocada à direita
- `vertical` — print comprido em coluna estreita, texto ao lado
- `duo` — duas imagens montadas, uma mais alta que a outra

É esse campo que impede a seção de virar grade de cards: nenhuma peça tem a
mesma proporção da anterior. A página `/projetos/[slug]` e a entrada no sitemap
saem sozinhas.

---

## Estrutura

```
src/
  app/          layout, home, /projetos/[slug], sitemap, robots, 404
  components/   Nav, MobileMenu, Hero, About, Stack, Statement, Work,
                Experience, Lab, Contact, Footer, SectionMark, Reveal,
                Encarte3D, Experimento, ProjectPage, CustomCursor,
                PageTransition, Theme, PauseOffscreen
  data/         todo o conteúdo
  hooks/        useMedia (ponteiro fino), useSectionSpy (seção ativa)
  lib/          base (basePath), imagemLoader, motion (tokens), utils
public/assets/  capturas dos projetos e o retrato
public/3d/      as três esculturas em .glb
```

## Sistema visual

Tudo mora em tokens no topo de `globals.css`. Uma escala de espaço, três
durações, três curvas, e um raio que é quase zero porque a linguagem é reta.

**O acento é vermelho suíço** (`#c8102e`, e `#ff3b4e` no escuro — sobe de
luminância senão some no fundo). Não é escolha decorativa: é onde ele trabalha,
é o acento clássico dessa tradição, e ocupa menos de 2% da área da tela.
Aparece em estado ativo, número de seção, marco da timeline e foco. Se um
elemento não responde "por que isso existe?", ele não usa o acento.

Duas famílias: **Archivo** (eixo de largura variável, faz todo o display) e
**IBM Plex Mono** (dado técnico, rótulo, número, ano).

### Contraste

Medido no navegador contra `--background`, não estimado:

| token | claro | escuro |
| --- | --- | --- |
| `--text-primary` | 16.7:1 | 17.3:1 |
| `--text-secondary` | 6.1:1 | 7.0:1 |
| `--text-tertiary` | 4.7:1 | 4.8:1 |
| `--accent` | 5.5:1 | 5.5:1 |

`--text-tertiary` no tema claro já foi `#82828c`, que media **3.52:1** e
reprovava em AA. Como é a cor de `.label` — o rótulo que aparece 70+ vezes na
página — a falha não era num canto: era em quase todo metadado do site.
Qualquer mexida nessas cores precisa ser remedida, não estimada.

### Temas

Duas paletas, trocadas pelo botão da navegação e guardadas no `localStorage`.
A paleta escura aparece **duas vezes** em `globals.css` de propósito: um bloco
para a escolha explícita do botão (`:root[data-theme='dark']`) e outro para a
preferência do sistema de quem nunca clicou. Não dá pra fundir num seletor só —
um depende de media query e o outro não. **Mudou num, muda no outro.**

O tema é resolvido por um script inline no `<head>` (`themeBootScript`), antes
da primeira pintura. Sem ele a página nasce clara e pisca pro escuro quando o
React monta.

Classe de componente vive dentro de `@layer components`. **Não escreva CSS fora
de layer** — ele passaria na frente de qualquer utility do Tailwind e um
`text-[14px]` no JSX pararia de funcionar sem explicação.

## Movimento

Os tokens existem em dois lugares porque o CSS e o Framer Motion precisam dos
mesmos números em formatos diferentes: `globals.css` e `src/lib/motion.ts`.
**Mudou num, muda no outro** — sem isso voltam os easings copiados à mão.

`src/components/Reveal.tsx` concentra tudo que reage à rolagem, e é só isto:

| peça | o que faz |
| --- | --- |
| `Reveal` / `RevealGroup` / `RevealItem` | um elemento entra, ou vários em cascata |
| `Parallax` | desloca conforme a rolagem, com mola |
| `ScrollLine` | traço que se desenha com o progresso (a timeline) |
| `ScrollProgress` | a barra fina no topo da página |
| `WordsUp` | título que sobe palavra por palavra |

O deslocamento padrão é **24px**. Já foi 56px, e a diferença importa: acima de
~30px o movimento deixa de parecer que o conteúdo assentou e passa a parecer
que ele voou de algum lugar.

Toda peça checa `prefers-reduced-motion` e, quando está ligado, entrega no
máximo um fade curto — nada de deslocamento, nada de parallax, nada de giro.

## As esculturas 3D

Três peças encartadas entre as seções, em `src/data/estampas.ts`. Cada uma cai
numa virada da narrativa; não são intervalo decorativo. Junto com a faixa de
declaração, são o que impede a leitura de virar uma pilha de seis blocos com o
mesmo ritmo: cada uma troca o fundo, a altura e a densidade da tela.

`Encarte3D` é three.js na unha — sem react-three-fiber, que custaria uns 80 kB
pra reimplementar exatamente o mesmo. Três regras sustentam a performance:

1. o three só é baixado quando a peça chega perto da tela (import dinâmico),
   então quem não rola até lá não paga nada;
2. o loop de render só gira enquanto a seção está visível;
3. ao desmontar, geometria, material, textura e contexto WebGL são destruídos
   na mão — três cenas vivas ao mesmo tempo estourariam o limite de contextos
   do navegador. Na prática nunca existe mais de uma.

Os arquivos originais somavam **149 MB**. Foram pra **2,9 MB**:

```bash
gltf-transform optimize in.glb a.glb --compress false --texture-compress false --simplify-ratio 0.06 --simplify-error 0.005
gltf-transform meshopt b.glb final.glb --level high
```

As texturas são reencodadas pra webp 1024 com sharp entre os dois passos: o
`--texture-compress` do gltf-transform quebra nestes arquivos (libvips reclama
de colourspace). O Daphne veio em PLY ascii de 91 MB e foi convertido à parte,
com rotação de Z-up pra Y-up.

> ### ⚠️ Crédito pendente
>
> Os três modelos são scans de escultura, e a legenda de cada um está no ar
> hoje com o texto **"MODELO 3D — CRÉDITO A PREENCHER"**. Se vieram de acervo
> de terceiros (Sketchfab, Scan the World, museu), a licença quase sempre é
> CC-BY e **exige nome do autor e link**. Preencha o campo `credito` em
> `estampas.ts` antes de divulgar o site.

## Armadilhas que já custaram caro aqui

1. **`overflow: clip`, nunca `hidden`, no `html`.** Vários elementos entram de
   fora da tela. `hidden` conteria tudo igual, mas viraria contêiner de
   rolagem e mataria todo `position: sticky` da página — que é o que sustenta
   o trilho de projetos, os rótulos de camada da stack e as esculturas.
2. **Acento maiúsculo some dentro de máscara de animação.** Com `line-height`
   abaixo de 1, o `overflow: hidden` que faz o texto subir corta o til e o
   agudo — "CÓDIGO" aparece na tela como "CODIGO" e ninguém entende por quê.
   Por isso `WordsUp` devolve o espaço com `padding-top` e compensa no layout
   com margem negativa.
3. **`images.unoptimized` não aplica `basePath`.** No export estático parece a
   saída óbvia, mas nesse modo o `src` sai cru e toda imagem daria 404 dentro
   da subpasta do Pages. Por isso existe `src/lib/imagemLoader.ts`: um loader
   custom é o único ponto por onde todo src passa.
4. **Classe do Tailwind precisa existir escrita por extenso.** O Tailwind lê o
   código-fonte pra decidir o que gerar; uma classe montada em template string
   no runtime não sai no CSS. É por isso que `Lab.tsx` tem um mapa literal de
   `md:col-span-*` em vez de interpolar o número.
5. **Sem JavaScript, nada aparece.** O Framer Motion escreve `opacity: 0` no
   HTML do servidor para tudo que entra por rolagem — 64 elementos na home. Um
   `<noscript>` no `layout.tsx` devolve a opacidade; se você trocar a
   biblioteca de animação, esse bloco precisa acompanhar.

## Acessibilidade

- Contraste medido e aprovado em AA nos dois temas (tabela acima).
- `prefers-reduced-motion` corta parallax, deslocamento e giro em todo lugar.
- Foco visível em tudo: anel de 2px em acento. Nos campos do formulário o
  clique troca só a cor do filete, mas o teclado recebe o anel inteiro.
- WCAG 2.2 pede 24×24 de área clicável. Vários links são linhas de texto de
  14–17px, e aumentar padding empurraria a diagramação — a classe `.hit`
  cresce a área por pseudo-elemento e o layout fica onde estava.
- O menu mobile é diálogo de verdade: foco entra ao abrir, volta ao fechar,
  Esc fecha, a rolagem do fundo trava, e o Tab circula **incluindo o botão de
  fechar**, que mora no cabeçalho, fora do painel.
- Cursor custom só existe em ponteiro fino, e some no dedo.

## Sem saída pro site do cliente

Não existe botão de "ver ao vivo" em lugar nenhum. Quem chega vê o projeto por
dentro deste portfólio — estudo de caso, galeria e ficha — e não numa aba nova.
O campo `live` continua nos dados, mas como **informação** (o estado do
projeto), nunca como link. É decisão de projeto, não esquecimento.

## Contato

O formulário não tem servidor: monta um `mailto:` e entrega pro programa de
e-mail. Sem backend, sem chave pra vazar, funciona em hospedagem estática. O
aviso disso fica escrito ao lado do botão — quem espera um envio com servidor
precisa saber antes de clicar.

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
publica `out/` com `actions/deploy-pages`, e trocar a origem do Pages de branch
pra GitHub Actions.

---

## Sobrou da versão anterior

`index.html`, `portfolio.html` e a pasta `assets/` na raiz são o site estático
antigo, de antes do Next. Nada no app lê esses arquivos — as imagens usadas
foram copiadas pra `public/assets/`. Dá pra apagar quando quiser.
