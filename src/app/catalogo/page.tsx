import { Suspense } from 'react'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ProductGrid from '@/components/catalog/ProductGrid'
import CategoryFilter from '@/components/catalog/CategoryFilter'
import SearchBar from '@/components/catalog/SearchBar'
import { getProdutos, getCategorias } from '@/lib/produtos'

export const revalidate = 30

interface CatalogoPageProps {
  searchParams: {
    categoria?: string
    busca?: string
    lancamentos?: string
  }
}

export async function generateMetadata({ searchParams }: CatalogoPageProps): Promise<Metadata> {
  const titulo = searchParams.busca
    ? `Busca: ${searchParams.busca}`
    : searchParams.categoria
    ? `Categoria: ${searchParams.categoria}`
    : 'Catálogo'

  return {
    title: titulo,
    description: 'Explore nossa linha completa de produtos artesanais — sabonetes, body splash, aromatizadores e muito mais.',
  }
}

async function CatalogContent({ searchParams }: CatalogoPageProps) {
  const lancamentos = searchParams.lancamentos === 'true'

  const [produtos, categorias] = await Promise.all([
    getProdutos({
      categoria: searchParams.categoria,
      busca: searchParams.busca,
      lancamento: lancamentos ? true : undefined,
    }),
    getCategorias(),
  ])

  const titulo = lancamentos
    ? 'Lançamentos'
    : searchParams.busca
    ? `Resultados para "${searchParams.busca}"`
    : searchParams.categoria
    ? categorias.find(c => c.slug === searchParams.categoria)?.nome || 'Catálogo'
    : 'Catálogo'

  return (
    <>
      {/* Page header */}
      <div className="bg-white border-b border-cream-200 pt-24 pb-8 md:pt-32 md:pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="font-display text-[2.2rem] md:text-5xl text-charcoal-800 mb-2">{titulo}</h1>
            <p className="font-body text-sm text-charcoal-500">
              {produtos.length} {produtos.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <SearchBar className="w-full sm:max-w-md" />
          </div>

          {/* Categories */}
          <Suspense>
            <CategoryFilter categorias={categorias} categoriaAtual={searchParams.categoria} />
          </Suspense>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ProductGrid produtos={produtos} />
      </div>
    </>
  )
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-100">
        <Suspense
          fallback={
            <div className="pt-32 pb-16 max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden">
                    <div className="skeleton aspect-square" />
                    <div className="p-4 space-y-2">
                      <div className="skeleton h-3 w-1/2 rounded" />
                      <div className="skeleton h-5 w-3/4 rounded" />
                      <div className="skeleton h-3 w-full rounded" />
                      <div className="skeleton h-10 w-full rounded mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        >
          <CatalogContent searchParams={searchParams} />
        </Suspense>
      </main>
      <Footer />

    </>
  )
}
