/* -------------------------------------------------------------------------
   A linha do tempo.

   Montada a partir do trabalho que existe de verdade em projects.ts — nada
   de cargo ou empresa inventados. Cada entrada aponta pro slug do projeto
   quando há um estudo de caso, e a timeline vira mais um caminho pra dentro
   do portfólio em vez de um currículo solto.

   Pra acrescentar um emprego formal depois, é só somar uma entrada com
   `org` preenchido e sem `slug`.
   ------------------------------------------------------------------------- */

export type Entry = {
  year: string;
  title: string;
  /** cliente, produto próprio, ou o nome da empresa quando houver */
  org: string;
  /** o que esse trabalho exigiu que os outros não exigiram */
  summary: string;
  /** as frentes que couberam a ele nesse projeto */
  roles: string[];
  /** liga a entrada ao estudo de caso, quando existe */
  slug?: string;
  /** marco de virada na trajetória */
  milestone?: boolean;
};

export const experience: Entry[] = [
  {
    year: '2026',
    title: 'PHOBIACORI',
    org: 'Cliente · artista independente',
    summary:
      'Primeira loja que montei do zero. O desafio não era vender: era fazer catálogo de tiragem pequena não parecer estoque de fábrica.',
    roles: ['Direção de arte', 'Front-end', 'Arquitetura de conteúdo'],
    slug: 'phobiacori',
  },
  {
    year: '2026',
    title: 'knifes.me',
    org: 'Produto próprio',
    summary:
      'Saí de front-end para produto inteiro: banco, contas, assinatura e a decisão de o que não construir. O que mais aprendi foi a segunda parte.',
    roles: ['Produto', 'Full-stack', 'Banco de dados', 'Assinaturas'],
    slug: 'knifes-me',
    milestone: true,
  },
  {
    year: '2025',
    title: 'Truffle N.B. Tricolore',
    org: 'Cliente · Suíça',
    summary:
      'Produto sazonal me obrigou a projetar para conteúdo que envelhece sozinho — o catálogo tinha que se desatualizar sem quebrar.',
    roles: ['Design', 'Front-end em React', 'Integração de conteúdo'],
    slug: 'truffle-nb',
  },
  {
    year: '2025',
    title: 'Sandra Hair Salon',
    org: 'Cliente · Buchs SG',
    summary:
      'Três idiomas no mesmo balcão. Foi aqui que parei de tratar tradução como camada e passei a tratar como arquitetura.',
    roles: ['Design', 'Front-end', 'Arquitetura de i18n'],
    slug: 'sandra-hair-salon',
  },
  {
    year: '2025',
    title: 'Dra. Thayse Marques',
    org: 'Cliente · Rio de Janeiro',
    summary:
      'O primeiro projeto em que o trabalho de conteúdo pesou mais que o de interface: oito áreas do direito, cada uma com texto e busca próprios.',
    roles: ['Pesquisa e conteúdo', 'Design', 'Front-end', 'SEO técnico'],
    slug: 'thayse-marques',
    milestone: true,
  },
];

/** os anos distintos, do mais novo pro mais velho */
export const years = [...new Set(experience.map((e) => e.year))];
