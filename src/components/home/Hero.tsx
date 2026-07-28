import Link from 'next/link'
import { Leaf, Sparkles, Truck } from 'lucide-react'
import Image from "next/image"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FBF8F2] min-h-[100svh] md:min-h-[92vh] flex items-center">

      {/* Fundo */}
      <div className="absolute inset-0">
        <Image
  src="/images/flor_vetorizada.svg"
  alt=""
  width={900}
  height={900}
  priority
  className="
    absolute
    -top-[-320px]
    left-[-320px]
    rotate-[-35deg]
    opacity-[0.08]
    pointer-events-none
    select-none
  "
/>

<Image
  src="/images/flor_vetorizada.svg"
  alt=""
  width={900}
  height={900}
  priority
  className="
    absolute
    top-[-340px]
    right-[-290px]
    rotate-[165deg]
    opacity-[0.08]
    pointer-events-none
    select-none
  "
/>
        

        {/* Gradiente */}
        <div
          className="absolute inset-0"
          style={{
            background:
               'radial-gradient(circle at center, rgba(201,168,76,.05) 0%, rgba(251,248,242,0) 45%)',
          }}
        />

        {/* Mancha creme */}
        <div
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(226,215,188,.35), transparent 72%)',
          }}
        />

        {/* Mancha dourada */}
        <div
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
          style={{
            background: 'rgba(201,168,76,.06)',
          }}
        />

      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">

        {/* Linha superior */}
        <div className="mb-10 mt-10 flex items-center gap-4">

          <span className="h-px w-10 bg-gold-400" />

          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-600">
            Artesanal
          </span>

          <span className="h-px w-10 bg-gold-400" />

        </div>

        {/* Título */}
        <h1 className="max-w-5xl font-display text-[2.9rem] leading-tight text-charcoal-900 md:text-7xl">

          Arte, aroma e

          <br />

          <span className="text-gold-500">
            cuidado
          </span>

          <br />

          em cada criação

        </h1>

        <div className="mt-6 flex items-center justify-center gap-6">

  <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-gold-300" />

  <Leaf
    size={20}
    className="text-gold-500"
    strokeWidth={1.8}
  />

  <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-gold-300" />

</div>

        {/* Texto */}
        <p className="mt-5 max-w-2xl mx-auto text-lg leading-9 text-charcoal-600 text-center">

  Produtos artesanais que transformam o autocuidado
  <br />
  em momentos de bem-estar, feitos com carinho.

</p>

        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">

  <Link
    href="/catalogo"
    className="btn-gold px-10 py-4 text-sm"
  >
    Ver Catálogo Completo
  </Link>

  <a
    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5548996350861'}?text=${encodeURIComponent(
      'Olá! Gostaria de conhecer os produtos da Natuativo Aroma & Banho.'
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="btn-gold px-10 py-4 text-sm"
  >
    Fale Conosco
  </a>

</div>

<div className="mt-12 mb-10 flex items-center justify-center gap-4">

  <div className="h-px w-24 md:w-80 bg-gradient-to-r from-transparent to-gold-200" />

  <div className="w-2 h-2 rounded-full bg-gold-400" />

  <div className="h-px w-24 md:w-80 bg-gradient-to-l from-transparent to-gold-200" />

</div>

<div className="mt-10 flex flex-wrap items-center justify-center gap-5 md:gap-8 text-sm text-charcoal-600">

  <div className="flex items-center gap-2">
    <Leaf
  size={18}
  className="text-gold-500"
  strokeWidth={2}
/>
    <span>Produção artesanal</span>
  </div>

  <div className="flex items-center gap-2">
    <Sparkles
  size={18}
  className="text-gold-500"
  strokeWidth={2}
/>
    <span>Ingredientes selecionados</span>
  </div>

  <div className="flex items-center gap-2">
    <Truck
  size={18}
  className="text-gold-500"
  strokeWidth={2}
/>
    <span>Enviamos para todo o Brasil</span>
  </div>

</div>

      </div>

    </section>
  )
}