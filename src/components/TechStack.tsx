'use client';

import { useConteudo } from './ContentProvider';
import { motion, useReducedMotion } from 'framer-motion';
import { easeStandard } from '@/lib/motion';
import { Acende, Lines, Reveal } from './Reveal';

/* -------------------------------------------------------------------------
   TECHNOLOGY STACK.

   Um blueprint, não uma nuvem de logotipos. Cinco colunas com filete,
   cada ferramenta numa linha, e o ano em que ela entrou pra valer alinhado
   à direita em tabular.

   Duas decisões que sustentam a seção:

   1. Nada de porcentagem. "JavaScript 95%" não é informação, é chute com
      aparência de dado — e todo mundo que lê um portfólio sabe disso. O que
      diz alguma coisa é `note`: o que a ferramenta faz no meu trabalho.
   2. `since` é verificável e envelhece sozinho. Um número de proficiência
      precisa ser reescrito; um ano, não.

   A nota só aparece no hover, e é essa a microanimação da seção: a linha
   inteira se abre
   pra baixo revelando o texto, sem empurrar nada — o espaço já está
   reservado. Empurrar layout no hover é a diferença entre uma tabela viva
   e uma tabela que pula.

   >>> AS TRINTA NÃO ENTRAM IGUAIS <<<
   Trinta itens com a mesma animação é a definição de fadiga: o olho aprende
   o padrão no terceiro e desliga. Aqui cada camada tem a própria assinatura
   de entrada, alternando eixo e velocidade — as ímpares vêm da esquerda e
   mais devagar, as pares de baixo e mais rápido, e o passo entre itens muda
   de camada pra camada. O conjunto continua sendo um sistema porque a curva
   é a mesma; o que varia é a direção e o ritmo.

   >>> O TÍTULO DA CAMADA GRUDA <<<
   Abaixo de xl a grade de cinco colunas vira uma ou duas, e a seção fica
   longa o bastante pra a pessoa perder de vista em qual camada está. Ali o
   nome da camada gruda no topo enquanto as ferramentas passam. No xl as
   cinco estão lado a lado e não há o que grudar, então a regra some.

   Esta seção não tem abertura própria: ela é a segunda metade de
   CAPABILITIES, e separar "o que eu faço" de "com o que eu faço" em dois
   capítulos daria dois títulos para um assunto só.
   ------------------------------------------------------------------------- */

export default function TechStack() {
  const { t, layers, tools } = useConteudo();
  const reduzido = useReducedMotion();

  return (
    <section aria-labelledby="stack-title" className="shell py-[var(--space-10)]">
      <div className="grid-12 gap-y-[var(--space-6)]">
        <div className="col-span-12 lg:col-span-7">
          <Lines lines={t.stack.lines} as="h2" className="display-lg" />
          <span id="stack-title" className="sr-only">
            {t.sections.capabilities.name}
          </span>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <Reveal delay={0.1}>
            <Acende texto={t.stack.intro} className="body" />
            <p className="label label--dim mt-[var(--space-5)]">
              {tools.length} {t.stack.toolsWord}
              <span className="index-line__sep"> / </span>
              {layers.length} {t.stack.layersWord}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ================= o blueprint ================= */}
      {/* cinco colunas no desktop largo: com cinco camadas, quatro colunas
          deixariam uma sozinha na segunda linha, e é justamente o tipo de
          sobra que faz uma grade parecer acidente */}
      <div className="mt-[var(--space-9)] grid grid-cols-1 gap-x-[var(--space-6)] gap-y-[var(--space-8)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {layers.map((layer, camada) => {
          /* ímpar entra da esquerda e devagar, par entra de baixo e rápido */
          const daEsquerda = camada % 2 === 0;
          const passo = daEsquerda ? 0.07 : 0.045;

          return (
          <div key={layer.id} className="border-t pt-[var(--space-5)]" style={{ borderColor: 'var(--line-strong)' }}>
            {/* o nome da camada gruda enquanto as ferramentas passam, e só
                onde a coluna é alta o bastante pra isso significar algo */}
            <div className="top-[calc(var(--header-h)+var(--space-4))] z-[2] bg-[var(--background)] pb-[var(--space-3)] max-xl:sticky">
              <Reveal>
                <h3 className="display-md">{layer.title}</h3>
                <p className="body-sm mt-[var(--space-3)] max-w-[34ch]">{layer.summary}</p>
              </Reveal>
            </div>

            <motion.ul
              className="mt-[var(--space-5)] flex flex-col"
              initial="hidden"
              whileInView="shown"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ staggerChildren: passo, delayChildren: 0.05 }}
            >
              {layer.tools.map((tool) => (
                <motion.li
                  key={tool.label}
                  className="group border-t py-[var(--space-3)]"
                  style={{ borderColor: 'var(--line)' }}
                  variants={
                    reduzido
                      ? { hidden: { opacity: 0 }, shown: { opacity: 1 } }
                      : daEsquerda
                        ? { hidden: { opacity: 0, x: -22 }, shown: { opacity: 1, x: 0 } }
                        : { hidden: { opacity: 0, y: 20 }, shown: { opacity: 1, y: 0 } }
                  }
                  transition={{ duration: daEsquerda ? 0.62 : 0.42, ease: easeStandard }}
                >
                  <div className="flex items-baseline justify-between gap-[var(--space-3)]">
                    <span className="flex items-baseline gap-[var(--space-3)]">
                      <span
                        className="title-sm transition-colors duration-[var(--duration-fast)] group-hover:text-[var(--accent)]"
                        style={{ fontSize: '1rem' }}
                      >
                        {tool.label}
                      </span>
                      {tool.primary && (
                        /* o ponto diz "esta é a principal da camada". o title
                           existe porque cor sozinha não é informação. */
                        <span
                          title={t.stack.primaryTool}
                          aria-label={t.stack.primaryTool}
                          className="inline-block h-[5px] w-[5px] shrink-0 translate-y-[-3px] rounded-full"
                          style={{ background: 'var(--accent)' }}
                        />
                      )}
                    </span>
                    <span className="label label--dim shrink-0">{tool.since}</span>
                  </div>

                  {/* a nota abre no hover e no foco. `grid-template-rows` de
                      0fr pra 1fr é o único jeito de animar altura automática
                      sem medir nada em JS. */}
                  <div
                    className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]"
                  >
                    <p className="body-sm overflow-hidden opacity-0 transition-opacity duration-[var(--duration-normal)] group-hover:opacity-100 group-focus-within:opacity-100">
                      <span className="block pt-[var(--space-2)]">{tool.note}</span>
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
          );
        })}
      </div>
    </section>
  );
}
