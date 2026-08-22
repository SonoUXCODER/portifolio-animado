import Link from 'next/link';

export default function NaoEncontrado() {
  return (
    <section className="envelope flex min-h-[70vh] flex-col justify-center py-28">
      <div className="cabeco">
        <span>PÁGINA ARRANCADA</span>
        <span className="hidden sm:inline" style={{ color: 'var(--tinta-3)' }}>
          ERRO 404
        </span>
      </div>

      <h1 className="zine-titulo mb-6">
        ESSA PÁGINA
        <br />
        NÃO EXISTE
      </h1>
      <p className="olho mb-8 max-w-[34ch] text-[clamp(1rem,1.5vw,1.25rem)]">
        Alguém arrancou esta folha do arquivo — ou o endereço foi inventado. Acontece.
      </p>
      <Link href="/" className="botao self-start" data-cursor="ver">
        VOLTAR PRA CAPA <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
