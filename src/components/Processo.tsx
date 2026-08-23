'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { processo } from '@/data/process';
import Kicker from './Kicker';
import { Reveal, WordsUp } from './Reveal';

/* -------------------------------------------------------------------------
   PROCESSO — da ideia até o deploy.

   Era um bloco de seis quadradinhos dentro de "Sobre", e virou cena própria
   porque é a resposta à única pergunta que um cliente faz antes de fechar:
   "como é trabalhar com você?". Espremido em cartão, aquilo respondia como
   um organograma responde.

   A composição é a mais assimétrica da página, e isso é o ponto: o algarismo
   ocupa a coluna da esquerda em tamanho de display, o texto fica numa
   coluna estreita à direita, e a nota em itálico cai embaixo. Nenhuma outra
   seção tem essa forma, então o leitor sabe que mudou de assunto antes de
   ler a primeira palavra.

   A régua vertical se preenche com o progresso da rolagem. É a única
   animação ligada ao scroll aqui, e ela existe porque a seção é literalmente
   sobre percurso: a linha mostra onde a ideia está entre o guardanapo e o
   deploy. `scaleY` num elemento de 1px composita na GPU e não força layout.
   ------------------------------------------------------------------------- */

function Etapa({ etapa, ultima }: { etapa: (typeof processo)[number]; ultima: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduced = useReducedMotion();

  /* o algarismo desliza um pouco mais devagar que o texto ao lado. São 18px
     no total da passagem — o suficiente pra dar profundidade, pouco o
     bastante pra ninguém apontar e dizer "tem um parallax aqui". */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const suave = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const y = useTransform(suave, [0, 1], [18, -18]);

  return (
    <li ref={ref} className="grid-12 gap-y-[var(--space-3)] pb-[var(--space-9)]">
      {/* ---- o algarismo ---- */}
      <div className="col-span-12 sm:col-span-3">
        <motion.p
          aria-hidden="true"
          className="numeral text-[clamp(3.5rem,11vw,8rem)]"
          style={{
            color: 'var(--accent)',
            ...(reduced ? {} : { y }),
          }}
        >
          {etapa.n}
        </motion.p>
      </div>

      {/* ---- o conteúdo ---- */}
      <div className="col-span-12 sm:col-span-8 sm:col-start-5">
        <Reveal direction="left">
          <h3 className="display-md">
            <span className="sr-only">Etapa {etapa.n}: </span>
            {etapa.titulo}
          </h3>
          <p className="body mt-[var(--space-4)] max-w-[46ch]">{etapa.texto}</p>

          <p className="nota mt-[var(--space-4)] flex max-w-[40ch] gap-[var(--space-3)]">
            <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
              ↳
            </span>
            {etapa.nota}
          </p>
        </Reveal>
      </div>

      {!ultima && (
        <div
          aria-hidden="true"
          className="col-span-12 mt-[var(--space-6)] border-b sm:col-span-8 sm:col-start-5"
          style={{ borderColor: 'var(--border)' }}
        />
      )}
    </li>
  );
}

export default function Processo() {
  const lista = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: lista, offset: ['start 65%', 'end 70%'] });
  const preenche = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section
      id="processo"
      aria-labelledby="processo-titulo"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <Kicker id="processo" />

      <div className="mt-[var(--space-7)] max-w-[11ch]">
        <WordsUp as="h2" text="Como as coisas viram código" className="display-lg" />
        <span id="processo-titulo" className="sr-only">
          Processo
        </span>
      </div>

      <Reveal delay={0.1}>
        <p className="lead mt-[var(--space-6)] max-w-[46ch]">
          Seis etapas, sempre na mesma ordem, do primeiro rabisco até alguém que não sou eu abrir
          a página. O que muda de projeto pra projeto é o tempo em cada uma.
        </p>
      </Reveal>

      <div ref={lista} className="relative mt-[var(--space-9)]">
        {/* a régua que se preenche, encostada na coluna dos algarismos */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 hidden w-px sm:block"
          style={{ height: '100%', background: 'var(--border)' }}
        >
          <motion.span
            className="block h-full w-full origin-top"
            style={{ background: 'var(--accent)', scaleY: reduced ? 1 : preenche }}
          />
        </span>

        <ol className="sm:pl-[var(--space-6)]">
          {processo.map((etapa, i) => (
            <Etapa key={etapa.n} etapa={etapa} ultima={i === processo.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}
