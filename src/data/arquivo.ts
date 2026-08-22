/* -------------------------------------------------------------------------
   O plano do impresso: que páginas existem, em que ordem, e o que cada uma
   promete. É a fonte única — o sumário, o cabeço de cada página, o fólio e
   os links da régua saem todos daqui.

   Mexer na ordem deste array reordena o arquivo inteiro. O número da página
   é a posição, nunca um campo digitado: inserir um caderno no meio renumera
   o resto sozinho.
   ------------------------------------------------------------------------- */

export type Caderno = {
  /** id da seção no HTML e alvo das âncoras */
  id: string;
  /** o nome no sumário e no cabeço */
  titulo: string;
  /** a linha que explica o que a pessoa vai encontrar */
  chamada: string;
  /** rótulo curto pra régua do topo */
  atalho: string;
  /** se entra na régua do topo (o menu não cabe tudo) */
  naRegua?: boolean;
};

export const cadernos: Caderno[] = [
  {
    id: 'quem-assina',
    titulo: 'QUEM ASSINA',
    chamada: 'Uma pessoa, duas profissões e uma teimosia só.',
    atalho: 'SOBRE',
  },
  {
    id: 'projetos',
    titulo: 'O QUE EU FIZ',
    chamada: 'Cinco trabalhos, do começo ao que sobrou depois.',
    atalho: 'PROJETOS',
    naRegua: true,
  },
  {
    id: 'stack',
    titulo: 'A OFICINA',
    chamada: 'As ferramentas em cima da bancada, e o que faço com cada uma.',
    atalho: 'OFICINA',
    naRegua: true,
  },
  {
    id: 'processo',
    titulo: 'COMO EU FAÇO',
    chamada: 'Da frase no caderno até o domínio no ar, em seis etapas.',
    atalho: 'PROCESSO',
    naRegua: true,
  },
  {
    id: 'experimentos',
    titulo: 'A GAVETA',
    chamada: 'Coisas pequenas que testei e não viraram projeto.',
    atalho: 'GAVETA',
    naRegua: true,
  },
  {
    id: 'contato',
    titulo: 'FALA COMIGO',
    chamada: 'O fim do arquivo é um convite.',
    atalho: 'CONTATO',
    naRegua: true,
  },
];

/** posição no sumário, formatada como fólio */
export const folioDe = (id: string) => {
  const i = cadernos.findIndex((c) => c.id === id);
  return String(i + 1).padStart(2, '0');
};

export const cadernoDe = (id: string) => cadernos.find((c) => c.id === id);

export const totalDeCadernos = String(cadernos.length).padStart(2, '0');
