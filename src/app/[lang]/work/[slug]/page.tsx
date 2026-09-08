import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EstudoDeCaso from "@/components/estudo-de-caso";
import { comoLang, getDictionary, getProject, LANG_LOCALE, LANGS, SITE } from "@/content";
import { PROJECTS } from "@/content/projects";

type Params = Promise<{ lang: string; slug: string }>;

export const generateStaticParams = () =>
  LANGS.flatMap((lang) => PROJECTS.map((p) => ({ lang, slug: p.slug })));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang: bruto, slug } = await params;
  const lang = comoLang(bruto);
  const projeto = getProject(lang, slug);
  if (!projeto) return {};
  const titulo = `${projeto.title} · ${SITE.name}`;

  return {
    title: titulo,
    description: projeto.summary,
    alternates: {
      canonical: `/${lang}/work/${slug}/`,
      languages: {
        en: `/en/work/${slug}/`,
        "pt-BR": `/pt/work/${slug}/`,
        "de-CH": `/de/work/${slug}/`,
        "x-default": `/en/work/${slug}/`,
      },
    },
    openGraph: {
      type: "article",
      locale: LANG_LOCALE[lang],
      siteName: SITE.name,
      title: titulo,
      description: projeto.summary,
      url: `/${lang}/work/${slug}/`,
      images: [{ url: projeto.cover.src, alt: projeto.cover.alt }],
    },
  };
}

export default async function PaginaDoCaso({ params }: { params: Params }) {
  const { lang: bruto, slug } = await params;
  const lang = comoLang(bruto);
  const projeto = getProject(lang, slug);
  if (!projeto) notFound();

  const i = PROJECTS.findIndex((p) => p.slug === slug);
  const seguinte = PROJECTS[(i + 1) % PROJECTS.length];
  const copiaSeguinte = getDictionary(lang).projects[seguinte.slug];

  return (
    <main id="content">
      <EstudoDeCaso
        p={projeto}
        proximo={{ slug: seguinte.slug, title: copiaSeguinte.title }}
        t={getDictionary(lang).project}
        assunto={getDictionary(lang).contact.emailSubject}
      />
    </main>
  );
}
