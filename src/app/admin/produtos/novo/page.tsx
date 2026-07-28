import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import ProductForm from '@/components/admin/ProductForm'
import { getAdminSession } from '@/lib/auth'
import { getCategorias } from '@/lib/produtos'

export default async function NovoProdutoPage() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const categorias = await getCategorias()

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
            <h1 className="font-display text-3xl text-charcoal-800">Novo Produto</h1>
            <p className="font-body text-sm text-charcoal-500 mt-0.5">
              Preencha os dados e salve para depois adicionar imagens.
            </p>
          </div>
        </div>

        <ProductForm categorias={categorias} mode="create" />
      </main>
    </div>
  )
}
