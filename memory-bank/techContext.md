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
    page.tsx                      → Public menü (Supabase'den veri)
    layout.tsx
    admin/
      page.tsx                    → Admin panel
      login/page.tsx              → Giriş sayfası
    api/
      admin/
        login/route.ts
        logout/route.ts
        categories/route.ts
        categories/[id]/route.ts  → Eski görseli storage'dan siler
        menu-items/route.ts
        menu-items/[id]/route.ts  → Eski görseli storage'dan siler
        upload/route.ts
  components/
    MenuAccordion.tsx
  lib/
    supabase.ts
    types.ts
    storage.ts                    → deleteStorageImage yardımcı fonksiyonu
  proxy.ts                        → Admin route koruması (Next.js 16)
supabase-schema.sql
```

## Ortam Değişkenleri
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- ADMIN_PASSWORD
(hem .env.local hem Vercel Dashboard'da tanımlı)

## Geliştirme
```bash
npm run dev   # http://localhost:3000 (Turbopack ile)
```

## Önemli Teknik Notlar
- next/image fill + aspect-square kullanılmamalı → sonsuz döngü
- Görsel render için düz img tag kullanılıyor
- Admin auth: httpOnly cookie, proxy.ts ile /admin/* korunuyor
- Next.js 16: middleware.ts → proxy.ts, export adı `proxy` olmalı
- Görsel silinme: deleteStorageImage() URL'den dosya adını parse eder, storage'dan siler
- VS Code auto push: "git.postCommitCommand": "push"

## Supabase Şema
- categories: id, name, image_url, sort_order, is_active, created_at
- menu_items: id, category_id, name, description, price, image_url, sort_order, is_active, created_at
- RLS: public SELECT, INSERT/UPDATE/DELETE herkese açık (API üzerinden kontrol ediliyor)
- Storage: menu-images bucket (public), tüm operasyonlara izin var
