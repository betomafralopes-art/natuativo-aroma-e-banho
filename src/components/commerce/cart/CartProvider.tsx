'use client'

import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { CartContext, CartItem } from './CartContext'

interface CartProviderProps {
  children: ReactNode
}

const STORAGE_KEY = 'natuativo-carrinho'

export default function CartProvider({
  children,
}: CartProviderProps) {
  const [itens, setItens] = useState<CartItem[]>([])
  const [carregado, setCarregado] = useState(false)

  // Carrega o carrinho salvo
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem(STORAGE_KEY)

    if (carrinhoSalvo) {
      try {
        setItens(JSON.parse(carrinhoSalvo))
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    setCarregado(true)
  }, [])

  // Salva sempre que houver alteração
  useEffect(() => {
    if (!carregado) return

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(itens)
    )
  }, [itens, carregado])

  function adicionarProduto(
  produto: Omit<CartItem, 'quantidade'>,
  quantidade = 1
) {
    setItens((estadoAtual) => {
      const existente = estadoAtual.find(
        (item) => item.id === produto.id
      )

      if (existente) {
        return estadoAtual.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + quantidade,
              }
            : item
        )
      }

      return [
        ...estadoAtual,
        {
          ...produto,
          quantidade,
        },
      ]
    })
  }

  function removerProduto(id: string) {
    setItens((estadoAtual) =>
      estadoAtual.filter(
        (item) => item.id !== id
      )
    )
  }

  function aumentarQuantidade(id: string) {
    setItens((estadoAtual) =>
      estadoAtual.map((item) =>
        item.id === id
          ? {
              ...item,
              quantidade: item.quantidade + 1,
            }
          : item
      )
    )
  }

  function diminuirQuantidade(id: string) {
    setItens((estadoAtual) =>
      estadoAtual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantidade:
                  item.quantidade - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantidade > 0
        )
    )
  }

  function limparCarrinho() {
    setItens([])
  }

  const totalItens = useMemo(
    () =>
      itens.reduce(
        (total, item) =>
          total + item.quantidade,
        0
      ),
    [itens]
  )

  const subtotal = useMemo(
    () =>
      itens.reduce(
        (total, item) =>
          total +
          item.preco * item.quantidade,
        0
      ),
    [itens]
  )

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarProduto,
        removerProduto,
        aumentarQuantidade,
        diminuirQuantidade,
        limparCarrinho,
        totalItens,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}