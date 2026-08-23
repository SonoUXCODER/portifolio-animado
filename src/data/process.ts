/* -------------------------------------------------------------------------
   O método, em seis passos. Aparece dentro de "Sobre".

   É o que evita a seção "sobre" genérica: diz como a pessoa trabalha, em vez
   de adjetivos sobre ela. Cada etapa cabe em uma frase de propósito — se
   precisasse de um parágrafo, seria processo demais para caber num passo.

   Havia aqui dois campos que morreram junto com o impresso: `doodle`, que
   ligava a etapa a um desenho, e `shot`, um print de projeto que nunca
   chegou a ser renderizado em lugar nenhum.
   ------------------------------------------------------------------------- */

export type Etapa = {
  n: string;
  titulo: string;
  texto: string;
};

export const processo: Etapa[] = [
  {
    n: '01',
    titulo: 'Ideia',
    texto: 'Uma frase num caderno. Se não couber numa frase, ainda não é ideia.',
  },
  {
    n: '02',
    titulo: 'Rascunho',
    texto: 'Caneta, papel ruim, cinco versões erradas. É a parte mais barata de errar.',
  },
  {
    n: '03',
    titulo: 'Design',
    texto: 'Figma. Tipografia primeiro, cor por último, decoração quase nunca.',
  },
  {
    n: '04',
    titulo: 'Código',
    texto: 'Escrevo à mão. Sem template, sem construtor, sem tema pronto.',
  },
  {
    n: '05',
    titulo: 'Teste',
    texto: 'Celular velho, internet ruim, teclado sem mouse, leitor de tela.',
  },
  {
    n: '06',
    titulo: 'Publicação',
    texto: 'Domínio, https, métrica. E aí volta pro 01, porque nunca acaba.',
  },
];
