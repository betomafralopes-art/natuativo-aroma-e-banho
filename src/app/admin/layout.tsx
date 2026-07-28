import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Admin | Natuativo',
    template: '%s | Admin Natuativo',
  },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-charcoal-50" style={{ background: '#f8f7f5' }}>
      {children}
    </div>
  )
}
