# portifolio-animado

Portfólio de um desenvolvedor full-stack e designer de produto, montado como
**experiência de rolagem**: cinco capítulos numerados, tipografia de display
gigante, e três esculturas de mármore girando no escuro entre um ato e o outro.

A direção é sala escura — arquitetura contemporânea, editorial suíço, hotel de
luxo. Um tema só (escuro), uma cor de acento só, e nenhuma animação que não
responda "por que isso existe?". O que separa isto de uma landing page é o
ritmo: cada seção tem uma forma diferente, e entre elas entram peças que não
são seção (esculturas, declarações em display, uma tela invertida) justamente
pra que a leitura não vire uma pilha de blocos iguais.

O site é escrito **em inglês**. Não é preferência estética: quem contrata
produto digital na Europa conversa em inglês mesmo quando ninguém ali é nativo.

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind v4 + Framer Motion +
Lenis + three.js. Export estático: o build gera HTML pronto pras rotas e o
GitHub Pages só serve arquivo.

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
| `src/data/sections.ts` | **a ordem dos capítulos, seus números e suas linhas de abertura** |
| `src/data/site.ts` | nome, cargo, e-mail, redes, cidade, coordenada, colofão |
| `src/data/projects.ts` | os projetos: home, `/work/[slug]`, sitemap e metadata |
| `src/data/capabilities.ts` | as seis frentes de trabalho e o visual de cada uma |
| `src/data/stack.ts` | as cinco camadas da stack |
| `src/data/experience.ts` | a linha do tempo |
| `src/data/interludes.ts` | as três esculturas |

Duas regras que o resto do código assume:

1. **A ordem em `sections.ts` é a ordem da página.** O número de cada capítulo
   é a posição no array. Inserir uma seção no meio renumera tudo sozinho — mas
   `app/page.tsx` precisa ser reordenado junto, senão a navegação aponta pra
   um lugar e o conteúdo está em outro.
2. **Nenhum número é digitado à mão.** As estatísticas do manifesto, o total de
   projetos e a contagem de ferramentas são calculados dos arquivos de dados.
   Acrescentar um projeto atualiza a home, o rodapé e o sitemap de uma vez.

### As peças entre os capítulos

| peça | onde | por quê |
| --- | --- | --- |
| escultura 3D | depois de About, de Work e da stack | a pausa. Toma a tela inteira e não pede nada |
| declaração | dentro de Work, depois do 2º e do 4º projeto | separa capítulos sem tirar o leitor da seção |
| stack | logo depois de Capabilities | é a segunda metade do mesmo assunto, por isso não tem número |
| filosofia | antes do contato | a única tela clara do site |

A filosofia inverte a página redefinindo os tokens de cor **no escopo da
seção**. Tudo que está dentro (rótulo, filete, texto) acompanha sem saber que
está invertido. É a razão de os tokens existirem.

---

## Estrutura

```
src/
  app/
    layout.tsx          fontes, metadata, JSON-LD, cascas fixas
    page.tsx            a ordem da home
    work/[slug]/        um estudo de caso por projeto, gerados no build
    globals.css         o sistema inteiro
  components/           uma peça por arquivo
  data/                 todo o conteúdo
  hooks/                useMedia, useSectionSpy
  lib/                  basePath, tokens de movimento em JS, utils
public/
  3d/                   as três esculturas em .glb
  video/hero.mp4        a textura do hero, 355 kB
  assets/               imagens dos projetos
```

---

## Sistema visual

Tema único, escuro. **Não há botão de tema**, e isso é decisão: a sala escura
*é* a identidade, e uma versão clara desta página seria outro projeto.

```
--background   #0A0A0A    --text-primary    #F2F0EB
--surface      #141414    --text-secondary  #8C8C8C
--accent       #E2673F    --text-tertiary   #6F6F6F
```

O acento é cor de aço cor-ten — o material de fachada da arquitetura que a
direção persegue. Ele ocupa menos de 1% da área da tela: estado ativo, número
de capítulo, foco, seta de CTA. **Trocar aquela linha em `globals.css` troca o
site inteiro**, e é pra isso que ela existe sozinha lá.

### Tipografia

Duas famílias, e as duas trabalhando.

**Archivo** faz todo o display. O que importa nela não é o desenho da letra: é
o eixo variável de largura (`wdth` 62..125). Quanto maior o título, mais
estreita a letra — que é como manchete de jornal sempre foi composta. `I BUILD
DIGITAL EXPERIENCES.` em 13rem só cabe na tela porque roda em `wdth: 84`. Sem
esse eixo eu precisaria de uma segunda família condensada: mais um download, e
duas famílias que nunca combinam de verdade.

| classe | uso | wdth |
| --- | --- | --- |
| `.display-hero` | hero e contato, até 13rem | 84 |
| `.display-xl` | título de capítulo | 88 |
| `.display-lg` | subtítulo, item de lista grande | 92 |
| `.display-md` | título de bloco | 100 |
| `.numeral` | algarismo como desenho | 86 |

