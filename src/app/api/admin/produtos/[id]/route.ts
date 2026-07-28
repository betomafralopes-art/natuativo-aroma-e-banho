import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { updateProduto, deleteProduto } from '@/lib/produtos'

interface Params {
  params: { id: string }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const body = await request.json()
    const produto = await updateProduto(params.id, body)
    return NextResponse.json({ produto })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao atualizar' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    await deleteProduto(params.id)
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao excluir' }, { status: 500 })
  }
}
