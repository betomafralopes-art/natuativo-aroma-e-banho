import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function getWhatsAppUrl(message?: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5548996350861'
  const text = message || 'Olá! Vi o produto no catálogo da Natuativo Aroma & Banho e gostaria de mais informações.'
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

export function getWhatsAppProductUrl(productName: string): string {
  const message = `Olá! Vi o produto "${productName}" no catálogo da Natuativo Aroma & Banho e gostaria de mais informações.`
  return getWhatsAppUrl(message)
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '…'
}

export function getImagePlaceholder(): string {
  return '/images/placeholder-product.webp'
}
