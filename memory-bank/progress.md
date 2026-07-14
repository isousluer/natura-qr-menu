# Progress

## Tamamlananlar
- [x] Proje gereksinimleri belirlendi
- [x] Memory bank oluşturuldu
- [x] Tech stack kararı (Next.js + Supabase + Vercel)
- [x] Next.js 16 projesi kuruldu, Turbopack aktif
- [x] Supabase client ve tipler
- [x] Public menü sayfası — accordion kategoriler
- [x] Kategori başlıklarına arka plan görseli eklendi
- [x] Yemekler mobilde 2, büyük ekranda 3 sütunlu grid
- [x] Kategoriler sayfa açılışında kapalı
- [x] Görsele tıklayınca lightbox açılıyor
- [x] Admin login sayfası + httpOnly cookie auth
- [x] Admin panel — kategori CRUD + görsel yükleme
- [x] Admin panel — yemek CRUD + görsel yükleme
- [x] Admin panel — ürün satırında küçük görsel gösterimi
- [x] API routes (categories, menu-items, upload, login, logout)
- [x] Middleware (admin route koruması)
- [x] Supabase bağlantısı kuruldu (.env.local dolduruldu)
- [x] SQL şeması çalıştırıldı
- [x] Storage bucket oluşturuldu (menu-images, public)
- [x] RLS politikaları eklendi (SELECT + INSERT + UPDATE + DELETE)
- [x] Storage politikaları eklendi

## Yapılacaklar
- [ ] Vercel'e deploy
- [ ] Görsel optimizasyonu (Supabase Transform — isteğe bağlı)

## Bilinen Sorunlar
- Henüz yok

## Notlar
- Admin şifresi .env.local içinde ADMIN_PASSWORD değişkeni
- next/image fill + aspect-square kullanılmamalı, sonsuz döngü yaratır, düz img tag kullanılıyor
- Görsel yükleme async — dosya seçildikten sonra "Görsel yüklendi ✓" yazısı çıkınca kaydet butonuna basılmalı
