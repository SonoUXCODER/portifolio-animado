/* -------------------------------------------------------------------------
   A ESTRUTURA, IGUAL NOS TRÊS IDIOMAS.

   Tudo que não é prosa mora aqui: slug, ano, URL, dimensão de imagem, hex
   de cor, nome de tecnologia, layout da composição. São os dados que não
   têm tradução — "1440px" e "#0B0A09" são a mesma coisa em qualquer língua,
   e "React" também.

   A razão de existir este arquivo não é economizar linha: é impedir que as
   três versões do site divirjam. Se cada idioma trouxesse a própria lista de
   projetos inteira, bastaria alguém corrigir uma URL em inglês pra que a
   versão alemã ficasse apontando pro lugar errado por meses sem ninguém
   notar. Aqui a URL existe uma vez só.

   >>> ARRAYS ACOPLADOS POR ÍNDICE <<<
   `paletteHex` e `typeFamilies` são casados por posição com os arrays
   correspondentes de cada idioma. É compacto e é frágil: tirar uma cor aqui
   sem tirar o nome dela nos três idiomas produz uma amostra sem legenda.
   Por isso existe a conferência em content/index.ts, que estoura no build
   em vez de sair torto no ar.
   ------------------------------------------------------------------------- */

export type ProjectLayout = 'wide' | 'offset' | 'tall' | 'split';

export type ImagemShape = {
  src: string;
  width: number;
  height: number;
};

export type ProjectShape = {
  slug: string;
  year: string;
  /** o endereço no ar, quando existe */
  live: string | null;
  github: string | null;
  /**
   * Se o site aceita ser aberto dentro do portfólio, num iframe.
   *
   * Não é preferência: é o que o servidor daquele domínio responde. Um
   * `X-Frame-Options` ou um `frame-ancestors` no CSP faz o navegador
   * recusar o documento, e não existe jeito de descobrir isso pelo JS —
   * o evento `load` dispara igual. Então o valor é conferido na mão:
   *
   *     curl -sSI <url> | grep -i "x-frame-options\|content-security"
   *
   * Com `false`, o visualizador mostra o motivo em vez de um quadro branco.
   */
  embeddable: boolean;
  layout: ProjectLayout;
  /** nome de tecnologia não se traduz */
  stack: string[];
  cover: ImagemShape;
  gallery: ImagemShape[];
  /** casado por índice com `system.palette` de cada idioma */
  paletteHex: string[];
  /** casado por índice com `system.type` de cada idioma */
  typeFamilies: string[];
};

/* -------------------------------------------------------------------------
   OS PROJETOS.

   A ordem deste array é a ordem da seção de trabalho. Inserir um projeto no
   meio reordena a página sozinho.

   >>> AS PALETAS <<<
   Cada hex foi lido do CSS que está no ar naquele domínio, não escolhido
   pra combinar com esta página. Um estudo de caso que mostra uma cor que o
   site não usa é a primeira coisa que um contratante confere, e a única que
   ele precisa conferir.
   ------------------------------------------------------------------------- */

