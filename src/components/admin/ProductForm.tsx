'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Plus, Trash2, Star, Upload, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Categoria } from '@/types/database'

interface ProductFormProps {
  produto?: any
  categorias: Categoria[]
  mode: 'create' | 'edit'
}

export default function ProductForm({ produto, categorias, mode }: ProductFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)

  const [form, setForm] = useState({
    nome: produto?.nome || '',
    descricao: produto?.descricao || '',
    preco: produto?.preco?.toString() || '',
    preco_original: produto?.preco_original?.toString() || '',
    categoria_id: produto?.categoria_id || '',
    ativo: produto?.ativo ?? true,
    lancamento: produto?.lancamento ?? false,
    destaque: produto?.destaque ?? false,
  })

  const [beneficios, setBeneficios] = useState<string[]>(produto?.beneficios || [''])
  const [imagens, setImagens] = useState<any[]>(
    (produto?.produto_imagens || []).sort((a: any, b: any) => a.ordem - b.ordem)
  )

  const updateField = (field: string, value: any) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const updateBeneficio = (i: number, val: string) => {
    const arr = [...beneficios]
    arr[i] = val
    setBeneficios(arr)
  }

  const addBeneficio = () => setBeneficios(prev => [...prev, ''])

  const removeBeneficio = (i: number) =>
    setBeneficios(prev => prev.filter((_, idx) => idx !== i))

  const handleImageUpload = async (files: FileList) => {
    if (!produto?.id) {
      toast.error('Salve o produto primeiro para adicionar imagens.')
      return
    }

    setUploadingImages(true)
    const formData = new FormData()
    Array.from(files).forEach(f => formData.append('files', f))
    formData.append('produto_id', produto.id)
    formData.append('principal', imagens.length === 0 ? 'true' : 'false')

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      setImagens(prev => [...prev, ...data.imagens])
      toast.success(`${data.imagens.length} imagem(ns) adicionada(s)`)
    } catch (err: any) {
      toast.error(err.message || 'Erro ao fazer upload')
    } finally {
      setUploadingImages(false)
    }
  }

  const handleSetPrincipal = async (imagemId: string) => {
    try {
      await fetch(`/api/admin/imagens/${imagemId}/principal`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produto_id: produto.id }),
      })
      setImagens(prev =>
        prev.map(img => ({ ...img, principal: img.id === imagemId }))
      )
      toast.success('Imagem principal definida')
    } catch {
      toast.error('Erro ao definir imagem principal')
    }
  }

  const handleDeleteImage = async (imagemId: string, storagePath?: string) => {
    if (!confirm('Excluir esta imagem?')) return
    try {
      await fetch(`/api/admin/imagens/${imagemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storage_path: storagePath }),
      })
      setImagens(prev => prev.filter(img => img.id !== imagemId))
      toast.success('Imagem excluída')
    } catch {
      toast.error('Erro ao excluir imagem')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      ...form,
      preco: parseFloat(form.preco) || 0,
      preco_original: form.preco_original ? parseFloat(form.preco_original) : null,
      beneficios: beneficios.filter(b => b.trim()),
    }

    try {
      const url = mode === 'create' ? '/api/admin/produtos' : `/api/admin/produtos/${produto.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      toast.success(mode === 'create' ? 'Produto criado!' : 'Produto atualizado!')

      if (mode === 'create') {
        router.push(`/admin/produtos/${data.produto.id}`)
      } else {
        router.refresh()
      }
    } catch (err: any) {
      toast.error(err.message || 'Erro ao salvar produto')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) return

    try {
      const res = await fetch(`/api/admin/produtos/${produto.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      toast.success('Produto excluído')
      router.push('/admin/produtos')
    } catch {
      toast.error('Erro ao excluir produto')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main fields */}
        <div className="lg:col-span-2 space-y-5">

          {/* Card: Informações Básicas */}
          <div className="bg-white rounded-xl border border-cream-200 p-6 space-y-4">
            <h3 className="font-body text-sm font-semibold text-charcoal-700 uppercase tracking-wide">
              Informações Básicas
            </h3>

            <div>
              <label className="block font-body text-xs font-medium text-charcoal-600 mb-1.5 uppercase tracking-wide">
                Nome do Produto *
              </label>
              <input
                type="text"
                value={form.nome}
                onChange={e => updateField('nome', e.target.value)}
                required
                className="input-field"
                placeholder="Ex: Sabonete Artesanal de Lavanda"
              />
            </div>

            <div>
              <label className="block font-body text-xs font-medium text-charcoal-600 mb-1.5 uppercase tracking-wide">
                Descrição
              </label>
              <textarea
                value={form.descricao}
                onChange={e => updateField('descricao', e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Descreva o produto com carinho..."
              />
            </div>

            <div>
              <label className="block font-body text-xs font-medium text-charcoal-600 mb-1.5 uppercase tracking-wide">
                Categoria
              </label>
              <select
                value={form.categoria_id}
                onChange={e => updateField('categoria_id', e.target.value)}
                className="input-field"
              >
                <option value="">Sem categoria</option>
                {categorias.map(c => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Card: Preço */}
          <div className="bg-white rounded-xl border border-cream-200 p-6 space-y-4">
            <h3 className="font-body text-sm font-semibold text-charcoal-700 uppercase tracking-wide">
              Preço
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-body text-xs font-medium text-charcoal-600 mb-1.5 uppercase tracking-wide">
                  Preço (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.preco}
                  onChange={e => updateField('preco', e.target.value)}
                  required
                  className="input-field"
                  placeholder="0,00"
                />
              </div>
              <div>
                <label className="block font-body text-xs font-medium text-charcoal-600 mb-1.5 uppercase tracking-wide">
                  Preço Original (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={form.preco_original}
                  onChange={e => updateField('preco_original', e.target.value)}
                  className="input-field"
                  placeholder="Deixe vazio se não há desconto"
                />
              </div>
            </div>
          </div>

          {/* Card: Benefícios */}
          <div className="bg-white rounded-xl border border-cream-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-body text-sm font-semibold text-charcoal-700 uppercase tracking-wide">
                Benefícios
              </h3>
              <button
                type="button"
                onClick={addBeneficio}
                className="flex items-center gap-1.5 font-body text-xs text-gold-600 hover:text-gold-700 transition-colors"
              >
                <Plus size={14} />
                Adicionar
              </button>
            </div>
            <div className="space-y-2">
              {beneficios.map((b, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    type="text"
                    value={b}
                    onChange={e => updateBeneficio(i, e.target.value)}
                    className="input-field text-sm py-2"
                    placeholder={`Benefício ${i + 1}...`}
                  />
                  {beneficios.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeBeneficio(i)}
                      className="p-2 text-charcoal-400 hover:text-red-500 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card: Imagens */}
          <div className="bg-white rounded-xl border border-cream-200 p-6 space-y-4">
            <h3 className="font-body text-sm font-semibold text-charcoal-700 uppercase tracking-wide">
              Imagens
            </h3>

            {mode === 'create' && (
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <p className="font-body text-xs text-amber-700">
                  💡 Salve o produto primeiro para adicionar imagens.
                </p>
              </div>
            )}

            {mode === 'edit' && (
              <>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-cream-300 rounded-xl p-8 text-center cursor-pointer hover:border-gold-400 transition-colors group"
                >
                  <Upload size={24} className="mx-auto text-charcoal-400 mb-2 group-hover:text-gold-500 transition-colors" />
                  <p className="font-body text-sm text-charcoal-500">
                    Clique para fazer upload de imagens
                  </p>
                  <p className="font-body text-xs text-charcoal-400 mt-1">
                    JPG, PNG ou WebP — máx. 5MB cada
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    className="hidden"
                    onChange={e => e.target.files && handleImageUpload(e.target.files)}
                  />
                </div>

                {uploadingImages && (
                  <div className="flex items-center gap-2 font-body text-sm text-charcoal-500">
                    <Loader2 size={16} className="animate-spin" />
                    Enviando imagens...
                  </div>
                )}

                {imagens.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {imagens.map(img => (
                      <div
                        key={img.id}
                        className={`relative group rounded-lg overflow-hidden border-2 transition-colors ${
                          img.principal ? 'border-gold-500' : 'border-cream-200'
                        }`}
                        style={{ aspectRatio: '1/1' }}
                      >
                        <Image
                          src={img.url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="100px"
                        />

                        {img.principal && (
                          <div className="absolute top-1 left-1">
                            <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-gold-500 text-white rounded text-xs">
                              <Star size={9} fill="white" />
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                          {!img.principal && (
                            <button
                              type="button"
                              onClick={() => handleSetPrincipal(img.id)}
                              className="p-1.5 bg-white rounded-lg hover:bg-gold-50 transition-colors"
                              title="Definir como principal"
                            >
                              <Star size={14} className="text-gold-600" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(img.id, img.storage_path)}
                            className="p-1.5 bg-white rounded-lg hover:bg-red-50 transition-colors"
                            title="Excluir imagem"
                          >
                            <Trash2 size={14} className="text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">

          {/* Status */}
          <div className="bg-white rounded-xl border border-cream-200 p-5 space-y-4">
            <h3 className="font-body text-sm font-semibold text-charcoal-700 uppercase tracking-wide">
              Configurações
            </h3>

            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="font-body text-sm text-charcoal-700">Ativo (visível no catálogo)</span>
              <button
                type="button"
                onClick={() => updateField('ativo', !form.ativo)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  form.ativo ? 'bg-gold-500' : 'bg-cream-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                    form.ativo ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="font-body text-sm text-charcoal-700">Marcar como Lançamento</span>
              <button
                type="button"
                onClick={() => updateField('lancamento', !form.lancamento)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  form.lancamento ? 'bg-gold-500' : 'bg-cream-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                    form.lancamento ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>

            <label className="flex items-center justify-between gap-3 cursor-pointer">
              <span className="font-body text-sm text-charcoal-700">Produto em Destaque</span>
              <button
                type="button"
                onClick={() => updateField('destaque', !form.destaque)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  form.destaque ? 'bg-gold-500' : 'bg-cream-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                    form.destaque ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl border border-cream-200 p-5 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={15} className="animate-spin" />
                  Salvando...
                </span>
              ) : (
                mode === 'create' ? 'Criar Produto' : 'Salvar Alterações'
              )}
            </button>

            {mode === 'edit' && produto && (
              <>
                <a
                  href={`/produto/${produto.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full text-sm py-3"
                >
                  Ver na Loja
                </a>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full py-3 rounded-lg font-body text-sm font-medium text-red-500 hover:bg-red-50 transition-colors border border-red-200"
                >
                  Excluir Produto
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
