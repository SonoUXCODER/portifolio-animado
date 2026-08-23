import Hero from '@/components/Hero';
import About from '@/components/About';
import Stack from '@/components/Stack';
import Statement from '@/components/Statement';
import Archive from '@/components/Archive';
import Processo from '@/components/Processo';
import Experience from '@/components/Experience';
import Lab from '@/components/Lab';
import Contact from '@/components/Contact';
import Marquee from '@/components/Marquee';
import Encarte3D from '@/components/Encarte3D';
import { estampas } from '@/data/estampas';
import { projects } from '@/data/projects';

/* -------------------------------------------------------------------------
   O arquivo, na ordem em que é lido.

   A ordem das seções nomeadas é a mesma de data/sections.ts — é o que faz a
   navegação, o número de cada kicker e o indicador de seção ativa nunca
   desencontrarem do conteúdo. Mexer lá reordena tudo; mexer só aqui quebra.

   Entre elas entram as peças que **não** são seção, e cada uma existe por um
   motivo estrutural: sem elas a leitura vira uma pilha de sete blocos com o
   mesmo ritmo. Todas trocam o fundo, a altura ou a densidade da tela, e é
   essa troca que marca a virada de um ato pro outro.

     faixa corrida   duas, nas duas emendas mais importantes: logo depois do
                     hero (o que tem no arquivo) e antes do contato (o que
                     está aberto agora). Cada uma carrega informação que não
                     aparece em nenhum outro lugar da página.

     declaração      uma, entre a stack e o arquivo: o fundo inverte por
                     inteiro e a página faz a única afirmação direta que ela
                     se permite.

     escultura       três, nas viradas da narrativa — depois de dizer quem
                     assina, depois de mostrar o trabalho, e depois dos
                     estudos, logo antes do convite.

   A primeira faixa lista os projetos pelo nome antes de o leitor chegar no
   arquivo. É de propósito: ela cria a expectativa que faz a pessoa continuar
   rolando, que é a única coisa que uma faixa corrida sabe fazer bem.
   ------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <Hero />

      <Marquee itens={projects.map((p) => p.title)} velocidade={52} separador="—" />

      <About />
      <Encarte3D estampa={estampas[0]} indice={0} />

      <Stack />

      <Statement kicker="O trabalho" text="Decidido, desenhado e publicado pela mesma pessoa." />

      <Archive />
      <Encarte3D estampa={estampas[1]} indice={1} />

      <Processo />
      <Experience />
      <Lab />
      <Encarte3D estampa={estampas[2]} indice={2} />

      <Marquee
        itens={[
          'Disponível para projetos',
          'Respondo em até dois dias',
          'Trabalho remoto, da Suíça',
          'Projeto inteiro ou só o front',
        ]}
        velocidade={44}
        reverso
        separador="—"
      />

      <Contact />
    </>
  );
}
