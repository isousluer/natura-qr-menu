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
- [x] middleware.ts → proxy.ts olarak güncellendi (Next.js 16)
- [x] Supabase bağlantısı kuruldu
- [x] SQL şeması çalıştırıldı
- [x] Storage bucket oluşturuldu (menu-images, public)
- [x] RLS + Storage politikaları eklendi
- [x] Görsel silinme: kategori/ürün güncellenince veya silinince eski görsel storage'dan otomatik siliniyor
- [x] Vercel'e deploy edildi
- [x] Logo tasarımı: Natura (yeşil, serif) + BISTRO (kahverengi), gradient çizgi, MENÜ yazısı

## Yapılacaklar
- [ ] Görsel optimizasyonu (Supabase Transform — isteğe bağlı)

## Bilinen Sorunlar
- Henüz yok

## Notlar
- Admin şifresi .env.local ve Vercel env'de ADMIN_PASSWORD değişkeni
- next/image fill + aspect-square kullanılmamalı, düz img tag kullanılıyor
- Görsel yükleme async — "Görsel yüklendi ✓" yazısını bekle, sonra kaydet
- middleware.ts Next.js 16'da proxy.ts oldu, export adı da `proxy` olmalı
