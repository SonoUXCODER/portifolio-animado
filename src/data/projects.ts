/* -------------------------------------------------------------------------
   Os projetos. Nada de conteúdo preso em componente: a home, as páginas
   /projetos/[slug], o sitemap e a metadata leem tudo daqui.

   `layout` decide a composição editorial na home:
     full        -> imagem gigante, quase toda a largura
     small-right -> imagem pequena, deslocada pra direita
     vertical    -> print vertical, comprido
     duo         -> duas imagens montadas juntas
   ------------------------------------------------------------------------- */

export type ProjectLayout = 'full' | 'small-right' | 'vertical' | 'duo';

export type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** legenda manuscrita que aparece do lado da imagem */
  nota?: string;
};

export type Project = {
  num: string;
  title: string;
  slug: string;
  /** uma linha, aparece na home */
  description: string;
  /** parágrafo de abertura do estudo de caso */
  intro: string;
  technologies: string[];
  image: GalleryItem;
  gallery: GalleryItem[];
  github: string | null;
  live: string | null;
  year: string;
  /** carimbo: "produto próprio", "cliente" */
  selo?: string;
  layout: ProjectLayout;
  /** rotação em graus na composição da home */
  tilt: number;
  accent: string;
  problema: string;
  solucao: string;
  papel: string[];
  resultado: string[];
};

