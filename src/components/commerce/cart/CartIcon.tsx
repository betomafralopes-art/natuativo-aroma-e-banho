'use client'

import { ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CartIconProps {
  quantidade?: number
  onClick?: () => void
}

export default function CartIcon({
  quantidade = 0,
  onClick,
}: CartIconProps) {
  const [animar, setAnimar] = useState(false)

  useEffect(() => {
    if (quantidade === 0) return

    setAnimar(true)

    const timeout = setTimeout(() => {
      setAnimar(false)
    }, 350)

    return () => clearTimeout(timeout)
  }, [quantidade])

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
  relative
  flex
  h-11
  w-11
  items-center
  justify-center
  rounded-full
  text-charcoal-600
  transition-all
  duration-300
  hover:bg-cream-100
  hover:text-gold-500
  hover:shadow-sm
  active:scale-95
  ${animar ? 'scale-125' : 'scale-100'}
`}
      aria-label="Carrinho"
    >
      <ShoppingCart
  size={22}
  className="transition-colors duration-300"
/>

      {quantidade > 0 && (
        <span
          className={`
            absolute
            -top-1
            -right-1
            flex
            items-center
            justify-center
            min-w-[22px]
            h-[22px]
            px-1
            rounded-full
            bg-gold-500
            text-white
            text-[11px]
            font-medium
            transition-all
            duration-300
            ${animar ? 'scale-125' : 'scale-100'}
          `}
        >
          {quantidade}
        </span>
      )}
    </button>
  )
}