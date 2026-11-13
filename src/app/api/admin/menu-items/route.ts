import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

async function isAuth() {
  const cookieStore = await cookies()
  return cookieStore.get('admin_auth')?.value === 'true'
}

export async function GET(req: NextRequest) {
  const categoryId = req.nextUrl.searchParams.get('category_id')
  let query = supabase.from('items').select('*').order('display_order')
  if (categoryId) query = query.eq('category_id', categoryId)
  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  if (!(await isAuth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { data, error } = await supabase
    .from('items')
    .insert({
      category_id: body.category_id,
      name: body.name,
      description: body.description ?? '',
      price: body.price,
      image_url: body.image_url ?? null,
      display_order: body.display_order ?? 0,
      is_active: true,
    })
    .select()
    .single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/')
  return NextResponse.json(data)
}