Todo display é caixa alta. Não é enfeite: em caixa alta o bloco de texto vira
retângulo, e retângulo é o que se compõe contra uma grade. Minúscula, com
ascendente e descendente, deixa a borda serrilhada e a composição perde o fio.

**Instrument Sans** é o resto: texto, rótulo, número. Neutra o suficiente pra
sumir. **Não existe família mono baixada** — dado técnico usa a sans com
`tabular-nums`, que alinha número sem trazer junto a estética de terminal que
aparece em todo portfólio de dev. O único mono é o do sistema, e ele só desenha
a onda de ASCII de um dos estudos.

### Contraste

Medido no navegador sobre `--background`, não estimado:

| par | razão | AA |
| --- | --- | --- |
| primary / background | 17,4:1 | ✅ |
| secondary / background | 5,9:1 | ✅ |
| tertiary / background | 4,6:1 | ✅ texto grande |
| accent / background | 5,9:1 | ✅ |

`--text-tertiary` só aparece em metadado decorativo que já está escrito em
texto em outro lugar.

---

## Movimento

Três durações e três curvas, e nada mais. Os mesmos números existem em CSS
(`globals.css`) e em JS (`src/lib/motion.ts`) — o Framer precisa deles como
número. **Mudou num, muda no outro.**

| token | valor | onde |
| --- | --- | --- |
| `fast` | 160 ms | hover |
| `normal` | 400 ms | entrada, troca de estado |
| `slow` | 800 ms | título, cortina |

As peças de rolagem estão todas em `components/Reveal.tsx`: `Reveal`,
`RevealGroup`, `Parallax`, `ScrollLine`, `Lines` e `Counter`. Nenhum componente
implementa animação de entrada por conta própria.

**`Lines`** é a entrada assinatura: cada linha do display sobe de trás de uma
máscara, 80 ms entre uma e outra. Ela recebe um **array de linhas**, não uma
string — nesta tipografia a quebra é composição, não acidente de largura.

**Lenis** é a única dependência de animação além do Framer, e entrou porque faz
algo que o Framer não faz: muda a sensação da página inteira. Ela é desligada
por completo em `prefers-reduced-motion` (inércia é gatilho de enjoo, não
detalhe de acessibilidade) e fica fora do toque, onde o sistema já tem inércia
melhor. O clique em âncora passa a ser trabalho dele — daí `scroll-behavior:
auto` no CSS: com o nativo ligado junto, os dois disputam a mesma rolagem.

**A tela de carregamento** existe por motivo estrutural: o hero abre com um
título que sobe de trás de uma máscara, e o gesto só funciona se a Archivo já
estiver na tela. Teto de 1,4 s, uma vez por aba (`sessionStorage`), e some
inteira em movimento reduzido. Ela **destrava a rolagem quando decide fechar**,
não quando a animação de saída termina: rAF não roda em aba de fundo, e amarrar
o destravamento ao fim da animação prendia a página de quem abre o site numa
aba que ainda não olhou.

---

## O vídeo do hero

`public/video/hero.mp4`, 355 kB. Entra a **12% de opacidade, em cinza, atrás da
grade técnica** — nessa opacidade ninguém lê "pessoa digitando num laptop", que
seria a imagem de banco mais batida que existe. O que fica é luz que se move.

Ele não é baixado em tela menor que 768px nem em movimento reduzido, e como o
`useMedia` só responde no cliente, nunca sai no HTML do servidor: o LCP continua
sendo o título.

Cortado do original de 154 MB com:

```bash
ffmpeg -ss 2 -t 11 -i entrada.MOV \
  -vf "scale=1280:-2,hue=s=0,eq=contrast=1.18:brightness=-0.04" \
  -an -c:v libx264 -crf 32 -preset slow -pix_fmt yuv420p -movflags +faststart \
  public/video/hero.mp4
```

O cinza é queimado no arquivo de propósito: como ele nunca aparece colorido,
gravar em cinza corta o bitrate quase pela metade.

---

## As esculturas 3D

Três peças em `src/data/interludes.ts`, cada uma numa virada da narrativa.

`Interlude` é three.js na unha — sem react-three-fiber, que custaria uns 80 kB
pra reimplementar exatamente o mesmo. Três regras sustentam a performance:

1. o three só é baixado quando a peça chega perto da tela (import dinâmico),
   então quem não rola até lá não paga nada;
2. o loop de render só gira enquanto a seção está visível;
3. ao desmontar, geometria, material, textura e contexto WebGL são destruídos
   na mão — três cenas vivas ao mesmo tempo estourariam o limite de contextos
   do navegador. Na prática nunca existe mais de uma.

A luz é de museu, não de estúdio de produto: chave quente e alta pela direita,
preenchimento frio e fraco pela esquerda, contraluz mínima pra a silhueta não
colar no preto, e ambiente quase zero (`toneMappingExposure: 0.85`). O canvas é
transparente, então a peça assenta direto no fundo da página, sem moldura.

