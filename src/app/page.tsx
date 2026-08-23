import RootRedirect from '@/components/RootRedirect';
import { langNames, langs } from '@/lib/lang';

/* -------------------------------------------------------------------------
   A RAIZ.

   Não existe página em `/`: existem /en, /pt e /de. Esta rota só decide pra
   qual delas mandar.

   >>> POR QUE NO CLIENTE <<<
   A escolha depende do que o navegador da pessoa pede
   (`navigator.languages`), e o site é export estático servido pelo GitHub
   Pages: não há servidor pra ler o cabeçalho `Accept-Language` nem pra
   responder um 302. Então o HTML sai igual pra todo mundo e o redirecionamento
   acontece na primeira execução de script.

   >>> O QUE FICA VISÍVEL <<<
   Os três links abaixo não são fallback decorativo. Eles são a página
   inteira pra três casos reais: quem tem JavaScript desligado, quem chega
   por um rastreador que não executa script, e o meio segundo antes de o
   redirecionamento acontecer. Por isso são links de verdade, com `hrefLang`,
   e não um "carregando…".
   ------------------------------------------------------------------------- */

export const metadata = {
  title: 'SONO',
  /* a raiz nunca deve competir com /en no índice do buscador: ela é uma
     porta, não uma página */
  robots: { index: false, follow: true },
};

export default function Raiz() {
  return (
    <>
      <RootRedirect />

      <section className="shell flex min-h-[100svh] flex-col justify-center py-[var(--space-9)]">
        <p className="label label--dim">SONO</p>

        <h1 className="display-lg mt-[var(--space-6)] max-w-[16ch]">
          Full-Stack Developer &amp; UX·UI Designer
        </h1>

        <p className="body mt-[var(--space-5)]">Choose a language · Escolha um idioma · Sprache wählen</p>

        <ul className="mt-[var(--space-7)] flex flex-col">
          {langs.map((l) => (
            <li key={l} className="border-t" style={{ borderColor: 'var(--line)' }}>
              <a
                href={`/${l}`}
                hrefLang={l}
                className="group flex items-center justify-between gap-[var(--space-4)] py-[var(--space-5)]"
              >
                <span className="display-md transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-hover:translate-x-[var(--space-3)]">
                  {langNames[l]}
                </span>
                <span aria-hidden="true" className="label">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
