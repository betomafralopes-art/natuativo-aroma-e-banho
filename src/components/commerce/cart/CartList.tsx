'use client'

import { useCart } from './useCart'
import CartItemCard from './CartItemCard'

export default function CartList() {
  const { itens } = useCart()

  return (
    <div className="flex-1 overflow-y-auto px-8 py-5 space-y-2">

      {itens.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
        />
      ))}

    </div>
  )
}