import { supabase } from '@/lib/supabase'
import type { CategoryWithItems } from '@/lib/types'
import MenuAccordion from '@/components/MenuAccordion'

export const revalidate = 30

export default async function MenuPage() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*, items(*)')
    .eq('is_active', true)
    .order('display_order')

  const data = (categories as CategoryWithItems[]) ?? []

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <div className="inline-flex flex-col items-center">
          <div className="flex items-baseline gap-2 leading-none">
              <span className="text-3xl font-black tracking-tight" style={{ color: '#3a7d44', fontFamily: 'Georgia, serif' }}>Natura</span>
              <span className="text-xl font-semibold tracking-[0.15em]" style={{ color: '#7c5c3e', fontFamily: 'Georgia, serif' }}>BISTRO</span>
          </div>
          <div className="mt-1.5 h-px w-24 mx-auto" style={{ background: 'linear-gradient(to right, #3a7d44, #7c5c3e)' }} />
          <span className="mt-1 text-xs tracking-[0.3em] uppercase text-gray-400">Menü</span>
        </div>
      </div>
      <MenuAccordion categories={data} />
    </main>
  )
}
