import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ProductGrid from '@/components/catalog/ProductGrid'
import { getProdutos, getCategorias } from '@/lib/produtos'
import Hero from '@/components/home/Hero'

export const revalidate = 60

export default async function HomePage() {
  const [lancamentos, destaques, categorias] = await Promise.all([
    getProdutos({ lancamento: true, limit: 8 }),
    getProdutos({ destaque: true, limit: 8 }),
    getCategorias(),
  ])
console.log(JSON.stringify(categorias, null, 2))
  return (
    <>
      <Header />

      <main>

         <Hero />

        {/* Categorias */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="section-heading">
              <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-gold-500 block mb-3">
                Nossa Coleção
              </span>
              <h2>Categorias</h2>
              <div className="gold-divider mt-4 mb-5" />
              <p>
                Produzido artesanalmente para transformar 
                o cuidado diário em um ritual de bem-estar.
              </p>
            </div>

<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">

  {categorias.map((cat) => (

    <Link
      key={cat.id}
      href={`/catalogo?categoria=${cat.slug}`}
      className="group overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-sm hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500"
    >

      <div className="relative aspect-[1/1.15] overflow-hidden bg-gradient-to-br from-cream-50 to-cream-100 border-b border-gold-100">

        {cat.imagem_url ? (

          <img
            src={cat.imagem_url}
            alt={cat.imagem_alt ?? cat.nome}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

        ) : (

          <div className="w-full h-full flex items-center justify-center">
            
            <div
              className="w-12 h-12 rounded-full"
              style={{
                background:
                  'linear-gradient(135deg, rgba(201,168,76,.18), rgba(201,168,76,.06))',
              }}
            />

          </div>

        )}

         <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

      </div>

      <div className="bg-white px-6 py-7 text-center">

      <div className="w-10 h-px bg-gold-400 mx-auto mb-4 opacity-70" />

      <p className="text-xs uppercase tracking-[0.25em] text-gold-500 mb-2">
  Coleção
</p>

        <h3 className="font-display text-xl text-center text-charcoal-800 tracking-wide group-hover:text-gold-600 transition">
          

          {cat.nome}

        </h3>

<p className="mt-3 text-sm text-charcoal-400 group-hover:text-gold-600 transition">
  Explorar →
</p>

      </div>

    </Link>

  ))}

</div>          </div>
        </section>

        {/* Lançamentos */}
        {lancamentos.length > 0 && (
          <section className="py-20 bg-cream-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="section-heading">
                <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-gold-500 block mb-3">
                  Novidades
                </span>
                <h2>Lançamentos</h2>
                <div className="gold-divider mt-4 mb-5" />
                <p>As criações mais recentes, feitas com carinho para você.</p>
              </div>

              <ProductGrid produtos={lancamentos} />

              <div className="text-center mt-12">
                <Link href="/catalogo?lancamentos=true" className="btn-outline">
                  Ver todos os lançamentos
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Banner CTA */}
        <section
          className="relative overflow-hidden py-16 md:py-24"
          style={{
            background: 'linear-gradient(135deg, #2d2d2d 0%, #1e1e1e 100%)',
          }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }}
          />
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-gold-400 block mb-4">
              Palhoça — SC — Brasil
            </span>
            <h2 className="font-display text-[2.2rem] md:text-5xl text-white mb-4 font-light leading-tight">
              Cada produto é feito com
              <br />
              <span style={{ color: '#C9A84C' }}>amor e dedicação</span>
            </h2>
            <p className="font-body text-sm text-cream-400 mb-10 max-w-md mx-auto leading-relaxed">
              Entre em contato pelo WhatsApp para encomendar, tirar dúvidas ou descobrir nossos produtos exclusivos.
            </p>
            <a
              href="https://wa.me/5548996350861?text=Ol%C3%A1%21+Gostaria+de+saber+mais+sobre+os+produtos+da+Natuativo+Aroma+%26+Banho."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp px-8 py-4 text-sm inline-flex"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar pelo WhatsApp agora
            </a>
          </div>
        </section>

        {/* Destaques */}
        {destaques.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="section-heading">
                <span className="font-body text-xs font-medium tracking-[0.3em] uppercase text-gold-500 block mb-3">
                  Mais Amados
                </span>
                <h2>Produtos em Destaque</h2>
                <div className="gold-divider mt-4 mb-5" />
              </div>

              <ProductGrid produtos={destaques} />

              <div className="text-center mt-12">
                <Link href="/catalogo" className="btn-gold">
                  Ver catálogo completo
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

    </>
  )
}
