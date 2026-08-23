/* -------------------------------------------------------------------------
   Da ideia até o deploy.

   Seis etapas. Cada uma tem um resumo — o que acontece ali — e uma `nota`:
   a observação em minúscula, escrita como se fosse dita, que diz o que essa
   etapa custa de verdade.

   A nota é a parte que não dá pra gerar. "Design: interface, estrutura e
   experiência" é o que qualquer processo diz; "a versão que sobrevive quase
   nunca é a mais bonita" é o que **esta** pessoa aprendeu fazendo. É por isso
   que ela existe, e é por isso que ela é curta: uma linha inteira de piada
   viraria personagem, e personagem cansa antes da terceira etapa.
   ------------------------------------------------------------------------- */

export type Etapa = {
  n: string;
  titulo: string;
  texto: string;
  /** a observação em minúscula, ao lado do número */
  nota: string;
};

export const processo: Etapa[] = [
  {
    n: '01',
    titulo: 'Ideia',
    texto:
      'Alguém descreve um problema, quase nunca na ordem certa. O trabalho aqui é separar o que a pessoa pediu do que ela precisa, e escrever isso numa frase só.',
    nota: 'se não cabe numa frase, ainda não entendi',
  },
  {
    n: '02',
    titulo: 'Exploração',
    texto:
      'Referências, um protótipo feio e três caminhos possíveis. É a fase mais rápida e a mais barata de errar — errar depois custa semana.',
    nota: 'protótipo feio é protótipo honesto',
  },
  {
    n: '03',
    titulo: 'Design',
    texto:
      'Figma. Tipografia e grade primeiro, cor depois, decoração quase nunca. Cada tela já nasce sabendo quanto vai custar para construir.',
    nota: 'a versão que sobrevive quase nunca é a mais bonita',
  },
  {
    n: '04',
    titulo: 'Código',
    texto:
      'Escrito à mão, sem construtor e sem tema pronto. Componente só vira componente na terceira vez que eu precisaria copiar e colar.',
    nota: 'abstrair cedo é dívida com juros',
  },
  {
    n: '05',
    titulo: 'Teste',
    texto:
      'Celular velho, internet ruim, teclado sem mouse e leitor de tela. É onde metade das decisões bonitas cai, e é por isso que essa etapa não é opcional.',
    nota: 'o bug sempre aparece no aparelho do cliente',
  },
  {
    n: '06',
    titulo: 'Deploy',
    texto:
      'Domínio, https, métrica e o primeiro acesso de alguém que não sou eu. Aí volta pro 01, porque nenhum projeto que continua vivo fica pronto.',
    nota: 'não existe ctrl+z em produção',
  },
];
