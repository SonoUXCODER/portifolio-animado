'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/data/site';
import Marquee from './Marquee';
import { Asterisco, Doodle, Rabisco, Traquinhos } from './Doodles';

/* -------------------------------------------------------------------------
   Rodapé grande — a última página do zine.
   Nome enorme, os três papéis empilhados, links, e a frase de despedida.
   Os desenhinhos ficam nas beiradas, longe do texto, pra não competir.
   ------------------------------------------------------------------------- */

export default function Footer() {
  const reduzido = useReducedMotion();
  const ano = new Date().getFullYear();

  return (
    <footer className="invertido relative overflow-hidden pt-[clamp(50px,7vw,90px)]">
      <span aria-hidden="true" className="rasgo absolute inset-x-0 top-0 rotate-180" style={{ color: 'var(--bg)' }} />

      <Marquee
        itens={['VAMOS FAZER ALGUMA COISA', 'DISPONÍVEL PRA PROJETO', 'ME MANDA UM E-MAIL']}
        velocidade={26}
        separador="→"
        compacto
        className="mb-[clamp(40px,6vw,80px)]"
      />

      <div className="envelope relative">
        {/* desenhinhos soltos nas beiradas */}
        <Doodle nome="estrela" cor="var(--ice)" tamanho={40} className="flutua absolute right-[6%] top-0 hidden lg:block" />
        <Traquinhos cor="var(--accent)" className="absolute left-[46%] top-[58%] hidden opacity-70 lg:block" />

        <div className="grid grid-cols-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <motion.p
              initial={reduzido ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="zine-titulo"
              style={{ fontSize: 'clamp(4rem,19vw,20rem)' }}
            >
              {site.name}
            </motion.p>
          </div>

          <ul className="col-span-12 flex flex-row flex-wrap gap-x-6 gap-y-1 lg:col-span-4 lg:flex-col lg:items-end lg:pb-6">
            {site.roles.map((r, i) => (
              <li
                key={r}
                className="zine-sub"
                style={{ color: i === 1 ? 'var(--accent)' : i === 2 ? 'var(--ice)' : 'var(--text)' }}
              >
                {r}
              </li>
            ))}
          </ul>
        </div>

        <hr className="linha-fina my-8" />

        <div className="grid grid-cols-12 gap-y-8 pb-10">
          <nav aria-label="Redes sociais" className="col-span-12 md:col-span-7">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    data-cursor="abrir"
                    className="zine-sub inline-block transition-transform duration-200 hover:-translate-y-1 hover:text-[var(--ice)]"
                  >
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mono mt-6 text-[10px] tracking-[0.16em] opacity-45">
              © {ano} {site.handle} · DESENHADO E CODADO POR MIM
            </p>
          </nav>

          <div className="col-span-12 md:col-span-5 md:text-right">
            <p className="hand inline-flex items-center gap-2 text-[clamp(28px,4vw,44px)] leading-none" style={{ color: 'var(--ice)' }}>
              <Asterisco cor="var(--ice)" tamanho={22} />
              {site.frase}
            </p>
            <div className="mt-4 flex md:justify-end">
              <Rabisco cor="var(--accent)" largura={170} className="opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
