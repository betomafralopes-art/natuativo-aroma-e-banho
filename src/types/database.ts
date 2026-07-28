export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categorias: {
  Row: {
    id: string
    nome: string
    slug: string
    descricao: string | null

    imagem_url: string | null
    storage_path: string | null
    imagem_alt: string | null

    ordem: number
    ativo: boolean
    criado_em: string
    updated_at: string
  }

  Insert: {
    id?: string
    nome: string
    slug: string
    descricao?: string | null

    imagem_url?: string | null
    storage_path?: string | null
    imagem_alt?: string | null

    ordem?: number
    ativo?: boolean
    criado_em?: string
    updated_at?: string
  }

  Update: {
    id?: string
    nome?: string
    slug?: string
    descricao?: string | null

    imagem_url?: string | null
    storage_path?: string | null
    imagem_alt?: string | null

    ordem?: number
    ativo?: boolean
    updated_at?: string
  }
}
      produtos: {
        Row: {
          id: string
          nome: string
          slug: string
          descricao: string | null
          beneficios: string[] | null
          preco: number
          preco_original: number | null
          categoria_id: string | null
          ativo: boolean
          lancamento: boolean
          destaque: boolean
          ordem: number
          meta_title: string | null
          meta_desc: string | null
          criado_em: string
          updated_at: string
        }
        Insert: {
          id?: string
          nome: string
          slug: string
          descricao?: string | null
          beneficios?: string[] | null
          preco?: number
          preco_original?: number | null
          categoria_id?: string | null
          ativo?: boolean
          lancamento?: boolean
          destaque?: boolean
          ordem?: number
          meta_title?: string | null
          meta_desc?: string | null
          criado_em?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nome?: string
          slug?: string
          descricao?: string | null
          beneficios?: string[] | null
          preco?: number
          preco_original?: number | null
          categoria_id?: string | null
          ativo?: boolean
          lancamento?: boolean
          destaque?: boolean
          ordem?: number
          meta_title?: string | null
          meta_desc?: string | null
          updated_at?: string
        }
      }
      produto_imagens: {
        Row: {
          id: string
          produto_id: string
          url: string
          storage_path: string | null
          alt: string | null
          principal: boolean
          ordem: number
          criado_em: string
        }
        Insert: {
          id?: string
          produto_id: string
          url: string
          storage_path?: string | null
          alt?: string | null
          principal?: boolean
          ordem?: number
          criado_em?: string
        }
        Update: {
          id?: string
          produto_id?: string
          url?: string
          storage_path?: string | null
          alt?: string | null
          principal?: boolean
          ordem?: number
        }
      }
    }
    Views: {
      produtos_completos: {
        Row: {
          id: string
          nome: string
          slug: string
          descricao: string | null
          beneficios: string[] | null
          preco: number
          preco_original: number | null
          categoria_id: string | null
          categoria_nome: string | null
          categoria_slug: string | null
          ativo: boolean
          lancamento: boolean
          destaque: boolean
          ordem: number
          imagem_principal_url: string | null
          imagem_principal_alt: string | null
          total_imagens: number
          criado_em: string
          updated_at: string
        }
      }
    }
  }
}

// Tipos derivados para uso na aplicação
export type Categoria = Database['public']['Tables']['categorias']['Row']
export type Produto = Database['public']['Tables']['produtos']['Row']
export type ProdutoImagem = Database['public']['Tables']['produto_imagens']['Row']
export type ProdutoCompleto = Database['public']['Views']['produtos_completos']['Row']

export interface ProdutoComImagens extends Produto {
  categorias?: Categoria | null
  produto_imagens?: ProdutoImagem[]
  imagem_principal?: string | null
}
