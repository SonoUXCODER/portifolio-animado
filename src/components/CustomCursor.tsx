'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { usePonteiroFino } from '@/hooks/useMedia';

/* -------------------------------------------------------------------------
   Cursor.
   Um círculo pequeno que engorda e ganha palavra quando passa por cima de
   algo marcado com data-cursor. Só existe onde há ponteiro fino: no dedo
   ele não faz sentido nenhum e some junto com a regra `cursor:none`.

   Marcação, em qualquer lugar do site:
     data-cursor="ver"    -> projeto
     data-cursor="abrir"  -> link externo
     data-cursor="olhar"  -> imagem / desenho
     data-cursor="fechar" -> lightbox
   ------------------------------------------------------------------------- */

const palavras: Record<string, string> = {
  ver: 'VER',
  abrir: 'ABRIR',
  olhar: 'OLHAR',
  fechar: 'FECHAR',
  arrastar: 'ARRASTAR',
};

export default function CustomCursor() {
  const fino = usePonteiroFino();
  const reduzido = useReducedMotion();
  const [modo, setModo] = useState<string | null>(null);
  const [visivel, setVisivel] = useState(false);
  const [pressionado, setPressionado] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  /* mola curta: acompanha rápido, mas não gruda igual a um div comum */
  const mx = useSpring(x, { stiffness: 1100, damping: 60, mass: 0.35 });
  const my = useSpring(y, { stiffness: 1100, damping: 60, mass: 0.35 });

  useEffect(() => {
    if (!fino) return;
    document.body.classList.add('tem-cursor');
    return () => document.body.classList.remove('tem-cursor');
  }, [fino]);

  useEffect(() => {
    if (!fino) return;

    const mover = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visivel) setVisivel(true);

      const alvo = (e.target as HTMLElement | null)?.closest?.('[data-cursor]') as HTMLElement | null;
      setModo(alvo?.dataset.cursor ?? null);
    };
    const sair = () => setVisivel(false);
    const desce = () => setPressionado(true);
    const sobe = () => setPressionado(false);

    window.addEventListener('pointermove', mover, { passive: true });
    window.addEventListener('pointerdown', desce, { passive: true });
    window.addEventListener('pointerup', sobe, { passive: true });
    document.addEventListener('pointerleave', sair);
    return () => {
      window.removeEventListener('pointermove', mover);
      window.removeEventListener('pointerdown', desce);
      window.removeEventListener('pointerup', sobe);
      document.removeEventListener('pointerleave', sair);
    };
  }, [fino, visivel, x, y]);

  if (!fino) return null;

  const palavra = modo ? palavras[modo] ?? modo.toUpperCase() : null;
  const grande = Boolean(palavra);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
      style={{ x: reduzido ? x : mx, y: reduzido ? y : my, opacity: visivel ? 1 : 0 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full"
        style={{ translateX: '-50%', translateY: '-50%', borderStyle: 'solid' }}
        animate={{
          width: grande ? 76 : 14,
          height: grande ? 76 : 14,
          backgroundColor: grande ? 'var(--text)' : 'transparent',
          borderColor: 'var(--text)',
          borderWidth: grande ? 0 : 2,
          scale: pressionado ? 0.82 : 1,
          rotate: grande ? -6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 520, damping: 34 }}
      >
        <AnimatePresence>
          {palavra && (
            <motion.span
              key={palavra}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.14 }}
              className="mono text-[10px] font-semibold tracking-[0.2em]"
              style={{ color: 'var(--bg)' }}
            >
              {palavra}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
