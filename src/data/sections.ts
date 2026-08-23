/* -------------------------------------------------------------------------
   As seções da página, na ordem em que aparecem.

   Fonte única: a navegação, o indicador de seção ativa, o marcador no topo
   de cada cena e o menu mobile leem tudo daqui. O número é a posição no
   array — inserir uma seção no meio renumera o resto sozinho.

   `scene` marca as cenas 3D: elas entram na leitura mas não na navegação,
   porque são respiro entre capítulos, não capítulo.
   ------------------------------------------------------------------------- */

export type Section = {
  id: string;
  /** nome no marcador e no menu */
  name: string;
  /** o que a seção entrega, em uma linha */
  note: string;
  /** rótulo curto pra navegação do topo */
  nav?: string;
};

export const sections: Section[] = [
  { id: 'sobre', name: 'Sobre', note: 'Uma pessoa, duas profissões', nav: 'Sobre' },
  { id: 'stack', name: 'Stack', note: 'O que uso e por quê', nav: 'Stack' },
  /* a nota não pode repetir o título da seção: em Projetos as duas frases
     eram idênticas e a página dizia a mesma coisa duas vezes seguidas */
  { id: 'projetos', name: 'Projetos', note: 'Do problema ao que ficou de pé', nav: 'Projetos' },
  { id: 'experiencia', name: 'Experiência', note: 'A linha do tempo', nav: 'Experiência' },
  { id: 'laboratorio', name: 'Laboratório', note: 'Testes que rodam aqui', nav: 'Lab' },
  { id: 'contato', name: 'Contato', note: 'O fim é um convite', nav: 'Contato' },
];

/** índice formatado, base 1 — usado no marcador de cada seção */
export const sectionIndex = (id: string) => {
  const i = sections.findIndex((s) => s.id === id);
  return String(i + 1).padStart(2, '0');
};

export const sectionBy = (id: string) => sections.find((s) => s.id === id);

export const sectionTotal = String(sections.length).padStart(2, '0');

/** os ids que o espião de rolagem observa, incluindo o topo */
export const spyIds = ['hero', ...sections.map((s) => s.id)];