Os arquivos originais somavam **149 MB**. Foram pra **2,9 MB**:

```bash
gltf-transform optimize in.glb a.glb --compress false --texture-compress false --simplify-ratio 0.06 --simplify-error 0.005
gltf-transform meshopt a.glb final.glb --level high
```

As texturas são reencodadas pra webp 1024 com sharp entre os dois passos: o
`--texture-compress` do gltf-transform quebra nestes arquivos (libvips reclama
de colourspace). O Daphne veio em PLY ascii de 91 MB e foi convertido à parte,
com rotação de Z-up pra Y-up.

---

## Os estudos de caso

Cada projeto em `/work/[slug]` segue a mesma ordem de reportagem: manchete,
chapa de abertura, **challenge**, **approach** (cinco etapas), **design
system**, **development**, **final experience** em rolagem horizontal, e o
próximo projeto.

A regra que segura a estrutura: nenhuma dessas seções repete a anterior. Se
`challenge` e `approach` pudessem trocar de lugar sem que o texto estranhasse,
os dois estão descrevendo a mesma coisa e um deles sobra.

> **As paletas do `design system` não são inventadas.** Cada hex foi lido do CSS
> que está no ar naquele domínio. Um estudo de caso que mostra uma cor que o
> site não usa é a primeira coisa que um contratante confere, e a única que ele
> precisa conferir. Ao trocar um projeto, leia os valores do projeto — não
> escolha valores que combinem com esta página.

A faixa de screenshots sangra pra fora da margem de propósito: é o único
elemento da página que atravessa o `shell`, e é isso que a marca como "outra
coisa" antes de qualquer instrução. Ela é `role="region"` com `tabIndex={0}`
porque um contêiner de rolagem que só responde ao mouse é inalcançável pelo
teclado — WCAG 2.1.1 trata rolagem como funcionalidade.

---

## Armadilhas que já custaram caro aqui

1. **`overflow: clip`, nunca `hidden`, no `html`.** `hidden` viraria contêiner
   de rolagem e mataria todo `position: sticky` da página — que é o que sustenta
   as esculturas e o trilho de leitura da seção de trabalho.

2. **Estado no array de dependências de um efeito que ele mesmo escreve.** O
   contador ficava travado em `00`: o efeito guardava "já contei" num estado e
   ainda mantinha esse estado nas dependências, então ele reexecutava no mesmo
   instante e a limpeza parava a animação no primeiro quadro. Quem garante a
   execução única agora é o `once: true` do `useInView`.

3. **`npm run build` com o dev aberto.** Sobrescreve o `.next` e o dev passa a
   responder `__webpack_modules__[moduleId] is not a function`. Apague `.next`
   e reinicie.

4. **Classe do Tailwind montada em runtime não existe.** O Tailwind lê o
   código-fonte pra decidir o que gerar; `` `md:col-span-${n}` `` sai vazio. Onde
   isso é preciso, existe um mapa com as classes escritas por extenso.

5. **Caminho absoluto em `metadata`.** O site mora numa subpasta; `/assets/x`
   resolvido contra a `metadataBase` perde o prefixo e vai pra raiz do domínio.
   Tudo que vai pro `<head>` é montado a partir de `site.url`.

---

## Acessibilidade

- Foco visível em tudo, com `:focus-visible` e anel em acento.
- Menu mobile é diálogo de verdade: foco entra ao abrir, volta ao fechar, Esc
  fecha, Tab circula dentro (incluindo o botão que fecha, que mora fora do
  painel) e a rolagem do fundo trava.
- Alvos de toque de no mínimo 44px; onde a diagramação não permite padding, a
  área cresce por pseudo-elemento (`.hit`).
- `prefers-reduced-motion` desliga Lenis, parallax, contagem, loops e a tela de
  carregamento. Sobra fade curto.
- Sem JavaScript o conteúdo aparece: um `<style>` dentro de `<noscript>` anula
  o `opacity: 0` que o Framer escreve no HTML do servidor.
- Os visuais das capacidades e as esculturas são `aria-hidden` — o que eles
  comunicam já está escrito ao lado, em texto.

---

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
`http://localhost:3000/portifolio-animado/`. É de propósito — o dev mostra
exatamente o que o Pages vai mostrar.

### Trocar por deploy automático (opcional)

Hoje o deploy é manual porque o token do `gh` nesta máquina não tem o escopo
`workflow`, e o GitHub recusa o push de qualquer arquivo em
`.github/workflows/`. Pra liberar:

```bash
gh auth refresh -s workflow
```

---

## Sobrou da versão anterior

`index.html`, `portfolio.html` e a pasta `assets/` na raiz são o site estático
antigo, de antes do Next. Nada no app lê esses arquivos — as imagens usadas
foram copiadas pra `public/assets/`. Dá pra apagar quando quiser.
