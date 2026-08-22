/* -------------------------------------------------------------------------
   As ferramentas espalhadas pela seção "FERRAMENTAS QUE EU USO".

   x/y são porcentagens dentro do palco. Foram escolhidas na mão pra parecer
   papel de anotação, não grid de dashboard: nada alinhado com nada.
   `doodle` liga o item a um desenho de <Doodles/> que só aparece no hover.
   ------------------------------------------------------------------------- */

export type DoodleKey =
  | 'estrela'
  | 'raio'
  | 'seta'
  | 'espiral'
  | 'coracao'
  | 'olho'
  | 'triangulo'
  | 'nuvem'
  | 'peixe';

export type Tool = {
  label: string;
  /** o que eu realmente faço com isso, aparece no hover */
  nota: string;
  x: number;
  y: number;
  rot: number;
  /** 1 = pequeno, 3 = enorme */
  peso: 1 | 2 | 3;
  doodle: DoodleKey;
  cor?: string;
};

export const stack: Tool[] = [
  { label: 'HTML',       nota: 'semântica antes de estilo',  x: 6,  y: 8,  rot: -6, peso: 2, doodle: 'estrela' },
  { label: 'CSS',        nota: 'onde eu passo o dia',         x: 44, y: 2,  rot: 3,  peso: 3, doodle: 'espiral', cor: 'var(--tinta-2)' },
  { label: 'JAVASCRIPT', nota: 'a cola de tudo',              x: 66, y: 16, rot: -3, peso: 2, doodle: 'raio' },
  { label: 'TYPESCRIPT', nota: 'pra dormir tranquilo',        x: 12, y: 30, rot: 4,  peso: 3, doodle: 'triangulo', cor: 'var(--tinta)' },
  { label: 'REACT',      nota: 'desde 2022',                  x: 52, y: 38, rot: -5, peso: 2, doodle: 'olho' },
  { label: 'NEXT.JS',    nota: 'o que roda este site',        x: 74, y: 48, rot: 2,  peso: 3, doodle: 'seta', cor: 'var(--tinta-2)' },
  { label: 'NODE',       nota: 'api e coisas do fundo',       x: 8,  y: 56, rot: -2, peso: 2, doodle: 'nuvem' },
  { label: 'TAILWIND',   nota: 'rápido sem virar bagunça',    x: 34, y: 64, rot: 5,  peso: 2, doodle: 'peixe' },
  { label: 'POSTGRES',   nota: 'tabela bem pensada'   ,     x: 62, y: 72, rot: -4, peso: 1, doodle: 'triangulo' },
  { label: 'SUPABASE',   nota: 'auth sem sofrimento',         x: 14, y: 80, rot: 3,  peso: 1, doodle: 'estrela' },
  { label: 'GIT',        nota: 'ctrl+z que funciona',         x: 82, y: 82, rot: -7, peso: 2, doodle: 'espiral' },
  { label: 'FIGMA',      nota: 'penso antes de codar',        x: 44, y: 90, rot: 2,  peso: 3, doodle: 'coracao', cor: 'var(--tinta)' },
];
