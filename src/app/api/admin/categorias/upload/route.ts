import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
 
 console.log('🔥 UPLOAD DA CATEGORIA FOI CHAMADO')
 
    const admin = await requireAdmin(request)

  if (!admin) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    )
  }

  try {
    const formData = await request.formData()

    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Imagem obrigatória' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    const ext = file.name.split('.').pop()

    const path = `categorias/${Date.now()}.${ext}`

    const buffer = Buffer.from(await file.arrayBuffer())

    const { error } = await supabase.storage
      .from('produto-imagens')
      .upload(path, buffer, {
        contentType: file.type,
      })

    if (error) throw error

    const {
      data: { publicUrl },
    } = supabase.storage
      .from('produto-imagens')
      .getPublicUrl(path)

    return NextResponse.json({
      url: publicUrl,
      path,
    })

  } catch (err: any) {

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )

  }
}