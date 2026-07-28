import { redirect } from 'next/navigation'

import AdminSidebar from '@/components/admin/AdminSidebar'

import { getAdminSession } from '@/lib/auth'
import { getCategorias } from '@/lib/produtos'

import AdminCategoriasContainer from './AdminCategoriasContainer'

export const revalidate = 0

export default async function AdminCategoriasPage() {
  const session = await getAdminSession()

  if (!session) {
    redirect('/admin/login')
  }

  const categorias = await getCategorias()

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 ml-60 p-8">

        <div className="mb-8">
          <h1 className="font-display text-3xl text-charcoal-800">
            Categorias
          </h1>

          <p className="font-body text-sm text-charcoal-500 mt-1">
            Gerencie as categorias do catálogo.
          </p>
        </div>

        <AdminCategoriasContainer categorias={categorias} />

      </main>
    </div>
  )
}