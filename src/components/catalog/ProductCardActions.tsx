'use client'

import Link from 'next/link'
import { ShoppingCart, Eye } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useCart } from '@/components/commerce/cart/useCart'

interface ProductCardActionsProps {
  id: string
  nome: string
  preco: number
  imagem: string | null
  slug: string
}

export default function ProductCardActions({
  id,
  nome,
  preco,
  imagem,
  slug,
}: ProductCardActionsProps) {
  const { adicionarProduto } = useCart()

  function adicionarAoCarrinho() {
    adicionarProduto({
      id,
      nome,
      preco,
      imagem,
      slug,
    })

    toast.success(`${nome} adicionado ao carrinho`)
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-3">

      <button
        onClick={adicionarAoCarrinho}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-charcoal-900
          bg-charcoal-900
          py-3.5
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-gold-500
          hover:bg-gold-500
          hover:text-white
          hover:shadow-lg
        "
      >
        <ShoppingCart size={18} />

        <span>Adicionar</span>
      </button>

      <Link
        href={`/produto/${slug}`}
        className="
          flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-gold-500
          bg-white
          py-3.5
          text-sm
          font-semibold
          text-gold-700
          transition-all
          duration-300
          hover:-translate-y-1
          hover:bg-gold-500
          hover:text-white
          hover:shadow-lg
        "
      >
        <Eye size={18} />

        <span>Detalhes</span>
      </Link>

    </div>
  )
}