export const projectShapes: ProjectShape[] = [
  {
    slug: 'phobiacori',
    year: '2026',
    live: 'https://sonouxcoder.github.io/phobiacore/',
    github: null,
    embeddable: true,
    layout: 'wide',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Static Export'],
    cover: { src: '/assets/projetos/phobia-cover.webp', width: 3150, height: 1969 },
    gallery: [
      { src: '/assets/projetos/phobia-long.webp', width: 1400, height: 4400 },
      { src: '/assets/projetos/phobia-cover.webp', width: 3150, height: 1969 },
    ],
    paletteHex: ['#0B0A09', '#F4F0E6', '#E6E0D2', '#B8352A', '#D9A520'],
    typeFamilies: ['Archivo Black', 'Space Mono', 'Inter'],
  },
  {
    slug: 'knifes-me',
    year: '2026',
    live: 'https://knifes.me/',
    github: 'https://github.com/SonoUXCODER',
    /* CSP com frame-ancestors 'none' — é produto com conta e pagamento */
    embeddable: false,
    layout: 'tall',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Stripe'],
    cover: { src: '/assets/projetos/knifes-long.webp', width: 1400, height: 4400 },
    gallery: [
      { src: '/assets/projetos/knifes-cover.webp', width: 3150, height: 1969 },
      { src: '/assets/projetos/knifes-long.webp', width: 1400, height: 4400 },
    ],
    paletteHex: ['#050507', '#1B0A33', '#A94DFF', '#7300FF', '#FFFFFF'],
    typeFamilies: ['Inter Tight', 'Inter', 'System mono'],
  },
  {
    slug: 'sandra-hair-salon',
    year: '2025',
    live: 'https://sandrahairsalon.ch/',
    github: null,
    embeddable: true,
    layout: 'split',
    stack: ['HTML', 'CSS', 'JavaScript', 'i18n', 'WhatsApp API'],
    cover: { src: '/assets/projetos/sandra-cover.webp', width: 3150, height: 1969 },
    gallery: [
      { src: '/assets/projetos/sandra-long.webp', width: 1400, height: 4400 },
      { src: '/assets/projetos/sandra-cover.webp', width: 3150, height: 1969 },
    ],
    paletteHex: ['#120C09', '#C9A15B', '#B4883E', '#E8CE96', '#FFF7E4'],
    typeFamilies: ['Serif display', 'Humanist sans', 'Tabular sans'],
  },
  {
    slug: 'thayse-marques',
    year: '2025',
    live: 'https://drathaysemarques.adv.br/',
    github: null,
    embeddable: true,
    layout: 'offset',
    stack: ['HTML', 'CSS', 'JavaScript', 'Structured data', 'WhatsApp API'],
    cover: { src: '/assets/projetos/thayse-cover.webp', width: 3150, height: 1969 },
    gallery: [
      { src: '/assets/projetos/thayse-long.webp', width: 1400, height: 4400 },
      { src: '/assets/projetos/thayse-cover.webp', width: 3150, height: 1969 },
    ],
    paletteHex: ['#120E0D', '#F3EFE7', '#E9E1D3', '#E88A96', '#FCFAF6'],
    typeFamilies: ['Transitional serif', 'Neutral sans', 'Tabular sans'],
  },
  {
    slug: 'truffle-nb',
    year: '2025',
    live: 'https://kyso1.github.io/fg-systems/',
    github: 'https://github.com/kyso1/fg-systems',
    embeddable: true,
    layout: 'offset',
    stack: ['React', 'Vite', 'TypeScript', 'CSS Modules'],
    cover: { src: '/assets/projetos/fg-cover.webp', width: 3150, height: 1969 },
    gallery: [
      { src: '/assets/projetos/fg-cover.webp', width: 3150, height: 1969 },
      { src: '/assets/projetos/fg-long.webp', width: 1400, height: 4400 },
    ],
    paletteHex: ['#8C3227', '#C89B4B', '#E8C87E', '#F7F1E3', '#FFFDF7'],
    typeFamilies: ['Didone serif', 'Grotesque sans', 'Tabular sans'],
  },
];

/* -------------------------------------------------------------------------
   A STACK.

   `label` e `since` não se traduzem: "PostgreSQL" é PostgreSQL, e 2024 é
   2024. O que muda por idioma é a `note` de cada ferramenta e o resumo de
   cada camada.
   ------------------------------------------------------------------------- */

export type ToolShape = {
  label: string;
  /** ano em que a ferramenta entrou pra valer */
  since: string;
  /** a que puxa o peso do dia a dia nessa camada */
  primary?: boolean;
};

export type LayerShape = {
  id: string;
  tools: ToolShape[];
};

export const layerShapes: LayerShape[] = [
  {
    id: 'frontend',
    tools: [
      { label: 'React', since: '2022', primary: true },
      { label: 'Next.js', since: '2023', primary: true },
      { label: 'TypeScript', since: '2023', primary: true },
      { label: 'JavaScript', since: '2021' },
      { label: 'Tailwind CSS', since: '2023' },
      { label: 'CSS', since: '2021', primary: true },
    ],
  },
  {
    id: 'backend',
    tools: [
      { label: 'Node.js', since: '2023' },
      { label: 'PostgreSQL', since: '2024', primary: true },
      { label: 'Supabase', since: '2024' },
      { label: 'REST APIs', since: '2023' },
      { label: 'Authentication', since: '2024' },
      { label: 'Stripe', since: '2025' },
    ],
  },
  {
    id: 'design',
    tools: [
      { label: 'Figma', since: '2021', primary: true },
      { label: 'UX Research', since: '2022' },
      { label: 'Prototyping', since: '2022' },
      { label: 'Design Systems', since: '2023', primary: true },
      { label: 'Three.js', since: '2025' },
      { label: 'Blender', since: '2025' },
    ],
  },
  {
    id: 'ai',
    tools: [
      { label: 'Claude API', since: '2025', primary: true },
      { label: 'OpenAI API', since: '2025' },
      { label: 'Prompt design', since: '2025', primary: true },
      { label: 'Streaming UI', since: '2025' },
      { label: 'Evaluations', since: '2026' },
      { label: 'AI-assisted build', since: '2024' },
    ],
  },
  {
    id: 'workflow',
    tools: [
      { label: 'Git', since: '2021', primary: true },
      { label: 'GitHub', since: '2021' },
      { label: 'CI/CD', since: '2024' },
      { label: 'Agile', since: '2023' },
      { label: 'Accessibility audits', since: '2024' },
      { label: 'Performance budgets', since: '2024' },
    ],
  },
];

