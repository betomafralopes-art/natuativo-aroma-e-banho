import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Eye, EyeOff } from 'lucide-react'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { getAdminSession } from '@/lib/auth'
import { getAdminProdutos, getCategorias } from '@/lib/produtos'
import { formatCurrency } from '@/lib/utils'

export const revalidate = 0

export default async function AdminProdutosPage({
  searchParams,
}: {
  searchParams: { busca?: string; categoria?: string }
}) {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const [produtos, categorias] = await Promise.all([
    getAdminProdutos({ busca: searchParams.busca, categoria: searchParams.categoria }),
    getCategorias(),
  ])

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <main className="flex-1 ml-60 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-charcoal-800">Produtos</h1>
            <p className="font-body text-sm text-charcoal-500 mt-1">
              {produtos.length} produto{produtos.length !== 1 ? 's' : ''} cadastrado{produtos.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link href="/admin/produtos/novo" className="btn-gold text-sm">
            <Plus size={16} />
            Novo Produto
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center border border-cream-200">
          <form className="flex gap-3 flex-1 flex-wrap">
            <input
              type="text"
              name="busca"
              defaultValue={searchParams.busca}
              placeholder="Buscar produto..."
              className="input-field flex-1 min-w-48 max-w-xs text-sm py-2"
            />
            <select
              name="categoria"
              defaultValue={searchParams.categoria}
              className="input-field w-48 text-sm py-2"
            >
              <option value="">Todas as categorias</option>
              {categorias.map(c => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
            <button type="submit" className="btn-gold text-sm py-2 px-5">
              Filtrar
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-cream-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-cream-200">
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide">
                  Produto
                </th>
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide hidden md:table-cell">
                  Categoria
                </th>
                <th className="text-left px-4 py-3 font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide">
                  Preço
                </th>
                <th className="text-center px-4 py-3 font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide hidden sm:table-cell">
                  Status
                </th>
                <th className="text-center px-4 py-3 font-body text-xs font-semibold text-charcoal-500 uppercase tracking-wide hidden sm:table-cell">
                  Lançamento
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {produtos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-16 text-center font-body text-sm text-charcoal-400">
                    Nenhum produto encontrado.{' '}
                    <Link href="/admin/produtos/novo" className="text-gold-600 hover:underline">
                      Criar primeiro produto
                    </Link>
                  </td>
                </tr>
              ) : (
                produtos.map((produto: any) => {
                  const imagemPrincipal = produto.produto_imagens?.find((i: any) => i.principal)?.url
                    || produto.produto_imagens?.[0]?.url

                  return (
                    <tr
                      key={produto.id}
                      className="border-b border-cream-100 hover:bg-cream-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-cream-200 shrink-0">
                            {imagemPrincipal ? (
                              <Image src={imagemPrincipal} alt={produto.nome} fill className="object-cover" sizes="40px" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-cream-400">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className="font-body text-sm text-charcoal-700 font-medium">{produto.nome}</span>
                        </div>
                      </td>

                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="font-body text-xs text-charcoal-500">
                          {produto.categorias?.nome || '—'}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <span className="font-body text-sm font-semibold text-gold-600">
                          {formatCurrency(produto.preco)}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-body font-medium ${
                            produto.ativo
                              ? 'bg-green-100 text-green-700'
                              : 'bg-cream-200 text-charcoal-500'
                          }`}
                        >
                          {produto.ativo ? 'Ativo' : 'Oculto'}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        {produto.lancamento ? (
                          <span className="badge-lancamento text-xs">✦</span>
                        ) : (
                          <span className="text-charcoal-300 text-xs">—</span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/produtos/${produto.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs font-medium text-gold-600 hover:bg-gold-50 transition-colors border border-gold-200"
                        >
                          <Pencil size={12} />
                          Editar
                        </Link>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
