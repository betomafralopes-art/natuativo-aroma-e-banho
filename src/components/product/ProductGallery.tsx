'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProdutoImagem {
  id: string
  url: string
  alt: string | null
}

interface ProductGalleryProps {
  nome: string
  imagemPrincipal: string | null
  imagens: ProdutoImagem[]
  lancamento?: boolean
}

export default function ProductGallery({
  nome,
  imagemPrincipal,
  imagens,
  lancamento,
}: ProductGalleryProps) {
  const todasImagens = [
    ...(imagemPrincipal
      ? [
          {
            id: 'principal',
            url: imagemPrincipal,
            alt: nome,
          },
        ]
      : []),
    ...imagens.filter((img) => img.url !== imagemPrincipal),
  ]

  const [imagemSelecionada, setImagemSelecionada] = useState(
    todasImagens[0] || null
  )

  return (
    <div className="p-5 md:p-8">
      <div
        className="relative h-[420px] md:h-[620px] rounded-2xl overflow-hidden bg-white border border-cream-200 mb-6"
       >
        {imagemSelecionada ? (
          <Image
            src={imagemSelecionada.url}
            alt={imagemSelecionada.alt || nome}
            fill
            priority
            className="object-contain p-6 md:p-10 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            Sem imagem
          </div>
        )}

        {lancamento && (
          <div className="absolute top-4 left-4">
            <span className="badge-lancamento">
              ✦ Lançamento
            </span>
          </div>
        )}
      </div>

      {todasImagens.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {todasImagens.map((img) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setImagemSelecionada(img)}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                imagemSelecionada?.id === img.id
                  ? 'border-gold-500'
                  : 'border-cream-200 hover:border-gold-300'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || nome}
                fill
                className="object-contain p-1"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}