'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Lines } from './Reveal';

/* -------------------------------------------------------------------------
   FAIXA DE DECLARAÇÃO.

   Duas ou três palavras ocupando a largura inteira, entre um projeto e o
   seguinte. Existe pra resolver o problema de a seção de trabalho parecer
   uma pilha: entre um capítulo e o outro a página para de mostrar e faz uma
   afirmação, e é essa troca de registro que marca a virada.

   Não tem imagem, não tem fundo próprio, não tem borda. O efeito inteiro é
   escala: depois de uma sequência de chapas e parágrafos, uma frase em
   8rem no vazio lê como silêncio.

   O único movimento é a frase atravessar a tela um pouco mais devagar que
   a rolagem — 60px no total da passagem. Desligado inteiro no
   prefers-reduced-motion.
   ------------------------------------------------------------------------- */

export default function Statement({
  lines,
  /** rótulo curto acima da frase, quando ajuda a situar */
  label,
  /** alinha a frase à direita — usado pra alternar entre duas declarações */
  align = 'left',
}: {
  lines: string[];
  label?: string;
  align?: 'left' | 'right';
}) {
  const ref = useRef<HTMLElement>(null);
  const reduzido = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={ref}
      aria-label={lines.join(' ')}
      /* sem `shell`: ela é usada dentro da seção de trabalho, que já tem a
         margem. Repetir o contêiner daria o dobro do recuo lateral. */
      className="w-full overflow-clip py-[var(--space-8)]"
    >
      <motion.div
        className={align === 'right' ? 'flex flex-col items-end text-right' : ''}
        style={reduzido ? undefined : { y }}
      >
        {label && <p className="label label--dim mb-[var(--space-6)]">{label}</p>}
        <Lines lines={lines} as="p" className="display-xl" />
      </motion.div>
    </section>
  );
}
