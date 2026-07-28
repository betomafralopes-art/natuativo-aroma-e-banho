import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })

  try {
    const formData = await request.formData()
    const produtoId = formData.get('produto_id') as string
    const isPrincipal = formData.get('principal') === 'true'
    const files = formData.getAll('files') as File[]

    if (!produtoId || files.length === 0) {
      return NextResponse.json({ error: 'produto_id e arquivos são obrigatórios' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const imagens: any[] = []

    // Se vai definir como principal, limpa as existentes
    if (isPrincipal) {
      await supabase
        .from('produto_imagens')
        .update({ principal: false })
        .eq('produto_id', produtoId)
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const path = `${produtoId}/${Date.now()}-${i}.${ext}`

      const buffer = Buffer.from(await file.arrayBuffer())

      const { error: uploadError } = await supabase.storage
        .from('produto-imagens')
        .upload(path, buffer, {
          contentType: file.type,
          upsert: false,
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        continue
      }

      const { data: { publicUrl } } = supabase.storage
        .from('produto-imagens')
        .getPublicUrl(path)

      const principal = isPrincipal && i === 0

      const { data: img, error: dbError } = await supabase
        .from('produto_imagens')
        .insert({
          produto_id: produtoId,
          url: publicUrl,
          storage_path: path,
          alt: '',
          principal,
          ordem: i,
        })
        .select()
        .single()

      if (!dbError && img) {
        imagens.push(img)
      }
    }

    return NextResponse.json({ imagens }, { status: 201 })
  } catch (err: any) {
    console.error('Upload route error:', err)
    return NextResponse.json({ error: err.message || 'Erro no upload' }, { status: 500 })
  }
}
