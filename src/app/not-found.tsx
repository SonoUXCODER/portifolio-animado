import { langNames, langs } from '@/lib/lang';

/* -------------------------------------------------------------------------
   404.

   Fica fora de [lang] porque é onde o Next quer que ele fique, e porque uma
   URL errada normalmente não tem idioma pra ler. Por isso ele não usa o
   dicionário: mostra a mesma frase nos três, e oferece a volta em cada um.

   Três frases em vez de detectar o idioma no cliente. A detecção adiaria a
   única informação da página — que a rota não existe — pra depois do
   JavaScript, e numa página de erro isso é o oposto do que se quer.
   ------------------------------------------------------------------------- */

export const metadata = { title: 'Not found · SONO' };

const frases: Record<string, { title: string; text: string; cta: string }> = {
  en: {
    title: 'This page does not exist.',
    text: 'Or it did, and it went offline. The way back is the same either way.',
    cta: 'Back to the start',
  },
  pt: {
    title: 'Esta página não existe.',
    text: 'Ou existiu, e saiu do ar. O caminho de volta é o mesmo nos dois casos.',
    cta: 'Voltar ao início',
  },
  de: {
    title: 'Diese Seite gibt es nicht.',
    text: 'Oder es gab sie, und sie ist offline gegangen. Der Weg zurück ist derselbe.',
    cta: 'Zurück zum Anfang',
  },
};

export default function NaoEncontrado() {
  return (
    <section className="shell flex min-h-[100svh] flex-col justify-center py-[var(--space-9)]">
      <p className="index-line">
        <span style={{ color: 'var(--accent)' }}>404</span>
        <span className="index-line__rule" aria-hidden="true" />
      </p>

      <h1 className="display-xl mt-[var(--space-7)] max-w-[14ch]">{frases.en.title}</h1>

      <ul className="mt-[var(--space-8)] flex flex-col">
        {langs.map((l) => (
          <li key={l} className="border-t" style={{ borderColor: 'var(--line)' }}>
            <a
              href={`/${l}`}
              hrefLang={l}
              className="group flex flex-wrap items-baseline justify-between gap-[var(--space-4)] py-[var(--space-5)]"
            >
              <span className="title-sm transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-hover:translate-x-[var(--space-3)]">
                {frases[l].cta}
              </span>
              <span className="label label--dim">{langNames[l]} →</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="body mt-[var(--space-7)] max-w-[46ch]">{frases.en.text}</p>
    </section>
  );
}
