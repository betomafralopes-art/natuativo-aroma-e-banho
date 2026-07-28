'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'

import type { Categoria } from '@/types/database'

interface CategoriaFormProps {
  categoria: Categoria | null
  onCancelar: () => void
}

export default function CategoriaForm({
  categoria,
  onCancelar,
}: CategoriaFormProps) {

  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)  

const [preview, setPreview] = useState<string | null>(null)
const [imagem, setImagem] = useState<File | null>(null)

const [nome, setNome] = useState('')
const [slug, setSlug] = useState('')
const [descricao, setDescricao] = useState('')

useEffect(() => {
  if (!categoria) {
    setNome('')
    setSlug('')
    setDescricao('')
    setPreview(null)
    setImagem(null)

    if (inputRef.current) {
      inputRef.current.value = ''
    }

    return
  }

  setNome(categoria.nome)
  setSlug(categoria.slug)
  setDescricao(categoria.descricao ?? '')
  setPreview(categoria.imagem_url)
  setImagem(null)

  if (inputRef.current) {
    inputRef.current.value = ''
  }
}, [categoria])

async function salvarCategoria() {

  if (!nome.trim()) {
    alert('Informe o nome da categoria')
    return
  }

  try {

let imagemUrl = ''
let storagePath = ''

if (imagem) {

  const formData = new FormData()

  formData.append('file', imagem)

  const uploadResponse = await fetch('/api/admin/categorias/upload', {
    method: 'POST',
    body: formData,
  })

  const uploadData = await uploadResponse.json()
  console.log('UPLOAD:', uploadData)

  if (!uploadResponse.ok) {
    throw new Error(uploadData.error)
  }

  imagemUrl = uploadData.url
  storagePath = uploadData.path

}

console.log({
  nome,
  slug,
  descricao,
  imagemUrl,
  storagePath,
})

    const response = await fetch(
     categoria
    ? `/api/admin/categorias/${categoria.id}`
    : '/api/admin/categorias',
  {
    method: categoria ? 'PUT' : 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      nome,
      slug,
      descricao,

      imagem_url: imagemUrl || categoria?.imagem_url,
      storage_path: storagePath || categoria?.storage_path,
      imagem_alt: nome,
    }),
  }
)

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

 alert(
  categoria
    ? 'Categoria atualizada com sucesso!'
    : 'Categoria criada com sucesso!'
)

     setNome('')
     setSlug('')
     setDescricao('')
     setPreview(null)
     setImagem(null)

     onCancelar()

     if (inputRef.current) {
     inputRef.current.value = ''
     }

     router.refresh()

} catch (error: any) {
    alert(error.message)

     }

}

  return (
    <div className="bg-white rounded-xl border border-cream-200 p-6">

      <h2 className="font-display text-2xl text-charcoal-800 mb-6">
       {categoria ? 'Editar Categoria' : 'Nova Categoria'}
      </h2>

<div className="mb-6">

  <label className="block text-sm font-medium mb-2">
    Imagem da Categoria
  </label>

  <div className="border-2 border-dashed border-cream-300 rounded-xl p-6 text-center bg-cream-50">

    <div className="w-full h-72 rounded-xl overflow-hidden bg-white border border-cream-200 flex items-center justify-center">

      {preview ? (
  <img
    src={preview}
    alt="Preview"
    className="w-full h-full object-cover"
  />
) : (
  <span className="text-charcoal-400 text-sm">
    Sem imagem
  </span>
)}

    </div>

<button
  type="button"
  onClick={() => inputRef.current?.click()}
  className="mt-4 w-full py-3 rounded-xl bg-gold-500 text-white font-medium hover:bg-gold-600 transition"
>
  Escolher imagem
</button>

<input
  ref={inputRef}
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files?.[0]
     if (!file) return

     setImagem(file)
     setPreview(URL.createObjectURL(file))
  }}
/>

  </div>

</div>

      <div className="space-y-5">

        <div>
          <label className="block text-sm font-medium mb-2">
            Nome
          </label>

          <input
             type="text"
             placeholder="Ex.: Sabonetes Artesanais"
             className="input-field w-full"
             value={nome}
             onChange={(e) => {
             setNome(e.target.value)
             setSlug(slugify(e.target.value))
           }}
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Slug
          </label>

          <input
             type="text"
             placeholder="sabonetes-artesanais"
             className="input-field w-full"
             value={slug}
             onChange={(e) => setSlug(e.target.value)}
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Descrição
          </label>

          <textarea
             rows={4}
             placeholder="Descrição da categoria..."
             className="input-field w-full"
             value={descricao}
             onChange={(e) => setDescricao(e.target.value)}
/>
        </div>
<div className="flex justify-end gap-3 pt-6">

  <button
    type="button"
    onClick={onCancelar}
    className="px-5 py-3 rounded-xl border border-cream-300 hover:bg-cream-100 transition"
  >
    Cancelar
  </button>

  <button
  type="button"
  onClick={salvarCategoria}
  className="px-6 py-3 rounded-xl bg-gold-500 text-white font-medium hover:bg-gold-600 transition"
>
  {categoria ? 'Atualizar Categoria' : 'Salvar Categoria'}
</button>

</div>
      </div>

    </div>
  )
}