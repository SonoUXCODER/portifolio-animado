import Link from 'next/link';

export const metadata = { title: 'Página não encontrada' };

export default function NaoEncontrado() {
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-[var(--space-10)]">
      <p className="kicker">
        <span className="kicker__n">404</span>
        <span>Entrada não encontrada</span>
      </p>

      <h1 className="display-lg mt-[var(--space-7)] max-w-[14ch]">Esta página não existe.</h1>

      <p className="nota mt-[var(--space-5)] flex max-w-[42ch] gap-[var(--space-3)]">
        <span aria-hidden="true" style={{ color: 'var(--accent)' }}>
          ↳
        </span>
        ou existiu e saiu do ar. as duas coisas acontecem.
      </p>

      <p className="lead mt-[var(--space-5)] max-w-[40ch]">
        O caminho de volta é o mesmo nos dois casos.
      </p>

      <p className="mt-[var(--space-7)]">
        <Link href="/" className="btn" data-cursor="ver">
          Voltar ao início
        </Link>
      </p>
    </section>
  );
}
