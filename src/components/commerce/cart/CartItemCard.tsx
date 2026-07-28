'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from './useCart'
import type { CartItem } from './CartContext'
import { formatCurrency } from '@/lib/utils'

interface CartItemCardProps {
  item: CartItem
}

export default function CartItemCard({
  item,
}: CartItemCardProps) {
  const {
    aumentarQuantidade,
    diminuirQuantidade,
    removerProduto,
  } = useCart()

  return (
    <div className="flex gap-4 py-6 border-b border-cream-200">

      <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-cream-100 shadow-sm">

        {item.imagem ? (
          <Image
            src={item.imagem}
            alt={item.nome}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-charcoal-400">
            Sem imagem
          </div>
        )}

      </div>

      <div className="flex-1">

        <h3 className="font-sans text-[17px] font-normal leading-snug text-charcoal-900">
          {item.nome}
        </h3>

        <p className="mt-2 font-sans text-[22px] font-medium text-gold-600">
          {formatCurrency(item.preco)}
        </p>

        <div className="mt-5 flex items-center">

          <div className="flex items-center gap-2">

            <button
              onClick={() => diminuirQuantidade(item.id)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-300 transition-all duration-300 hover:border-gold-500 hover:text-gold-600"
            >
              <Minus size={14} />
            </button>

            <span className="min-w-[30px] text-center font-medium text-charcoal-800">
  {item.quantidade}
</span>

            <button
              onClick={() => aumentarQuantidade(item.id)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-300 transition-all duration-300 hover:border-gold-500 hover:text-gold-600"
            >
              <Plus size={14} />
            </button>

          </div>

          <button
            onClick={() => removerProduto(item.id)}
            className="ml-4 rounded-full p-2 text-charcoal-400 transition-all duration-300 hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  )
}