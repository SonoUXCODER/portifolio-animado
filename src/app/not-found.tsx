import Link from 'next/link';

export const metadata = { title: 'Página não encontrada' };

export default function NaoEncontrado() {
  return (
    <section className="shell flex min-h-[70svh] flex-col justify-center py-[var(--space-10)]">
      <div className="section-mark">
        <span className="section-mark__index">404</span>
        <span className="section-mark__name">Não encontrado</span>
      </div>

      <h1 className="display-lg mt-[var(--space-7)] max-w-[16ch]">Esta página não existe.</h1>

      <p className="lead mt-[var(--space-5)] max-w-[42ch]">
        O endereço está errado, ou a página saiu do ar. As duas coisas acontecem — o caminho de
        volta é o mesmo.
      </p>

      <p className="mt-[var(--space-7)]">
        <Link href="/" className="btn" data-cursor="ver">
          Voltar ao início
        </Link>
      </p>
    </section>
  );
}
