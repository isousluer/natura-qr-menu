'use client'

import { useState } from 'react'
import type { CategoryWithItems } from '@/lib/types'

export default function MenuAccordion({ categories }: { categories: CategoryWithItems[] }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<string | null>(null)

  if (categories.length === 0) {
    return <p className="text-center" style={{ color: 'var(--text-muted)' }}>Menü henüz hazırlanmadı.</p>
  }

  return (
    <>
      <div className="space-y-3">
        {categories.map((cat) => (
          <div key={cat.id} className="rounded-xl shadow-sm overflow-hidden" style={{ backgroundColor: 'var(--bg-card)' }}>
            <button
              onClick={() => setOpenId(openId === cat.id ? null : cat.id)}
              className="relative w-full h-24 flex items-center justify-between px-5 text-left overflow-hidden"
            >
              {cat.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cat.image_url} alt={cat.name} className="absolute inset-0 w-full h-full object-cover brightness-50" />
              ) : (
                <div className="absolute inset-0 bg-gray-700" />
              )}
              <span className="relative z-10 font-bold text-white text-3xl drop-shadow">{cat.name}</span>
              <span className="relative z-10 text-white text-2xl">{openId === cat.id ? '−' : '+'}</span>
            </button>

            <div
              className={`p-3 grid grid-cols-2 md:grid-cols-3 gap-3 ${openId === cat.id ? '' : 'hidden'}`}
              style={{ backgroundColor: 'var(--bg-card)' }}
            >
              {cat.items
                .filter((item) => item.is_active)
                .sort((a, b) => a.display_order - b.display_order)
                .map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl overflow-hidden flex flex-col"
                    style={{ border: '1px solid var(--border-card)' }}
                  >
                    <div
                      className="w-full aspect-square overflow-hidden cursor-pointer"
                      style={{ backgroundColor: 'var(--bg-placeholder)' }}
                      onClick={() => item.image_url && setLightbox(item.image_url)}
                    >
                      {item.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">🍽️</div>
                      )}
                    </div>
                    <div className="p-3 flex flex-col gap-1">
                      <h3 className="font-semibold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>{item.name}</h3>
                      {item.description && (
                        <p className="text-xs leading-snug line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                      )}
                      <span className="font-bold text-sm mt-1" style={{ color: 'var(--text-price)' }}>{item.price} ₺</span>
                    </div>
                  </div>
                ))}
              {cat.items.filter((i) => i.is_active).length === 0 && (
                <p className="px-5 py-4 text-sm col-span-2" style={{ color: 'var(--text-muted)' }}>Bu kategoride ürün yok.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'var(--lightbox-bg)' }}
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="" className="max-w-full max-h-full rounded-xl object-contain" />
        </div>
      )}
    </>
  )
}
