import Link from 'next/link';

export default function NaoEncontrado() {
  return (
    <section className="envelope flex min-h-[70vh] flex-col justify-center py-32">
      <p className="zine-sub mb-3" style={{ color: 'var(--accent)' }}>
        ERRO 404
      </p>
      <h1 className="zine-titulo mb-6">
        ESSA PÁGINA
        <br />
        NÃO EXISTE
      </h1>
      <p className="corpo mb-8 text-[clamp(1rem,1.4vw,1.15rem)]">
        Ou eu apaguei, ou você inventou o endereço. Acontece.
      </p>
      <Link href="/" className="botao self-start" data-cursor="ver">
        VOLTAR PRO COMEÇO <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
