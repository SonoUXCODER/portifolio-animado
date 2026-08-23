import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Work from '@/components/Work';
import Capabilities from '@/components/Capabilities';
import TechStack from '@/components/TechStack';
import Journey from '@/components/Journey';
import Philosophy from '@/components/Philosophy';
import Contact from '@/components/Contact';
import Interlude from '@/components/Interlude';
import { interludes } from '@/data/interludes';

/* -------------------------------------------------------------------------
   A PÁGINA, NA ORDEM EM QUE É LIDA.

   Cinco capítulos numerados, e entre eles as peças que não são capítulo.
   A ordem dos numerados é a mesma de data/sections.ts — é o que faz a
   navegação, o número de cada índice e o indicador de seção ativa nunca
   desencontrarem do conteúdo. Mexer lá reordena tudo; mexer só aqui quebra.

   As peças entre capítulos existem por um motivo estrutural, não decorativo.
   Sem elas a página vira uma pilha de sete blocos com o mesmo ritmo, e
   ritmo constante é exatamente o que faz um site parecer gerado:

     escultura    três, nas viradas da narrativa — depois de dizer quem
                  assina, depois de mostrar o trabalho, e depois de mostrar
                  as ferramentas. Cada uma toma a tela inteira e não pede
                  nada em troca. É a pausa.

     stack        não é capítulo numerado: é a segunda metade de
                  CAPABILITIES. Separar "o que eu faço" de "com o que eu
                  faço" em dois números daria dois capítulos pro mesmo
                  assunto.

     filosofia    a única tela clara do site, logo antes do contato. Depois
                  de sete cenas numa sala escura, inverter a página por uma
                  tela é mais forte do que qualquer animação — e é o último
                  respiro antes do convite.

   As declarações ("design with intention", "build with precision") vivem
   dentro de <Work/>, entre os projetos, porque é lá que elas fazem sentido:
   separam um capítulo do outro sem tirar o leitor da seção.
   ------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <Hero />

      <Manifesto />
      <Interlude peca={interludes[0]} indice={0} />

      <Work />
      <Interlude peca={interludes[1]} indice={1} />

      <Capabilities />
      <TechStack />
      <Interlude peca={interludes[2]} indice={2} />

      <Journey />

      <Philosophy />
      <Contact />
    </>
  );
}
