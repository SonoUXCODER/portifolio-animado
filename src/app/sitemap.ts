import type { MetadataRoute } from "next";
import { LANGS, SITE } from "@/content";
import { PROJECTS } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  const caminhos = [
    "",
    ...LANGS.flatMap((lang) => [`/${lang}`, ...PROJECTS.map((p) => `/${lang}/work/${p.slug}`)]),
  ];

  return caminhos.map((caminho) => ({
    url: `${SITE.url}${caminho}/`,
    lastModified: agora,
    changeFrequency: caminho === "" ? "monthly" : "yearly",
    priority: caminho === "" ? 1 : caminho.includes("/work/") ? 0.6 : 0.9,
  }));
}
