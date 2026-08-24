'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { identity } from '@/content';
import { useT } from './ContentProvider';
import { basePath } from '@/lib/base';
import { duration, easeStandard, enter } from '@/lib/motion';
import { Lines } from './Reveal';
import { useMedia, usePonteiroFino } from '@/hooks/useMedia';

/* -------------------------------------------------------------------------
   HERO.

   Uma tela, quatro respostas: o que a pessoa faz, como ela trabalha, onde
   está, e se dá pra contratar agora. Nada mais entra — o hero é a única
   parte da página em que cada elemento a mais custa impacto, porque o
   impacto aqui *é* o vazio ao redor do título.

   >>> NÃO HÁ BOTÃO AQUI, E ISSO É A DECISÃO <<<
   Havia dois: "ver o trabalho" e "começar uma conversa". Os dois saíram.
   Um botão no hero é um atalho, e atalho é o contrário do que esta página
   é: ela foi feita pra ser atravessada, e quem pula direto pro contato
   chega lá sem ter visto nada que justifique escrever. O convite agora é
   rolar, e a única coisa que pede ação na primeira tela é a seta.

   Os pontos de contato continuam existindo, três deles, mas depois de o
   trabalho ter sido mostrado. Ver <InlineCta/>.

   A composição é de duas faixas: a declaração ocupando quase a largura
   inteira, e a régua técnica embaixo. Havia uma terceira no topo, com
   disponibilidade e coordenada; ela saiu porque repetia o que a navegação
   e o contato já dizem, e porque o vazio acima do título é metade do
   impacto dele.

   Movimento, em duas partes:

   ENTRADA   as palavras do título saem de desfocado com mola que passa do
             ponto, 75ms entre si; o parágrafo assenta depois; a régua
             aparece por último.
   SAÍDA     a primeira rolagem desmonta a composição em três direções
             diferentes. Está detalhado logo abaixo, em A SAÍDA.
   Nada disso espera rolagem: é a primeira tela, e ela tem de estar inteira
   antes de a pessoa tocar no mouse.

   O único movimento ligado ao cursor é um deslocamento de 10px no bloco de
   texto — acima disso o hero vira brinquedo e o conteúdo vira desculpa. Só
   existe em ponteiro fino, porque no dedo não há cursor pra reagir.
   ------------------------------------------------------------------------- */

function useHoraLocal() {
  /* null no servidor e no primeiro render: a hora não pode divergir entre
     servidor e cliente, senão a hidratação reclama */
  const [hora, setHora] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: identity.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const tick = () => setHora(fmt.format(new Date()));
    tick();
    /* de meio em meio minuto: um timer por segundo não mudaria nada na tela */
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return hora;
}

