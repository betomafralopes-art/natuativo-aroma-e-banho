'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { toast } from 'react-hot-toast'

import { useCart } from './useCart'
import QuantitySelector from '@/components/ui/QuantitySelector'

interface CartButtonProps {
  id: string
  nome: string
  preco: number
  imagem: string | null
  slug: string
}

export default function CartButton({
  id,
  nome,
  preco,
  imagem,
  slug,
}: CartButtonProps) {
  const { adicionarProduto } = useCart()

  const [quantidade, setQuantidade] = useState(1)

  function handleAdd() {
    adicionarProduto(
      {
        id,
        nome,
        preco,
        imagem,
        slug,
      },
      quantidade
    )

    toast.success(
      `${quantidade} ${
        quantidade > 1 ? 'unidades' : 'unidade'
      } de ${nome} adicionadas ao carrinho`
    )
  }

  return (
    <div className="space-y-3">

      <QuantitySelector
        quantidade={quantidade}
        onChange={setQuantidade}
      />

      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-3 rounded-xl border border-charcoal-900 bg-charcoal-900 py-4 px-6 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:border-gold-500 hover:bg-gold-500 hover:shadow-lg"
      >
        <ShoppingBag size={20} />

        Adicionar ao Carrinho
      </button>

    </div>
  )
}