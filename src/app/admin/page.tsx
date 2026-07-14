'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Category, MenuItem } from '@/lib/types'

export default function AdminPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [items, setItems] = useState<Record<string, MenuItem[]>>({})
  const [openCatId, setOpenCatId] = useState<string | null>(null)

  // Category form
  const [catName, setCatName] = useState('')
  const [catImageUrl, setCatImageUrl] = useState('')
  const [catUploading, setCatUploading] = useState(false)
  const [editCat, setEditCat] = useState<Category | null>(null)

  // Item form
  const [itemForm, setItemForm] = useState({ name: '', description: '', price: '', image_url: '' })
  const [editItem, setEditItem] = useState<MenuItem | null>(null)
  const [addingToCat, setAddingToCat] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  async function loadCategories() {
    const res = await fetch('/api/admin/categories')
    setCategories(await res.json())
  }

  async function loadItems(categoryId: string) {
    const res = await fetch(`/api/admin/menu-items?category_id=${categoryId}`)
    const data = await res.json()
    setItems((prev) => ({ ...prev, [categoryId]: data }))
  }

  useEffect(() => { loadCategories() }, [])

  useEffect(() => {
    if (openCatId) loadItems(openCatId)
  }, [openCatId])

  async function handleCatImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setCatUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const { url } = await res.json()
    setCatImageUrl(url)
    setCatUploading(false)
  }

  async function saveCategory(e: React.FormEvent) {
    e.preventDefault()
    if (editCat) {
      await fetch(`/api/admin/categories/${editCat.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: catName, image_url: catImageUrl || editCat.image_url, sort_order: editCat.sort_order, is_active: editCat.is_active }),
      })
      setEditCat(null)
    } else {
      await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: catName, image_url: catImageUrl || null, sort_order: categories.length }),
      })
    }
    setCatName('')
    setCatImageUrl('')
    loadCategories()
  }

  async function deleteCategory(id: string) {
    if (!confirm('Kategoriyi silmek istediğinize emin misiniz?')) return
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    loadCategories()
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const { url } = await res.json()
    setItemForm((prev) => ({ ...prev, image_url: url }))
    setUploading(false)
  }

  async function saveItem(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      ...itemForm,
      price: parseFloat(itemForm.price),
      category_id: addingToCat ?? editItem?.category_id,
      sort_order: editItem?.sort_order ?? (items[addingToCat!]?.length ?? 0),
      is_active: editItem?.is_active ?? true,
    }
    if (editItem) {
      await fetch(`/api/admin/menu-items/${editItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } else {
      await fetch('/api/admin/menu-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    }
    setItemForm({ name: '', description: '', price: '', image_url: '' })
    setEditItem(null)
    setAddingToCat(null)
    if (openCatId) loadItems(openCatId)
  }

  async function deleteItem(id: string, catId: string) {
    if (!confirm('Ürünü silmek istediğinize emin misiniz?')) return
    await fetch(`/api/admin/menu-items/${id}`, { method: 'DELETE' })
    loadItems(catId)
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-red-500">Çıkış</button>
      </div>

      {/* Kategori Ekle / Düzenle */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <h2 className="font-semibold text-gray-700 mb-3">{editCat ? 'Kategori Düzenle' : 'Yeni Kategori'}</h2>
        <form onSubmit={saveCategory} className="space-y-2">
          <input
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            placeholder="Kategori adı"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div>
            <label className="text-sm text-gray-600 block mb-1">Kategori görseli</label>
            <input type="file" accept="image/*" onChange={handleCatImageUpload} className="text-sm" />
            {catUploading && <span className="text-sm text-gray-400 ml-2">Yükleniyor...</span>}
            {(catImageUrl || editCat?.image_url) && <p className="text-xs text-green-600 mt-1">Görsel mevcut ✓</p>}
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              {editCat ? 'Güncelle' : 'Ekle'}
            </button>
            {editCat && (
              <button type="button" onClick={() => { setEditCat(null); setCatName(''); setCatImageUrl('') }} className="px-4 py-2 border rounded-lg">
                İptal
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Kategoriler Listesi */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <button
                onClick={() => setOpenCatId(openCatId === cat.id ? null : cat.id)}
                className="font-semibold text-gray-800 text-left flex-1"
              >
                {cat.name} {!cat.is_active && <span className="text-xs text-gray-400">(pasif)</span>}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => { setEditCat(cat); setCatName(cat.name); setCatImageUrl('') }}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Sil
                </button>
                <button
                  onClick={() => setOpenCatId(openCatId === cat.id ? null : cat.id)}
                  className="text-gray-400 text-xl w-6"
                >
                  {openCatId === cat.id ? '−' : '+'}
                </button>
              </div>
            </div>

            {openCatId === cat.id && (
              <div className="border-t px-5 py-4 space-y-3">
                {/* Ürün Listesi */}
                {(items[cat.id] ?? []).map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.price.toFixed(2)} ₺</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditItem(item)
                          setAddingToCat(null)
                          setItemForm({
                            name: item.name,
                            description: item.description ?? '',
                            price: item.price.toString(),
                            image_url: item.image_url ?? '',
                          })
                        }}
                        className="text-sm text-blue-500 hover:text-blue-700"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => deleteItem(item.id, cat.id)}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Sil
                      </button>
                    </div>
                  </div>
                ))}

                {/* Ürün Ekle / Düzenle Formu */}
                {(addingToCat === cat.id || editItem?.category_id === cat.id) ? (
                  <form onSubmit={saveItem} className="space-y-2 pt-2">
                    <input
                      value={itemForm.name}
                      onChange={(e) => setItemForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="Ürün adı"
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <textarea
                      value={itemForm.description}
                      onChange={(e) => setItemForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="İçerik / açıklama"
                      rows={2}
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                      value={itemForm.price}
                      onChange={(e) => setItemForm((p) => ({ ...p, price: e.target.value }))}
                      placeholder="Fiyat (₺)"
                      type="number"
                      step="0.01"
                      required
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
                      {uploading && <span className="text-sm text-gray-400 ml-2">Yükleniyor...</span>}
                      {itemForm.image_url && <p className="text-xs text-green-600 mt-1">Görsel yüklendi ✓</p>}
                    </div>
                    <div className="flex gap-2">
                      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">
                        {editItem ? 'Güncelle' : 'Ekle'}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setAddingToCat(null); setEditItem(null); setItemForm({ name: '', description: '', price: '', image_url: '' }) }}
                        className="px-4 py-2 border rounded-lg text-sm"
                      >
                        İptal
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => { setAddingToCat(cat.id); setEditItem(null); setItemForm({ name: '', description: '', price: '', image_url: '' }) }}
                    className="text-sm text-green-600 hover:text-green-800 font-medium"
                  >
                    + Ürün Ekle
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
