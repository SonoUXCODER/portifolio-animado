'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { site } from '@/data/site';
import { cadernos } from '@/data/arquivo';
import { estampas } from '@/data/estampas';
import { projects } from '@/data/projects';
import Marquee from './Marquee';
import { Asterisco, Doodle, Rabisco } from './Doodles';

/* -------------------------------------------------------------------------
   O COLOFÃO — a última página do impresso.

   Num livro é onde ficam as informações de produção: em que tipo foi
   composto, como foi impresso, quantos exemplares, quando. Aqui é a mesma
   coisa, só que a gráfica é um export estático.

   Impresso em tinta cheia pra fechar o objeto com uma virada de página.
   ------------------------------------------------------------------------- */

export default function Colofao() {
  const reduzido = useReducedMotion();
  const ano = new Date().getFullYear();

  return (
    <footer className="invertido relative overflow-hidden pt-[clamp(44px,6vw,80px)]">
      <span aria-hidden="true" className="rasgo absolute inset-x-0 top-0 rotate-180" style={{ color: 'var(--papel-base)' }} />

      <Marquee
        itens={['FIM DO ARQUIVO', 'VAMOS FAZER ALGUMA COISA', 'DISPONÍVEL PRA PROJETO']}
        velocidade={28}
        separador="·"
        compacto
        className="mb-[clamp(36px,5vw,72px)]"
      />

      <div className="envelope relative">
        <div className="cabeco">
          <span>COLOFÃO</span>
          <span className="hidden sm:inline">FIM · EDIÇÃO 01</span>
        </div>

        <Doodle nome="estrela" cor="var(--tinta)" tamanho={34} className="flutua absolute right-[5%] top-14 hidden opacity-70 lg:block" />

        <div className="grid grid-cols-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <motion.p
              initial={reduzido ? { opacity: 0 } : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="zine-titulo"
              style={{ fontSize: 'clamp(3.4rem,17vw,17rem)' }}
            >
              {site.name}
            </motion.p>
          </div>

          <ul className="col-span-12 flex flex-row flex-wrap gap-x-6 gap-y-1 lg:col-span-4 lg:flex-col lg:items-end lg:pb-5">
            {site.roles.map((r) => (
              <li key={r} className="zine-sub">
                {r}
              </li>
            ))}
          </ul>
        </div>

        <hr className="linha-fina my-7" />

        {/* ---------- ficha técnica da edição ---------- */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {[
            ['CADERNOS', String(cadernos.length).padStart(2, '0')],
            ['ESTAMPAS', String(estampas.length).padStart(2, '0')],
            ['TRABALHOS', String(projects.length).padStart(2, '0')],
            ['EDIÇÃO', `01 · ${ano}`],
          ].map(([rotulo, valor]) => (
            <div key={rotulo}>
              <dt className="rotulo mb-1">{rotulo}</dt>
              <dd className="mono text-[13px]">{valor}</dd>
            </div>
          ))}
        </dl>

        <p className="corpo mt-7 max-w-[52ch] text-[0.86rem]">{site.colofao}</p>

        <hr className="linha-fina my-7" />

        <div className="grid grid-cols-12 gap-y-8 pb-9">
          <nav aria-label="Redes sociais" className="col-span-12 md:col-span-7">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    data-cursor="abrir"
                    className="zine-sub inline-block transition-transform duration-200 hover:-translate-y-1"
                  >
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mono mt-6 text-[10px] tracking-[0.16em]" style={{ color: 'var(--tinta-3)' }}>
              © {ano} {site.handle} · DESENHADO E CODADO POR MIM
            </p>
          </nav>

          <div className="col-span-12 md:col-span-5 md:text-right">
            <p className="hand inline-flex items-center gap-2 text-[clamp(24px,3.6vw,40px)] leading-none">
              <Asterisco cor="var(--tinta)" tamanho={20} />
              {site.frase}
            </p>
            <div className="mt-4 flex md:justify-end">
              <Rabisco cor="var(--tinta)" largura={160} className="opacity-60" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