export default function Hero() {
  const t = useT();
  const reduzido = useReducedMotion();
  const fino = usePonteiroFino();
  const largo = useMedia('(min-width: 768px)');
  const hora = useHoraLocal();
  const ref = useRef<HTMLElement>(null);

  /* O vídeo é textura, não conteúdo: entra a 12% de opacidade, já em cinza,
     atrás da grade. Ele não é baixado em tela estreita nem com movimento
     reduzido — e como `useMedia` só responde no cliente, ele nunca sai no
     HTML do servidor, o que mantém o LCP sendo o título. */
  const comVideo = largo && !reduzido;

  /* o cursor move o bloco de texto por motion values — nada de setState a
     60fps, então o React não re-renderiza durante o movimento */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mola = { stiffness: 80, damping: 20, mass: 0.6 };
  const x = useSpring(useTransform(px, [-0.5, 0.5], [10, -10]), mola);
  const y = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), mola);

  /* a grade técnica desce mais devagar que o conteúdo enquanto o hero sai
     de cena: é o que dá profundidade sem colocar imagem nenhuma no fundo */
  /* -----------------------------------------------------------------------
     AS CAMADAS

     Quatro planos saindo de cena em velocidades diferentes. A regra é a
     mesma da fotografia: o que está longe se move pouco, o que está perto
     se move muito. Não é enfeite — é a única pista de profundidade que uma
     tela plana consegue dar sem sombra e sem 3D.

       vídeo   18% pra baixo. É o fundo, e fundo quase não anda.
       título  60px pra cima, com desfoque entrando no fim. O desfoque é o
               que o olho lê como "saiu do plano de foco" em vez de "subiu".
       lead    110px. Está na frente do título.
       régua   170px, o mais rápido de todos, porque é a camada mais
               próxima e a última a sair.

     Nenhuma delas passa de 170px de curso. Acima disso o hero deixa de
     parecer profundidade e passa a parecer que as peças se desmontaram.
     ----------------------------------------------------------------------- */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const fundoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fundoOpacidade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  /* -----------------------------------------------------------------------
     A SAÍDA

     A primeira rolagem não faz o hero subir: faz a pessoa atravessá-lo. O
     título cresce 34% e continua subindo, então ele passa **por fora** da
     viewport em vez de sair por cima dela, e por um instante as letras são
     maiores que a tela. É a diferença entre uma página que rola e uma
     câmera que avança.

     As três camadas saem em direções que não combinam de propósito: o
     título pra frente e pra cima, a régua pra baixo, o lead pro lado. Sair
     tudo junto na mesma direção lê como um bloco; sair desencontrado lê
     como uma composição se desfazendo, que é o efeito.

     O desfoque entra só no último terço. Antes disso o título ainda está
     sendo lido, e desfocar texto legível é hostilidade, não cinema.
     ----------------------------------------------------------------------- */
  const tituloEscala = useTransform(scrollYProgress, [0, 1], [1, 1.34]);
  const tituloY = useTransform(scrollYProgress, [0, 1], [0, -190]);
  const tituloDesfoque = useTransform(
    scrollYProgress,
    [0, 0.66, 1],
    ['blur(0px)', 'blur(0px)', 'blur(11px)'],
  );
  const tituloOpacidade = useTransform(scrollYProgress, [0, 0.74, 1], [1, 1, 0]);

  const leadY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const leadX = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const leadOpacidade = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0]);

  /* a régua desce enquanto o resto sobe: é ela que dá a sensação de a
     composição estar sendo puxada por dois lados */
  const reguaY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const reguaOpacidade = useTransform(scrollYProgress, [0, 0.45, 1], [1, 1, 0]);

  useEffect(() => {
    if (!fino || reduzido) return;
    const el = ref.current;
    if (!el) return;
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener('pointermove', mover, { passive: true });
    return () => el.removeEventListener('pointermove', mover);
  }, [fino, reduzido, px, py]);

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-title"
      /* overflow-clip no lugar de hidden: o título cresce pra além da
         seção na saída, e precisa ser recortado sem que a seção vire
         contêiner de rolagem — que é o que hidden faria, matando o sticky
         da galeria mais abaixo. */
      className="relative flex min-h-[100svh] flex-col justify-between overflow-clip pb-[var(--space-7)] pt-[calc(var(--header-h)+var(--space-7))]"
    >
      {/* ---- fundo ----
           Uma camada só: o vídeo, em cinza e a 14%. Nessa opacidade ninguém
           lê "pessoa digitando num laptop", que seria a imagem de banco mais
           batida que existe. O que fica é luz que se move.

           Havia uma grade técnica de 1px por cima. Saiu: com o vídeo atrás,
           as duas texturas disputavam a mesma área e o hero ficava ocupado
           justamente onde ele precisa de vazio. Sem a grade o vídeo pode
           subir de opacidade e virar o único evento do fundo.

           Ele desliza mais devagar que o conteúdo enquanto o hero sai de
           cena, e é isso que dá profundidade sem imagem em primeiro plano. */}
      {comVideo && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={reduzido ? undefined : { y: fundoY, opacity: fundoOpacidade }}
        >
          <video
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: 0.14,
              maskImage: 'radial-gradient(ellipse 80% 70% at 55% 45%, #000 15%, transparent 78%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 70% at 55% 45%, #000 15%, transparent 78%)',
            }}
            src={`${basePath}/video/hero.mp4`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            /* `data-pause` não serve pra <video>: quem congela o loop fora
               da tela é o próprio navegador, que pausa mídia invisível. */
          />
        </motion.div>
      )}

      {/* ================= a declaração ================= */}
      <div className="shell relative w-full py-[var(--space-8)]">
        <motion.div
          style={
            reduzido
              ? undefined
              : {
                  y: tituloY,
                  scale: tituloEscala,
                  filter: tituloDesfoque,
                  opacity: tituloOpacidade,
                  /* cresce a partir da esquerda e de cima: escalar pelo
                     centro afastaria o título da margem e quebraria a grade
                     justo no momento em que ele é a única coisa na tela */
                  transformOrigin: 'left top',
                  ...(fino ? { x, translateY: y } : {}),
                }
          }
        >
          {/* O título visível é o h1. Ele já foi um <p>, com um h1 em
              sr-only por cima: dava a hierarquia certa pro leitor de tela e
              a errada pra todo o resto, porque a manchete de 13rem não
              contava como cabeçalho. */}
          {/* A quebra é composição, não acidente de largura: as três linhas
              formam um retângulo, e é o retângulo que se compõe contra a
              grade. Deixar o navegador quebrar daria três formas diferentes
              em três telas. */}
          <Lines
            id="hero-title"
            lines={t.hero.lines}
            as="h1"
            className="display-hero"
            immediate
            cinema
            delay={0.25}
          />
        </motion.div>

        <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-6)]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enter, delay: 0.75 }}
            className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-7"
            {...(reduzido ? {} : { style: { y: leadY, x: leadX, opacity: leadOpacidade } })}
          >
            <p className="lead">{t.hero.lead}</p>

            {/* a prova mais forte do site estava atrás de um botão na tela
                oito: os cinco projetos abrem rodando aqui dentro */}
            <p className="body-sm mt-[var(--space-4)] flex gap-[var(--space-3)]">
              <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
                ↳
              </span>
              {t.hero.proof}
            </p>

          </motion.div>
        </div>
      </div>

      {/* ================= a régua técnica ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow, delay: 0.95 }}
        className="shell relative w-full"
        {...(reduzido ? {} : { style: { y: reguaY, opacity: reguaOpacidade } })}
      >
        <dl
          className="grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-5)] border-t pt-[var(--space-4)] sm:grid-cols-4"
          style={{ borderColor: 'var(--line)' }}
        >
          {[
            [t.hero.productsLabel, String(identity.shipped)],
            [t.hero.basedIn, `${identity.city}, ${t.meta.country}`],
            [t.hero.languages, t.hero.languagesValue],
            [t.hero.localTime, hora ?? '--:--'],
          ].map(([rotulo, valor]) => (
            <div key={rotulo}>
              <dt className="label label--dim">{rotulo}</dt>
              <dd className="mt-[var(--space-2)] text-[clamp(0.9rem,1.1vw,1.05rem)]">{valor}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-[var(--space-5)] flex items-baseline justify-between gap-[var(--space-4)]">
          <span className="label label--dim">{t.hero.scroll}</span>
          <motion.span
            aria-hidden="true"
            className="label"
            /* o pulso é o único convite da primeira tela desde que os
               botões saíram, então ele ficou mais insistente: curso maior e
               ciclo mais curto, com uma pausa no fim pra não virar tique */
            animate={reduzido ? undefined : { y: [0, 9, 0, 0], opacity: [1, 1, 1, 0.45] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: easeStandard, times: [0, 0.35, 0.6, 1] }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
