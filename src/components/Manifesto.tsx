'use client';

import Image from 'next/image';
import { identity } from '@/content';
import { useConteudo } from './ContentProvider';
import SectionIndex from './SectionIndex';
import TiltCard from './TiltCard';
import Metodo from './Metodo';
import { motion } from 'framer-motion';
import { easeStandard } from '@/lib/motion';
import { Acende, Counter, Lines, Parallax, Reveal, RevealGroup, RevealItem } from './Reveal';

/* -------------------------------------------------------------------------
   MANIFESTO.

   A seção "sobre" de um portfólio quase sempre falha do mesmo jeito: vira
   uma lista de adjetivos sobre a pessoa. Aqui ela é uma afirmação sobre o
   *material* — "code is my material" — e o resto da seção é a prova de que
   a frase tem lastro: o método em quatro tempos, e quatro números que se
   contam sozinhos a partir dos arquivos de dados.

   Nenhum número é digitado à mão. Acrescentar um projeto em data/projects
   muda a estatística aqui, no rodapé e no sitemap, e nada mais precisa ser
   lembrado. É a diferença entre um número que envelhece e um que não.

   A cadeia DESIGN → SYSTEM → BUILD → SHIP fica embaixo do texto e não é
   decoração: é a resposta curta pra única pergunta que um cliente faz antes
   de fechar, que é "como é trabalhar com você".
   ------------------------------------------------------------------------- */

const cadeiaLegado = [
  { step: 'Design', note: 'Research, flows, interface. Decided while it is still cheap to change.' },
  { step: 'System', note: 'Tokens and components, so the second screen costs a fraction of the first.' },
  { step: 'Build', note: 'Written by hand. No builder, no theme, no handoff between two people.' },
  { step: 'Ship', note: 'Domain, metrics, and the first visit from someone who is not me.' },
];

