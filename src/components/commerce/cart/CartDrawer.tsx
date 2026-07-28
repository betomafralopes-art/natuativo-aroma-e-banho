'use client'

import CartSummary from './CartSummary'
import { useCart } from './useCart'
import CartList from './CartList'

interface CartDrawerProps {
  aberto: boolean
  onClose: () => void
}

export default function CartDrawer({
  aberto,
  onClose,
}: CartDrawerProps) {
    const { itens } = useCart()
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${aberto ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      />

      {/* Drawer */}
      <aside
      className={`
      fixed top-0 right-0 h-screen w-full sm:w-[440px]
      bg-white shadow-2xl z-50
      flex flex-col
      overflow-hidden
      transition-transform duration-500 ease-out
      ${aberto ? 'translate-x-0' : 'translate-x-full'}
     `}
    >
        <div className="flex items-center justify-between border-b border-cream-300 px-8 py-7">
          <h2 className="font-display text-[1.8rem] font-normal tracking-tight text-charcoal-900">
            Meu Carrinho
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-charcoal-500 transition-all duration-300 hover:bg-cream-200 hover:text-charcoal-900"
          >
            ✕
          </button>
        </div>

         {itens.length === 0 ? (

          <div className="flex flex-col items-center justify-center h-[70vh] px-8 text-center">

          <div className="mb-7 text-6xl">
            🛒
          </div>

          <h3 className="mb-3 font-display text-[2rem] font-normal text-charcoal-900">
         Seu carrinho está vazio
           </h3>

         <p className="max-w-[280px] font-body text-[15px] leading-7 text-charcoal-500">
            Adicione produtos ao carrinho para finalizar seu pedido pelo WhatsApp.
          </p>

         </div>

) : (

  <CartList />

)}
        <div className="mt-auto">
        <CartSummary />
        </div>
        
      </aside>
    </>
  )
}