"use client";

import { Cascata, ItemCascata, LinhasQueSobem, Surge } from "@/components/animacoes";
import Magnetico from "@/components/magnetico";
import { IndiceDeSecao } from "@/components/pecas";
import { SITE } from "@/content/site";
import type { Dictionary } from "@/content/types";

export default function Contato({
  t,
  nomeSecao,
  country,
}: {
  t: Dictionary["contact"];
  nomeSecao: string;
  country: string;
}) {
  const redes = SITE.social.filter((s) => s.href.startsWith("http"));
  const dados: [string, string][] = [
    [t.basedIn, `${SITE.city}, ${country}`],
    [t.coordinates, SITE.coordinates],
    [t.responseTime, t.responseValue],
    [t.working, t.workingValue],
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="w-full scroll-mt-[var(--header-h)] py-[var(--space-9)]"
      style={{ background: "var(--tom-2)" }}
    >
      <div className="shell flex min-h-[calc(100svh-2*var(--space-9))] flex-col justify-between">
        <IndiceDeSecao id="contact" />

        <div className="py-[var(--space-8)]">
          <LinhasQueSobem lines={t.lines} as="h2" className="display-hero" />
          <span id="contact-title" className="sr-only">
            {nomeSecao}
          </span>

          <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-7)]">
            <div className="col-span-12 lg:col-span-5">
              <Surge delay={0.1}>
                <p className="lead">{t.lead}</p>
                <p className="body mt-[var(--space-5)]">{t.howItWorks}</p>
                <p className="mt-[var(--space-7)]">
                  <Magnetico strength={12}>
                    <a
                      href={`mailto:${SITE.email}?subject=${encodeURIComponent(t.emailSubject)}`}
                      className="btn"
                      data-cursor="open"
                    >
                      {t.cta} <span aria-hidden>↗</span>
                    </a>
                  </Magnetico>
                </p>
                <p className="mt-[var(--space-5)]">
                  <a href={`mailto:${SITE.email}`} className="link hit title-sm" data-cursor="open">
                    {SITE.email}
                  </a>
                </p>
              </Surge>
            </div>

            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <Cascata as="ul" className="flex flex-col" delay={0.12}>
                {redes.map((rede) => (
                  <ItemCascata key={rede.label} as="li" className="linha-hover">
                    <a
                      href={rede.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="group flex items-center justify-between gap-[var(--space-4)] py-[var(--space-5)]"
                    >
                      <span className="display-md transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-hover:translate-x-[var(--space-3)]">
                        {rede.label}
                      </span>
                      <span
                        aria-hidden
                        className="label transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-hover:-translate-y-[3px] group-hover:translate-x-[3px]"
                      >
                        ↗
                      </span>
                    </a>
                  </ItemCascata>
                ))}
              </Cascata>
            </div>
          </div>
        </div>

        <Surge direction="none">
          <dl className="faixa-dados grid grid-cols-2 gap-x-[var(--space-5)] gap-y-[var(--space-5)] sm:grid-cols-4">
            {dados.map(([rotulo, valor]) => (
              <div key={rotulo}>
                <dt className="label label--dim">{rotulo}</dt>
                <dd className="mt-[var(--space-2)] text-[clamp(0.85rem,1vw,1rem)]">{valor}</dd>
              </div>
            ))}
          </dl>
        </Surge>
      </div>
    </section>
  );
}
