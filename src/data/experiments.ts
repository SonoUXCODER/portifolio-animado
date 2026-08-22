/* -------------------------------------------------------------------------
   "COISAS QUE EU TESTEI".

   Cada item aqui é um demo pequeno que roda de verdade dentro do quadro —
   nada de print. `kind` escolhe qual demo o <Experimento/> desenha, e
   `col`/`row` bagunçam a grid de propósito.
   ------------------------------------------------------------------------- */

export type ExperimentKind =
  | 'moire'
  | 'listras'
  | 'ascii'
  | 'orbita'
  | 'ruido'
  | 'tipo'
  | 'grade'
  | 'gota';

export type Experiment = {
  id: string;
  titulo: string;
  tag: string;
  nota: string;
  kind: ExperimentKind;
  /** span de colunas na grid caótica (base 6 colunas no desktop) */
  col: number;
  /** altura em "unidades" de 90px */
  row: number;
  rot: number;
};

export const experiments: Experiment[] = [
  { id: 'x1', titulo: 'MOIRÉ',        tag: 'CSS',      nota: 'duas grades brigando',        kind: 'moire',   col: 2, row: 3, rot: -1.5 },
  { id: 'x2', titulo: 'LISTRA VIVA',  tag: 'CSS',      nota: 'gradiente que anda sozinho',  kind: 'listras', col: 4, row: 2, rot: 1 },
  { id: 'x3', titulo: 'ASCII',        tag: 'JS',       nota: 'onda feita de caractere',     kind: 'ascii',   col: 4, row: 3, rot: -0.8 },
  { id: 'x4', titulo: 'ÓRBITA',       tag: 'SVG',      nota: 'três corpos, zero física',    kind: 'orbita',  col: 2, row: 2, rot: 2 },
  { id: 'x5', titulo: 'CHUVISCO',     tag: 'SVG',      nota: 'ruído de tv em 40 linhas',    kind: 'ruido',   col: 2, row: 2, rot: -2 },
  { id: 'x6', titulo: 'TIPO ELÁSTICO',tag: 'VAR FONT', nota: 'largura variável no hover',   kind: 'tipo',    col: 4, row: 2, rot: 0.6 },
  { id: 'x7', titulo: 'GRADE MOLE',   tag: 'CSS',      nota: 'grid que reage ao mouse',     kind: 'grade',   col: 3, row: 3, rot: -1.2 },
  { id: 'x8', titulo: 'GOTA',         tag: 'SVG',      nota: 'blob que nunca repete',       kind: 'gota',    col: 3, row: 2, rot: 1.8 },
];
