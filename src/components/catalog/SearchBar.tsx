'use client'

import { useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export default function SearchBar({
  placeholder = 'Buscar produtos...',
  className = '',
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()
  const [value, setValue] = useState(searchParams.get('busca') || '')

  const handleSearch = (term: string) => {
    setValue(term)
    const params = new URLSearchParams(searchParams.toString())
    if (term) {
      params.set('busca', term)
    } else {
      params.delete('busca')
    }
    params.delete('pagina')
    startTransition(() => {
      router.push(`/catalogo?${params.toString()}`)
    })
  }

  return (
    <div className={`relative ${className}`}>
      <Search
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-400 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="input-field pl-10 pr-10"
      />
      {value && (
        <button
          onClick={() => handleSearch('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600 transition-colors"
          aria-label="Limpar busca"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
