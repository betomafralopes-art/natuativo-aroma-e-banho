'use client'

import CartButton from '@/components/commerce/cart/CartButton'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

interface ProductActionsProps {
  id: string
  nome: string
  preco: number
  imagem: string | null
  slug: string
}

export default function ProductActions({
  id,
  nome,
  preco,
  imagem,
  slug,
}: ProductActionsProps) {
  return (
    <div className="mt-auto space-y-3">

      <CartButton
        id={id}
        nome={nome}
        preco={preco}
        imagem={imagem}
        slug={slug}
      />

      <WhatsAppButton
        productName={nome}
        size="lg"
        label="Comprar Agora"
      />

      <p className="font-body text-xs text-charcoal-400 text-center">
        Resposta rápida pelo WhatsApp • Palhoça - SC
      </p>

    </div>
  )
}