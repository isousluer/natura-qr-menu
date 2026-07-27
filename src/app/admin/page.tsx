'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Category, MenuItem } from '@/lib/types'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const INPUT = 'w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
const BTN_PRIMARY = 'bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 text-sm font-medium'
const BTN_SECONDARY = 'border border-gray-200 px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50'

function DragHandle() {
  return (
    <span className="text-gray-300 hover:text-gray-400 cursor-grab active:cursor-grabbing px-1 select-none text-lg">
      ⠿
    </span>
  )
}

function ImageUpload({ label, onUpload, uploaded }: { label: string; onUpload: (url: string) => void; uploaded: boolean }) {
  const [loading, setLoading] = useState(false)

  async function compressToWebP(file: File, maxKB = 300): Promise<Blob> {
    return new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        URL.revokeObjectURL(url)
        const canvas = document.createElement('canvas')
        const maxW = 1200
        const scale = img.width > maxW ? maxW / img.width : 1
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        let quality = 0.85
        const tryCompress = () => {
          canvas.toBlob((blob) => {
            if (!blob) return resolve(new Blob())
            if (blob.size <= maxKB * 1024 || quality <= 0.1) resolve(blob)
            else { quality -= 0.1; tryCompress() }
          }, 'image/webp', quality)
        }
        tryCompress()
      }
      img.src = url
    })
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    const webpBlob = await compressToWebP(file)
    const webpFile = new File([webpBlob], `${Date.now()}.webp`, { type: 'image/webp' })
    const fd = new FormData()
    fd.append('file', webpFile)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const { url } = await res.json()
    onUpload(url)
    setLoading(false)
  }

  return (
    <div>
      <label className="text-sm text-gray-600 block mb-1">{label}</label>
      <label className="flex items-center gap-3 cursor-pointer w-fit">
        <span className={`px-4 py-2 rounded-lg text-sm border ${uploaded ? 'border-green-500 text-green-600 bg-green-50' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
          {loading ? 'Yükleniyor...' : uploaded ? '✓ Görsel yüklendi' : 'Görsel seç'}
        </span>
        <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
      </label>
    </div>
  )
}

function SortableCategory({
  cat, index, total, openCatId, setOpenCatId, editCat, startEditCat, deleteCategory,
  catForm, setCatForm, saveCategory, cancelCatForm,
  items, editItem, addingToCat, setAddingToCat, itemForm, setItemForm,
  startEditItem, cancelItem, saveItem, deleteItem,
  itemSensors, handleItemDragEnd,
}: {
  cat: Category; index: number; total: number; openCatId: string | null
  setOpenCatId: (id: string | null) => void; editCat: Category | null
  startEditCat: (cat: Category) => void; deleteCategory: (id: string) => void
  catForm: { name: string; image_url: string }
  setCatForm: React.Dispatch<React.SetStateAction<{ name: string; image_url: string }>>
  saveCategory: (e: React.FormEvent) => void; cancelCatForm: () => void
  items: Record<string, MenuItem[]>; editItem: MenuItem | null
  addingToCat: string | null
  itemForm: { name: string; description: string; price: string; image_url: string }
  setItemForm: React.Dispatch<React.SetStateAction<{ name: string; description: string; price: string; image_url: string }>>
  startEditItem: (item: MenuItem) => void; cancelItem: () => void
  saveItem: (e: React.FormEvent) => void; deleteItem: (id: string, catId: string) => void
  itemSensors: ReturnType<typeof useSensors>
  handleItemDragEnd: (catId: string, event: DragEndEvent) => void
  setAddingToCat: (id: string | null) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: cat.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style} className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <span {...attributes} {...listeners}><DragHandle /></span>
        <button
          onClick={() => setOpenCatId(openCatId === cat.id ? null : cat.id)}
          className="font-semibold text-gray-800 text-left flex-1 flex items-center gap-2 mx-2"
        >
          <span>{cat.name}</span>
          {!cat.is_active && <span className="text-xs text-gray-400 font-normal">(pasif)</span>}
        </button>
        <div className="flex items-center gap-3">
          <button onClick={() => startEditCat(cat)} className="text-sm text-blue-500 hover:text-blue-700">Düzenle</button>
          <button onClick={() => deleteCategory(cat.id)} className="text-sm text-red-400 hover:text-red-600">Sil</button>
          <button onClick={() => setOpenCatId(openCatId === cat.id ? null : cat.id)} className="text-gray-400 text-lg w-5 text-center">
            {openCatId === cat.id ? '−' : '+'}
          </button>
        </div>
      </div>

      {editCat?.id === cat.id && (
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Kategori Düzenle</p>
          <form onSubmit={saveCategory} className="space-y-3">
            <input
              value={catForm.name}
              onChange={(e) => setCatForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Kategori adı"
              required
              className={INPUT}
              autoFocus
            />
            <ImageUpload
              label="Kategori arka plan görseli"
              onUpload={(url) => setCatForm((p) => ({ ...p, image_url: url }))}
              uploaded={!!catForm.image_url || !!editCat?.image_url}
            />
            <div className="flex gap-2 pt-1">
              <button type="submit" className={BTN_PRIMARY}>Güncelle</button>
              <button type="button" onClick={cancelCatForm} className={BTN_SECONDARY}>İptal</button>
            </div>
          </form>
        </div>
      )}

      {openCatId === cat.id && (
        <div className="border-t border-gray-100 px-5 py-4 space-y-3">
          <DndContext sensors={itemSensors} collisionDetection={closestCenter} onDragEnd={(e) => handleItemDragEnd(cat.id, e)}>
            <SortableContext items={(items[cat.id] ?? []).map((i) => i.id)} strategy={verticalListSortingStrategy}>
              {(items[cat.id] ?? []).map((item) => (
                <SortableItem
                  key={item.id}
                  item={item}
                  catId={cat.id}
                  editItem={editItem}
                  itemForm={itemForm}
                  setItemForm={setItemForm}
                  startEditItem={startEditItem}
                  cancelItem={cancelItem}
                  saveItem={saveItem}
                  deleteItem={deleteItem}
                />
              ))}
            </SortableContext>
          </DndContext>

          {addingToCat === cat.id ? (
            <form onSubmit={saveItem} className="space-y-3 pt-2 border-t border-gray-100">
              <p className="text-sm font-medium text-gray-700">Yeni Ürün</p>
              <input value={itemForm.name} onChange={(e) => setItemForm((p) => ({ ...p, name: e.target.value }))} placeholder="Ürün adı" required className={INPUT} />
              <textarea value={itemForm.description} onChange={(e) => setItemForm((p) => ({ ...p, description: e.target.value }))} placeholder="İçerik / açıklama" rows={2} className={INPUT} />
              <input value={itemForm.price} onChange={(e) => setItemForm((p) => ({ ...p, price: e.target.value }))} placeholder="Fiyat (₺)" required className={INPUT} />
              <ImageUpload label="Ürün görseli" onUpload={(url) => setItemForm((p) => ({ ...p, image_url: url }))} uploaded={!!itemForm.image_url} />
              <div className="flex gap-2">
                <button type="submit" className={BTN_PRIMARY}>Ürün Ekle</button>
                <button type="button" onClick={cancelItem} className={BTN_SECONDARY}>İptal</button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => { setAddingToCat(cat.id); cancelItem() }}
              className="text-sm text-green-600 hover:text-green-700 font-medium pt-1"
            >
              + Ürün Ekle
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function SortableItem({
  item, catId, editItem, itemForm, setItemForm,
  startEditItem, cancelItem, saveItem, deleteItem,
}: {
  item: MenuItem; catId: string; editItem: MenuItem | null
  itemForm: { name: string; description: string; price: string; image_url: string }
  setItemForm: React.Dispatch<React.SetStateAction<{ name: string; description: string; price: string; image_url: string }>>
  startEditItem: (item: MenuItem) => void; cancelItem: () => void
  saveItem: (e: React.FormEvent) => void; deleteItem: (id: string, catId: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex justify-between items-center py-2.5 border-b border-gray-50">
        <span {...attributes} {...listeners}><DragHandle /></span>
        <div className="flex items-center gap-3 flex-1 mx-2">
          {item.image_url ? (
            <img src={item.image_url} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">🍽️</div>
          )}
          <div>
            <p className="font-medium text-gray-800 text-sm">{item.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{item.price} ₺</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => startEditItem(item)} className="text-sm text-blue-500 hover:text-blue-700">Düzenle</button>
          <button onClick={() => deleteItem(item.id, catId)} className="text-sm text-red-400 hover:text-red-600">Sil</button>
        </div>
      </div>

      {editItem?.id === item.id && (
        <form onSubmit={saveItem} className="space-y-3 py-3 border-b border-gray-100 bg-gray-50 px-3 rounded-xl mt-1">
          <p className="text-sm font-medium text-gray-700">Ürün Düzenle</p>
          <input value={itemForm.name} onChange={(e) => setItemForm((p) => ({ ...p, name: e.target.value }))} placeholder="Ürün adı" required className={INPUT} />
          <textarea value={itemForm.description} onChange={(e) => setItemForm((p) => ({ ...p, description: e.target.value }))} placeholder="İçerik / açıklama" rows={2} className={INPUT} />
          <input value={itemForm.price} onChange={(e) => setItemForm((p) => ({ ...p, price: e.target.value }))} placeholder="Fiyat (₺)" required className={INPUT} />
          <ImageUpload label="Ürün görseli" onUpload={(url) => setItemForm((p) => ({ ...p, image_url: url }))} uploaded={!!itemForm.image_url} />
          <div className="flex gap-2">
            <button type="submit" className={BTN_PRIMARY}>Güncelle</button>
            <button type="button" onClick={cancelItem} className={BTN_SECONDARY}>İptal</button>
          </div>
        </form>
      )}
    </div>
  )
}

export default function AdminPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [items, setItems] = useState<Record<string, MenuItem[]>>({})
  const [openCatId, setOpenCatId] = useState<string | null>(null)

  const [showCatForm, setShowCatForm] = useState(false)
  const [catForm, setCatForm] = useState({ name: '', image_url: '' })
  const [editCat, setEditCat] = useState<Category | null>(null)

  const [itemForm, setItemForm] = useState({ name: '', description: '', price: '', image_url: '' })
  const [editItem, setEditItem] = useState<MenuItem | null>(null)
  const [addingToCat, setAddingToCat] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  )

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
  useEffect(() => { if (openCatId) loadItems(openCatId) }, [openCatId])

  async function handleCatDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = categories.findIndex((c) => c.id === active.id)
    const newIndex = categories.findIndex((c) => c.id === over.id)
    const newCats = arrayMove(categories, oldIndex, newIndex)
    setCategories(newCats)

    await Promise.all(
      newCats.map((cat, i) =>
        fetch(`/api/admin/categories/${cat.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...cat, display_order: i }),
        })
      )
    )
  }

  async function handleItemDragEnd(catId: string, event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const catItems = items[catId] ?? []
    const oldIndex = catItems.findIndex((i) => i.id === active.id)
    const newIndex = catItems.findIndex((i) => i.id === over.id)
    const newItems = arrayMove(catItems, oldIndex, newIndex)
    setItems((prev) => ({ ...prev, [catId]: newItems }))

    await Promise.all(
      newItems.map((item, i) =>
        fetch(`/api/admin/menu-items/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...item, display_order: i }),
        })
      )
    )
  }

  async function saveCategory(e: React.FormEvent) {
    e.preventDefault()
    if (editCat) {
      await fetch(`/api/admin/categories/${editCat.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: catForm.name, image_url: catForm.image_url || editCat.image_url, display_order: editCat.display_order, is_active: editCat.is_active }),
      })
      setEditCat(null)
    } else {
      await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: catForm.name, image_url: catForm.image_url || null, display_order: categories.length }),
      })
    }
    setCatForm({ name: '', image_url: '' })
    setShowCatForm(false)
    loadCategories()
  }

  function startEditCat(cat: Category) {
    setEditCat(cat)
    setCatForm({ name: cat.name, image_url: '' })
    setShowCatForm(false)
  }

  function cancelCatForm() {
    setEditCat(null)
    setCatForm({ name: '', image_url: '' })
    setShowCatForm(false)
  }

  async function deleteCategory(id: string) {
    if (!confirm('Kategoriyi silmek istediğinize emin misiniz?')) return
    await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    loadCategories()
  }

  async function saveItem(e: React.FormEvent) {
    e.preventDefault()
    const payload = {
      ...itemForm,
      category_id: addingToCat ?? editItem?.category_id,
      display_order: editItem?.display_order ?? (items[addingToCat!]?.length ?? 0),
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

  function startEditItem(item: MenuItem) {
    setEditItem(item)
    setAddingToCat(null)
    setItemForm({ name: item.name, description: item.description ?? '', price: item.price.toString(), image_url: item.image_url ?? '' })
  }

  function cancelItem() {
    setAddingToCat(null)
    setEditItem(null)
    setItemForm({ name: '', description: '', price: '', image_url: '' })
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        <button onClick={logout} className="text-sm text-gray-400 hover:text-red-500">Çıkış</button>
      </div>

      {showCatForm && (
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">Yeni Kategori Ekle</h2>
          <form onSubmit={saveCategory} className="space-y-3">
            <input
              value={catForm.name}
              onChange={(e) => setCatForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Kategori adı"
              required
              className={INPUT}
              autoFocus
            />
            <ImageUpload
              label="Kategori arka plan görseli"
              onUpload={(url) => setCatForm((p) => ({ ...p, image_url: url }))}
              uploaded={!!catForm.image_url}
            />
            <div className="flex gap-2 pt-1">
              <button type="submit" className={BTN_PRIMARY}>Kategori Ekle</button>
              <button type="button" onClick={cancelCatForm} className={BTN_SECONDARY}>İptal</button>
            </div>
          </form>
        </div>
      )}
      {!showCatForm && (
        <button
          onClick={() => { setShowCatForm(true); setEditCat(null); setCatForm({ name: '', image_url: '' }) }}
          className="w-full bg-white rounded-2xl shadow-sm p-4 mb-6 text-green-600 font-medium text-sm hover:bg-green-50 border-2 border-dashed border-green-200"
        >
          + Yeni Kategori Ekle
        </button>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleCatDragEnd}>
        <SortableContext items={categories.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {categories.length === 0 && (
              <p className="text-center text-gray-400 text-sm py-8">Henüz kategori yok.</p>
            )}
            {categories.map((cat, index) => (
              <SortableCategory
                key={cat.id}
                cat={cat}
                index={index}
                total={categories.length}
                openCatId={openCatId}
                setOpenCatId={setOpenCatId}
                editCat={editCat}
                startEditCat={startEditCat}
                deleteCategory={deleteCategory}
                catForm={catForm}
                setCatForm={setCatForm}
                saveCategory={saveCategory}
                cancelCatForm={cancelCatForm}
                items={items}
                editItem={editItem}
                addingToCat={addingToCat}
                itemForm={itemForm}
                setItemForm={setItemForm}
                startEditItem={startEditItem}
                cancelItem={cancelItem}
                saveItem={saveItem}
                deleteItem={deleteItem}
                itemSensors={sensors}
                handleItemDragEnd={handleItemDragEnd}
                setAddingToCat={setAddingToCat}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
