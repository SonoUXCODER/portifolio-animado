/* -------------------------------------------------------------------------
   Os capítulos, na ordem em que são lidos.

   Fonte única: a navegação, o indicador de seção ativa, o índice no topo de
   cada cena e o menu mobile leem tudo daqui. O número é a posição no array —
   inserir uma seção no meio renumera o resto sozinho.

   São cinco, e cinco é o limite. Uma navegação de oito itens não é uma
   navegação, é um sumário: ninguém a lê, todo mundo rola. As peças que não
   estão aqui (filosofia, faixas de declaração, esculturas) são intervalos
   entre capítulos — existem pra trocar o fundo e marcar a virada, não pra
   serem visitadas por link.

   `note` é a linha que abre a seção, ao lado do número. Não é rótulo montado
   a partir do nome: é uma frase escrita pra aquela cena. Se duas seções
   pudessem trocar de `note` sem ninguém perceber, as duas estão genéricas.
   ------------------------------------------------------------------------- */

export type Section = {
  id: string;
  /** nome no índice da seção */
  name: string;
  /** a linha de abertura da seção */
  note: string;
  /** rótulo curto na navegação do topo */
  nav: string;
};

export const sections: Section[] = [
  { id: 'about', name: 'About', note: 'One person, two disciplines', nav: 'About' },
  { id: 'work', name: 'Selected Work', note: 'Five products, start to ship', nav: 'Work' },
  { id: 'capabilities', name: 'Capabilities', note: 'From interface to infrastructure', nav: 'Skills' },
  { id: 'experience', name: 'Experience', note: 'In reverse order', nav: 'Experience' },
  { id: 'contact', name: 'Contact', note: 'Where this ends and something starts', nav: 'Contact' },
];

/** índice formatado, base 1 — usado na linha de abertura de cada seção */
export const sectionIndex = (id: string) => {
  const i = sections.findIndex((s) => s.id === id);
  return String(i + 1).padStart(2, '0');
};

export const sectionBy = (id: string) => sections.find((s) => s.id === id);

export const sectionTotal = String(sections.length).padStart(2, '0');

/** os ids que o espião de rolagem observa, incluindo o topo */
export const spyIds = ['hero', ...sections.map((s) => s.id)];
