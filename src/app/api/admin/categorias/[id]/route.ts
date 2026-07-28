import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

interface Params {
  params: {
    id: string
  }
}

export async function PUT(
  request: NextRequest,
  { params }: Params
) {
  const admin = await requireAdmin(request)

  if (!admin) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    )
  }

  try {
    const {
      nome,
      slug,
      descricao,
      imagem_url,
      storage_path,
      imagem_alt,
    } = await request.json()

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('categorias')
      .update({
        nome,
        slug,
        descricao,
        imagem_url,
        storage_path,
        imagem_alt,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      categoria: data,
    })

  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || 'Erro ao atualizar categoria',
      },
      {
        status: 500,
      }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  const admin = await requireAdmin(request)

  if (!admin) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    )
  }

  try {
    const supabase = createAdminClient()

    const { error } = await supabase
      .from('categorias')
      .delete()
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({
      ok: true,
    })

  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message || 'Erro ao excluir categoria',
      },
      {
        status: 500,
      }
    )
  }
}