import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const {
    nome,
    slug,
    descricao,
    imagem_url,
    storage_path,
    imagem_alt,
} = await request.json()

    if (!nome || !slug) return NextResponse.json({ error: 'Nome e slug obrigatórios' }, { status: 400 })

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('categorias')
      .insert({
  nome,
  slug,
  descricao,
  imagem_url,
  storage_path,
  imagem_alt,

})
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ categoria: data }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Erro ao criar categoria' }, { status: 500 })
  }
}
