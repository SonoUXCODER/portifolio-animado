'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { sections, sectionIndex } from '@/data/sections';
import { site } from '@/data/site';
import { duration, easeEmphasis, easeStandard } from '@/lib/motion';

/* -------------------------------------------------------------------------
   MENU MOBILE — fullscreen, editorial.

   Pensado pra tela pequena, não reduzido do desktop: cada capítulo ocupa
   uma linha inteira em tipografia de display, o número ancora a leitura, e
   o contato fica ao alcance do polegar, na base.

   A entrada é uma cortina que desce e as linhas sobem atrás dela, uma a
   uma — o mesmo gesto do hero. Um menu que só faz fade seria a única peça
   do site fora da linguagem.

   Diálogo de verdade: foco entra ao abrir, volta ao fechar, Esc fecha, Tab
   circula dentro e a rolagem do fundo trava.
   ------------------------------------------------------------------------- */

export default function MobileMenu({
  aberto,
  fechar,
  ativa,
}: {
  aberto: boolean;
  fechar: () => void;
  ativa: string;
}) {
  const painel = useRef<HTMLDivElement>(null);
  const focoAnterior = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!aberto) return;

    focoAnterior.current = document.activeElement as HTMLElement | null;
    const overflowAntes = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    /* o primeiro link recebe o foco: quem navega por teclado entra no menu,
       não continua tabulando atrás dele */
    const primeiro = painel.current?.querySelector<HTMLElement>('a, button');
    primeiro?.focus();

    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return fechar();
      if (e.key !== 'Tab') return;

      /* O botão que fecha mora no cabeçalho, fora do painel. Preso só ao
         painel, o ciclo de Tab nunca chegava nele: o controle estava na
         tela, visível, e era inalcançável pelo teclado — sobrava o Esc.
         Ele entra no fim da lista, que é onde a mão espera achar "fechar". */
      const gatilho = document.querySelector<HTMLElement>('[aria-controls="menu-mobile"]');
      const dentro = painel.current?.querySelectorAll<HTMLElement>('a[href], button');
      const focaveis = [...(dentro ?? []), ...(gatilho ? [gatilho] : [])];
      if (!focaveis.length) return;
      const ini = focaveis[0];
      const fim = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === ini) {
        e.preventDefault();
        fim.focus();
      } else if (!e.shiftKey && document.activeElement === fim) {
        e.preventDefault();
        ini.focus();
      }
    };

    window.addEventListener('keydown', tecla);
    return () => {
      window.removeEventListener('keydown', tecla);
      document.body.style.overflow = overflowAntes;
      focoAnterior.current?.focus?.();
    };
  }, [aberto, fechar]);

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          ref={painel}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-0 z-[80] flex flex-col justify-between overflow-y-auto px-[var(--gutter)] pb-[var(--space-7)] pt-[calc(var(--header-h)+var(--space-7))] lg:hidden"
          style={{ background: 'var(--background)' }}
          initial={{ y: '-100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.62, ease: easeEmphasis }}
        >
          <nav aria-label="Sections">
            <ul className="flex flex-col">
              {sections.map((s, i) => {
                const atual = ativa === s.id;
                return (
                  <li key={s.id} className="border-b" style={{ borderColor: 'var(--line)' }}>
                    <a
                      href={`#${s.id}`}
                      onClick={fechar}
                      aria-current={atual ? 'true' : undefined}
                      className="flex min-h-[68px] items-baseline gap-[var(--space-4)] py-[var(--space-4)]"
                    >
                      <span
                        className="label w-6 shrink-0"
                        style={{ color: atual ? 'var(--accent)' : 'var(--text-tertiary)' }}
                      >
                        {sectionIndex(s.id)}
                      </span>
                      <span className="overflow-hidden pt-[0.12em] [margin-top:-0.12em]">
                        <motion.span
                          className="display-lg block"
                          style={{ color: atual ? 'var(--accent)' : undefined }}
                          initial={{ y: '106%' }}
                          animate={{ y: '0%' }}
                          transition={{
                            delay: 0.18 + i * 0.055,
                            duration: 0.7,
                            ease: easeStandard,
                          }}
                        >
                          {s.name}
                        </motion.span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: duration.normal }}
            className="mt-[var(--space-8)] flex flex-col gap-[var(--space-4)] border-t pt-[var(--space-5)]"
            style={{ borderColor: 'var(--line)' }}
          >
            <a href={`mailto:${site.email}`} className="title-sm link w-fit">
              {site.email}
            </a>
            <ul className="flex flex-wrap gap-x-[var(--space-5)] gap-y-[var(--space-3)]">
              {site.social
                .filter((s) => s.href.startsWith('http'))
                .map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="hit label link">
                      {s.label} <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
            </ul>
            <p className="label label--dim">
              {site.city} / {site.country}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
