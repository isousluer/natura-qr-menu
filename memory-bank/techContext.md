# Tech Context

## Kesinleşen Stack
- Next.js 15 (App Router, TypeScript)
- Tailwind CSS
- Supabase (PostgreSQL + Storage)
- Vercel (hosting)

## Proje Yapısı
```
src/
  app/
    page.tsx              → Public menü (accordion)
    layout.tsx
    admin/
      page.tsx            → Admin panel
      login/page.tsx      → Giriş sayfası
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
  middleware.ts           → Admin route koruması
```

## Ortam Değişkenleri (.env.local)
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- ADMIN_PASSWORD

## Supabase Kurulumu
1. supabase-schema.sql çalıştır (SQL Editor)
2. Storage > New Bucket: `menu-images`, Public: true
3. .env.local dosyasına URL ve anon key gir

## Geliştirme
```bash
npm run dev   # http://localhost:3000
```

## Kısıtlar
- Admin auth: basit cookie tabanlı (httpOnly)
- Görsel yükleme: Supabase Storage `menu-images` bucket
- Vercel deploy: env değişkenlerini Vercel Dashboard'a ekle
