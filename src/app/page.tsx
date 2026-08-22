import Capa from '@/components/Capa';
import Marquee from '@/components/Marquee';
import Sumario from '@/components/Sumario';
import SobreSection from '@/components/SobreSection';
import ProjectGrid from '@/components/ProjectGrid';
import StackSection from '@/components/StackSection';
import ProcessSection from '@/components/ProcessSection';
import ExperimentsSection from '@/components/ExperimentsSection';
import ContactSection from '@/components/ContactSection';
import Encarte3D from '@/components/Encarte3D';
import { estampas } from '@/data/estampas';

/* -------------------------------------------------------------------------
   O arquivo, na ordem em que é folheado.

   Capa, sumário, e daí em diante os cadernos com as estampas encartadas
   entre eles. As três chapas 3D não são intervalo decorativo: cada uma cai
   numa virada da narrativa — depois de dizer quem assina, depois de mostrar
   o trabalho, e depois de explicar o método.

   A ordem dos cadernos e os números de página vêm de data/arquivo.ts.
   ------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <Capa />

      <Marquee
        itens={['DESENVOLVEDOR', 'DESIGNER', 'FULL-STACK', 'UX · UI', 'FEITO À MÃO']}
        velocidade={34}
        separador="·"
      />

      <Sumario />

      <SobreSection />
      <Encarte3D estampa={estampas[0]} indice={0} />

      <ProjectGrid />
      <Encarte3D estampa={estampas[1]} indice={1} />

      <StackSection />
      <ProcessSection />
      <Encarte3D estampa={estampas[2]} indice={2} />

      <ExperimentsSection />
      <ContactSection />
    </>
  );
}
