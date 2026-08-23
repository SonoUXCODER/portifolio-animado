/* -------------------------------------------------------------------------
   As seções do arquivo, na ordem em que são lidas.

   Fonte única: a navegação, o indicador de seção ativa, o kicker no topo de
   cada cena e o menu mobile leem tudo daqui. O número é a posição no array —
   inserir uma seção no meio renumera o resto sozinho.

   `kicker` é a linha que abre a seção. Não é um rótulo montado a partir do
   nome: é uma frase escrita pra aquela cena, e é ela que muda o tom de um
   capítulo pro outro. Se duas seções pudessem trocar de kicker sem ninguém
   perceber, os dois estão genéricos demais.
   ------------------------------------------------------------------------- */

export type Section = {
  id: string;
  /** nome no kicker e no menu */
  name: string;
  /** a linha de abertura da seção, em caixa alta */
  kicker: string;
  /** rótulo curto pra navegação do topo */
  nav?: string;
};

export const sections: Section[] = [
  { id: 'sobre', name: 'Sobre', kicker: 'Uma pessoa, duas metades', nav: 'Sobre' },
  { id: 'stack', name: 'Stack', kicker: 'O que está rodando agora', nav: 'Stack' },
  { id: 'arquivo', name: 'Arquivo', kicker: 'Cinco entradas, de 2025 pra cá', nav: 'Arquivo' },
  { id: 'processo', name: 'Processo', kicker: 'Da ideia até o deploy', nav: 'Processo' },
  { id: 'experiencia', name: 'Experiência', kicker: 'Em ordem inversa', nav: 'Trajeto' },
  { id: 'laboratorio', name: 'Laboratório', kicker: 'Sem cliente e sem prazo', nav: 'Lab' },
  { id: 'contato', name: 'Contato', kicker: 'O fim do arquivo', nav: 'Contato' },
];

/** índice formatado, base 1 — usado no kicker de cada seção */
export const sectionIndex = (id: string) => {
  const i = sections.findIndex((s) => s.id === id);
  return String(i + 1).padStart(2, '0');
};

export const sectionBy = (id: string) => sections.find((s) => s.id === id);

export const sectionTotal = String(sections.length).padStart(2, '0');

/** os ids que o espião de rolagem observa, incluindo o topo */
export const spyIds = ['hero', ...sections.map((s) => s.id)];
