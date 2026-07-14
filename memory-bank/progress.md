# Progress

## Tamamlananlar
- [x] Proje gereksinimleri belirlendi
- [x] Memory bank oluşturuldu
- [x] Tech stack kararı (Next.js + Supabase + Vercel)
- [x] Next.js 16 projesi kuruldu, Turbopack aktif
- [x] Supabase client ve tipler
- [x] Public menü sayfası — accordion kategoriler
- [x] Kategori başlıklarına arka plan görseli eklendi
- [x] Yemekler 2 sütunlu grid kartlar olarak gösteriliyor
- [x] Kategoriler sayfa açılışında kapalı
- [x] Admin login sayfası + httpOnly cookie auth
- [x] Admin panel — kategori CRUD + görsel yükleme
- [x] Admin panel — yemek CRUD + görsel yükleme
- [x] API routes (categories, menu-items, upload, login, logout)
- [x] Middleware (admin route koruması)
- [x] Supabase SQL şeması (supabase-schema.sql)
- [x] next.config.ts — Unsplash ve Supabase görsel domainleri tanımlı
- [x] Dev toolbar gizlendi (devIndicators: false)

## Yapılacaklar
- [ ] Supabase projesi oluştur ve .env.local doldur
- [ ] supabase-schema.sql çalıştır
- [ ] Storage bucket oluştur (menu-images, public)
- [ ] page.tsx mock datasını gerçek Supabase sorgusuyla değiştir
- [ ] Vercel'e deploy

## Bilinen Sorunlar
- Henüz yok

## Notlar
- Admin şifresi .env.local içinde ADMIN_PASSWORD değişkeni (varsayılan: admin123, deploy öncesi değiştir)
- page.tsx şu an mock data kullanıyor, Supabase bağlandıktan sonra değiştirilecek
