import { ProgressoDaPagina } from "@/components/animacoes";
import Intervalo from "@/components/intervalo";
import Passagem from "@/components/passagem";
import Capacidades from "@/components/secoes/capacidades";
import Contato from "@/components/secoes/contato";
import Filosofia from "@/components/secoes/filosofia";
import Hero from "@/components/secoes/hero";
import Sobre from "@/components/secoes/sobre";
import Trabalho from "@/components/secoes/trabalho";
import {
  comoLang,
  getCapabilities,
  getDictionary,
  getInterludes,
  getProjectCards,
  LANGS,
} from "@/content";

export const generateStaticParams = () => LANGS.map((lang) => ({ lang }));

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = comoLang((await params).lang);
  const t = getDictionary(lang);
  const intervalos = getInterludes(lang);

  return (
    <>
      <ProgressoDaPagina />
      <main id="content">
        {/* hero → "Código é meu material", pela mesma passagem circular */}
        <Hero t={t.hero} country={t.meta.country} />
        <Passagem>
          <Sobre t={t.manifesto} nomeSecao={t.sections.about.name} country={t.meta.country} />
        </Passagem>

        {/* escultura → filosofia */}
        <Intervalo peca={intervalos[0]} label={t.interludes.label} />
        <Passagem>
          <Filosofia t={t.philosophy} />
        </Passagem>

        <Trabalho
          t={t.work}
          projects={getProjectCards(lang)}
          nomeSecao={t.sections.work.name}
          assunto={t.contact.emailSubject}
        />

        {/* escultura → capacidades */}
        <Intervalo peca={intervalos[1]} label={t.interludes.label} />
        <Passagem>
          <Capacidades
            t={t.capabilities}
            itens={getCapabilities(lang)}
            nomeSecao={t.sections.capabilities.name}
            assunto={t.contact.emailSubject}
          />
        </Passagem>

        <Contato t={t.contact} nomeSecao={t.sections.contact.name} country={t.meta.country} />
      </main>
    </>
  );
}
