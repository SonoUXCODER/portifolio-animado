/* -------------------------------------------------------------------------
   A TRAJETÓRIA.

   Montada a partir do trabalho que existe de verdade em projects.ts — nada
   de cargo ou empresa inventados pra encher currículo. Cada entrada aponta
   pro slug do estudo de caso quando há um, e a linha do tempo vira mais um
   caminho pra dentro do portfólio em vez de um anexo morto.

   `details` é o que se abre no clique. A regra: se o detalhe pudesse estar
   no resumo sem incomodar, ele não é detalhe — é resumo mal escrito. O que
   vai aqui é a decisão técnica, o número, a coisa específica.

   `milestone` marca virada de fase. Dois numa lista de sete: se todos
   fossem marco, nenhum seria.
   ------------------------------------------------------------------------- */

export type Entry = {
  /** o período como ele aparece, em caixa alta: `2026 — NOW` */
  period: string;
  title: string;
  /** cliente, produto próprio, ou o nome da empresa quando houver */
  org: string;
  summary: string;
  /** o que se abre no clique */
  details: string[];
  /** as frentes que couberam a mim */
  roles: string[];
  /** liga a entrada ao estudo de caso, quando existe */
  slug?: string;
  /** virada de fase */
  milestone?: boolean;
};

export const experience: Entry[] = [
  {
    period: '2026 — Now',
    title: 'Full-Stack Developer & Product Designer',
    org: 'Independent · Bern, Switzerland',
    summary:
      'Designing and building digital products end to end, for clients across Switzerland and Brazil — and for myself.',
    details: [
      'Working in three languages: German, English and Portuguese.',
      'Every project runs from research through design, build and deployment with one person accountable for all of it.',
      'Available for selected freelance work and product collaborations.',
    ],
    roles: ['Product', 'UX/UI', 'Full-stack', 'Deployment'],
    milestone: true,
  },
  {
    period: '2026',
    title: 'knifes.me',
    org: 'Own product · SaaS',
    summary:
      'Moved from frontend to an entire product: database, accounts, subscriptions, and the decision about what not to build.',
    details: [
      'Theme engine built on CSS custom properties stored as database rows — new themes cost bytes, not bundle size.',
      'Stripe subscriptions with webhook reconciliation running in production.',
      'The hardest work was scope: three features were cut after being built.',
    ],
    roles: ['Product', 'Full-stack', 'Database', 'Subscriptions'],
    slug: 'knifes-me',
    milestone: true,
  },
  {
    period: '2026',
    title: 'PHOBIACORI',
    org: 'Client · Independent artist',
    summary:
      'The first store I built from nothing. The problem was never selling — it was making a small-run catalogue not look like factory stock.',
    details: [
      'Cart state lives entirely in the browser: no accounts, no database, no running cost.',
      'The product list is a typed data file the artist edits herself.',
      'Static export on GitHub Pages — nothing to go down, nothing to renew.',
    ],
    roles: ['Art direction', 'UI design', 'Frontend', 'Content architecture'],
    slug: 'phobiacori',
  },
  {
    period: '2025',
    title: 'Truffle N.B. Tricolore',
    org: 'Client · Switzerland',
    summary:
      'A seasonal product forced me to design for content that ages by itself — the catalogue had to go out of date without breaking.',
    details: [
      'Availability drives the layout: what is out of season becomes information, not a dead end.',
      'React and Vite, first paint under one second on 4G.',
      'The client edits the season file; the delivery copy follows it automatically.',
    ],
    roles: ['UI design', 'React frontend', 'Content integration'],
    slug: 'truffle-nb',
  },
  {
    period: '2025',
    title: 'Sandra Hair Salon',
    org: 'Client · Buchs SG',
    summary:
      'Three languages across the same counter. This is where I stopped treating translation as a layer and started treating it as architecture.',
    details: [
      'Language is state, not a route: switching keeps scroll position and rewrites currency, hours and date format.',
      'One dictionary file, no build step, no CMS.',
      'Booking composes a pre-written message in the language currently selected.',
    ],
    roles: ['UI design', 'Frontend', 'i18n architecture'],
    slug: 'sandra-hair-salon',
  },
  {
    period: '2025',
    title: 'Dra. Thayse Marques',
    org: 'Client · Rio de Janeiro',
    summary:
      'The first project where content work outweighed interface work: eight practice areas, each with its own copy and its own search intent.',
    details: [
      'A year of incoming enquiries was clustered by need, and those clusters became the site architecture.',
      'The form composes a message already classified by practice area.',
      'Eight indexed pages replaced a single one — the ranking followed the content, not the other way round.',
    ],
    roles: ['Research and content', 'UI design', 'Frontend', 'Technical SEO'],
    slug: 'thayse-marques',
  },
  {
    period: '2021 — 2024',
    title: 'Learning both halves at once',
    org: 'Self-taught',
    summary:
      'I learned design and engineering in the same period, because there was nobody to hand the other half to.',
    details: [
      'Started with HTML, CSS and Figma in 2021; React in 2022; TypeScript and Next.js in 2023.',
      'Databases and authentication came in 2024, when a personal project stopped fitting in the browser.',
      'What was once a limitation is now the argument: no handoff, no telephone game.',
    ],
    roles: ['Foundations', 'Self-directed practice'],
  },
];

/** o primeiro ano em que existe trabalho registrado — usado nas estatísticas */
export const startYear = 2021;
