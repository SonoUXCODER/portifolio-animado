'use client';

import { site } from '@/data/site';
import { projects } from '@/data/projects';
import { stack } from '@/data/stack';
import { experience } from '@/data/experience';
import { Reveal } from './Reveal';

/* -------------------------------------------------------------------------
   RODAPÉ.

   Fecha com a ficha técnica: o que o site tem dentro, contado dos próprios
   arquivos de dados. Nenhum número é digitado à mão — acrescentar um projeto
   atualiza o rodapé sozinho, que é o contrário do que costuma acontecer com
   rodapé de portfólio.

   A assinatura grande no fim existe pra dar um ponto final visual ao scroll:
   depois dela não há mais nada, e o tamanho é o que comunica isso.
   ------------------------------------------------------------------------- */

export default function Footer() {
  const ano = new Date().getFullYear();

  const ficha: Array<[string, string]> = [
    ['Projetos', String(projects.length).padStart(2, '0')],
    ['Ferramentas', String(stack.length).padStart(2, '0')],
    ['Entradas', String(experience.length).padStart(2, '0')],
    ['Edição', String(ano)],
  ];

  return (
    <footer className="shell pb-[var(--space-8)] pt-[var(--space-10)]">
      <div className="border-t pt-[var(--space-7)]" style={{ borderColor: 'var(--border)' }}>
        <div className="grid-12 gap-y-[var(--space-8)]">
          {/* ---- chamada ---- */}
          <div className="col-span-12 lg:col-span-5">
            <p className="display-md max-w-[16ch]">Disponível para projetos.</p>
            <p className="mt-[var(--space-5)]">
              <a href={`mailto:${site.email}`} className="link hit title-sm" data-cursor="abrir">
                {site.email}
              </a>
            </p>
          </div>

          {/* ---- ficha técnica ---- */}
          <dl className="col-span-12 grid grid-cols-2 gap-[var(--space-5)] sm:grid-cols-4 lg:col-span-6 lg:col-start-7">
            {ficha.map(([rotulo, valor]) => (
              <div key={rotulo}>
                <dt className="label">{rotulo}</dt>
                <dd className="figure mt-[var(--space-2)] text-[1.1rem]">{valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---- redes ---- */}
        <nav aria-label="Redes sociais" className="mt-[var(--space-8)]">
          <ul className="flex flex-wrap gap-x-[var(--space-6)] gap-y-[var(--space-3)]">
            {site.social.map((s) => {
              const externo = s.href.startsWith('http');
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={externo ? '_blank' : undefined}
                    rel={externo ? 'noopener noreferrer' : undefined}
                    data-cursor="abrir"
                    className="link hit label"
                  >
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ---- assinatura ----
             Sangra até a borda do contêiner e é cortada em baixo: o corte é
             o ponto final. `aria-hidden` porque o nome já está na navegação
             e no JSON-LD — repetido aqui seria ruído no leitor de tela. */}
        <Reveal direction="none">
          <p
            aria-hidden="true"
            className="mt-[var(--space-9)] select-none leading-[0.78] tracking-[-0.045em]"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 22vw, 20rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            {site.name}
          </p>
        </Reveal>

        <div className="mt-[var(--space-6)] flex flex-wrap items-baseline justify-between gap-[var(--space-4)] border-t pt-[var(--space-4)]" style={{ borderColor: 'var(--border)' }}>
          <p className="label">
            © {ano} {site.handle} — desenhado e codado pela mesma pessoa
          </p>
          <p className="label">{site.colofao}</p>
        </div>
      </div>
    </footer>
  );
}
