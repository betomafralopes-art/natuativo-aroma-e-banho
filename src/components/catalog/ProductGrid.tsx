import ProductCard from './ProductCard'
import type { ProdutoCompleto } from '@/types/database'

interface ProductGridProps {
  produtos: ProdutoCompleto[]
  emptyMessage?: string
}

export default function ProductGrid({ produtos, emptyMessage }: ProductGridProps) {
  if (produtos.length === 0) {
    return (
      <div className="py-16 md:py-24 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cream-200 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-cream-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z" />
          </svg>
        </div>
        <p className="font-display text-2xl text-charcoal-400 mb-2">
          {emptyMessage || 'Nenhum produto encontrado'}
        </p>
        <p className="font-body text-sm text-charcoal-400">
          Tente ajustar os filtros ou buscar por outro termo.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
      {produtos.map((produto, i) => (
        <ProductCard key={produto.id} produto={produto} index={i} />
      ))}
    </div>
  )
}
