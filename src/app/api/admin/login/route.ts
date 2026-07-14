import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const cookieStore = await cookies()
  cookieStore.set('admin_auth', 'true', {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return NextResponse.json({ ok: true })
}
