import Hero from '@/components/Hero';
import About from '@/components/About';
import Stack from '@/components/Stack';
import Statement from '@/components/Statement';
import Work from '@/components/Work';
import Experience from '@/components/Experience';
import Lab from '@/components/Lab';
import Contact from '@/components/Contact';
import Encarte3D from '@/components/Encarte3D';
import { estampas } from '@/data/estampas';

/* -------------------------------------------------------------------------
   A página, na ordem em que é lida.

   A ordem das seções nomeadas é a mesma de data/sections.ts — é o que faz a
   navegação, o número de cada marcador e o indicador de seção ativa nunca
   desencontrarem do conteúdo. Mexer lá reordena tudo; mexer só aqui quebra.

   Entre as seções entram três peças que não são seção: as esculturas e uma
   faixa de declaração. Elas existem por um motivo estrutural — sem elas a
   leitura vira uma pilha de seis blocos com o mesmo ritmo. Cada uma troca o
   fundo, a altura e a densidade da tela, e é essa troca que marca a virada
   de um ato pro outro.

   As esculturas caem em viradas da narrativa, não em intervalos regulares:
   depois de dizer quem assina, depois de mostrar o trabalho, e depois dos
   estudos — logo antes do convite.
   ------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <Hero />

      <About />
      <Encarte3D estampa={estampas[0]} indice={0} />

      <Stack />

      <Statement
        kicker="O trabalho"
        text="Decidido, desenhado e publicado pela mesma pessoa."
      />

      <Work />
      <Encarte3D estampa={estampas[1]} indice={1} />

      <Experience />
      <Lab />
      <Encarte3D estampa={estampas[2]} indice={2} />

      <Contact />
    </>
  );
}
