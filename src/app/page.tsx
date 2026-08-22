import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import SobreSection from '@/components/SobreSection';
import ProjectGrid from '@/components/ProjectGrid';
import StackSection from '@/components/StackSection';
import ProcessSection from '@/components/ProcessSection';
import ExperimentsSection from '@/components/ExperimentsSection';
import ContactSection from '@/components/ContactSection';

/* -------------------------------------------------------------------------
   A home é a ordem de leitura do zine: quem é, o que fez, com o que faz,
   como faz, o que testou, e como chamar.
   Os projetos vêm cedo de propósito — são o centro do portfólio.
   ------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <Hero />

      <Marquee
        itens={['DESENVOLVEDOR', 'DESIGNER', 'FULL-STACK', 'UX · UI', 'SEM TEMPLATE']}
        velocidade={32}
        separador="✳"
      />

      <SobreSection />
      <ProjectGrid />
      <StackSection />
      <ProcessSection />
      <ExperimentsSection />
      <ContactSection />
    </>
  );
}
