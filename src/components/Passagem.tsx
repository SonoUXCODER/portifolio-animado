'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/* -------------------------------------------------------------------------
   PASSAGEM — o capítulo seguinte nasce de dentro da escultura.

   Sem isto, o que acontece depois do estilhaço é o que acontece em qualquer
   site: a escultura se desfaz e a próxima seção **sobe de baixo**, porque é
   o que a rolagem de uma página faz. O efeito inteiro se perde no último
   segundo — os cacos viram enfeite de saída em vez de porta de entrada.

   Aqui a seção seguinte toma a tela onde a peça acabou de se abrir, presa
   no lugar, e não desliza: ela **abre**, num círculo que cresce do centro
   pra fora, do mesmo ponto de onde os cacos saíram.

   >>> O CORREDOR, E POR QUE ELE EXISTE <<<
   A primeira versão era só `margin-top: -100svh` na seção. Funcionava pra
   ela e quebrava o resto: margem negativa não move só quem a recebe, move
   **tudo que vem depois**. Medindo na página, o <Work/> subia junto e
   aparecia no rodapé da tela no meio da transição, com a escultura ainda se
   despedaçando em cima. Uma seção vazando por baixo da outra.

   O corredor é um bloco vazio de 100svh que devolve exatamente o que a
   margem tirou. A soma dá zero, então nada depois da passagem se move um
   pixel, e a página continua com a mesma altura. O que a margem compra é
   o direito de desenhar o conteúdo 100svh antes da posição dele, e o
   corredor é o trecho de rolagem em que isso acontece.

   >>> A CONTA DO `y` <<<
   O conteúdo mora no fim do corredor, então naturalmente ele entraria
   deslizando. O `y` cancela o deslize: prende o topo no alto da janela
   durante o corredor inteiro e chega a zero exatamente quando a posição
   presa encontra a posição natural — por isso não há salto na entrega.
   Enquanto está preso, o recorte o mantém invisível.

   >>> POR QUE RECORTE E NÃO OPACIDADE <<<
   O caminho óbvio era apagar a seção e acendê-la. Já cometi esse erro neste
   projeto: animar `opacity` numa subárvore grande obriga o navegador a
   rasterizar a coisa toda num buffer separado a cada quadro, e aqui a
   subárvore é uma seção inteira de texto em tipografia de display. Trava.

   `clip-path` recorta sem tocar em como o conteúdo é pintado, e ainda por
   cima diz a coisa certa: não é uma seção aparecendo, é um buraco abrindo.

   >>> POR QUE O CENTRO É EM `svh` E NÃO EM % <<<
   `circle(R at 50% 45%)` pareceria mais limpo e estaria errado: a
   porcentagem se resolve contra a caixa do elemento, e estas seções são bem
   mais altas que a janela. Numa seção de 3000px, "45%" fica 1350px abaixo
   do topo — muito abaixo do que se vê. O buraco abriria fora da tela.
   Medindo em `svh` a partir do topo, que está preso no alto da janela, o
   centro cai onde a escultura estava, que é o ponto inteiro do efeito.

   Pela mesma razão o recorte vira `none` no fim: um círculo grande o
   bastante pra cobrir a janela ainda cortaria o conteúdo mais abaixo da
   seção. A troca acontece quando o círculo já cobre tudo que está visível,
   então não se vê acontecer.

   >>> ORDEM NO TEMPO <<<
   O corredor começa exatamente onde a fixação do intervalo termina, que é
   também onde o estilhaço chega ao fim e o canvas acaba de apagar. Primeiro
   a peça se desfaz por inteiro, depois o capítulo abre do ponto onde ela
   estava. É sequencial de propósito: as duas coisas juntas viram sopa.

   A margem e a altura do corredor moram no CSS, atrás de
   `prefers-reduced-motion: no-preference`, e não numa condição de
   JavaScript: assim quem pede menos movimento recebe uma seção normal, em
   fluxo normal, já na primeira pintura, sem depender de hidratação.
   ------------------------------------------------------------------------- */

/** onde o buraco abre, medido do topo da janela */
const CENTRO = '45svh';
/** raio que cobre a janela inteira a partir do CENTRO, com folga */
const COBRE = 85;

export default function Passagem({ children }: { children: ReactNode }) {
  const corredor = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();

  /* 0 quando o topo do corredor alcança o topo da janela, 1 quando o pé
     dele alcança o mesmo ponto — ou seja, os 100svh de corredor, medidos
     sozinhos. Medir o corredor, e não a seção, é o que faz a conta dar
     igual pra uma seção curta e pra uma comprida. */
  const { scrollYProgress } = useScroll({
    target: corredor,
    offset: ['start start', 'end start'],
  });

  /* prende o topo no alto da janela durante o corredor inteiro */
  const y = useTransform(scrollYProgress, [0, 1], ['-100svh', '0svh']);

  /* o buraco abre quase todo o corredor e sobra um resto pra assentar */
  const raio = useTransform(scrollYProgress, [0.02, 0.72], [0, COBRE]);
  const recorte = useTransform(raio, (r) =>
    r >= COBRE - 0.5 ? 'none' : `circle(${r}vmax at 50% ${CENTRO})`,
  );

  /* um resto de escala pra a seção vir de trás em vez de já estar parada no
     lugar. 1.06 é pouco de propósito: mais que isso e o texto de display
     chega borrado, porque durante a escala ele é rasterizado uma vez só.
     A origem é a mesma do buraco, senão a seção cresceria a partir do
     próprio centro, que numa seção alta fica muito abaixo da tela. */
  const escala = useTransform(scrollYProgress, [0.02, 0.85], [1.06, 1]);

  return (
    <div className="passagem">
      <div ref={corredor} className="passagem__corredor" aria-hidden="true" />
      <motion.div
        className="passagem__conteudo"
        style={
          reduzido
            ? undefined
            : { y, scale: escala, clipPath: recorte, transformOrigin: `50% ${CENTRO}` }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
