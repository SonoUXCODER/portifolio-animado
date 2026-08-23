/* -------------------------------------------------------------------------
   O QUE EU FAÇO.

   Seis frentes, numeradas. A lista é curta de propósito: uma seção de
   serviços com onze itens não diz "faço tudo", diz "não sei o que eu faço".

   Cada frente carrega um `visual`: o estudo que roda ao vivo quando o mouse
   passa por cima dela. Isso não é decoração encaixada depois — é a única
   forma honesta de ilustrar "desenvolvimento criativo" numa página. Um
   ícone de varinha mágica ilustraria a palavra; um canvas rodando ilustra
   a coisa.

   `deliverables` é o que sai da minha mão no fim. É a parte que um cliente
   lê antes de decidir, e por isso é substantivo concreto — nunca adjetivo.
   ------------------------------------------------------------------------- */

/** qual estudo o <Visual/> desenha; a implementação está em Visual.tsx */
export type VisualKind = 'grid' | 'stripes' | 'orbit' | 'moire' | 'graph' | 'ascii';

export type Capability = {
  id: string;
  title: string;
  /** a linha que aparece embaixo do título, na lista fechada */
  summary: string;
  /** o parágrafo que se abre com o item */
  text: string;
  deliverables: string[];
  visual: VisualKind;
};

export const capabilities: Capability[] = [
  {
    id: 'ux-ui',
    title: 'UX / UI Design',
    summary: 'Research, user flows, wireframes, interfaces and design systems.',
    text: 'It starts before the first screen. What did the person come here to do, in what order, and what is standing in the way. Structure gets settled first and interface second, because a screen that looks right and answers the wrong question still has to be thrown away.',
    deliverables: ['User flows', 'Wireframes', 'UI design in Figma', 'Prototypes', 'Handoff specs'],
    visual: 'grid',
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    summary: 'Responsive interfaces, animations, performance and accessibility.',
    text: 'Most design decisions die during the build. I write the interface myself so the thing agreed in the file is the thing that ships, down to the parts nobody notices until they break: keyboard order, focus rings, contrast, and the second a page takes to appear on bad mobile data.',
    deliverables: ['React / Next.js interfaces', 'Motion and scroll systems', 'Core Web Vitals', 'WCAG 2.2 AA'],
    visual: 'stripes',
  },
  {
    id: 'full-stack',
    title: 'Full-Stack Development',
    summary: 'APIs, databases, authentication and scalable applications.',
    text: 'The half nobody sees decides whether the product exists at all. Schema first, then the API, then the interface that consumes it. Done in that order the data model stays a decision, rather than an accident that hardened over three sprints.',
    deliverables: ['PostgreSQL schemas', 'REST endpoints', 'Auth and sessions', 'Stripe subscriptions', 'Deployment'],
    visual: 'orbit',
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    summary: 'Reusable components and consistent product ecosystems.',
    text: 'Tokens, components, and the written rule for when to reach for each one. What makes it a system is the decisions already taken — the component library is just where they are stored. Built right, the second screen costs an afternoon and the tenth costs an hour.',
    deliverables: ['Token architecture', 'Component library', 'Usage documentation', 'Accessibility baseline'],
    visual: 'moire',
  },
  {
    id: 'ai',
    title: 'AI Engineering',
    summary: 'LLM features in production, and AI as part of how the work gets made.',
    text: 'Two separate things, and I do both. Shipping features on top of language models — streaming responses, context that fits the budget, output you can actually trust in front of a paying customer. And using AI daily in my own workflow, on the parts of the job where it is genuinely faster: scaffolding, refactors, test coverage, second opinions at 2am. It writes drafts. The decisions are still mine, and so is every line that survives review.',
    deliverables: [
      'LLM API integration',
      'Prompt and context design',
      'Streaming chat interfaces',
      'Evaluation and guardrails',
      'AI-assisted build workflow',
    ],
    visual: 'graph',
  },
  {
    id: 'creative',
    title: 'Creative Development',
    summary: 'Interactive experiences, motion and experimental interfaces.',
    text: 'WebGL, canvas, scroll-driven narrative, generative type. The three sculptures on this page are here because of it. This is also where the unpaid hours go, which is the reason everything above keeps getting better.',
    deliverables: ['Three.js scenes', 'Scroll choreography', 'Generative visuals', 'Interactive prototypes'],
    visual: 'ascii',
  },
];

export const capabilityNumber = (id: string) => {
  const i = capabilities.findIndex((c) => c.id === id);
  return String(i + 1).padStart(2, '0');
};
