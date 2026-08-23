/* -------------------------------------------------------------------------
   A stack, agrupada em quatro camadas.

   Sem barra de progresso e sem porcentagem: "JavaScript 95%" não é
   informação, é chute com aparência de dado. O que diz alguma coisa é o
   que a ferramenta faz no meu trabalho — daí `note`, uma linha por item.

   `since` é o ano em que a ferramenta entrou pra valer. Ele existe pra dar
   profundidade à lista sem inventar métrica: é verificável e envelhece
   sozinho, ao contrário de um número de proficiência.
   ------------------------------------------------------------------------- */

export type Tool = {
  label: string;
  /** o que eu realmente faço com isso */
  note: string;
  /** ano em que passou a fazer parte do trabalho */
  since: string;
  /** a ferramenta que puxa o peso do dia a dia nessa camada */
  primary?: boolean;
};

export type Layer = {
  id: string;
  title: string;
  /** o que essa camada resolve, em uma linha */
  summary: string;
  tools: Tool[];
};

export const layers: Layer[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    summary: 'What the person sees and touches. Where design and code are the same decision.',
    tools: [
      { label: 'React', note: 'the base of everything I have built since 2022', since: '2022', primary: true },
      { label: 'Next.js', note: 'routing, server rendering, and the build behind this site', since: '2023', primary: true },
      { label: 'TypeScript', note: 'contract before execution — it is what lets me sleep', since: '2023', primary: true },
      { label: 'JavaScript', note: 'the parts that predate the framework, and still ship', since: '2021' },
      { label: 'Tailwind CSS', note: 'speed without the mess, with design tokens on top', since: '2023' },
      { label: 'CSS', note: 'grid, type and motion by hand when it matters', since: '2021', primary: true },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    summary: 'The half nobody sees, and the one that decides whether the product is real.',
    tools: [
      { label: 'Node.js', note: 'APIs, build scripts, everything outside the browser', since: '2023' },
      { label: 'PostgreSQL', note: 'a table thought through solves the problem before it exists', since: '2024', primary: true },
      { label: 'Supabase', note: 'auth, storage and realtime without building infrastructure', since: '2024' },
      { label: 'REST APIs', note: 'typed contracts between the two halves of the same product', since: '2023' },
      { label: 'Authentication', note: 'sessions, roles and the parts that must never leak', since: '2024' },
      { label: 'Stripe', note: 'subscriptions and webhooks in production on knifes.me', since: '2025' },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    summary: 'Where the decision gets made while it is still cheap to change.',
    tools: [
      { label: 'Figma', note: 'I think before I code — being wrong here costs nothing', since: '2021', primary: true },
      { label: 'UX Research', note: 'reading what people already do before drawing what they should', since: '2022' },
      { label: 'Prototyping', note: 'ugly and fast, because an honest prototype is an ugly one', since: '2022' },
      { label: 'Design Systems', note: 'tokens, components and the rule for when to use each', since: '2023', primary: true },
      { label: 'Three.js', note: 'the sculptures on this page, no framework on top', since: '2025' },
      { label: 'Blender', note: 'preparing and decimating meshes before they reach the web', since: '2025' },
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    summary: 'Shipping features on top of models, and using them to build faster.',
    tools: [
      { label: 'Claude API', note: 'the model I build features on and the one I work alongside', since: '2025', primary: true },
      { label: 'OpenAI API', note: 'when a project already runs on it, or the pricing decides', since: '2025' },
      { label: 'Prompt design', note: 'context budgets, structured output, failure modes written down', since: '2025', primary: true },
      { label: 'Streaming UI', note: 'token-by-token responses that stay readable while they arrive', since: '2025' },
      { label: 'Evaluations', note: 'a test suite for output, because "it looked fine" is not a check', since: '2026' },
      { label: 'AI-assisted build', note: 'scaffolding, refactors and coverage — the drafts, never the decisions', since: '2024' },
    ],
  },
  {
    id: 'workflow',
    title: 'Workflow',
    summary: 'How the work leaves my machine and stays alive on someone else’s.',
    tools: [
      { label: 'Git', note: 'the ctrl+z that actually works', since: '2021', primary: true },
      { label: 'GitHub', note: 'where every project in this portfolio lives', since: '2021' },
      { label: 'CI/CD', note: 'build, check and publish without a human in the loop', since: '2024' },
      { label: 'Agile', note: 'short cycles, visible increments, no ceremony for its own sake', since: '2023' },
      { label: 'Accessibility audits', note: 'keyboard, screen reader and contrast, before launch not after', since: '2024' },
      { label: 'Performance budgets', note: 'a number agreed up front is the only budget that holds', since: '2024' },
    ],
  },
];

/** todas as ferramentas, achatadas — usado nos contadores */
export const stack: Tool[] = layers.flatMap((l) => l.tools);
