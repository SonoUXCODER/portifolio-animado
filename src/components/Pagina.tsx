import type { ReactNode } from 'react';
import { cadernoDe, folioDe, totalDeCadernos } from '@/data/arquivo';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------
   Uma página do arquivo.

   Envolve cada seção com o mesmo aparato de impresso: cabeço em cima
   (número, nome, chamada), conteúdo no meio, fólio embaixo. É o que faz o
   site parecer folheado em vez de rolado — a repetição do aparato é o que
   dá a sensação de estar dentro de um mesmo objeto.

   Tudo vem de data/arquivo.ts pelo id, então não existe número digitado
   dentro de componente nenhum.
   ------------------------------------------------------------------------- */

export default function Pagina({
  id,
  children,
  className,
  invertida = false,
  semFolio = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  /** caderno impresso em tinta cheia */
  invertida?: boolean;
  semFolio?: boolean;
}) {
  const caderno = cadernoDe(id);
  const folio = folioDe(id);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className={cn('pagina relative', invertida && 'invertido', className)}
    >
      <div className="envelope">
        <header className="cabeco">
          <span>
            <span aria-hidden="true">{folio}</span> — {caderno?.titulo ?? id}
          </span>
          <span className="hidden text-right sm:inline" style={{ color: 'var(--tinta-3)' }}>
            {caderno?.chamada}
          </span>
        </header>

        {children}

        {!semFolio && (
          <div className="folio">
            <span className="escala-cinza" aria-hidden="true">
              {/* cinco degraus de cinza, como a barra de controle de uma prova */}
              <i style={{ opacity: 0.15 }} />
              <i style={{ opacity: 0.35 }} />
              <i style={{ opacity: 0.55 }} />
              <i style={{ opacity: 0.75 }} />
              <i style={{ opacity: 1 }} />
            </span>
            <span>
              PÁG. {folio} / {totalDeCadernos}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
