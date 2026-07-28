import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { setProdutoImagemPrincipal } from '@/lib/produtos'

interface Params {
  params: { id: string }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const { produto_id } = await request.json()
    if (!produto_id) return NextResponse.json({ error: 'produto_id obrigatório' }, { status: 400 })

    await setProdutoImagemPrincipal(produto_id, params.id)
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao definir imagem' }, { status: 500 })
  }
}
