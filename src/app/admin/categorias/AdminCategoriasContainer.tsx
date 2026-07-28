'use client'

import { useState } from 'react'

import type { Categoria } from '@/types/database'

import AdminCategoriasClient from './AdminCategoriasClient'
import CategoriaForm from '@/components/admin/CategoriaForm'

interface Props {
  categorias: Categoria[]
}

export default function AdminCategoriasContainer({ categorias }: Props) {
  const [categoriaEditando, setCategoriaEditando] =
    useState<Categoria | null>(null)

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2">
        <AdminCategoriasClient
          categorias={categorias}
          onEditar={setCategoriaEditando}
        />
      </div>

      <div>
        <CategoriaForm
          categoria={categoriaEditando}
          onCancelar={() => setCategoriaEditando(null)}
        />
      </div>
    </div>
  )
}