'use client';

import { site } from '@/data/site';
import { projects } from '@/data/projects';
import { stack } from '@/data/stack';
import { experience } from '@/data/experience';
import { processo } from '@/data/process';
import { Reveal } from './Reveal';

/* -------------------------------------------------------------------------
   O FIM DO ARQUIVO.

   Rodapé é onde quase todo portfólio desiste e cola quatro links. Aqui ele é
   a última cena: fecha a leitura em vez de só terminá-la.

   A ficha técnica é contada dos próprios arquivos de dados — nenhum número
   é digitado à mão, então acrescentar um projeto atualiza o rodapé sozinho.
   É o contrário do que costuma acontecer com rodapé, que envelhece no dia
   seguinte ao lançamento.

   A assinatura gigante no fim existe pra dar ponto final visual: depois dela
   não há mais nada, e é o tamanho que comunica isso.
   ------------------------------------------------------------------------- */

export default function Footer() {
  const ano = new Date().getFullYear();

  const ficha: Array<[string, string]> = [
    ['Entradas', String(projects.length).padStart(2, '0')],
    ['Ferramentas', String(stack.length).padStart(2, '0')],
    ['Etapas', String(processo.length).padStart(2, '0')],
    ['Anos no trajeto', String(new Set(experience.map((e) => e.year)).size).padStart(2, '0')],
  ];

  return (
    <footer className="shell pb-[var(--space-8)] pt-[var(--space-10)]">
      <div className="border-t pt-[var(--space-8)]" style={{ borderColor: 'var(--border)' }}>
        {/* ---- o encerramento ---- */}
        <Reveal>
          <p className="kicker">
            <span className="kicker__n">Fim</span>
            <span>Você chegou ao fundo do arquivo</span>
          </p>

          <p className="display-lg mt-[var(--space-6)] max-w-[15ch]">Ou o começo do próximo.</p>

          <p className="nota mt-[var(--space-5)] flex max-w-[42ch] gap-[var(--space-3)]">
            <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
              ↳
            </span>
            este site também é um dos projetos. o código está aberto, se você
            quiser ver como ele foi feito.
          </p>
        </Reveal>

        <div className="grid-12 mt-[var(--space-8)] gap-y-[var(--space-8)]">
          {/* ---- contato ---- */}
          <div className="col-span-12 lg:col-span-5">
            <p className="label">Escreva direto</p>
            <p className="mt-[var(--space-3)]">
              <a href={`mailto:${site.email}`} className="link hit title-sm" data-cursor="abrir">
                {site.email}
              </a>
            </p>

            <nav aria-label="Redes sociais" className="mt-[var(--space-6)]">
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
          </div>

          {/* ---- ficha do arquivo ---- */}
          <dl className="col-span-12 grid grid-cols-2 gap-[var(--space-5)] sm:grid-cols-4 lg:col-span-6 lg:col-start-7">
            {ficha.map(([rotulo, valor]) => (
              <div key={rotulo}>
                <dt className="label">{rotulo}</dt>
                <dd className="figure mt-[var(--space-2)] text-[1.15rem]">{valor}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---- assinatura ----
             `aria-hidden` porque o nome já está na navegação e no JSON-LD —
             repetido aqui seria só ruído no leitor de tela. */}
        <Reveal direction="none">
          <p
            aria-hidden="true"
            className="numeral mt-[var(--space-9)] select-none"
            style={{ fontSize: 'clamp(4rem, 23vw, 21rem)', color: 'var(--text-primary)' }}
          >
            {site.name}
          </p>
        </Reveal>

        <div
          className="mt-[var(--space-6)] flex flex-wrap items-baseline justify-between gap-[var(--space-4)] border-t pt-[var(--space-4)]"
          style={{ borderColor: 'var(--border)' }}
        >
          <p className="label">
            © {ano} {site.handle} — desenhado e codado pela mesma pessoa
          </p>
          <p className="label">{site.colofao}</p>
        </div>
      </div>
    </footer>
  );
}
