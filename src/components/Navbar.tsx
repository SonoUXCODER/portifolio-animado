'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { cadernos } from '@/data/arquivo';
import { site } from '@/data/site';
import { TransitionLink } from './PageTransition';
import { BotaoTema } from './Tema';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   A RÉGUA.

   A faixa do topo não é uma navbar de site: é a régua que fica em cima da
   folha, com o nome da publicação de um lado e os atalhos do outro. Some ao
   descer (o conteúdo é que manda) e volta ao subir.

   Os links saem de data/arquivo.ts — a régua nunca desencontra do sumário.
   ------------------------------------------------------------------------- */

export default function Navbar() {
  const { scrollY } = useScroll();
  const [encostada, setEncostada] = useState(false);
  const [escondida, setEscondida] = useState(false);
  const [aberto, setAberto] = useState(false);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const anterior = scrollY.getPrevious() ?? 0;
    setEncostada(y > 40);
    setEscondida(y > 260 && y > anterior && !aberto);
  });

  /* trocou de página: o menu não pode continuar aberto */
  useEffect(() => setAberto(false), [pathname]);

  const naHome = pathname === '/';
  const atalhos = cadernos.filter((c) => c.naRegua);

  return (
    <>
      <a href="#conteudo" className="botao sr-only fixed left-4 top-4 z-[99] focus:not-sr-only focus:inline-flex">
        pular pro conteúdo
      </a>

      {/* com o menu aberto a régua precisa subir acima do painel (z-80): o
          header cria contexto de empilhamento, então o z-index do botão
          sozinho não resolveria */}
      <motion.header
        className={cn('fixed inset-x-0 top-0', aberto ? 'z-[85]' : 'z-[75]')}
        animate={{ y: escondida ? '-115%' : '0%' }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            'flex items-center justify-between gap-4 px-[clamp(14px,4vw,44px)] transition-all duration-300',
            encostada && !aberto
              ? 'border-b border-[var(--linha)] bg-[var(--papel)]/88 py-2 backdrop-blur-md'
              : 'border-b border-transparent py-3',
          )}
        >
          {/* nome da publicação */}
          <TransitionLink href="/" className="alvo group flex items-baseline gap-2" cursor="ver">
            <span
              className="zine-titulo text-[clamp(1rem,2vw,1.35rem)] leading-none"
              style={{ fontVariationSettings: "'wdth' 66" }}
            >
              {site.name}
            </span>
            <span className="mono text-[9px] tracking-[0.22em]" style={{ color: 'var(--tinta-3)' }}>
              {naHome ? 'ARQUIVO' : 'ESTUDO'}
            </span>
            <span className="pisca ml-0.5 inline-block h-[5px] w-[5px]" style={{ background: 'var(--tinta)' }} />
          </TransitionLink>

          {/* atalhos, só no desktop */}
          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {atalhos.map((c, i) => (
                <li key={c.id} className="flex items-center">
                  <TransitionLink
                    href={`/#${c.id}`}
                    className="zine-sub inline-block px-2.5 py-2 transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    {c.atalho}
                  </TransitionLink>
                  {i < atalhos.length - 1 && (
                    <span aria-hidden="true" className="h-[9px] w-px" style={{ background: 'var(--linha)' }} />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <BotaoTema className="flex items-center gap-2 border border-[var(--linha-forte)] px-2.5 py-[7px] transition-colors hover:border-[var(--tinta)]" />

            {/* botão do celular */}
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              className="mono relative z-[85] flex items-center gap-2 border border-[var(--linha-forte)] px-2.5 py-[7px] text-[10px] tracking-[0.18em] lg:hidden"
            >
              {aberto ? 'FECHAR' : 'ÍNDICE'}
              <span className="flex flex-col gap-[3px]">
                <span className={cn('block h-px w-3.5 bg-current transition-transform', aberto && 'translate-y-[4px] rotate-45')} />
                <span className={cn('block h-px w-3.5 bg-current transition-opacity', aberto && 'opacity-0')} />
                <span className={cn('block h-px w-3.5 bg-current transition-transform', aberto && '-translate-y-[4px] -rotate-45')} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu aberto={aberto} fechar={() => setAberto(false)} />
    </>
  );
}
