'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { sections, sectionIndex } from '@/data/sections';
import { site } from '@/data/site';
import { duration, easeEmphasis, easeStandard } from '@/lib/motion';
import { ThemeToggle } from './Theme';

/* -------------------------------------------------------------------------
   MENU MOBILE.

   Pensado pra tela pequena, não reduzido dela: o alvo de toque é a linha
   inteira, o número da seção ancora a leitura, e o contato fica ao alcance
   do polegar, na base.

   Diálogo de verdade: foco entra ao abrir, volta ao fechar, Esc fecha,
   Tab circula dentro e a rolagem do fundo trava.
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
          aria-label="Navegação"
          className="fixed inset-0 z-[80] flex flex-col justify-between overflow-y-auto px-[var(--gutter)] pb-[var(--space-7)] pt-[calc(var(--header-h)+var(--space-6))] lg:hidden"
          style={{ background: 'var(--background)' }}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: duration.normal, ease: easeEmphasis }}
        >
          <nav aria-label="Seções">
            <ul className="flex flex-col">
              {sections.map((s, i) => {
                const atual = ativa === s.id;
                return (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.04, duration: duration.normal, ease: easeStandard }}
                    className="border-b"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <a
                      href={`#${s.id}`}
                      onClick={fechar}
                      aria-current={atual ? 'true' : undefined}
                      className="flex min-h-[56px] items-center gap-[var(--space-4)] py-[var(--space-3)]"
                    >
                      <span className="label w-6 shrink-0" style={{ color: atual ? 'var(--accent)' : undefined }}>
                        {sectionIndex(s.id)}
                      </span>
                      <span className="display-md" style={{ color: atual ? 'var(--accent)' : undefined }}>
                        {s.name}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: duration.normal }}
            className="mt-[var(--space-8)] flex flex-col gap-[var(--space-5)] border-t pt-[var(--space-5)]"
            style={{ borderColor: 'var(--border)' }}
          >
            <ThemeToggle className="flex min-h-[44px] w-fit items-center gap-[var(--space-3)]" />
            <ul className="flex flex-wrap gap-x-[var(--space-5)] gap-y-[var(--space-3)]">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="hit label link"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
