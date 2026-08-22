'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { nav, site } from '@/data/site';
import { TransitionLink } from './PageTransition';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   Barra de cima.
   Fica quase invisível enquanto a pessoa lê, e ganha corpo (fundo, borda,
   sombra dura) assim que a rolagem passa da primeira tela. Some ao descer,
   volta ao subir — o conteúdo é que manda.
   ------------------------------------------------------------------------- */

export default function Navbar() {
  const { scrollY } = useScroll();
  const [encolhida, setEncolhida] = useState(false);
  const [escondida, setEscondida] = useState(false);
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const anterior = scrollY.getPrevious() ?? 0;
    setEncolhida(y > 40);
    setEscondida(y > 240 && y > anterior && !aberto);
  });

  /* trocou de página: o menu não pode continuar aberto */
  useEffect(() => setAberto(false), [pathname]);

  const naHome = pathname === '/';

  return (
    <>
      <a
        href="#conteudo"
        className="botao sr-only fixed left-4 top-4 z-[99] focus:not-sr-only focus:inline-flex"
      >
        pular pro conteúdo
      </a>

      {/* com o menu aberto a barra precisa subir acima do painel (z-80) e
          ficar sem fundo: o header cria contexto de empilhamento, então o
          z-index do botão sozinho não resolveria */}
      <motion.header
        className={cn('fixed inset-x-0 top-0', aberto ? 'z-[85]' : 'z-[75]')}
        animate={{ y: escondida ? '-115%' : '0%' }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            'flex items-center justify-between gap-4 px-[clamp(16px,4vw,64px)] transition-all duration-300',
            encolhida && !aberto
              ? 'border-b border-[var(--border)] bg-[var(--bg)]/85 py-2.5 backdrop-blur-md'
              : 'border-b-2 border-transparent py-4',
          )}
        >
          {/* marca */}
          <TransitionLink href="/" className="group flex items-baseline gap-2" cursor="abrir">
            <span
              className="zine-titulo text-[clamp(1.1rem,2.2vw,1.5rem)] leading-none"
              style={{ fontVariationSettings: "'wdth' 66" }}
            >
              {site.name}
            </span>
            <span
              className="mono text-[10px] tracking-[0.24em] transition-colors group-hover:text-[var(--accent)]"
              style={{ color: 'var(--text-2)' }}
            >
              {naHome ? '/HOME' : '/PROJETO'}
            </span>
            <span className="pisca ml-0.5 inline-block h-2 w-2 rounded-full" style={{ background: 'var(--accent)' }} />
          </TransitionLink>

          {/* links, só no desktop */}
          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    className="zine-sub relative inline-block px-3 py-2 transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
              <li className="ml-2">
                <a href={`mailto:${site.email}`} className="carimbo hover:text-[var(--accent)]" data-cursor="abrir">
                  disponível
                </a>
              </li>
            </ul>
          </nav>

          {/* botão do celular */}
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            className={cn(
              'mono relative z-[85] flex items-center gap-2 border-2 px-3 py-2 text-[11px] tracking-[0.2em] lg:hidden',
              'border-[var(--border-forte)] text-[var(--text)]',
            )}
          >
            {aberto ? 'FECHAR' : 'MENU'}
            <span className="flex flex-col gap-[3px]">
              <span
                className={cn('block h-[2px] w-4 bg-current transition-transform', aberto && 'translate-y-[5px] rotate-45')}
              />
              <span className={cn('block h-[2px] w-4 bg-current transition-opacity', aberto && 'opacity-0')} />
              <span
                className={cn('block h-[2px] w-4 bg-current transition-transform', aberto && '-translate-y-[5px] -rotate-45')}
              />
            </span>
          </button>
        </div>
      </motion.header>

      <MobileMenu aberto={aberto} fechar={() => setAberto(false)} />
    </>
  );
}
