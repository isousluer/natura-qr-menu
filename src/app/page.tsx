import type { CategoryWithItems } from '@/lib/types'
import MenuAccordion from '@/components/MenuAccordion'

export const revalidate = 60

const MOCK_DATA: CategoryWithItems[] = [
  {
    id: '1', name: 'Başlangıçlar', sort_order: 0, is_active: true,
    image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80',
    menu_items: [
      { id: '1', category_id: '1', name: 'Mercimek Çorbası', description: 'Geleneksel tarif, limon ile servis edilir', price: 85, image_url: 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?w=400&q=80', sort_order: 0, is_active: true },
      { id: '2', category_id: '1', name: 'Ezme', description: 'Domates, biber, maydanoz', price: 75, image_url: 'https://images.unsplash.com/photo-1541014741259-de529411b96a?w=400&q=80', sort_order: 1, is_active: true },
    ],
  },
  {
    id: '2', name: 'Ana Yemekler', sort_order: 1, is_active: true,
    image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    menu_items: [
      { id: '3', category_id: '2', name: 'Izgara Köfte', description: 'El yapımı köfte, yanında pilav ve salata', price: 220, image_url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80', sort_order: 0, is_active: true },
      { id: '4', category_id: '2', name: 'Tavuk Şiş', description: 'Marine edilmiş tavuk, közlenmiş sebze ile', price: 195, image_url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80', sort_order: 1, is_active: true },
    ],
  },
  {
    id: '3', name: 'İçecekler', sort_order: 2, is_active: true,
    image_url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80',
    menu_items: [
      { id: '5', category_id: '3', name: 'Ayran', description: 'Ev yapımı', price: 35, image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80', sort_order: 0, is_active: true },
      { id: '6', category_id: '3', name: 'Limonata', description: 'Taze sıkılmış', price: 55, image_url: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80', sort_order: 1, is_active: true },
    ],
  },
]

export default async function MenuPage() {
  const data = MOCK_DATA

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Menü</h1>
      <MenuAccordion categories={data} />
    </main>
  )
}
