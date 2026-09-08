import Link from "next/link";
import { getDictionary, SITE } from "@/content";

export default function NaoEncontrado() {
  const t = getDictionary("en").notFound;
  return (
    <section className="shell flex min-h-[100svh] flex-col justify-center py-[var(--space-9)]">
      <p className="label label--dim">{SITE.name}</p>
      <p className="label label--accent mt-[var(--space-6)]">{t.label}</p>
      <h1 className="display-xl mt-[var(--space-4)]">{t.title}</h1>
      <p className="body mt-[var(--space-5)]">{t.text}</p>
      <p className="mt-[var(--space-7)]">
        <Link href="/en" className="btn">
          {t.cta}
        </Link>
      </p>
    </section>
  );
}
