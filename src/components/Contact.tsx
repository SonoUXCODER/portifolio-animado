'use client';

import { site } from '@/data/site';
import SectionIndex from './SectionIndex';
import Magnetic from './Magnetic';
import { Lines, Reveal, RevealGroup, RevealItem } from './Reveal';

/* -------------------------------------------------------------------------
   CONTATO — a última tela.

   Ocupa a altura inteira e não tem formulário. Foi uma escolha, não um
   esquecimento: um formulário aqui pediria três campos e um clique antes de
   qualquer coisa acontecer, e a essa altura da página quem chegou já
   decidiu. Um endereço de e-mail escrito grande é mais rápido, funciona no
   celular, e não depende de JavaScript nenhum.

   Os canais são uma lista de linhas com filete, não ícones. Ícone de rede
   social num site preto é o detalhe que empurra a página inteira de volta
   pro genérico — e o nome escrito diz a mesma coisa em menos pixels.
   ------------------------------------------------------------------------- */

export default function Contact() {
  const canais = site.social.filter((s) => s.href.startsWith('http'));

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="shell flex min-h-[100svh] scroll-mt-[var(--header-h)] flex-col justify-between py-[var(--space-9)]"
    >
      <SectionIndex id="contact" />

      {/* ================= a chamada ================= */}
      <div className="py-[var(--space-8)]">
        <Lines
          lines={['Let’s build', 'something', 'that matters.']}
          as="h2"
          className="display-hero"
        />
        <span id="contact-title" className="sr-only">
          Contact
        </span>

        <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-7)]">
          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="lead">
                Available for freelance, product collaborations and creative digital projects.
              </p>

              <p className="mt-[var(--space-7)]">
                <Magnetic strength={12}>
                  <a
                    href={`mailto:${site.email}?subject=${encodeURIComponent('Project enquiry')}`}
                    className="btn"
                    data-cursor="open"
                  >
                    Start a conversation <span aria-hidden="true">↗</span>
                  </a>
                </Magnetic>
              </p>

              <p className="mt-[var(--space-5)]">
                <a href={`mailto:${site.email}`} className="link hit title-sm" data-cursor="open">
                  {site.email}
                </a>
              </p>
            </Reveal>
          </div>

          {/* ---- canais ---- */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <RevealGroup as="ul" className="flex flex-col" delay={0.12}>
              {canais.map((s) => (
                <RevealItem as="li" key={s.label} className="border-t" style={{ borderColor: 'var(--line)' }}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="open"
                    className="group flex items-center justify-between gap-[var(--space-4)] py-[var(--space-5)]"
                  >
                    <span className="display-md transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-hover:translate-x-[var(--space-3)]">
                      {s.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="label transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-hover:-translate-y-[3px] group-hover:translate-x-[3px]"
                    >
                      ↗
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>

      {/* ================= a régua final ================= */}
      <Reveal direction="none">
        <dl
          className="grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-5)] border-t pt-[var(--space-4)] sm:grid-cols-4"
          style={{ borderColor: 'var(--line)' }}
        >
          {[
            ['Based in', `${site.city}, ${site.country}`],
            ['Coordinates', site.coordinates],
            ['Response time', 'Within two days'],
            ['Working', 'Remote or on site'],
          ].map(([rotulo, valor]) => (
            <div key={rotulo}>
              <dt className="label label--dim">{rotulo}</dt>
              <dd className="mt-[var(--space-2)] text-[clamp(0.85rem,1vw,1rem)]">{valor}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
