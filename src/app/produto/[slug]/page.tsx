import ProductGallery from '@/components/product/ProductGallery'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import CartButton from '@/components/commerce/cart/CartButton'
import ProductGrid from '@/components/catalog/ProductGrid'
import { getProdutoBySlug, getProdutos } from '@/lib/produtos'
import { formatCurrency } from '@/lib/utils'
import ProductActions from '@/components/product/ProductActions'

export const revalidate = 60

interface ProdutoPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: ProdutoPageProps): Promise<Metadata> {
  const produto = await getProdutoBySlug(params.slug)
  if (!produto) return { title: 'Produto não encontrado' }

  return {
    title: produto.nome,
    description: produto.descricao || `${produto.nome} — Natuativo Aroma & Banho`,
    openGraph: {
      title: produto.nome,
      description: produto.descricao || '',
      images: produto.imagem_principal ? [{ url: produto.imagem_principal }] : [],
    },
  }
}

export default async function ProdutoPage({ params }: ProdutoPageProps) {
  const produto = await getProdutoBySlug(params.slug)
  if (!produto) notFound()

  const relacionados = await getProdutos({
    categoria: (produto.categorias as { slug: string } | null)?.slug,
    limit: 5,
  })
  const outros = relacionados.filter(p => p.id !== produto.id).slice(0, 4)

  const imagens = produto.produto_imagens || []
  const temDesconto = produto.preco_original && produto.preco_original > produto.preco

  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-100 pt-16 md:pt-20">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 font-body text-xs text-charcoal-400">
            <Link href="/" className="hover:text-gold-500 transition-colors">Início</Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-gold-500 transition-colors">Catálogo</Link>
            {produto.categorias && (
              <>
                <span>/</span>
                <Link
                  href={`/catalogo?categoria=${(produto.categorias as { slug: string }).slug}`}
                  className="hover:text-gold-500 transition-colors"
                >
                  {(produto.categorias as { nome: string }).nome}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-charcoal-600 truncate max-w-[150px]">{produto.nome}</span>
          </nav>
        </div>

        {/* Product */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

         <ProductGallery
         nome={produto.nome}
         imagemPrincipal={produto.imagem_principal ?? null}
         imagens={produto.produto_imagens || []}
          lancamento={produto.lancamento}
         />            
       

              {/* Info */}
              <div className="flex flex-col p-5 md:p-10">
                {produto.categorias && (
                  <Link
                    href={`/catalogo?categoria=${(produto.categorias as { slug: string }).slug}`}
                    className="mb-5 block w-fit font-sans text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-700 transition-all duration-300 hover:text-gold-500"
                  >
                    {(produto.categorias as { nome: string }).nome}
                  </Link>
                )}

                <h1 className="font-sans text-[1.8rem] leading-tight md:text-[2.6rem] font-normal leading-tight text-charcoal-900 mb-8">
                 {produto.nome}
                </h1>

                {/* Price */}
                 <div className="flex items-baseline gap-3 mb-8">
                 <span className="font-sans text-[2rem] md:text-5xl font-medium tracking-tight text-gold-500 leading-none">
                 {formatCurrency(produto.preco)}
                 </span>

                 {temDesconto && (
                 <span className="font-body text-base text-charcoal-400 line-through">
                  {formatCurrency(produto.preco_original!)}
                  </span>
                 )}
                </div>

                <div className="w-28 h-[2px] rounded-full bg-gold-300 mb-8" />

                {produto.descricao && (
                  <div className="mb-6">
                    <p className="font-body text-[15px] leading-8 text-charcoal-600">
                      {produto.descricao}
                    </p>
                  </div>
                )}

            {/* Benefícios */}
<div className="mt-6 rounded-2xl border border-cream-200 bg-cream-50 p-5">

  <h3 className="font-sans text-lg font-semibold text-charcoal-900 mb-5">
    Produzido com cuidado em cada detalhe
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-sm">
        ✨
      </div>
      <span className="text-[13px] text-charcoal-700">
        Produção artesanal
      </span>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-sm">
        🌿
      </div>
      <span className="text-[13px] text-charcoal-700">
        Ingredientes selecionados
      </span>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-sm">
        🎁
      </div>
      <span className="text-[13px] text-charcoal-700">
        Ideal para presentear
      </span>
    </div>

    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-sm">
        🚚
      </div>
      <span className="text-[13px] text-charcoal-700">
        Enviamos para todo o Brasil
      </span>
    </div>

  </div>

</div>


{/* Banner Institucional */}

<div className="mt-8 rounded-2xl bg-gradient-to-r from-[#F8F5EF] via-white to-[#F8F5EF] border border-gold-200 p-6">

  <h3 className="font-sans text-2xl font-semibold text-charcoal-900 mb-3">
    Mais do que um produto. Uma experiência.
  </h3>

  <p className="text-sm leading-7 text-charcoal-600">
    Cada criação da Natuativo Aroma & Banho é produzida artesanalmente,
    unindo ingredientes cuidadosamente selecionados, fragrâncias marcantes
    e acabamento impecável para transformar pequenos momentos em uma
    experiência de bem-estar.
  </p>

</div>

          {/* CTA */}

         <ProductActions
           id={produto.id}
           nome={produto.nome}
           preco={produto.preco}
           imagem={produto.imagem_principal}
           slug={params.slug}
          />
       
         </div>

            </div>
          </div>
        </section>

        {/* Related products */}
        {outros.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <h2 className="font-display text-3xl text-charcoal-800 mb-8 text-center">
              Você também pode gostar
            </h2>
            <ProductGrid produtos={outros} />
          </section>
        )}
      </main>
      <Footer />

    </>
  )
}
