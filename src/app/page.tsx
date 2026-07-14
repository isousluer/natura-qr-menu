import { supabase } from '@/lib/supabase'
import type { CategoryWithItems } from '@/lib/types'
import MenuAccordion from '@/components/MenuAccordion'

export const revalidate = 60

export default async function MenuPage() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*, menu_items(*)')
    .eq('is_active', true)
    .order('sort_order')

  const data = (categories as CategoryWithItems[]) ?? []

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Menü</h1>
      <MenuAccordion categories={data} />
    </main>
  )
}
