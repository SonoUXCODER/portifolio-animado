import { folioDe, totalDeCadernos } from '@/data/arquivo';

/* -------------------------------------------------------------------------
   O pé de página do impresso: barra de controle de cinza + número do fólio.

   Existia copiado em três componentes (Pagina, ProjectGrid, ProcessSection),
   com os cinco degraus de opacidade escritos à mão em cada um. Agora é um
   lugar só — mudar o pé muda em todos.
   ------------------------------------------------------------------------- */

/* os degraus da barra de controle, do mais claro ao cheio */
const DEGRAUS = [0.15, 0.35, 0.55, 0.75, 1];

export default function Folio({ id }: { id: string }) {
  const folio = folioDe(id);

  return (
    <div className="folio">
      <span className="escala-cinza" aria-hidden="true">
        {DEGRAUS.map((o) => (
          <i key={o} style={{ opacity: o }} />
        ))}
      </span>
      <span>
        PÁG. {folio} / {totalDeCadernos}
      </span>
    </div>
  );
}
