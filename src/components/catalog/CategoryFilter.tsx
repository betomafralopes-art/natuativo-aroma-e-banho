'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Categoria } from '@/types/database'

interface CategoryFilterProps {
  categorias: Categoria[]
  categoriaAtual?: string
}

export default function CategoryFilter({ categorias, categoriaAtual }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setCategoria = (slug?: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set('categoria', slug)
    } else {
      params.delete('categoria')
    }
    params.delete('pagina')
    router.push(`/catalogo?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setCategoria(undefined)}
        className={cn(
          'px-4 py-2 rounded-full font-body text-xs font-medium tracking-wide transition-all duration-200',
          !categoriaAtual
            ? 'bg-gold-500 text-white shadow-gold'
            : 'bg-white text-charcoal-600 border border-cream-300 hover:border-gold-400 hover:text-gold-600'
        )}
      >
        Todos
      </button>

      {categorias.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategoria(cat.slug)}
          className={cn(
            'px-4 py-2 rounded-full font-body text-xs font-medium tracking-wide transition-all duration-200',
            categoriaAtual === cat.slug
              ? 'bg-gold-500 text-white shadow-gold'
              : 'bg-white text-charcoal-600 border border-cream-300 hover:border-gold-400 hover:text-gold-600'
          )}
        >
          {cat.nome}
        </button>
      ))}
    </div>
  )
}
