'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Package, Tag, LogOut, ExternalLink, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

const navItems = [
  { href: '/admin/produtos', icon: Package, label: 'Produtos' },
  { href: '/admin/categorias', icon: Tag, label: 'Categorias' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    toast.success('Sessão encerrada')
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-charcoal-900 flex flex-col z-30">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-charcoal-700">
        <span className="font-display text-xl font-semibold" style={{ color: '#C9A84C' }}>
          Natuativo
        </span>
        <p className="font-body text-xs text-charcoal-500 mt-0.5">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 rounded-lg font-body text-sm transition-all duration-150',
              pathname.startsWith(href)
                ? 'bg-gold-500/15 text-gold-400 font-medium'
                : 'text-charcoal-400 hover:bg-charcoal-700 hover:text-cream-200'
            )}
          >
            <Icon size={17} className="shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-charcoal-700 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg font-body text-sm text-charcoal-400 hover:bg-charcoal-700 hover:text-cream-200 transition-all"
        >
          <ExternalLink size={17} className="shrink-0" />
          Ver Loja
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-body text-sm text-charcoal-400 hover:bg-red-900/30 hover:text-red-400 transition-all"
        >
          <LogOut size={17} className="shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  )
}
