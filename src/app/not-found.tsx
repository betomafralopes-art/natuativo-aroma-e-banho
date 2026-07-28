import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-cream-100 px-4">
        <div className="text-center max-w-md">
          <p className="font-display text-8xl font-light text-gold-300 mb-4">404</p>
          <h1 className="font-display text-3xl text-charcoal-800 mb-3">Página não encontrada</h1>
          <p className="font-body text-sm text-charcoal-500 mb-8 leading-relaxed">
            A página que você está procurando não existe ou foi removida.
          </p>
          <Link href="/" className="btn-gold">
            Voltar ao início
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