/* -------------------------------------------------------------------------
   A TRAJETÓRIA E OS INTERVALOS
   ------------------------------------------------------------------------- */

export type EntryShape = {
  id: string;
  /** liga a entrada ao estudo de caso, quando existe */
  slug?: string;
  /** virada de fase */
  milestone?: boolean;
};

export const entryShapes: EntryShape[] = [
  { id: 'now', milestone: true },
  { id: 'knifes', slug: 'knifes-me', milestone: true },
  { id: 'phobia', slug: 'phobiacori' },
  { id: 'truffle', slug: 'truffle-nb' },
  { id: 'sandra', slug: 'sandra-hair-salon' },
  { id: 'thayse', slug: 'thayse-marques' },
  { id: 'foundations' },
];

/**
 * O caráter de cada escultura, que decide como a câmera se comporta.
 *
 * As três não podem entrar iguais: se entrarem, viram três vezes o mesmo
 * intervalo e a segunda já é repetição. Cada uma responde a uma ideia:
 *
 *   descoberta   a peça emerge do escuro. Percurso longo de câmera e a luz
 *                subindo com a rolagem, como quem acha uma coisa enterrada.
 *   metamorfose  a câmera orbita enquanto o modelo gira, então a silhueta
 *                nunca se repete. É a que mais muda de forma ao ser vista.
 *   precisao     quase não se aproxima, mas a lente fecha. Comprimir a
 *                perspectiva é o que revela a dobra do tecido, e é o
 *                oposto do que as outras duas fazem.
 */
export type CaraterInterlude = 'descoberta' | 'metamorfose' | 'precisao';

export type InterludeShape = {
  slug: string;
  file: string;
  /** rotação inicial em radianos, pra escolher a cara que abre a peça */
  startAngle: number;
  /** quanto o modelo gira do começo ao fim da rolagem */
  totalAngle: number;
  carater: CaraterInterlude;
};

export const interludeShapes: InterludeShape[] = [
  { slug: 'klio', file: '/3d/klio.glb', startAngle: -0.35, totalAngle: Math.PI * 1.15, carater: 'descoberta' },
  { slug: 'daphne', file: '/3d/daphne.glb', startAngle: 0.5, totalAngle: -Math.PI * 1.3, carater: 'metamorfose' },
  { slug: 'saint-andre', file: '/3d/saint-andre.glb', startAngle: -0.2, totalAngle: Math.PI, carater: 'precisao' },
];

/** qual estudo o <Visual/> desenha; a implementação está em Visual.tsx */
export type VisualKind = 'grid' | 'stripes' | 'orbit' | 'moire' | 'graph' | 'ascii';

export type CapabilityShape = {
  id: string;
  visual: VisualKind;
};

export const capabilityShapes: CapabilityShape[] = [
  { id: 'ux-ui', visual: 'grid' },
  { id: 'frontend', visual: 'stripes' },
  { id: 'full-stack', visual: 'orbit' },
  { id: 'design-systems', visual: 'moire' },
  { id: 'ai', visual: 'graph' },
  { id: 'creative', visual: 'ascii' },
];

/** os capítulos, na ordem em que são lidos */
export const sectionIds = ['about', 'work', 'capabilities', 'experience', 'contact'] as const;
export type SectionId = (typeof sectionIds)[number];

/* -------------------------------------------------------------------------
   IDENTIDADE — o que não muda de idioma nenhum
   ------------------------------------------------------------------------- */

export const identity = {
  name: 'SONO',
  /* a marca como ela aparece na navegação: o ® é parte do desenho */
  wordmark: 'sono®',
  handle: 'sonouxcoder',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sonouxcoder.github.io/portifolio-animado',
  email: 'alissonvpt1@gmail.com',
  city: 'Bern',
  coordinates: '46.9480° N / 7.4474° E',
  timezone: 'Europe/Zurich',
  /**
   * Quantos produtos já foram entregues, ao todo.
   *
   * Não sai de `projectShapes.length`, e é de propósito: o arquivo de
   * projetos tem os cinco que valem um estudo de caso escrito, não tudo que
   * já saiu daqui. Contar o array daria cinco e subestimaria o trabalho em
   * quatro vezes.
   */
  shipped: 21,
  /** o primeiro ano com trabalho registrado, usado nas estatísticas */
  startYear: 2021,
  social: [
    { label: 'GitHub', href: 'https://github.com/SonoUXCODER' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sonouxcoder' },
    { label: 'Instagram', href: 'https://instagram.com/somnifobias' },
    { label: 'Email', href: 'mailto:alissonvpt1@gmail.com' },
  ],
};
