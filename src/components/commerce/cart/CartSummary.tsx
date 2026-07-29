'use client'

import { useCart } from './useCart'
import { formatCurrency } from '@/lib/utils'

export default function CartSummary() {
  const {
    itens,
    subtotal,
  } = useCart()

  function finalizarPedido() {
    if (itens.length === 0) return

    const mensagem = `
🌿 *Natuativo Aroma & Banho*

Olá!

Gostaria de fazer o seguinte pedido:

${itens
  .map(
    (item) => `
• *${item.nome}*
Quantidade: ${item.quantidade}
Valor: ${formatCurrency(item.preco * item.quantidade)}
`
  )
  .join('\n')}

━━━━━━━━━━━━━━━━━━

*Subtotal:* ${formatCurrency(subtotal)}

Obrigado!
`

    const url = `https://wa.me/${
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5548996350861'
    }?text=${encodeURIComponent(mensagem)}`

    window.open(url, '_blank')
  }

  return (
    <div className="border-t border-cream-300 bg-white px-7 py-6">

      <div className="mb-7 flex items-end justify-between">
        <span className="font-body text-[15px] font-medium tracking-wide text-charcoal-500">
          Subtotal
        </span>

        <span className="font-sans text-[1.55rem] md:text-[2rem] font-medium tracking-tight text-gold-500">
  {formatCurrency(subtotal)}
</span>
      </div>

      <button
        onClick={finalizarPedido}
        disabled={itens.length === 0}
        className="
          w-full
          rounded-2xl
          border
          border-[#25D366]
          bg-[#25D366]
          py-[18px]
          font-medium
          text-white
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:border-[#1EBE5B]
          hover:bg-[#1EBE5B]
          hover:shadow-xl
          disabled:cursor-not-allowed
          disabled:border-gray-300
          disabled:bg-gray-300
        "
      >
        Finalizar pelo WhatsApp
      </button>

    </div>
  )
}