'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { usePonteiroFino } from '@/hooks/useMedia';

/* -------------------------------------------------------------------------
   HOVER MAGNÉTICO.

   O botão se desloca na direção do cursor enquanto ele está por perto, e
   volta com mola ao sair. É o efeito mais copiado desse gênero de site, e
   também o mais fácil de errar: passando de ~12px o controle deixa de
   parecer atraído e passa a parecer que está fugindo do dedo.

   Só existe onde há ponteiro fino de verdade — no toque não há hover, e o
   deslocamento só faria o alvo escapar embaixo do dedo. Some inteiro em
   prefers-reduced-motion.

   Envolve o filho num wrapper `inline-flex`: sem isso um <a> em display
   inline não teria caixa medível e o cálculo do centro sairia errado.
   ------------------------------------------------------------------------- */

export default function Magnetic({
  children,
  /** deslocamento máximo em px */
  strength = 10,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const fino = usePonteiroFino();
  const reduzido = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mola = { stiffness: 260, damping: 22, mass: 0.5 };
  const mx = useSpring(x, mola);
  const my = useSpring(y, mola);

  const ativo = fino && !reduzido;

  const mover = (e: React.PointerEvent) => {
    if (!ativo) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    /* a razão é do centro pra borda, então o deslocamento é proporcional a
       quanto o cursor está fora do meio — não à distância absoluta */
    x.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength);
    y.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength);
  };

  const sair = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={ativo ? { x: mx, y: my, display: 'inline-flex' } : { display: 'inline-flex' }}
      onPointerMove={mover}
      onPointerLeave={sair}
    >
      {children}
    </motion.span>
  );
}
