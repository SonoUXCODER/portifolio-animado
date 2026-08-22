/* -------------------------------------------------------------------------
   As etapas de "COMO EU FAÇO AS COISAS".
   `shot` é opcional: quando existe, entra um print de projeto no meio dos
   desenhos, pra provar que a etapa vira coisa de verdade.
   ------------------------------------------------------------------------- */

import type { DoodleKey } from './stack';

export type Etapa = {
  n: string;
  titulo: string;
  texto: string;
  doodle: DoodleKey;
  shot?: { src: string; alt: string; width: number; height: number };
};

export const processo: Etapa[] = [
  {
    n: '01',
    titulo: 'IDEIA',
    texto: 'Uma frase num caderno. Se não couber numa frase, ainda não é ideia.',
    doodle: 'raio',
  },
  {
    n: '02',
    titulo: 'RASCUNHO',
    texto: 'Caneta, papel ruim, cinco versões erradas. É a parte mais barata de errar.',
    doodle: 'espiral',
  },
  {
    n: '03',
    titulo: 'DESIGN',
    texto: 'Figma. Tipografia primeiro, cor por último, decoração quase nunca.',
    doodle: 'olho',
    shot: {
      src: '/assets/projetos/sandra-cover.webp',
      alt: 'Layout do salão ainda em fase de design',
      width: 3150,
      height: 1969,
    },
  },
  {
    n: '04',
    titulo: 'CÓDIGO',
    texto: 'Escrevo à mão. Sem template, sem construtor, sem tema pronto.',
    doodle: 'triangulo',
    shot: {
      src: '/assets/projetos/knifes-cover.webp',
      alt: 'Interface do knifes.me já implementada',
      width: 3150,
      height: 1969,
    },
  },
  {
    n: '05',
    titulo: 'TESTE',
    texto: 'Celular velho, internet ruim, teclado sem mouse, leitor de tela.',
    doodle: 'peixe',
  },
  {
    n: '06',
    titulo: 'PUBLICAÇÃO',
    texto: 'Domínio, https, métrica. E aí volta pro 01, porque nunca acaba.',
    doodle: 'seta',
    shot: {
      src: '/assets/projetos/thayse-cover.webp',
      alt: 'Site da advocacia já publicado',
      width: 3150,
      height: 1969,
    },
  },
];
