import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { deleteProdutoImagem } from '@/lib/produtos'

interface Params {
  params: { id: string }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const body = await request.json().catch(() => ({}))
    await deleteProdutoImagem(params.id, body?.storage_path)
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao excluir imagem' }, { status: 500 })
  }
}
