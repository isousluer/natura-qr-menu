# Tech Context

## Kesinleşen Stack
- Next.js 16 (App Router, TypeScript, Turbopack)
- Tailwind CSS v4
- Supabase (PostgreSQL + Storage)
- Vercel (hosting)

## Proje Yapısı
```
src/
  app/
    page.tsx                      → Public menü (mock data, Supabase'e geçilecek)
    layout.tsx
    admin/
      page.tsx                    → Admin panel
      login/page.tsx              → Giriş sayfası
    api/
      admin/
        login/route.ts
        logout/route.ts
        categories/route.ts
        categories/[id]/route.ts
        menu-items/route.ts
        menu-items/[id]/route.ts
        upload/route.ts
  components/
    MenuAccordion.tsx
  lib/
    supabase.ts
    types.ts
  middleware.ts                   → Admin route koruması
supabase-schema.sql               → Veritabanı şeması
```

## Ortam Değişkenleri (.env.local)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- ADMIN_PASSWORD

## Geliştirme
```bash
npm run dev   # http://localhost:3000 (Turbopack ile)
```

## Önemli Teknik Notlar
- `next/image` fill prop'u ile aspect-square CSS kullanılmamalı → sonsuz döngü yaratır
- Görsel render için düz `<img>` tag kullanılıyor
- Admin auth: httpOnly cookie tabanlı, middleware ile korunuyor
- Görsel yükleme: Supabase Storage `menu-images` bucket (public)
- Vercel deploy: env değişkenlerini Vercel Dashboard'a ekle

## Supabase Şema
- categories: id, name, image_url, sort_order, is_active, created_at
- menu_items: id, category_id, name, description, price, image_url, sort_order, is_active, created_at
- RLS: public SELECT izni var, yazma işlemleri API üzerinden yapılıyor
