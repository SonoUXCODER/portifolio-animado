'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { WordsUp } from './Reveal';

/* -------------------------------------------------------------------------
   FAIXA DE DECLARAÇÃO.

   Uma frase, ocupando a largura inteira, em cor invertida. Existe pra
   resolver o problema de a página parecer uma pilha de seções: entre um ato
   e o outro o fundo troca por completo, e a troca é o que marca a virada —
   não um espaço maior nem um filete.

   Aqui ficou no lugar de um letreiro rolando com os cargos. O letreiro
   animava pra sempre e não dizia nada que o hero já não dissesse; esta
   faixa não anima sozinha e carrega uma afirmação. Um elemento a menos, uma
   informação a mais.

   O único movimento é a frase subir devagar enquanto a faixa atravessa a
   tela — deslocamento total de 40px, ligado ao progresso da rolagem, e
   desligado inteiro no prefers-reduced-motion.
   ------------------------------------------------------------------------- */

export default function Statement({
  text,
  kicker,
}: {
  text: string;
  /** rótulo curto acima da frase, quando ajuda a situar */
  kicker?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={ref}
      aria-label={kicker ?? 'Declaração'}
      className="my-[var(--space-9)] w-full overflow-clip py-[var(--space-10)]"
      style={{ background: 'var(--text-primary)', color: 'var(--background)' }}
    >
      <motion.div className="shell" style={reduced ? undefined : { y }}>
        {kicker && (
          <p className="label mb-[var(--space-5)]" style={{ color: 'var(--background)', opacity: 0.6 }}>
            {kicker}
          </p>
        )}
        <WordsUp as="p" text={text} className="display-lg max-w-[20ch]" />
      </motion.div>
    </section>
  );
}
