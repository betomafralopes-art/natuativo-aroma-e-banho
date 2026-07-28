import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminCredentials, signAdminToken, setAdminCookie } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'E-mail e senha são obrigatórios' }, { status: 400 })
    }

    const valid = await verifyAdminCredentials(email, password)
    if (!valid) {
      // Delay para mitigar brute force
      await new Promise(r => setTimeout(r, 800))
      return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 })
    }

    const token = await signAdminToken({ sub: 'admin', email })

    const response = NextResponse.json({ ok: true })
    setAdminCookie(response, token)

    return response
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
