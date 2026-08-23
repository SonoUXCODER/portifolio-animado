import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NaoEncontrado() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center py-[var(--space-10)]">
      <p className="index-line">
        <span className="index-line__n">404</span>
        <span className="index-line__sep" aria-hidden="true">
          /
        </span>
        <span style={{ color: 'var(--text-primary)' }}>Not found</span>
        <span className="index-line__rule" aria-hidden="true" />
      </p>

      <h1 className="display-xl mt-[var(--space-8)] max-w-[14ch]">This page does not exist.</h1>

      <p className="lead mt-[var(--space-6)] max-w-[40ch]">
        Or it did, and it went offline. The way back is the same either way.
      </p>

      <p className="mt-[var(--space-8)]">
        <Link href="/" className="btn" data-cursor="home">
          Back to the start
        </Link>
      </p>
    </section>
  );
}
