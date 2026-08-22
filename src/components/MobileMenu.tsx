'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cadernos } from '@/data/arquivo';
import { estampas } from '@/data/estampas';
import { site } from '@/data/site';
import { TransitionLink } from './PageTransition';
import { BotaoTema } from './Tema';

/* -------------------------------------------------------------------------
   O índice do celular: a mesma lista do sumário, em tela cheia e em tinta
   cheia. Nada de acordeão, nada de submenu — índice é lista.
   ------------------------------------------------------------------------- */

export default function MobileMenu({ aberto, fechar }: { aberto: boolean; fechar: () => void }) {
  /* trava a rolagem do fundo e devolve o Esc */
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar();
    };
    window.addEventListener('keydown', tecla);
    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener('keydown', tecla);
    };
  }, [aberto, fechar]);

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          id="menu-mobile"
          className="invertido fixed inset-0 z-[80] flex flex-col justify-between overflow-y-auto px-5 pb-8 pt-20 lg:hidden"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
        >
          <nav aria-label="Navegação principal">
            <p className="mono mb-4 text-[10px] tracking-[0.24em]" style={{ color: 'var(--tinta-3)' }}>
              SUMÁRIO
            </p>
            <ul className="flex flex-col">
              {cadernos.map((c, i) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.05, duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-[var(--linha)]"
                >
                  <TransitionLink
                    href={`/#${c.id}`}
                    onClick={fechar}
                    className="zine-titulo--medio flex items-baseline gap-3 py-2.5 text-[clamp(1.5rem,7vw,2.4rem)]"
                  >
                    <span className="mono text-[10px]" style={{ color: 'var(--tinta-3)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {c.titulo}
                  </TransitionLink>
                </motion.li>
              ))}
            </ul>

            <p className="mono mb-2 mt-6 text-[10px] tracking-[0.24em]" style={{ color: 'var(--tinta-3)' }}>
              ENCARTES
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {estampas.map((e) => (
                <li key={e.slug}>
                  <TransitionLink href={`/#estampa-${e.slug}`} onClick={fechar} className="zine-sub">
                    {e.titulo}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42 }}
            className="mt-10 flex flex-col gap-4 border-t border-[var(--linha)] pt-5"
          >
            <BotaoTema className="flex w-fit items-center gap-2 border border-[var(--linha-forte)] px-3 py-2" />
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="zine-sub underline decoration-[var(--linha-forte)] underline-offset-4"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <p className="hand text-2xl" style={{ color: 'var(--tinta-2)' }}>
              {site.frase}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
