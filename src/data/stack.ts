/* -------------------------------------------------------------------------
   A stack, agrupada por camada.

   Sem barra de progresso e sem porcentagem: "JavaScript 95%" não é
   informação, é chute com aparência de dado. O que diz alguma coisa é o
   que a ferramenta faz no meu trabalho — daí `nota`, uma linha por item.

   `desde` é o ano em que a ferramenta entrou pra valer. Ele existe pra dar
   profundidade à lista sem inventar métrica: é verificável e envelhece
   sozinho, ao contrário de um número de proficiência.
   ------------------------------------------------------------------------- */

export type Tool = {
  label: string;
  /** o que eu realmente faço com isso */
  nota: string;
  /** ano em que passou a fazer parte do trabalho */
  desde: string;
  /** ferramenta que puxa o peso do dia a dia */
  principal?: boolean;
};

export type Layer = {
  id: string;
  /** nome da camada */
  titulo: string;
  /** o que essa camada resolve, em uma linha */
  resumo: string;
  tools: Tool[];
};

export const layers: Layer[] = [
  {
    id: 'interface',
    titulo: 'Interface',
    resumo: 'O que a pessoa vê e toca. Onde design e código são a mesma decisão.',
    tools: [
      { label: 'React', nota: 'a base de tudo que construo desde 2022', desde: '2022', principal: true },
      { label: 'Next.js', nota: 'roteamento, render no servidor e o build deste site', desde: '2023', principal: true },
      { label: 'TypeScript', nota: 'contrato antes de execução — é o que me deixa dormir', desde: '2023', principal: true },
      { label: 'Tailwind', nota: 'velocidade sem virar bagunça, com tokens por cima', desde: '2023' },
      { label: 'CSS', nota: 'grade, tipografia e movimento na unha quando importa', desde: '2021', principal: true },
      { label: 'HTML', nota: 'semântica antes de estilo, sempre nessa ordem', desde: '2021' },
    ],
  },
  {
    id: 'fundo',
    titulo: 'Servidor e dados',
    resumo: 'A metade que ninguém vê e que decide se o produto existe de verdade.',
    tools: [
      { label: 'Node', nota: 'API, scripts de build e o que roda fora do navegador', desde: '2023' },
      { label: 'PostgreSQL', nota: 'tabela bem pensada resolve antes de virar problema', desde: '2024', principal: true },
      { label: 'Supabase', nota: 'auth, storage e realtime sem montar infra do zero', desde: '2024' },
      { label: 'Stripe', nota: 'assinatura e webhook em produção no knifes.me', desde: '2025' },
    ],
  },
  {
    id: 'oficio',
    titulo: 'Ofício',
    resumo: 'Onde a decisão é tomada antes de custar caro.',
    tools: [
      { label: 'Figma', nota: 'penso antes de codar — errar aqui é barato', desde: '2021', principal: true },
      { label: 'Three.js', nota: 'as três esculturas deste site, sem framework por cima', desde: '2025' },
      { label: 'Git', nota: 'o ctrl+z que funciona de verdade', desde: '2021' },
      { label: 'Blender', nota: 'preparar e reduzir malha antes de ela chegar na web', desde: '2025' },
    ],
  },
];

/** todas as ferramentas, achatadas — usado nos contadores */
export const stack: Tool[] = layers.flatMap((l) => l.tools);
