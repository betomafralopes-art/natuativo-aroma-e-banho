import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <>
      <Header />

      <main
  className="relative overflow-hidden bg-white"
  style={{
    background: `
      radial-gradient(circle at center,
      rgba(201,168,76,.10) 0%,
      rgba(201,168,76,.05) 28%,
      rgba(255,255,255,1) 75%)
    `,
  }}
>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-cream-300 bg-gradient-to-b from-cream-50 to-white py-28">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-gold-500 block mb-4">
            Uma marca feita com propósito
          </span>

          <h1 className="font-display text-5xl text-charcoal-900 mb-8">
            Quem Somos
          </h1>

          <div className="gold-divider mt-5 mb-10" />

          <p className="text-lg leading-9 text-charcoal-600">
            Na Natuativo Aroma & Banho acreditamos que o autocuidado vai muito
            além da rotina. É um momento de pausa, conexão consigo mesmo e
            bem-estar.
          </p>

        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 space-y-24">

          {/* História */}
          <div className="pb-16 border-b border-cream-200">

            <h2 className="font-display text-3xl text-charcoal-900 mb-6">
              Nossa História
            </h2>

            <p className="text-lg leading-9 text-charcoal-600">
              A Natuativo Aroma & Banho nasceu do desejo de transformar o
              cuidado diário em uma experiência especial. Cada criação é
              desenvolvida artesanalmente, valorizando os detalhes, a qualidade
              e o carinho presentes em cada etapa do processo.
            </p>

            <p className="mt-6 text-lg leading-9 text-charcoal-600">
              Acreditamos que fragrâncias têm o poder de despertar memórias,
              transmitir aconchego e tornar pequenos momentos da rotina muito
              mais significativos.
            </p>

          </div>

          {/* Essência */}
          <div className="py-16 border-b border-cream-200">

            <h2 className="font-display text-3xl text-charcoal-900 mb-6">
              Nossa Essência
            </h2>

            <p className="text-lg leading-9 text-charcoal-600">
              Mais do que produzir sabonetes, aromas e itens para o cuidado
              pessoal, buscamos criar experiências que despertem sensações,
              acolham momentos e façam parte da rotina das pessoas.
            </p>

            <p className="mt-6 text-lg leading-9 text-charcoal-600">
              Cada coleção é pensada para unir elegância, delicadeza e bem-estar,
              transformando o autocuidado em um verdadeiro ritual.
            </p>

          </div>

          {/* Compromisso */}
          <div className="pt-16">

            <h2 className="font-display text-3xl text-charcoal-900 mb-6">
              Nosso Compromisso
            </h2>

            <p className="text-lg leading-9 text-charcoal-600">
              Seguimos produzindo artesanalmente, sempre buscando oferecer
              qualidade, sofisticação e atenção aos detalhes. Nosso compromisso
              é criar produtos que façam parte dos momentos mais especiais da
              sua rotina.
            </p>

          </div>

        </div>
      </section>

      {/* Encerramento */}
<section className="pb-24">

  <div className="max-w-4xl mx-auto px-6">

    <div className="rounded-3xl border border-cream-300 bg-gradient-to-b from-cream-50 to-white px-8 md:px-16 py-16 text-center shadow-sm">

      <blockquote className="font-display text-3xl md:text-4xl text-charcoal-900 italic leading-relaxed">
        "Acreditamos que o autocuidado começa nos pequenos momentos.
        Cada produto é criado para transformar a rotina em uma experiência
        de bem-estar, aconchego e conexão."
      </blockquote>

      <div className="w-20 h-px bg-gold-500 mx-auto my-10" />

      <p className="uppercase tracking-[0.35em] text-gold-500 text-sm">
        Natuativo Aroma & Banho
      </p>

      <Link
        href="/catalogo"
        className="inline-flex items-center justify-center mt-10 btn-gold px-8 py-3"
      >
        Conheça nosso Catálogo
      </Link>

    </div>

  </div>

</section>

      </main>

      <Footer />
    </>
  )
}