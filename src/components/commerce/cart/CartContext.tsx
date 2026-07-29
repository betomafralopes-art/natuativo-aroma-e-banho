'use client'

import { createContext } from 'react'

export interface CartItem {
  id: string
  nome: string
  preco: number
  imagem: string | null
  slug: string
  quantidade: number
}

export interface CartContextType {
  itens: CartItem[]

  adicionarProduto: (
  produto: Omit<CartItem, 'quantidade'>,
  quantidade?: number
) => void

  removerProduto: (id: string) => void

  aumentarQuantidade: (id: string) => void

  diminuirQuantidade: (id: string) => void

  limparCarrinho: () => void

  totalItens: number

  subtotal: number
}

export const CartContext = createContext<CartContextType | null>(null)