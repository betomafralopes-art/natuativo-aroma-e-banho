import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { createProduto } from '@/lib/produtos'

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const body = await request.json()
    const produto = await createProduto(body)
    return NextResponse.json({ produto }, { status: 201 })
  } catch (err: any) {
    console.error('Create product error:', err)
    return NextResponse.json({ error: err.message || 'Erro ao criar produto' }, { status: 500 })
  }
}
