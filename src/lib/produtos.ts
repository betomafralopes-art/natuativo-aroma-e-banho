import { createServerSupabaseClient, createAdminClient } from './supabase/server'
import type { ProdutoCompleto, ProdutoComImagens, Categoria, ProdutoImagem } from '@/types/database'

// ─── Catálogo público ──────────────────────────────────────────────────────

export async function getProdutos(options?: {
  categoria?: string
  busca?: string
  lancamento?: boolean
  destaque?: boolean
  limit?: number
  offset?: number
}): Promise<ProdutoCompleto[]> {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from('produtos_completos')
    .select('*')
    .eq('ativo', true)
    .order('lancamento', { ascending: false })
    .order('ordem', { ascending: true })
    .order('criado_em', { ascending: false })

  if (options?.categoria) {
    query = query.eq('categoria_slug', options.categoria)
  }
  if (options?.lancamento !== undefined) {
    query = query.eq('lancamento', options.lancamento)
  }
  if (options?.destaque !== undefined) {
    query = query.eq('destaque', options.destaque)
  }
  if (options?.busca) {
    query = query.ilike('nome', `%${options.busca}%`)
  }
  if (options?.limit) {
    query = query.limit(options.limit)
  }
  if (options?.offset) {
    query = query.range(options.offset, (options.offset + (options.limit || 20)) - 1)
  }

  const { data, error } = await query
  if (error) {
    console.error('Erro ao buscar produtos:', error)
    return []
  }
  return data || []
}

export async function getProdutoBySlug(slug: string): Promise<ProdutoComImagens | null> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from('produtos')
    .select(`
      *,
      categorias (*),
      produto_imagens (*)
    `)
    .eq('slug', slug)
    .eq('ativo', true)
    .single()

  if (error || !data) return null

  const imagens = ((data as any).produto_imagens as ProdutoImagem[]) || []
  const principal = imagens.find(i => i.principal)?.url || imagens[0]?.url || null

  return {
  ...(data as any),
  imagem_principal: principal,
  produto_imagens: imagens.sort(
  (a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)
),
} as ProdutoComImagens
}

export async function getCategorias(): Promise<Categoria[]> {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .eq('ativo', true)
    .order('ordem', { ascending: true })

  if (error) return []
  return data || []
}

// ─── Admin ─────────────────────────────────────────────────────────────────

export async function getAdminProdutos(options?: {
  busca?: string
  categoria?: string
}) {
  const supabase = createAdminClient()

  let query = supabase
    .from('produtos')
    .select(`
      *,
      categorias (id, nome, slug),
      produto_imagens (id, url, principal, ordem)
    `)
    .order('criado_em', { ascending: false })

  if (options?.busca) {
    query = query.ilike('nome', `%${options.busca}%`)
  }
  if (options?.categoria) {
    query = query.eq('categoria_id', options.categoria)
  }

  const { data, error } = await query
  if (error) {
    console.error('Admin - Erro ao buscar produtos:', error)
    return []
  }
  return data || []
}

export async function getAdminProdutoById(id: string): Promise<ProdutoComImagens | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
  .from('produtos')
  .select(`
    *,
    categorias (*),
    produto_imagens (*)
  `)
  .eq('id', id)
  .single()

if (error || !data) return null

const imagens = ((data as any).produto_imagens as ProdutoImagem[]) || []

const principal =
  imagens.find((i) => i.principal)?.url ||
  imagens[0]?.url ||
  null

return {
  ...(data as any),
  imagem_principal: principal,
  produto_imagens: imagens.sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0)),
} as ProdutoComImagens
}

export async function createProduto(dados: {
  nome: string
  descricao?: string
  beneficios?: string[]
  preco: number
  preco_original?: number
  categoria_id?: string
  ativo?: boolean
  lancamento?: boolean
  destaque?: boolean
}) {
  const supabase = createAdminClient()
  const { slugify } = await import('./utils')

  // Gerar slug único
  let slug = slugify(dados.nome)
  const { data: existing } = await supabase
    .from('produtos')
    .select('slug')
    .like('slug', `${slug}%`)

  if (existing && existing.length > 0) {
    slug = `${slug}-${Date.now()}`
  }

  const { data, error } = await supabase
    .from('produtos')
    .insert({ ...dados, slug })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateProduto(id: string, dados: Record<string, unknown>) {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('produtos')
    .update({ ...dados, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProduto(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('produtos').delete().eq('id', id)
  if (error) throw error
}

export async function uploadProdutoImagem(
  produtoId: string,
  file: File,
  principal = false
) {
  const supabase = createAdminClient()
  const ext = file.name.split('.').pop()
  const path = `${produtoId}/${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from('produto-imagens')
    .upload(path, file, { upsert: false })

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('produto-imagens')
    .getPublicUrl(path)

  if (principal) {
    await supabase
      .from('produto_imagens')
      .update({ principal: false })
      .eq('produto_id', produtoId)
  }

  const { data, error } = await supabase
    .from('produto_imagens')
    .insert({
      produto_id: produtoId,
      url: publicUrl,
      storage_path: path,
      alt: '',
      principal,
      ordem: 0,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteProdutoImagem(imagemId: string, storagePath?: string) {
  const supabase = createAdminClient()

  if (storagePath) {
    await supabase.storage.from('produto-imagens').remove([storagePath])
  }

  const { error } = await supabase
    .from('produto_imagens')
    .delete()
    .eq('id', imagemId)

  if (error) throw error
}

export async function setProdutoImagemPrincipal(produtoId: string, imagemId: string) {
  const supabase = createAdminClient()

  await supabase
    .from('produto_imagens')
    .update({ principal: false })
    .eq('produto_id', produtoId)

  const { error } = await supabase
    .from('produto_imagens')
    .update({ principal: true })
    .eq('id', imagemId)

  if (error) throw error
}
