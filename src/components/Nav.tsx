'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { identity, spyIds } from '@/content';
import { useConteudo } from './ContentProvider';
import LanguageSwitcher from './LanguageSwitcher';
import Scramble from './Scramble';
import { useSectionSpy } from '@/hooks/useSectionSpy';
import { TransitionLink } from './PageTransition';
import MobileMenu from './MobileMenu';
import { duration, easeStandard } from '@/lib/motion';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   NAVEGAÇÃO.

   Uma faixa fina, sem fundo, até a rolagem passar do hero. A seção ativa é
   marcada por um traço que desliza entre os itens — um só elemento animado
   com layoutId, em vez de acender e apagar borda em cada link.

   Os itens saem de data/sections.ts, então a navegação nunca desencontra do
   conteúdo. Em página de projeto o indicador some: não há seção pra apontar,
   e a assinatura passa a dizer em que tipo de página a pessoa está.
   ------------------------------------------------------------------------- */

export default function Nav() {
  const { t, sections, lang } = useConteudo();
  const { scrollY } = useScroll();
  const [ancorada, setAncorada] = useState(false);
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();
  /* `trailingSlash: true` faz o roteador devolver "/de/", com barra no fim.
     Comparar com "/de" cru dava falso em toda página, e a navegação de
     capítulos simplesmente não aparecia na home. */
  const naHome = (pathname ?? '').replace(/\/$/, '') === `/${lang}`;

  /* o espião só roda na home: fora dela não existem seções pra observar */
  const ativa = useSectionSpy(naHome ? spyIds : []);

  useMotionValueEvent(scrollY, 'change', (y) => setAncorada(y > 24));

  useEffect(() => setAberto(false), [pathname]);

  return (
    <>
      <a
        href="#content"
        className="btn sr-only fixed left-[var(--space-4)] top-[var(--space-4)] z-[95] focus:not-sr-only focus:inline-flex"
      >
        {t.ui.skipToContent}
      </a>

      {/* com o menu aberto a faixa sobe acima do painel: o header cria
          contexto de empilhamento, então o z-index do botão não basta */}
      <header className={cn('fixed inset-x-0 top-0', aberto ? 'z-[85]' : 'z-[70]')}>
        <div
          className={cn(
            'border-b transition-[background-color,border-color,backdrop-filter] duration-[var(--duration-normal)]',
            ancorada && !aberto ? 'bg-[var(--background)]/72 backdrop-blur-xl' : 'backdrop-blur-none',
          )}
          style={{ borderColor: ancorada && !aberto ? 'var(--line)' : 'transparent' }}
        >
          <div className="shell flex h-[var(--header-h)] items-center justify-between gap-[var(--space-5)]">
            {/* ---- assinatura ---- */}
            <TransitionLink
              href={`/${lang}`}
              className="hit group flex items-baseline gap-[var(--space-3)]"
              cursor="home"
            >
              <Scramble
                texto={identity.wordmark}
                className="text-[1rem] font-semibold tracking-[-0.02em]"
              />
              <span className="label label--dim hidden sm:inline">
                {naHome ? t.ui.roleLabel : t.ui.caseStudyLabel}
              </span>
            </TransitionLink>

            {/* ---- capítulos — só desktop ---- */}
            {naHome && (
              <nav aria-label={t.ui.sections} className="hidden lg:block">
                <ul className="flex items-center gap-[var(--space-1)]">
                  {sections.map((s) => {
                    const atual = ativa === s.id;
                    return (
                      <li key={s.id} className="relative">
                        <a
                          href={`#${s.id}`}
                          aria-current={atual ? 'true' : undefined}
                          className="label relative block px-[var(--space-4)] py-[var(--space-4)] transition-colors duration-[var(--duration-fast)]"
                          style={{ color: atual ? 'var(--text-primary)' : undefined }}
                        >
                          {s.nav}
                        </a>
                        {atual && (
                          <motion.span
                            layoutId="nav-ativa"
                            aria-hidden="true"
                            className="absolute inset-x-[var(--space-4)] bottom-[14px] h-[1.5px]"
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

            <div className="flex items-center gap-[var(--space-4)]">
              <LanguageSwitcher className="hidden sm:flex" />

              {/* ---- o "disponível" saiu daqui ----
                   Era um ponto em acento e a palavra, fixos na faixa. A
                   justificativa era boa no papel — é a informação que decide
                   se a pessoa escreve — e o efeito na tela era o oposto:
                   ponto colorido pulsando ao lado de "DISPONÍVEL PARA
                   PROJETOS", grudado no topo de todas as telas, é o
                   maneirismo mais copiado de landing page gerada que existe.
                   Ele fazia a faixa inteira parecer template.

                   A informação não se perdeu: o contato diz o tempo de
                   resposta e a forma de trabalho, com a régua de quatro
                   dados no pé da seção, e lá ela chega para quem já viu o
                   trabalho — que é quando ela vale alguma coisa. */}

              <button
                type="button"
                onClick={() => setAberto((v) => !v)}
                aria-expanded={aberto}
                aria-controls="menu-mobile"
                className="label relative z-[85] -mr-[var(--space-2)] flex min-h-[44px] min-w-[44px] items-center justify-end gap-[var(--space-3)] lg:hidden"
                style={{ color: 'var(--text-primary)' }}
              >
                {aberto ? t.ui.close : t.ui.menu}
                <span aria-hidden="true" className="flex w-4 flex-col gap-[4px]">
                  <span
                    className={cn(
                      'block h-px w-full bg-current transition-transform duration-[var(--duration-normal)]',
                      aberto && 'translate-y-[5px] rotate-45',
                    )}
                  />
                  <span
                    className={cn(
                      'block h-px w-full bg-current transition-opacity duration-[var(--duration-fast)]',
                      aberto && 'opacity-0',
                    )}
                  />
                  <span
                    className={cn(
                      'block h-px w-full bg-current transition-transform duration-[var(--duration-normal)]',
                      aberto && '-translate-y-[5px] -rotate-45',
                    )}
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
