'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { sections, spyIds } from '@/data/sections';
import { site } from '@/data/site';
import { useSectionSpy } from '@/hooks/useSectionSpy';
import { TransitionLink } from './PageTransition';
import { ThemeToggle } from './Theme';
import MobileMenu from './MobileMenu';
import { duration, easeStandard } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   NAVEGAÇÃO.

   Uma faixa fina, sem fundo, até a rolagem passar do hero. A seção ativa é
   marcada por um traço que desliza entre os itens — um só elemento animado
   com layoutId, em vez de acender e apagar borda em cada link.

   Os itens saem de data/sections.ts, então a navegação nunca desencontra do
   conteúdo. Em página de projeto o indicador some: não há seção pra apontar.
   ------------------------------------------------------------------------- */

export default function Nav() {
  const { scrollY } = useScroll();
  const [ancorada, setAncorada] = useState(false);
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();
  const naHome = pathname === '/';

  /* o espião só roda na home: fora dela não existem seções pra observar */
  const ativa = useSectionSpy(naHome ? spyIds : []);

  useMotionValueEvent(scrollY, 'change', (y) => setAncorada(y > 24));

  useEffect(() => setAberto(false), [pathname]);

  return (
    <>
      <a
        href="#conteudo"
        className="btn sr-only fixed left-[var(--space-4)] top-[var(--space-4)] z-[95] focus:not-sr-only focus:inline-flex"
      >
        Pular para o conteúdo
      </a>

      {/* com o menu aberto a faixa sobe acima do painel: o header cria
          contexto de empilhamento, então o z-index do botão não basta */}
      <header className={cn('fixed inset-x-0 top-0', aberto ? 'z-[85]' : 'z-[70]')}>
        <div
          className={cn(
            'transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-normal)]',
            ancorada && !aberto
              ? 'border-b bg-[var(--background)]/80 backdrop-blur-xl'
              : 'border-b border-transparent',
          )}
          style={{ borderColor: ancorada && !aberto ? 'var(--border)' : 'transparent' }}
        >
          <div className="shell flex h-[var(--header-h)] items-center justify-between gap-[var(--space-5)]">
            {/* assinatura */}
            <TransitionLink href="/" className="hit group flex items-baseline gap-[var(--space-2)]" cursor="ver">
              <span className="text-[0.95rem] font-semibold tracking-[-0.02em]">{site.name}</span>
              <span className="label hidden sm:inline">
                {naHome ? 'Full-stack · Design' : 'Estudo de caso'}
              </span>
            </TransitionLink>

            {/* seções — só desktop */}
            {naHome && (
              <nav aria-label="Seções" className="hidden lg:block">
                <ul className="flex items-center gap-[var(--space-1)]">
                  {sections
                    .filter((s) => s.nav)
                    .map((s) => {
                      const atual = ativa === s.id;
                      return (
                        <li key={s.id} className="relative">
                          <a
                            href={`#${s.id}`}
                            aria-current={atual ? 'true' : undefined}
                            className="label relative block px-[var(--space-3)] py-[var(--space-3)] transition-colors duration-[var(--duration-fast)]"
                            style={{ color: atual ? 'var(--text-primary)' : undefined }}
                          >
                            {s.nav}
                          </a>
                          {atual && (
                            <motion.span
                              layoutId="nav-ativa"
                              aria-hidden="true"
                              className="absolute inset-x-[var(--space-3)] bottom-[6px] h-[1.5px]"
                              style={{ background: 'var(--accent)' }}
                              transition={{ duration: duration.normal, ease: easeStandard }}
                            />
                          )}
                        </li>
                      );
                    })}
                </ul>
              </nav>
            )}

            <div className="flex items-center gap-[var(--space-2)]">
              <ThemeToggle className="hit flex items-center gap-[var(--space-2)] px-[var(--space-2)] py-[var(--space-2)] transition-opacity hover:opacity-70" />

              <button
                type="button"
                onClick={() => setAberto((v) => !v)}
                aria-expanded={aberto}
                aria-controls="menu-mobile"
                className="label relative z-[85] -mr-[var(--space-2)] flex min-h-[44px] min-w-[44px] items-center justify-end gap-[var(--space-2)] lg:hidden"
              >
                {aberto ? 'Fechar' : 'Menu'}
                <span aria-hidden="true" className="flex w-4 flex-col gap-[4px]">
                  <span
                    className={cn('block h-px w-full bg-current transition-transform duration-[var(--duration-normal)]', aberto && 'translate-y-[5px] rotate-45')}
                  />
                  <span className={cn('block h-px w-full bg-current transition-opacity duration-[var(--duration-fast)]', aberto && 'opacity-0')} />
                  <span
                    className={cn('block h-px w-full bg-current transition-transform duration-[var(--duration-normal)]', aberto && '-translate-y-[5px] -rotate-45')}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu aberto={aberto} fechar={() => setAberto(false)} ativa={ativa} />
    </>
  );
}
