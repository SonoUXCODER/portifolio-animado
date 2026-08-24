'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { easeStandard } from '@/lib/motion';
import { viewport } from '@/lib/motion';

/* -------------------------------------------------------------------------
   O MÉTODO, EM QUATRO TEMPOS.

   DESIGN → SISTEMA → CÓDIGO → DEPLOY. É a resposta curta pra única pergunta
   que um cliente faz antes de fechar, que é "como é trabalhar com você".

   >>> CADA ETAPA ENTRA COMO ELA TRABALHA <<<
   As quatro entram diferente, e a diferença não é variedade por variedade:
   cada uma imita o que a etapa faz. É o tipo de coisa que ninguém nota
   conscientemente e todo mundo sente.

     Design    chega torto e se endireita. Design é o momento em que as
               coisas ainda estão fora do lugar e alguém as coloca no lugar,
               então a etapa nasce com 2° de rotação e assenta em zero.
     Sistema   chega deslocado na horizontal e trava. Sem mola, sem
               overshoot: uma curva firme que para seco, porque encaixar em
               grade é exatamente isso — a peça não negocia onde para.
     Código    é revelado da esquerda pra direita por uma máscara, como
               texto sendo escrito. É a única das quatro que usa clip-path,
               e é a que mais parece rápida mesmo levando o mesmo tempo.
     Deploy    expande. Vem de 0.94 de escala com mola que passa do ponto,
               e é a única que cresce em vez de se deslocar: publicar é a
               etapa em que a coisa deixa de ser sua e ocupa espaço.

   As quatro compartilham duração e curva base, então continuam parecendo do
   mesmo sistema. O que muda é a propriedade, não o tempo.

   >>> A LINHA <<<
   Uma régua vertical em acento se preenche com a rolagem e costura as
   quatro. Sem ela a seção é uma lista; com ela é um percurso, que é o que
   a palavra "método" promete. `scaleY` num elemento de 1px composita na GPU
   e não força layout.
   ------------------------------------------------------------------------- */

type Etapa = { step: string; note: string };

const VARIANTES = [
  /* Design: torto -> reto */
  {
    hidden: { opacity: 0, y: 26, rotate: -2 },
    shown: { opacity: 1, y: 0, rotate: 0 },
    transition: { duration: 0.75, ease: easeStandard },
  },
  /* Sistema: desliza e trava */
  {
    hidden: { opacity: 0, x: -46 },
    shown: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.85, 0, 0.15, 1] as const },
  },
  /* Código: escrito da esquerda pra direita */
  {
    hidden: { opacity: 1, clipPath: 'inset(0% 100% 0% 0%)' },
    shown: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] as const },
  },
  /* Deploy: expande e passa do ponto */
  {
    hidden: { opacity: 0, scale: 0.94 },
    shown: { opacity: 1, scale: 1 },
    transition: { type: 'spring' as const, stiffness: 150, damping: 14, mass: 0.8 },
  },
];

export default function Metodo({ rotulo, etapas }: { rotulo: string; etapas: Etapa[] }) {
  const lista = useRef<HTMLOListElement>(null);
  const reduzido = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: lista, offset: ['start 80%', 'end 65%'] });
  const preenche = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <>
      <motion.p
        className="label label--dim"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.4 }}
      >
        {rotulo}
      </motion.p>

      <div className="relative mt-[var(--space-5)]">
        {/* a régua que costura as quatro etapas */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 hidden w-px sm:block"
          style={{ height: '100%', background: 'var(--line)' }}
        >
          <motion.span
            className="block h-full w-full origin-top"
            style={{ background: 'var(--accent)', scaleY: reduzido ? 1 : preenche }}
          />
        </span>

        <ol ref={lista} className="flex flex-col sm:pl-[var(--space-6)]">
          {etapas.map((c, i) => {
            const v = VARIANTES[i % VARIANTES.length];
            return (
              <motion.li
                key={c.step}
                className="border-t py-[var(--space-5)]"
                style={{ borderColor: 'var(--line)' }}
                initial={reduzido ? { opacity: 0 } : v.hidden}
                whileInView={reduzido ? { opacity: 1 } : v.shown}
                viewport={{ once: true, amount: 0.5 }}
                transition={reduzido ? { duration: 0.16 } : v.transition}
              >
                <h3 className="display-md">{c.step}</h3>
                <p className="body mt-[var(--space-2)] max-w-[46ch]">{c.note}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
