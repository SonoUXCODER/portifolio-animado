import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, LANGS, SITE } from "@/content";

const NOMES: Record<(typeof LANGS)[number], string> = {
  en: "English",
  pt: "Português",
  de: "Deutsch",
};

export const metadata: Metadata = {
  title: `${SITE.name} · ${getDictionary("en").meta.role}`,
  description: getDictionary("en").meta.description,
  robots: { index: false, follow: true },
};

/** Porta de entrada: escolha de idioma. */
export default function EscolhaDeIdioma() {
  return (
    <section className="shell flex min-h-[100svh] flex-col justify-center py-[var(--space-9)]">
      <p className="label label--dim">{SITE.name}</p>
      <h1 className="display-lg mt-[var(--space-6)] max-w-[16ch]">{getDictionary("en").meta.role}</h1>
      <p className="body mt-[var(--space-5)]">
        Choose a language · Escolha um idioma · Sprache wählen
      </p>

      <ul className="mt-[var(--space-7)] flex flex-col">
        {LANGS.map((lang) => (
          <li key={lang} className="border-t" style={{ borderColor: "var(--line)" }}>
            {/* <Link> para o basePath do GitHub Pages entrar sozinho — os links
                soltos da versão anterior caíam fora do subcaminho e davam 404 */}
            <Link
              href={`/${lang}`}
              hrefLang={lang}
              className="group flex items-center justify-between gap-[var(--space-4)] py-[var(--space-5)]"
            >
              <span className="display-md transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] group-hover:translate-x-[var(--space-3)]">
                {NOMES[lang]}
              </span>
              <span aria-hidden className="label">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
