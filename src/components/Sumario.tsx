'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cadernos } from '@/data/arquivo';
import { estampas } from '@/data/estampas';
import { TransitionLink } from './PageTransition';

/* -------------------------------------------------------------------------
   SUMÁRIO.

   A peça que mais faz o site virar impresso: uma lista com pontilhado e
   fólio, do jeito que um índice é diagramado. As estampas entram no meio,
   recuadas, porque num livro elas são encarte e não capítulo.

   O pontilhado é um flex com um span que cresce e uma borda tracejada —
   não é caractere repetido, então nunca quebra em largura estranha nem é
   lido pelo leitor de tela.
   ------------------------------------------------------------------------- */

/* onde cada estampa cai na leitura: depois do caderno de índice tal */
const encartes: Record<number, (typeof estampas)[number]> = {
  0: estampas[0],
  1: estampas[1],
  3: estampas[2],
};

const romanos = ['I', 'II', 'III', 'IV', 'V'];

export default function Sumario() {
  const reduzido = useReducedMotion();

  return (
    <section id="sumario" aria-labelledby="sumario-titulo" className="pagina relative py-[clamp(40px,7vw,90px)]">
      <div className="envelope">
        <div className="cabeco">
          <span>SUMÁRIO</span>
          <span className="hidden sm:inline" style={{ color: 'var(--tinta-3)' }}>
            {cadernos.length} CADERNOS · {estampas.length} ESTAMPAS
          </span>
        </div>

        <h2 id="sumario-titulo" className="zine-titulo--medio mb-[clamp(24px,4vw,44px)]">
          O QUE TEM
          <br />
          AQUI DENTRO
        </h2>

        <ol className="flex flex-col">
          {cadernos.map((c, i) => (
            <motion.li
              key={c.id}
              initial={reduzido ? { opacity: 0 } : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={`#${c.id}`}
                data-cursor="ver"
                className="group flex items-baseline gap-3 border-b border-[var(--linha)] py-3 sm:gap-5 sm:py-4"
              >
                <span className="mono w-7 shrink-0 text-[11px] tracking-[0.14em]" style={{ color: 'var(--tinta-3)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="zine-titulo--medio shrink-0 text-[clamp(1.15rem,3vw,2.1rem)] transition-transform duration-300 group-hover:translate-x-2">
                  {c.titulo}
                </span>

                {/* o pontilhado que liga o título ao fólio */}
                <span
                  aria-hidden="true"
                  className="mb-[0.35em] hidden h-0 flex-1 border-b border-dotted border-[var(--linha-forte)] sm:block"
                />

                <span className="corpo ml-auto hidden max-w-[34ch] text-right text-[0.82rem] sm:ml-0 md:block">
                  {c.chamada}
                </span>

                <span className="mono ml-auto shrink-0 text-[11px] tracking-[0.14em] md:ml-5" style={{ color: 'var(--tinta-2)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </a>

              {/* encarte: recuado, porque estampa não é capítulo */}
              {encartes[i] && (
                <a
                  href={`#estampa-${encartes[i].slug}`}
                  data-cursor="olhar"
                  className="group flex items-baseline gap-3 border-b border-[var(--linha)] py-2.5 pl-10 sm:gap-5 sm:pl-16"
                >
                  <span className="mono shrink-0 text-[10px] tracking-[0.2em]" style={{ color: 'var(--tinta-3)' }}>
                    ESTAMPA {romanos[estampas.indexOf(encartes[i])]}
                  </span>
                  <span className="zine-sub transition-transform duration-300 group-hover:translate-x-2">
                    {encartes[i].titulo}
                  </span>
                  <span
                    aria-hidden="true"
                    className="mb-[0.3em] hidden h-0 flex-1 border-b border-dotted border-[var(--linha)] sm:block"
                  />
                  <span className="mono ml-auto shrink-0 text-[10px] tracking-[0.18em]" style={{ color: 'var(--tinta-3)' }}>
                    ENCARTE
                  </span>
                </a>
              )}
            </motion.li>
          ))}
        </ol>

        <p className="corpo mt-7 max-w-[46ch] text-[clamp(0.9rem,1.2vw,1.02rem)]">
          Dá pra pular direto pra qualquer página. Mas o arquivo foi montado pra ser lido na ordem —
          <TransitionLink href="/#quem-assina" className="alvo ml-1 underline decoration-[var(--linha-forte)] underline-offset-4 hover:decoration-[var(--tinta)]" cursor="ver">
            começa aqui
          </TransitionLink>
          .
        </p>
      </div>
    </section>
  );
}