export default function Manifesto() {
  const { t, tools } = useConteudo();
  const cadeia = t.manifesto.chain;
  const anos = new Date().getFullYear() - identity.startYear;

  const estatisticas: Array<{ valor: number; sufixo?: string; rotulo: string }> = [
    { valor: identity.shipped, sufixo: '+', rotulo: t.manifesto.stats.shipped },
    { valor: anos, sufixo: '+', rotulo: t.manifesto.stats.years },
    { valor: tools.length, rotulo: t.manifesto.stats.tools },
    { valor: 3, rotulo: t.manifesto.stats.languages },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <SectionIndex id="about" />

      {/* ================= a afirmação ================= */}
      <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-8)]">
        <div className="col-span-12 lg:col-span-7">
          <Lines lines={t.manifesto.lines} as="h2" className="display-xl" />
          <span id="about-title" className="sr-only">
            {t.sections.about.name}
          </span>
        </div>

        <div className="col-span-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
          <RevealGroup className="flex flex-col gap-[var(--space-4)]" delay={0.1}>
            {t.manifesto.paragraphs.map((p) => (
              <Acende key={p} texto={p} className="body" />
            ))}
          </RevealGroup>
        </div>
      </div>

      {/* ================= retrato + cadeia ================= */}
      <div className="grid-12 mt-[var(--space-10)] gap-y-[var(--space-8)]">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          {/* O retrato é a única peça da página que reage ao cursor como um
              objeto: o mesmo gesto do knifes.me, cartão torto que inclina
              em direção ao ponteiro. Aqui ele ganha função além do charme —
              é o que impede a foto de virar mais um retângulo numa página
              cheia deles. */}
          <Parallax strength={30}>
            {/* centralizada na coluna: com `max-w` sozinho ela encostava na
                margem esquerda e sobrava um vão à direita que não era
                composição, era acidente */}
            <TiltCard className="mx-auto w-full max-w-[420px]">
              {/* A foto não aparece: ela é descoberta.

                  `clip-path` sobe de baixo pra cima revelando a imagem, e ao
                  mesmo tempo ela vem de 1.18 de escala e 12px de desfoque.
                  A combinação é o que dá a sensação de foco sendo achado
                  numa câmera, em vez de um elemento surgindo.

                  Roda uma vez, quando entra na tela. Animar clip-path e
                  blur é caro; caber num elemento só, uma vez, não é. */}
              {/* A REVELAÇÃO FALHA MOSTRANDO, NÃO ESCONDENDO.

                  A versão anterior escondia a foto com `clip-path:
                  inset(100%)` e contava com a animação pra devolvê-la. É o
                  padrão errado, e o custo apareceu no ar: qualquer coisa que
                  impeça o `whileInView` de disparar — e dentro de um
                  contêiner `preserve-3d` com `overflow: hidden` no caminho
                  há mais de uma — deixa a foto invisível pra sempre. Não
                  quebra nada, não aparece no console, e a pessoa só vê um
                  buraco onde deveria estar o retrato.

                  Agora a foto está sempre visível e quem se move é uma
                  cortina por cima, que sobe e sai. Mesmo gesto na tela, e a
                  falha inverteu de lado: se a animação não rodar, a cortina
                  fica no lugar por um instante e some — nunca o contrário.

                  A escala de 1.06 na imagem é o resto do efeito de foco, e é
                  segura pelo mesmo motivo: se travar, o retrato fica 6%
                  maior, e ninguém percebe. */}
              <figure className="media media--dim relative aspect-[4/5] w-full">
                <Image
                  src="/assets/foto-cracha.webp"
                  alt={identity.name}
                  width={620}
                  height={827}
                  sizes="(max-width: 640px) 80vw, 400px"
                  className="h-full w-full"
                />

                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 origin-bottom"
                  style={{ background: 'var(--background)' }}
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, ease: easeStandard }}
                />
              </figure>
            </TiltCard>
          </Parallax>
          <Reveal delay={0.1}>
            <p className="label label--dim mt-[var(--space-4)]">
              {identity.handle} <span className="index-line__sep">/</span> {identity.city},{' '}
              {t.meta.country}
            </p>
          </Reveal>
        </div>

        {/* ---- o método em quatro tempos ----
             Cada etapa é uma linha com filete, não um cartão. Quatro cartões
             lado a lado é a forma que todo template usa pra dizer "processo",
             e ela dá a mesma leitura em qualquer site. A linha empilhada dá
             ritmo de documento. */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <Metodo rotulo={t.manifesto.methodLabel} etapas={cadeia} />

          <Reveal delay={0.1}>
            <p
              className="label mt-[var(--space-6)] flex flex-wrap items-center gap-[var(--space-3)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {cadeia.map((c, i) => (
                <span key={c.step} className="flex items-center gap-[var(--space-3)]">
                  {c.step}
                  {i < cadeia.length - 1 && (
                    <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
                      →
                    </span>
                  )}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </div>

      {/* ================= os números ================= */}
      <RevealGroup
        as="dl"
        className="mt-[var(--space-10)] grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-8)] border-t pt-[var(--space-6)] lg:grid-cols-4"
        style={{ borderColor: 'var(--line)' }}
      >
        {estatisticas.map((e, i) => (
          /* `flex-col-reverse` põe o número em cima sem inverter o HTML: em
             <dl> o <dt> tem de vir antes do <dd>, e um leitor de tela que
             recebesse "05" antes de "products shipped" leria um número solto.

             O atraso crescente faz os quatro baterem um depois do outro em
             vez de juntos. Quatro números aparecendo ao mesmo tempo é um
             evento; quatro em sequência são quatro eventos, e é isso que
             segura a atenção pelo tempo que a seção dura. */
          <RevealItem key={e.rotulo} className="flex flex-col-reverse" style={{ transitionDelay: `${i * 90}ms` }}>
            <dt className="label mt-[var(--space-4)]">{e.rotulo}</dt>
            <dd className="numeral text-[clamp(3.5rem,8vw,7rem)]">
              <Counter to={e.valor} suffix={e.sufixo} pad={2} />
            </dd>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
