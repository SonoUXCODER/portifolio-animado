import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Work from '@/components/Work';
import Capabilities from '@/components/Capabilities';
import TechStack from '@/components/TechStack';
import Journey from '@/components/Journey';
import Philosophy from '@/components/Philosophy';
import Contact from '@/components/Contact';
import Interludes from '@/components/Interludes';
import { langs } from '@/lib/lang';

/* -------------------------------------------------------------------------
   A PÁGINA, NA ORDEM EM QUE É LIDA.

   Cinco capítulos e, entre eles, as peças que não são capítulo. A ordem dos
   numerados é a mesma de content/shared.ts — é o que faz a navegação e o
   indicador de seção ativa nunca desencontrarem do conteúdo. Mexer lá
   reordena a navegação; mexer só aqui quebra.

   As peças entre capítulos existem por motivo estrutural, não decorativo.
   Sem elas a página vira uma pilha de sete blocos com o mesmo ritmo, e
   ritmo constante é exatamente o que faz um site parecer gerado:

     escultura    três, nas viradas da narrativa: depois de dizer quem
                  assina, depois de mostrar o trabalho, e depois de mostrar
                  as ferramentas. Cada uma toma a tela inteira e não pede
                  nada em troca. É a pausa.

     stack        não é capítulo numerado: é a segunda metade de
                  CAPABILITIES. Separar "o que eu faço" de "com o que eu
                  faço" daria dois títulos pro mesmo assunto.

     filosofia    a única tela clara do site, logo depois da primeira
                  escultura. Ela ficava antes do contato, no fim de tudo, e
                  chegava tarde demais: quem rolou vinte telas já formou
                  opinião. Aqui ela funciona como declaração de princípio
                  antes de o trabalho ser mostrado, e a inversão de fundo
                  emenda direto na saída do mármore.

   As declarações ("design with intention", "build with precision") vivem
   dentro de <Work/>, entre os projetos, porque é lá que elas fazem sentido:
   separam um capítulo do outro sem tirar o leitor da seção.
   ------------------------------------------------------------------------- */

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export default function Home() {
  return (
    <>
      <Hero />

      <Manifesto />
      <Interludes indice={0} />

      <Philosophy />

      <Work />
      <Interludes indice={1} />

      <Capabilities />
      <TechStack />
      <Interludes indice={2} />

      <Journey />
      <Contact />
    </>
  );
}