export const projects: Project[] = [
  {
    num: '01',
    title: 'Dra. Thayse Marques',
    slug: 'thayse-marques',
    description: 'site de escritório de advocacia. o formulário lê o caso e manda pra área certa.',
    intro:
      'Um escritório no Rio recebia caso de família, trabalhista e previdenciário tudo no mesmo WhatsApp. A ideia foi virar a primeira conversa do avesso: a triagem acontece antes do contato.',
    technologies: ['HTML', 'CSS', 'JAVASCRIPT', 'SEO', 'WHATSAPP API'],
    image: {
      src: '/assets/projetos/thayse-cover.webp',
      alt: 'Home do site da Dra. Thayse Marques, com foto e menu das áreas do direito',
      width: 3150,
      height: 1969,
    },
    gallery: [
      {
        src: '/assets/projetos/thayse-long.webp',
        alt: 'Página inteira do site da advocacia, do topo ao rodapé',
        width: 1400,
        height: 4400,
        nota: 'a página inteira, de cima a baixo',
      },
      {
        src: '/assets/projetos/thayse-cover.webp',
        alt: 'Detalhe do topo do site da advocacia',
        width: 3150,
        height: 1969,
        nota: 'o topo, onde tudo começa',
      },
    ],
    github: null,
    live: 'https://drathaysemarques.adv.br/',
    year: '2025',
    selo: 'cliente',
    layout: 'full',
    tilt: -1.2,
    accent: 'var(--accent)',
    problema:
      'Tudo chegava pelo mesmo número, sem contexto. A advogada gastava a primeira meia hora de cada atendimento descobrindo do que o caso se tratava — e boa parte nem era da área dela.',
    solucao:
      'Oito áreas do direito viraram oito páginas com texto próprio, cada uma puxando busca. Um formulário curto no fim de cada página monta a mensagem já classificada e abre o WhatsApp com o caso escrito.',
    papel: ['pesquisa e conteúdo', 'design em figma', 'front-end', 'seo técnico', 'publicação'],
    resultado: [
      'contato chega escrito e já separado por área',
      'oito páginas indexadas em vez de uma',
      'agendamento sem ida e volta de mensagem',
    ],
  },
  {
    num: '02',
    title: 'Sandra Hair Salon',
    slug: 'sandra-hair-salon',
    description: 'salão suíço em três idiomas, com preço em CHF e agenda no bolso.',
    intro:
      'Um salão em Buchs (SG) atende alemão, inglês e português no mesmo balcão. O site precisava fazer a mesma coisa sem virar três sites.',
    technologies: ['HTML', 'CSS', 'JAVASCRIPT', 'I18N', 'WHATSAPP API'],
    image: {
      src: '/assets/projetos/sandra-cover.webp',
      alt: 'Home do site do Sandra Hair Salon',
      width: 3150,
      height: 1969,
    },
    gallery: [
      {
        src: '/assets/projetos/sandra-long.webp',
        alt: 'Página inteira do salão, com tabela de serviços e agenda',
        width: 1400,
        height: 4400,
        nota: 'preço em CHF, sem letra miúda',
      },
      {
        src: '/assets/projetos/sandra-cover.webp',
        alt: 'Detalhe do topo do site do salão',
        width: 3150,
        height: 1969,
        nota: 'DE / EN / PT no mesmo botão',
      },
    ],
    github: null,
    live: 'https://sandrahairsalon.ch/',
    year: '2025',
    selo: 'cliente',
    layout: 'small-right',
    tilt: 1.6,
    accent: 'var(--accent)',
    problema:
      'O bairro é trilíngue. Traduzir depois, por cima, sempre quebra alguma coisa: o valor fica errado, o botão estoura, alguém vê metade em alemão.',
    solucao:
      'Os textos moram num dicionário só e a troca de idioma acontece na hora, sem recarregar. Horário, moeda e formato de data mudam junto com a língua.',
    papel: ['design em figma', 'front-end', 'arquitetura de i18n', 'publicação'],
    resultado: [
      'três idiomas sem três páginas',
      'tabela de serviços que o salão atualiza sozinho',
      'pedido de horário direto do celular',
    ],
  },
  {
    num: '03',
    title: 'knifes.me',
    slug: 'knifes-me',
    description: 'meu produto: link-in-bio onde cada pessoa monta a própria página.',
    intro:
      'Comecei porque toda ferramenta de link na bio parecia a mesma coisa. Aqui a pessoa escolhe cor, fundo, música e layout — e a página continua sendo dela, não do template.',
    technologies: ['NEXT.JS', 'TYPESCRIPT', 'SUPABASE', 'TAILWIND', 'STRIPE'],
    image: {
      src: '/assets/projetos/knifes-long.webp',
      alt: 'Página de perfil do knifes.me, do topo ao rodapé',
      width: 1400,
      height: 4400,
    },
    gallery: [
      {
        src: '/assets/projetos/knifes-cover.webp',
        alt: 'Tela inicial do knifes.me',
        width: 3150,
        height: 1969,
        nota: 'muda aqui, vê na hora',
      },
      {
        src: '/assets/projetos/knifes-long.webp',
        alt: 'Perfil completo gerado pelo knifes.me',
        width: 1400,
        height: 4400,
        nota: 'knifes.me/seunome',
      },
    ],
    github: 'https://github.com/SonoUXCODER',
    live: 'https://knifes.me/',
    year: '2026',
    selo: 'produto próprio',
    layout: 'vertical',
    tilt: -2.4,
    accent: 'var(--accent)',
    problema:
      'Personalização de verdade custa caro em performance: cada tema novo vira mais CSS carregado por quem só queria clicar num link.',
    solucao:
      'O tema é um punhado de variáveis CSS guardadas no banco. O perfil renderiza no servidor já com essas variáveis dentro — sem editor e sem bundle extra pra quem está só de passagem.',
    papel: ['produto', 'design', 'front-end', 'back-end', 'banco de dados', 'assinaturas'],
    resultado: [
      'perfil público em knifes.me/nome',
      'tema editável sem tocar em código',
      'contas, ranking e assinatura rodando',
    ],
  },
  {
    num: '04',
    title: 'Truffle N.B.',
    slug: 'truffle-nb',
    description: 'catálogo de trufa fresca italiana entregue na suíça inteira.',
    intro:
      'Trufa fresca dura poucos dias. O site tinha que dizer o que existe hoje, quanto tempo demora pra chegar, e nada além disso.',
    technologies: ['REACT', 'VITE', 'TYPESCRIPT', 'CSS MODULES'],
    image: {
      src: '/assets/projetos/fg-cover.webp',
      alt: 'Home da Truffle N.B. Tricolore',
      width: 3150,
      height: 1969,
    },
    gallery: [
      {
        src: '/assets/projetos/fg-cover.webp',
        alt: 'Topo do site da Truffle N.B.',
        width: 3150,
        height: 1969,
        nota: 'preto, terra e um respiro',
      },
      {
        src: '/assets/projetos/fg-long.webp',
        alt: 'Página inteira da Truffle N.B. Tricolore',
        width: 1400,
        height: 4400,
        nota: 'só o que tem na safra',
      },
    ],
    github: 'https://github.com/kyso1/fg-systems',
    live: 'https://kyso1.github.io/fg-systems/',
    year: '2025',
    selo: 'cliente',
    layout: 'duo',
    tilt: 1.1,
    accent: 'var(--accent)',
    problema:
      'Produto sazonal envelhece na tela. Uma página estática mostrando trufa que acabou é pior do que não ter página nenhuma.',
    solucao:
      'O catálogo lê um arquivo de dados que o próprio cliente edita. O que saiu da safra some da lista sozinho e o texto de entrega muda junto.',
    papel: ['design em figma', 'front-end em react', 'integração de conteúdo', 'publicação'],
    resultado: [
      'catálogo que envelhece sozinho, do jeito certo',
      'carregamento abaixo de um segundo no 4G',
      'cliente atualiza sem me chamar',
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
