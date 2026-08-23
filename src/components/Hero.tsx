'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { site } from '@/data/site';
import { projects } from '@/data/projects';
import { stack } from '@/data/stack';
import { duration, easeStandard, enter } from '@/lib/motion';
import { WordsUp } from './Reveal';
import { usePonteiroFino } from '@/hooks/useMedia';

/* -------------------------------------------------------------------------
   HERO.

   Precisa responder quatro coisas antes da primeira rolagem: quem é, o que
   faz, onde está, e se dá pra chamar. Cada peça aqui responde uma delas —
   se não respondesse, não estaria.

   O único movimento ligado ao cursor é um deslocamento de 8px no bloco de
   texto. É pouco de propósito: acima disso o hero vira brinquedo e o
   conteúdo vira desculpa. E ele só existe em ponteiro fino, porque no dedo
   não há cursor pra reagir.
   ------------------------------------------------------------------------- */

/* Zurique não tem horário de verão fixo no código: o Intl resolve sozinho,
   inclusive na virada. Escrever o offset à mão quebraria duas vezes por ano. */
const FUSO = 'Europe/Zurich';

function useHoraLocal() {
  /* null no servidor e no primeiro render: a hora não pode divergir entre
     servidor e cliente, senão a hidratação reclama */
  const [hora, setHora] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('pt-BR', {
      timeZone: FUSO,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const tick = () => setHora(fmt.format(new Date()));
    tick();
    /* de minuto em minuto: um timer por segundo não mudaria nada na tela */
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return hora;
}

export default function Hero() {
  const reduced = useReducedMotion();
  const fino = usePonteiroFino();
  const hora = useHoraLocal();
  const ref = useRef<HTMLElement>(null);

  /* o cursor move o bloco de texto por motion values — nada de setState a
     60fps, então o React não re-renderiza durante o movimento */
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mola = { stiffness: 90, damping: 20, mass: 0.6 };
  const x = useSpring(useTransform(px, [-0.5, 0.5], [8, -8]), mola);
  const y = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), mola);

  useEffect(() => {
    if (!fino || reduced) return;
    const el = ref.current;
    if (!el) return;
    const mover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener('pointermove', mover, { passive: true });
    return () => el.removeEventListener('pointermove', mover);
  }, [fino, reduced, px, py]);

  /* dados reais, contados dos arquivos — nenhum número digitado à mão */
  const dados = [
    { rotulo: 'Base', valor: 'Suíça' },
    { rotulo: 'Hora local', valor: hora ?? '--:--' },
    { rotulo: 'Projetos', valor: String(projects.length).padStart(2, '0') },
    { rotulo: 'Ferramentas', valor: String(stack.length).padStart(2, '0') },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-titulo"
      className="relative flex min-h-[100svh] flex-col justify-between pb-[var(--space-8)] pt-[calc(var(--header-h)+var(--space-8))]"
    >
      <div className="shell w-full">
        {/* ---- estado ---- */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: duration.normal }}
          className="label flex items-center gap-[var(--space-3)]"
        >
          <span className="relative flex h-[7px] w-[7px]">
            {!reduced && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: 'var(--accent)' }}
                animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <span className="relative h-full w-full rounded-full" style={{ background: 'var(--accent)' }} />
          </span>
          Disponível para projetos
        </motion.p>
      </div>

      {/* ---- declaração ---- */}
      <div className="shell w-full py-[var(--space-8)]">
        <motion.div style={fino && !reduced ? { x, y } : undefined}>
          <h1 id="hero-titulo" className="sr-only">
            {site.name} — desenvolvedor full-stack e designer de produto
          </h1>
          <WordsUp
            as="p"
            text="Desenho a interface e escrevo o código dela."
            className="display-xl max-w-[14ch]"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...enter, delay: 0.5 }}
            className="lead mt-[var(--space-6)]"
          >
            As duas coisas, no mesmo projeto, pela mesma pessoa. É por isso que a decisão de design
            chega inteira até o deploy.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...enter, delay: 0.66 }}
          className="mt-[var(--space-7)] flex flex-wrap items-center gap-[var(--space-3)]"
        >
          <a href="#projetos" className="btn" data-cursor="ver">
            Ver o trabalho
          </a>
          <a href={`mailto:${site.email}`} className="btn btn--ghost" data-cursor="abrir">
            Falar comigo
          </a>
        </motion.div>
      </div>

      {/* ---- dados técnicos ----
           A régua horizontal continua na próxima seção: é o fio que costura
           uma cena na outra em vez de empilhar. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration.slow, delay: 0.8 }}
        className="shell w-full"
      >
        <dl className="grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-5)] border-t pt-[var(--space-4)] sm:grid-cols-4" style={{ borderColor: 'var(--border)' }}>
          {dados.map((d) => (
            <div key={d.rotulo}>
              <dt className="label">{d.rotulo}</dt>
              <dd className="figure mt-[var(--space-2)] text-[clamp(1rem,1.4vw,1.25rem)]">{d.valor}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-[var(--space-5)] flex items-center justify-between">
          <span className="label">Role para continuar</span>
          <motion.span
            aria-hidden="true"
            className="label"
            animate={reduced ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: easeStandard }}
          >
            ↓
          </motion.span>
        </div>
      </motion.div>
    </section>
  );
}
