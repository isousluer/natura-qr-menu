import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabase } from '@/lib/supabase'
import { deleteStorageImage } from '@/lib/storage'

async function isAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_auth')?.value === 'true'
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()

  // Yeni görsel varsa eskisini sil
  if (body.image_url) {
    const { data: old } = await supabase.from('categories').select('image_url').eq('id', id).single()
    if (old?.image_url && old.image_url !== body.image_url) {
      await deleteStorageImage(old.image_url)
    }
  }

  const { data, error } = await supabase
    .from('categories')
    .update({ name: body.name, image_url: body.image_url ?? null, sort_order: body.sort_order, is_active: body.is_active })
    .eq('id', id)
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params

  // Kategori silinince görselini de sil
  const { data: old } = await supabase.from('categories').select('image_url').eq('id', id).single()
  await deleteStorageImage(old?.image_url)

  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
