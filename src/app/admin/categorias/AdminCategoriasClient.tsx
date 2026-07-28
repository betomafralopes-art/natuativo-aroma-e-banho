'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

import type { Categoria } from '@/types/database'

interface Props {
  categorias: Categoria[]
  onEditar: (categoria: Categoria) => void
}

export default function AdminCategoriasClient({
  categorias: initial,
  onEditar,
}: Props) {
  const router = useRouter()

  const [categorias, setCategorias] = useState(initial)

  async function deleteCategoria(id: string, nome: string) {
    const confirmar = confirm(
      `Deseja realmente excluir a categoria "${nome}"?`
    )

    if (!confirmar) return

    try {
      const response = await fetch(`/api/admin/categorias/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error()
      }

      setCategorias((prev) => prev.filter((c) => c.id !== id))

      toast.success('Categoria excluída.')

      router.refresh()
    } catch {
      toast.error('Erro ao excluir categoria.')
    }
  }

  return (
    <div className="bg-white rounded-xl border border-cream-200 overflow-hidden">

      <div className="px-5 py-4 border-b border-cream-200">
        <h2 className="font-body text-sm font-semibold uppercase tracking-wide text-charcoal-700">
          Categorias ({categorias.length})
        </h2>
      </div>

      <ul className="divide-y divide-cream-100">

        {categorias.map((categoria) => (

          <li
            key={categoria.id}
            className="flex items-center gap-4 px-5 py-4 hover:bg-cream-50 transition"
          >

            <div className="w-14 h-14 rounded-lg overflow-hidden border border-cream-200 bg-cream-50 flex items-center justify-center">

              {categoria.imagem_url ? (

                <img
                  src={categoria.imagem_url}
                  alt={categoria.imagem_alt ?? categoria.nome}
                  className="w-full h-full object-cover"
                />

              ) : (

                <span className="text-xs text-charcoal-400">
                  Sem imagem
                </span>

              )}

            </div>

            <div className="flex-1">

              <div className="font-medium text-charcoal-800">
                {categoria.nome}
              </div>

              <div className="text-xs text-charcoal-400">
                {categoria.slug}
              </div>

            </div>

            <button
              onClick={() => onEditar(categoria)}
              className="p-2 rounded-lg hover:bg-gold-50 text-charcoal-500 hover:text-gold-600 transition"
            >
              <Pencil size={16} />
            </button>

            <button
              onClick={() =>
                deleteCategoria(categoria.id, categoria.nome)
              }
              className="p-2 rounded-lg hover:bg-red-50 text-charcoal-500 hover:text-red-500 transition"
            >
              <Trash2 size={16} />
            </button>

          </li>

        ))}

        {categorias.length === 0 && (

          <li className="px-5 py-10 text-center text-charcoal-400">

            Nenhuma categoria cadastrada.

          </li>

        )}

      </ul>

    </div>
  )
}