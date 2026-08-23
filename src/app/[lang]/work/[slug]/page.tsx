import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent, getProject, getProjects, identity } from '@/content';
import { projectShapes } from '@/content/shared';
import { isLang, langTag, langs, type Lang } from '@/lib/lang';
import ProjectPage from '@/components/ProjectPage';

/* -------------------------------------------------------------------------
   Uma página por projeto e por idioma, todas geradas no build.

   São 5 projetos × 3 idiomas = 15 documentos estáticos. É o produto
   cartesiano de propósito: cada um tem título, descrição e canonical
   próprios, e o `languages` liga os três irmãos entre si.
   ------------------------------------------------------------------------- */

export function generateStaticParams() {
  return langs.flatMap((lang) => projectShapes.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};

  const p = getProject(lang, slug);
  if (!p) return { title: getContent(lang).notFound.title };

  const titulo = `${p.title} · ${p.year}`;
  const url = `${identity.url}/${lang}/work/${p.slug}`;

  return {
    title: titulo,
    description: p.summary,
    /* absoluto, e não relativo: o site mora numa subpasta e um caminho com
       barra na frente resolveria pra raiz do domínio */
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(langs.map((l) => [langTag[l], `${identity.url}/${l}/work/${p.slug}`])),
        'x-default': `${identity.url}/en/work/${p.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      locale: langTag[lang],
      title: `${titulo} · ${identity.name}`,
      description: p.summary,
      url,
      images: [
        {
          url: identity.url + p.cover.src,
          width: p.cover.width,
          height: p.cover.height,
          alt: p.cover.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${titulo} · ${identity.name}`,
      description: p.summary,
      images: [identity.url + p.cover.src],
    },
  };
}

export default async function Pagina({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();

  const p = getProject(lang as Lang, slug);
  if (!p) notFound();

  const todos = getProjects(lang as Lang);
  const i = todos.findIndex((x) => x.slug === p.slug);
  const proximo = todos[(i + 1) % todos.length];

  return <ProjectPage p={p} proximo={proximo} />;
}
