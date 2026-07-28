import type { Metadata } from 'next'
import {  Cormorant_Garamond,  Jost,  DM_Sans,} from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import CartProvider from '@/components/commerce/cart/CartProvider'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Natuativo Aroma & Banho | Arte, aroma e cuidado em cada criação',
    template: '%s | Natuativo Aroma & Banho',
  },
  description:
    'Produtos artesanais que transformam o autocuidado em momentos de bem-estar, com aromas que encantam e inspiram. Sabonetes artesanais, body splash, aromatizadores e muito mais.',
  keywords: [
    'sabonetes artesanais', 'body splash', 'aromatizadores', 'escalda pés',
    'produtos naturais', 'autocuidado', 'bem-estar', 'Palhoça SC', 'natuativo',
  ],
  authors: [{ name: 'Natuativo Aroma & Banho' }],
  creator: 'Natuativo Aroma & Banho',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Natuativo Aroma & Banho',
    title: 'Natuativo Aroma & Banho | Arte, aroma e cuidado em cada criação',
    description: 'Produtos artesanais que transformam o autocuidado em momentos de bem-estar.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Natuativo Aroma & Banho',
    description: 'Arte, aroma e cuidado em cada criação.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable} ${dmSans.variable}`}>
      <body className="font-body bg-cream-100 text-charcoal-800 antialiased">

  <CartProvider>

    {children}

  </CartProvider>

  <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'var(--font-jost)',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#C9A84C', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  )
}
