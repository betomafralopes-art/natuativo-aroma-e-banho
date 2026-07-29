import Link from 'next/link'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'
import ProductCardActions from './ProductCardActions'
import type { ProdutoCompleto } from '@/types/database'

interface ProductCardProps {
  produto: ProdutoCompleto
  index?: number
}

export default function ProductCard({
  produto,
  index = 0,
}: ProductCardProps) {
  const delay = Math.min(index % 6, 5)

  const delayClass = [
    'stagger-1',
    'stagger-2',
    'stagger-3',
    'stagger-4',
    'stagger-5',
    'stagger-6',
  ][delay]

  const temDesconto =
  produto.preco_original != null &&
  produto.preco != null &&
  produto.preco_original > produto.preco

  return (
    <div
      className={`
        group
        opacity-0
        animate-fadeInUp
        ${delayClass}
        overflow-hidden
        rounded-[28px]
        border border-cream-200
        bg-white
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
      `}
    >
      <Link href={`/produto/${produto.slug ?? ''}`}>

        {/* FOTO */}

        <div className="relative aspect-[4/5] overflow-hidden bg-[#faf7f2]">

          {produto.imagem_principal_url ? (
            <Image
              src={produto.imagem_principal_url}
              alt={produto.imagem_principal_alt || produto.nome || 'Produto'}
              fill
              sizes="(max-width:768px)100vw,25vw"
              className="object-contain p-4 md:p-6 transition-all duration-700 group-hover:scale-105 group-hover:brightness-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                className="w-16 h-16 text-cream-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159"
                />
              </svg>

            </div>
          )}

          {produto.lancamento && (
            <div className="absolute right-5 top-5">

              <span className="rounded-full bg-gold-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">

                Lançamento

              </span>

            </div>
          )}

          {temDesconto && (

            <div className="absolute right-5 top-5">

              <span className="rounded-full bg-olive-600 px-3 py-1 text-xs font-semibold text-white">

                -{Math.round(
  ((produto.preco_original! - produto.preco!) /
    produto.preco_original!) *
    100
)}
                %

              </span>

            </div>

          )}
        </div>

      </Link>

      {/* CONTEÚDO */}

      <div className="flex flex-col p-4 md:p-6">

        {produto.categoria_nome && (

          <Link
            href={`/catalogo?categoria=${produto.categoria_slug}`}
            className="mb-4 w-fit rounded-full bg-gold-50 px-3 md:px-4 py-1 md:py-1.5 text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-700 transition-all duration-300 hover:bg-gold-500 hover:text-white"
          >

            {produto.categoria_nome}

          </Link>

        )}

        <Link href={`/produto/${produto.slug ?? ''}`}>

          <h3 className="min-h-[72px] md:min-h-[92px] font-sans text-[1.35rem] md:text-[2rem] font-normal leading-tight text-charcoal-900 transition-all duration-300 group-hover:text-gold-600">

            {produto.nome}

          </h3>

        </Link>

        <div className="mt-5 md:mt-7 flex items-end gap-3">

          <span className="font-sans text-[1.8rem] md:text-4xl font-medium tracking-tight text-gold-500">

            {formatCurrency(produto.preco ?? 0)}

          </span>

          {temDesconto && (

            <span className="pb-1 text-sm font-medium text-charcoal-400 line-through">

              {formatCurrency(produto.preco_original!)}

            </span>

          )}

        </div>

       <ProductCardActions
  id={produto.id ?? ''}
  nome={produto.nome ?? ''}
  preco={produto.preco ?? 0}
  imagem={produto.imagem_principal_url}
  slug={produto.slug ?? ''}
/>

      </div>
    </div>
  )
}