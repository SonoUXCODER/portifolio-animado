'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { nav, site } from '@/data/site';
import { TransitionLink } from './PageTransition';
import { Asterisco, Rabisco } from './Doodles';

/* -------------------------------------------------------------------------
   Menu do celular: painel de tinta cheia, links enormes, um item por linha.
   Nada de acordeão, nada de submenu — a navegação continua sendo uma lista.
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
          className="invertido fixed inset-0 z-[80] flex flex-col justify-between overflow-y-auto px-6 pb-10 pt-24 lg:hidden"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
        >
          <nav aria-label="Navegação principal">
            <ul className="flex flex-col">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14 + i * 0.055, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-[var(--border)]"
                >
                  <TransitionLink
                    href={item.href}
                    onClick={fechar}
                    className="zine-titulo--medio flex items-baseline gap-3 py-3"
                  >
                    <span className="mono text-[11px] opacity-45">0{i + 1}</span>
                    {item.label}
                  </TransitionLink>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="mt-10 flex flex-col gap-4"
          >
            <Rabisco cor="var(--accent)" largura={140} className="opacity-70" />
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="zine-sub underline decoration-[var(--accent)] decoration-2 underline-offset-4"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <p className="hand flex items-center gap-2 text-2xl opacity-80">
              <Asterisco cor="var(--ice)" tamanho={20} />
              {site.frase}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
