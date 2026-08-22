'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/data/site';
import Pagina from './Pagina';
import { ScrollReveal, TextReveal } from './ScrollReveal';
import { Asterisco, Seta } from './Doodles';

/* -------------------------------------------------------------------------
   CADERNO 06 — FALA COMIGO. A última página antes do colofão.

   O formulário não tem servidor de propósito: ele monta um e-mail e entrega
   pro programa de e-mail da pessoa. Sem backend, sem banco, sem chave de API
   pra vazar — e continua funcionando em qualquer hospedagem estática.
   ------------------------------------------------------------------------- */

export default function ContactSection() {
  const [enviado, setEnviado] = useState(false);

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dados = new FormData(e.currentTarget);
    const nome = String(dados.get('nome') ?? '').trim();
    const email = String(dados.get('email') ?? '').trim();
    const mensagem = String(dados.get('mensagem') ?? '').trim();

    const assunto = `oi, aqui é ${nome || 'alguém'}`;
    const corpo = `${mensagem}\n\n—\n${nome}\n${email}`;

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    setEnviado(true);
  }

  return (
    <Pagina id="contato" className="overflow-hidden py-[clamp(44px,7vw,96px)]">
      <TextReveal as="h2" texto="VAMOS FAZER ALGUMA COISA?" className="zine-titulo max-w-[16ch]" />
      <p id="contato-titulo" className="sr-only">
        Fala comigo
      </p>

      <div className="mt-[clamp(32px,5vw,68px)] grid grid-cols-12 gap-x-8 gap-y-12">
        {/* ---------- coluna dos links ---------- */}
        <div className="col-span-12 lg:col-span-5">
          <p className="olho mb-7 max-w-[30ch] text-[clamp(1rem,1.5vw,1.25rem)]">
            Projeto novo, freela, ou só uma ideia solta. Respondo tudo — inclusive o &ldquo;será que dá
            pra fazer?&rdquo;.
          </p>

          <ul className="flex flex-col">
            {site.social.map((s) => (
              <li key={s.label} className="border-t border-[var(--linha)] last:border-b">
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  data-cursor="abrir"
                  className="group flex items-center justify-between gap-4 py-3.5"
                >
                  <span className="zine-titulo--medio text-[clamp(1.3rem,3vw,2.3rem)] transition-transform duration-300 group-hover:translate-x-3">
                    {s.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-lg transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a href={`mailto:${site.email}`} className="botao mt-7" data-cursor="abrir">
            ENTRAR EM CONTATO <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* ---------- coluna do formulário ---------- */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <ScrollReveal direcao="direita" className="relative">
            <Seta className="absolute -left-24 -top-6 hidden rotate-[14deg] opacity-40 xl:block" cor="var(--tinta)" largura={110} />

            <form
              onSubmit={enviar}
              className="relative border border-[var(--linha-forte)] bg-[var(--papel-2)] p-[clamp(20px,3vw,36px)]"
            >
              <span className="fita -right-5 -top-3 rotate-[7deg]" />

              <p className="mono mb-6 text-[10px] tracking-[0.2em]" style={{ color: 'var(--tinta-3)' }}>
                PREENCHA E DESTAQUE ↓
              </p>

              <div className="flex flex-col gap-6">
                <div>
                  <label htmlFor="nome" className="rotulo">
                    seu nome
                  </label>
                  <input id="nome" name="nome" type="text" required autoComplete="name" className="campo" placeholder="como te chamo?" />
                </div>

                <div>
                  <label htmlFor="email" className="rotulo">
                    seu e-mail
                  </label>
                  <input id="email" name="email" type="email" required autoComplete="email" className="campo" placeholder="pra onde eu respondo?" />
                </div>

                <div>
                  <label htmlFor="mensagem" className="rotulo">
                    mensagem
                  </label>
                  <textarea id="mensagem" name="mensagem" required rows={4} className="campo resize-y" placeholder="me conta a ideia em duas linhas" />
                </div>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button type="submit" className="botao">
                  ENVIAR <span aria-hidden="true">→</span>
                </button>
                <p className="mono max-w-[26ch] text-[10px] leading-relaxed tracking-[0.12em]" style={{ color: 'var(--tinta-3)' }}>
                  ABRE NO SEU PROGRAMA DE E-MAIL. NADA FICA GUARDADO AQUI.
                </p>
              </div>

              {/* aria-live: quem usa leitor de tela precisa saber que algo aconteceu */}
              <p role="status" aria-live="polite" className="hand mt-4 text-[22px]" style={{ color: 'var(--tinta-2)' }}>
                {enviado ? (
                  <span className="inline-flex items-center gap-2">
                    <Asterisco cor="var(--tinta-2)" tamanho={15} /> abri o e-mail pra você — é só mandar!
                  </span>
                ) : (
                  ''
                )}
              </p>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </Pagina>
  );
}
