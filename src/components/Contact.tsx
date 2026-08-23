'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/data/site';
import Kicker from './Kicker';
import { Reveal, WordsUp } from './Reveal';

/* -------------------------------------------------------------------------
   CONTATO.

   O formulário não tem servidor de propósito: monta um `mailto:` e entrega
   pro programa de e-mail de quem escreveu. Sem backend, sem banco e sem
   chave de API pra vazar — e continua funcionando numa hospedagem que só
   serve arquivo estático, que é o caso aqui.

   O aviso disso fica escrito ao lado do botão. Alguém que espera um envio
   com servidor precisa saber antes de clicar, não depois de o cliente de
   e-mail abrir do nada.
   ------------------------------------------------------------------------- */

export default function Contact() {
  const [enviado, setEnviado] = useState(false);

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    const nome = String(dados.get('nome') ?? '').trim();
    const email = String(dados.get('email') ?? '').trim();
    const mensagem = String(dados.get('mensagem') ?? '').trim();

    const assunto = `Contato do portfólio — ${nome || 'sem nome'}`;
    const corpo = `${mensagem}\n\n—\n${nome}\n${email}`;

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      assunto,
    )}&body=${encodeURIComponent(corpo)}`;
    setEnviado(true);
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="shell scroll-mt-[var(--header-h)] py-[var(--space-10)]"
    >
      <Kicker id="contato" />

      <div className="mt-[var(--space-8)] max-w-[18ch]">
        <WordsUp as="h2" text="Me conta o que você precisa." className="display-lg" />
        <span id="contato-titulo" className="sr-only">
          Contato
        </span>
      </div>

      <div className="grid-12 mt-[var(--space-9)] gap-y-[var(--space-8)]">
        {/* ---- canais ---- */}
        <div className="col-span-12 lg:col-span-5">
          <Reveal>
            <p className="lead max-w-[34ch]">
              Projeto novo, freela, ou uma ideia que ainda não tem forma. Respondo todas — inclusive
              a que começa com &ldquo;será que dá pra fazer?&rdquo;.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-[var(--space-7)] flex flex-col">
              {site.social.map((s) => {
                const externo = s.href.startsWith('http');
                return (
                  <li key={s.label} className="border-t last:border-b" style={{ borderColor: 'var(--border)' }}>
                    <a
                      href={s.href}
                      target={externo ? '_blank' : undefined}
                      rel={externo ? 'noopener noreferrer' : undefined}
                      data-cursor="abrir"
                      className="group flex items-center justify-between gap-[var(--space-4)] py-[var(--space-4)]"
                    >
                      <span className="title-sm transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-hover:translate-x-[var(--space-2)]">
                        {s.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="label transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* ---- formulário ---- */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <Reveal direction="left">
            <form onSubmit={enviar} className="panel p-[var(--space-6)]">
              <div className="flex flex-col gap-[var(--space-5)]">
                <div>
                  <label htmlFor="nome" className="label">
                    Seu nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    autoComplete="name"
                    className="field mt-[var(--space-2)]"
                    placeholder="Como te chamo?"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="label">
                    Seu e-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="field mt-[var(--space-2)]"
                    placeholder="Para onde eu respondo?"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="label">
                    Mensagem
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    required
                    rows={5}
                    className="field mt-[var(--space-2)] resize-y"
                    placeholder="A ideia em duas linhas já basta."
                  />
                </div>
              </div>

              <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-[var(--space-4)]">
                <button type="submit" className="btn">
                  Enviar
                </button>
                <p className="body-sm max-w-[28ch]">
                  Abre no seu programa de e-mail. Nada fica guardado aqui.
                </p>
              </div>

              {/* aria-live: quem usa leitor de tela precisa saber que algo
                  aconteceu — a janela do e-mail abre fora da página */}
              <p role="status" aria-live="polite" className="body-sm mt-[var(--space-4)]">
                {enviado ? 'Abri o e-mail já preenchido — é só mandar.' : ''}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
