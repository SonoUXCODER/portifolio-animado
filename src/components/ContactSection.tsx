'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/data/site';
import { ScrollReveal, TextReveal } from './ScrollReveal';
import { Asterisco, Seta } from './Doodles';

/* -------------------------------------------------------------------------
   "VAMOS FAZER ALGUMA COISA?"

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
    <section id="contato" className="relative overflow-hidden py-[clamp(70px,11vw,150px)]">
      <div className="envelope">
        <ScrollReveal direcao="esquerda" className="mb-4 flex items-center gap-4">
          <span className="zine-sub">05 — FALA COMIGO</span>
          <span className="h-[2px] flex-1" style={{ background: 'var(--border)' }} />
        </ScrollReveal>

        <TextReveal
          as="h2"
          texto="VAMOS FAZER ALGUMA COISA?"
          className="zine-titulo max-w-[16ch]"
        />

        <div className="mt-[clamp(40px,6vw,80px)] grid grid-cols-12 gap-y-14">
          {/* ---------- coluna dos links ---------- */}
          <div className="col-span-12 lg:col-span-5">
            <p className="corpo mb-8 text-[clamp(1rem,1.4vw,1.15rem)]">
              Projeto novo, freela, ou só uma ideia solta — pode chamar.
            </p>

            <ul className="flex flex-col">
              {site.social.map((s) => (
                <li key={s.label} className="border-t-2 border-[var(--border)] last:border-b-2">
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    data-cursor="abrir"
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-[var(--accent)]"
                  >
                    <span className="zine-titulo--medio text-[clamp(1.5rem,3.4vw,2.6rem)] transition-transform duration-300 group-hover:translate-x-3">
                      {s.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <a href={`mailto:${site.email}`} className="botao mt-8" data-cursor="abrir">
              ENTRAR EM CONTATO <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* ---------- coluna do formulário ---------- */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="relative">
              <Seta className="absolute -left-24 -top-6 hidden rotate-[14deg] opacity-55 xl:block" cor="var(--accent-2)" largura={120} />

              <form onSubmit={enviar} className="relative border-[1.5px] border-[var(--border-forte)] bg-[var(--surface)] p-[clamp(20px,3vw,38px)] shadow-[10px_10px_0_var(--surface-2)]">
                <span className="fita -right-5 -top-3 rotate-[7deg]" />

                <p className="mono mb-6 text-[11px] tracking-[0.2em]" style={{ color: 'var(--text-2)' }}>
                  ESCREVE AQUI ↓
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

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button type="submit" className="botao">
                    ENVIAR <span aria-hidden="true">→</span>
                  </button>
                  <p className="mono max-w-[26ch] text-[10px] leading-relaxed tracking-[0.12em]" style={{ color: 'var(--text-2)' }}>
                    ABRE NO SEU PROGRAMA DE E-MAIL. NADA FICA GUARDADO AQUI.
                  </p>
                </div>

                {/* aria-live: quem usa leitor de tela precisa saber que algo aconteceu */}
                <p role="status" aria-live="polite" className="hand mt-4 text-[24px]" style={{ color: 'var(--accent)' }}>
                  {enviado ? (
                    <span className="inline-flex items-center gap-2">
                      <Asterisco cor="var(--accent)" tamanho={16} /> abri o e-mail pra você — é só mandar!
                    </span>
                  ) : (
                    ''
                  )}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
