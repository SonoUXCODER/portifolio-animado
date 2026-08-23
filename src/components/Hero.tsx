'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { currentYear, site } from '@/data/site';
import { basePath } from '@/lib/base';
import { duration, easeStandard, enter } from '@/lib/motion';
import { Lines } from './Reveal';
import Magnetic from './Magnetic';
import { useMedia, usePonteiroFino } from '@/hooks/useMedia';

/* -------------------------------------------------------------------------
   HERO.

   Uma tela, quatro respostas: o que a pessoa faz, como ela trabalha, onde
   está, e se dá pra contratar agora. Nada mais entra — o hero é a única
   parte da página em que cada elemento a mais custa impacto, porque o
   impacto aqui *é* o vazio ao redor do título.

   A composição é de três faixas: metadados no topo, a declaração no meio
   ocupando quase a largura inteira, e a régua técnica embaixo. É a mesma
   estrutura de uma capa de revista, e é ela que dá a sensação editorial
   antes de qualquer animação rodar.

   Movimento, em ordem de entrada:
     1. as três linhas do título sobem de trás da máscara, 80ms entre si;
     2. o parágrafo e o CTA assentam depois;
     3. a régua de baixo aparece por último.
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
      timeZone: site.timezone,
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const fundoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fundoOpacidade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

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
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pb-[var(--space-7)] pt-[calc(var(--header-h)+var(--space-7))]"
    >
      {/* ---- fundo ----
           Duas camadas, e as duas somam quase nada.

           A de baixo é o vídeo, em cinza e a 12%: nessa opacidade ninguém
           lê "pessoa digitando", que seria a imagem de banco mais batida do
           mundo — o que fica é luz que se move. São 355kB, cortados pra 11
           segundos e 1280px de largura, e ele só existe fora do celular.

           A de cima é uma grade de 1px com máscara radial. Custa um
           gradiente e nenhum elemento. As duas deslizam mais devagar que o
           conteúdo enquanto o hero sai de cena, e é isso que dá
           profundidade sem imagem nenhuma em primeiro plano. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={reduzido ? undefined : { y: fundoY, opacity: fundoOpacidade }}
      >
        {comVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: 0.12,
              maskImage: 'radial-gradient(ellipse 75% 65% at 60% 45%, #000 10%, transparent 72%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 75% 65% at 60% 45%, #000 10%, transparent 72%)',
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
        )}
        <span className="blueprint" />
      </motion.div>

      {/* ================= faixa 1: metadados ================= */}
      <div className="shell relative w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.normal, delay: 0.1 }}
          className="flex flex-wrap items-baseline justify-between gap-x-[var(--space-6)] gap-y-[var(--space-2)]"
        >
          {/* o ponto pulsante é o único elemento da página que anima sozinho
              pra sempre. Ele ganha essa licença porque o que ele comunica é
              literalmente um estado ao vivo: se estou aceitando trabalho. */}
          <p className="label flex items-center gap-[var(--space-3)]" style={{ color: 'var(--text-primary)' }}>
            <span className="relative flex h-[7px] w-[7px]" aria-hidden="true">
              {!reduzido && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'var(--accent)' }}
                  animate={{ scale: [1, 2.4], opacity: [0.55, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                />
              )}
              <span className="relative h-full w-full rounded-full" style={{ background: 'var(--accent)' }} />
            </span>
            {site.availability}
          </p>

          <p className="label label--dim">
            {site.coordinates} <span className="index-line__sep">/</span> {currentYear()}
          </p>
        </motion.div>
      </div>

      {/* ================= faixa 2: a declaração ================= */}
      <div className="shell relative w-full py-[var(--space-8)]">
        <motion.div style={fino && !reduzido ? { x, y } : undefined}>
          <h1 id="hero-title" className="sr-only">
            {site.name} — {site.role}
          </h1>

          {/* A quebra é composição, não acidente de largura: as três linhas
              formam um retângulo, e é o retângulo que se compõe contra a
              grade. Deixar o navegador quebrar daria três formas diferentes
              em três telas. */}
          <Lines
            lines={['I build', 'digital', 'experiences.']}
            as="p"
            className="display-hero"
            immediate
            delay={0.25}
          />
        </motion.div>

        <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-6)]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enter, delay: 0.75 }}
            className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-7"
          >
            <p className="lead">
              Full-Stack Developer &amp; UX/UI Designer creating digital products where design and
              technology work as one system.
            </p>

            <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-[var(--space-4)]">
              <Magnetic>
                <a href="#work" className="btn" data-cursor="view">
                  Selected work
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#contact" className="btn btn--ghost" data-cursor="open">
                  Start a conversation <span aria-hidden="true">↗</span>
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ================= faixa 3: a régua técnica ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow, delay: 0.95 }}
        className="shell relative w-full"
      >
        <dl
          className="grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-5)] border-t pt-[var(--space-4)] sm:grid-cols-4"
          style={{ borderColor: 'var(--line)' }}
        >
          {[
            ['Based in', `${site.city}, ${site.country}`],
            ['Local time', hora ?? '--:--'],
            ['Disciplines', 'Design · Engineering'],
            ['Languages', 'EN · DE · PT'],
          ].map(([rotulo, valor]) => (
            <div key={rotulo}>
              <dt className="label label--dim">{rotulo}</dt>
              <dd className="mt-[var(--space-2)] text-[clamp(0.9rem,1.1vw,1.05rem)]">{valor}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-[var(--space-5)] flex items-baseline justify-between gap-[var(--space-4)]">
          <span className="label label--dim">Scroll to begin</span>
          <motion.span
            aria-hidden="true"
            className="label"
            animate={reduzido ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: easeStandard }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
