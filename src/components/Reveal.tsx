'use client';

import { useRef, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { duration, easeStandard, enter, stagger, viewport } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   As peças de rolagem. Quatro, e nada mais:

     Reveal        — um elemento entra
     RevealGroup   — vários entram em cascata
     Parallax      — desloca conforme a rolagem
     ScrollLine    — traço que se desenha com o progresso

   Todas checam prefers-reduced-motion e, quando ele está ligado, entregam
   no máximo um fade curto: nada de deslocamento, nada de parallax.

   O deslocamento padrão é 24px. Antes era 56px, e a diferença importa —
   acima de ~30px o movimento deixa de parecer que o conteúdo assentou e
   passa a parecer que ele voou de algum lugar.
   ------------------------------------------------------------------------- */

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  none: { x: 0, y: 0 },
};

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  style,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  style?: CSSProperties;
  as?: 'div' | 'li' | 'span' | 'section' | 'article';
}) {
  const reduced = useReducedMotion();
  const d = offset[direction];
  const M = motion[as] as typeof motion.div;

  return (
    <M
      className={className}
      style={style}
      initial={reduced ? { opacity: 0 } : { opacity: 0, x: d.x, y: d.y }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{ ...enter, delay, duration: reduced ? duration.fast : enter.duration }}
    >
      {children}
    </M>
  );
}

/* ---------- cascata ----------
   O pai orquestra e os filhos herdam via variants: um observer só pro grupo
   inteiro, em vez de um por item. */

export function RevealGroup({
  children,
  className,
  step = stagger,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  as?: 'div' | 'ul' | 'ol' | 'dl';
}) {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      transition={{ staggerChildren: step, delayChildren: delay }}
    >
      {children}
    </M>
  );
}

export function RevealItem({
  children,
  className,
  direction = 'up',
  as = 'div',
  style,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  as?: 'div' | 'li' | 'span';
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  const d = offset[direction];
  const M = motion[as] as typeof motion.div;

  return (
    <M
      className={className}
      style={style}
      variants={{
        hidden: reduced ? { opacity: 0 } : { opacity: 0, x: d.x, y: d.y },
        shown: reduced ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ ...enter, duration: reduced ? duration.fast : enter.duration }}
    >
      {children}
    </M>
  );
}

/* ---------- parallax ---------- */

export function Parallax({
  children,
  className,
  /** deslocamento total em px, do topo ao fim da passagem pela tela */
  strength = 40,
  style,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  /* a mola tira o degrau da rolagem sem atrasar a ponto de parecer solta */
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 });
  const y = useTransform(smooth, [0, 1], [strength, -strength]);

  return (
    <div ref={ref} className={className} style={style}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ---------- traço que se desenha com a rolagem ----------
   Usado na timeline. `scaleY` num elemento de 1px é barato e composita. */

export function ScrollLine({ className, targetRef }: { className?: string; targetRef: React.RefObject<HTMLElement | null> }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 70%', 'end 60%'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <span aria-hidden="true" className={cn('block origin-top', className)} style={{ background: 'var(--border)' }}>
      <motion.span
        className="block h-full w-full origin-top"
        style={{ background: 'var(--accent)', scaleY: reduced ? 1 : smooth }}
      />
    </span>
  );
}

/* ---------- barra de progresso da página ---------- */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left"
      style={{ scaleX: width, background: 'var(--accent)' }}
    />
  );
}

/* ---------- título que sobe palavra por palavra ----------
   A máscara precisa de folga no topo: com line-height abaixo de 1, o
   overflow corta o acento das maiúsculas e "CÓDIGO" vira "CODIGO". */

export function WordsUp({
  text,
  className,
  as: Tag = 'h2',
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(' ');
  const M = motion[Tag] as typeof motion.h2;

  if (reduced) {
    return (
      <M className={className} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewport} transition={{ duration: duration.fast }}>
        {text}
      </M>
    );
  }

  return (
    <M
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewport}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden pt-[0.16em] align-bottom [margin-top:-0.16em]">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '110%' }, shown: { y: '0%' } }}
            transition={{ duration: duration.slow, ease: easeStandard }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </M>
  );
}
