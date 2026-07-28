import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ProductForm from '@/components/admin/ProductForm'
import { getAdminSession } from '@/lib/auth'
import { getAdminProdutoById, getCategorias } from '@/lib/produtos'

export const revalidate = 0

interface EditProdutoPageProps {
  params: { id: string }
}

export default async function EditProdutoPage({ params }: EditProdutoPageProps) {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const [produto, categorias] = await Promise.all([
    getAdminProdutoById(params.id),
    getCategorias(),
  ])

  if (!produto) notFound()

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/produtos"
            className="p-2 rounded-lg hover:bg-cream-200 transition-colors text-charcoal-500 hover:text-charcoal-700"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="font-display text-3xl text-charcoal-800">Editar Produto</h1>
            <p className="font-body text-sm text-charcoal-500 mt-0.5 truncate max-w-md">
              {produto.nome}
            </p>
          </div>
        </div>

        <ProductForm produto={produto} categorias={categorias} mode="edit" />
      </main>
    </div>
  )
}
